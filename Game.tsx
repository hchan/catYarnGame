
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {CanvasBoard} from './CanvasBoard'
import {ControlPanel, Props} from './ControlPanel'
import {Cell, CellState} from './Cell'
import {Board} from './Board'
import {ImageHelper} from './ImageHelper'
import * as React from "react"
import * as ReactDOM from 'react-dom';

export enum Orientation {
  LANDSCAPE,
  PORTRAIT
}
export class Game {
    canvasBoard: CanvasBoard
    //controlPanel: ControlPanel
    static IMAGE_LOCATIONS: string[] = [];
    static IMAGE_DICT: { [key: string]: HTMLImageElement } = {};
    static PLEASEWAITTEXT: string = "Please Wait";
    static ANIMATELOADINGLOOPCOUNT: number = 0;
    static ANIMATELOADINGINTERVALID: number;
    width: number;
    height: number;
    orientation : Orientation;

    static instance : Game;
    constructor() {
        Game.instance = this;
        this.init();
    }

    init() {
        this.assignWidthAndHeight();
        $("html").width(this.width);
        $("html").height(this.height);
        if (this.width > this.height) {
          this.orientation = Orientation.LANDSCAPE;
          $("body").css({"display": "table"})
        } else {
          this.orientation = Orientation.PORTRAIT;
          $("body").css({"display": "inline"})
        }

        this.initLoading();
        this.animateLoading();
        this.preloadImages();
    }

    assignWidthAndHeight() {
       // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

       if (typeof window.innerWidth != 'undefined')
       {
            this.width = window.innerWidth,
            this.height = window.innerHeight
       }

      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

       else if (typeof document.documentElement != 'undefined'
           && typeof document.documentElement.clientWidth !=
           'undefined' && document.documentElement.clientWidth != 0)
       {
             this.width = document.documentElement.clientWidth,
             this.height = document.documentElement.clientHeight
       }

       // older versions of IE

       else
       {
             this.width = document.getElementsByTagName('body')[0].clientWidth,
             this.height = document.getElementsByTagName('body')[0].clientHeight
       }
    }

    initLoading() {
        $("body").html("<div id='loading'><div id='pleaseWait'>"
          + Game.PLEASEWAITTEXT
            + "</div></div>");
    }

    animateLoading() {
        Game.ANIMATELOADINGINTERVALID = self.setInterval(function() {
            var indexOfAnimation: number = Game.ANIMATELOADINGLOOPCOUNT % Game.PLEASEWAITTEXT.length;
            var preText: string = Game.PLEASEWAITTEXT.substring(0, indexOfAnimation);
            var postText: string = Game.PLEASEWAITTEXT.substring(indexOfAnimation + 1);
            $("#pleaseWait").html(preText + "." + postText);
            Game.ANIMATELOADINGLOOPCOUNT++;
        }, 1000);
    }

    preloadImages() {
        var imageHelper = new ImageHelper();
        imageHelper.populate();
        this.storeImageAndLoadNext(0);

    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    doAfterPreloadImages() {
        self.clearInterval(Game.ANIMATELOADINGINTERVALID);
        $("body").html("");
        this.canvasBoard = new CanvasBoard();
        $("body").append(this.canvasBoard.canvas);
        this.addControlPanel();
    }

    addControlPanel() {
      let props : Props = {body:ControlPanel.initialBody};
      this.renderControlPanel(props);
    }


    renderControlPanel (props : Props) {
      // temporary render target
      let temp = document.createElement("div");
      let width: number = this.width - this.canvasBoard.width;
      let height: number = this.height - this.canvasBoard.height;

      if (width == 0) {
        width = this.width;
      }
      if (height == 0) {
        height = this.height;
      }

      props.style = {"width" : width, "height" : height};
      var controlPanelComponent =
        <ControlPanel
          style= {props.style}
          body = {props.body}
        /> ;
        ReactDOM.render(controlPanelComponent, temp);
        let controlPanel = temp.firstChild;

        let controlPanelElement : HTMLElement = document.getElementById("controlPanel");
        if (controlPanelElement != null) {
          controlPanelElement.parentNode.removeChild(controlPanelElement);
        }
        document.getElementsByTagName("body")[0].appendChild(controlPanel);
    }

    storeImageAndLoadNext(imageLocationIndex) {
        var imageObj: HTMLImageElement = new Image();
        var imageLocation = Game.IMAGE_LOCATIONS[imageLocationIndex];
        imageObj.src = imageLocation;
        var me = this;
        imageObj.onload = function() {
            Game.IMAGE_DICT[imageLocation] = imageObj;
            var nextIndex = imageLocationIndex + 1;
            if (nextIndex < Game.IMAGE_LOCATIONS.length) {
                me.storeImageAndLoadNext(imageLocationIndex + 1);
            } else {
                me.doAfterPreloadImages();
            }
        }
    }
}