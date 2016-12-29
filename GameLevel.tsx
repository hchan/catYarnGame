/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import * as React from "react"
import * as ReactDOM from 'react-dom';
import stylePropType from 'react-style-proptype';
import reactElementToJSXString from 'react-element-to-jsx-string';


export class GameLevel {
  static LEVELS : JSX.Element [];

  static init() {
    GameLevel.LEVELS = [];
    GameLevel.LEVELS = [
      <span>
        22222
        22022
        20002
        22022
        22222
      </span>,
      <span>
        21212
        11011
        20202
        11011
        21212
      </span>,
      <span>
        00200
        22222
        11211
        22222
        00200
      </span>,
      <span>
        12121
        21112
        11111
        21112
        12121
      </span>,
      <span>
        00000
        00000
        00000
        00000
        00000
      </span>
    ];
  }

  static getBoardAsString(gameLevelIndex : number) : string {
    var retval : string = "";
    if (GameLevel.LEVELS == null) {
        GameLevel.init();
    }
    var jsxString : string = reactElementToJSXString(GameLevel.LEVELS[gameLevelIndex]);
    //retval = $(jsxString).html();
    retval = jsxString;
    retval = retval.replace("<span>", "");
    retval = retval.replace("</span>", "");
    retval = retval.replace(new RegExp(" ", "g"), "");
    retval = retval.replace(new RegExp("\n", "g"), "");
    retval = retval.replace(new RegExp("\r", "g"), "");
    return retval;
  }

}
