import { Module } from "vuex";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { RootStateInterface } from "@/store/globalTypes";
import { UserStateInterface } from "@/store/user/types";

const userStore: Module<UserStateInterface, RootStateInterface> = {
  state,
  actions,
  mutations,
  getters
};

export default userStore;
