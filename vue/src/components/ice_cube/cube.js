import * as THREE from 'three';
import { Refractor } from './Refractor.js'
export class Cube {
    constructor(name) {
        var cube = new THREE.Object3D()
        var geometry = new THREE.BoxGeometry( 100, 100, 100 );
        geometry.translate(0,55,0)
        var mapHeight = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waterdudv.jpg" );
        // var material = new THREE.MeshStandardMaterial( { color: 0x6083c2 } );
        mapHeight.wrapS = THREE.RepeatWrapping;
        mapHeight.wrapT = THREE.RepeatWrapping;
        mapHeight.repeat.x = 0.1;
        mapHeight.repeat.y = 0.1;
        mapHeight.anisotropy = 0;
        
        // var material = new THREE.MeshStandardMaterial( {
        //     // map: mapHeight,
        //     color: 0xfffdff,
        //     // color: 0x000000,
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     opacity: 0.1,
        //     // side: THREE.FrontSide,
        //     bumpMap: mapHeight,
        //     // envMap: mapHeight,
        //     normalMap: mapHeight,
        //     bumpScale: 50.5,
        //     // transparency:0.4,
        //     transparent: true,
        //     // clearcoat: 1.0,
        //     // clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 ),
        //     // // envMapIntensity: 5,
        //     // // envMapIntensity: 10,
        //     // premultipliedAlpha: true
        //     // TODO: Add custom blend mode that modulates background color by this materials color.
        // } );


        var material = new THREE.MeshPhysicalMaterial( {
            // color: 0x00ccff,
            metalness: 0.1,
            roughness: 1.0,
            transparency:0.75,
            opacity: 1,
            transparent: true,
            clearcoat: 1.0,
            normalMap: mapHeight,
            clearcoatRoughness:1,
            // y scale is negated to compensate for normal map handedness.
            clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 )
        } );

        var c = new THREE.Mesh( geometry, material );

        var geometry = new THREE.BoxGeometry( 97, 97, 97 );
        geometry.translate(0,56,0)
        var d = new Refractor( geometry, {
            color: 0xaaaaaa,
        } );
        d.castShadow=true;


        c.name = name
        c.castShadow=true;
        // c.receiveShadow=true;
        // var axesHelper = new THREE.AxesHelper( 500 );
        cube.add( axesHelper );
        var axesHelper = new THREE.AxesHelper( 200 );
        // c.add( axesHelper );
        cube.add(c)
        c.add(d)
        return cube
    }   
  }