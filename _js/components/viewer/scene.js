'use strict';

let scene;
let camera;
let renderer;
let controlledObj;
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;


const attachListners = () => {
  /*
  document.addEventListener('mousemove', (evt) => {
    mouseX = (evt.clientX - windowHalfX) / 2;
    mouseY = (evt.clientY - windowHalfY) / 2;
  });
  */
};


const initialize = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1;

  const light = new THREE.DirectionalLight(0x101030, 10);
  light.position.set( 1, 1, 0 );
  scene.add(light);

  const manager = new THREE.LoadingManager();
  manager.onProgress = (item, loaded, total) => {
    return console.log(item, loaded, total);
  };

  const groundGeo = new THREE.PlaneGeometry( 20, 20, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const groundMesh = new THREE.Mesh(groundGeo, material);
  groundMesh.rotation.x = Math.PI / 2;
  groundMesh.position.y = 0;
  console.log(groundMesh.rotation.x)
  scene.add(groundMesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  attachListners();
};

const onError = () => {};

const onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2), '% percent complete');
  }
};

const loadObj = (objPath) => {
  const loader = new THREE.OBJLoader();
  loader.load(objPath, (object) => {
    object.position.y = 0;
    controlledObj = object;
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      specular: 0xffffff,
      shininess: 33,
    });

    controlledObj.traverse( function ( child ) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    controlledObj.material = material;
    object.add(camera);
    scene.add(controlledObj);
  }, onProgress, onError);
};

const render = () => {
  if(controlledObj) {
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = -10;
    camera.lookAt(controlledObj.position);
    renderer.render(scene, camera);
  }
};

const animateScene = () => {
  setTimeout( function() {
    requestAnimationFrame(animateScene);
   }, 1000 / 30 );
  render();
};

module.exports = {
  init: initialize,
  load: loadObj,
  animate: animateScene,
};
