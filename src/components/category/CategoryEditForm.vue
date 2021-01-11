<template>
  <div>
    <h4 class="text-h5 mb-4">Edit</h4>

    <form @submit.prevent="onSubmit">
      <v-select v-if="!!storeCategories"
                loading="!storeCategories"
                :items="storeCategories.map(cat => ({text: cat.title, value: cat.id}))"
                label="Select category"
                v-model="categoryId">

      </v-select>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            hide-details="auto"
            label="Title"
            placeholder="Enter the title"
            v-model="title"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            hide-details="auto"
            label="Limit"
            placeholder="Enter limit"
            type="number"
            v-model="limit"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn class="mt-4" color="primary" type="submit">
        Update
        <v-icon class="ml-4" small>mdi-send</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {validationMixin} from "vuelidate";
  import {minValue, required} from "vuelidate/lib/validators";
  import {ICategory, ICategoryEditPayload} from "@/store/category/types";
  import {EDIT_CATEGORY_ACTION} from "@/store/category/actions";

  interface DataInterface {
    title: string;
    limit: number;
    categoryId: string;
  }

  export default Vue.extend({
    name: "CategoryCreateForm",
    props: {
      storeCategories: Array as () => ICategory[] | null,
      category: Object as () => ICategory | null,
    },
    mixins: [validationMixin],
    data: (): DataInterface => ({
      title: "",
      limit: 1,
      categoryId: ""
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(10)},
      categoryId: {required}
    },
    watch: {
      category() {
        this.title = this.category?.title || "";
        this.limit = this.category?.limit || 1;
        this.categoryId = this.category?.id || "";
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
          const id = await this.$store.dispatch(EDIT_CATEGORY_ACTION, formData);
          console.log('updated cat', id);
          this.title = "";
          this.limit = 1;
          this.categoryId = "";
          this.$v.$reset();
        } catch (e) {
        }
      }
    }
  });
</script>
