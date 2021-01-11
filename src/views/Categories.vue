<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Categories</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <section>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <CategoryCreateForm @created="onSuccessCreatedCategory"/>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <CategoryEditForm :storeCategories="storeCategories" :category="categoryById"/>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import CategoryCreateForm from "@/components/category/CategoryCreateForm.vue";
  import CategoryEditForm from "@/components/category/CategoryEditForm.vue";
  import {FETCH_CATEGORIES_ACTION} from "@/store/category/actions";

  interface DataInterface {
    title: string;
    limit: number;
    categories: string[];
    editCatId: string | null;
  }

  export default Vue.extend({
    data: (): DataInterface => ({
      title: "",
      limit: 1,
      categories: ["Name cat"],
      editCatId: null
    }),
    components: {
      CategoryCreateForm,
      CategoryEditForm
    },
    computed: {
      storeCategories() {
        return this.$store.getters.storeCategories;
      },
      categoryById() {
        return this.$store.getters.categoryById(this.editCatId);
      }
    },
    methods: {
      onSuccessCreatedCategory(id: string) {
        this.editCatId = id;
      }
    },
    async mounted() {
      await this.$store.dispatch(FETCH_CATEGORIES_ACTION);
    }
  });
</script>
