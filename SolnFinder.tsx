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
  C:\> ts-node SolnFinder.tsx
*/

export class SolnFinder {
  static ROWS : number = 5;
  static COLS : number = 5;
  static LAST_POSITION = (SolnFinder.ROWS * SolnFinder.COLS) - 1;
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

  modifySingleCell(boardAsString : string, position : number) : string {
    let cellString : string = boardAsString.substring(position, position+1);
    let cellNumber = parseInt(cellString);
    if (position < 0 || position > SolnFinder.LAST_POSITION) {
      return boardAsString;
    }

    cellNumber++;
    if (cellNumber > CellState.TWO) {
        cellNumber = CellState.ZERO;
    }

    cellString = cellNumber + "";
    let cellStringBebore : string = "";
    if (position-1 >=0 ) {
      cellStringBebore = boardAsString.substring(0, position);
    }
    let cellStringAfter : string = "";
    if (position+1 < SolnFinder.LAST_POSITION) {
      cellStringAfter = boardAsString.substring(position+1);
    }
    return cellStringBebore + cellString + cellStringAfter;
  }

  modify(boardAsString : string, position : number) : string {

    boardAsString = this.modifySingleCell(boardAsString, position);
    // North
    boardAsString = this.modifySingleCell(boardAsString, position - SolnFinder.ROWS);
    // East
    if (position % SolnFinder.COLS != (SolnFinder.COLS-1)) {
      boardAsString = this.modifySingleCell(boardAsString, position + 1);
    }
    // South
    boardAsString = this.modifySingleCell(boardAsString, position + SolnFinder.ROWS);
    // West
    if (position % SolnFinder.COLS != 0) {
      boardAsString = this.modifySingleCell(boardAsString, position - 1);
    }
    return boardAsString;
  }

  findSoln(levelIndex : number) : number[] {
    let boardAsString : string = GameLevel.getBoardAsString(levelIndex);

    try {
      this.search(boardAsString, 0)
      return [];
    } catch (e) {
      console.log(e); // unfortunately, I get a Max Stack Size error here
      return this.listOfMoves;
    }

  }

  search (boardAsString : string, position : number) {
    let nextBoardAsString : string;
    if (boardAsString == SolnFinder.YOUWINBOARDASSTRING) {
      throw new Error ("Soln Found!");
    }
    if (this.listOfMoves.length > 10) {
      return;
    }
    for(let i=position; position<= (SolnFinder.ROWS * SolnFinder.COLS)-1; i++){
    		nextBoardAsString = this.modify(boardAsString, i)
        this.listOfMoves.push(i);
    		this.search(nextBoardAsString, i+1);
    		this.listOfMoves.pop();
    }
  }

}

let solnFinder : SolnFinder = new SolnFinder();
let soln : number[] = solnFinder.findSoln(0);
console.log(soln)
