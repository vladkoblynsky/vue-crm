<template>
  <div>
    <p class="text-center mt-4" v-if="!localLoading && !record">
      Record not found with given id=<strong>{{$route.params.id}}</strong>
    </p>
    <div v-else-if="record">
      <v-breadcrumbs large>
        <v-breadcrumbs-item to="/history">
          History
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider>
          <v-icon>mdi-chevron-right</v-icon>
        </v-breadcrumbs-divider>
        <v-breadcrumbs-item disabled to="/history">
          {{record.typeText}}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-card :color="record.typeColor" class="p-4 white--text" outlined tile>
            <p><small>{{record.date | date('datetime')}}</small></p>
            <p>Description: {{record.description}}</p>
            <p>Amount: {{record.amount | price("USD")}}</p>
            <p>Category: {{record.categoryName}}</p>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_LOADING_MUTATION} from "@/store/main/mutations";
  import {FETCH_RECORD_BY_ID_ACTION} from "@/store/record/actions";
  import {IRecord} from "@/store/record/types";
  import {ICategory} from "@/store/category/types";
  import {FETCH_CATEGORY_BY_ID_ACTION} from "@/store/category/actions";

  interface DataRecordInterface extends IRecord {
    categoryName: string,
    typeText: string;
    typeColor: string;
  }

  export default Vue.extend({
    name: "detail",
    data: () => ({
      localLoading: true,
      record: null as DataRecordInterface | null
    }),
    async mounted() {
      this.$store.commit(SET_LOADING_MUTATION, true);
      const recordId = this.$route.params.id;
      const record: IRecord = await this.$store.dispatch(FETCH_RECORD_BY_ID_ACTION, recordId);
      const category: ICategory = await this.$store.dispatch(FETCH_CATEGORY_BY_ID_ACTION, record.categoryId);

      this.record = {
        ...record,
        categoryName: category?.title || "None",
        typeText: record.type ? "Income" : "Outcome",
        typeColor: !record.type ? "error" : "success",
      }
      this.localLoading = false;
      this.$store.commit(SET_LOADING_MUTATION, false);
    }
  })
</script>
