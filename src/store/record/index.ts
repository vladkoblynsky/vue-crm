import {Module} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {RecordStateInterface} from "./types";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const categoryStore: Module<RecordStateInterface, RootStateInterface> = {
  state,
  actions,
  mutations,
  getters
};

export default categoryStore;
