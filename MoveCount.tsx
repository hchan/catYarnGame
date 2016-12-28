/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex?: number;
  moves? : number;
}


export class MoveCount extends React.Component<Props, {}> {
  state : Props;
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {};
    $.extend(this.state, this.props);
    console.log(this.state)
  }


  // need this like to help with transpile
  refs : {}

  change(e) {
    let state : Props = this.state;
    state.moves++;
    this.setState(state);
  }

  reset(e) {
    let state : Props = this.state;
    state.moves = 1;
    this.setState(state);
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    let state : Props = this.state;
    state.moves = 1;
    state.levelIndex = gameLevelIndex;
    this.setState(state);
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  getLevel() : number {
    let retval : number = this.state.levelIndex;
    retval++;
    return retval;
  }

  render() {
    return <span className="content">
      <span className="title">Level {this.getLevel()}</span>
      <br/><br/>
      Number of moves : <span id="moveCount">{this.state.moves}</span>
      <br/><br/>
      <input type="hidden" onChange={this.change}/>
      <LevelSelector change={this.changeLevel} levelIndex={this.state.levelIndex}/>
      <input type="button" value="Reset" onClick={this.reset} className="bottomLeft"/>
    </span>;
  }

}
