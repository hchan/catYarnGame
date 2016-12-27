/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
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
    this.reset = this.reset.bind(this);
    this.state = {};
    $.extend(this.state, this.props);
  }


  // need this like to help with transpile
  refs : {}

  change(e) {
    console.log("change")
    let state : Props = this.state;
    state.moves++;
    this.setState(state);
  }

  reset(e) {
    let state : Props = this.state;
    state.moves = 1;
    this.setState(state);
  }


  render() {
    return <span className="content">
      <span className="title">Level {this.props.levelIndex+1}</span>
      <br/><br/>
      Number of moves : <span id="moveCount">{this.state.moves}</span>
      <br/><br/>
      <input type="text" onChange={this.change}/>
      <input type="button" value="Reset" onClick={this.reset} className="bottomRight"/>
    </span>;
  }

}
