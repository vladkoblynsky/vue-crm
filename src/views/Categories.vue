<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Categories</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <section>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <CategoryCreateForm/>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <CategoryEditForm/>
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

  export default Vue.extend({
    components: {
      CategoryCreateForm,
      CategoryEditForm
    },
    async mounted() {
      await this.$store.dispatch(FETCH_CATEGORIES_ACTION);
    }
  });
</script>
