<template>
    <div class="d2-layout-header-aside-menu-side">
        <el-menu
            :collapse="isMenuAsideCollapse"
            :unique-opened="true"
            :default-active="active"
            ref="menu"
            @select="handleMenuSelect">
            <template v-for="(menu,menuIndex) in menuAside">
                <layout-header-item v-if="menu.childern === undefined" :menu="menu" :key="menuIndex" />
                <layout-header-sub v-else :menu="menu" :key="menuIndex"></layout-header-sub>
            </template>
        </el-menu>
        <div v-if="menuAside.length === 0 && !isMenuAsideCollapse" class="d2-layout-header-aside-menu-empty" flex="dir:top main:center cross:center">
            <z-icon name="inbox" />
            <span>没有侧栏菜单</span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import menuMixin from "../mixin/menu";
import LayoutMainMenuItem from "../components/menu-item/index.vue";
import LayoutMainMenuSub from "../components/menu-sub/index.vue";
import BScroll from "better-scroll";
export default {
  name: "menu-side",
  mixins: [menuMixin],
  components: {
    "layout-header-item": LayoutMainMenuItem,
    "layout-header-sub": LayoutMainMenuSub
  },
  data() {
    return {
      active: "",
      asideHeight: 300,
      BS: null
    };
  },
  computed: {
    ...mapState({
      menuAside: state => state.d2admin.menuAside,
      isMenuAsideCollapse: state => state.d2admin.isMenuAsideCollapse
    })
  },
  watch: {
    isMenuAsideCollapse(val) {
      this.scrollDestroy();
      setTimeout(() => {
        this.scrollInit();
      }, 500);
    },
    "$route.matched": {
      handler(val) {
        this.active = val[val.length - 1].path;
        this.$nextTick(() => {
          if (this.menuAside.length > 0) {
            this.$refs.menu.activeIndex = this.active;
          }
        });
      },
      immediate: true
    }
  },
  mounted() {
    this.scrollInit();
  },
  beforeDestroy() {
    this.scrollDestroy();
  },
  methods: {
    scrollInit() {
      this.BS = new BSscroll(this.$el, {
        mouseWheel: true
      });
    },
    scrollDestroy() {
      if (this.BS) {
        this.BS.detroy();
      }
    }
  }
};
</script>

<style>
</style>
