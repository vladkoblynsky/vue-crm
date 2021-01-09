<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">New record</h4>
    </div>
    <v-divider class="my-4"></v-divider>

    <form class="form">
      <v-select :items="categories" label="Select category"></v-select>
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="val in ['Income', 'Consumption']"
          :key="val"
          :label="val"
          :value="val"
        ></v-radio>
      </v-radio-group>
      <v-text-field
        label="Amount"
        :rules="rulesAmount"
        type="number"
        hide-details="auto"
        v-model="amount"
      ></v-text-field>
      <v-text-field
        label="Description"
        :rules="rulesDescription"
        hide-details="auto"
        v-model="description"
      ></v-text-field>
      <v-btn color="primary" type="submit" class="mt-4">
        Create
        <v-icon class="ml-4" small>mdi-send</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    categories: ["name cat"],
    radioGroup: "Income",
    amount: "100",
    rulesAmount: [
      (value: number | null) => !!value || "Required.",
      (value: number) => value >= 100 || "Min 100"
    ],
    description: "",
    rulesDescription: [(value: string | null) => !!value || "Required."]
  })
});
</script>
