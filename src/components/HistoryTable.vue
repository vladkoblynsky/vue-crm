<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody>
    <tr :key="record.id" v-for="(record, idx) of records">
      <td>{{idx + 1}}</td>
      <td>{{record.amount | price("USD")}}</td>
      <td>{{record.date | date("datetime")}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <v-chip :class="[record.typeColor]" color="white--text" small>{{record.typeText}}</v-chip>
      </td>
      <td>
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn :to="`/detail/${record.id}`" color="secondary" small v-bind="attrs"
                   v-on="on">
              <i class="material-icons">open_in_new</i>
            </v-btn>
          </template>
          <span>Show details</span>
        </v-tooltip>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {IRecord} from "@/store/record/types";

  interface PropsRecordInterface extends IRecord {
    typeColor: string;
    typeText: string;
    categoryName: string;
  }

  export default Vue.extend({
    name: "HistoryTable",
    props: {
      records: {
        required: true,
        type: Array as () => PropsRecordInterface[]
      }
    }
  })
</script>