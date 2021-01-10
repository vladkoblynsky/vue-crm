<template>
  <v-card class="card orange darken-3 white--text" outlined tile>
    <h5 class="card-title">Exchange rates</h5>
    <v-progress-linear
      v-show="!exchangeRates || loading"
      color="#fff"
      absolute
      indeterminate
    ></v-progress-linear>
    <table v-if="!!exchangeRates">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Exchange</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="currency of rates" :key="currency">
          <td>{{ currency }}</td>
          <td>{{ exchangeRates.rates[currency].toFixed(5) }}</td>
          <td>{{ exchangeRates.date | date("date") }}</td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { IExchangeRates } from "@/store/user/types";

export default Vue.extend({
  name: "HomeExchangeRates",
  data: () => ({
    rates: ["USD", "EUR", "UAH", "BYN", "RUB"]
  }),
  props: {
    exchangeRates: Object as () => IExchangeRates | null,
    loading: Boolean
  }
});
</script>
