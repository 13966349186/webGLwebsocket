// ����ȫ�ֱ���
var startTime	= Date.now();
var container;
//��������ͷ����������Ⱦ��
var camera, scene, renderer;
var skyboxMesh,
lon = 0, isUserInteracting = false,//�Ƿ����û������������϶�����
lat = 0,
phi = 0, theta = 0;

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

function init() {
	// ����Ƿ�֧��webgl
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var container, mesh;

	//�õ������ĸ���Ԫ��
	container = document.getElementById( 'pano_container' );
	//��ʼ������
	scene = new THREE.Scene();
	//��ʼ������ͷ
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1100 );
	camera.target = new THREE.Vector3( 0, 0, 0 );
	scene.add( camera );
	//��ʼ�����������
	mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Images/11.jpg' ) } ) );
	mesh.scale.x = -1;
	scene.add( mesh );

	//��Ⱦ��
	var element = document.getElementById( 'panoBox' );
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( element.clientWidth-20, element.clientHeight );

	container.appendChild( renderer.domElement );
	
	//Ϊȫ��ͼ�������¼�
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
}

function animate() {
	// ��Ⱦ3d����
	render();
	// ���ö���
	requestAnimationFrame( animate );
}

function render() {
	// ����ʱ��ת������ͷ
	// var timer = - new Date().getTime() * 0.0002; 
	// camera.position.x = 1000 * Math.cos( timer );
	// camera.position.z = 1000 * Math.sin( timer );
	//�����λ�Ƽ��������ͷ���ӽ�
	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = ( 90 - lat ) * Math.PI / 180;
	theta = lon * Math.PI / 180;

	camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	camera.target.y = 500 * Math.cos( phi );
	camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( camera.target );

	// չʾ����
	renderer.render( scene, camera );
}

//��갴��
function onDocumentMouseDown( event ) {
	isUserInteracting = true;

	//��¼�´�ʱ�����λ��
	//���ָ������������ҳ�棨��ͻ�������ˮƽ����
	onPointerDownPointerX = event.clientX;
	//���ָ������������ҳ�棨��ͻ������Ĵ�ֱ����
	onPointerDownPointerY = event.clientY;

	//��¼�������ԭ���λ��
	onPointerDownLon = lon;
	onPointerDownLat = lat;
}

function onDocumentMouseMove( event ) {
	//ֻ������갴�µ�ʱ������ƶ�����
	if ( isUserInteracting ) {
	//�ƶ����ʱ�仯��λ��������ԭ����λ��
		lon = ( onPointerDownPointerX - event.clientX ) * 0.2 + onPointerDownLon;
		lat = ( onPointerDownPointerY - event.clientY ) * 0.2 + onPointerDownLat;
	}
}

//��굯��
function onDocumentMouseUp( event ) {
	isUserInteracting = false;
}