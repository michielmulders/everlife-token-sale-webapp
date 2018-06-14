<template>
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
        <v-card color="lighten-1" class="mb-5" height="200px">
            <v-card-title> Enter XLM you want to contribute </v-card-title>
            <v-card-actions>
                <v-text-field
                    v-model="xlmAmount"
                    label="XLM"
                    type="number"
                    required
                ></v-text-field>
            </v-card-actions>
        </v-card>
        <v-btn color="primary" @click="nextStep(2)">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="lighten-1" class="mb-5" height="200px">
            <h2> Account details </h2>
            Copy these account details and keep safe, EVER tokens will be sent to this account.
            <h3> public : {{publicKey}} </h3>
            <h3> secret : {{secretKey}} </h3>
        </v-card>
        <v-btn color="primary" @click="nextStep(3)">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card color="lighten-1" class="mb-5" height="200px">
            <h2> Dont refresh or close this page before finishing. </h2>
            Send {{xlmAmount}} XLMs to below address to purchase EVER token
            <h3> address : {{publicKey}} </h3>

            <h2>XLM funded: {{xlmFunded}}</h2>
        </v-card>
        <v-btn color="primary" @click="nextStep(4)" :disabled="!funded">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card color="lighten-1" class="mb-5" height="200px">
            <p v-show="!done">Purchasing ever tokens.</p>
            <p v-show="done"> Ever token purchased </p>
        </v-card>
        <v-btn color="primary" :to="{name: 'dashboard'}" :disabled="!done">Done</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  
</template>


<script>
import axios from "../axios";
import {
  generateAccount,
  getAccountBalance,
  addTrustline,
  generateIcoTransactions
} from "../stellar/transaction";

export default {
  data() {
    return {
      done: false,
      step: 0,
      xlmAmount: 0,
      publicKey: "",
      secretKey: "",
      xlmFunded: 0
    };
  },
  mounted() {
    const account = generateAccount();
    this.publicKey = account.publicKey;
    this.secretKey = account.secretKey;
    this.$store.commit("secret", this.secretKey);
    this.$store.commit("caAddress", this.publicKey);
  },

  methods: {
    async generateTransactions() {
      try {
        var transaction = await generateIcoTransactions(this.xlmAmount);
      } catch (error) {
        console.log(error);
      }
      const xdr = transaction
        .toEnvelope()
        .toXDR()
        .toString("base64");
      axios
        .post("api/account/contribute", {
          XDR1: xdr,
          XDR2: 'abc', // to be updated
          XDR3: 'abc', // to be updated
          xlmAmount: this.xlmAmount,
          ca2: this.publicKey
        })
        .then(function({ data }) {
        })
        .catch(function(error) {
          console.log(error);
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
        const result = addTrustline().then(result => {
          this.generateTransactions();
          this.done = true;
        });
      }
      this.step = nextStep;
    }
  },
  computed: {
    funded: function() {
      return this.xlmFunded ? true : false;
    }
  }
};
</script>

<style>
.modal {
  width: 700px;
}
</style>
