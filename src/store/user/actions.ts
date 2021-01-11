import {ActionTree} from "vuex";
import axios from "axios";
import firebase from 'firebase/app';
import {IUpdateUserPayload, UserStateInterface} from "@/store/user/types";
import {GlobalContextInterface, RootStateInterface} from "@/store/globalTypes";
import {GET_USER_UID_ACTION} from "@/store/auth/actions";
import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
import {SET_EXCHANGE_RATES_MUTATION, SET_USER_INFO_MUTATION, SET_USER_UID_MUTATION} from "@/store/user/mutations";

export const FETCH_USER_INFO_ACTION = "FETCH_USER_INFO_ACTION";
export const FETCH_EXCHANGE_RATES_ACTION = "FETCH_EXCHANGE_RATES_ACTION";
export const UPDATE_USER_INFO_ACTION = "UPDATE_USER_INFO_ACTION";

interface UserActionsInterface
  extends ActionTree<UserStateInterface, RootStateInterface> {
  [FETCH_USER_INFO_ACTION]: (
    context: GlobalContextInterface<UserStateInterface>
  ) => Promise<void>;
  [FETCH_EXCHANGE_RATES_ACTION]: (
    context: GlobalContextInterface<UserStateInterface>
  ) => Promise<void>;
  [UPDATE_USER_INFO_ACTION]: (
    context: GlobalContextInterface<UserStateInterface>,
    payload: IUpdateUserPayload
  ) => Promise<void>;
}

export default {
  [FETCH_USER_INFO_ACTION]: async ({dispatch, commit}) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    commit(SET_USER_UID_MUTATION, uid);
    try {
      const res = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
      commit(SET_USER_INFO_MUTATION, {bill: res.bill, firstName: res.firstName})
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
    }
  },
  [FETCH_EXCHANGE_RATES_ACTION]: async ({commit}) => {
    try {
      const res = await axios.get(`https://api.exchangerate.host/latest`, {
        params: {
          base: 'USD',
          symbols: "USD,BYN,RUB,EUR,UAH"
        }
      });
      commit(SET_EXCHANGE_RATES_MUTATION,
        {base: res.data.base, date: res.data.date, rates: res.data.rates},
      )
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
    }
  },
  [UPDATE_USER_INFO_ACTION]: async ({dispatch, commit, getters}, payload) => {
    const uid = await dispatch(GET_USER_UID_ACTION);
    try {
      const info = getters.userInfo;
      const data = {...info, ...payload};
      await firebase.database().ref(`/users/${uid}/info`).update(data);
      commit(SET_USER_INFO_MUTATION, data);
      commit(SET_SNACKBAR_MUTATION, {msg: "Your profile has been updated", variant: "success"});
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
    }
  },
} as UserActionsInterface;
