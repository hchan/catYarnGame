/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {

}


export class Welcome extends React.Component<Props, {}> {
  title : string;
  constructor() {
    super();
    this.title = $("title").text();
  }

  // need this like to help with transpile
  refs : {}

  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  render() {
    return <div id="welcome">
      <span id="welcome-left">{' '}</span>
      <span className="description">
        Meet Oomi!<br/>
        Much sad,<br/>
        need yarn.<br/>
        Please help.
      </span>
      <img src="img/cat0.png" className="meetOomi"/>
      <span id="welcome-right">{' '}</span>
    </div>;
  }

}
