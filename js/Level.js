/// <reference path="Game.js" />
/// <reference path="Level.js" />
/// <reference path="../libs/three.js" />
/// <reference path="LevelData.js" />
/// <reference path="Ui.js" />
/// <reference path="Net.js" />
/// <reference path="MyLight.js" />

function Level(code) {
    //tu wygeneruj meshe levelu na podstawie danych z poprzedniego pliku
    var container = new THREE.Object3D();
    container.name = "level";
    var unit = 200;
    var size = parseInt(code.size);
    var grid = [];

    for (var i = 0; i < size; i++) {
        grid.push([])
        for (var j = 0; j < size; j++) {
            grid[i].push(0)
        }
    }
    for (var i = 0; i < code.level.length; i++) {
        grid[code.level[i].x][code.level[i].y] = parseInt(code.level[i].id);
    }

    var geometry = {
        block: new THREE.BoxGeometry(unit, unit, unit),
        light: new THREE.ConeGeometry(unit/4, unit/10, 10),
        enemy: new THREE.CylinderGeometry(unit/3, unit/3, unit, 32),
        plane:new THREE.PlaneGeometry( unit*size, unit*size, size ),
    }
    var materials = [
               null,
               new THREE.MeshPhongMaterial({
                   shininess: 50,
                   side: THREE.DoubleSide,
                   map: THREE.ImageUtils.loadTexture("img/w1.png"),
               }),
               new THREE.MeshBasicMaterial({ 
                   color: 0x10604f, side: THREE.DoubleSide, wireframe: true }),
               null,
               new THREE.MeshBasicMaterial({ 
                   color: 0xff0000, side: THREE.DoubleSide, wireframe: true }),
               null
    ]
    var blocks = [
                ["delete", "white",geometry.block],
                ["wall", "orange", geometry.block],
                ["light", "yellow", geometry.light],
                ["wood", "brown", geometry.block],
                ["enemy", "red", geometry.enemy],
                ["stone", "gray", geometry.block]
    ]

    
    var plane = new THREE.Mesh(geometry.plane, new THREE.MeshPhongMaterial({ shininess: 50, side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("img/w2.png"), }));
    plane.name = "floor";
    plane.rotateX(Math.PI / 2);
    plane.position.set(0,0,0)
    container.add(plane);
    plane.receiveShadow = true;

    var light = new THREE.SpotLight(0xffffff, 3, 1500, 3.14);
    light.position.set(100, 1000, 100);
    light.lookAt(plane.position);
    //game.scene.add(light);

    var player = new Player()    
    var playerLoadCheck = setInterval(function () {
        console.log(player.getLoad())
        if (player.getLoad())
        {
            player.getMesh().position.set(50, 25, 250)
            game.scene.add(player.getMesh())
            clearInterval(playerLoadCheck);
        }
    }, 200)
    //player.position.set(50, 30, 250)
    //

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if(grid[j][i]>0)
            {
                var pos = {
                    x: j * unit - (size / 2 * unit + (size % 2 - 1) * unit/2),
                    y: unit / 2,
                    z: i * -unit + (size / 2 * unit + (size % 2 - 1) * unit/2)
                }
                var mesh = new THREE.Mesh(blocks[grid[j][i]][2], materials[grid[j][i]]);
                mesh.name = blocks[grid[j][i]][0];
                mesh.position.x = pos.x;
                mesh.position.z = pos.z;
                mesh.position.y = pos.y;
                mesh.castShadow = true;
                if (grid[j][i] == 2)
                {
                    mesh.position.y = unit - unit / 20 ;
                    pos.y = unit ;
                    container.add(new MyLight("light", 0xffff00, pos).getLight())
                }
                container.add(mesh);
            }
        }
    }
   game.scene.add(container)
}