<template>
  <v-layout>
    <payment-table class="mt-5 table" :contributions="user.contributions"></payment-table>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import PaymentTable from "../components/ReviewKycTable.vue";

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
