<template>
  <v-app>
    <v-progress-linear v-show="loading" absolute indeterminate class="z-10"/>
    <NavBar :userInfo="userInfo" @toggleDrawer="toggleDrawer"/>
    <v-navigation-drawer app clipped v-model="drawer">
      <SideBar/>
    </v-navigation-drawer>

    <v-main>
      <v-container class="p-4" fluid>
        <router-view v-if="!loading"/>
      </v-container>
      <v-fab-transition>
        <v-btn bottom color="primary" dark fab fixed right to="/record">
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
  import {FETCH_USER_INFO_ACTION} from "@/store/user/actions";

  export default Vue.extend({
    components: {
      NavBar,
      SideBar
    },
    data: () => ({
      loading: true,
      drawer: true
    }),
    methods: {
      toggleDrawer: function () {
        this.drawer = !this.drawer;
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      }
    },
    async mounted() {
      await this.$store.dispatch(FETCH_USER_INFO_ACTION);
      this.loading = false;
    }
  });
</script>
