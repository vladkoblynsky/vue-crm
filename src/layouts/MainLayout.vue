<template>
  <v-app>
    <v-progress-linear absolute class="z-10" indeterminate v-show="loading"/>
    <NavBar :userInfo="userInfo" @toggleDrawer="toggleDrawer"/>
    <v-navigation-drawer app clipped v-model="drawer">
      <SideBar/>
    </v-navigation-drawer>

    <v-main>
      <v-container class="p-4" fluid>
        <router-view v-if="userInfo"/>
      </v-container>
      <v-tooltip left open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn bottom color="primary" dark fab fixed right to="/record" v-bind="attrs"
                   v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <span>Add new record</span>
      </v-tooltip>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import NavBar from "@/components/app/NavBar.vue";
  import SideBar from "@/components/app/SideBar.vue";
  import {FETCH_USER_INFO_ACTION} from "@/store/user/actions";
  import {SET_LOADING_MUTATION} from "@/store/main/mutations";
  import {UserInfoInterface} from "@/store/user/types";

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
      },
      setLoading(val: boolean) {
        this.$store.commit(SET_LOADING_MUTATION, val);
      }
    },
    computed: {
      loading(): boolean {
        return this.$store.getters.loading;
      },
      userInfo(): UserInfoInterface {
        return this.$store.getters.userInfo;
      }
    },
    async mounted() {
      this.setLoading(true);
      await this.$store.dispatch(FETCH_USER_INFO_ACTION);
      this.setLoading(false);
    }
  });
</script>
