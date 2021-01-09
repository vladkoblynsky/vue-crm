<template>
  <v-app>
    <NavBar @toggleDrawer="toggleDrawer" />
    <v-navigation-drawer v-model="drawer" app clipped>
      <SideBar />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="p-4">
        <router-view />
      </v-container>
      <v-fab-transition>
        <v-btn color="primary" to="/record" dark fixed bottom right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/app/NavBar.vue";
import SideBar from "@/components/app/SideBar.vue";
export default Vue.extend({
  components: {
    NavBar,
    SideBar
  },
  data: () => ({
    drawer: true
  }),
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    }
  }
});
</script>
