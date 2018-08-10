<template>
  <v-layout column>
    <v-layout row class="details-section font-weight-thin">
      <v-flex class="mr-2">
        <v-card>
          <v-card-title><h4>Account Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>Name: {{ user.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Email: {{ user.email }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><span>Kyc: <span class="text--darken-3" :class="getKycDetails().color+'--text'">{{ getKycDetails().text }}</span> </span></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content></v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-title><h4>Token Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>Token: EVER (Alpha 4)</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Issuer ID: GDRCJ5OJTTIL4VUQZ52PCZYAUINEH2CUSP5NC2R6D6WQ47JBLG6DF5TE</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Total Supply: 500,000,000</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Decimals: 7</v-list-tile-content>
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
    ...mapGetters(["user"])
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
  font-family: serif;
}
</style>
