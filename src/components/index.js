import Vue from 'vue'
import {
    GridLayout,
    GridItem
} from 'vue-grid-layout'
import SplitPane from 'vue-splitpane'

Vue.component('z-layout', GridLayout)
Vue.component('z-item', GridItem)
Vue.component('SplitPane', SplitPane)
Vue.component('z-cion', () => import ('../z-icon'))