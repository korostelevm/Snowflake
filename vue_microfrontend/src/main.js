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
  data: function() {
    return {
      auth:JSON.parse(sessionStorage.getItem('currentUser'))
    }
  }
})

Vue.customElement('cake-ui', App);