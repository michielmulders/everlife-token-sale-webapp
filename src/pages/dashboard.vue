<template>
  <v-layout column>
    <v-layout row>
      <v-flex>
        <p color="red">{{user.name}}</p>
        <p>{{user.email}}</p>
      </v-flex>
      <v-flex>
        <h1>Whitelist info here</h1>
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
</style>
