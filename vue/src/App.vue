<template>
  <div class='cool'>
    <div class="">
      <div class='snowflake' >
        <div
        id='lambda_button'
        v-if="show_snowflake"
        v-on:click="click_lambda"
        >λ
        </div>
        <Paper
        v-if="show_snowflake"
        />
      </div>
      <div
        class='content'
      > 
      <Content/>
      <Game
      v-if="game"
      />
      </div>
        
    </div>
  </div>
</template>

<script>
import { EventBus } from './EventBus.js';
export default {
  name: 'microfrontend',
  data() {
    var show_snowflake = true;
    if(window.location.hash=='#snow'){
      show_snowflake=false;
      EventBus.$emit('snow')
    }
    var game = false;
    if(window.location.hash=='#icecube' || window.location.hash=='#game'){
      show_snowflake=false;
      game=true;
    }
    return {
          init:false,
          show_snowflake:show_snowflake,
          game:game
          }
  },
  mounted:function(){
    if(window.location.hash=='#snow'){
      this.show_snowflake=false;
      EventBus.$emit('snow')
    }
    this.$dispatch('mounted',{
      message:'mounted into #microfrontend!'
    })
    EventBus.$on('lambda_style',function(style){
      var lambda = document.getElementById('lambda_button')
      lambda.setAttribute("style", style);
    })
    EventBus.$on('hide_snowflake',()=>{
      this.show_snowflake= false
    })
  },
  created: function(){

      this.auth = JSON.parse(sessionStorage.getItem('currentUser'))
  },
  updated() {
  },
  methods: {
    click_lambda(){
      EventBus.$emit('lambda_click')
      // this.show_snowflake = false
    }
    }
}
</script>


<style >
/* Scale canvas with resize attribute to full size */
canvas[resize] {
    width: 100%;
    height: 100%;
}
@keyframes expandHeight {
  0% {
    filter: blur(150px);
  }
  100% {
    filter: blur(0px);
    
  }
}

#lambda_button {
    z-index: 20;
    font-size: 140px;
    position: absolute;
    /* width: 100%; */
    /* text-align: left */
    color: white;
    font-family: inherit;
    font-weight: 700;
    cursor: pointer;
    top:70vh;
    user-select: none;
    transition: 0.3s text-shadow;
    transition: 0.3s color;
}
#lambda_button:hover {
  color:yellow;
  text-shadow: 9px 4px 0px #5cacf7
}
.snowflake{
  position: relative;
}
.cool{
    /* overflow: hidden; */
    /* animation: 0.15s linear 0s 1 expandHeight; */
  }

.content{
  padding: 10%;
}
</style>
