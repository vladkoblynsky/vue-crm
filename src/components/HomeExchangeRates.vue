<template>
  <v-card class="card orange darken-3 white--text" outlined tile>
    <h5 class="card-title">Exchange rates</h5>
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Exchange</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>USD</td>
          <td>12121</td>
          <td>12.12.12</td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeExchangeRates",
  components: {}
});
</script>
