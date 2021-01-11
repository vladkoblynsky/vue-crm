<template>
  <v-card class="card light-blue white--text min-h-300" outlined tile>
    <span class="card-title">Bill</span>
    <v-progress-linear
      absolute
      color="#fff"
      indeterminate
      v-show="!exchangeRates || loading"
    ></v-progress-linear>
    <table v-if="!!exchangeRates">
      <colgroup>
        <col/>
        <col :width="50"/>
      </colgroup>
      <thead>
      <tr>
        <th>Amount</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      <tr :key="rate" v-for="rate of rates">
        <td>{{ getPrice(rate) }}</td>
        <td class="text-right">{{ rate }}</td>
      </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script lang="ts">
  import Vue from "vue";
  import {IExchangeRates} from "@/store/user/types";

  export default Vue.extend({
    name: "HomeBill",
    data: () => ({
      rates: ["USD", "EUR", "UAH", "BYN", "RUB"]
    }),
    methods: {
      getPrice(currency: string) {
        if (!this.exchangeRates) return;
        return (this.exchangeRates.rates[currency] * (this.bill || 0)).toFixed(2);
      }
    },
    props: {
      exchangeRates: Object as () => IExchangeRates | null,
      bill: Number || null,
      loading: Boolean
    }
  });
</script>
