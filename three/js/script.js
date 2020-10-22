const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
})

const RADIUS = 5;
const geometry = new THREE.DodecahedronGeometry(RADIUS, 0);


const material = new THREE.MeshLambertMaterial({ color: '#8bcdd9' });

const mesh = new THREE.Mesh(geometry, material);
const pointLight = new THREE.PointLight('#c0b9ed', 2);

pointLight.position.x = 100;
pointLight.position.y = 100;
pointLight.position.z = 20;

scene.add(pointLight);
scene.add(mesh);
mesh.position.z = -RADIUS * 10;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight - 30;


const FIELD_OF_VIEW = 35;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const camera = new THREE.PerspectiveCamera(
    FIELD_OF_VIEW,
    ASPECT,
    NEAR,
    FAR
);

renderer.setSize(WIDTH, HEIGHT);


document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

function update(){
    const speed = Math.random()/30;
    mesh.rotation.x += speed;
    mesh.rotation.y += speed;
    mesh.rotation.z += speed;
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
