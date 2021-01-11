import {CommitOptions, DispatchOptions,} from "vuex";
import {MessageStateInterface, SnackbarMessageInterface} from "@/store/message/types";
import {IExchangeRates, UserInfoInterface, UserStateInterface} from "@/store/user/types";
import {FETCH_EXCHANGE_RATES_ACTION, FETCH_USER_INFO_ACTION} from "@/store/user/actions";
import {GET_USER_UID_ACTION, LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION} from "@/store/auth/actions";
import {LoginPayloadInterface, RegisterPayloadInterface} from "@/store/auth/types";
import {CLEAR_SNACKBAR_MUTATION, SET_SNACKBAR_MUTATION} from "@/store/message/mutations";
import {SET_EXCHANGE_RATES_MUTATION, SET_USER_INFO_MUTATION, SET_USER_UID_MUTATION} from "@/store/user/mutations";
import {
  CategoryStateInterface,
  ICategory,
  ICategoryEditPayload,
  ICategoryEditPayloadMutation,
  ICategoryPayload
} from "@/store/category/types";
import {ADD_CATEGORY_MUTATION, EDIT_CATEGORY_MUTATION, SET_CATEGORIES_MUTATION} from "@/store/category/mutations";
import {CREATE_CATEGORY_ACTION, EDIT_CATEGORY_ACTION, FETCH_CATEGORIES_ACTION} from "@/store/category/actions";

export interface RootStateInterface {
  authStore: {};
  messageStore: MessageStateInterface;
  userStore: UserStateInterface;
  categoryStore: CategoryStateInterface
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

  (type: typeof FETCH_CATEGORIES_ACTION): Promise<any>;

  (type: typeof CREATE_CATEGORY_ACTION, payload: ICategoryPayload): Promise<any>;

  (type: typeof EDIT_CATEGORY_ACTION, payload: ICategoryEditPayload): Promise<any>;
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

  (
    type: typeof SET_CATEGORIES_MUTATION,
    payload: ICategory[],
    options?: CommitOptions
  ): void;

  (
    type: typeof ADD_CATEGORY_MUTATION,
    payload: ICategory,
    options?: CommitOptions
  ): void;

  (
    type: typeof EDIT_CATEGORY_MUTATION,
    payload: ICategoryEditPayloadMutation,
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
