/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex: number;
}


export class GameHeader extends React.Component<Props, {}> {
  state : Props;
  title : string;
  constructor(props) {
    super(props);
    this.state = {levelIndex : 0};
    //$.extend(this.state, this.props);
  }

  // need this like to help with transpile
  refs : {}


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
    return <div className="game-row">
      <div className="game-table-cell left">
      left
      </div>
      <div className="game-table-cell center">
      <LevelSelector levelIndex={this.state.levelIndex}/>
      </div>
      <div className="game-table-cell right">
      right
      </div>
    </div>;
  }

}
