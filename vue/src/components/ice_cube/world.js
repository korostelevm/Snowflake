
import * as THREE from 'three';

export var world = function(){
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.y = 1000;
    camera.position.z = 1000;

    var plane_g = new THREE.PlaneBufferGeometry( 1000, 1000 );
    var material = new THREE.MeshStandardMaterial( {
        roughness: 1.1,
        color: 0x00aaff,
        metalness: 0.2,
        bumpScale: 1.5
      } );
      var plane = new THREE.Mesh( plane_g, material );
      plane.rotation.x = - Math.PI / 2;
      plane.position.y = 0;
      plane.receiveShadow = true;
    
      
      scene.add(plane)
      var renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0x5cacf7, 1);
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('main').appendChild( renderer.domElement );
      renderer.shadowMap.enabled = true;

      return {
        scene,
        camera,
        renderer,
      }
}