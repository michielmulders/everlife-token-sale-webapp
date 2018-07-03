<template>
  <v-layout justify-center>
    <v-stepper v-model="step" class="modal">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Info</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Account</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Payment</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">Finish</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-title primary-title>
                <div class="headline"> Enter amount of XLM you want to contribute </div>
                <div>You will send xlm for contribution in next steps</div>
              </v-card-title>
              <v-card-actions>
                <v-container>
                  <v-layout column>
                    <v-form>
                      <v-text-field
                            light :solo="true"
                            v-model="xlmAmount"
                            label="XLM"
                            type="number"
                            required
                      ></v-text-field>
                    </v-form>
                    <v-layout justify-end class="mt-5">
                      <v-btn @click="nextStep(2)" color="blue darken-2 white--text">Next ></v-btn>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
            <v-card-title primary-title>
              <div class="headline"> Account details </div>
              <div> Copy these account details and keep safe, EVER tokens will be sent to this account.</div>
            </v-card-title>
            <v-card-text>
              public : <h3> {{publicKey}} </h3>
              secret : <h3> {{secretKey}} </h3>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-end class="mt-5">
                <v-btn @click="nextStep(3)" color="blue darken-2 white--text">Next ></v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
            <v-card-title primary-title>
              <v-layout column>
                <div class="headline"> Make Payment of {{paymentAmount}} XLMs</div>
                <div> Send {{paymentAmount}} XLMs to below address to purchase EVER token </div>
                <p> Note: 3 XLM extra to cover base reserve and transaction fees</p>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-layout column>
                <div class="mb-5"> address :<h3> {{publicKey}} </h3></div>
                <v-divider></v-divider>
                <v-flex class="mt-5">
                  <v-layout justify-space-between>
                    <h2>XLM funded: {{xlmFunded}}</h2>
                    <!-- <div class="fa fa-sync fa-spin"></div> -->
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-end class="mt-5">
                <v-btn @click="nextStep(4)" :disabled="!funded" color="blue darken-2 white--text">Next ></v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-title primary-title>
                <v-layout column>
                  <div class="headline"> Proccessing</div>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <p v-show="!done">Purchasing ever tokens.</p>
                <v-alert :value="done" type="success">
                  Ever tokens purchased
                </v-alert>
                <v-alert :value="errorOnContribute" type="error">
                  {{errorOnContribute}}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-end class="mt-5">
                  <v-btn :to="{name: 'dashboard'}" :disabled="!done" color="blue darken-2 white--text">Done</v-btn>
                </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-layout>
</template>


<script>
import axios from "../axios";
import {
  generateAccount,
  getAccountBalance,
  addTrustline,
  generateIcoTransactions,
  addDASignerAndUpdateWeight
} from "../stellar/transaction";

export default {
  data() {
    return {
      done: false,
      step: 0,
      xlmAmount: 10000,
      publicKey: "",
      secretKey: "",
      xlmFunded: 0,
      errorOnContribute: ""
    };
  },
  mounted() {
    const account = generateAccount();
    this.publicKey = account.publicKey;
    this.secretKey = account.secretKey;
  },

  methods: {
    async contribute() {
      const {
        transaction1,
        transaction2,
        transaction3
      } = await generateIcoTransactions(parseInt(this.xlmFunded)-3, this.publicKey, this.secretKey);
      const xdr1 = transaction1
        .toEnvelope()
        .toXDR()
        .toString("base64");
      const xdr2 = transaction2
        .toEnvelope()
        .toXDR()
        .toString("base64");
      const xdr3 = transaction3
        .toEnvelope()
        .toXDR()
        .toString("base64");
      const data = await axios.post("api/account/contribute", {
        XDR1: xdr1,
        XDR2: xdr2,
        XDR3: xdr3,
        xlmAmount: this.xlmAmount,
        ca2: this.publicKey
      });
      return true;
    },

    nextStep(nextStep) {
      if (nextStep == 3) {
        const balanceCheckTimer = setInterval(() => {
          console.log("Getting balance");
          getAccountBalance(this.publicKey)
            .then(result => {
              const xlmBalance = result.balances.find(balance => {
                if (balance.asset_type == "native") {
                  return true;
                }
              });
              this.xlmFunded = xlmBalance.balance;
              clearInterval(balanceCheckTimer);
            })
            .catch(function(error) {
              console.log("Error while getting account balance");
            });
        }, 15000);
      }
      if (nextStep == 4) {
        const result = addTrustline(this.publicKey, this.secretKey).then(result => {
          addDASignerAndUpdateWeight(this.publicKey, this.secretKey).then(result => {
            this.contribute()
              .then(data => {
                this.done = true;
              })
              .catch(error => {
                this.errorOnContribute =
                  "Something went wrong, please try again.";
              });
          });
        });
      }
      this.step = nextStep;
    }
  },
  computed: {
    funded() {
      return this.xlmFunded ? true : false;
    },
    paymentAmount(){
      return parseInt(this.xlmAmount) + 3;
    }
  }
};
</script>

<style>
.modal {
  width: 700px;
}
</style>
