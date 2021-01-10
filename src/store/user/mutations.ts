import { MutationTree } from "vuex";
import {IExchangeRates, UserInfoInterface, UserStateInterface} from "./types";
import Vue from "vue";

export const SET_USER_UID_MUTATION = "SET_USER_UID_MUTATION";
export const SET_USER_INFO_MUTATION = "SET_USER_INFO_MUTATION";
export const SET_EXCHANGE_RATES_MUTATION = "SET_EXCHANGE_RATES_MUTATION";

interface MutationInterface extends MutationTree<UserStateInterface>{
  [SET_USER_UID_MUTATION]: (state: UserStateInterface, payload: string | null) => void;
  [SET_USER_INFO_MUTATION]: (state: UserStateInterface, payload: UserInfoInterface | null) => void;
  [SET_EXCHANGE_RATES_MUTATION]: (state: UserStateInterface, payload: IExchangeRates) => void;
}

export default {
  [SET_USER_UID_MUTATION]: (state, payload) => {
    state.uid = payload;
  },
  [SET_USER_INFO_MUTATION]: (state, payload) => {
    Vue.set(state, "info", payload);
  },
  [SET_EXCHANGE_RATES_MUTATION]: (state, payload) => {
    Vue.set(state, "exchangeRates", payload);
  }
} as MutationInterface;
