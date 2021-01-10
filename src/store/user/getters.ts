import { GetterTree } from "vuex";
import { RootStateInterface } from "@/store/globalTypes";
import {UserStateInterface} from "@/store/user/types";

export default {
  userInfo: s => s.info,
  exchangeRates: s => s.exchangeRates,
  uid: s => s.uid
} as GetterTree<UserStateInterface, RootStateInterface>;
