
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {CanvasBoard} from './CanvasBoard'
import {ControlPanel, Props} from './ControlPanel'
import {Cell, CellState} from './Cell'
import {Board} from './Board'
import {ImageHelper} from './ImageHelper'
import {GameLevel} from './GameLevel'
import {Settings} from './Settings'
import {Instructions} from './Instructions'
import {Welcome} from './Welcome'
import {GameHeader} from './GameHeader'
import {GameFooter} from './GameFooter'
import {PaddingDirection} from './PaddingDirection'
import {GameComponent} from './GameComponent'
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
    static SETTINGS : Settings;
    static FONT_SIZE : number = 4; // 4vh == 4 % of vertical height
    static HEIGHT_TO_WIDTH : number = 4/3;
    width: number;
    height: number;
    widthBeforeRatioAdjust: number;
    heightBeforeRatioAdjust: number;
    orientation : Orientation;
    settings : Settings;
    paddingDirection : PaddingDirection;

    static instance : Game;
    constructor() {
        Game.instance = this;
        this.init();
    }

    restart() {
      this.init();
    }

    init() {
        this.settings = new Settings();
        this.assignWidthAndHeight();

        /*
        if (this.width > this.height) {
          alert("LANDSCAPE orientation is not supported!!")
          this.orientation = Orientation.LANDSCAPE;
          $("body").css({"display": "table"})
        } else {
          this.orientation = Orientation.PORTRAIT;
          $("body").css({"display": "inline"})
        }
        */

        this.orientation = Orientation.PORTRAIT;
        $("body").css({"display": "inline"})


        this.addResizeHandler();
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

       this.widthBeforeRatioAdjust = this.width;
       this.heightBeforeRatioAdjust = this.height;
       if ((this.height / this.width) <  Game.HEIGHT_TO_WIDTH) {
         this.width = this.height / Game.HEIGHT_TO_WIDTH;
         this.paddingDirection = PaddingDirection.HORIZONTAL;
         $("body").css("margin-left", (this.widthBeforeRatioAdjust - this.width)/2 )
         $("body").css("margin-top", 0);
       } else {
         this.height = this.width * Game.HEIGHT_TO_WIDTH;
         this.paddingDirection = PaddingDirection.VERTICAL;
         $("body").css("margin-top", (this.heightBeforeRatioAdjust - this.height)/2 )
         $("body").css("margin-left", 0);
       }
       $("html").width(this.width);
       $("html").height(this.height);
    }

    fixFontSize() {
      let fontSizePixels : number = this.height * Game.FONT_SIZE * 0.01;
      if (this.paddingDirection === PaddingDirection.VERTICAL) {
        fontSizePixels *= this.height/this.heightBeforeRatioAdjust;
      }
      $("#movesContainer").css("font-size", fontSizePixels);
      $(".form-control").css("font-size", fontSizePixels);
    }

    addResizeHandler() {
      $(window).off("resize");
      $( window ).resize(function() {
          Game.instance.assignWidthAndHeight();
          if ($("#" + CanvasBoard.htmlId).length > 0) {
            Game.instance.canvasBoard.resize();
            Game.instance.canvasBoard.draw();
          } else {
            Game.instance.resizeWelcome()
          }
          Game.instance.resizeGameHeaderAndFooter(); // should be ran after canvasBoard.resize()
          Game.instance.fixFontSize();
      });
    }

    resizeWelcome() {
      if (this.paddingDirection === PaddingDirection.VERTICAL) {
        $("#welcomeImg").height($("html").width() * Game.HEIGHT_TO_WIDTH);
        $("#welcomeImg").width($("html").width())
      } else {
        $("#welcomeImg").height($("html").height());
        $("#welcomeImg").width($("html").height() / Game.HEIGHT_TO_WIDTH)
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
      if (window.location.hash != null && window.location.hash == "#play") {
        Game.beginPlay();
      } else {
        this.doWelcome();
      }
    }

    doWelcome() {
      $("body").html("");
      /*
      $("body").append("<span id='welcome-header'/>")
      $("body").append("<span id='welcome-body'/>")
      $("body").append("<span id='welcome-footer'/>")
      */
      this.addWelcome();
      //this.canvasBoard = new CanvasBoard();
      //$("#" + CanvasBoard.htmlId);//.hide();
      //$("#game-body").append(this.canvasBoard.canvas);
      //this.canvasBoard.loadBoardAndDraw();
      //this.addControlPanel();
    }

    static beginPlay() {
      window.location.hash = "#play";
      $("body").html("");
      let gameComponent : JSX.Element = <GameComponent levelIndex={0}/>;
      ReactDOM.render(gameComponent, document.body);

/*
      $("body").append("<span id='game-header'/>")
      $("body").append("<span id='game-body'/>")
      $("body").append("<span id='game-footer'/>")
      */
      Game.instance.canvasBoard = new CanvasBoard();

      //var gameHeader : JSX.Element = <GameHeader levelIndex={0}/>;
      //var gameFooter : JSX.Element = <GameFooter/>;
      Game.instance.canvasBoard.loadBoardAndDraw();
      $("#game-body").append(  Game.instance.canvasBoard.canvas);
      //Game.replaceElement("game-header", gameHeader);
      //Game.replaceElement("game-footer", gameFooter);
      Game.instance.resizeGameHeaderAndFooter();
      Game.instance.fixFontSize();
      //this.addControlPanel();
    }

    resizeGameHeaderAndFooter() {
      let gameHeaderHeight : number = (Game.instance.height - $("#game-body").height())/2;
      let gameHeaderWidth : number = Game.instance.width;
      let gameFooterHeight : number = gameHeaderHeight;
      let gameFooterWidth : number = Game.instance.width;
      $("#game-header").height(gameHeaderHeight);
      $("#game-header").width(gameHeaderWidth);
      $("#game-footer").height(gameFooterHeight);
      $("#game-footer").width(gameFooterWidth);
    }

    // http://stackoverflow.com/questions/30686796/react-render-replace-container-instead-of-inserting-into
    static replaceElement(id : string, jsxElement : JSX.Element ) {
      // temporary render target
      var temp : Element = document.createElement("span");
      temp.id = id;
      // render
      ReactDOM.render(jsxElement, temp);

      // grab the container
      var container : Element = document.getElementsByTagName("body")[0];
      // and replace the child
      container.replaceChild(temp, document.getElementById(id));
    }

    addWelcome() {
      var welcome : JSX.Element = <Welcome/>;
      ReactDOM.render(welcome, document.body);
      this.resizeGameHeaderAndFooter();
      this.fixFontSize();
      this.addResizeHandler();
      this.resizeWelcome();
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
