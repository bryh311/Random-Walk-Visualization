class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    print() {
        console.log("X : " + this.x + "Y: " + this.y);
    }    
}

export class Walker {
    constructor(x, y, color="blue") {
        this.coord = new Point(x, y);
        this.color = color;
        this.path = [];
        this.path.push(this.coord);
    }
    #random(){
        return Math.floor(Math.random() * 2)
    }
    iterate() {
        let previousCoord = this.coord;
        if (this.#random() == 0) {
            if (this.#random() == 1) {
                this.coord = new Point(previousCoord.x + 1, previousCoord.y);
            } else {
                this.coord = new Point(previousCoord.x - 1, previousCoord.y);
            }
        } else {
            if (this.#random() == 1) {
                this.coord = new Point(previousCoord.x, previousCoord.y + 1);
            } else {
                this.coord = new Point(previousCoord.x, previousCoord.y - 1);
            }
        }
        this.path.push(this.coord)
    }
}
