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


export class GameFooter extends React.Component<Props, {}> {
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

  doInstructions() {
    alert("Instructions Not Implemented Yet")
  }

  doAbout() {
    alert("Not Implemented Either")
  }

  doPlay() {
    Game.beginPlay();
  }

  render() {
    return <div id="game-footer-table">
      <div className="game-table-cell left">
      left
      </div>
      <div className="game-table-cell center">
      middle
      </div>
      <div className="game-table-cell right">
      right
      </div>
    </div>;
  }

}
