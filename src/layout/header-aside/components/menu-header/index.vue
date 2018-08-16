<template>
    <el-menu mode="horizontal" @select="handleMenuSelect">
        <template v-for="(menu, menuIndex) in menuHeader">
            <layout-header-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"></layout-header-item>
            <layout-header-sub v-else :menu="menu" :key="menuIndex"></layout-header-sub>
        </template>
    </el-menu>
</template>

<script>
import { mapState } from "vuex";
import menuMixin from "../mixin/menu";
import LayoutMainMenuItem from "../components/menu-item/index.vue";
import LayoutMainMenuSub from "../components/menu-sub/index.vue";
export default {
  name: "header-menu-header",
  mixins: [menuMixin],
  components: {
    "layout-header-item": LayoutMainMenuItem,
    "layout-header-sub": LayoutMainMenuSub
  },
  computed: {
    ...mapState({
      menuHeader: state => state.d2admin.menuHeader
    })
  }
};
</script>

