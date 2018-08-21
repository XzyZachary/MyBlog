<template>
  <z-container>
     <z-table v-bind="blogsData"></z-table>
  </z-container>
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
