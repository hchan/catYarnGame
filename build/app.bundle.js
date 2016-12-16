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
                rowSeparator += "--";
            }
            console.log(rowLine);
            console.log(rowSeparator);
        }
    };
    return Board;
}());
exports.Board = Board;

},{"./Cell":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
var Board_1 = require("./Board");
var COLS = 5;
var ROWS = 5;
var board = new Board_1.Board(COLS, ROWS);
board.printBoard();

},{"./Board":1}]},{},[1,2,3]);

//# sourceMappingURL=app.bundle.js.map
