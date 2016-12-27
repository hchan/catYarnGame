/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Board} from './Board';
import {Cell, CellState} from './Cell';
import {Game, Orientation} from './Game';
import {GameLevel} from './GameLevel';
import * as React from "react"
import * as ReactDOM from 'react-dom';

export class CanvasBoard {
    jQuerySelector: JQuery;
    board: Board;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellLength: number;
    static COLS: number = 5;
    static ROWS: number = 5;

    constructor() {
        var jQuerySelector: JQuery = $("<canvas id='canvasBoard' ></canvas>");
        if (Game.instance.orientation == Orientation.LANDSCAPE) {
          this.width = Game.instance.height;
          this.height = Game.instance.height;

          this.cellLength = this.height / CanvasBoard.COLS;
        } else {
          this.width = Game.instance.width;
          this.height = Game.instance.width;
          this.cellLength = this.height / CanvasBoard.COLS;
        }
        jQuerySelector.prop('width', this.width)
        jQuerySelector.prop('height', this.height)
        this.cellLength = Math.floor(this.cellLength);




        jQuerySelector.css({ display: 'table-cell' });
        this.jQuerySelector = jQuerySelector;
        this.canvas = this.jQuerySelector.get(0) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        var canvasBoard: CanvasBoard = this;
        this.canvas.addEventListener("click", function(e: MouseEvent) {
            var x: number = Math.floor(e.clientX / canvasBoard.cellLength);
            var y: number = Math.floor(e.clientY / canvasBoard.cellLength);
            canvasBoard.doModify(x, y);
        });
        var boardAsString : string = GameLevel.getBoardAsString(Game.instance.settings.gameLevelIndex);
        this.board = new Board(CanvasBoard.COLS, CanvasBoard.ROWS, boardAsString);
        this.draw();
    }

    doModify(x: number, y: number) {
        console.log("You just clicked: " + x + "," + y); // TODO STOP HERE
        // click Cell
        this.board.cells[x][y].nextState();
        // North
        if (y != 0) {
          this.board.cells[x][y-1].nextState();
        }
        // East
        if (x != this.board.cols-1) {
          this.board.cells[x+1][y].nextState();
        }
        // South
        if (y != this.board.rows-1) {
          this.board.cells[x][y+1].nextState();
        }
        // West
        if (x != 0) {
          this.board.cells[x-1][y].nextState();
        }

        this.draw();
        if (this.isPuzzleSolved()) {
          this.renderYouWin();
        }
    }

    isPuzzleSolved() : boolean {
      var retval : boolean = true;
      for (var y = 0; y < CanvasBoard.ROWS; y++) {
          for (var x = 0; x < CanvasBoard.COLS; x++) {
              if ((this.board.cells[x][y].state == CellState.ZERO) ||
                (this.board.cells[x][y].state == CellState.ONE)) {
                      return false;
                }
          }
        }
        return retval;
    }

    renderYouWin() {
      Game.instance.renderControlPanel({body:<div>You Win!</div>});
    }

    draw() {
        for (var y = 0; y < CanvasBoard.ROWS; y++) {
            for (var x = 0; x < CanvasBoard.COLS; x++) {
                this.drawCellImage(x, y);
            }
        }
    }

    drawCellRect(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.rect(
            x * this.cellLength,
            y * this.cellLength,
            this.cellLength,
            this.cellLength
        );
        if (x % 2 == 1) {
            this.ctx.fillStyle = "green";
        } else {
            this.ctx.fillStyle = "blue";
        }
        this.ctx.fill();
    }

    drawCellImage(x: number, y: number) {
        var cell: Cell = this.board.cells[x][y];
        var imageName = cell.getImageName();
        var image: HTMLImageElement = Game.IMAGE_DICT[imageName];
        var me = this;
        this.ctx.drawImage(image,
            x * me.cellLength,
            y * me.cellLength,
            me.cellLength,
            me.cellLength
        );

    }
}
