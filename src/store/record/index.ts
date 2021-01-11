import {Module} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {RecordStateInterface} from "./types";
import state from "./state";
import actions from "./actions";

const categoryStore: Module<RecordStateInterface, RootStateInterface> = {
  state,
  actions,
};

export default categoryStore;
