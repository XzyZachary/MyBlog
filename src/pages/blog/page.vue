<template>
  <z-container>
     <z-table v-bind="BlogTable" :IsNeedHandle="true" :opPageTotal="opPageTotal"></z-table>
  </z-container>
</template>

<script>
export default {
  data() {
    var BlogCols = [
      {
        key: "title",
        width: 110,
        title: "标题",
        sortable: true
      },
      {
        key: "desc",
        title: "描述",
        width: 120,
        sortable: true
      },
      {
        key: "markdown",
        title: "内容",
        width: 120,
        sortable: true
      },
      {
        key: "level",
        title: "等级",
        width: 120,
        sortable: true
      },
      {
        key: "type",
        title: "类型",
        width: 120,
        sortable: true
      },
      {
        key: "",
        title: "操作",
        width: 320,
        sortable: false
      }
    ];
    return {
      Search: "",
      tableData: [],
      opPageTotal:0,
      BlogTable: {
        height: window.screen.height - 290,
        page: {
          size: 10,
          index: 1
        },
        columns: BlogCols,
        data: [],
        query: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("GetAllBlogs",{pagesize :10,pageIndex: 1}).then(data => {
      console.log(data.data.data);
      this.BlogTable.data = data.data.data.list
      this.opPageTotal = data.data.data.total
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/public.scss";
.index-btn-group {
  color: $color-text-placehoder;
  span {
    color: $color-text-sub;
    &:hover {
      color: $color-text-main;
    }
  }
}
</style>
