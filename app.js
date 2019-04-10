let runWorkTimer = 0;
let runBreakTimer = 0;
let workDuration = 1 * 60;
let breakDuration = 1 * 60;
let minutes;
let seconds;

const display = document.querySelector('#clock');
const startWork = document.querySelector('#timer-btn');
const startBreak = document.querySelector('#break-btn');

const body = document.querySelector('body');

let pomodoroWorkTimer = function(){
  clearInterval(runBreakTimer);
  minutes = parseInt(workDuration / 60);
  seconds = parseInt(workDuration % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  body.className="test";

  workDuration -= 1;
  display.innerHTML = minutes + ":" + seconds;

  if (workDuration < 0) {
    clearInterval(runWorkTimer);
    if (workDuration == -1) {
      workDuration = 25 * 60;
      startBreak.disabled = false;
    }
  }
}

let pomodoroBreakTimer = function(){
  clearInterval(runWorkTimer);
  minutes = parseInt(breakDuration/60);
  seconds = parseInt(breakDuration % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  breakDuration -= 1;
  display.innerHTML = minutes + ":" + seconds;

  if(breakDuration < 0){
    clearInterval(runBreakTimer);
    if(breakDuration == -1){
      //probably a hack-y reset
      breakDuration = 1 * 60;
      startWork.disabled = false;
    }
  }
}

startWork.addEventListener('click', function(){
  clearInterval(runWorkTimer);
  startBreak.disabled = true;
  runWorkTimer = setInterval(pomodoroWorkTimer, 1000, display);
});

startBreak.addEventListener('click', function(){
  clearInterval(pomodoroBreakTimer);
  startWork.disabled = true;
  runBreakTimer = setInterval(pomodoroBreakTimer, 1000, display);
});