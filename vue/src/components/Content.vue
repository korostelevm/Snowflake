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
        this.users()
      }
    })
  },
  methods: {
       users: function(d) {
        return new Promise((resolve,reject)=>{
          fetch(this.$api + '/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': this.get_auth_header()
              },
              body: JSON.stringify(d),
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.backend_data=data
              resolve(data)
            }).catch(e => {
              this.error = e; console.error('exception:', e);
            })
          })
      },
      },
};
</script>
<style lang="css">
#main{
position: absolute;
top: 0;
left:0;
}
</style>