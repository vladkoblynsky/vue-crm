<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Categories</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <h4 class="text-h5 mb-4">Create</h4>

            <form>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Title"
                    hide-details="auto"
                    v-model="title"
                    placeholder="Enter the title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Limit"
                    hide-details="auto"
                    type="number"
                    v-model="limit"
                    placeholder="Enter limit"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn color="primary" type="submit" class="mt-4">
                Create
                <v-icon class="ml-4" small>mdi-send</v-icon>
              </v-btn>
            </form>
          </div>
        </div>
        <div class="col s12 m6">
          <div>
            <h4 class="text-h5 mb-4">Edit</h4>

            <form>
              <v-select :items="categories" label="Select category"></v-select>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Title"
                    hide-details="auto"
                    v-model="title"
                    placeholder="Enter the title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Limit"
                    hide-details="auto"
                    type="number"
                    v-model="limit"
                    placeholder="Enter limit"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn color="primary" type="submit" class="mt-4">
                Update
                <v-icon class="ml-4" small>mdi-send</v-icon>
              </v-btn>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    title: "",
    limit: 1,
    categories: ["Name cat"]
  })
});
</script>
