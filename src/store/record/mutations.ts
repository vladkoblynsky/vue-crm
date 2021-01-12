import {MutationTree} from "vuex";
import {IRecord, RecordStateInterface} from "@/store/record/types";

export const SET_RECORDS_MUTATION = "SET_RECORDS_MUTATION";

interface MutationInterface extends MutationTree<RecordStateInterface> {
  [SET_RECORDS_MUTATION]: (state: RecordStateInterface, payload: IRecord[]) => void;
}

export default {
  [SET_RECORDS_MUTATION]: (state, payload) => {
    state.records = payload;
  }
} as MutationInterface;