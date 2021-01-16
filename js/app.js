// 1.25 seconds in Miller's planet is equivalent to 1 day in Earth

var premiere = luxon.DateTime.local(2014, 10, 26, 0, 0);
var ratio = 69120.0;
var music = true;

var interval = setInterval(renderTime, 69120000);

function renderTime() {
    let now = luxon.DateTime.local();

    let diff = now.diff(premiere, 'seconds');

    let earth_seconds = diff.seconds;
    let miller_seconds = diff.seconds / ratio;

    let days = parseInt(miller_seconds / 86400);
    miller_seconds = miller_seconds % 86400;
    let hours = parseInt(miller_seconds / 3600);
    miller_seconds = miller_seconds % 3600;
    let minutes = parseInt(miller_seconds / 60);
    let seconds = parseInt(miller_seconds % 60);

    console.log(days, hours, minutes, seconds);

    let time_str = "";

    if(days != 0) {
      time_str += days + " día";
      if(days != 1) time_str += "s";
    }
    if(hours != 0) {
      time_str += " " + hours + " hora";
      if(hours != 1) time_str += "s";
    }
    if(minutes != 0) {
      time_str += " " + minutes + " minuto";
      if(minutes != 1) time_str += "s";
    }
    if(seconds != 0) {
      time_str += " " + seconds + " segundo";
      if(seconds != 1) time_str += "s";
    }

    document.getElementById("time").innerHTML = time_str;
}

function playSoundtrack() {
    if(music) music = false;
    else music = true;

    let soundtrack = document.getElementById('soundtrack');

    if(music) soundtrack.play();
    else soundtrack.pause();
}

function renderRandomPhrase() {
    let randomIndex = Math.floor(Math.random() * data.length);

    document.getElementById('phrase').innerHTML = data[randomIndex].body;
    document.getElementById('author').innerHTML = data[randomIndex].author;
}

function takeSnapshot() {
    let downloader = document.getElementById('imageDownloader');
    downloader.setAttribute('download', 'miller_time.png');

    tmpWidth = document.body.style.width;
    tmpHeight = document.body.style.height;

    document.body.style.width = '600px';
    document.body.style.height = '750px';
    document.getElementById('credits').hidden = false;

    html2canvas(document.body, {
        width: 600,
        height: 750,
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
