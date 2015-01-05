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
      color: 0x999999,
      linewidth: 1,
      dashSize: 4,
      gapSize: 2
    });
  }
  for(var i=0; i<array.length; i++){
    var index = array[i];
    object.children[index].material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2
    });
  }
}

function getAllCombinations(input){
  var results = [], result, mask, total = Math.pow(2, input.length);
  for(mask = 0; mask < total; mask++){
    result = [];
    i = input.length - 1;
    do{
      if( (mask & (1 << i)) !== 0){
        result.push(input[i]);
      }
    }while(i--);
    results.push(result.reverse());
  }
  return results;
}

function combine(input, size){
  var results = [], result, mask, total = Math.pow(2, input.length);
  for(mask = 0; mask < total; mask++){
    result = [];
    i = input.length - 1;
    do{
      if( (mask & (1 << i)) !== 0){
        result.push(input[i]);
      }
    }while(i--);
    if( result.length == size){
      results.push(result.reverse());
    }
  }
  return results;
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
  document.body.onkeypress = keyEvent;

  var sets = combine([0,1,2,3,4,5,6,7,8,9,10,11], 3);
  var cols = 10;
  var rows = Math.ceil(sets.length / cols);
  for( var i=0; i<sets.length; i++ ){
    var one = cube(40);
    var x = i % cols;
    var y = Math.floor(i / cols);
    one.position.x = (x - (cols-1)/2) * 100;
    one.position.y = ((rows-1)/2 - y) * 100;
    setLinesVisible( one, sets[i] );
    objects.push(one);
    scene.add(one);
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

var time = 0, animationStop = false;
function render() {
  for(var i = 0; i < objects.length; i ++) {
    var object = objects[ i ];
    // object.rotation.y = Math.PI / 4;
    object.rotation.y = time;
  }
  if(!animationStop){
    time = time + 0.015;
  }
  renderer.render(scene, camera);
}

function keyEvent(event) {
  var key = event.keyCode || event.which;
  if (key == 32) {
    animationStop = !animationStop;
  }
}

init();
animate();
