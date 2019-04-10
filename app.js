let runWorkTimer = 0;
let runBreakTimer = 0;
let workDuration = 25 * 60;
let breakDuration = 1 * 60;
let minutes;
let seconds;

const display = document.querySelector('#clock');
const startWork = document.querySelector('#timer-btn');
const startBreak = document.querySelector('#break-btn');

let pomodoroWorkTimer = function(){
  minutes = parseInt(workDuration/60);
  seconds = parseInt(workDuration % 60);
  workDuration -= 1;
  console.log(minutes + ":" + seconds);
}

let pomodoroBreakTimer = function(){
  minutes = parseInt(breakDuration/60);
  seconds = parseInt(breakDuration % 60);
  breakDuration -= 1;
  console.log(minutes + ":" + seconds);
  display.innerHTML = minutes + ":" + seconds;
  if(breakDuration < 0){
    clearInterval(runBreakTimer);
    if(breakDuration == -1){
      //probably a hack-y reset
      breakDuration = 1 * 60;
    }
  }
}

// runWorkTimer = setInterval(pomodoroWorkTimer, 5000, workDuration, display);

// runBreakTimer = setInterval(pomodoroBreakTimer, 1000, breakDuration, display);

startWork.addEventListener('click', function(){
  clearInterval(runWorkTimer);
  runWorkTimer = setInterval(pomodoroWorkTimer, 1000, display);
});

startBreak.addEventListener('click', function(){
  clearInterval(pomodoroBreakTimer);
  runBreakTimer = setInterval(pomodoroBreakTimer, 10, display);
  
});

//This works but i want to make the function pluggable, so i can have a const runWorkTimer and runBreakTimer
// let runTimer = setInterval(function() {
//   let time = duration;
//   console.log('I am displaying generally');
//   console.log(time);
// }, 500, duration, display);

//!!!! win: figured out how to pass the duration for set interval to the internal function. But i'm not sure if it's regularly running.

//!!!!win : got the break button to run and stop at zero;

//clearInterval(runTimer);
// let countdown = 0; 
// let seconds = 1500; 
// let workTime = 25;
// let breakTime = 5;
// let isBreak = true;

// const timerDisplay = document.querySelector("#clock");
// const startBtn = document.querySelector("#timer-btn");
// const breakBtn = document.querySelector("#break-btn");

// startBtn.addEventListener('click', () => {
//   clearInterval(countdown);
//   countdown = setInterval(timer, 1000);
// });

// breakBtn.addEventListener('click', () => {
//     clearInterval(countdown);
//     seconds = breakTime * 60;
//     countdown = 0;
//     isBreak = true;
//     countdown = setInterval(timer, 1000);
//   });

// /* TIMER - HANDLES COUNTDOWN */
// function timer() {
//   seconds --;
//   if (seconds < 0) {
//     clearInterval(countdown);
//     seconds = (isBreak ? breakTime : workTime) * 60;
//     isBreak = !isBreak;
//     countdown = setInterval(timer, 1000);
//   }
// }

// /* UPDATE HTML CONTENT */
// function countdownDisplay() {
//   let minutes = parseInt(seconds / 60, 10);
//   let remainderSeconds = parseInt(seconds % 60, 10);
//   timerDisplay.textContent = `${minutes}:${remainderSeconds}`;
// }

// function updateHTML() {
//   countdownDisplay();
//   isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!"; 
// }

// window.setInterval(updateHTML, 100);

// document.onclick = updateHTML;