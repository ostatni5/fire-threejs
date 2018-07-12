/// <reference path="Net.js" />
/// <reference path="Ui.js" />
/// <reference path="../libs/three.js" />
/// <reference path="Game.js" />
/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {

    document.getElementById("kamera")
                    .addEventListener("change", function () {
                        var opt = parseInt(this.value)
                        console.log(opt)
                        switch(opt)
                        {
                            case 0:
                                game.kamera(0, 400, -900);
                                break;
                            case 1:
                                game.kamera(0, 400, 900);
                                break;
                            case 3:
                                game.kamera(0, 2000, 0);
                                break;
                            case 2:
                                game.kamera(0, 0, 1000);
                                break;
                        }
                    })
}

