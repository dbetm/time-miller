// 1.25 seconds in Miller's planet is equivalent to 1 day in Earth

var premiere = luxon.DateTime.local(2014, 10, 26, 0, 0);
var ratio = 69120.0;
var music = false;

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

    if(music) soundtrack.muted = false;
    else soundtrack.muted = true;
}