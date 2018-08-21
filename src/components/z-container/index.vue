<template>
    <div class="container-component" ref="container">
        <!-- 卡片容器 -->
        <container-car v-if="type === 'card' && !betterScroll">
            <slot v-if="$slots.header" name="header" slot="header" />
            <slot />
        </container-car>
        <!-- 滚动优化 -->
        <container-card-bs v-bind="$attrs" v-if="type === 'card' && betterScroll">
            <slot v-if="$slots.header" name="header" slot="header"/>
            <slot />
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-card-bs>
        <!-- 隐形容器 -->
        <container-ghost v-if="type === 'ghost' && !betterScroll">
            <slot v-if="$slots.header" name="header" slot="header"/>
            <slot/>
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-ghost>
        <!-- 滚动优化 -->
        <container-ghost-bs v-bind="$attrs" v-if="type === 'ghost' && betterScroll">
            <slot v-if="$slots.header" name="header" slot="header"/>
            <slot/>
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-ghost-bs>
        <!-- 填充 -->
        <container-full v-if="type === 'full' && !betterScroll">
            <slot v-if="$slots.header" name="header" slot="header"/>
            <slot/>
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-full>
        <!-- 滚动优化 -->
        <container-full-bs v-bind="$attrs" v-if="type === 'full' && betterScroll">
            <slot v-if="$slots.header" name="header" slot="header"/>
            <slot/>
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-full-bs>
    </div>
</template>

<script>
import ContainerFull from "./components/container-full.vue";
import ContainerFullBs from "./components/container-full-bs.vue";
import ContainerGhost from "./components/container-ghost.vue";
import ContainerGhostBs from "./components/container-ghost-bs.vue";
import ContainerCard from "./components/container-card.vue";
import ContainerCardBs from "./components/container-card-bs.vue";
export default {
  name: "container",
  components: {
    "container-full": ContainerFull,
    "container-full-bs": ContainerFullBs,
    "container-ghost": ContainerGhost,
    "container-ghost-bs": ContainerGhostBs,
    "container-card": ContainerCard,
    "container-card-bs": ContainerCardBs
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "full"
    },
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style>
</style>
