function init(){
  var sample = [];
  var scene = new THREE.Scene();

  // Camera Settings
  var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.x = 1;
  camera.position.y = 5;
  camera.position.z = 10;

  var renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, canvas: sampleCanvas});
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth,window.innerHeight);
  //document.body.appendChild(renderer.domElement); // For use without Convas

  // LIGHTING
  var light = new THREE.PointLight(0xFFFFFF, 2, 1000); 
  light.position.set(0,5,10);
  scene.add(light);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  controls.maxAzimuthAngle = Math.PI / 4;
  controls.minAzimuthAngle = - Math.PI / 4.1;
  controls.screenSpacePanning = true;
  controls.minDistance = 7;
  controls.maxDistance = 50;








  






  






  






  // GUI for Sample Editing
  var YXROsampleControls = function() {

    this.color0 = "#ffae23"; // CSS string
    this.color1 = [ 0, 128, 255 ]; // RGB array
    this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
    this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value

    this.SampleName = 'YXRO.par';
    this.speed = 0.8;
    this.displayOutline = false;
  };

  var text = new YXROsampleControls();
  var gui = new dat.GUI();
  gui.add(text, 'SampleName');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');


  gui.addColor(text, 'color0');
  gui.addColor(text, 'color1');
  gui.addColor(text, 'color2');
  gui.addColor(text, 'color3');






  






  






  






  
  // The Main object where layers are being added
  var parent = new THREE.Group();
  scene.add( parent );
  parent.position.set( 0, 0, 0 );
  parent.rotation.set(0,1,0);

  var meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 100, 100),
    new THREE.MeshBasicMaterial({ wireframe: true })
  );
  meshFloor.rotation.x -= Math.PI / 2;
  scene.add( meshFloor );

  // ******* Save Image as .png Function *******
  document.getElementById("capture").addEventListener('click', saveAsImage);

  function saveAsImage() {
    var imgData;

    try {
        var strMime = "image/png";
        imgData = renderer.domElement.toDataURL(strMime);

        saveFile(imgData.replace(strMime, "image/octet-stream"), "YXRO.png");

    } catch (e) {
        console.log(e);
        return;
    }
  }

  var saveFile = function (strData, filename) {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.download = filename;
          link.href = strData;
          link.click();
          document.body.removeChild(link); //remove the link when done
      } else {
          location.replace(uri);
      }
  }

  // ANIMATIONS
  var render = function(){
    requestAnimationFrame(render);

    //Animately Rotates Object
    //parent.rotation.x += 0.01;
    // mesh.position.x += 0.1;
    //parent.rotation.y += 0.01;
    //mesh.scale.x += 0.01;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }

  // Updates Scene with resize of browser
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  })

  // Fixes Obj Blockiness
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // *******  Upload .par Files *******
  document.getElementById( 'upload' ).addEventListener( "change", function onLoad(event) {
    
    if (parent.children.length >0){
      parent.children = [];
    }
    console.log(parent);

    var file = event.target;
    var reader = new FileReader();

    reader.onload = function(event) {
      var lines = this.result.split("\n");

      var name = lines[7].split('\t');
      var thickness = lines[11].split('\t');
      var roughness = lines[13].split('\t');

      var obj = "";
      for(var i = 0; i < name.length; i++){
        obj = name[i];
        obj = new LayerObj(obj,thickness[i]);
        sample.push(obj);
      }
      console.log("here",sample);
      createSample(name, thickness);
    };
    reader.readAsText(file.files[0]);
  });

  // Creates the Sample Image - Used in Upload Function
  function createSample(name, thickness){
    var sample = [];

    var length = thickness.length -2; // We dont need the 0th element (Vacuum) and the last element (inf) in array
    var x = length;
    var y = 0;
    var param = 0;
    console.log(thickness);
    for (var i = 0; i <  x; i++){
      param = thickness[length]*0.01;
      var geometry = new THREE.BoxGeometry(5, param, 4);
      var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
      var mesh = new THREE.Mesh(geometry, material);
      //mesh.castShadow = true;

     // Create Layer Obj Here using OOP

      y = y + param/2;
      mesh.position.set( 0,y,0 );
      y = y + param/2;

      parent.add(mesh);
      length--;
    }
  }

  function getRandomColor() {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function LayerObj(name, thickness, color){
    this.name = name;
    this.thickness = thickness;
    this.color = color;
  }

  render();
}

window.onload = init;