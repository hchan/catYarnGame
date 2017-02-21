/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {GameLevel} from "./GameLevel";
import {LevelDefn} from "./LevelDefn";
import {LevelDefnComponent} from "./LevelDefnComponent";
import {CellState, Cell} from "./Cell";
import * as React from "react"
import * as ReactDOM from 'react-dom';
import stylePropType from 'react-style-proptype';
import reactElementToJSXString from 'react-element-to-jsx-string';

export class PuzzleCreator {
  static ROWS : number = 5;
  static COLS : number = 5;
  static DEFAULT_NUM_MOVES : number = 5;
  static LAST_POSITION = (PuzzleCreator.ROWS * PuzzleCreator.COLS) - 1;
  static YOUWINBOARDASSTRING = "2222222222222222222222222";
  boardDepth : string[]; // key is the boardAsString,  value is search Depth
  listOfMoves : number[]; // indices of board positions i.e. [0,1,2, ... 24];
  static seed : number; // random seed

  constructor() {
    GameLevel.init();
    this.init();
  }

  init() {

   this.boardDepth = [];
   this.listOfMoves = [];
   PuzzleCreator.initSeed();
  }

  static initSeed() {
    let now : Date = new Date();
    let fullDaysSinceEpoch : number = Math.floor((now.getTime())/8.64e7);
    PuzzleCreator.seed = fullDaysSinceEpoch;
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



  dailyRandomFunc() :  number {
    let rand : number = Math.sin(PuzzleCreator.seed++) * 10000;
    return rand - Math.floor(rand);
  }

  createLevelDefn() : LevelDefn {
    let soln = this.createDailyRandomPositions();
    let boardAsString = this.getInitialBoard(soln);
    let boardRepresentation : JSX.Element = <LevelDefnComponent>{boardAsString}</LevelDefnComponent>;
    let retval : LevelDefn = {
        boardRepresentation : boardRepresentation,
        soln : soln
    };
    return retval;
  }

  createDailyRandomPositions() : number [] {
    PuzzleCreator.initSeed();
    return this.createRandomPositionsWithFunc(PuzzleCreator.DEFAULT_NUM_MOVES, this.dailyRandomFunc);
  }

  createRandomPositions(numMoves : number) : number [] {
    return this.createRandomPositionsWithFunc(numMoves, Math.random);
  }

  createRandomPositionsWithFunc(numMoves : number, randomFunc : Function) : number [] {
    let retval : number[] = [];
    for (let i : number = 0; i < numMoves; i++) {
      let position : number = Math.floor((randomFunc() * PuzzleCreator.LAST_POSITION));
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
