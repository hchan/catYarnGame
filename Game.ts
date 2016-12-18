
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
import {CanvasBoard} from './CanvasBoard'
import {ControlPanel} from './ControlPanel'
import {Cell, CellState} from './Cell'
import {Board} from './Board'
import {ImageHelper} from './ImageHelper'

export class Game {
    canvasBoard: CanvasBoard
    controlPanel: ControlPanel
    static IMAGE_LOCATIONS : string[] = [];
    static IMAGE_DICT: { [key: string]:  HTMLImageElement} = {};
    width : number;
    height : number;

    constructor() {
        this.width = Math.max($(document).width(), $(window).width())
      this.height = Math.max($(document).height(), $(window).height())
        $("html").width(this.width);
        $("html").height(this.height);
        $("head").css({ margin: 0, padding: 0 });
        $("body").css(
          { margin: 0, padding: 0, position: "fixed", display: "table" }
        );
        this.preloadImages();


    }

    preloadImages() {
      var imageHelper = new ImageHelper();
      imageHelper.populate();
      this.storeImageAndLoadNext(0);

    }

    doAfterPreloadImages() {
      // assume with > height for now
      this.canvasBoard = new CanvasBoard(this.width, this.height);
      $("body").append(this.canvasBoard.jQuerySelector);
      this.controlPanel = new ControlPanel(this.width, this.height);
      $("body").append(this.controlPanel.jQuerySelector);
    }

  storeImageAndLoadNext(imageLocationIndex) {
    var imageObj: HTMLImageElement = new Image();
    var imageLocation = Game.IMAGE_LOCATIONS[imageLocationIndex];
    imageObj.src = imageLocation;
    var me = this;
    imageObj.onload = function() {
        Game.IMAGE_DICT[imageLocation] = imageObj;
        var nextIndex = imageLocationIndex + 1;
        if (nextIndex < Object.keys(Game.IMAGE_DICT).length) {
            me.storeImageAndLoadNext(imageLocationIndex + 1);
        } else {
          me.doAfterPreloadImages();
        }
    }
}
}
