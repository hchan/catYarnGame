(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Cell_1 = require("./Cell");
var Board = (function () {
    function Board(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.cells = [];
        for (var y = 0; y < rows; y++) {
            this.cells[y] = [];
            for (var x = 0; x < cols; x++) {
                this.cells[y][x] = new Cell_1.Cell(y, x);
                this.cells[y][x].state = Cell_1.CellState.ZERO;
            }
        }
    }
    Board.prototype.printBoard = function () {
        for (var i = 0; i < this.rows; i++) {
            var rowLine = "";
            var rowSeparator = "";
            for (var j = 0; j < this.cols; j++) {
                rowLine += this.cells[j][i].state + " ";
                rowSeparator += "**";
            }
            console.log(rowLine);
            console.log(rowSeparator);
        }
    };
    return Board;
}());
exports.Board = Board;

},{"./Cell":3}],2:[function(require,module,exports){
"use strict";
var Board_1 = require("./Board");
var Game_1 = require("./Game");
var CanvasBoard = (function () {
    function CanvasBoard(width, height) {
        this.width = width;
        this.height = height;
        if (height > width) {
            this.cellLength = width / CanvasBoard.COLS;
        }
        else {
            this.cellLength = height / CanvasBoard.COLS;
        }
        this.cellLength = Math.floor(this.cellLength);
        var jQuerySelector = $("<canvas id='canvasBoard' ></canvas>");
        jQuerySelector.prop('width', height);
        jQuerySelector.prop('height', height);
        jQuerySelector.css({ display: 'table-cell' });
        this.jQuerySelector = jQuerySelector;
        this.canvas = this.jQuerySelector.get(0);
        this.ctx = this.canvas.getContext("2d");
        var canvasBoard = this;
        this.canvas.addEventListener("click", function (e) {
            var x = Math.floor(e.clientX / canvasBoard.cellLength);
            var y = Math.floor(e.clientY / canvasBoard.cellLength);
            canvasBoard.doModify(x, y);
        });
        this.board = new Board_1.Board(CanvasBoard.COLS, CanvasBoard.ROWS);
        this.draw();
    }
    CanvasBoard.prototype.doModify = function (x, y) {
        console.log("You just clicked: " + x + "," + y);
        this.board.cells[x][y].nextState();
        if (y != 0) {
            this.board.cells[x][y - 1].nextState();
        }
        if (x != this.board.cols - 1) {
            this.board.cells[x + 1][y].nextState();
        }
        if (y != this.board.rows - 1) {
            this.board.cells[x][y + 1].nextState();
        }
        if (x != 0) {
            this.board.cells[x - 1][y].nextState();
        }
        this.draw();
    };
    CanvasBoard.prototype.draw = function () {
        for (var y = 0; y < CanvasBoard.ROWS; y++) {
            for (var x = 0; x < CanvasBoard.COLS; x++) {
                this.drawCellImage(x, y);
            }
        }
    };
    CanvasBoard.prototype.drawCellRect = function (x, y) {
        this.ctx.beginPath();
        this.ctx.rect(x * this.cellLength, y * this.cellLength, this.cellLength, this.cellLength);
        if (x % 2 == 1) {
            this.ctx.fillStyle = "green";
        }
        else {
            this.ctx.fillStyle = "blue";
        }
        this.ctx.fill();
    };
    CanvasBoard.prototype.drawCellImage = function (x, y) {
        var cell = this.board.cells[x][y];
        var imageName = cell.getImageName();
        var image = Game_1.Game.IMAGE_DICT[imageName];
        var me = this;
        this.ctx.drawImage(image, x * me.cellLength, y * me.cellLength, me.cellLength, me.cellLength);
    };
    return CanvasBoard;
}());
CanvasBoard.COLS = 5;
CanvasBoard.ROWS = 5;
exports.CanvasBoard = CanvasBoard;

},{"./Board":1,"./Game":5}],3:[function(require,module,exports){
"use strict";
var Cell = (function () {
    function Cell(col, row) {
        this.col = col;
        this.row = row;
    }
    Cell.prototype.toString = function () {
        return this.col + "," + this.row;
    };
    Cell.prototype.getImageName = function () {
        return Cell.IMAGENAME_PREFIX + this.state + Cell.IMAGENAME_SUFFIX;
    };
    Cell.prototype.nextState = function () {
        this.state++;
        if (this.state > CellState.TWO) {
            this.state = CellState.ZERO;
        }
    };
    return Cell;
}());
Cell.IMAGENAME_PREFIX = "cat";
Cell.IMAGENAME_SUFFIX = ".jpg";
exports.Cell = Cell;
var CellState;
(function (CellState) {
    CellState[CellState["ZERO"] = 0] = "ZERO";
    CellState[CellState["ONE"] = 1] = "ONE";
    CellState[CellState["TWO"] = 2] = "TWO";
})(CellState = exports.CellState || (exports.CellState = {}));

},{}],4:[function(require,module,exports){
"use strict";
var ControlPanel = (function () {
    function ControlPanel(width, height) {
        var controlPanel = $("<span id='controlPanel'/>");
        controlPanel.html("Controls");
        controlPanel.css({
            "vertical-align": "top",
            width: width - height,
            display: "table-cell",
            "background-color": "red"
        });
        this.jQuerySelector = controlPanel;
    }
    return ControlPanel;
}());
exports.ControlPanel = ControlPanel;

},{}],5:[function(require,module,exports){
"use strict";
var CanvasBoard_1 = require("./CanvasBoard");
var ControlPanel_1 = require("./ControlPanel");
var ImageHelper_1 = require("./ImageHelper");
var Game = (function () {
    function Game() {
        this.init();
    }
    Game.prototype.init = function () {
        this.width = Math.max($(document).width(), $(window).width());
        this.height = Math.max($(document).height(), $(window).height());
        $("html").width(this.width);
        $("html").height(this.height);
        $("head").css({ margin: 0, padding: 0 });
        $("body").css({ margin: 0, padding: 0, position: "fixed", display: "table" });
        this.initLoading();
        this.animateLoading();
        this.preloadImages();
    };
    Game.prototype.initLoading = function () {
        $("body").html("<div id='loading'><div id='pleaseWait'>"
            + Game.PLEASEWAITTEXT
            + "</div></div>");
    };
    Game.prototype.animateLoading = function () {
        Game.ANIMATELOADINGINTERVALID = self.setInterval(function () {
            var indexOfAnimation = Game.ANIMATELOADINGLOOPCOUNT % Game.PLEASEWAITTEXT.length;
            var preText = Game.PLEASEWAITTEXT.substring(0, indexOfAnimation);
            var postText = Game.PLEASEWAITTEXT.substring(indexOfAnimation + 1);
            $("#pleaseWait").html(preText + "." + postText);
            Game.ANIMATELOADINGLOOPCOUNT++;
        }, 1000);
    };
    Game.prototype.preloadImages = function () {
        var imageHelper = new ImageHelper_1.ImageHelper();
        imageHelper.populate();
        this.storeImageAndLoadNext(0);
    };
    Game.prototype.sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
    Game.prototype.doAfterPreloadImages = function () {
        self.clearInterval(Game.ANIMATELOADINGINTERVALID);
        $("body").html("");
        this.canvasBoard = new CanvasBoard_1.CanvasBoard(this.width, this.height);
        $("body").append(this.canvasBoard.jQuerySelector);
        this.controlPanel = new ControlPanel_1.ControlPanel(this.width, this.height);
        $("body").append(this.controlPanel.jQuerySelector);
    };
    Game.prototype.storeImageAndLoadNext = function (imageLocationIndex) {
        var imageObj = new Image();
        var imageLocation = Game.IMAGE_LOCATIONS[imageLocationIndex];
        imageObj.src = imageLocation;
        var me = this;
        imageObj.onload = function () {
            Game.IMAGE_DICT[imageLocation] = imageObj;
            var nextIndex = imageLocationIndex + 1;
            if (nextIndex < Game.IMAGE_LOCATIONS.length) {
                me.storeImageAndLoadNext(imageLocationIndex + 1);
            }
            else {
                me.doAfterPreloadImages();
            }
        };
    };
    return Game;
}());
Game.IMAGE_LOCATIONS = [];
Game.IMAGE_DICT = {};
Game.PLEASEWAITTEXT = "Please Wait";
Game.ANIMATELOADINGLOOPCOUNT = 0;
exports.Game = Game;

},{"./CanvasBoard":2,"./ControlPanel":4,"./ImageHelper":6}],6:[function(require,module,exports){
"use strict";
var Game_1 = require("./Game");
var ImageHelper = (function () {
    function ImageHelper() {
    }
    ImageHelper.prototype.populate = function () {
        Game_1.Game.IMAGE_LOCATIONS.push("cat0.jpg");
        Game_1.Game.IMAGE_LOCATIONS.push("cat1.jpg");
        Game_1.Game.IMAGE_LOCATIONS.push("cat2.jpg");
    };
    return ImageHelper;
}());
exports.ImageHelper = ImageHelper;

},{"./Game":5}],7:[function(require,module,exports){
"use strict";
var Game_1 = require("./Game");
$().ready(function () {
    var game = new Game_1.Game();
});

},{"./Game":5}]},{},[1,2,3,4,5,6,7]);

//# sourceMappingURL=bundle.js.map
