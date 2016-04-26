'use strict';

let scene;
let camera;
let renderer;
let controlledObj;
let manager = null;


const attachListners = () => {};


const initialize = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1;

  const light = new THREE.DirectionalLight(0x101030, 10);
  light.position.set( 1, 1, 0 );
  scene.add(light);

  manager = new THREE.LoadingManager();
  manager.onProgress = (item, loaded, total) => {
    return console.log(item, loaded, total);
  };

  /* create ground plane */
  const groundGeo = new THREE.PlaneGeometry( 500, 500, 1 );
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  const groundMesh = new THREE.Mesh(groundGeo, material);
  groundMesh.rotation.x = Math.PI / 2;
  groundMesh.position.y = 0;

  /* loading texture */
  const loader = new THREE.ImageLoader( manager );
  const texture = new THREE.Texture();
  loader.load('/textures/UV_Grid_Sm.jpg', (image) => {
    texture.image = image;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15,15);
    texture.needsUpdate = true;
    groundMesh.material.map = texture;
  });
  scene.add(groundMesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvasRender";
  document.body.appendChild(renderer.domElement);
  attachListners();
};

const onError = () => {};

const onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    // console.log(Math.round(percentComplete, 2), '% percent complete');
  }
};

const loadObj = (objPath) => {
  const loader = new THREE.OBJLoader(manager);
  loader.load(objPath, (object) => {
    object.position.y = 0;
    controlledObj = object;
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      specular: 0xffffff,
      shininess: 33,
    });

    controlledObj.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    controlledObj.material = material;

    /* init self variables */
    controlledObj.velocity = 0;
    controlledObj.turn = 0;

    /* create follow cam */
    object.add(camera);
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = -10;
    scene.add(controlledObj);
    camera.lookAt(controlledObj.position);

    if(onLoadCallback) {
      onLoadCallback();
    }
  }, onProgress, onError);
};

const applyControlTransforms = () => {
  if( controlledObj.velocity > 0) {
    controlledObj.rotateY(controlledObj.turn);
  }
  controlledObj.translateZ(controlledObj.velocity);
};

const render = () => {
  if(controlledObj) {
    applyControlTransforms();
    scene.updateMatrixWorld();
    renderer.render(scene, camera);
  }
};

const animateScene = () => {
  setTimeout(() => {
    requestAnimationFrame(animateScene);
   }, 1000 / 30 );
  render();
};

const getControlObject = () => controlledObj;

let onLoadCallback;
const onLoadFinish = (callback) => {
  onLoadCallback = callback;
};

module.exports = {
  init: initialize,
  load: loadObj,
  animate: animateScene,
  ctrlObj: getControlObject,
  onLoadFinish: onLoadFinish
};
