import {GetterTree} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {CategoryStateInterface} from "@/store/category/types";

export default {
  categoryById: s => (id: string) => s.categories.find(cat => cat.id === id),
  storeCategories: s => s.categories
} as GetterTree<CategoryStateInterface, RootStateInterface>;
