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
},{"./Board":1}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJCb2FyZC50cyIsIkNlbGwudHMiLCJNYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBLCtCQUFzQztBQUd0QztJQUtJLGVBQVksSUFBWSxFQUFFLElBQVk7UUFFbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDO0lBRUwsQ0FBQztJQUdELDBCQUFVLEdBQVY7UUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7WUFDekIsSUFBSSxZQUFZLEdBQVcsRUFBRSxDQUFDO1lBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUN4QyxZQUFZLElBQUksSUFBSSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsSUFBQTtBQW5DWSxzQkFBSzs7O0FDSmxCO0lBQUE7SUFFQSxDQUFDO0lBQUQsV0FBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRlksb0JBQUk7QUFJakIsSUFBWSxTQUVYO0FBRkQsV0FBWSxTQUFTO0lBQ25CLHlDQUFJLENBQUE7SUFBRSx1Q0FBRyxDQUFBO0lBQUUsdUNBQUcsQ0FBQTtBQUNoQixDQUFDLEVBRlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFFcEI7OztBQ0xELGlDQUE2QjtBQUU3QixJQUFNLElBQUksR0FBWSxDQUFDLENBQUM7QUFDeEIsSUFBTSxJQUFJLEdBQVksQ0FBQyxDQUFDO0FBRXhCLElBQUksS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gdGVzdFxyXG5pbXBvcnQge0NlbGwsIENlbGxTdGF0ZX0gZnJvbSAnLi9DZWxsJ1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XHJcbiAgICBjb2xzOiBudW1iZXI7XHJcbiAgICByb3dzOiBudW1iZXI7XHJcbiAgICBjZWxsczogQ2VsbFtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29sczogbnVtYmVyLCByb3dzOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcclxuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAxNDQ1ODAvdHlwZXNjcmlwdC1tdWx0aWRpbWVuc2lvbmFsLWFycmF5LWluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW2pdID0gbmV3IENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bal0uc3RhdGUgPSBDZWxsU3RhdGUuWkVSTztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaW50Qm9hcmQoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcm93TGluZTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIHJvd1NlcGFyYXRvcjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcm93TGluZSArPSB0aGlzLmNlbGxzW2pdW2ldLnN0YXRlICsgXCIgXCI7XHJcbiAgICAgICAgICAgICAgICByb3dTZXBhcmF0b3IgKz0gXCItLVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvd0xpbmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyb3dTZXBhcmF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ2VsbCB7XHJcbiAgICBzdGF0ZSA6IENlbGxTdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDZWxsU3RhdGUge1xyXG4gIFpFUk8sIE9ORSwgVFdPXHJcbn1cclxuIiwiaW1wb3J0IHtDZWxsLCBDZWxsU3RhdGV9IGZyb20gJy4vQ2VsbCdcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9Cb2FyZCdcclxuXHJcbmNvbnN0IENPTFMgOiBudW1iZXIgPSA1O1xyXG5jb25zdCBST1dTIDogbnVtYmVyID0gNTtcclxuXHJcbmxldCBib2FyZCA9IG5ldyBCb2FyZChDT0xTLCBST1dTKTtcclxuYm9hcmQucHJpbnRCb2FyZCgpO1xyXG4iXX0=
