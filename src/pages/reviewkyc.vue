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
      <td><img :src="props.item.kycDocs.document1" style="width: 50px; height: 50px"></td>
      <td><img :src="props.item.kycDocs.document2" style="width: 50px; height: 50px"></td>
      <td class="justify-center layout px-0">
        <v-btn small text-xs-center color="blue" @click="acceptItem(props.item)">
          Accept
        </v-btn>
        </td>
    </template>
  </v-data-table>
</template>


<script>
  import axios from "../axios";

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
        const url = 'api/kyc/getUsers'
        axios.get(url, {
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
      console.log(this.items.indexOf(item));
      }
    },


  }
</script>
