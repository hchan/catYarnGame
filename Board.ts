// test
import {Cell, CellState} from './Cell'


export class Board {
    cols: number;
    rows: number;
    cells: Cell[][];

    constructor(cols: number, rows: number) {

        this.cols = cols;
        this.rows = rows;
        // http://stackoverflow.com/questions/30144580/typescript-multidimensional-array-initialization
        this.cells = [];

        for (var i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (var j = 0; j < cols; j++) {
                this.cells[i][j] = new Cell();
                this.cells[i][j].state = CellState.ZERO;
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
