<template>
  <div>
    <div class="my-4 flex items-center justify-between">
      <h4 class="text-h4">Score</h4>
      <v-btn color="primary" elevation="2">
        <i class="material-icons">refresh</i>
      </v-btn>
    </div>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="auto" sm="12" md="5">
        <v-card class="card light-blue white--text min-h-300" outlined tile>
          <span class="card-title">Score with currency</span>
          <p class="currency-line">
            <span>12.0 USD</span>
          </p>
        </v-card>
      </v-col>
      <v-col cols="auto" sm="12" md="7">
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {}
});
</script>

<style lang="scss" scope>
.card {
  min-height: 300px;
  padding: 20px;
}
.card-title {
  display: block;
  line-height: 32px;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 300;
}
.currency-line {
  align-items: center;
  border-bottom: 2px solid #fff;
  padding-bottom: 1rem;
  padding-top: 1.5rem;
  margin: 0;
  & span {
    font-size: 1.5rem;
  }
}
</style>
