import Rectangle from "../shapes/Rectangle";
import Point from "../shapes/Point";
import { clamp } from "../utils/common";
import { DIMENSIONS, SPEED } from "../constants";
import { gameSpeed } from "../main";
import { ctx } from "../main";

export function generateRoadArray(): Rectangle[] {
    const road: Rectangle[] = [];
    for (let i: number = 0; i < 14; i++) {
      road[i] = new Rectangle(20,50, new Point(180, -50 + (i * 54)));
      road[i+1] = new Rectangle(20,50, new Point(420, -50 + (i * 54)));
      i += 1;
    }
    return road;
  }

export function drawRoad(road:Rectangle){
  ctx.beginPath();
  ctx.fillStyle = '#fff'
  ctx.fillRect(road.center.x - 5, road.center.y, road.width,road.height)
}

export function updateRoad(road:Rectangle){
  road.center.y += clamp(SPEED * gameSpeed, 0, 22);
    if (road.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      road.center.y = -50;
    }
}