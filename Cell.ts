export class Cell {
    state : CellState
    col : number;
    row : number;
    constructor (col : number, row : number) {
      this.col = col;
      this.row = row;
    }

     toString () : string {
      return this.col + "," + this.row;
    }
}

export enum CellState {
  ZERO, ONE, TWO
}
