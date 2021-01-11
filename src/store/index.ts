import Vue from "vue";
import Vuex from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import messageStore from "./message";
import userStore from "./user";
import authStore from "./auth";
import categoryStore from "./category";
import recordStore from "./record";

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
  actions: {},
  modules: {
    authStore,
    messageStore,
    userStore,
    categoryStore,
    recordStore
  }
});
