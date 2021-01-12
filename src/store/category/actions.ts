import {ActionTree} from "vuex";
import firebase from 'firebase/app';
import {GlobalContextInterface, RootStateInterface} from "@/store/globalTypes";
import {GET_USER_UID_ACTION} from "@/store/auth/actions";
import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
import {
  ADD_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  EDIT_CATEGORY_MUTATION,
  SET_CATEGORIES_MUTATION
} from "@/store/category/mutations";
import {ICategory, ICategoryDeletePayload, ICategoryEditPayload, ICategoryPayload} from "@/store/category/types";

export const FETCH_CATEGORIES_ACTION = "FETCH_CATEGORIES_ACTION";
export const FETCH_CATEGORY_BY_ID_ACTION = "FETCH_CATEGORY_BY_ID_ACTION";
export const CREATE_CATEGORY_ACTION = "CREATE_CATEGORY_ACTION";
export const EDIT_CATEGORY_ACTION = "EDIT_CATEGORY_ACTION";
export const DELETE_CATEGORY_ACTION = "DELETE_CATEGORY_ACTION";

interface CategoryActionsInterface extends ActionTree<{}, RootStateInterface> {
  [FETCH_CATEGORIES_ACTION]: (
    context: GlobalContextInterface<{}>
  ) => Promise<ICategory[]>;
  [FETCH_CATEGORY_BY_ID_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: string
  ) => Promise<ICategory>;
  [CREATE_CATEGORY_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: ICategoryPayload
  ) => Promise<string | void>;
  [EDIT_CATEGORY_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: ICategoryEditPayload
  ) => Promise<void>;
  [DELETE_CATEGORY_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: ICategoryDeletePayload
  ) => Promise<void>;
}

export default {
  [FETCH_CATEGORIES_ACTION]: async ({dispatch, commit}) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const res = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val();
      const data = res ? Object.keys(res).map(key => ({id: key, ...res[key]})) : [];
      commit(SET_CATEGORIES_MUTATION, data);
      return data;
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [FETCH_CATEGORY_BY_ID_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const category = (await firebase.database().ref(`users/${uid}/categories`).child(payload).once('value')).val();
      return {...category, id: payload};
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [CREATE_CATEGORY_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const category = await firebase.database().ref(`users/${uid}/categories`).push(payload);
      commit(ADD_CATEGORY_MUTATION, {...payload, id: category.key});
      commit(SET_SNACKBAR_MUTATION, {msg: "Category has been created", variant: "success"});
      return category.key
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [EDIT_CATEGORY_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      await firebase.database().ref(`users/${uid}/categories`).child(payload.id).update({
        title: payload.title,
        limit: payload.limit
      });
      commit(EDIT_CATEGORY_MUTATION, payload);
      commit(SET_SNACKBAR_MUTATION, {msg: "Category has been updated", variant: "success"});
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [DELETE_CATEGORY_ACTION]: async ({dispatch, commit}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      await firebase.database().ref(`users/${uid}/categories/${payload.id}`).remove();
      commit(DELETE_CATEGORY_MUTATION, payload);
      commit(SET_SNACKBAR_MUTATION, {msg: "Category has been deleted", variant: "success"});
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  }
} as CategoryActionsInterface;