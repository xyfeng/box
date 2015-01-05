function line(x1, y1, z1, x2, y2, z2) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( x1, y1, z1),
    new THREE.Vector3( x2, y2, z2)
  );
  geometry.computeLineDistances();
  var material = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 1,
    dashSize: 6,
    gapSize: 2
  });
  var line = new THREE.Line( geometry, material, THREE.LinePieces);
  return line;
}

function cube(size) {
  var h = size * 0.5;
  var cube = new THREE.Object3D();
  cube.add( line(-h, -h, -h, -h, h, -h) );
  cube.add( line(-h, h, -h, h, h, -h) );
  cube.add( line(h, h, -h, h, -h, -h) );
  cube.add( line(h, -h, -h, -h, -h, -h) );
  cube.add( line(-h, -h, h, -h, h, h) );
  cube.add( line(-h, h, h, h, h, h) );
  cube.add( line(h, h, h, h, -h, h) );
  cube.add( line(h, -h, h, -h, -h, h) );
  cube.add( line(-h, -h, -h, -h, -h, h) );
  cube.add( line(-h, h, -h, -h, h, h) );
  cube.add( line(h, h, -h, h, h, h) );
  cube.add( line(h, -h, -h, h, -h, h) );
  cube.rotation.x = 0.6152;
  return cube;
}

function setLinesVisible( object, array ){
  for(var i=0; i<object.children.length; i++){
    object.children[i].material = new THREE.LineDashedMaterial({
      color: 0xffffff,
      linewidth: 1,
      dashSize: 6,
      gapSize: 2
    });
  }
  for(var i=0; i<array.length; i++){
    var index = array[i];
    object.children[index].material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 4
    });
  }
}

if ( ! Detector.webgl ) {
  Detector.addGetWebGLMessage();
}
var scene, camera, renderer, stats;
var width = window.innerWidth,
height = window.innerHeight;
var objects = [];

function init(){

  // add stats
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -200, 200 );

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  for( var i=0; i<12; i++ ){
    var one = cube(80);
    var x = i % 4;
    var y = Math.floor(i / 4);
    one.position.x = (x - 1.5) * 200;
    one.position.y = (y - 1) * 200;
    setLinesVisible( one, [i] );
    objects.push(one);
    scene.add(one);
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  var time = Date.now() * 0.01;
  for(var i = 0; i < objects.length; i ++) {
    var object = objects[ i ];
    object.rotation.y = 0.1 * time;
  }
  renderer.render(scene, camera);
}

init();
animate();
