<template>
  <div id="canvas_display">
    <vue-p5
        @setup="setup"
        @draw="draw"
        @keypressed="keypressed">
    </vue-p5>
  </div>
</template>
<script>
var theta
var distance
var mic
var velocity = 0
var opacity = 1
var event_x_init =0 , event_y_init =0
var event_x, event_y
import VueP5 from 'vue-p5';
import { EventBus } from '../EventBus.js';
var _ = require('lodash')
export default {
  name: 'Paper',
    components: {
    "vue-p5": VueP5
  },
  data() {
    return {
          init:false,
          lambda_pos: _.random(15,85),
          fade:false
          }
  },
  destroyed(){
    // delete VueP5
  },
  methods: {
    setup(sketch) {
      EventBus.$on('lambda_click',()=>{
        this.fade = true
      })
            // sketch.pixelDensity(0)
            sketch.createCanvas(window.innerWidth,window.innerHeight);
            window.onresize = function(){
                sketch.resizeCanvas(window.innerWidth,window.innerHeight);
            }
             if(window.innerWidth <= 600){
               event_x_init = _.random(10,300)
               event_y_init =  _.random(300,500)
             }
            // mic.start();
            // fft.setInput(mic);
            

      // sketch.background('green');
      // sketch.text('Hello p5!', 20, 20);
    },
    branch(sk,h,level, b) {
        // Each branch will be 2/3rds the size of the previous one
          // velocity *= 0.7
          h *= (0.76 + (0.1*(Math.sin(Date.now()/2000))) ) ;
          level +=1
        // All recursive functions must have an exit condition!!!!
        // Here, ours is when the length of the branch is 2 pixels or less
        if (level > 5){
          return
        }
        
        h = h*( (event_y / (sk.height/2)))
          b = b * 0.6
          sk.strokeWeight(b);
          var color = Math.floor(255-((distance / 1000)*255))
          sk.stroke('rgba(255,255,'+color+','+(6-level)/4+')')
        if (h > 20) {

          sk.push();    
          sk.noFill();
          sk.arc(0, 0, 1000/(50*(event_y / sk.height)), 1000/(50*(event_y / sk.height)), ((event_x / sk.height))*2*sk.PI, ((event_x / sk.height))* sk.PI);
          sk.pop();    
          
          sk.push();    // Save the current state of transformation (i.e. where are we now)
          sk.rotate(theta);   // Rotate by theta
          sk.line(0, 0, 0, -h);  // Draw the branch
          sk.translate(0, -h); // Move to the end of the branch
          this.branch(sk, h, level,b);
          sk.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(-theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);
          this.branch(sk, h, level,b);
          sk.pop();
          
          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(3*theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);

          this.branch(sk, h ,level,b);
          sk.pop();
          
          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(-3*theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);
          this.branch(sk, h ,level,b);
          sk.pop();
        }
        return
        
      },
      draw(sk) {
        
        if(!this.fade){
          // if(window.innerWidth <= 600){
            event_y = sk.mouseY || event_y_init
            event_x = sk.mouseX || event_x_init
          // }else{
          //   event_y = sk.mouseY || 1
          //   event_x = sk.mouseX || 1
          // }
        }else{
          event_y = event_y * 0.9
          event_x = event_x * 0.7
          opacity = opacity * 0.9
          if(opacity<0.1){
            EventBus.$emit('hide_snowflake')
          }
          
        }
        var time_color = 195+Math.floor(50*(0.8*(Math.sin(Date.now()/1000))))
        distance  = Math.sqrt(Math.pow(event_x - sk.width/2,2) + Math.pow(event_y - sk.height/2,2))
        
        if(!sk.mouseY){
          // time_color =200
          var event = new Event('mousemove');  // (*)
          window.dispatchEvent(event);
          // // return false
          distance = 100
        }
                var color = Math.floor(255-((distance / 1000)*255))

        document.getElementById('canvas_display').setAttribute("style", 'opacity:'+opacity);
        
        
        
        sk.background('rgba('+(255-color)+','+time_color+',247 ,1)');

        EventBus.$emit('lambda_style','left: '+this.lambda_pos+'%; opacity: '+((event_y*2) / (sk.height)))
        
        // sk.background('rgba(79,195,247 ,1)');
        sk.frameRate(30);
        sk.stroke(255);
        let b = (event_y)/30
        sk.strokeWeight(b);
        // Let's pick an angle 0 to 90 degrees based on the mouse position
        let a = ((event_x + 600) / (sk.width)) * 90;
        // Convert it to radians
        theta = sk.radians(a);
        // Start the tree from the bottom of the screen
        sk.translate(sk.width/2,sk.height/2);
        // Draw a line 120 pixels
        // sk.line(0,0,0,-120);
        // Move to the end of that line
        sk.translate(0,0);
        // Start the recursive branching!
        var level = 0
        this.branch(sk, 300, level, b);
      },
      keypressed(sk) {
        // convert the key code to it's string
        // representation and print it
        const key = String.fromCharCode(sk.keyCode);
        console.log(key)
        sk.print(key);
        if (key == 'P') {
          print('hello')
        }
      },
  },
  render(h) {
    return h(VueP5, {on: this});
  }
};
</script>
<style lang="css">
  #canvas_display{
    position: absolute;
  }
  .p5Canvas {
    width: 1000px;
    height: 1000px;
  }
</style>