/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var test = 10;
    var camera;
    var pionek;
    var scene;
    var mixer;
    var mixesrs = [];
    var clock;

    var key = {
        w: false,
        a: false,
        d: false
    }
    var controls = {
        light: true
    }
    /*
        zmienna publiczna, dostępna z innych klas/plików, nie używać
    */
    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej funkcji (klasie)
    */

    function init() {
        document.addEventListener("keydown", onKeyDown, false); // naciśnięcie dowolnego klawisza
        document.addEventListener("keyup", onKeyUp, false); //zwolnienie dowolnego klawisza
        //document.addEventListener("mousedown", onMouseDown, false);
        function onKeyDown(event) {
            var keyCode = event.which;
            switch (keyCode) {

                case 37:
                case 65:
                    key.a= true;
                    break;
                case 38:
                case 87:
                    mixer.clipAction("stnd").stop();
                    mixer.clipAction("run").play();
                    key.w = true;
                    break;
                case 39:
                case 68:
                    key.d = true;
                    break;
                case 40:
                case 83:
                    //move.down = true;
                    break;
                case 27:
                    //edit = false;
                    break;
                case 81:
                    //move.z_up = true;
                    break;
                case 69:
                    //move.z_down = true;
                    break;
            }

        }
        function onKeyUp(event) {
            var keyCode = event.which;
            switch (keyCode) {

                case 37:
                case 65:
                    key.a = false;
                    break;
                case 38:
                case 87:
                    mixer.clipAction("run").stop();
                    mixer.clipAction("stnd").play();
                    key.w = false;
                    break;
                case 39:
                case 68:
                    key.d = false;
                    break;
                case 40:
                case 83:
                    //move.down = true;
                    break;
                case 27:
                    //edit = false;
                    break;
                case 81:
                    //move.z_up = true;
                    break;
                case 69:
                    //move.z_down = true;
                    break;
            }

        }



        console.log("Hello there")
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        var szerokosc = window.innerWidth
        var wysokosc = window.innerHeight
        camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        szerokosc / wysokosc, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
        );
        
        var renderer = new THREE.WebGLRenderer();
        renderer.shadowMapEnabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //kolor tła sceny - uwaga na prefix 0x a nie # 
        renderer.setClearColor(0xffffff);
        //ustalenie rozmiarów renderowanego okna w px (szer, wys)
        renderer.setSize(szerokosc, wysokosc);
        

        var axis = new THREE.AxisHelper(1000);    // 200 - wielkość 
        scene.add(axis)

        document.getElementById("divRender").appendChild(renderer.domElement);
        var a = 0;
        var b = 0;
        var alpha = 180;
        var rad = Math.PI / 180;
        camera.position.x = 0;
        camera.position.y = 1700;
        camera.position.z = 0;
       
        var stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

        function animateScene() {
            stats.begin();
            var delta = clock.getDelta();
            if (mixer) mixer.update(delta);

            camera.lookAt(scene.position);
            camera.updateProjectionMatrix();
            var player = scene.getObjectByName("player")
            if (player != undefined) {
                var camVect = new THREE.Vector3(100, 50, 0)
                var camPos = camVect.applyMatrix4(player.matrixWorld);

                camera.position.x = camPos.x
                camera.position.y = camPos.y
                camera.position.z = camPos.z

                camera.lookAt(player.position)
            }

            if (key.w)
                player.translateX(-delta*200)
            if (key.a)
                player.rotation.y += 0.05
            if (key.d)
                player.rotation.y -= 0.05



            requestAnimationFrame(animateScene)
            renderer.render(scene, camera);
            stats.end();
        }

        animateScene();

    }

    init();

    this.kamera = function (X, Y, Z) {
        console.log("ustawiam:",X,Y,Z)
        camera.position.x = X;
        camera.position.y = Y;
        camera.position.z = Z;
        console.log(camera.position)
           
    }
    this.addToScene = function (obj) {
        scene.add(obj)
    }
    this.scene = scene;
    
    /*
        funkcje publiczne możliwe do wywołania z innych funkcji (klas)
    */
    this.setMixer = function (val) {
        mixer = val;
        console.log(mixer)
    }
    this.getMixer = function (val) {
        return mixer;
    }

    this.setTest = function (val) {
        test = val;
        alert("ustawiam test w klasie Game na: " + test)
    }

    this.getTest = function () {
        return test;
    }


}

