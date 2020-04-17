<template>
  <div>
  <div id="instructions">use arrow keys, spacebar</div>
  <div 
  v-if="lost"
  id="you_lose">YOU LOSE</div>
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
          lost:false
          }
  },
  mounted(){
    this.g = snow()
    this.g.init()
    this.g.animate()  
    EventBus.$on('lost',()=>{
      this.lost = true;
    })
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
#you_lose{
    z-index: 10;
    position: fixed;
    /* top: 0; */
    left: 0;
    margin: auto;
    font-weight: bold;
    font-size: 18vw;
    color: white;
    right: 0;
}
</style>