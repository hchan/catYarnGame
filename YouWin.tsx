/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {MoveCount, Props} from './MoveCount';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex?: number;
}


export class YouWin extends MoveCount {
  constructor(props) {
    super(props);
  }

  // need this like to help with transpile
  refs : {}


  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    let state : Props = this.state;
    state.moves = 0;
    state.levelIndex = gameLevelIndex;
    this.setState(state);
    Game.instance.renderControlPanel({body:<MoveCount levelIndex={Game.instance.settings.gameLevelIndex} moves={0}/>});
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  render() {
    return  <span className="content">
      <span className="title">You Win!</span>
      <br/><br/>
      Number of moves : <span id="moveCount">{this.state.moves}</span>
      <br/><br/>
      <LevelSelector changeLevel={this.changeLevel} levelIndex={this.state.levelIndex}/>
      <input type="button" value="Instructions" onClick={this.instructions} className="bottomLeft"/>
    </span>;
  }

}
