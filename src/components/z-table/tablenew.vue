<template>
    <div class='bloglist'>
        <div class="search">
            <el-input placeholder="请输入内容" v-model="keyword" @keydown.enter.native="getList" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"  @click="getList"></el-button>
            </el-input>
        </div>
        <el-table ref="multipleTable" :data="prop_list" tooltip-effect="dark"
         stripe border style="width:100%">
            <el-table-column type="index" width="55" align="center"
                header-align="center" :index="increment"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="!item.hidden &&
            !item.filters" v-for="(item,index) in prop_headerOptions" :key="index"
            :label="item.label" :prop="item.prop"
            :header-align="item.headerAlign" :align="item.align"
            :sortable="item.sort" :min-width="item.minWidth || 150" >
                <template slot-scope="scope">
                    <div v-if="scope.column.property == 'isVisible'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                    <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] | parseTime('{y}--{m}--{d}')}}</div>
                    <div v-else-if="scope.column.property.indexOf('Date') >= 0">{{scope.row[scope.column.property] | parseTime('{y}--{m}--{d}')}}</div>
                     <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-else-if="!item.hidden && 
            item.filters" :key="index" :label="item.label" :prop="item.prop" 
            :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"
            :filter-method="filterTage" :filters="item.filters" :min-width="item.minWidth || 200">
                <template slot-scope="scope">
                    <el-tag class="tag" type="primary" close-transition v-for="(tag,index) in scope.row.type" :key="index" >
                        {{tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageindex"
            :page-sizes="size_scoped"
            :page-size="pagesize"
            layout="total,sizes,prev,pager,next,jumper"
            :total="prop_DataTotal"></el-pagination>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    prop_keyword: String,
    prop_editShow: Boolean,
    prop_getMethod: String,
    prop_delMethod: String,
    prop_headerOptions: Array,
    prop_list: Array,
    prop_DataTotal: Number
  },
  data() {
    return {
      keyword: this.prop_keyword,
      loading: false,
      pageindex: 1,
      pagesize: 10,
      size_scoped: [10, 20, 30, 40],
      multipleSelection: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    increment(index) {
      return index + 1 + (this.pageindex - 1) * this.pagesize;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.getList();
    },
    async getList() {
      this.loading = true;
      try {
        console.log(this.prop_getMethod);
        await this.$store.dispatch(this.prop_getMethod, {
          keyword: this.keyword,
          pageindex: this.pageindex,
          pagesize: this.pagesize
        });
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    del(scope) {
      this.$confirm("此操作将删除该文件，是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          try {
            await this.$store.dispatch(`${this.prop_delMethod}`, scope.row._id);
            this.$emit('getList',this.pagesize,this.pageindex)
          } catch (e) {
            console.log(e)
          }
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(scope) {
       //console.log(scope);
       this.$emit('editblog',scope)
    }
  }
};
</script>


<style lang="less" scoped>
.bloglist {
  .search {
    padding-bottom: 20px;
    .el-input {
      width: 300px;
    }
  }
  .pagination {
    text-align: right;
    padding: 20px 0;
  }
  .tag {
    margin: 0 10px;
  }
}
</style>
