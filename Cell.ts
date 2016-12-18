export class Cell {
    state: CellState
    col: number;
    row: number;
    constructor(col: number, row: number) {
        this.col = col;
        this.row = row;
    }

    toString(): string {
        return this.col + "," + this.row;
    }

    getImageName(): string {
        return "cat" + this.state + ".jpg";
    }

    nextState() {
        this.state++;
        if (this.state > CellState.TWO) {
          this.state = CellState.ZERO;
        }
    }
}

export enum CellState {
    ZERO, ONE, TWO
}
