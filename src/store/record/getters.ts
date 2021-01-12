import {GetterTree} from "vuex";
import {RootStateInterface} from "@/store/globalTypes";
import {RecordStateInterface} from "@/store/record/types";

export default {
  getRecords: s => s.records,
  getRecordById: s => (id: string) => s.records.find(record => record.id === id),
} as GetterTree<RecordStateInterface, RootStateInterface>;
