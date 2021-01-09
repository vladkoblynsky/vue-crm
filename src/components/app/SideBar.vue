<template>
  <v-list>
    <v-list-item
      v-for="link of links"
      link
      exact
      :to="link.href"
      :key="link.href"
    >
      <v-list-item-content>
        <v-list-item-title>{{ link.label }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    links: [
      { href: "/", label: "Score" },
      { href: "/history", label: "History" },
      { href: "/planning", label: "Planning" },
      { href: "/record", label: "New record" },
      { href: "/categories", label: "Categories" }
    ]
  })
});
</script>
