import firebase from "firebase/app";
import {ActionTree} from "vuex";
import {GlobalContextInterface, RootStateInterface} from "@/store/globalTypes";
import {LoginPayloadInterface, RegisterPayloadInterface} from "@/store/auth/types";
import {SET_SNACKBAR_MUTATION} from "@/store/message/mutations";

export const LOGIN_ACTION = "LOGIN_ACTION";
export const REGISTER_ACTION = "REGISTER_ACTION";
export const GET_USER_UID_ACTION = "GET_USER_UID_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";

interface AuthActionsInterface extends ActionTree<{}, RootStateInterface> {
  [LOGIN_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: LoginPayloadInterface
  ) => Promise<void>;
  [REGISTER_ACTION]: (
    context: GlobalContextInterface<{}>,
    payload: RegisterPayloadInterface
  ) => Promise<void>;
  [LOGOUT_ACTION]: () => Promise<void>;
  [GET_USER_UID_ACTION]: () => void;
}

export default {
  [LOGIN_ACTION]: async (
    {commit},
    {email, password}
  ) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [REGISTER_ACTION]: async (
    {dispatch, commit},
    {email, password, firstName, bill}
  ) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch(GET_USER_UID_ACTION);
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          bill,
          firstName
        });
    } catch (e) {
      commit(SET_SNACKBAR_MUTATION, {msg: e.message, variant: "error"});
      throw e;
    }
  },
  [GET_USER_UID_ACTION]: () => {
    const user = firebase.auth().currentUser;
    return user?.uid;
  },
  [LOGOUT_ACTION]: async () => {
    await firebase.auth().signOut();
  }
} as AuthActionsInterface;
