import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  data() {
    return {
      page: (+this.$route.query.page || 1) as number,
      pageSize: 5,
      pageCount: 0,
      allItems: [] as any[],
      items: [] as any[]
    }
  },
  watch: {
    page() {
      this.$router.push(`${this.$route.path}?page=${this.page}`);
      this.items = this.allItems[this.page - 1] || this.allItems[0] || [];
    }
  },
  methods: {
    setupPagination(items: any[]) {
      this.allItems = _.chunk(items, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0] || [];
    }
  }
});