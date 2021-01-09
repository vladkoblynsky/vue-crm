import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

interface SnackbarMessageInterface {
  msg: string;
  color: string;
}
interface StateInterface {
  snackbarMsg: SnackbarMessageInterface | null;
}

export default new Vuex.Store({
  state: {
    snackbarMsg: null
  } as StateInterface,
  mutations: {
    setError(state: StateInterface, error: string) {
      state.snackbarMsg = {
        msg: error,
        color: "#B71C1C"
      };
    },
    clearSnackbarMsg(state: StateInterface) {
      state.snackbarMsg = null;
    }
  },
  actions: {},
  getters: {
    snackbarMsg: s => s.snackbarMsg
  },
  modules: {
    auth
  }
});
