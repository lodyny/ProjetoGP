import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDog, faCat, faCrow, faPaw } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()

library.add(faDog, faCat, faCrow, faPaw);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
