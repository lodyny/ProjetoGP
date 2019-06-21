import "core-js/stable";
import "regenerator-runtime/runtime";

// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';

// Import Vue App, routes, store
import App from './app/App';
import { router } from './_helpers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDog, faCat, faCrow, faPaw, faMars, faVenus, faArrowRight, faArrowLeft, faUndo, faWeightHanging, faBirthdayCake, faTextHeight, faAsterisk, faSave, faCamera, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core';

// Import CSS dependencies
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

dom.watch();

library.add(faDog, faCat, faCrow, faPaw, faVenus, faMars, faArrowRight, faArrowLeft, faUndo, faWeightHanging, faBirthdayCake, faTextHeight, faAsterisk, faSave, faCamera, faTrash, faEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuetify, {
    iconfont: 'md'
  });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
