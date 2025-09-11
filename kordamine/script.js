
x = 0;
y = 0;
timeLeft = 10;
score = 0;
gameStarted = false;

const btn = document.getElementById('btn');
const startbtn = document.getElementById('startbtn');
const result = document.getElementById('result');

startbtn.addEventListener('click', function() {
    if (gameStarted) return;

    gameStarted = true;
    score = 0;
    timeLeft = 10;
    result.textContent = `Aeg: ${timeLeft} sekundit, Skoor: ${score}`;

    const timer = setInterval(function() {
        timeLeft--;
        result.textContent = `Aeg: ${timeLeft} sekundit, Skoor: ${score}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameStarted = false;
            result.textContent = `Score ${score}`;
            btn.disabled = true; 
        }
    }, 1000); 

    btn.disabled = false; 
});


btn.addEventListener('click', function(event) {
    if (!gameStarted) return;
    score++;

    x += (Math.random() * 241) - 100;
    y += (Math.random() * 241) - 100;
    

    console.log('Nuppu vajutati');
    btn.style.left = x + 'px'
    btn.style.top = y + 'px'
    btn.textContent = 'OOOO'
});
