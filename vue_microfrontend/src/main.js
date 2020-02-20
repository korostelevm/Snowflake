import Vue from 'vue'
import App from './App.vue'
import VueLodash from 'vue-lodash'

import './components/_globals'
import vueCustomElement from 'vue-custom-element'


Vue.use(vueCustomElement);

Vue.prototype.$api = 'http://localhost:3000/'

Vue.prototype.$dispatch = function(channel,o){
  window.dispatchEvent(new CustomEvent(`microfrontend:${channel}`, {
    detail: o,
  }));
}

Vue.mixin({
  methods: {
    get_auth_header: function() {
      return JSON.parse(sessionStorage.getItem('auth'))
    },
  }
})



Vue.customElement('snowflake-ui', App);