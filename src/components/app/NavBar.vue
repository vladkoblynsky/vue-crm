<template>
  <v-app-bar app color="#ffa726" clipped-left justify-space-between>
    <div class="flex items-center">
      <v-app-bar-nav-icon @click.prevent="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>12.12.12</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" text v-bind="attrs" v-on="on" height="64">
            User name
            <v-icon right dark>
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
          <v-list-item link to="/logout">
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
export default Vue.extend({
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    }
  }
});
</script>
