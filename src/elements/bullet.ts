import Rectangle from "../shapes/Rectangle";
import Point from "../shapes/Point";
import { clamp } from "../utils/common";
import { player1 } from "./player";
import { SPEED } from "../constants";
import { gameSpeed } from "../main";
import { ctx } from "../main";

export let bullet = new Rectangle(3,8, new Point(player1.center.x, player1.center.y - 40))

export function drawBullet(bullet:Rectangle){
    ctx.beginPath();
    ctx.fillStyle = '#d22'
    ctx.fillRect(bullet.center.x, bullet.center.y, bullet.width, bullet.height)
}

export function updateBullet(bullet:Rectangle){
    bullet.center.y -= clamp(SPEED * gameSpeed, 0, 22);
}