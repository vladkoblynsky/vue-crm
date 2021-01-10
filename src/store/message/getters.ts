import { MessageStateInterface } from "@/store/message/types";
import { GetterTree } from "vuex";
import { RootStateInterface } from "@/store/globalTypes";

export default {
  snackbarMsg: s => s.snackbarMsg
} as GetterTree<MessageStateInterface, RootStateInterface>;
