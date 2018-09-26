<template>
  <v-layout justify-center>
    <v-stepper v-model="step" class="modal">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Your Stellar Account</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Select payment Option</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Payment</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>

        <v-stepper-content step="1">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
            <v-card-text>
              <v-layout column>
                <div class="headline"> Stellar Account </div>
                <div> Choose which account in which to receive your EVER by entering your public key.</div>
                <br/>
                <v-text-field solo></v-text-field>

                <div><b> This account must:</b></div>
                <div> 1.Be Active</div>
                <div> 2.Have a trustline to ........</div>

                  <v-checkbox
                    v-model="secureCheck"
                    label="I understand that  Iam responsible for entries a corrrect destination account for the purchase of ever."
                    hide-details
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-end class="mt-4">
                <v-btn @click="nextStep(2)" :disabled="!hasAcceptedStep1Terms" color="blue darken-2 white--text">Next ></v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-title primary-title>
                <div class="headline">Select Payment Option </div>

              </v-card-title>
              <v-card-actions>
                <v-container>
                  <v-layout column>
                    <v-flex xs12 sm6 d-flex>
                      <v-select
                        :items="items"
                        :value="selected"
                        label=""
                        solo
                      ></v-select>
                    </v-flex>
                    <v-form v-show="!selectedXLM">


                      <div > Enter account from which payment will be paid </div>

                      <v-text-field
                            light :solo="true"
                            v-model="xlmAmount"
                            label="XLM"
                            type="number"
                            required
                      ></v-text-field>



                    </v-form>

                    <v-checkbox
                      v-model="secureCheck2"
                      label="I understand that i have to provide a correct addres for the payment to be credited to  ms account."
                      hide-details
                    ></v-checkbox>



                    <v-layout justify-end class="mt-5">
                      <v-btn @click="nextStep(3)" :disabled="!hasAcceptedStep2Terms" color="blue darken-2 white--text">Next ></v-btn>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-card-actions>
          </v-card>
        </v-stepper-content>


        <v-stepper-content step="3">
          <v-card color="grey lighten-4" class="grey--text text--darken-3">
            <v-card-text>
              <v-layout column>

              <div v-show="!selectedXLM">
                <v-layout >
                  <v-btn :to="{name: 'dashboard'}" color="blue darken-2 white--text">Pay with coin Payment</v-btn>
                </v-layout>
              </div>
              <div class="headline" v-show="selectedXLM"> Pay {{paymentAmount}} XLM to Account to conclude the address</div>
                <v-alert type="warning">
                  Please dont refresh or close this page before finishing!
                </v-alert>
              </v-layout>
            </v-card-text>
            <v-card-actions>
            <v-layout justify-end class="mt-5">
              <v-btn :to="{name: 'dashboard'}" color="blue darken-2 white--text">Done</v-btn>
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
      secureCheck: false,
      secureCheck2: false,
      selectedXLM: true,
      errorOnContribute: "",
      items: ['BTC', 'ETH', 'XLM']
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
      } = await generateIcoTransactions(
        (parseInt(this.xlmFunded) - 3).toString(),
        this.publicKey,
        this.secretKey
      );
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
        xlmAmount: parseInt(this.xlmFunded) - 3,
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
        const result = addTrustline(this.publicKey, this.secretKey).then(
          result => {
            addDASignerAndUpdateWeight(this.publicKey, this.secretKey).then(
              result => {
            this.contribute()
              .then(data => {
                this.done = true;
              })
              .catch(error => {
                console.log(error);
                this.errorOnContribute =
                  "Something went wrong, please try again.";
              });
              }
            );
          }
        );
      }
      this.step = nextStep;
    }
  },
  computed: {
    funded() {
      return this.xlmFunded ? true : false;
    },
    paymentAmount() {
      return parseInt(this.xlmAmount) + 3;
    },
    hasAcceptedStep1Terms() {
      return this.secureCheck;
    },
    hasAcceptedStep2Terms() {
      return this.secureCheck2;
    }
  }
};
</script>

<style scoped>
.modal {
  width: 700px;
}

.accountDetail {
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.termsCheck label {
  font-size: 10px;
}
</style>

<style scoped child-component="label">
  label {
    font-size: 10px;
  }
</style>
