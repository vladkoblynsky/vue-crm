import Vue from "vue";
import {MutationTree} from "vuex";
import {CategoryStateInterface, ICategory, ICategoryEditPayloadMutation} from "@/store/category/types";

export const SET_CATEGORIES_MUTATION = "SET_CATEGORIES_MUTATION";
export const ADD_CATEGORY_MUTATION = "ADD_CATEGORY_MUTATION";
export const EDIT_CATEGORY_MUTATION = "EDIT_CATEGORY_MUTATION";

export default {
  [SET_CATEGORIES_MUTATION]: (state, payload: ICategory[]) => {
    Vue.set(state, 'categories', payload)
  },
  [ADD_CATEGORY_MUTATION]: (state, payload: ICategory) => {
    Vue.set(state, 'categories', [...state.categories, payload])
  },
  [EDIT_CATEGORY_MUTATION]: (state, payload: ICategoryEditPayloadMutation) => {
    const index = state.categories.findIndex((cat: ICategory) => cat.id === payload.oldId);
    if (index > -1) {
      Vue.set(state.categories, index, {title: payload.title, limit: payload.limit, id: payload.id})
    }
  }
} as MutationTree<CategoryStateInterface>;
