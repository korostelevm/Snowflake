
    import * as THREE from 'three';

    export var snow = function(){


    var camera, scene, renderer, materials = [], parameters, ice;
    var mouseX = 0, mouseY = 0, mouseZ=100;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var controls = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false
    };
    var cube;
    var arrowHelper

    
    var init  = function () {

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.y = 1000;
      camera.position.z = 1000;
      
      scene = new THREE.Scene();
      scene.add( new THREE.AmbientLight( 0x666666 ) );
      // scene.fog = new THREE.FogExp2( 0x000000, 0.0004 );

      var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
      dirLight.color.setHSL( 0.1, 1, 0.95 );
      dirLight.position.set( - 500, 500, 500 );
      
      dirLight.castShadow = true;
      
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      
      var d = 500;
      
      dirLight.shadow.camera.left = - d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = - d;
      
      dirLight.shadow.camera.far = 1500;
      dirLight.shadow.bias = - 0.0001;
      
      // var dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
      // scene.add( dirLightHeper );
				scene.add( dirLight );

      var plane_g = new THREE.PlaneBufferGeometry( 1000, 1000 );
      var material = new THREE.MeshLambertMaterial( {color: 0x00aaff, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( plane_g, material );
      plane.rotation.x = - Math.PI / 2;
      plane.position.y = 0;
      plane.receiveShadow = true;
      scene.add( plane );
      
      cube = new THREE.Object3D()
      var geometry = new THREE.BoxGeometry( 100, 100, 100 );
      geometry.translate(0,55,0)
      var material = new THREE.MeshLambertMaterial( {color: 0x00ccff} );
      var c = new THREE.Mesh( geometry, material );
      c.name = 'a'
      c.castShadow=true;
      c.receiveShadow=true;
      
      var axesHelper = new THREE.AxesHelper( 500 );
      cube.add( axesHelper );
      var axesHelper = new THREE.AxesHelper( 200 );
      c.add( axesHelper );
      cube.add(c)
      scene.add( cube );
      // var dir = new THREE.Vector3( 0, 0, 1 );

      // //normalize the direction vector (convert to vector of length 1)
      // dir.normalize();
      
      // var origin = new THREE.Vector3( 0, 0, 0 );
      // var length = 100;
      // var hex = 0xffff00;
      
      // cube = new THREE.ArrowHelper( dir, origin, length, hex );
      // scene.add( cube );


      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0x5cacf7, 1);
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('main').appendChild( renderer.domElement );
      renderer.shadowMap.enabled = true;

      window.addEventListener( 'resize', onWindowResize, false );
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      document.addEventListener( 'keydown', onKeyDown, false );
      document.addEventListener( 'keyup', onKeyUp, false );
    }

    function onKeyDown( event ) {
      event.stopPropagation();
      switch ( event.keyCode ) {
        case 38: /*up*/
        case 87: /*W*/ 	controls.moveForward = true; break;
        case 40: /*down*/
        case 83: /*S*/ 	 controls.moveBackward = true; break;
        case 37: /*left*/
        case 65: /*A*/ controls.moveLeft = true; break;
        case 39: /*right*/
        case 68: /*D*/ controls.moveRight = true; break;
        case 67: /*C*/     controls.c = true; break;
        case 32: /*space*/ controls.jump = true; break;
        //case 17: /*ctrl*/  controls.attack = true; break;
      }
    }

    function onKeyUp( event ) {
      event.stopPropagation();
      switch ( event.keyCode ) {
        case 38: /*up*/
        case 87: /*W*/ controls.moveForward = false; break;
        case 40: /*down*/
        case 83: /*S*/ 	 controls.moveBackward = false; break;
        case 37: /*left*/
        case 65: /*A*/ 	 controls.moveLeft = false; break;
        case 39: /*right*/
        case 68: /*D*/ controls.moveRight = false; break;
        case 67: /*C*/     controls.c = false; break;
        case 32: /*space*/ controls.jump = false; break;
        //case 17: /*ctrl*/  controls.attack = false; break;
      }
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove( event ) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart( event ) {
      if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }

    function onDocumentTouchMove( event ) {
      if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }


    var  animate = function() {
      requestAnimationFrame( animate );
      render();
    }

    var jump_height = 1000;
    var rotationMatrix = new THREE.Matrix4();
    var v = new THREE.Vector3(0,0,1)
    var spherical = new THREE.Spherical();
    var targetQuaternion = new THREE.Quaternion();
    var clock = new THREE.Clock();
    var speed = 2;
    var prevTime = performance.now();
    function render() {
      var time = performance.now();
      var delta = ( time - prevTime ) / 1000;
      var c = cube.getObjectByName('a')
      // c.lookAt(p)

      if(controls.c){
      }

      // cube.lookAt(new THREE.Vector3(0,0,0))
      var g = 9.8 *100 * delta
      if(controls.jump && cube.position.y < jump_height){
        v.y = 10
        cube.position.y += v.y
        // c.rotation.x -= 0.02
        // cube.rotateX(-0.1)
        // console.log(cube.worldToLocal(cube.position), cube.position)
        // console.log()
        
      }else if (cube.position.y > 5){
        cube.position.y -= v.y 
        v.y += g;
        // cube.position.y -= 
        // c.rotation.x += 0.02
        // cube.rotateX(0.1)
      }else{
        cube.position.y = 5
        v.y = 0
      }
      
      // spherical.theta = Math.random() * Math.PI * 2;
      // spherical.phi = Math.acos( ( 2 * Math.random() ) - 1 );
      // spherical.radius = 2;

      
      // if(controls.moveLeft){
      //   p.x += 0.1
      // }
      // if(controls.moveRight){
      //   p.x -= 0.1
      // }
      
      // if(controls.moveForward){
      //   p.z += 0.1
      // }
      // if(controls.moveBackward){
      //   p.z -= 0.1
      // }

      // p.normalize()

      if(Object.values(controls).some((i)=>{return i})){
        // console.log(9.8 * 100.0 * delta)
        console.log(v.y)
      }

      if(controls.moveLeft){
        cube.rotation.y += 0.04 
      }
      if(controls.moveRight){
        cube.rotation.y -= 0.04
      }
      
      
      if(controls.moveForward){
        cube.position.x += 4 * Math.sin(cube.rotation.y) 
        cube.position.z += 4 * Math.cos(cube.rotation.y)
      }
      if(controls.moveBackward){
        cube.position.x -= 4 * Math.sin(cube.rotation.y)
        cube.position.z -= 4 * Math.cos(cube.rotation.y)
      }
    
      camera.position.x += ( mouseX - camera.position.x ) * 0.05;
      camera.position.y += ( - mouseY - camera.position.y + windowHalfY ) * 0.05;
      camera.lookAt(new THREE.Vector3(0,500,0));
      renderer.render( scene, camera );
      prevTime = time;
    }



    return {init, animate}
}