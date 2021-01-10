<template>
  <v-card class="p-4">
    <form @submit.prevent="onSubmit">
      <h5 class="text-h5 mb-4">Home bookkeeping</h5>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Email"
            hide-details="auto"
            v-model="email"
            :error="$v.email.$error"
            :error-messages="$v.email.$error ? 'Email is invalid' : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Password"
            hide-details="auto"
            type="password"
            v-model="password"
            :error="$v.password.$error"
            :error-messages="$v.password.$error ? 'Password is invalid' : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            label="First name"
            hide-details="auto"
            v-model="firstName"
            :error="$v.firstName.$error"
            :error-messages="$v.firstName.$error ? 'First name is invalid' : ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <p>
        <v-checkbox
          v-model="agreeWithRules"
          :label="'I agree with the rules'"
          :error="$v.agreeWithRules.$error"
        ></v-checkbox>
      </p>
      <div class="card-action">
        <v-btn color="primary" type="submit" class="my-4" width="100%">
          Register
        </v-btn>
        <p class="text-center">
          Already have an account?
          <router-link class="text-uppercase text-decoration-none" to="/login">
            Login!
          </router-link>
        </p>
      </div>
    </form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { email, required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { RegisterPayloadInterface } from "@/store/auth/types";
import { REGISTER_ACTION } from "@/store/auth/actions";

export default Vue.extend({
  mixins: [validationMixin],
  data: () => ({
    email: "",
    password: "",
    firstName: "",
    agreeWithRules: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    firstName: { required },
    agreeWithRules: { checked: v => v }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData: RegisterPayloadInterface = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        bill: 10000
      };
      try {
        await this.$store.dispatch(REGISTER_ACTION, formData);
        await this.$router.push("/");
      } catch (e) {}
    }
  }
});
</script>

<style lang="scss" scoped>
form {
  width: 500px;
}
</style>
