<template>
  <el-table :data="self_data" :height="height" border style="width:100%" :defaultSort="self_sort" :key="`${Object.keys(self_sort || {}).map(m => `${m}_${self_sort[m]}`).join('_')}`"
    stripe :cellClassName="cellClassName" empty-text="No Data Available." @sort-change="sortChange" :summary-method="handlerSummaryMethod"
    :show-summary="fixedData && fixedData.lenght>0">
    <el-table-column v-for="(col,index) in self_columns" :key="col.key" v-bind="col">
      <el-table-column v-if="col._cols && col._cols.length>0 && col.label != '操作'" v-for="(cols,indexs) in col._cols" :key="cols.key"
        v-bind="cols">
        <template slot-scope="scope">
          <vRender :row="scope.row" :column="cols" :index="indexs" :render="cols.render"></vRender>
        </template>

      </el-table-column>
      <template v-if="!col._cols || col._cols.length == 0" slot-scope="scope">
        <vRender :row="scope.row" :column="col" :index="index" :render="col.render"></vRender>
      </template>
    </el-table-column>
    <el-table-column v-if="IsNeedHandle" label="操作" header-align="center" align="center" width="250">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope)">编辑</el-button>
        <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import mixin from "./mixin";
import vRender from "./render";
export default {
  mixins: [mixin],
  props: {
    sortChange: Function,
    IsNeedHandle: Boolean
  },
  components: {
    vRender
  },
  data() {
    return {
      self_columns: [],
      self_sort: {},
      self_data: this.data || [],
      reloadData: Math.random()
    };
  },
  methods: {
    renderColumns(cols) {
      let colToCols = cols => {
        //console.log(cols);
        return cols.map(m => {
          if (m.sortType && (m.sortType == "asc" || m.sortType == "desc")) {
            this.self_sort = {
              prop: m.key,
              order: m.sortType == "asc" ? "ascending" : "descending"
            };
          }
          let searchEx = m.searchEx;
          if (searchEx && !searchEx._searchMethod) {
            searchEx._searchMethod = query => {
              this.self_data = query
                ? this.data.filter(
                    f =>
                      f[searchEx.field] &&
                      f[searchEx.field]
                        .toLowerCase()
                        .indexOf(query.toLowerCase()) === 0
                  )
                : this.data;
            };
          }
          return {
            _cols: m.cols && colToCols(m.cols),
            key: `key_${m.key}_${Math.random()}`,
            prop: m.key,
            label: m.title,
            width: m._width,
            minWidth: m.minWidth || m.width,
            fixed: m.fixed,
            renderHeader: m.renderHeader,
            formatter: (row, columns, cellValue) => {
              if (m.formatter) return m.formatter(row, column, cellValue);
              if (cellValue != null) {
                return cellValue;
              } else return "-";
            },
            sortable: m.cols ? false : m.sortable,
            sortMethod: m.sortMethod,
            sortableKey: m.sortKey,
            align: m.align || "center",
            headerAlign: m.headerAlign || "center",
            className: m.className,
            labelClassName: m.labelClassName,
            filters: m.filters,
            filterPlacement: m.filterPlacement,
            searchEx,
            render: (h, params) => {
              if (m.render) return m.render(h, params);
              else if (params.column) {
                return h(
                  "div",
                  params.column.formatter(
                    params.row,
                    params.columns,
                    params.row[m.key]
                  )
                );
              }
            }
          };
        });
      };
      this.self_columns = colToCols(cols || this.columns || []);
    },
    handlerSummaryMethod(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach(column => {
        if (column.formatter) {
          sums.push(
            column.formatter(
              this.fixedData[0],
              column,
              this.fixedData[0][column.property]
            )
          );
        } else {
          sums.push(this.fixedData[0][column.property]);
        }
      });
      return sums;
    }
  },
  watch: {
    columns: {
      deep: true,
      handler(nVal, oVal) {
        if (JSON.stringify(nVal) != JSON.stringify(oVal))
          this.renderColumns(nVal);
      }
    },
    data: {
      deep: true,
      handler(nVal, oVal) {
        if (JSON.stringify(nVal) != JSON.stringify(oVal)) {
          this.self_data = nVal || [];
          this.reloadData = Math.random();
        }
      }
    }
  },
  mounted() {
    this.renderColumns();
  }
};
</script>

<style>
</style>