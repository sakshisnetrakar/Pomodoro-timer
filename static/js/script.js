let workTime = 25 * 60; // 25 minutes in seconds
let shortBreakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 15 * 60; // 15 minutes in seconds
let timer = workTime;
let interval;
let pomodoroCount = 0;
const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionInfo = document.getElementById("session-info");
const beepSound = new Audio('/static/audio/beep-sound.wav');

function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            clearInterval(interval);
            beepSound.play();
            handleSessionEnd();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    beepSound.pause();
    beepSound.currentTime = 0;
    pomodoroCount = 0;
    sessionInfo.textContent = "";
    startStopBtn.textContent = "Start";
    timer = workTime; // Reset to work time
    updateTimerDisplay();
}

function handleSessionEnd() {
    pomodoroCount++;
    showAlert();

    if (pomodoroCount % 8 === 0) {
        // After four pomodoros, take a long break
        timer = longBreakTime; // Long break
        sessionInfo.textContent = "Long Break!";
        updateTimerDisplay();
        handleLongBreak();
    } else if (pomodoroCount % 2 === 0) {
        // After short break (work time)
        timer = workTime; // Back to work
        sessionInfo.textContent = "Time to Work!";
    } else {
        // After work session (short break)
        timer = shortBreakTime; // Short break
        sessionInfo.textContent = "Short Break!";
    }

    updateTimerDisplay();
}

function showAlert() {
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert");

    if (pomodoroCount % 8 === 0) {
        // After four cycles (long break)
        alertBox.innerHTML = `
            <p>Heyyy, now you can take a long break!</p>
            <button id="stop-sound-btn">Stop Sound</button>
        `;
    } else if (pomodoroCount % 2 === 0) {
        // After short break (work time)
        alertBox.innerHTML = `
            <p>It's time to get back to work!</p>
            <button id="stop-sound-btn">Stop Sound</button>
        `;
    } else {
        // After work session (short break)
        alertBox.innerHTML = `
            <p>It's time for a short break! Chill for 5 minutes.</p>
            <button id="stop-sound-btn">Stop Sound</button>
        `;
    }

    document.body.appendChild(alertBox);

    document.getElementById("stop-sound-btn").addEventListener("click", () => {
        beepSound.pause();
        beepSound.currentTime = 0;
        document.body.removeChild(alertBox);

        if (interval) startTimer(); // Automatically start the next session
    });
}

function handleLongBreak() {
    setTimeout(() => {
        // When 15 minutes long break is over, stop the timer and show the alert
        clearInterval(interval);
        beepSound.pause();
        beepSound.currentTime = 0;
        alert("Your 15-minute long break is over!");
        resetTimer();  // Reset timer after long break
    }, longBreakTime * 1000); // Wait for 15 minutes to elapse
}

startStopBtn.addEventListener("click", () => {
    if (!interval) {
        startStopBtn.textContent = "Stop";
        startTimer();
    } else {
        clearInterval(interval);
        interval = null;
        startStopBtn.textContent = "Start";
    }
});

resetBtn.addEventListener("click", () => {
    resetTimer();
});

updateTimerDisplay();
