/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {PuzzleCreator} from "./PuzzleCreator";
import {LevelDefnComponent} from "./LevelDefnComponent";
import {LevelDefn} from "./LevelDefn";
import * as React from "react"
import * as ReactDOM from 'react-dom';
import stylePropType from 'react-style-proptype';
import reactElementToJSXString from 'react-element-to-jsx-string';


export class GameLevel {
  static LEVELS : LevelDefn [];
  static DAILY_RANDOM = -1;
  static init() {
    GameLevel.LEVELS = [];
    GameLevel.LEVELS = [
      /*
      <span>
        00122
        11222
        22222
        22222
        22222
      </span>,
            */
      {
        boardRepresentation :
        <LevelDefnComponent>
          22222
          22022
          20002
          22022
          22222
        </LevelDefnComponent>,
        soln : [12,12]
      },
      {
        boardRepresentation :
        <LevelDefnComponent>
          21212
          11011
          20202
          11011
          21212
        </LevelDefnComponent>,
        soln : [6,8, 16, 18]
      },
      {
        boardRepresentation :
        <LevelDefnComponent>
          00200
          22222
          11211
          22222
          00200
        </LevelDefnComponent>,
        soln : [0,0,4,4,10,14,20,20,24,24]
      },
      {
        boardRepresentation :
        <LevelDefnComponent>
          12121
          21112
          11111
          21112
          12121
        </LevelDefnComponent>,
        soln : [0,2,4,6,8,10,12,14,16,18,20,22]
      },
      {
        boardRepresentation :
        <LevelDefnComponent>
          21112
          10001
          10001
          10001
          21112
        </LevelDefnComponent>,
        soln : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
      }
    ];
  }

  static getBoardAsString(gameLevelIndex : number) : string {
    var retval : string = "";
    if (GameLevel.LEVELS == null) {
        GameLevel.init();
    }
    if (gameLevelIndex == GameLevel.DAILY_RANDOM) {
      let puzzleCreator : PuzzleCreator = new PuzzleCreator();
      let randomPositions : number[] = puzzleCreator.createDailyRandomPositions();
      return puzzleCreator.getInitialBoard(randomPositions);
    } else {
      var jsxString : string = reactElementToJSXString(GameLevel.LEVELS[gameLevelIndex].boardRepresentation);
      //retval = $(jsxString).html();
      retval = jsxString;

      let levelDefnComponentDummy : JSX.Element = <LevelDefnComponent/>
      retval = retval.replace("<LevelDefnComponent>", "");
      retval = retval.replace("</LevelDefnComponent>", "");
      retval = retval.replace(new RegExp(" ", "g"), "");
      retval = retval.replace(new RegExp("\n", "g"), "");
      retval = retval.replace(new RegExp("\r", "g"), "");
    }
    return retval;
  }

}
