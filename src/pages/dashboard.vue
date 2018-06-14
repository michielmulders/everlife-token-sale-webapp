<template>
<div>
  <v-layout class="mt-5" column align-center>
    <v-layout column>
      <v-flex text-xs-center>
        <v-layout column>
          <h3>Name: {{user.name}}</h3>
          <h3>Email: {{user.email}}</h3>
          <h3>contribution Address: {{user.contribution.ca2}}</h3>
        </v-layout>
      </v-flex>
      <v-flex text-xs-center class="mt-5">
        <v-layout column>
          <h3>Total Balance: {{everBalance}} EVER</h3>
        </v-layout>
      </v-flex>
    </v-layout>
    <payment-table class="mt-5" :contribution="user.contribution" :everBalance="everBalance"></payment-table>
    <v-layout class="mt-5" align-content-space-between>
      <v-btn :to="{'name': 'contribute'}"> Contribute </v-btn>
      <v-btn @click="logout"> Logout </v-btn>
    </v-layout>
  </v-layout>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccountBalance } from "../stellar/transaction";
import PaymentTable from "../components/PaymentTable.vue";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout(){
      this.$store.dispatch('clearAuthData');
    }
  },
  asyncComputed: {
    everBalance: {
      get () {
        if(!this.user.contribution.ca2){
          return 0;
        }
        return new Promise((resolve, reject) => {
          getAccountBalance(this.user.contribution.ca2)
            .then(result => {
              const everBalance = result.balances.find(balance => {
                if (balance.asset_code == "EVER") {
                  return true;
                }
              });
              resolve(everBalance.balance);
            }).catch(function(error){
              console.log(error);
            })
        })
      },
      default: '0'
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
