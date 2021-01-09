<template>
  <v-card class="p-4">
    <form class="card auth-card">
      <div class="card-content">
        <h5 class="text-h5 mb-4">Home bookkeeping</h5>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Email"
              hide-details="auto"
              v-model="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Password"
              hide-details="auto"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="card-action">
        <v-btn color="primary" type="submit" class="my-4" width="100%">
          Login
        </v-btn>

        <p class="text-center">
          Don't have an account?
          <router-link
            class="text-uppercase text-decoration-none"
            to="/register"
          >
            Register
          </router-link>
        </p>
      </div>
    </form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    email: "",
    password: ""
  })
});
</script>
