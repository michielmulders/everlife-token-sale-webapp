<template>
<div>
  <v-layout row>
    <v-flex text-xs-center>
      <v-layout column>
        <h3>Name: {{user.name}}</h3>
        <h3>Email: {{user.email}}</h3>
        <h3>contribution Address: {{user.ca}}</h3>
      </v-layout>
    </v-flex>
    <v-flex text-xs-center>
      <v-layout column>
        <h3>Token: {{everBalance}} EVER</h3>
      </v-layout>
    </v-flex>
  </v-layout>
  <v-layout align-content-space-between>
    <v-btn :to="{'name': 'contribute'}"> Contribute </v-btn>
    <v-btn @click="logout"> Logout </v-btn>
  </v-layout>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccountBalance } from "../stellar/transaction";

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
        if(!this.user.ca){
          return 0;
        }
        return new Promise((resolve, reject) => {
          getAccountBalance(this.user.ca)
            .then(result => {
              console.log(result);
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
  }
};
</script>
