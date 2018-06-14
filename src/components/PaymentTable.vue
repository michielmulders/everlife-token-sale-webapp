<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    hide-actions
    class="elevation-1 table"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.time | formatDate}}</td>
      <td class="text-xs-center">{{ props.item.xlmAmount }} XLM</td>
      <td class="text-xs-center">{{ props.item.everBalance }}</td>
      <td class="text-xs-center">{{ props.item.bonus }}</td>
      <td class="text-xs-center">{{ props.item.total }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["contribution", "everBalance"],
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
        { text: "Total EVER", align: "center" }
      ]
    };
  },
  computed: {
    payments: function() {
      return [
        {
          value: false,
          time: this.contribution.createdAt,
          xlmAmount: this.contribution.xlmAmount,
          everBalance: this.everBalance,
          bonus: 0,
          total: this.everBalance // will be + bonus later
        }
      ];
    }
  }
};
</script>

<style>
.table {
  width: 70%;
}
</style>
