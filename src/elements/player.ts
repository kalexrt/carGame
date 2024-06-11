import Point from "../shapes/Point";
import Rectangle from "../shapes/Rectangle";
import { ctx } from "../main";
import { carImage, DIMENSIONS } from "../constants";

export const player1 = new Rectangle(40, 80, new Point(300, DIMENSIONS.CANVAS_HEIGHT - 100));

export function drawPlayer(){
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