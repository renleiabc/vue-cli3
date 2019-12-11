"use strict";
/* globals THREE, $, TweenLite, Power3, TimelineMax  */

var camera = undefined,
    scene = undefined,
    renderer = undefined;
var plane = undefined;
var raycaster = new THREE.Raycaster();
var normalizedMouse = {
	x: 0,
	y: 0
};

// let lightBlue = {
// 	r: 34,
// 	g: 183,
// 	b: 236
// };

var darkBlue = {
	r: 10,
	g: 20,
	b: 30
};

var baseColorRGB = darkBlue;
var baseColor = "rgb(" + baseColorRGB.r + "," + baseColorRGB.g + "," + baseColorRGB.b + ")";
var nearStars = undefined,
    farStars = undefined,
    farthestStars = undefined;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();

	// Scene initialization
	camera.position.z = 60;

	renderer.setClearColor("#121212", 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	document.body.appendChild(renderer.domElement);

	// Lights
	var topLight = new THREE.DirectionalLight(0xffffff, 1);
	topLight.position.set(0, 1, 1).normalize();
	scene.add(topLight);

	var bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
	bottomLight.position.set(1, -1, 1).normalize();
	scene.add(bottomLight);

	var skyLightRight = new THREE.DirectionalLight(0x666666, 0.2);
	skyLightRight.position.set(-1, -1, 0.2).normalize();
	scene.add(skyLightRight);

	var skyLightCenter = new THREE.DirectionalLight(0x666666, 0.2);
	skyLightCenter.position.set(-0, -1, 0.2).normalize();
	scene.add(skyLightCenter);

	var skyLightLeft = new THREE.DirectionalLight(0x666666, 0.2);
	skyLightLeft.position.set(1, -1, 0.2).normalize();
	scene.add(skyLightLeft);

	// Mesh creation
	var geometry = new THREE.PlaneGeometry(700, 700, 100, 100);
	var darkBlueMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });

	geometry.vertices.forEach(function (vertice) {
		vertice.x += (Math.random() - 0.5) * 4;
		vertice.y += (Math.random() - 0.5) * 4;
		vertice.z += (Math.random() - 0.5) * 4;
		vertice.dx = Math.random() - 0.5;
		vertice.dy = Math.random() - 0.5;
		vertice.randomDelay = Math.random() * 5;
	});

	for (var i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setStyle(baseColor);
		geometry.faces[i].baseColor = baseColorRGB;
	}

	plane = new THREE.Mesh(geometry, darkBlueMaterial);
	scene.add(plane);

	// Create stars
	farthestStars = createStars(1200, 420, "#0952BD");
	farStars = createStars(1200, 370, "#A5BFF0");
	nearStars = createStars(1200, 290, "#118CD6");

	scene.add(farthestStars);
	scene.add(farStars);
	scene.add(nearStars);

	farStars.rotation.x = 0.25;
	nearStars.rotation.x = 0.25;

	// Uncomment for testing second camera position
	// camera.rotation.x = Math.PI / 2;
	// camera.position.y = -0;
	// camera.position.z = 20;
	// plane.scale.x = 2;
}

function createStars(amount, yDistance) {
	var color = arguments.length <= 2 || arguments[2] === undefined ? "0x000000" : arguments[2];

	var opacity = Math.random();
	var starGeometry = new THREE.Geometry();
	var starMaterial = new THREE.PointsMaterial({ color: color, opacity: opacity });

	for (var i = 0; i < amount; i++) {
		// 根据照相机，把这个向量转换到视点坐标系
		var vertex = new THREE.Vector3();
		vertex.z = (Math.random() - 0.5) * 1500;
		vertex.y = yDistance;
		vertex.x = (Math.random() - 0.5) * 1500;

		starGeometry.vertices.push(vertex);
	}

	return new THREE.Points(starGeometry, starMaterial);
}

var timer = 0;

function render() {
	requestAnimationFrame(render);

	timer += 0.02;
	var vertices = plane.geometry.vertices;

	for (var i = 0; i < vertices.length; i++) {
		// 在保持正弦波的同时，回到原始顶点位置
		vertices[i].x -= Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dx;
		vertices[i].y += Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dy;
		// ((vertices[i].x - vertices[i].originalPosition.x) * 0.1) +
	}

	// 确定从摄像机视图投射光线的位置
	// 在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
	// 用一个新的原点和方向向量来更新射线（ray）
	raycaster.setFromCamera(normalizedMouse, camera);

	// Send objects being intersected into a variable
	// 检查射线和物体之间的所有交叉点（包含或不包含后代）。交叉点返回按距离排序，最接近的为第一个。 返回一个交叉点对象数组。
	var intersects = raycaster.intersectObjects([plane]);

	if (intersects.length > 0) {
		(function () {

			var faceBaseColor = intersects[0].face.baseColor;

			plane.geometry.faces.forEach(function (face) {
				face.color.r *= 255;
				face.color.g *= 255;
				face.color.b *= 255;

				face.color.r += (faceBaseColor.r - face.color.r) * 0.01;
				face.color.g += (faceBaseColor.g - face.color.g) * 0.01;
				face.color.b += (faceBaseColor.b - face.color.b) * 0.01;

				var rInt = Math.floor(face.color.r);
				var gInt = Math.floor(face.color.g);
				var bInt = Math.floor(face.color.b);

				var newBasecol = "rgb(" + rInt + "," + gInt + "," + bInt + ")";
				face.color.setStyle(newBasecol);
			});
			plane.geometry.colorsNeedUpdate = true;

			intersects[0].face.color.setStyle("#a4a8a9");
			// 设置该值为true后，如果材质发生改变，就会使用新的材质刷新它的缓存
			plane.geometry.colorsNeedUpdate = true;
		})();
	}

	plane.geometry.verticesNeedUpdate = true;
	plane.geometry.elementsNeedUpdate = true;

	farthestStars.rotation.y -= 0.00001;
	farStars.rotation.y -= 0.00005;
	nearStars.rotation.y -= 0.00011;

	renderer.render(scene, camera);
}

init();

window.addEventListener("resize", function () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("mousemove", function (event) {
	// 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
	normalizedMouse.x = event.clientX / window.innerWidth * 2 - 1;
	normalizedMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

render();