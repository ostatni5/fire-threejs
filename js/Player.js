function Player() {
    var geo;
    var texture;
    var meshModel;
    var unit = 50;
    var load = false;
    var modelMaterial = new THREE.MeshBasicMaterial(
             {
                 map: THREE.ImageUtils.loadTexture("/static/img/robot.jpg"),
                 morphTargets: true,
             });
    var loader = new THREE.JSONLoader();
    loader.load('/static/models/robot.js', function (geometry) {
        meshModel = new THREE.Mesh(geometry, modelMaterial)
        meshModel.name = "player";
        meshModel.rotation.y = 0; // ustaw obrót modelu
        meshModel.position.y = 25; // ustaw pozycje modelu
        meshModel.position.x = -0;
        meshModel.scale.set(1, 1, 1); // ustaw skalę modelu
        //game.scene.add(meshModel);
        load = true;
        game.setMixer(new THREE.AnimationMixer(meshModel))
        game.getMixer().clipAction("stnd").play();
    });

    this.getLoad = function () {
        return load;
    };
    this.getMesh = function () {
            console.log(meshModel)
            return meshModel;
       
    }
}