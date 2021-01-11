<template>
  <v-card class="p-4">
    <form @submit.prevent="onSubmit">
      <h5 class="text-h5 mb-4">Home bookkeeping</h5>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            :error="$v.email.$error"
            :error-messages="$v.email.$error ? 'Email is invalid' : ''"
            hide-details="auto"
            label="Email"
            v-model.trim="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            :error="$v.password.$error"
            :error-messages="$v.password.$error ? 'Password is invalid' : ''"
            hide-details="auto"
            label="Password"
            type="password"
            v-model.trim="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="card-action">
        <v-btn class="my-4" color="primary" type="submit" width="100%">
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
  import {email, minLength, required} from "vuelidate/lib/validators";
  import {validationMixin} from "vuelidate";
  import {LOGIN_ACTION} from "@/store/auth/actions";
  import {LoginPayloadInterface} from "@/store/auth/types";

  export default Vue.extend({
    mixins: [validationMixin],
    data: () => ({
      email: "",
      password: "",
      snackbarMessage: ""
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    methods: {
      async onSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        const formData: LoginPayloadInterface = {
          email: this.email,
          password: this.password
        };
        try {
          await this.$store.dispatch(LOGIN_ACTION, formData);
          await this.$router.push("/");
        } catch (e) {
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  form {
    width: 500px;
  }
</style>
