// script.js
let score = 0;
let airplane;
let obstacle;
let gameInterval;
let obstacleInterval;
let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
  airplane = document.getElementById('airplane');
  obstacle = document.getElementById('obstacle');

  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp' && !isGameOver) {
      moveUp();
    }
  });
});

function startGame() {
  resetGame();
  document.getElementById('start-button').style.display = 'none';
  score = 0;
  updateScore();

  gameInterval = setInterval(() => {
    score++;
    updateScore();
  }, 100);

  obstacleInterval = setInterval(moveObstacle, 10);
}

function resetGame() {
  score = 0;
  isGameOver = false;
  airplane.style.bottom = '50px';
  obstacle.style.top = '0';
  obstacle.style.right = '-40px';
  document.getElementById('start-button').style.display = 'block';

  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
}

function updateScore() {
  document.getElementById('score').textContent = score;
}

function moveUp() {
  const bottom = parseInt(getComputedStyle(airplane).bottom);
  if (bottom < 460) {
    airplane.style.bottom = `${bottom + 20}px`;
  }
}

function moveObstacle() {
  const obstacleRight = parseInt(getComputedStyle(obstacle).right);
  if (obstacleRight >= 300) {
    obstacle.style.right = '-40px';
    obstacle.style.height = `${Math.random() * 300 + 100}px`;
  } else {
    obstacle.style.right = `${obstacleRight + 2}px`;
  }

  checkCollision();
}

function checkCollision() {
  const airplaneBottom = parseInt(getComputedStyle(airplane).bottom);
  const obstacleRight = parseInt(getComputedStyle(obstacle).right);
  const obstacleHeight = parseInt(getComputedStyle(obstacle).height);

  if (obstacleRight >= 240 && obstacleRight <= 280 && airplaneBottom <= obstacleHeight) {
    endGame();
  }
}

function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert(`Game Over! Your Score: ${score}`);
  resetGame();
}
