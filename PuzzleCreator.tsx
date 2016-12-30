/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {GameLevel} from "./GameLevel";
import {CellState, Cell} from "./Cell";
import * as React from "react"
import * as ReactDOM from 'react-dom';
import stylePropType from 'react-style-proptype';
import reactElementToJSXString from 'react-element-to-jsx-string';
/*
  to run:
  this program is NOT part of Main and is a standalone
  C:\> ts-node PuzzleCreator.tsx
*/

export class PuzzleCreator {
  static ROWS : number = 5;
  static COLS : number = 5;
  static LAST_POSITION = (PuzzleCreator.ROWS * PuzzleCreator.COLS) - 1;
  static YOUWINBOARDASSTRING = "2222222222222222222222222";
  boardDepth : string[]; // key is the boardAsString,  value is search Depth
  listOfMoves : number[]; // indices of board positions i.e. [0,1,2, ... 24];
  constructor() {
    GameLevel.init();
    this.init();
  }

  init() {

   this.boardDepth = [];
   this.listOfMoves = [];
  }

  /**
  * NOTE: mod logic is REVERSE.  i.e., it subtracts rather than adds
  */
  modifySingleCell(boardAsString : string, position : number) : string {
    let cellString : string = boardAsString.substring(position, position+1);
    let cellNumber = parseInt(cellString);
    if (position < 0 || position > PuzzleCreator.LAST_POSITION) {
      return boardAsString;
    }

    cellNumber--;
    if (cellNumber < CellState.ZERO) {
        cellNumber = CellState.TWO;
    }

    cellString = cellNumber + "";
    let cellStringBebore : string = "";
    if (position-1 >=0 ) {
      cellStringBebore = boardAsString.substring(0, position);
    }
    let cellStringAfter : string = "";
    if (position+1 <= PuzzleCreator.LAST_POSITION) {
      cellStringAfter = boardAsString.substring(position+1);
    }
    return cellStringBebore + cellString + cellStringAfter;
  }

  modify(boardAsString : string, position : number) : string {

    boardAsString = this.modifySingleCell(boardAsString, position);
    // North
    boardAsString = this.modifySingleCell(boardAsString, position - PuzzleCreator.ROWS);
    // East
    if ((position % PuzzleCreator.COLS) != (PuzzleCreator.COLS-1)) {
      boardAsString = this.modifySingleCell(boardAsString, position + 1);
    }
    // South
    boardAsString = this.modifySingleCell(boardAsString, position + PuzzleCreator.ROWS);
    // West
    if (position % PuzzleCreator.COLS != 0) {
      boardAsString = this.modifySingleCell(boardAsString, position - 1);
    }
    return boardAsString;
  }

  createRandomPositions(numMoves : number) : number [] {
    let retval : number[] = [];
    for (let i : number = 0; i < numMoves; i++) {
      let position : number = Math.floor((Math.random() * PuzzleCreator.LAST_POSITION));
      retval.push(position);
    }
    return retval.sort(function(a, b){return a-b});
  }

  getInitialBoard(positions : number[]) : string {
    let boardAsString : string = PuzzleCreator.YOUWINBOARDASSTRING;
    for (let i : number = positions.length-1; i > -1; i--) {
      let position : number = positions[i];
      boardAsString = this.modify(boardAsString, position)
    }
    return boardAsString;
  }
}
let puzzleCreator : PuzzleCreator = new PuzzleCreator();
let moves : number[] = [];
for (let i : number = 0 ; i <= PuzzleCreator.LAST_POSITION; i++) {
  moves.push(i);
}
//let moves : number[] = puzzleCreator.createRandomPositions(15);
console.log(moves)
console.log(puzzleCreator.getInitialBoard(moves));
