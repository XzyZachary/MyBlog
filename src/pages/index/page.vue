<template>
      <div slot="footer" class="index-btn-group">
        <span @click="$open('https://github.com/d2-projects/d2-admin')">主页</span>
        <span @click="$open('http://d2admin.fairyever.com/zh/')">文档</span>
        <span @click="$open('https://github.com/d2-projects/d2-admin/issues')">issue</span>
        <span @click="$open('https://github.com/d2-projects/d2-admin/issues/new')">提问</span>
      </div>
</template>

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
