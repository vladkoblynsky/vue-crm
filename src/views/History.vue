<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Record history</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <section>
      <p v-if="!localLoading && !records.length" class="text-center">No records found.
        <router-link to="/record">Create first</router-link>
      </p>
      <div v-else-if="records.length">
        <HistoryTable :records="items"/>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {FETCH_RECORDS_ACTION} from "@/store/record/actions";
  import {IRecord} from "@/store/record/types";
  import HistoryTable from "@/components/HistoryTable.vue";
  import {SET_LOADING_MUTATION} from "@/store/main/mutations";
  import {FETCH_CATEGORIES_ACTION} from "@/store/category/actions";
  import {ICategory} from "@/store/category/types";
  import paginationMixin from "@/mixins/pagination.mixin";
  import {Pie} from 'vue-chartjs-typescript';

  interface DataRecordInterface extends IRecord {
    typeColor: string;
    typeText: string;
    categoryName: string;
  }

  export default Vue.extend<any, any, any, any>({
    name: "history",
    components: {HistoryTable},
    mixins: [Pie, paginationMixin],
    data: () => ({
      localLoading: true,
      records: [] as DataRecordInterface[]
    }),
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {
      setLoading(val: boolean) {
        this.$store.commit(SET_LOADING_MUTATION, val);
      },
      randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
      },
      setup(categories: ICategory[]) {
        this.setupPagination(this.records.map((record: IRecord) => ({
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId)?.title || "",
          typeText: record.type ? "Income" : "Outcome",
          typeColor: record.type ? "success" : "error"
        })));
        this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [{
            label: 'Categories',
            data: categories.map(c => {
              return this.records.filter((r: IRecord) => !r.type && r.categoryId === c.id).reduce((total: number, r: IRecord) => total + r.amount, 0)
            }),
            backgroundColor: categories.map(c => this.randomColor()),
            borderColor: "#ffffff",
            borderWidth: 1
          }]
        })
      }
    },
    async mounted() {
      this.setLoading(true);
      this.records = await this.$store.dispatch(FETCH_RECORDS_ACTION);
      const categories: ICategory[] = await this.$store.dispatch(FETCH_CATEGORIES_ACTION);
      this.setup(categories);
      this.setLoading(false);
      this.localLoading = false;
    }
  })
</script>
