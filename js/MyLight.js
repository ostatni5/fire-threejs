function MyLight(name, color, position) {

    //puste zmienne: materiał , geometria, światło, mesh    
    // kontener
    var container = new THREE.Object3D();
    var light;
    var mesh;
    
    // init
    function init() {
        light = new THREE.PointLight(color, 1,800);//new THREE.SpotLight(color, 1,200,3.14);
        light.position.x = position.x;
        light.position.y = position.y;
        light.position.z = position.z;
        //console.log(light.position)
        light.castShadow = true;
        container.add(light)
    }

    init();

    // funkcja publiczna zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    this.getLight = function () {
        return container;
    }

    // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

    this.changeLightColor = function (color) {
        light.color.setHex(color)
        console.log("zmiana koloru na " + color)
    }

}