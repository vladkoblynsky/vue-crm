<template>
  <div>
    <div class="my-4 flex justify-between items-center">
      <h4 class="text-h4">Planning</h4>
      <h4 class="text-h4">{{userInfo.bill | price('USD')}}</h4>
    </div>
    <v-divider class="my-4"></v-divider>

    <section>
      <div>
        <p :key="cat.id" v-for="cat in categories">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs"
                   v-on="on">
                <strong>{{cat.title}}:</strong>
                {{cat.spend | price("USD")}} из {{cat.limit | price("USD")}}

                <v-progress-linear :color="cat.progressColor"
                                   :value="Math.floor(cat.progressCurrent)"/>

              </div>
            </template>
            <span>Spent {{Math.abs(cat.spend) | price("USD")}}</span>
          </v-tooltip>

        </p>

      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {FETCH_RECORDS_ACTION} from "@/store/record/actions";
  import {IRecord} from "@/store/record/types";
  import {ICategory} from "@/store/category/types";
  import {FETCH_CATEGORIES_ACTION} from "@/store/category/actions";
  import {SET_LOADING_MUTATION} from "@/store/main/mutations";
  import {UserInfoInterface} from "@/store/user/types";

  interface DataCategoriesInterface extends ICategory {
    progressCurrent: number;
    spend: number;
    progressColor: string;
  }

  interface DataInterface {
    categories: DataCategoriesInterface[],
    records: IRecord[]
  }

  export default Vue.extend({
    data: (): DataInterface => ({
      categories: [] as DataCategoriesInterface[],
      records: [] as IRecord[]
    }),
    methods: {
      setLoading(val: boolean) {
        this.$store.commit(SET_LOADING_MUTATION, val);
      }
    },
    computed: {
      userInfo(): UserInfoInterface {
        return this.$store.getters.userInfo;
      }
    },
    async mounted() {
      this.setLoading(true);
      const storeCategories: ICategory[] = await this.$store.dispatch(FETCH_CATEGORIES_ACTION);
      const records: IRecord[] = await this.$store.dispatch(FETCH_RECORDS_ACTION);
      const categories: DataCategoriesInterface[] = [];
      storeCategories.forEach((cat) => {
        const spend = records.filter(record => record.categoryId === cat.id).reduce(
          ((previousValue, currentValue) => currentValue.type ? previousValue - currentValue.amount : previousValue + currentValue.amount), 0)
        const progressCurrentPercent = spend * 100 / cat.limit;
        const progressCurrent = progressCurrentPercent > 100 ? 100 : progressCurrentPercent;
        const progressColor = progressCurrentPercent > 100 ? "error" : progressCurrentPercent < 50 ? "success" : "yellow";
        categories.push({...cat, spend, progressCurrent, progressColor});
      })

      this.categories = categories;
      this.records = records;
      this.setLoading(false);

    }
  })
</script>
