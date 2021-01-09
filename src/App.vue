<template>
  <div>
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";

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
    }
  }
});
</script>

<style lang="scss">
// @import "~tailwindcss/base";
// @import "~tailwindcss/components";
@import "~tailwindcss/utilities";
@import "assets/index.css";
</style>
