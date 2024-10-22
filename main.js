const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const game = document.getElementById('game');
let isJumping = false;
let isGameOver = false;
let speed = 1;
let fastSpeed = 2;
let obstaclesPassed = 0;
const backgrounds = ['fundo1.png', 'fundo2.png', 'fundo3.png'];

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        isGameOver ? restartGame() : jump();
    } else if (event.code === 'ShiftLeft') {
        speed = fastSpeed;
        obstacle.style.animationDuration = `${2 / speed}s`;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ShiftLeft') {
        speed = 1;
        obstacle.style.animationDuration = `${2 / speed}s`;
    }
});

function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 140;
    let jumpDuration = 530;

    character.style.transition = `bottom ${jumpDuration}ms`;
    character.style.bottom = `${jumpHeight}px`;

    setTimeout(() => {
        character.style.bottom = '0px';
        setTimeout(() => { isJumping = false; }, jumpDuration);
    }, jumpDuration);
}

let obstacleMoveInterval = setInterval(() => {
    let characterRect = character.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top) {
        gameOver();
    } else if (obstacleRect.right <= 0) {
        obstaclesPassed++;
        changeBackground();
    }
}, 10);

function changeBackground() {
    let nextBackground = backgrounds[obstaclesPassed % backgrounds.length];
    game.style.backgroundImage = `url(${nextBackground})`;
}

function gameOver() {
    clearInterval(obstacleMoveInterval);
    obstacle.style.animationPlayState = 'paused';
    isGameOver = true;
}

function restartGame() {
    isGameOver = false;
    character.style.bottom = '0px';
    character.style.transition = '';
    obstacle.style.animationPlayState = 'running';
    obstaclesPassed = 0;
    game.style.backgroundImage = 'url(fundo1.png)';

    obstacleMoveInterval = setInterval(() => {
        let characterRect = character.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (characterRect.right > obstacleRect.left &&
            characterRect.left < obstacleRect.right &&
            characterRect.bottom > obstacleRect.top) {
            gameOver();
        } else if (obstacleRect.right <= 0) {
            obstaclesPassed++;
            changeBackground();
        }
    }, 10);
}
