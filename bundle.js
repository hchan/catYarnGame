(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Cell_1 = require("./Cell");
var Board = (function () {
    function Board(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.cells = [];
        for (var i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (var j = 0; j < cols; j++) {
                this.cells[i][j] = new Cell_1.Cell();
                this.cells[i][j].state = Cell_1.CellState.ZERO;
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
var CanvasBoard = (function () {
    function CanvasBoard() {
    }
    return CanvasBoard;
}());
exports.CanvasBoard = CanvasBoard;

},{}],3:[function(require,module,exports){
"use strict";
var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
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
    function ControlPanel() {
    }
    return ControlPanel;
}());
exports.ControlPanel = ControlPanel;

},{}],5:[function(require,module,exports){
"use strict";
var Board_1 = require("./Board");
var Game = (function () {
    function Game() {
        var width = Math.max($(document).width(), $(window).width());
        var height = Math.max($(document).height(), $(window).height());
        $("html").width(width);
        $("html").height(height);
        $("head").css({ margin: 0, padding: 0 });
        $("body").css({ margin: 0, padding: 0, position: "fixed", display: "table" });
        this.createCanvas(width, height);
        this.createControlPanel(width, height);
        var rows = 5;
        var cols = 5;
        var board = new Board_1.Board(cols, rows);
        board.printBoard();
    }
    Game.prototype.createCanvas = function (width, height) {
        var canvas = $("<canvas id='canvasBoard' ></canvas>");
        canvas.prop('width', height);
        canvas.prop('height', height);
        canvas.css({ display: 'table-cell' });
        $("body").append(canvas);
    };
    Game.prototype.createControlPanel = function (width, height) {
        var controlPanel = $("<span id='controlPanel'/>");
        controlPanel.html("Controls");
        controlPanel.css({
            "vertical-align": "top",
            width: width - height,
            display: "table-cell",
            "background-color": "red"
        });
        $("body").append(controlPanel);
    };
    return Game;
}());
exports.Game = Game;

},{"./Board":1}],6:[function(require,module,exports){
"use strict";
var Game_1 = require("./Game");
$().ready(function () {
    var game = new Game_1.Game();
});

},{"./Game":5}]},{},[1,2,3,4,5,6]);

//# sourceMappingURL=bundle.js.map
