<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">New record</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <v-progress-linear v-if="loading" indeterminate/>
    <p v-else-if="!categories.length">Create category</p>
    <form v-if="categories.length" class="form" @submit.prevent="onSubmit">
      <v-autocomplete :items="categories.map(cat => ({text: cat.title, value: cat.id}))"
                      v-model="categoryId"
                      label="Select category"></v-autocomplete>
      <v-row>
        <v-col cols="12" sm="4">
          <v-switch v-model="type" :label="type === true ? 'income' : 'outcome'"/>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            hide-details="auto"
            label="Amount"
            type="number"
            v-model.number="amount"
            :error="$v.amount.$error"
            :error-messages="$v.amount.$error ? `The field must have a minimum value ${$v.amount.$params.minValue.min}` : ''"
          />
        </v-col>
      </v-row>
      <v-text-field
        hide-details="auto"
        label="Description"
        v-model="description"
        :error="$v.description.$error"
        :error-messages="$v.description.$error ? 'Description is required' : ''"
      ></v-text-field>
      <v-btn class="mt-4" color="primary" type="submit">
        Create
        <v-icon class="ml-4" small>mdi-{{this.type ? 'plus' : 'minus'}}</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {FETCH_CATEGORIES_ACTION} from "@/store/category/actions";
  import {ICategory} from "@/store/category/types";
  import {validationMixin} from "vuelidate";
  import {minValue, required} from "vuelidate/lib/validators";
  import {IRecordPayload} from "@/store/record/types";
  import {IUpdateUserPayload, UserInfoInterface} from "@/store/user/types";
  import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
  import {CREATE_RECORD_ACTION} from "@/store/record/actions";
  import {UPDATE_USER_INFO_ACTION} from "@/store/user/actions";

  const MIN_AMOUNT = 1;

  interface DataInterface {
    loading: boolean;
    categories: ICategory[];
    type: boolean;
    amount: number;
    description: string;
    categoryId: string;
  }

  export default Vue.extend({
    mixins: [validationMixin],
    data: (): DataInterface => ({
      loading: true,
      categories: [],
      type: false,
      amount: 1,
      description: "",
      categoryId: ""
    }),
    validations: {
      description: {required},
      amount: {required, minValue: minValue(MIN_AMOUNT)},
      categoryId: {required}
    },
    computed: {
      userInfo(): UserInfoInterface {
        return this.$store.getters.userInfo;
      }
    },
    methods: {
      async onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        if (this.isBillValid()) {
          const formData: IRecordPayload = {
            categoryId: this.categoryId,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          };
          const userData: IUpdateUserPayload = {
            bill: this.type ? this.userInfo.bill + this.amount : this.userInfo.bill - this.amount
          };
          try {
            await this.$store.dispatch(CREATE_RECORD_ACTION, formData);
            await this.$store.dispatch(UPDATE_USER_INFO_ACTION, userData);
            this.resetForm();
          } catch (e) {
          }
        } else {
          this.$store.commit(SET_SNACKBAR_MUTATION, {
            msg: `Your bill ${this.userInfo.bill} less than ${this.amount}`,
            variant: "error"
          })
        }
      },
      resetForm() {
        this.categoryId = this.categories[0].id || "";
        this.type = false;
        this.amount = MIN_AMOUNT;
        this.description = "";
        this.$v.$reset();
      },
      isBillValid(): boolean {
        if (!this.type) {
          return this.userInfo.bill - this.amount >= 0;
        }
        return true;
      }
    },
    async mounted() {
      const categories = await this.$store.dispatch(FETCH_CATEGORIES_ACTION) as ICategory[];
      this.categories = categories;
      this.categoryId = categories.length ? categories[0].id || "" : "";
      this.loading = false;
    }
  });
</script>
