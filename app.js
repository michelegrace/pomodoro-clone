let runWorkTimer = 0;
let runBreakTimer = 0;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let longBreakDuration = 20 * 60;
let timesWorkTimerRan = 0;
let minutes;
let seconds;

const display = document.querySelector('#clock');
const startWork = document.querySelector('#timer-btn');
const startBreak = document.querySelector('#break-btn');
const startLongBreak = document.querySelector('#long-break-btn');
const alarmBell = new Audio('glass_ping.mp3');

let controlTimer = (duration)=>{
    minutes = parseInt(duration/60);
    seconds = parseInt(duration % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
}

let workTimer = function(){
    controlTimer(workDuration);
    workDuration -= 1;
    display.innerHTML = minutes + ":" + seconds;

  if (workDuration < 0) {
    clearInterval(runWorkTimer);
    if (workDuration == -1) {
      alarmBell.play();
        workDuration = 25 * 60;
        startBreak.disabled = false;
        startLongBreak.disabled = false;
    }
  }
}

let shortBreakTimer = function(){
    controlTimer(breakDuration);
    breakDuration -= 1;
    display.innerHTML = minutes + ":" + seconds;

  if (breakDuration < 0){
    clearInterval(runBreakTimer);
    if (breakDuration == -1){
      alarmBell.play();
        breakDuration = 5 * 60;
        startWork.disabled = false;
    }
  }
}

let longBreakTimer = function(){
    controlTimer(longBreakDuration);

    longBreakDuration -= 1;
    display.innerHTML = minutes + ":" + seconds;

  if(longBreakTimer < 0) {
    clearInterval(runLongBreakTimer);
    if(longBreakDuration == -1){
      longBreakDuration = 20 * 60;
      startWork.disabled = false;
    }
  }
}

startWork.addEventListener('click', function(){
    clearInterval(runWorkTimer);
    timesWorkTimerRan ++;
      if (timesWorkTimerRan % 4 == 0) {
        startLongBreak.classList.remove('btn-hidden');
        startBreak.classList.add('btn-hidden');  
      } else {
        startBreak.classList.remove('btn-hidden');
        startLongBreak.classList.add('btn-hidden');
      }
  startBreak.disabled = true;
  startLongBreak.disabled = true;
  runWorkTimer = setInterval(workTimer, 1000, display);
});

startBreak.addEventListener('click', function(){
  clearInterval(runBreakTimer);
  startWork.disabled = true;
  runBreakTimer = setInterval(shortBreakTimer, 1000, display);
});

startLongBreak.addEventListener('click', function(){
  clearInterval(runLongBreakTimer);
  startWork.disabled = true;
  runLongBreakTimer = setInterval(longBreakTimer, 1000, display);
})