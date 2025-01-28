// //Import the THREE.js library
// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// // To allow for the camera to move around the scene
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// // To allow for importing the .gltf file
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// //Create a Three.JS Scene
// const scene = new THREE.Scene();
// //create a new camera with positions and angles
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// //Keep track of the mouse position, so we can make the eye move
// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight / 2;

// //Keep the 3D object on a global variable so we can access it later
// let object;

// //OrbitControls allow the camera to move around the scene
// let controls;

// //Set which object to render
// let objToRender = 'tadpole';

// //Instantiate a loader for the .gltf file
// const loader = new GLTFLoader();

// //Load the file
// loader.load(
//   `static/models/${objToRender}/scene.gltf`,
//   function (gltf) {
//     //If the file is loaded, add it to the scene
//     object = gltf.scene;
//     scene.add(object);
//   },
//   function (xhr) {
//     //While it is loading, log the progress
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//   },
//   function (error) {
//     //If there is an error, log it
//     console.error(error);
//   }
// );

// //Instantiate a new renderer and set its size
// const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
// renderer.setSize(window.innerWidth / 4 , window.innerHeight / 4 );

// //Add the renderer to the DOM
// document.getElementById("container3D").appendChild(renderer.domElement);

// //Set how far the camera will be from the 3D model
// camera.position.z = objToRender === "tadpole" ? .3 : 500;

// //Add lights to the scene, so we can actually see the 3D model
// const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
// topLight.position.set(500, 500, 500) //top-left-ish
// topLight.castShadow = true;
// scene.add(topLight);

// const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "tadpole" ? 5 : 1);
// scene.add(ambientLight);

// //This adds controls to the camera, so we can rotate / zoom it with the mouse
// // if (objToRender === "tadpole") {
// //   controls = new OrbitControls(camera, renderer.domElement);
// // }

// //Render the scene
// function animate() {
//   requestAnimationFrame(animate);
//   //Here we could add some code to update the scene, adding some automatic movement

//   //Make the eye move
//   if (object && objToRender === "tadpole") {
//     //I've played with the constants here until it looked good 
//     object.rotation.y = -3 + mouseX / window.innerWidth * 3;
//     object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
//   }
//   renderer.render(scene, camera);
// }

// //Add a listener to the window, so we can resize the window and the camera
// window.addEventListener("resize", function () {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// //add mouse position listener, so we can make the eye move
// document.onmousemove = (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// }

// //Start the 3D rendering
// animate();

// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create the Three.JS Scene
const scene = new THREE.Scene();

// Camera setup
const container = document.getElementById("container3D");
// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, .2, .1); // Slightly raise the camera to view the model better
  camera.lookAt(0, 0, 0);     

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lights setup
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// Variables to track the state
let object; // To store the loaded 3D model
let mouseX = window.innerWidth / 2; // Start with mouse at the center
let mouseY = window.innerHeight / 2; // Start with mouse at the center

// GLTF Loader for the 3D model
const loader = new GLTFLoader();
loader.load(
    `static/models/tadpole/scene.gltf`,
    (gltf) => {
      object = gltf.scene;
  
      object.scale.set(2, 2, 2); // Ensure it's visible
      object.position.set(0,0, 0); // Center the model
  
      // Correct orientation
      object.rotation.set(0, -Math.PI / 2, 0); // Rotate to face forward properly
  
      scene.add(object);
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );

// Animation loop
function animate() {
    requestAnimationFrame(animate);
  
    if (object) {
      // Make rotation more sensitive & responsive
      object.rotation.y = -Math.PI / 2 + (mouseX / window.innerWidth) * Math.PI; 
      object.rotation.x = -0.6 + (mouseY / window.innerHeight) * Math.PI * 0.3; 
    }
  
    renderer.render(scene, camera);
  }

// Resize event listener to ensure responsive canvas
function resizeRendererToDisplaySize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Adjust the container height dynamically for larger screens
  const containerHeight = window.innerWidth > 1024 ? 200 : window.innerHeight / 4;
  container.style.height = `${containerHeight}px`;

  renderer.setSize(width, containerHeight);
  camera.aspect = width / containerHeight;
  camera.updateProjectionMatrix();
}

// Mousemove listener to track global mouse position
document.onmousemove = (e) => {
  mouseX = e.clientX; // Capture global X coordinate
  mouseY = e.clientY; // Capture global Y coordinate
};

// Add event listeners
window.addEventListener("resize", resizeRendererToDisplaySize);
resizeRendererToDisplaySize(); // Initial call to set container height

// Start the rendering loop
animate();
