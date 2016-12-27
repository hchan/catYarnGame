// test
import {Cell, CellState} from './Cell'


export class Board {
    cols: number;
    rows: number;
    cells: Cell[][];

    /**
      boardAsString is a long string of representation of what a board looks
      like
      i.e. if a board is like:
      00001
      10020
      02000
      10000

      then boardAsString wold be: 00001100200200010000
    **/
    constructor(cols: number, rows: number) {
        this.cols = cols;
        this.rows = rows;
        this.createCells();
    }


    load(boardAsString : string) {
      var boardAsStringIndex : number = 0;
      for (var y = 0; y < this.rows; y++) {
          for (var x = 0; x < this.cols; x++) {
              var cell : Cell = this.cells[x][y];
              var state : number = parseInt(boardAsString.substring(boardAsStringIndex, boardAsStringIndex+1));
              boardAsStringIndex++;
              cell.state = state;
          }
      }
    }

    // creates arrays and ZERO's out the states
    createCells() {
      // http://stackoverflow.com/questions/30144580/typescript-multidimensional-array-initialization
      this.cells = [];
      for (var y = 0; y < this.rows; y++) {
          this.cells[y] = [];
          for (var x = 0; x < this.cols; x++) {
              this.cells[y][x] = new Cell(y,x);
              var state : CellState = CellState.ZERO;
              this.cells[y][x].state = state;
          }
      }
    }


    printBoard() {
        for (var i = 0; i < this.rows; i++) {
            var rowLine: string = "";
            var rowSeparator: string = "";
            for (var j = 0; j < this.cols; j++) {
                rowLine += this.cells[j][i].state + " ";
                rowSeparator += "**";
            }
            console.log(rowLine);
            console.log(rowSeparator);
        }
    }
}
