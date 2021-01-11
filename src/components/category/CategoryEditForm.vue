<template>
  <div v-if="storeCategories && !!storeCategories.length">
    <h4 class="text-h5 mb-4">Edit</h4>

    <form @submit.prevent="onSubmit">
      <v-autocomplete
        :items="storeCategories.map(cat => ({text: cat.title, value: cat.id}))"
        label="Select category"
        dense
        v-model="categoryId">

      </v-autocomplete>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            hide-details="auto"
            label="Title"
            placeholder="Enter the title"
            v-model="title"
            :error="$v.title.$error"
            :error-messages="$v.title.$error ? 'Title is required' : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            hide-details="auto"
            label="Limit"
            placeholder="Enter limit"
            type="number"
            v-model.number="limit"
            :error="$v.limit.$error"
            :error-messages="$v.limit.$error ? `The field must have a minimum value ${$v.limit.$params.minValue.min}` : ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="flex">
        <v-btn class="mt-4" color="primary" type="submit">
          Update
          <v-icon class="ml-4" small>mdi-update</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!categoryId" class="mt-4" color="error" title="Delete" @click="deleteCategory" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {validationMixin} from "vuelidate";
  import {minValue, required} from "vuelidate/lib/validators";
  import {ICategory, ICategoryEditPayload} from "@/store/category/types";
  import {DELETE_CATEGORY_ACTION, EDIT_CATEGORY_ACTION} from "@/store/category/actions";

  interface DataInterface {
    title: string;
    limit: number;
    categoryId: string;
  }

  const MIN_LIMIT = 10;

  export default Vue.extend({
    name: "CategoryCreateForm",
    mixins: [validationMixin],
    data: (): DataInterface => ({
      title: "",
      limit: MIN_LIMIT,
      categoryId: ""
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(MIN_LIMIT)},
      categoryId: {required}
    },
    watch: {
      categoryId() {
        if (this.categoryId) {
          const cat: ICategory | null = this.$store.getters.categoryById(this.categoryId);
          this.title = cat?.title || "";
          this.limit = cat?.limit || MIN_LIMIT;
        } else {
          this.title = "";
          this.limit = MIN_LIMIT;
        }
      },
      storeCategories(categories: ICategory[] | null) {
        if (!this.categoryId && categories?.length) {
          this.categoryId = categories[0].id || "";
        }
      }
    },
    computed: {
      storeCategories(): ICategory[] {
        return this.$store.getters.storeCategories;
      }
    },
    methods: {
      async onSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        const formData: ICategoryEditPayload = {
          title: this.title,
          limit: this.limit,
          id: this.categoryId
        };
        try {
          await this.$store.dispatch(EDIT_CATEGORY_ACTION, formData);
        } catch (e) {
        }
      },
      async deleteCategory() {
        try {
          await this.$store.dispatch(DELETE_CATEGORY_ACTION, {id: this.categoryId});
          this.categoryId = this.storeCategories ? this.storeCategories[0]?.id || "" : "";
        } catch (e) {
        }
      }
    }
  });
</script>
