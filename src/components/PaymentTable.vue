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
      <td class="text-xs-center"><v-btn flat icon color="black"><i class="fa fa-cogs"></i></v-btn></td>
    </template>
  </v-data-table>
</template>

<script>
import { getAccountBalance, submitXdr } from "../stellar/transaction";
export default {
  props: ["contributions"],
  data() {
    return {
      headers: [
        {
          text: "Time",
          align: "center",
          sortable: false
        },
        { text: "XLM Paid", align: "center" },
        { text: "EVER Purchased", align: "center" },
        { text: "Bonus", align: "center" },
        { text: "Total EVER", align: "center" },
        { text: "Manage", align: "center" },
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
            total: this.everBalance // will be + bonus later
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
  }
};
</script>

