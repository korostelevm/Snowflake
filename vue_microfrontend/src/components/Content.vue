<template>
  <div id="main">
  </div>
</template>
<script>

import { snow } from './Snow.js';
import { EventBus } from '../EventBus.js';

export default {
  name: 'Content',
  data() {
    return {
          s:null,
          }
  },
  mounted(){
    EventBus.$on('snow',()=>{
      if(!this.s){
        this.s = snow()
        this.s.init()
        this.s.animate()  
      }
    })
    
  },
  methods: {
  }
};
</script>
<style lang="css">
#main{
position: absolute;
top: 0;
left:0;
}
</style>