<template>
  <div>
    <div class="my-4 flex items-center justify-between">
      <h4 class="text-h4">Bill</h4>
      <v-btn
        :disabled="loading"
        @click.prevent="refreshRates"
        color="primary"
        elevation="2"
      >
        <i class="material-icons">refresh</i>
      </v-btn>
    </div>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="auto" md="5" sm="12">
        <HomeBill
          :bill="bill"
          :exchangeRates="exchangeRates"
          :loading="loading"
        />
      </v-col>
      <v-col cols="auto" md="7" sm="12">
        <HomeExchangeRates :exchangeRates="exchangeRates" :loading="loading"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import HomeBill from "../components/HomeBill.vue";
  import HomeExchangeRates from "../components/HomeExchangeRates.vue";
  import {FETCH_EXCHANGE_RATES_ACTION} from "@/store/user/actions";

  export default Vue.extend({
    name: "Home",
    data: () => ({
      loading: true
    }),
    components: {
      HomeBill,
      HomeExchangeRates
    },
    computed: {
      exchangeRates() {
        return this.$store.getters.exchangeRates;
      },
      bill() {
        return this.$store.getters.userInfo?.bill;
      }
    },
    methods: {
      async refreshRates() {
        this.loading = true;
        await this.$store.dispatch(FETCH_EXCHANGE_RATES_ACTION);
        this.loading = false;
      }
    },
    async mounted() {
      await this.$store.dispatch(FETCH_EXCHANGE_RATES_ACTION);
      this.loading = false;
    }
  });
</script>
