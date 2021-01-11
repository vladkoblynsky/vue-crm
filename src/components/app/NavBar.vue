<template>
  <v-app-bar app clipped-left color="#ffa726" justify-space-between>
    <div class="flex items-center">
      <v-app-bar-nav-icon
        @click.prevent="$emit('toggleDrawer')"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{
        date.toString() | date("datetime")
        }}
      </v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" height="64" text v-bind="attrs" v-on="on">
            {{ userInfo && userInfo.firstName }}
            <v-icon dark right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link to="/profile">
            <v-list-item-title>
              <v-icon left>
                mdi-account
              </v-icon>
              Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logout" link>
            <v-list-item-title>
              <v-icon left>
                mdi-logout
              </v-icon>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import Vue from "vue";
  import {LOGOUT_ACTION} from "@/store/auth/actions";
  import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
  import messages from "@/utils/messages";
  import {UserInfoInterface} from "@/store/user/types";

  interface DataInterface {
    date: Date;
    intervalId: number | null;
  }

  export default Vue.extend({
    props: {
      userInfo: Object as () => UserInfoInterface | null
    },
    data: (): DataInterface => ({
      date: new Date(),
      intervalId: null
    }),
    methods: {
      async logout() {
        await this.$store.dispatch(LOGOUT_ACTION);
        await this.$store.commit(SET_SNACKBAR_MUTATION, {
          msg: messages.logout,
          variant: "info"
        });
        await this.$router.push("/login");
      }
    },
    mounted() {
      this.intervalId = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.intervalId || undefined);
    }
  });
</script>
