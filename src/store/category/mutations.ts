import Vue from "vue";
import {MutationTree} from "vuex";
import {
  CategoryStateInterface,
  ICategory,
  ICategoryDeletePayload,
  ICategoryEditPayloadMutation
} from "@/store/category/types";

export const SET_CATEGORIES_MUTATION = "SET_CATEGORIES_MUTATION";
export const ADD_CATEGORY_MUTATION = "ADD_CATEGORY_MUTATION";
export const EDIT_CATEGORY_MUTATION = "EDIT_CATEGORY_MUTATION";
export const DELETE_CATEGORY_MUTATION = "DELETE_CATEGORY_MUTATION";

export default {
  [SET_CATEGORIES_MUTATION]: (state, payload: ICategory[]) => {
    Vue.set(state, 'categories', payload)
  },
  [ADD_CATEGORY_MUTATION]: (state, payload: ICategory) => {
    Vue.set(state, 'categories', [...state.categories, payload])
  },
  [EDIT_CATEGORY_MUTATION]: (state, payload: ICategoryEditPayloadMutation) => {
    const index = state.categories.findIndex((cat: ICategory) => cat.id === payload.id);
    if (index > -1) {
      Vue.set(state.categories, index, {title: payload.title, limit: payload.limit, id: payload.id})
    }
  },
  [DELETE_CATEGORY_MUTATION]: (state, payload: ICategoryDeletePayload) => {
    const categories = state.categories.filter(cat => cat.id !== payload.id);
    Vue.set(state, "categories", categories)
  }
} as MutationTree<CategoryStateInterface>;
