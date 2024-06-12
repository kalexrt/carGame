import { score } from "../main";
import { setCookie, getCookie } from "../utils/cookie";

export function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = "20px Arial"; 
    ctx.fillStyle = "black"; 
    ctx.fillText("Score: " + score, 60, 30); 
}

export function setHighScore(score:number) {
    let highScore = getHighScore();
    if (highScore === 0 || score > highScore) {
        setCookie("highscore", score, 5); //5 is days to expire cookie
    }
}

export function getHighScore() {
    let highScore = getCookie("highscore");
    return highScore === "" ? 0 : parseInt(highScore, 10);
}