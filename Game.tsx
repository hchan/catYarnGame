
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

    static instance : Game;
    constructor() {
        this.init();
        Game.instance = this;
    }

    init() {
        this.width = Math.max($(document).width(), $(window).width())
        this.height = Math.max($(document).height(), $(window).height())
        $("html").width(this.width);
        $("html").height(this.height);
  
        this.initLoading();
        this.animateLoading();
        this.preloadImages();
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
        // assume with > height for now
        this.canvasBoard = new CanvasBoard(this.width, this.height);
        $("body").append(this.canvasBoard.jQuerySelector);
        this.addControlPanel();
    }

    addControlPanel() {
      let props : Props = {body:ControlPanel.initialBody};
      this.renderControlPanel(props);
    }


    renderControlPanel (props : Props) {
      // temporary render target
      let temp = document.createElement("div");
      let width = this.width - this.height;
      let height = this.height;
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
