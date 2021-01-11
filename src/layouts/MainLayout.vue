<template>
  <v-app>
    <NavBar :userInfo="userInfo" @toggleDrawer="toggleDrawer"/>
    <v-navigation-drawer app clipped v-model="drawer">
      <SideBar/>
    </v-navigation-drawer>

    <v-main>
      <v-container class="p-4" fluid>
        <router-view/>
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
    }
  });
</script>
