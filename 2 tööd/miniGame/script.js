const startBtn = document.getElementById("goBtn");

const catchBtn = document.getElementById("targetBtn");

const timerDisplay = document.getElementById("timeLeft");
const Area = document.getElementById("playfield");

const scoreDisplay = document.getElementById("points");

Area.classList.add("Area");       
catchBtn.classList.add("catchBtn"); 

let time = 20;
let score = 0;

startBtn.addEventListener("click", startTimer);

function startTimer() {
  time = 20;
  score = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = time;

  catchBtn.disabled = false; 
  startBtn.disabled = true;   

  const timerId = setInterval(() => {
    time--;
    timerDisplay.textContent = time;

    if (time === 0) {
      clearInterval(timerId);
      catchBtn.disabled = true;
      startBtn.disabled = false;
      alert("Time left! " + "Your score: " + score);
    }
  }, 1000);
}

function getAreaSize() {
  return { width: Area.clientWidth, height: Area.clientHeight };
}

catchBtn.addEventListener("click", catch_for_button);

function catch_for_button() {
  if (catchBtn.disabled) return;

  score++;
  scoreDisplay.textContent = score;

  const { width, height } = getAreaSize();

  let randomX = Math.floor(Math.random() * Math.max(1, (width  - catchBtn.offsetWidth)));
  let randomY = Math.floor(Math.random() * Math.max(1, (height - catchBtn.offsetHeight)));

  catchBtn.style.position = "absolute";
  catchBtn.style.left = randomX + "px";
  catchBtn.style.top  = randomY + "px";
}

let users = [];

async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    users = Array.isArray(data) ? data.map(user => user.name) : [];
    return users;
  } catch (error) {
    users = [];
    return [];
  }
}

loadUsers();

catchBtn.addEventListener("click", () => {
  if (users.length > 0) {
    const randomIndex = Math.floor(Math.random() * users.length);
    catchBtn.textContent = users[randomIndex];
  } else {
    catchBtn.textContent = "Loading";
  }
});
