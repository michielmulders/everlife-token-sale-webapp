<template>
  
    <v-dialog
      v-model="dialog"
      width="500"
    >
        <v-btn slot="activator" flat icon color="black"><i class="fa fa-cogs"></i></v-btn>
        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Account Action
            </v-card-title>
            <v-card-text>
                <v-layout column>
                    <p> * Based on ICO status you can perform any one of the below action.</p>
                    <p> * Get account access will remove the spending limit and additional signers from your contribution account.</p>
                    <p> * Keep below account secret ready and you can start spending your EVER token</p>
                    <p class="contributionAddress"> {{ ca2 }}</p>
                    <v-flex>
                        <v-layout row>
                            <v-btn @click="submitXdr(xdr2)"
                                :disabled="!trxBtnEnabled" color="blue darken-2 white--text"
                                class="ma-3" large> Get Account Access </v-btn>
                            <v-btn @click="submitXdr(xdr3)"
                                :disabled="!trxBtnEnabled" color="blue darken-2 white--text"
                                class="ma-3" large> Get refund </v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <v-alert :value="successMessage" type="success">
                            {{successMessage}}
                        </v-alert>
                        <v-alert :value="errorMessage" type="error">
                            {{errorMessage}}
                        </v-alert>
                    </v-flex>
                    <v-divider></v-divider>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                > Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {submitXdr} from '../stellar/transaction'

export default {
  props: ['ca2', 'xdr2', 'xdr3'],
  data() {
    return {
      dialog: false,
      trxBtnEnabled: true,
      successMessage: null,
      errorMessage: null,
    };
  },

  methods: {
      submitXdr(xdr){
          this.trxBtnEnabled = false;
          submitXdr(xdr).then((result)=>{
              this.successMessage = "Transaction Successful";
              this.trxBtnEnabled = false;
          }).catch((error)=> {
              this.errorMessage = "Failed, you have already done this or else retry after a refresh"
              this.trxBtnEnabled = false;
          })
      }
  }
};
</script>

<style scoped>
.contributionAddress{
    word-wrap: break-word;
}
</style>
