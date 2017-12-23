/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Board} from './Board';
import {Cell, CellState} from './Cell';
import {Game, Orientation} from './Game';
import {GameLevel} from './GameLevel';
import {SoundHelper} from './SoundHelper';
import {YouWin} from './YouWin';
import {MoveCount} from './MoveCount';
import * as React from "react"
import * as ReactDOM from 'react-dom';
import {Actions} from "./Actions";

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
    static htmlId : string = "canvasBoard";
    static instance : CanvasBoard;

    constructor() {
        CanvasBoard.instance = this;
        var jQuerySelector: JQuery = $("<canvas id='" + CanvasBoard.htmlId + "' ></canvas>");
        this.resize(jQuerySelector);
        this.cellLength = Math.floor(this.cellLength);
        jQuerySelector.css({ display: 'table-cell' });
        this.jQuerySelector = jQuerySelector;
        this.canvas = this.jQuerySelector.get(0) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        var canvasBoard: CanvasBoard = this;

        this.canvas.addEventListener("click", this.doClick);
        this.board = new Board(CanvasBoard.COLS, CanvasBoard.ROWS);
        //this.loadBoardAndDraw();
    }

    assignCellLength() {
      this.cellLength = this.height / CanvasBoard.COLS;
    }

    doClick(e : MouseEvent) {
      let xOffset = $("#" + CanvasBoard.htmlId).offset().left;
      let yOffset = $("#" + CanvasBoard.htmlId).offset().top;
      let x: number = Math.floor((e.clientX - xOffset)/ CanvasBoard.instance.cellLength);
      let y: number = Math.floor((e.clientY - yOffset)/ CanvasBoard.instance.cellLength);
      Game.SOUND_DICT[SoundHelper.DIR + "/" + "meow.mp3"].play();

      //new Audio(SoundHelper.DIR + "/" + "meow.mp3").play();
      CanvasBoard.instance.doModify(x, y);
    }

    resize(jQuerySelector?: JQuery) {
      this.width = Game.instance.width;
      this.height = Game.instance.width;
      this.assignCellLength();
      // must use .prop (not css as css puts it in style)
      if (jQuerySelector) {
        jQuerySelector.prop('width', this.width)
        jQuerySelector.prop('height', this.height)
      } else {
        $("#" + CanvasBoard.htmlId).prop("width", this.width)
        $("#" + CanvasBoard.htmlId).prop("height", this.height)
      }
    }

    loadBoardAndDraw() {
        this.board.load(GameLevel.getBoardAsString(Game.instance.settings.gameLevelIndex));
        this.draw();
    }

    doModify(x: number, y: number) {
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
        this.renderMoveCount();
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

    renderMoveCount() {
      /*
      if ($("#moveCount").length == 0) {
        Game.instance.renderControlPanel({body:<MoveCount levelIndex={Game.instance.settings.gameLevelIndex} moves={1}/>});
      } else {
        let moveCount : number = parseInt($("#moveCount").html());
        moveCount++;
        Game.instance.renderControlPanel({body:<MoveCount levelIndex={Game.instance.settings.gameLevelIndex} moves={moveCount}/>});
      }
      */
      let moveCount : number = parseInt($("#movesCount").html());
      moveCount++;
      $("#movesCount").html("" + moveCount);
    }

    renderYouWin() {
      /*
      let moveCount : number = parseInt($("#moveCount").html());
      moveCount++;
      Game.instance.renderControlPanel({body:<YouWin levelIndex={Game.instance.settings.gameLevelIndex} moves={moveCount}/>});
      */
    //  alert("todo - You Win")
      //$(window).trigger(Actions.SHOW_YOUWIN);
      $("#youWinModal").modal("show");
      Game.SOUND_DICT[SoundHelper.DIR + "/" + "youWin.mp3"].play();
      //Game.SOUND_DICT[SoundHelper.DIR + "/" + "meow.mp3"].play();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawCellState();
    }


    drawCellState() {
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

        var padding : number = 10;
        var lengthOfImage = (this.width - ((CanvasBoard.COLS+1) * padding))/ CanvasBoard.COLS;
        var me = this;
        this.ctx.drawImage(image,
            x * me.cellLength + padding - (x/CanvasBoard.COLS * padding),
            y * me.cellLength + padding - (y/CanvasBoard.ROWS * padding),
            lengthOfImage,
            lengthOfImage
        );
    }

}
