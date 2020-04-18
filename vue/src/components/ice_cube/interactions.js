
import * as THREE from 'three';


export var controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    mouseX: 0,
    mouseY: 0
};
var screen

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


  function onDocumentMouseMove( event ) {
    controls.mouseX = event.clientX - screen.windowHalfX;
    controls.mouseY = event.clientY - screen.windowHalfY;
  }

  function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      controls.mouseX = event.touches[ 0 ].pageX - screen.windowHalfX;
      controls.mouseY = event.touches[ 0 ].pageY - screen.windowHalfY;
    }
  }

  function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      controls.mouseX = event.touches[ 0 ].pageX - screen.windowHalfX;
      controls.mouseY = event.touches[ 0 ].pageY - screen.windowHalfY;
    }
  }


  export var init_controls = function(_screen){
    screen = _screen
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
  }