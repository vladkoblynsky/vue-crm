import Vue from "vue";
import Vuex from "vuex";
import messageStore from "./message";
import userStore from "./user";
import authStore from "./auth";
import { RootStateInterface } from "@/store/globalTypes";

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
  actions: {},
  modules: {
    authStore,
    messageStore,
    userStore
  }
});
