function cube(size) {
  var h = size * 0.5;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( -h, -h, -h ),
    new THREE.Vector3( -h, h, -h ),

    new THREE.Vector3( -h, h, -h ),
    new THREE.Vector3( h, h, -h ),

    new THREE.Vector3( h, h, -h ),
    new THREE.Vector3( h, -h, -h ),

    new THREE.Vector3( h, -h, -h ),
    new THREE.Vector3( -h, -h, -h ),


    new THREE.Vector3( -h, -h, h ),
    new THREE.Vector3( -h, h, h ),

    new THREE.Vector3( -h, h, h ),
    new THREE.Vector3( h, h, h ),

    new THREE.Vector3( h, h, h ),
    new THREE.Vector3( h, -h, h ),

    new THREE.Vector3( h, -h, h ),
    new THREE.Vector3( -h, -h, h ),

    new THREE.Vector3( -h, -h, -h ),
    new THREE.Vector3( -h, -h, h ),

    new THREE.Vector3( -h, h, -h ),
    new THREE.Vector3( -h, h, h ),

    new THREE.Vector3( h, h, -h ),
    new THREE.Vector3( h, h, h ),

    new THREE.Vector3( h, -h, -h ),
    new THREE.Vector3( h, -h, h )
  );
  var colors = [];
  for(var i=0; i<geometry.vertices.length; i++){
    colors.push(
      new THREE.Color( 0x0ffff0 )
    )
  }
  geometry.colors = colors;
  return geometry;
}

function setGeometryLinesVisible( geometry, array ){
  for(var i=0; i<geometry.vertices.length; i++){
    geometry.colors[i] = new THREE.Color( 0x000000 );
  }
  for(var i=0; i<array.length; i++){
    var index= array[i] * 2;
    geometry.colors[index] = new THREE.Color( 0x0ffff0 );
    geometry.colors[index + 1] = new THREE.Color( 0x0ffff0 );
  }
}

var scene, camera, renderer;
var width = window.innerWidth,
    height = window.innerHeight;
var objects = [];

function init(){
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -500, 1000 );
  // camera.position.x = 200;
  // camera.position.y = 100;
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var material, geometry, mesh;

  geometry = cube(200);
  // setGeometryLinesVisible( geometry, [8,9,10,11] );

  material = new THREE.LineBasicMaterial ({
    color: 0xffffff,
    linewidth: 2,
    vertexColors: THREE.VertexColors
  });

  mesh = new THREE.Line(geometry, material, THREE.LinePieces);
  mesh.rotation.x = 0.6152;
  mesh.position.z = 0;
  objects.push(mesh);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var time = Date.now() * 0.01;
  for(var i = 0; i < objects.length; i ++) {
    var object = objects[ i ];
    // object.rotation.y = 0.25 * time;
    object.rotation.y = Math.PI / 4;
  }
  renderer.render(scene, camera);
}

init();
animate();
