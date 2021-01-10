<template>
  <div>
    <div class="my-4 flex items-center justify-between">
      <h4 class="text-h4">Bill</h4>
      <v-btn color="primary" elevation="2">
        <i class="material-icons">refresh</i>
      </v-btn>
    </div>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="auto" sm="12" md="5">
        <HomeBill />
      </v-col>
      <v-col cols="auto" sm="12" md="7">
        <HomeExchangeRates />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HomeBill from "../components/HomeBill.vue";
import HomeExchangeRates from "../components/HomeExchangeRates.vue";
import { FETCH_EXCHANGE_RATES_ACTION } from "@/store/user/actions";

export default Vue.extend({
  name: "Home",
  components: {
    HomeBill,
    HomeExchangeRates
  },
  async mounted() {
    // await this.$store.dispatch(FETCH_EXCHANGE_RATES_ACTION);
  }
});
</script>

<style lang="scss" scoped>
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
