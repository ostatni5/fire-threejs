/*
    klasa obsługująca komunikację Ajax - em z serwerem
*/

function Net() {    
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    this.sendData = function (obj) {
        console.log("wysyłam dane Ajaxem z klasy Net na serwer")
        $.ajax({
            url: "http://localhost:3000",
            data: obj,
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)
                var el = document.getElementById("info")
                console.log(obj)
                switch (obj.akcja)
                {
                    case "dodano":
                        el.innerHTML = "Zalogowano na:" + obj.nick;
                        if (obj.gra == 1)
                        {
                            el.innerHTML += "   Grasz Białym"
                            game.sP();
                            game.kamera(0, 800, 1400);
                        }
                        else {
                            el.innerHTML += "  Grasz Czarnym"
                            game.sP();
                            game.kamera(0, 800, -1400);
                        }
                        document.getElementById("form").style.display = "none";
                        break;
                    case "juz_istnieje":
                        el.innerHTML = "Dany uzytkownik juz istnieje";
                        break;
                    case "za_duzo":
                        el.innerHTML = "Za duzo uzytkownikow";
                        break;
                    case "reset":
                        el.innerHTML = "Zresetowano";
                        break;
                }
                //tu wypisz sumę w div-ie na stronie

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
}

