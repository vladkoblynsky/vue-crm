import {MutationTree} from "vuex";
import {MainStateInterface} from "@/store/main/types";

export const SET_LOADING_MUTATION = "SET_LOADING_MUTATION";

interface MutationInterface extends MutationTree<MainStateInterface> {
  [SET_LOADING_MUTATION]: (state: MainStateInterface, payload: boolean) => void;
}

export default {
  [SET_LOADING_MUTATION]: (state, payload) => {
    state.loading = payload;
  }
} as MutationInterface;
