
export class Cell {
    static IMAGENAME_PREFIX : string = "cat";
    static IMAGENAME_SUFFIX : string = ".jpg";

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

    static getImageName(): string {
        return Cell.IMAGENAME_PREFIX + this.state + Cell.IMAGENAME_SUFFIX;
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
