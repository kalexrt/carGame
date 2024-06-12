import Rectangle from "../shapes/Rectangle";
import { clamp } from "../utils/common";
import { SPEED } from "../constants";
import { gameSpeed } from "../main";
import { ctx } from "../main";

export const bullets:Rectangle[] = []

export function drawBullet(bullet:Rectangle){
    ctx.beginPath();
    ctx.fillStyle = '#d22'
    ctx.fillRect(bullet.center.x, bullet.center.y, bullet.width, bullet.height)
}

export function updateBullet(bullet:Rectangle){
    bullet.center.y -= clamp(SPEED * gameSpeed, 0, 22);
}