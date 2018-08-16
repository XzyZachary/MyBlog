<template>
    <div class="d2-layout-header-aside-group" :class="{grayMode: isGrayMode}">

        <div class="d2-layout-header-aside-mask"></div>

        <div class="d2-layout-header-aside-content" flex="dir:top">
            <div class="d2-theme-header" flex-box="0">
                <div class="logo-group" :style="{width: isMenuAsideCollapse ? asideWidthCollapse :asideWidth}">
                    <img v-if="isMenuAsideCollapse" :src="`${$baseUrl}image/theme/${d2adminThemeActiveSetting.name}/logo/icon-only.png`" alt="">
                    <img v-else :src="`${$baseUrl}image/theme/${d2adminThemeActiveSetting.name}/logo/all.png`" alt="">
                </div>
                <div class="toggle-aside-btn" @click="handleToggleAside">
                    <z-icon name="bars" />
                </div>
                <d2-menu-header />
                <div class="d2-header-right">
                    <d2-header-user />
                </div>
            </div>

            <div class="d2-theme-container" flex-box="1" flex>
                <div flex-box='0' ref="aside" class="d2-theme-container-aside" :style="{width: isMenuAsideCollapse ? asideWidthCollapse : asideWidth}">
                    <d2-menu-side/>
                </div>

                <div class="d2-theme-container-main" flex-box='1' flex="dir:top">
                    <div class="d2-theme-container-main-header" flex-box='0'>
                        <d2-tabs/>
                    </div>
                    <div class="d2-theme-container-main-body" flex-box="1">
                        <transition name="fade-transverse">
                            <keep-alive :include="d2adminKeepAliveInclude">
                                <router-view/>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "layout-header-aside",
  components: {
    "d2-menu-side": () => import("./components/menu-side"),
    "d2-menu-header": () => import("./components/menu-header"),
    "d2-tabs": () => import("./components/tabs"),
    "d2-header-user": () => import("./components/header-user")
  },
  data() {
    return {
      asideWidth: "200px",
      asideWidthCollapse: "65px"
    };
  },
  computed: {
    ...mapState({
      isGrayMode: state => state.d2admin.isGrayMode,
      pageOpenedList: state => state.d2admin.pageOpenedList,
      isMenuAsideCollapse: state => state.d2admin.isMenuAsideCollapse
    }),
    ...mapGetters(["d2adminThemeActiveSetting", "d2adminKeepAliveInclude"])

  },
  methods: {
    ...mapMutations(["d2adminMenuAsideCollapseToggle"]),
    handleToggleAside() {
      this.d2adminMenuAsideCollapseToggle();
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/theme/register.scss";
</style>