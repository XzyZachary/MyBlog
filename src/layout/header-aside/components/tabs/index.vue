<template>
    <div class="d2-multiple-page-control-group" flex>
        <div class="d2-multiple-page-control-content" flex-box="1">
            <div class="d2-multiple-page-control-content-inner">
                <d2-contextmenu :visibel.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
                    <d2-contextmenu-list :menulist="tagName === 'index' ? contextmenuListIndex : contextmenuList" @rowClick="contextmenuClick"
                    />
                </d2-contextmenu>
                <el-tabs class="d2-multiple-page-control" :value="pageCurrent" type="card" :closable="true" @tab-click="handleClick" @edit="handleTabsEdit"
                    @contextmenu.native="handleContextmenu">
                    <el-tab-pane v-for="(page, index) in pageOpenedList" :key="index" :label="page.meta.title || '未命名'" :name="page.name" />
                </el-tabs>
            </div>
        </div>
        <div class="d2-multiple-page-control-btn" flex-box="0">
            <el-dropdown split-button @click="handleControlBtnClick" @command="command => handelControlItemClick(command)">
                <z-icon name="times-circle" />
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="left">
                        <z-icon name="arrow-left" class="d2-mr-10" /> 关闭左侧
                    </el-dropdown-item>
                    <el-dropdown-item command="right">
                        <z-icon name="arrow-right" class="d2-mr-10" /> 关闭右侧
                    </el-dropdown-item>
                    <el-dropdown-item command="other">
                        <z-icon name="times" class="d2-mr-10" /> 关闭其它
                    </el-dropdown-item>
                    <el-dropdown-item command="all">
                        <z-icon name="times-circle" class="d2-mr-10" /> 全部关闭
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    D2Contextmenu: () => import("../contextmenu"),
    D2ContextmenuList: () => import("../contextmenu/components/contentmenuList")
  },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: "times-circle", title: "关闭全部", value: "all" }
      ],
      contextmenuList: [
        { icon: "arrow-left", title: "关闭左侧", value: "left" },
        { icon: "arrow-right", title: "关闭右侧", value: "right" },
        { icon: "times", title: "关闭其它", value: "other" },
        { icon: "times-circle", title: "关闭全部", value: "all" }
      ],
      tagName: "index"
    };
  },
  computed: {
    ...mapState({
      pageOpenedList: state => state.d2admin.pageOpenedList,
      pageCurrent: state => state.d2admin.pageCurrent
    })
  },
  methods: {
    ...mapMutations([
      "d2adminTagCloseLeft",
      "d2adminTagCloseRight",
      "d2adminTagCloseOther",
      "d2adminTagCloseAll"
    ]),
    handleContextmenu(event) {
      let target = event.target;

      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }

      if (flag) {
        event.preventDefault();
        event.stopPropagation();
        this.contentmenuX = event.clientX;
        this.contentmenuY = event.clientY;
        this.tagName = target.getAttribute("aria-controls").slice(5);
        this.contextmenuFlag = true;
      }
    },
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName);
    },
    handleControlItemClick(command, tagName = null) {
      if (tagName) this.contextmenuFlag = false;
      const params = {
        pageSelect: tagName,
        vm: this
      };
      switch (command) {
        case "left":
          this.d2adminTagCloseLeft(params);
          break;
        case "right":
          this.d2adminTagCloseRight(params);
          break;
        case "other":
          this.d2adminTagCloseOther(params);
          break;
        case "all":
          this.d2adminTagCloseAll(this);
          break;
        default:
          this.$message.error("无效的操作");
          break;
      }
    },
    handleControlBtnClick() {
      this.d2adminTagCloseAll(this);
    },
    handleClick(tab, event) {
      const page = this.pageOpenedList.find(page => page.name === tab.name);
      const { name, params, query } = page;
      if (page) {
        this.$router.push({ name, params, query });
      }
    },
    handleTabsEdit(tagName, action) {
      if (action === "remove") {
        this.$store.commit("adminTagClose", {
          tagName,
          vm: this
        });
      }
    }
  }
};
</script>

<style>
</style>