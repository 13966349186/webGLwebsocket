// ����ȫ�ֱ���
var startTime	= Date.now();
var container;
//��������ͷ����������Ⱦ��
var camera, scene, renderer;
var skyboxMesh;

// ����Ƿ��ж���������û��������������Ӷ�Ӧ�ĺ���
if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}
//��ʼ��
init();		
animate();

function init() {
	// ����Ƿ�֧��webgl
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// ��������ͷ
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	
	// ��������
	scene = new THREE.Scene();
	
	// ���ر���ͼ
	var urlPrefix	= "Images/";
	var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
			urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
			urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	
	// ��ʼ������
	var shader	= THREE.ShaderUtils.lib["cube"];
	var uniforms	= THREE.UniformsUtils.clone( shader.uniforms );
	uniforms['tCube'].texture= textureCube;
	var material = new THREE.MeshShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms
	});

	//��״����
	skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );

	// ��ӵ�������
	scene.addObject( skyboxMesh );

	// ����div����canvas�ŵ�����
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// ��ʼ����Ⱦ��
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
}

function animate() {
	// ��Ⱦ3d����
	render();
	// ���ö���
	requestAnimationFrame( animate );
}

function render() {
	// move the camera based on a timer
	var timer = - new Date().getTime() * 0.0002; 
	camera.position.x = 1000 * Math.cos( timer );
	camera.position.z = 1000 * Math.sin( timer );
 

	// չʾ����
	renderer.render( scene, camera );
}