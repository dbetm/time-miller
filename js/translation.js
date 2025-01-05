const SPANISH = "es"
const ENGLISH = "en"

// The language by default is English
var language = getLocalStorageItem("lang", ENGLISH);

var translations = {
    "es": {
        "title": "Planeta Miller",
        "header": {
            "title": "⏳ INTERESTELAR 🌽",
        },
        "time": {
            "preText": "Han pasado aproximadamente",
            "afterText": "en el planeta Miller desde el estreno de la película en 2014",
            "units": {
                "day": "día",
                "hour": "hora",
                "minute": "minuto",
                "second": "segundo"
            },
            "timeToWatchMovie": 'faltan <span id="remainingDaysToWatch">X</span> días para que Miller haya tenido tiempo suficiente para mirar la película'
        },
        "buttons": {
            "capture": "screenshot",
            "playMusic": "música"
        },
        "footer": {
            "refMusic": "Música: First step",
            "refContribute": "Contribuye en GitHub +)"
        }
    },
    "en": {
        "title": "Miller's Planet",
        "header": {
            "title": "⏳ INTERSTELLAR 🌽",
        },
        "time": {
            "preText": "It has been around",
            "afterText": "in Miller's planet since the movie was premiered in 2014",
            "units": {
                "day": "day",
                "hour": "hour",
                "minute": "minute",
                "second": "second"
            },
            "timeToWatchMovie": '<span id="remainingDaysToWatch">X</span> earth-days left for Miller to have had enough time to watch it'
        },
        "buttons": {
            "capture": "screenshot",
            "playMusic": "music"
        },
        "footer": {
            "refMusic": "Music: First step",
            "refContribute": "Contribute on GitHub +)"
        }
    }
};


function switchLang() {
    if(language == ENGLISH) language = SPANISH;
    else language = ENGLISH;

    localStorage.setItem("lang", language);

    renderTextTranslated();
    renderTime();
    renderRandomQuote();
}

function renderLangSwitcher() {
    if(language == SPANISH) {
        document.getElementById("switchLang").checked = true;
    }
}


function renderTextTranslated() {
    let dataByLang = translations[language];

    /* DOCUMENT VALUES */
    // set meta lang tag
    document.documentElement.lang = language;
    // set title
    document.title = dataByLang["title"];

    /* HEADER */
    // title
    document.getElementById("mainTitle").innerHTML = dataByLang["header"]["title"];

    /* TEXT ENCLOSING THE TIME PASSED */
    // pre text after the time passed
    document.getElementById("preTextTime").innerHTML = dataByLang["time"]["preText"];
    // post text after the time passed
    document.getElementById("afterTextTime").innerHTML = dataByLang["time"]["afterText"];
    // days left for Miller to watch Interstellar
    document.getElementById("timeToWatchInterstellar").innerHTML = (
        dataByLang["time"]["timeToWatchMovie"]
    );
    renderTimeLeftForMillerToWatchMovie();

    /* CONTROL BUTTONS */
    // set button values
    document.getElementById("btnGenSnapshot").value = dataByLang["buttons"]["capture"];
    document.getElementById("btnPlayMusic").value = dataByLang["buttons"]["playMusic"];

    /* FOOTER */
    // Music credits
    document.getElementById("refMusic").innerHTML = dataByLang["footer"]["refMusic"];
    // Contribution
    document.getElementById("refContribute").innerHTML = dataByLang["footer"]["refContribute"];
}
