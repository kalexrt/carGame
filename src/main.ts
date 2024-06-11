import './style.css';

import { DIMENSIONS } from './constants';
import { drawBackground } from './elements/background';
import { drawPlayer, player1 } from './elements/player';
import { generateRoadArray, drawRoad, updateRoad } from './elements/road';
import { generateEnemyArray, drawEnemy, updateEnemy } from './elements/enemy';
import { drawScore } from './elements/score';
import { detectCollision } from './utils/collision';
import { hasPassed } from './elements/enemy';
export let gameSpeed = 1;
export let mainLoop: any;
export let isGameOver = false;
export let score = 0;


const enemyArray = generateEnemyArray();
const roadArray = generateRoadArray();
const menu = document.querySelector<HTMLDivElement>('#menu')!;
const startButton = document.querySelector('#startButton')!;
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

function gameOver(){
  ctx.font = `36px Arial`;
  ctx.fillStyle = 'red';  
  ctx.textAlign = 'center';

  const gameOverText = 'Game Over';
  const scoreText = `${score}`;
  const restartText = 'Press R to Restart';
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.fillText(gameOverText, textX, textY - 100);
  ctx.fillText(scoreText, textX, textY + 100);
  ctx.fillText(restartText, textX, textY + 200 )

  cancelAnimationFrame(mainLoop);
  isGameOver = true;
}


function draw() {
  if (isGameOver) return;

  drawBackground();

  roadArray.forEach((road)=>{
    drawRoad(road);
    updateRoad(road);
  })

  enemyArray.forEach((enemy) => {
    drawEnemy(enemy);
    updateEnemy(enemy);
    if(hasPassed) score += 1;
  });

  drawPlayer();

  enemyArray.forEach(enemy => {
    if (detectCollision(enemy, player1)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOver();
    }
  });

  drawScore(ctx);

  mainLoop = requestAnimationFrame(draw);
  gameSpeed *= 1.0005; //accelerate by 0.5% every frame
}

//start game section
function startGame(){
  //reset to initial
  isGameOver = false; 
  score = 0; 
  gameSpeed = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
}

// start button
startButton.addEventListener('click', ()=>{
  menu.style.display = 'none';
  canvas.style.display = 'initial';
  startGame();
});

//player movement
window.addEventListener('keypress', (event) => {
  switch (event.key) {
    case 'a': {
      if(player1.center.x != 300 && player1.center.x != 500){
        break;
      }
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          player1.center.x -= 2;
        }, i * 4); 
      }
      break;
    }
    case 'd': {
      if(player1.center.x != 100 && player1.center.x != 300){
        break;
      }
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          player1.center.x += 2;
        }, i * 4); 
      }
      break;
    }
  }
});

window.addEventListener('keydown', (event)=>{
  if (event.key === 'r') {
    if (isGameOver) {
      location.reload();
    }
  }
});