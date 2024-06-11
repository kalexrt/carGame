import './style.css';

import { getRandomInt, clamp } from './utils/common';
import { DIMENSIONS, SPEED } from './constants';

import Point from './shapes/Point';
import Rectangle from './shapes/Rectangle';

import cars from './assets/cars.jpg';
const carImage = new Image();
carImage.src = cars;


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

let gameSpeed = 1;

const player1 = new Rectangle(40, 80, new Point(300, DIMENSIONS.CANVAS_HEIGHT - 100));


function generateEnemyArray(): Rectangle[]{
  const enemy: Rectangle[] = [];
  for(let i:number=0; i<3;i++){
    enemy[i] = new Rectangle(40, 80, new Point(100 + (200 * i), getRandomInt(-600,0)));
  }
  return enemy;
}

const enemyArray = generateEnemyArray();



function generateRoadArray(): Rectangle[] {
  const road: Rectangle[] = [];
  for (let i: number = 0; i < 14; i++) {
    road[i] = new Rectangle(20,50, new Point(180, -50 + (i * 54)));
    road[i+1] = new Rectangle(20,50, new Point(420, -50 + (i * 54)));
    i += 1;
  }
  return road;
}

const roadArray = generateRoadArray();


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
function drawEnemy(enemy:Rectangle){
  ctx.beginPath();
    ctx.drawImage(
      carImage,
      215,
      390,
      122,
      258,
      enemy.center.x - 20,
      enemy.center.y,
      40,
      80
    );
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = '#9c9c9c';
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  roadArray.forEach((road)=>{
    ctx.beginPath();
    ctx.fillStyle = '#fff'
    ctx.fillRect(road.center.x - 5, road.center.y, road.width,road.height)
    ctx.stroke();
    road.center.y += clamp(SPEED * gameSpeed, 0, 22);
    if (road.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      road.center.y = -50;
    }
  })

  enemyArray.forEach((enemy) => {
    drawEnemy(enemy);
    enemy.center.y += clamp(SPEED * gameSpeed, 0, 22);
    if (enemy.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      enemy.center.y = getRandomInt(-600, 0);
    }
  });

  drawPlayer();
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener('keypress', (event) => {
  switch (event.key) {
    case 'a': {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          player1.center.x -= 2;
        }, i * 4); // Each iteration will run 10 milliseconds after the previous one
      }
      break;
    }
    case 'd': {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          player1.center.x += 2;
        }, i * 4); // Each iteration will run 10 milliseconds after the previous one
      }
      break;
    }
  }
});
