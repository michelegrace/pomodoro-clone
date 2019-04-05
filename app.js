const button = document.getElementById('timer-btn');
const display = document.getElementById('clock');
const body = document.getElementById('main');
let oneMin = 60 * 1; //60 * minAmount;

let timer = oneMin;
let minutes;
let seconds;

function runTimer(){
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
            timer = 0;
            clearInterval(countdown);
            body.style.backgroundImage = "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)";
            button.textContent = "Begin Break";
    } 
}

button.addEventListener('click', function(){
    clearInterval(runTimer);
    countdown = setInterval(runTimer, 50);
});


//TO DO: Countdown from 25
//Change for break time
//TO DO: Countdown from 5;

