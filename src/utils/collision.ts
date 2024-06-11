import Rectangle from "../shapes/Rectangle";

export function detectCollision(firstObj:Rectangle, secondObj:Rectangle){
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
