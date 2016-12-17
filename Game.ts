
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
      this.canvasBoard = new CanvasBoard(width, height);
      $("body").append(this.canvasBoard.jQuerySelector);
      this.controlPanel = new ControlPanel(width, height);
      $("body").append(this.controlPanel.jQuerySelector);
    }

}
