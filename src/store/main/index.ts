import {Module} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {MainStateInterface} from "./types";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

const mainStore: Module<MainStateInterface, RootStateInterface> = {
  state,
  mutations,
  getters
};

export default mainStore;