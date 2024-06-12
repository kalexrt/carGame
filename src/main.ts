import './style.css';
import Rectangle from './shapes/Rectangle';
import Point from './shapes/Point';
import { DIMENSIONS } from './constants';
import { drawBackground } from './elements/background';
import { drawPlayer, player1 } from './elements/player';
import { generateRoadArray, drawRoad, updateRoad } from './elements/road';
import { generateEnemyArray, drawEnemy, updateEnemy } from './elements/enemy';
import { drawScore } from './elements/score';
import { detectCollision } from './utils/collision';
import { hasPassed } from './elements/enemy';
import { bullets, drawBullet, updateBullet } from './elements/bullet';
import { setHighScore,getHighScore } from './elements/score';
export let gameSpeed = 1;
export let mainLoop: any;
export let isGameOver = false;
export let score = 0;
let maxBullets:number = 6;

// Event listener for space to add bullets into the array
window.addEventListener('keypress', (event) => {
  if(event.key === ' '){
    maxBullets -= 1;
    if(maxBullets > 0){
      bullets.push(new Rectangle(3,8, new Point(player1.center.x, player1.center.y - 40)));
    }
  }
});

const enemyArray = generateEnemyArray();
const roadArray = generateRoadArray();
const menu = document.querySelector<HTMLDivElement>('#menu')!;
const startButton = document.querySelector('#startButton')!;
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

//game over function
function gameOver(){
  setHighScore(score);

  let highScore = `The highscore is ${getHighScore()}!!`;
  ctx.font = `36px Arial`;
  ctx.fillStyle = 'red';  
  ctx.textAlign = 'center';

  const gameOverText = 'Game Over';
  const scoreText = `Youe score is ${score}`;
  const restartText = 'Press R to Restart';
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.fillText(gameOverText, textX, textY - 100);
  ctx.fillText(scoreText, textX, textY + 100);
  ctx.fillText(highScore,textX, textY + 150)
  ctx.fillText(restartText, textX, textY + 200 )

  cancelAnimationFrame(mainLoop);
  isGameOver = true;
}


function draw() {

  if (isGameOver) return;

  drawBackground();

  //generate and move road
  roadArray.forEach((road)=>{
    drawRoad(road);
    updateRoad(road);
  })

  //generate and move enemy
  enemyArray.forEach((enemy) => {
    drawEnemy(enemy);
    updateEnemy(enemy);
    if(hasPassed) score += 1;
  });

  //generate player
  drawPlayer();

  // check enemy collision
  enemyArray.forEach(enemy => {
    if (detectCollision(enemy, player1)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOver();
    }
  });

  // display score
  drawScore(ctx);


  bullets.forEach(bullet => {
    drawBullet(bullet);
    updateBullet(bullet);

    if(detectCollision(enemyArray[0],bullet)){
      enemyArray[0].center.y = -800;
    }
    if(detectCollision(enemyArray[1],bullet)){
      enemyArray[1].center.y = -800;
    }
    if(detectCollision(enemyArray[2],bullet)){
      enemyArray[2].center.y = -800;
    }
  })

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
    case 'r':{
      if (isGameOver) {
        location.reload();
      }
      break;
    }
  }
});