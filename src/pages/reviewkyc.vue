<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.name}}</td>
      <td class="text-xs-center">{{ props.item.email}}</td>
      <td class="text-xs-center">{{ props.item.phone}}</td>
      <td class="text-xs-center">{{ props.item.idmStatus}}</td>
      <td><img v-img="{ cursor: 'zoom-in' }" :src="props.item.kycDocs.document1" width="50" height="40" style="margin-top:7px"></td>
      <td><img v-img="{ cursor: 'zoom-in' }" :src="props.item.kycDocs.document2" width="50" height="40" style="margin-top:7px"></td>
      <td class="justify-center layout px-0">
        <v-btn small text-xs-center color="primary" @click="acceptItem(props.item)">
          Accept
        </v-btn>
        <v-btn small text-xs-center color="error" @click="rejectItem(props.item)">
          Reject
        </v-btn>
        </td>
    </template>
  </v-data-table>
</template>


<script>
  import axios from "../axios";
  import Vue from 'vue';
  import VueImg from 'v-img';

  Vue.use(VueImg);
  const vueImgConfig = {
  // Consider alt of image as its title in gallery?
  altAsTitle: false,
}
Vue.use(VueImg, vueImgConfig)

  export default {
    mounted: function () {
      this.getData()
    },

    data: function () {
      return {
        headers: [
            { text: "name", align: "center", sortable: false, value: 'name' },
            { text: "email", align: "center", sortable: false, value: 'email' },
            { text: "phone", align: "center", sortable: false, value: 'phone' },
            { text: "idmStatus", align: "center", sortable: false, value: 'idmStatus' },
            { text: "profilePic", align: "center", sortable: false, value: 'profilePic' },
            { text: "profileId", align: "center", sortable: false, value: 'profileId' },
            { text: "Actions", align: "center", sortable: false},

          ],
          items: []

      }
    },

  methods: {
      getData: function () {
        var self = this
        axios.get('api/kyc/getUsers', {
          dataType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'no-cors',
          credentials: 'include'
        })
        .then(function (response) {
           self.items = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      },

      acceptItem (item) {
          confirm('Are you sure you want to Accept this Kyc user : '+item.name) &&
          axios.post('api/kyc/kycStatus', {
            user_id:item._id, kycStatus:"ACCEPT"
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })

        //Send email to Kyc User

        this.getData();
        this.sendMailItem(item);
      },

      rejectItem (item) {
          confirm('Are you sure you want to Reject this Kyc user : '+item.name) &&
          axios.post('api/kyc/kycStatus', {
            user_id:item._id, kycStatus:"REJECT"
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })
        this.getData();
      },

      sendMailItem (item) {
          console.log('Sending mail to user : '+item.email);
          var itemMessage = { from: process.env.MAILGUN_SENDER_FROM, subject: "Kyc Approved from EverlifeAI", text: "Doe", html:'',

          };
          axios.post('api/communicate/mail', {
            recipient:item.email, message:itemMessage
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })

      }



    },
  }
</script>
