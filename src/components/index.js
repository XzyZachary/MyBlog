import Vue from 'vue'
import zeditor from './z-editor/index.js'
import {
    GridLayout,
    GridItem
} from 'vue-grid-layout'
import SplitPane from 'vue-splitpane'

let editorConfig = {
    modules: [
        'font',
        'foreColor',
        'bold',
        'italic',
        'underline',
        'linethrough',
        'ul',
        'ol',
        'indent',
        'outdent',
        'align',
        'image',
        'quote',
        'todo'
    ]
}

Vue.use(zeditor, editorConfig)
Vue.component('z-layout', GridLayout)
Vue.component('z-item', GridItem)
Vue.component('SplitPane', SplitPane)
Vue.component('z-icon', () =>
    import ('./z-icon'))
Vue.component('z-container', () =>
    import ('./z-container'))
Vue.component('z-table', () =>
    import ('./z-table/tablenew.vue'))

Vue.component('z-markdown', () =>
    import ('./z-markdown'))