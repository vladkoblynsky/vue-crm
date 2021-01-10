<template>
  <div>
    <component :is="layout" />
    <v-snackbar
      :value="snackbarMsg"
      :color="
        snackbarMsg && snackbarMsg.variant === 'error' ? 'red' : 'secondary'
      "
      top
      right
    >
      <span class="text-capitalize">{{ snackbarMsg && snackbarMsg.msg }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
          text
          v-bind="attrs"
          @click="clearSnackbarMsg"
          :icon="true"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import { CLEAR_SNACKBAR_MUTATION } from "@/store/message/mutations";

export default Vue.extend({
  name: "App",
  components: {
    MainLayout,
    EmptyLayout
  },
  data: () => ({}),
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
    snackbarMsg() {
      return this.$store.getters.snackbarMsg;
    }
  },
  methods: {
    clearSnackbarMsg() {
      this.$store.commit(CLEAR_SNACKBAR_MUTATION);
    }
  }
});
</script>

<style lang="scss">
@import "~tailwindcss/utilities";
@import "assets/index.css";
</style>
