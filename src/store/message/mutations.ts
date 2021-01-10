import {
  MessageStateInterface,
  SnackbarMessageInterface
} from "@/store/message/types";
import { MutationTree } from "vuex";
import Vue from "vue";

export const SET_SNACKBAR_MUTATION = "SET_SNACKBAR_MUTATION";
export const CLEAR_SNACKBAR_MUTATION = "CLEAR_SNACKBAR_MUTATION";

export default {
  [SET_SNACKBAR_MUTATION]: (state, payload: SnackbarMessageInterface) => {
    Vue.set(state, 'snackbarMsg', payload)
  },
  [CLEAR_SNACKBAR_MUTATION]: state => {
    Vue.set(state, 'snackbarMsg', null)
  }
} as MutationTree<MessageStateInterface>;
