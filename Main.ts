import {Cell, CellState} from './Cell'
import {Board} from './Board'

const COLS : number = 5;
const ROWS : number = 5;

let board = new Board(COLS, ROWS);
board.printBoard();
