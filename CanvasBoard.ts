/// <reference path="node_modules/@types/jquery/index.d.ts"/>
import {Board} from './Board';
import {Cell, CellState} from './Cell';

export class CanvasBoard {
    jQuerySelector: JQuery;
    board: Board;
    ctx: CanvasRenderingContext2D;
    canvas : HTMLCanvasElement;
    width: number;
    height: number;
    cellLength: number;
    static COLS: number = 5;
    static ROWS: number = 5;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        if (height > width) {
            this.cellLength = width / CanvasBoard.COLS;
        } else {
            this.cellLength = height / CanvasBoard.COLS;
        }
        this.cellLength = Math.floor(this.cellLength);
        var jQuerySelector : JQuery = $("<canvas id='canvasBoard' ></canvas>");


        jQuerySelector.prop('width', height)
        jQuerySelector.prop('height', height)
        jQuerySelector.css({ display: 'table-cell' });
        this.jQuerySelector = jQuerySelector;
        this.canvas = <HTMLCanvasElement>this.jQuerySelector.get(0);
        this.ctx = this.canvas.getContext("2d");
        var canvasBoard : CanvasBoard = this;
        this.canvas.addEventListener("click", function(e : MouseEvent) {
          var x : number = Math.floor(e.clientX / canvasBoard.cellLength);
          var y : number = Math.floor(e.clientY / canvasBoard.cellLength);
          canvasBoard.doModify(x,y);
        });
        this.board = new Board(CanvasBoard.COLS, CanvasBoard.ROWS);
        this.draw();
    }

    doModify(x : number, y : number) {
      console.log("You just clicked: " + x + "," + y); // TODO STOP HERE
      this.board.cells[x][y].nextState();
      this.draw();
    }

    draw() {

        for (var y = 0; y < CanvasBoard.ROWS; y++) {
            for (var x = 0; x < CanvasBoard.COLS; x++) {
                this.drawCellImage(x,y);
            }
        }
    }

    drawCellRect(x : number, y : number) {
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

    drawCellImage(x : number, y : number) {
      var cell: Cell = this.board.cells[x][y];
      var imageName : string = cell.getImageName();
      var img : HTMLImageElement = new Image();
      img.src = imageName;
      var ctx = this.ctx;

      var cellLength = this.cellLength;
      img.onload = function () {
        ctx.drawImage(img,
          x * cellLength,
          y * cellLength,
          cellLength,
          cellLength
        );
      }
    }
}
