import { ctx } from "../main";
import { DIMENSIONS } from "../constants";


export function drawBackground(){
    ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
    ctx.fillStyle = '#9c9c9c';
    ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  
}

