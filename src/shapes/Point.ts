interface IPoint{
    x:number;
    y:number;

    getX: () => number;
    setX: (x:number) => void;
    getY: () => number;
    setY: (x:number) => void;
}

export default class Point implements IPoint {
    x:number;
    y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    };
    getX = () => this.x;
    setX = (x: number) =>{
        this.x = x;
    };
    getY = () => this.y;
    setY = (y: number) =>{
        this.y = y;
    };

}