var btn = document.querySelector('button');
var box = document.querySelector('#box');
var gameover = document.querySelector('#gameover');
var score = document.querySelector('#score');
var hit = document.querySelector('#hit');
var bubbles = document.querySelector('#bubbles');
var timer = document.querySelector('#timer');
var finalScore = document.querySelector('#gameover h2');
var HgtScore = document.querySelector('#gameover h3');
var intrvl;
var scoreOfGame;
var finalScore;

function updateScore(totScore){
    localStorage.setItem('Score', JSON.stringify(totScore));
}

function getScore(){
    return JSON.parse(localStorage.getItem('Score'));
}

function game() {
    scoreOfGame = 0;
    var timeOfGame = 60;
    var every5Sec = 0;
    var secArr = [10, 20, 30, 40, 50];
    var arrOfBubble = [1];

    intrvl = setInterval(function () {
        if (timeOfGame >= 0) {
            timer.textContent = timeOfGame;
            timeOfGame--;
        }
        else if (timeOfGame < 0) {
            box.style.display = "none";
            gameover.style.display = "initial";

            if(getScore() === null){
                updateScore(scoreOfGame);
            }
            else{
                if(getScore() < scoreOfGame){
                    updateScore(scoreOfGame);
                }
            }

            HgtScore.textContent = `Highest Score - ${getScore()}`;
            finalScore.textContent = `Your Score - ${scoreOfGame}`;
        }

        if (secArr.indexOf(every5Sec) != -1) {
            arrOfBubble = new Array();
            initilize();
        }

        every5Sec += 1;
    }, 1000);

    function initilize() {
        var temp = ``;

        for (var i = 1; i <= 65; i++) {
            var num = parseInt(Math.random() * 100);
            arrOfBubble.push(num);
            temp = temp + `<div class="bubble" id = "${num}">${num}</div>`;
        }

        // console.log(arrOfBubble[3]);
        hit.textContent = arrOfBubble[parseInt(Math.random() * 65)];
        bubbles.innerHTML = temp;
    }

    bubbles.addEventListener('click', function (dts) {
        if (Number(hit.textContent) === Number(dts.target.id)) {
            scoreOfGame += 10;
            score.textContent = scoreOfGame;
            initilize();
        }
        else if ((dts.target.id) != "bubbles") {
            initilize();
        }

        // console.log(Number(hit.textContent));
        // console.log((dts.target.id));
    });

    initilize();
}

btn.addEventListener('click', function () {
    scoreOfGame = 0;
    box.style.display = "initial";
    gameover.style.display = "none";
    clearInterval(intrvl);
    score.textContent = "0";
    game();
    btn.textContent = "Restart Game";
});