<template>
<div>
  <v-layout class="mt-5" column>
    <v-layout column align-center>
      <v-flex text-xs-center>
        <v-layout column>
          <h3>Name: {{user.name}}</h3>
          <h3>Email: {{user.email}}</h3>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <payment-table class="mt-5" :contributions="user.contributions"></payment-table>
    </v-layout>
    <v-layout class="mt-5" justify-space-around>

        <v-btn :to="{'name': 'contribute'}"> Contribute </v-btn>
        <v-btn> Get account access </v-btn>
        <v-btn> Get XLMs back </v-btn>
        <v-btn @click="logout"> Logout </v-btn>

    </v-layout>
  </v-layout>
</div>
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
  
  beforeMount() {
    this.$store.dispatch("updateProfile");
  },
  components: {
    PaymentTable
  }
};
</script>
