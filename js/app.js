var premiere = luxon.DateTime.local(2014, 10, 26, 0, 0);
/* 1.25 seconds in Miller is equal to 1 day in Earth, because for each tic-tac that happens 
in the soundtrack one day in Earth elapses. So,

1.25 sec in Miller = 86400 sec in Earth

ratio = 86400 sec / 1.25 sec 

Let me know if you find something wrong with this.
*/
var ratio = 69120.0;
var music = false;

var interval = setInterval(renderTime, 69120000);

function renderTime() {
    let now = luxon.DateTime.local();

    let diff = now.diff(premiere, 'seconds');

    let miller_seconds = diff.seconds / ratio;

    let days = parseInt(miller_seconds / 86400);
    miller_seconds = miller_seconds % 86400;
    let hours = parseInt(miller_seconds / 3600);
    miller_seconds = miller_seconds % 3600;
    let minutes = parseInt(miller_seconds / 60);
    let seconds = parseInt(miller_seconds % 60);

    // console.log(miller_seconds / 60)
    // console.log(days, hours, minutes, seconds);

    let timeStr = "";
    let timeUnits = translations[language]["time"]["units"];

    if(days != 0) {
        timeStr += days + " " + timeUnits["day"];
        if(days != 1) timeStr += "s";
    }
    if(hours != 0) {
        timeStr += " " + hours + " " + timeUnits["hour"];
        if(hours != 1) timeStr += "s";
    }
    if(minutes != 0) {
        timeStr += " " + minutes + " " + timeUnits["minute"];
        if(minutes != 1) timeStr += "s";
    }
    if(seconds != 0) {
        timeStr += " " + seconds + " " + timeUnits["second"];
        if(seconds != 1) timeStr += "s";
    }

    document.getElementById("time").innerHTML = timeStr;
}

function playSoundtrack() {
    if(music) music = false;
    else music = true;

    let soundtrack = document.getElementById('soundtrack');

    if(music) soundtrack.play();
    else soundtrack.pause();
}

function renderRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes[language].length);

    document.getElementById('phrase').innerHTML = quotes[language][randomIndex].body;
    document.getElementById('author').innerHTML = quotes[language][randomIndex].author;
}

function takeSnapshot() {
    let downloader = document.getElementById('imageDownloader');
    const d = new Date().toLocaleDateString()
    let filename = d + "_miller_time.png"
    downloader.setAttribute('download', filename);

    tmpWidth = document.body.style.width;
    tmpHeight = document.body.style.height;

    document.body.style.width = '600px';
    document.body.style.height = '750px';
    document.getElementById('credits').hidden = false;
    document.getElementById("mainTitle").style.backgroundColor = "#2a5f82";

    html2canvas(document.body, {
        width: 600,
        height: 740,
        ignoreElements: function(element) {
            if('btnSnapshot' == element.id ) {
                return true;
            }

            if('footer' == element.id) {
                return true;
            }
        }
    }).then(function(canvas) {
        document.body.style.width = tmpWidth;
        document.body.style.height = tmpHeight;
        document.getElementById('credits').hidden = true;

        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloader.setAttribute('href', image);
        downloader.click();
    });
}
