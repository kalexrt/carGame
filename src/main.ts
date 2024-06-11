import './style.css';
import { carImage } from './constants';
import { DIMENSIONS } from './constants';

import Point from './shapes/Point';
import Rectangle from './shapes/Rectangle';

import { generateRoadArray, drawRoad, updateRoad } from './elements/road';
import { generateEnemyArray, drawEnemy, updateEnemy } from './elements/enemy';

export let gameSpeed = 1;

let mainLoop: any;
let isGameOver = false;
let score = 0;

const enemyArray = generateEnemyArray();
const roadArray = generateRoadArray();
const menu = document.querySelector<HTMLDivElement>('#menu')!;
const startButton = document.querySelector('#startButton')!;
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;


const player1 = new Rectangle(40, 80, new Point(300, DIMENSIONS.CANVAS_HEIGHT - 100));

function gameOver(){
  ctx.font = `72px Arial`;
  ctx.fillStyle = 'red';  
  ctx.textAlign = 'center';
  // ctx.textBaseline = 'middle';

  const gameOverText = 'Game Over';
  const scoreText = `${score}`;
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.fillText(gameOverText, textX, textY);
  ctx.fillText(scoreText, textX, textY + 300);

  cancelAnimationFrame(mainLoop);
  isGameOver = true;
}

function drawScore(ctx: CanvasRenderingContext2D) {
  ctx.font = "20px Arial"; // Set font size and family
  ctx.fillStyle = "black"; // Set font color
  ctx.fillText("Score: " + score, 60, 30); // Draw the score at position (10, 30)
}

function drawBackground(){
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = '#9c9c9c';
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

}

function drawPlayer(){
  ctx.beginPath();
  ctx.drawImage(
    carImage,
    215,
    120,
    122,
    258,
    player1.center.x - 20,
    player1.center.y - 40,
    40,
    80
  );
}

//collision
function detectCollision(firstObj:Rectangle, secondObj:Rectangle){
    let firstLeft = firstObj.center.x - firstObj.width / 2;
    let firstRight = firstObj.center.x + firstObj.width / 2;
    let firstTop = firstObj.center.y - (firstObj.height / 2);
    let firstBottom = firstObj.center.y + (firstObj.height / 2);

    let secondLeft = secondObj.center.x - secondObj.width / 2;
    let secondRight = secondObj.center.x + secondObj.width / 2;
    let secondTop = secondObj.center.y - (secondObj.height / 2);
    let secondBottom = secondObj.center.y + (secondObj.height / 2);

    return !(firstLeft > secondRight || 
             firstRight < secondLeft || 
             firstTop > secondBottom || 
             firstBottom < secondTop);
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
  });

  drawPlayer();

  enemyArray.forEach(enemy => {
    if (detectCollision(enemy, player1)) {
        console.log(enemy,player1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOver();
    }
  });

  drawScore(ctx);

  mainLoop = requestAnimationFrame(draw);
  gameSpeed *= 1.0005;
  score += 1;

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