import * as THREE from 'three';
import { Refractor } from './Refractor.js'
export class Cube {
    constructor(name) {
        var cube = new THREE.Object3D()
        var geometry = new THREE.BoxGeometry( 100, 100, 100 );
        geometry.translate(0,55,0)
        var mapHeight = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waterdudv.jpg" );
        var material = new THREE.MeshStandardMaterial( {
            map: null,
            color: 0x00ccff,
            // metalness: 1,
            // roughness: 0.1,
            opacity: 0.3,
            side: THREE.FrontSide,
            transparent: true,
            bumpMap: mapHeight,
            bumpScale: 50.5
            // envMapIntensity: 5,
            // envMapIntensity: 10,
            // premultipliedAlpha: true
            // TODO: Add custom blend mode that modulates background color by this materials color.
        } );

        // var material = new THREE.MeshStandardMaterial( { color: 0x6083c2 } );
        mapHeight.wrapS = THREE.RepeatWrapping;
        mapHeight.wrapT = THREE.RepeatWrapping;
        mapHeight.repeat.x = 0.3;
        mapHeight.repeat.y = 0.3;
        mapHeight.anisotropy = 100;

        var material = new THREE.MeshPhysicalMaterial( {
            // color: 0x00ccff,
            metalness: 0.0,
            // roughness: 0.1,
            transparency:0.6,
            opacity: 1,
            transparent: true,
            clearcoat: 1.0,
            normalMap: mapHeight,
            // y scale is negated to compensate for normal map handedness.
            clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 )
        } );

        var c = new THREE.Mesh( geometry, material );

        var geometry = new THREE.BoxGeometry( 97, 97, 97 );
        geometry.translate(0,56,0)
        var d = new Refractor( geometry, {
            color: 0x999999,
            // shader: WaterRefractionShader
        } );
        d.castShadow=true;


        c.name = name
        c.castShadow=true;
        // c.receiveShadow=true;
        var axesHelper = new THREE.AxesHelper( 500 );
        // cube.add( axesHelper );
        var axesHelper = new THREE.AxesHelper( 200 );
        // c.add( axesHelper );
        cube.add(c)
        c.add(d)
        return cube
    }   
  }