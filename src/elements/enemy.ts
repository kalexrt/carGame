import Rectangle from "../shapes/Rectangle";
import Point from "../shapes/Point";
import { clamp,getRandomInt } from "../utils/common";
import { DIMENSIONS, SPEED } from "../constants";
import { gameSpeed } from "../main";
import { ctx } from "../main";
import { carImage } from "../constants";

export function generateEnemyArray(): Rectangle[]{
    const enemy: Rectangle[] = [];
    for(let i:number=0; i<3;i++){
      enemy[i] = new Rectangle(40, 80, new Point(100 + (200 * i), getRandomInt(-600,0)));
    }
    return enemy;
  }

export function drawEnemy(enemy:Rectangle){
ctx.beginPath();
    ctx.drawImage(
    carImage,
    215,
    390,
    122,
    258,
    enemy.center.x - 20,
    enemy.center.y - 35,
    40,
    80
    );
}

export function updateEnemy(enemy:Rectangle){
    enemy.center.y += clamp(SPEED * gameSpeed, 0, 22);
    if (enemy.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      enemy.center.y = getRandomInt(-600, 0);
    }
}