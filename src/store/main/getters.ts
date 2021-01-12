import {GetterTree} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {MainStateInterface} from "@/store/main/types";

export default {
  loading: s => s.loading,
} as GetterTree<MainStateInterface, RootStateInterface>;
