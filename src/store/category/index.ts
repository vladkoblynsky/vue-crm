import {Module} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {CategoryStateInterface} from "@/store/category/types";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const categoryStore: Module<CategoryStateInterface, RootStateInterface> = {
  state,
  actions,
  mutations,
  getters
};

export default categoryStore;
