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
  constructor() {
    super();
  }

  // need this like to help with transpile
  refs : {}

  render() {
    return <span className="content">
      <span className="title">Level {this.props.levelIndex+1}</span>
      <br/><br/>
      Number of moves : <span id="moveCount">{this.props.moves}</span>
      <br/><br/>
        Next
    </span>;
  }

}
