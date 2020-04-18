import * as THREE from 'three';

export var add_lights = function(scene){
    scene.add( new THREE.AmbientLight( 0xffffff ) );
    // scene.fog = new THREE.FogExp2( 0x000000, 0.0004 );
   
    // var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    // dirLight.color.setHSL( 0.1, 1, 0.95 );
    // dirLight.position.set( - 500, 500, 500 );
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;
    // var d = 500;
    // dirLight.shadow.camera.left = - d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = - d;
    // dirLight.shadow.camera.far = 4500;
    // dirLight.shadow.bias = - 0.0001;

    // var dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    // scene.add( dirLightHeper );
    // scene.add( dirLight );

    var pointLight = new THREE.PointLight( 0xffffff, 1, 100000, 40);
    pointLight.castShadow=true;
    pointLight.shadow.radius  = 10
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.far = 2500;
    pointLight.position.set( -500, 1000, 1000 );
    var sphereSize = 20;
    var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    
    scene.add( pointLight );
    
    var pointLight = new THREE.PointLight( 0xffffff, 1, 100000, 40);
    // pointLight.castShadow=true;
    pointLight.shadow.radius  = 10
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.far = 2500;
    pointLight.position.set( -500, 500, 1000 );
    var sphereSize = 20;
    var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    
    scene.add( pointLight );
    // var pointLight = new THREE.PointLight( 0xffffff, 1, 100000, 1000);
    // pointLight.position.set( -500, 300, 200 );
    // pointLight.shadow.camera.far = 2500;
    // scene.add( pointLight );
    scene.add( pointLightHelper );

}
