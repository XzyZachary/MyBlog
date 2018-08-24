import Vue from 'vue'
import {
    GridLayout,
    GridItem
} from 'vue-grid-layout'
import SplitPane from 'vue-splitpane'

Vue.component('z-layout', GridLayout)
Vue.component('z-item', GridItem)
Vue.component('SplitPane', SplitPane)
Vue.component('z-icon', () => import ('./z-icon'))
Vue.component('z-container', () => import ('./z-container'))
Vue.component('z-table', () => import ('./z-table/tablenew.vue'))