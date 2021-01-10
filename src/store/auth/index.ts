import actions from "./actions";
import { Module } from "vuex";
import { RootStateInterface } from "@/store/globalTypes";

const authStore: Module<{}, RootStateInterface> = {
  actions
};

export default authStore;
