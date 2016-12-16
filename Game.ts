
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
import {CanvasBoard} from './CanvasBoard'
import {ControlPanel} from './ControlPanel'
import {Cell, CellState} from './Cell'
import {Board} from './Board'
export class Game {
    canvasBoard : CanvasBoard
    controlPanel : ControlPanel

    constructor() {
      var width : number  = Math.max($(document).width(), $(window).width())
      var height : number = Math.max($(document).height(), $(window).height())
      $("html").width(width);
      $("html").height(height);
      $("head").css({margin:0, padding:0});
      $("body").css({margin:0, padding:0, position:"fixed", display : "table"});

      // assume with > height for now
      this.createCanvas(width, height);
      this.createControlPanel(width, height);

      var rows : number = 5;
      var cols : number = 5;

      var board : Board = new Board(cols, rows);
      board.printBoard();
    }

    createCanvas(width :number, height :number) {
      var canvas = $("<canvas id='canvasBoard' ></canvas>");
      canvas.prop('width', height)
      canvas.prop('height', height)
      canvas.css({display:'table-cell'});
      //canvas.css({"position":"static", "width":"80%"});
      $("body").append(canvas);
    }

    createControlPanel(width :number, height :number) {
      var controlPanel= $("<span id='controlPanel'/>")
      controlPanel.html("Controls")
      controlPanel.css({
        "vertical-align": "top",
        width: width-height,
        display: "table-cell",
        "background-color" : "red"
      });
      $("body").append(controlPanel);
    }
}
