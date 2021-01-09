<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Profile</h4>
    </div>
    <v-divider class="my-4"></v-divider>

    <form class="form">
      <v-text-field
        label="First name"
        hide-details="auto"
        v-model="firstName"
      ></v-text-field>

      <v-btn color="primary" type="submit" class="mt-4">
        Update
        <v-icon class="ml-4" small>mdi-send</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    firstName: ""
  })
});
</script>
