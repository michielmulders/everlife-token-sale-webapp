<template>

  <v-layout column>

    <v-alert v-show="alert.show" :color="alert.color" style="width:100%">
        <span>{{alert.text}}</span>
        <span v-show="alert.rshow"><router-link  :to="{ name: 'kyc'}"  class="text-color:white">Click Here</router-link> to do KYC</span>
    </v-alert>

    <v-layout v-bind="binding" wrap class="details-section">
      <v-flex xs12 sm4 class="pa-2">
        <v-card>
          <v-card-title><h4>Purchased Tokens</h4></v-card-title>
          <v-divider></v-divider>
          <v-list class="text--darken-3 grey--text">
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_amount }} EVER</v-list-tile-content>
            </v-list-tile>


          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 class="pa-2">
        <v-card>
          <v-card-title><h4>Bonus Tokens</h4></v-card-title>
          <v-divider></v-divider>
          <v-list class="text--darken-3 grey--text">
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_bonus }} EVER</v-list-tile-content>
            </v-list-tile>


          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 class="pa-2">
        <v-card>
          <v-card-title><h4>Total Tokens</h4></v-card-title>
          <v-divider></v-divider>
          <v-list class="text--darken-3 grey--text">
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_total }} EVER</v-list-tile-content>
            </v-list-tile>


          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center style="height:320px">
        <v-flex xs12 sm8 class="pa-2" style="height:320px">
        <v-card >
           <table>
           </tr>
              <tr>
                <td  class="pa-4">
                  <div  class="title">How it Works</div>
                  <div class="pt-4">Each token is equivalent to 0.1 USD with estimated crypto conversion listed next to each purchase amount. <BR/> <BR/></div>
                  Please watch the video to understand how the purchase process works. <BR/>
                  All purchases are subject to a 14 day freeze period. <BR/><BR/>
                  <v-btn  color="secondary">FAQ / Learn More</v-btn>
                </td>
                <td  class="pa-2"> <iframe width="250" height="200" src="https://www.youtube.com/embed/A2DrqxT5M2c" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></td>
              </tr>
             </table>

        </v-card>
      </v-flex>
      <v-flex xs12 sm4 class="pa-2">
        <v-card>
              <v-container  fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <div class="subheading">Purchase a custom amount of EVER</div>
                    <div style="padding-top:20px" class="display-1 text-xs-center font-weight-bold">{{ slider }}</div>
                    <div style="padding-top:0px" class="subheading text-xs-center">EVER</div>

                    <div>
                      <v-flex class="pr-3">
                        <v-slider
                          v-model="slider"
                          :max="max"
                          :min="min"
                        ></v-slider>
                      </v-flex>
                    </div>
                    <div>
                    <v-flex>
                      <v-btn block color="info" v-show="alert.enablePurchaseBtn" :to="{ name: 'payment', params: { amountEver: slider }}">Buy Now</v-btn>
                      <v-btn block  disabled v-show="!alert.enablePurchaseBtn">Disabled</v-btn>

                    </v-flex>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>



            <v-card-actions>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>


    <v-layout justify-center class="mt-3">
      <v-flex xs12 sm12>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                v-bind="{ [`xs${card.flex}`]: true }"
                :key="card.title"
              >
                <v-card>
                  <v-container>
                      <v-img :src="card.src"  outline height="130px"></v-img>
                      <v-container fill-height fluid pa-2 text-xs-center>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="subheading font-weight-medium " v-text="card.ever">Ever</span>
                            <span class="subheading "> EVER</span>
                          </v-flex>
                        </v-layout>
                      </v-container>

                    <template>


                    </template>
                    <div>
                        <v-btn block color="info" dark v-show="alert.enablePurchaseBtn" :to="{ name: 'payment', params: { amountEver: card.ever }}">Buy Now</v-btn>
                        <v-btn block  disabled v-show="!alert.enablePurchaseBtn">Disabled</v-btn>
                    </div>
                </v-container>
                </v-card>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <payment-table class="mt-3 table" :payments="user.payments"></payment-table>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentTable from "../components/PaymentTable.vue";

export default {
  data() {
    return {
    min: 0,
        max: 10000000,
        slider: 10000,
        range: [0, 10000000],
      cards: [
        { src: 'https://everlife.ai/images/coin/ever-coin-1.png', flex: 3, ever:'250' },
        { src: 'https://everlife.ai/images/coin/ever-coin-2.png', flex: 3, ever:'1,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-3.png', flex: 3, ever:'2,500'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-4.png', flex: 3, ever:'5,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-5.png', flex: 3, ever:'10,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-6.png', flex: 3, ever:'25,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-7.png', flex: 3, ever:'100,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-8.png', flex: 3, ever:'500,000'  },


      ]
    }
  },
  computed: {
    ...mapGetters(["user","aggregates"]),

    alert: function () {
      if (this.user.kycStatus=="ACCEPT") {
        return {show:false, enablePurchaseBtn:true};
      }else if(this.user.kycStatus=="REJECT"){
        return {show:true,  rshow:true, enablePurchaseBtn:false, color:"error", text:"We regret to inform you that your KYC application was rejected."};
      }else if(this.user.kycStatus=="PENDING"){
        return {show:true, rshow:false, enablePurchaseBtn:false, color:"warning", text:"Waiting for KYC approval, a notification e-mail will be sent once verification is complete."};
      }else{
        return {show:true, rshow:true, enablePurchaseBtn:false, color:"error", text:"Your KYC is Pending."};
      }

    },
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
