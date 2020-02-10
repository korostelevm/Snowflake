<template>
  <div>
    <vue-p5
        @setup="setup"
        @draw="draw"
        @keypressed="keypressed">
    </vue-p5>
  </div>
</template>
<script>
var theta
import VueP5 from 'vue-p5';
export default {
  name: 'Paper',
    components: {
    "vue-p5": VueP5
  },
  data() {
    return {
          init:false,
          }
  },
  methods: {
    setup(sketch) {
            sketch.createCanvas(window.innerWidth,window.innerHeight);
            window.onresize = function(){
                sketch.resizeCanvas(window.innerWidth,window.innerHeight);
            }
            

      // sketch.background('green');
      // sketch.text('Hello p5!', 20, 20);
    },
      draw(sk) {
        // draw a line between the previous
        // and the current mouse position
        // sk.line(sk.pmouseX, sk.pmouseY, sk.mouseX, sk.mouseY);
        function branch(sk,h,level, b) {
        // Each branch will be 2/3rds the size of the previous one
          h *= 0.86;
          
          level +=1
        // All recursive functions must have an exit condition!!!!
        // Here, ours is when the length of the branch is 2 pixels or less
        if (level > 5){
          return
        }
        
        h = h*( (sk.mouseY / (sk.height/2)))
          b = b * 0.6
          sk.strokeWeight(b);
          sk.stroke('rgba(255,255,255,'+(6-level)/3+')')
        // if (h > 2) {
          sk.push();    
          sk.noFill();
          sk.arc(0, 0, 1000/(50*(sk.mouseY / sk.height)), 1000/(50*(sk.mouseY / sk.height)), ((sk.mouseX / sk.height))*2*sk.PI, ((sk.mouseX / sk.height))* sk.PI);
          sk.pop();    
          
          sk.push();    // Save the current state of transformation (i.e. where are we now)
          sk.rotate(theta);   // Rotate by theta
          sk.line(0, 0, 0, -h);  // Draw the branch
          sk.translate(0, -h); // Move to the end of the branch
          branch(sk, h, level,b);
          sk.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(-theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);
          branch(sk, h, level,b);
          sk.pop();
          
          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(3*theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);

          branch(sk, h ,level,b);
          sk.pop();
          
          // // Repeat the same thing, only branch off to the "left" this time!
          sk.push();
          sk.rotate(-3*theta);
          sk.line(0, 0, 0, -h);
          sk.translate(0, -h);
          branch(sk, h ,level,b);
          sk.pop();
        // }
        
        
      }

        sk.background('rgba(79,195,247 ,1)');
        sk.frameRate(30);
        sk.stroke(255);
        let b = (sk.mouseY)/30
        sk.strokeWeight(b);

        // Let's pick an angle 0 to 90 degrees based on the mouse position
        let a = (sk.mouseX / (sk.width)) * 90;
        
        // Convert it to radians
        theta = sk.radians(a);
        // Start the tree from the bottom of the screen
        sk.translate(sk.width/2,sk.height/2);
        // Draw a line 120 pixels
        // sk.line(0,0,0,-120);
        // Move to the end of that line
        sk.translate(0,-120);
        // Start the recursive branching!
        var level = 0
        branch(sk, 320, level, b);
      },
      keypressed(sk) {
        // convert the key code to it's string
        // representation and print it
        const key = String.fromCharCode(sk.keyCode);
        sk.print(key);
      },
  },
  render(h) {
    return h(VueP5, {on: this});
  }
};
</script>
<style lang="css">
  .p5Canvas {
    width: 1000px;
    height: 1000px;
  }
</style>