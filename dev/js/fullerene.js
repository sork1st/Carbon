if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var stats;
	var camera, controls, scene, renderer;
	init();
	render(); // remove when using next line for animation loop (requestAnimationFrame)
	animate();
	function init() {
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( scene.fog.color );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		var container = document.getElementById( 'container' );
		container.appendChild( renderer.domElement );
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 500;
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render ); // remove when using animation loop
		// enable animation loop when using damping or autorotation
		//controls.enableDamping = true;
		//controls.dampingFactor = 0.25;
		controls.enableZoom = false;

		// Elementos

			// Ler geometria stl file
			var loader = new THREE.STLLoader();
			loader.load( 'models/stl/fullerene-bas.stl', function ( geometry ) {
				var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.set( 0, - 0.25, 0 );
				mesh.rotation.set( 0, 0, 0 );
				mesh.scale.set( 80, 80, 80 );
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				scene.add( mesh );
			} );

		// lights
		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 1, 1 );
		scene.add( light );
		light = new THREE.DirectionalLight( 0x002288 );
		light.position.set( -1, -1, -1 );
		scene.add( light );
		light = new THREE.AmbientLight( 0x222222 );
		scene.add( light );
		//
		stats = new Stats();
		container.appendChild( stats.dom );
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	function animate() {
		requestAnimationFrame( animate );
		controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
		stats.update();
		render();
	}
	function render() {
		renderer.render( scene, camera );
	}
