import { score } from "../main";

export function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = "20px Arial"; 
    ctx.fillStyle = "black"; 
    ctx.fillText("Score: " + score, 60, 30); 
}