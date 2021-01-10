import {
  CommitOptions,
  DispatchOptions,
  ActionContext,
  Dispatch,
  Commit
} from "vuex";
import {
  MessageStateInterface,
  SnackbarMessageInterface
} from "@/store/message/types";
import {IExchangeRates, UserInfoInterface, UserStateInterface} from "@/store/user/types";
import {FETCH_EXCHANGE_RATES_ACTION, FETCH_USER_INFO_ACTION} from "@/store/user/actions";
import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  LOGOUT_ACTION,
  GET_USER_UID_ACTION
} from "@/store/auth/actions";
import {
  LoginPayloadInterface,
  RegisterPayloadInterface
} from "@/store/auth/types";
import {
  CLEAR_SNACKBAR_MUTATION,
  SET_SNACKBAR_MUTATION
} from "@/store/message/mutations";
import {SET_EXCHANGE_RATES_MUTATION, SET_USER_INFO_MUTATION, SET_USER_UID_MUTATION} from "@/store/user/mutations";

export interface GlobalStateInterface
  extends MessageStateInterface,
    UserStateInterface {}
export interface RootStateInterface {
  authStore: {};
  messageStore: MessageStateInterface;
  userStore: UserStateInterface;
}

export interface GlobalDispatchInterface {
  (
    type: typeof FETCH_USER_INFO_ACTION,
    payload?: any,
    options?: DispatchOptions
  ): Promise<any>;
  (
    type: typeof LOGIN_ACTION,
    payload: LoginPayloadInterface,
    options?: DispatchOptions
  ): Promise<any>;
  (
    type: typeof REGISTER_ACTION,
    payload: RegisterPayloadInterface,
    options?: DispatchOptions
  ): Promise<any>;
  (type: typeof LOGOUT_ACTION): Promise<any>;
  (type: typeof GET_USER_UID_ACTION): Promise<any>;
  (type: typeof FETCH_EXCHANGE_RATES_ACTION): Promise<any>;
}

export interface GlobalCommitInterface {
  (
    type: typeof SET_SNACKBAR_MUTATION,
    payload: SnackbarMessageInterface,
    options?: CommitOptions
  ): void;

  (
    type: typeof CLEAR_SNACKBAR_MUTATION,
    options?: CommitOptions
  ): void;
  
  (
    type: typeof SET_USER_UID_MUTATION,
    payload: string | null,
    options?: CommitOptions
  ): void;
  (
    type: typeof SET_USER_INFO_MUTATION,
    payload: UserInfoInterface,
    options?: CommitOptions
  ): void;
  (
    type: typeof SET_EXCHANGE_RATES_MUTATION,
    payload: IExchangeRates,
    options?: CommitOptions
  ): void;
}

export interface GlobalContextInterface<S> {
  dispatch: GlobalDispatchInterface;
  commit: GlobalCommitInterface;
  state: S;
  getters: any;
  rootState: RootStateInterface;
  rootGetters: any;
}
