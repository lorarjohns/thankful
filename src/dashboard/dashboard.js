import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserPlus,
  faSave,
  faBan,
  faInfoCircle,
  faEdit,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserPlus, faSave, faBan, faEdit, faInfoCircle, faPen);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from './route.js';

import App from './App.vue';
new Vue({
  el: '#dashboard',
  router: router,
  render: h => h(App),
});
