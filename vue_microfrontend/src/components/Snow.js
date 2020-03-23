
    import * as THREE from 'three';

    export var snow = function(){

    // import { GUI } from './js/dat.gui.module.js';

    var camera, scene, renderer, materials = [], parameters;
    var mouseX = 0, mouseY = 0, mouseZ=100;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    console.log(window.location.hash)
    // if(window.location.hash=='#snow'){
    //   init();
    //   animate();
    // }

    var init  = function () {

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.z = 1000;
      
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

      var geometry = new THREE.BufferGeometry();
      var vertices = [];

      var textureLoader = new THREE.TextureLoader();

      var sprite1 = textureLoader.load( 'data:image/png;base64,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' );

      for ( var i = 0; i < 20000; i ++ ) {

        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 2000 - 1000;
        var z = Math.random() * 2000 - 1000;

        vertices.push( x, y, z );

      }

      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

      
      parameters = [
        [[ 1.0, 0.2, 0.5 ], sprite1, 20 ],
        [[ 0.95, 0.1, 0.5 ], sprite1, 15 ],
        [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
        [[ 0.85, 0, 0.5 ], sprite1, 8 ],
        [[ 0.80, 0, 0.5 ], sprite1, 5 ]
      ];


      for ( var i = 0; i < parameters.length; i ++ ) {

        var color = parameters[ i ][ 0 ];
        var sprite = parameters[ i ][ 1 ];
        var size = parameters[ i ][ 2 ];

        materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
        materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );

        var particles = new THREE.Points( geometry, materials[ i ] );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add( particles );

      }

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0x5cacf7, 1);
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
    //   document.body.appendChild( renderer.domElement );
      document.getElementById('main').appendChild( renderer.domElement );

      //

      // stats = new Stats();
      // document.body.appendChild( stats.dom );

      //

      // var gui = new GUI();

      // var params = {
      // 	texture: true
      // };

      // gui.add( params, 'texture' ).onChange( function ( value ) {

      // 	for ( var i = 0; i < materials.length; i ++ ) {

      // 		materials[ i ].map = ( value === true ) ? parameters[ i ][ 1 ] : null;
      // 		materials[ i ].needsUpdate = true;

      // 	}

      // } );

      // gui.open();

      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
              window.addEventListener("devicemotion", accelerometerUpdate, true);
            }
        })
            .catch( console.error )
    } else {
        console.warn( "DeviceMotionEvent is not defined" );
    }
}
      permission()

      window.addEventListener("devicemotion", accelerometerUpdate, true);


function accelerometerUpdate(event) {
    var aX = event.accelerationIncludingGravity.x * 100 ;
    var aY = event.accelerationIncludingGravity.y * 100 ;
    var aZ = event.accelerationIncludingGravity.z * 100 ;
    mouseX = aX
    mouseY = -aY
    // mouseZ = 0
}


      // let accelerometer = new Accelerometer({frequency: 60});
      // accelerometer.start();
      // alert(accelerometer.hasReading)
      // //
      // accelerometer.addEventListener('reading', event => {
      //     mouseX = mouseX+event.acceleration.x*100
      // });
        
      window.addEventListener( 'resize', onWindowResize, false );

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

    //

    var  animate = function() {

      requestAnimationFrame( animate );

      render();
      // stats.update();

    }

    function render() {

      var time = Date.now() * 0.00005;

      camera.position.x += ( mouseX - camera.position.x ) * 0.05;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

      camera.lookAt( scene.position );

      for ( var i = 0; i < scene.children.length; i ++ ) {

        var object = scene.children[ i ];

        if ( object instanceof THREE.Points ) {

          object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) )/10 ;
          // object.rotation.y = mouseZ/mouseY /300
          // object.rotation.y = mouseZ/mouseY /300

        }

      }

      for ( var i = 0; i < materials.length; i ++ ) {

        var color = parameters[ i ][ 0 ];

        var h = ( 360 * ( color[ 0 ] + time ) % 360 ) / 360;
        materials[ i ].color.setHSL( 1, color[ 1 ], color[ 2 ] );

      }

      renderer.render( scene, camera );

    }



    return {init, animate}
}