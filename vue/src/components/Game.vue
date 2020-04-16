<template>
  <div>
  <div id="instructions">use arrow keys</div>
  <div id="main"></div>
  </div>
</template>
<script>

import { snow } from './Game.js';
import { EventBus } from '../EventBus.js';

export default {
  name: 'Content',
  data() {
    return {
          g:null,
          }
  },
  mounted(){
    this.g = snow()
    this.g.init()
    this.g.animate()  
  },
  methods: {
       users: function(d) {
        return new Promise((resolve,reject)=>{
          // fetch(this.$api + '/users', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       'Authorization': this.get_auth_header()
          //     },
          //     body: JSON.stringify(d),
          //   })
          //   .then(res => res.json())
          //   .then(data => {
          //     console.log(data)
          //     this.backend_data=data
          //     resolve(data)
          //   }).catch(e => {
          //     this.error = e; console.error('exception:', e);
          //   })
          })
      },
      },
};
</script>
<style lang="css">
#main{
position: fixed;
top: 0;
left:0;
}
#instructions{
  z-index: 10;
  position: fixed;
  top: 0;
  left:0;
}
</style>