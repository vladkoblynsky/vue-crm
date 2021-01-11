<template>
  <div>
    <h4 class="text-h5 mb-4">Create</h4>

    <form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            :error="$v.title.$error"
            :error-messages="$v.title.$error ? 'Title is required' : ''"
            hide-details="auto"
            label="Title"
            placeholder="Enter the title"
            v-model="title"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            :error="$v.limit.$error"
            :error-messages="$v.limit.$error ? `The field must have a minimum value ${$v.limit.$params.minValue.min}}` : ''"
            hide-details="auto"
            label="Limit"
            placeholder="Enter limit"
            type="number"
            v-model.number="limit"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn class="mt-4" color="primary" type="submit">
        Create
        <v-icon class="ml-4" small>mdi-plus</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {validationMixin} from "vuelidate";
  import {minValue, required} from "vuelidate/lib/validators";
  import {ICategoryPayload} from "@/store/category/types";
  import {CREATE_CATEGORY_ACTION} from "@/store/category/actions";

  export default Vue.extend({
    name: "CategoryCreateForm",
    mixins: [validationMixin],
    data: () => ({
      title: "",
      limit: 1
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(10)}
    },
    methods: {
      async onSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        const formData: ICategoryPayload = {
          title: this.title,
          limit: this.limit
        };
        try {
          await this.$store.dispatch(CREATE_CATEGORY_ACTION, formData);
          this.title = "";
          this.limit = 1;
          this.$v.$reset();
        } catch (e) {
        }
      }
    }
  });
</script>
