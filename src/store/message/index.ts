import { Module } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import { RootStateInterface } from "@/store/globalTypes";
import { MessageStateInterface } from "@/store/message/types";

const messageStore: Module<MessageStateInterface, RootStateInterface> = {
  state,
  getters,
  mutations
};

export default messageStore;
