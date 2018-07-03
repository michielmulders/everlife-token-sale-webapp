<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.time | formatDate}}</td>
      <td class="text-xs-center">{{ props.item.xlmAmount }} XLM</td>
      <td class="text-xs-center">{{ props.item.everBalance }}</td>
      <td class="text-xs-center">{{ props.item.bonus }}</td>
      <td class="text-xs-center">{{ props.item.total }}</td>
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
        { text: "Time", align: "center", sortable: false, value: 'time' },
        { text: "XLM Paid", align: "center", sortable: false, value: 'xlmAmount' },
        { text: "EVER Purchased", align: "center", sortable: false, value: 'everBalance' },
        { text: "Bonus", align: "center", sortable: false, value: 'bonus' },
        { text: "Total EVER", align: "center", sortable: false, value: 'total' },
        { text: "Manage", align: "center", sortable: false},
      ]
    };
  },
  asyncComputed: {
    payments: {
      async get(){
        const paymentsArray = await Promise.all(this.contributions.map(async (payment, index, array) => {
          const entry = {
            value: false,
            time: payment.createdAt,
            xlmAmount: payment.xlmAmount,
            everBalance: await this.everBalance(payment.ca2),
            bonus: 0,
            total: this.everBalance, // will be + bonus later
            ca2: payment.ca2,
            xdr2: payment.xdr2,
            xdr3: payment.xdr3,
          };
          entry.total = entry.everBalance;
          return entry;
        }));
        return paymentsArray;
      },
      default(){
        return []
      }
    }
  },
  methods: {
    async everBalance(ca2){
      if (!ca2) {
        return 0;
      }
      const result = await getAccountBalance(ca2);
      const everBalance = result.balances.find(balance => {
        if (balance.asset_code == "EVER") {
          return true;
        }
      });
      return everBalance.balance;
    }
  },

  components: {
    ManageAccount
  }
};
</script>

