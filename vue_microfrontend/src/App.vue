<template>
  <div class='cool'>
    <div class="">
      <div class='cakes'>
        <Paper/>
      </div>
    </div>
  </div>
</template>

<script>
var cakes = [
  {
    name:'Cake'
  },
]
export default {
  name: 'microfrontend',
  data() {
    return {
          cakes:cakes,
          init:false
          }
  },
  mounted:function(){
    this.$dispatch('mounted',{
      message:'mounted into #microfrontend!'
    })
  },
  created: function(){
      this.auth = JSON.parse(sessionStorage.getItem('currentUser'))
  },
  updated() {
  },
  methods: {
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


.cool{
    /* overflow: hidden; */
    animation: 0.15s linear 0s 1 expandHeight;
  }


</style>
