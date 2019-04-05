//MVP : the basic pomodoro timer which will countdown from 25 mins and 5mins, every 4 sessions 
//take a longer break - 20 mins.

//TO DO: on click, begin counting down from 25 :100:
//switch to counting down from 5
//count the amount of times the 25 minute function has run

const button = document.getElementById('timer-btn');
const display = document.getElementById('clock');

let timer = duration;
let countdown = 0; // variable to set/clear intervals
let minutes;
    let seconds;
let isBreak = true;
let isPaused = true;

pomoTimer = (duration, display) => {
    

    function runTimer(){
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds ;
        
    }

    setInterval( timer, 50);
};

button.addEventListener('click', function(){
    var OneMinute = 60 * 1;
    var fiveMinute = 60 * 5;
    pomoTimer(OneMinute, display);
});

         //This is not quite the conditional operator below, and i want to figure out what the difference is. 
    // if(minutes < 10){
    //     "0" + minutes;
    // } else {
    //     return minutes;
    // }

    // if(seconds < 10){
    //     "0" + seconds;
    // } else {
    //     return seconds;
    // }

    let seconds = 1500; // seconds left on the clock
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* TIMER - HANDLES COUNTDOWN */
function timer() {
    timer --;
    if (timer < 0) {
        //Figured out my issue!! The reason the timer kept resetting is that the timer reset to duration i believe.
        timer = duration;
        clearInterval(countdown);
        countdown = setInterval(timer, 1000);
    }
}


const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
})

/* TIMER - HANDLES COUNTDOWN */
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
}

 
/* UPDATE WORK AND BREAK TIMES */
let increment = 5;

let incrementFunctions =
    {"#work-plus": function () { workTime = Math.min(workTime + increment, 60)},
     "#work-minus": function () { workTime = Math.max(workTime - increment, 5)},
     "#break-plus": function () { breakTime = Math.min(breakTime + increment, 60)},
     "#break-minus": function () { breakTime = Math.max(breakTime - increment, 5)}};

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
}

/* UPDATE HTML CONTENT */
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue"; 
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;  
}

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;