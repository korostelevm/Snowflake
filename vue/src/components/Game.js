
    import * as THREE from 'three';
    import { EventBus } from '../EventBus.js';
    import { add_lights } from './ice_cube/lights.js'
    import { world } from './ice_cube/world.js'
    import { controls, init_controls } from './ice_cube/interactions.js'
    import { Cube } from './ice_cube/cube.js'

    export var snow = function(){

    var camera, renderer
    var screen= {
      windowHalfX: 0,
      windowHalfY: 0,
  }

    
    var cube;
    var clock
    var scene, camera, renderer
    var w
    var init  = function () {
      clock = new THREE.Clock();
      screen.windowHalfX = window.innerWidth / 2;
      screen.windowHalfY = window.innerHeight / 2;   
      init_controls(screen)
      w = {...world(screen)}
      scene = w.scene
      camera = w.camera
      renderer = w.renderer

      console.log(scene)
      add_lights(scene)

      cube = new Cube('a')
      cube.position.x = 180
      cube.rotation.y = 0.2
      scene.add(new Cube('b'))
      scene.add(cube)

      
      window.addEventListener( 'resize', ()=>{
        screen.windowHalfX = window.innerWidth / 2;
        screen.windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }, false );
      
    }

   

    var  animate = function() {
      requestAnimationFrame( animate );
      render();
    }

    var jump_height = 400;
    var v = new THREE.Vector3(0,0,1)
    var max_speed = 10;
    var speed = max_speed;
    var prevTime = performance.now();
    function render() {
      var time = performance.now();
      var delta = ( time - prevTime ) / 1000;
      var c = cube.getObjectByName('a')
      

      if(controls.c){
      }

      var g = 2.8 *100 * delta
      var friction = 0.08 *100 * delta
      if(controls.jump && cube.position.y < jump_height){
        v.y = 20
        cube.position.y += v.y
      }else if (cube.position.y > 5 || (Math.abs(cube.position.x) > 550 || Math.abs(cube.position.z) > 550) ){
        cube.position.y += v.y 
        v.y -= g;
      }else{ 
        cube.position.y = 5
        v.y = 0
      }
      if(cube.position.y < -5000){
        EventBus.$emit('lost')

      }
      c.rotation.x = - (cube.position.y - 5)/800 

      v.x = speed * Math.sin(cube.rotation.y) 
      v.z = speed * Math.cos(cube.rotation.y)
      cube.position.x += v.x
      cube.position.z += v.z

      if(controls.moveLeft){
        cube.rotation.y += 0.04 
      }
      if(controls.moveRight){
        cube.rotation.y -= 0.04
      }
      
      
      if(controls.moveForward){
        speed = max_speed
      }
      if(controls.moveBackward){
        speed -= friction * 2;
      }
      if(speed > 0){
        speed -= friction;
      }else{
        speed = 0
      }

      

      camera.position.x += ( controls.mouseX - camera.position.x ) * 0.05 
      camera.position.y += ( - controls.mouseY - camera.position.y + screen.windowHalfY ) * 0.05;
      camera.lookAt(new THREE.Vector3(0,20,0));
      renderer.render( scene, camera );
      prevTime = time;

    }



    return {init, animate}
}