<template>
  <v-data-table
    :headers="headers"
    :items="paymentsArray"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.time | formatDate}}</td>
      <td class="text-xs-center">{{ props.item.ever }} EVER</td>
      <td class="text-xs-center">{{ props.item.amount }} {{ props.item.currency }}</td>
      <td class="text-xs-center">{{ props.item.status }}</td>
      <td class="text-xs-center">{{ props.item.ever_amount }} EVER</td>
      <td class="text-xs-center">{{ props.item.ever_bonus }} EVER</td>
      <!--<td class="text-xs-center"><manage-account :ca2="props.item.ca2" :xdr2="props.item.xdr2" :xdr3="props.item.xdr3"></manage-account></td>-->
    </template>
  </v-data-table>
</template>

<script>
import { getAccountBalance } from "../stellar/transaction";
import ManageAccount from "../components/manageAccount";

export default {
  props: ["payments"],
  data() {
    return {
      headers: [
        { text: "Time", align: "center", sortable: false },
        { text: "Purchased Tokens", align: "center", sortable: false },
        { text: "Token Cost", align: "center", sortable: false },
        { text: "Status", align: "center", sortable: false },
        { text: "Issued Tokens", align: "center", sortable: false },
        { text: "Credited Bonus", align: "center", sortable: false },
        // { text: "Actions", align: "center", sortable: false},
      ]
    };
  },
  asyncComputed: {
    paymentsArray: {
      get() {
        return this.payments.map((p) => {
          return {
            time: p.createdAt,
            amount: p.amount_expected,
            currency: p.currency,
            ever: p.ever_expected,
            status: p.status,
            ever_amount: p.ever_amount,
            ever_bonus: p.ever_bonus
          };
        });
      },
      default() {
        return []
      }
    }
  },
  methods: {
  },

  components: {
    ManageAccount
  }
};
</script>

