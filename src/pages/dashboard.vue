<template>
  <v-layout column>
    <v-layout v-bind="binding" wrap class="details-section">
      <v-flex class="pa-2">
        <v-card>
          <v-card-title><h4>Account Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list class="text--darken-3 grey--text">
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Name: {{ user.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Email: {{ user.email }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text"><span>Kyc: <span class="text--darken-3" :class="getKycDetails().color+'--text'">{{ getKycDetails().text }}</span> </span></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text"><v-btn v-show="isKycSubmitted()" outline color="success" class="ma-0" to="/kyc">Submit KYC</v-btn></v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title><h4>Token Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Token: EVER (Alpha 4)</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Issuer ID: GDRCJ5OJTTIL4VUQZ52PCZYAUINEH2CUSP5NC2R6D6WQ47JBLG6DF5TE</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Total Supply: 500,000,000</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">Decimals: 7</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <payment-table class="mt-5 table" :contributions="user.contributions"></payment-table>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentTable from "../components/PaymentTable.vue";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),

    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndUp) binding.row = true;
      else binding.column = true;
      return binding;
    }
  },
  methods: {
    getKycDetails() {
      if (this.user.kyc) {
        return {
          text: "Verified!",
          color: "green"
        };
      } else if (!this.user.kycDocs.document1) {
        return {
          text: "Documents not submited!",
          color: "red"
        };
      } else if (this.user.kycDocs.document1 && !this.user.kyc) {
        return {
          text: "Verifying!",
          color: "yellow"
        };
      }
    },
    isKycSubmitted() {
      if (this.user.kycDocs.document1) {
        return false;
      } else {
        return true;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("updateProfile");
  },
  components: {
    PaymentTable
  }
};
</script>
<style scoped>
.table {
  width: 100%;
}

.details-section {
  font-family: "PT Sans", sans-serif;
}
</style>
