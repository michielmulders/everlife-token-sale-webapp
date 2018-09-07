<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.name}}</td>
      <td class="text-xs-center">{{ props.item.email }}</td>
      <td class="text-xs-center">{{ props.item.phone }}</td>
      <td class="text-xs-center">{{ props.item.photo }}</td>
      <td class="text-xs-center">{{ props.item.photoid }}</td>
      <td class="text-xs-center"><manage-account :ca2="props.item.ca2" :xdr2="props.item.xdr2" :xdr3="props.item.xdr3"></manage-account></td>
    </template>
  </v-data-table>
</template>

<script>
import { getAccountBalance, submitXdr } from "../stellar/transaction";
import ManageAccount from "../components/manageAccount";

export default {
  props: ["contributions"],
  data() {
    return {
      headers: [
        { text: "Name", align: "center", sortable: false, value: 'name' },
        { text: "Email", align: "center", sortable: false, value: 'email' },
        { text: "Phone", align: "center", sortable: false, value: 'phone' },
        { text: "Selfie Photo", align: "center", sortable: false, value: 'photo' },
        { text: "PhotoId", align: "center", sortable: false, value: 'photoid' },
        { text: "Actions", align: "center", sortable: false},
      ]
    };
  }
};
</script>
