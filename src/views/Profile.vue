<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Profile</h4>
    </div>
    <v-divider class="my-4"></v-divider>

    <form class="form">
      <v-text-field
        hide-details="auto"
        label="First name"
        v-model="firstName"
      ></v-text-field>

      <v-btn class="mt-4" color="primary" type="submit">
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
