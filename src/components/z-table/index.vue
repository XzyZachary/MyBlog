<template>
    <div v-bind:style="{height: height + 'px'}">
        <v-table v-bind="self_table_bind" ref="table" :data="self_table_data"
                :height="pageTotal > self_page_size ? (height-42):height" :query="query" :IsNeedHandle="IsNeedHandle"></v-table>
        <div style="text-align:right;margin:5px">
            <el-pagination background v-if="pageTotal > self_page_size"
                            layout="prev,pager,next"
                            :total="pageTotal"
                            :page-size="self_page_size"
                            @current-change="changePage">

            </el-pagination>
        </div>
    </div>
</template>

<script>
import mixin from "./mixin";
import extend from "extend";
import vTable from "./table.vue";
export default {
  mixins: [mixin],
  components: {
    vTable
  },
  props: {
    opPageTotal: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: function() {
        return null;
      }
    },
    query: String,
    IsNeedHandle: Boolean,
    pageMethod: {
      type: Function,
      default: function(
        page,
        size,
        orderKey,
        orderType,
        flag,
        searchKey,
        searchValue
      ) {
        return new Promise(resolve => {
          let data = [].concat(
            searchValue && searchKey
              ? this.self_table_data.filter(
                  f =>
                    f[searchKey] &&
                    ~f[searchKey]
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase())
                )
              : this.self_table_data
          );

          if (orderKey && orderType) {
            resolve(
              data.sort((a, b) => {
                if (orderType == "desc")
                  return a[orderKey] < b[orderKey] ? 1 : -1;
                else return a[orderKey] > b[orderKey] ? 1 : -1;
              })
            );
          } else {
            resolve(data);
          }
        }).then(data => {
          return data;
        });
      }
    }
  },
  data() {
    return {
      pageIndex: null,
      pageTotal: this.opPageTotal || 0,
      orderKey: null,
      orderType: null,
      self_table_data: this.data
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this._cacheKey = "";
        this.reLoadTabelData();
      }
    }
  },
  methods: {
    changePage(currentPage) {
      this.pageIndex = currentPage;
      this.getBlogList();
      this.reLoadTabelData();
    },
    reLoadTabelData(flag) {
      //console.log(this.opPageTotal)
      let query = this.query;
      let field = this.queryKey;
      let cacheKey =
        `data_key_${this.self_page_index}_${this.self_page_size}_${
          this.self_order_key
        }_` + `${this.self_order_type}_false_${field}_${query}`;
      if (cacheKey != this._cacheKey) {
        this._cacheKey = cacheKey;
        this.pageMethod(
          this.self_page_index,
          this.self_page_size,
          this.self_order_key,
          this.self_order_type,
          flag,
          field,
          query
        ).then(data => {
          this.self_table_data = data;
        });
      }
    },
    changeSort({ column, prop, order }) {
      if (column) {
        this.orderKey = column.sortableKey || prop;
        this.orderType = order == "descending" ? "desc" : "asc";
        this.$nextTick(() => this.reLoadTabelData(true));
      }
    },
    async getBlogList() {
      try {
        await this.$store
          .dispatch("GetAllBlogs", {
            pageindex: this.pageIndex,
            pagesize: this.self_page_size
          })
          .then(data => {
            this.self_table_data = data.data.data.list;
          });
        //this.reLoadTabelData();
      } catch (e) {}
    }
  },
  computed: {
    self_table_bind() {
      let bind = extend(true, {}, this.$props);
      if (bind && bind.page) delete bind.page;
      delete bind.height;
      delete bind.data;
      bind.columns = bind.columns.map(m => {
        let searchEx = m.searchEx;
        if (searchEx && !searchEx._searchMethod) {
          searchEx._searchMethod = query => {
            this.query = query;
            this.queryKey = searchEx.field;
            this.reLoadTabelData();
          };
        }
        m.sortable = m.sortable ? "custiom" : false;
        return m;
      });
      bind["sort-change"] = this.changeSort;
      this.reLoadTabelData();
      return bind;
    },
    self_page_size() {
      if (!this.page) return 20;
      return this.page.size || 20;
    },
    self_page_index() {
      if (!this.page) return 0;
      let pageIndex = (this.pageIndex || this.page.index || 1) - 1;
      pageIndex = pageIndex <= 0 ? 0 : pageIndex;
      return pageIndex;
    },
    self_order_key() {
      let tableRef = this.$refs.table;
      if (this.orderKey) return this.orderKey;
      else if (tableRef && tableRef.self_sort) return tableRef.self_sort.prop;
      return (this.columns.find(f => f.sortType) || {}).sortKey;
    },
    self_order_type() {
      let tableRef = this.$refs.table;
      if (this.orderType) return this.orderType;
      else if (tableRef && tableRef.self_sort)
        return tableRef.self_sort.order === "descending" ? "desc" : "asc";
      return (this.columns.find(f => f.sortType) || {}).sortType;
    }
  }
};
</script>

<style>
</style>
