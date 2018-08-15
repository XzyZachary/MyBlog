<template>
    <el-submenu :index="menu.path || uniqueid">
        <template slot="title">
            <i :class="`fa fa-${menu.icon || 'folder-o'}`"></i>
            <span slot="title">{{menu.title}}</span>
        </template>
        <template v-for="(child, childIndex) in menu.children">
            <layout-header-item v-if="child.children === undefined" :menu="child" :key="childIndex"></layout-header-item>
            <layout-header-sub v-else :menu="child" :key="childIndex"/> 
        </template>
    </el-submenu>
</template>

<script>
import uniqueid from 'lodash.uniqueid'
import LayoutMainMenuItem from '../menu-item'
export default {
    name: 'layout-header-sub',
    components: {
        'layout-header-item' : LayoutMainMenuItem
    },
    props: {
        menu: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data () {
        return {
            uniqueid: uniqueid('d2-menu-empty-')
        }
    }
};
</script>

<style>
</style>
