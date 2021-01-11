import {ActionTree} from "vuex";
import firebase from 'firebase/app';
import {GlobalContextInterface, RootStateInterface} from "@/store/globalTypes";
import {GET_USER_UID_ACTION} from "@/store/auth/actions";
import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
import {ADD_CATEGORY_MUTATION, EDIT_CATEGORY_MUTATION, SET_CATEGORIES_MUTATION} from "@/store/category/mutations";
import {ICategoryEditPayload, ICategoryPayload} from "@/store/category/types";

export const FETCH_CATEGORIES_ACTION = "FETCH_CATEGORIES_ACTION";
export const CREATE_CATEGORY_ACTION = "CREATE_CATEGORY_ACTION";
export const EDIT_CATEGORY_ACTION = "EDIT_CATEGORY_ACTION";

interface CategoryActionsInterface extends ActionTree<{}, RootStateInterface> {
  [FETCH_CATEGORIES_ACTION]: (
    context: GlobalContextInterface<{}>
  ) => Promise<void>;
  [CREATE_CATEGORY_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: ICategoryPayload
  ) => Promise<string | void>;
  [EDIT_CATEGORY_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: ICategoryEditPayload
  ) => Promise<void>;
}

export default {
  [FETCH_CATEGORIES_ACTION]: async ({dispatch, commit}) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const categories = (await firebase.database().ref(`users/${uid}/categories`).limitToFirst(100).once('value')).val();
      console.log(FETCH_CATEGORIES_ACTION, categories);
      if (categories) {
        commit(SET_CATEGORIES_MUTATION, Object.keys(categories).map(key => ({id: key, ...categories[key]})));
      } else {
        commit(SET_CATEGORIES_MUTATION, []);
      }

    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [CREATE_CATEGORY_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const category = await firebase.database().ref(`users/${uid}/categories`).push(payload);
      console.log(CREATE_CATEGORY_ACTION, category);
      commit(ADD_CATEGORY_MUTATION, {...payload, id: category.key});
      commit(SET_SNACKBAR_MUTATION, {msg: "Category created", variant: "success"});
      return category.key
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [EDIT_CATEGORY_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const category = await firebase.database().ref(`users/${uid}/categories/${payload.id}`).set({
        title: payload.title,
        limit: payload.limit
      });
      commit(EDIT_CATEGORY_MUTATION, {...payload, id: category.key, oldId: payload.id});
      commit(SET_SNACKBAR_MUTATION, {msg: "Category updated", variant: "success"});
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  }
} as CategoryActionsInterface;