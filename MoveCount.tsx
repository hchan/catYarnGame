/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
/// <reference path="node_modules/@types/bootstrap/index.d.ts"/>
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
    state.moves = 0;
    this.setState(state);
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    let state : Props = this.state;
    state.moves = 0;
    state.levelIndex = gameLevelIndex;
    this.setState(state);
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  instructions(e) {
    Game.instance.restart();
  }

  hints(e) {
    $('#myModal').modal('show');
    $('.modal-content').css('height', "97%");

  }

  getLevel() : number {
    let retval : number = this.state.levelIndex;
    retval++;
    return retval;
  }

  getTitle() : string {
    if (this.state.levelIndex == LevelSelector.DAILY_RANDOM) {
      return "Daily Random";
    } else {
      return "Level " + this.getLevel();
    }
  }

  render() {
    return <span className="content">
      <span className="title">{this.getTitle()}</span>
      <br/><br/>
      Number of moves : <span id="moveCount">{this.state.moves}</span>
      <br/><br/>
      <input type="button" value="Reset" onClick={this.reset}/>
      <input type="hidden" onChange={this.change}/>
      <LevelSelector change={this.changeLevel} levelIndex={this.state.levelIndex}/>
      <input type="button" className="btn btn-info btn-lg topRight" value="Hints" onClick={this.hints}/>
      <input type="button" value="Instructions" onClick={this.instructions}
      className="bottomLeft"/>
      <div className="modal fade" id="myModal"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display:'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">

            Hello
           </div>
        </div>
      </div>
    </span>;
  }

}
