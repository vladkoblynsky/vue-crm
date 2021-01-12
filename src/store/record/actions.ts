import {ActionTree} from "vuex";
import firebase from 'firebase/app';
import {GlobalContextInterface, RootStateInterface} from "@/store/globalTypes";
import {IRecord, IRecordPayload, RecordStateInterface} from "@/store/record/types";
import {GET_USER_UID_ACTION} from "@/store/auth/actions";
import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
import {SET_RECORDS_MUTATION} from "@/store/record/mutations";

export const FETCH_RECORDS_ACTION = "FETCH_RECORDS_ACTION";
export const FETCH_RECORD_BY_ID_ACTION = "FETCH_RECORD_BY_ID_ACTION";
export const CREATE_RECORD_ACTION = "CREATE_RECORD_ACTION";

interface RecordActionsInterface extends ActionTree<RecordStateInterface, RootStateInterface> {
  [FETCH_RECORDS_ACTION]: (
    context: GlobalContextInterface<RecordStateInterface>
  ) => Promise<IRecord[]>;

  [FETCH_RECORD_BY_ID_ACTION]: (
    context: GlobalContextInterface<RecordStateInterface>,
    payload: string
  ) => Promise<IRecord>;

  [CREATE_RECORD_ACTION]: (
    context: GlobalContextInterface<RecordStateInterface>,
    payload: IRecordPayload
  ) => Promise<IRecord>
}

export default {
  [FETCH_RECORDS_ACTION]: async ({dispatch, commit}) => {
    try {
      const uid = await dispatch(GET_USER_UID_ACTION);
      const res = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {};
      const records = Object.keys(res).map(key => ({
        id: key,
        ...res[key]
      }));
      commit(SET_RECORDS_MUTATION, records);
      return records
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [FETCH_RECORD_BY_ID_ACTION]: async ({dispatch, commit}, payload) => {
    try {
      const uid = await dispatch(GET_USER_UID_ACTION);
      const record = (await firebase.database().ref(`users/${uid}/records`).child(payload).once('value')).val() || {};
      return {...record, id: payload}
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [CREATE_RECORD_ACTION]: async ({dispatch, commit}, payload) => {
    try {
      const uid = await dispatch(GET_USER_UID_ACTION);
      const res = await firebase.database().ref(`users/${uid}/records`).push(payload);
      commit(SET_SNACKBAR_MUTATION, {msg: "Record has been created", variant: "success"});
      return {...payload, id: res.key};
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  }
} as RecordActionsInterface