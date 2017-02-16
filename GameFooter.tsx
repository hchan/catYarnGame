/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
import {Hints} from './Hints';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
    levelIndex?: number;
}


export class GameFooter extends React.Component<Props, {}> {
  title : string;

  constructor(props) {
    super(props);
    this.doHints = this.doHints.bind(this);
    this.doReset = this.doReset.bind(this);
  }

  // need this like to help with transpile
  refs : {}


  doHints() {
    $('#hintsModal').modal('show');
    this.setState({}); // forces update so that getLevelDisplay will work
  }

  doReset() {
    alert("Do Reset")
  }


  render() {
    return <div className="game-row">
      <div className="game-table-cell left">
        <input type="image" src="img/reset.png" id="info" onClick={this.doReset}/>
      </div>
      <div className="game-table-cell center">
        <span id="movesContainer">
          <span>Moves:   </span>
          <span id="movesCount">0</span>
        </span>
      </div>
      <div className="game-table-cell right">
        <input type="image" src="img/hints.png" id="info" onClick={this.doHints}/>
        <Hints levelIndex={this.props.levelIndex}/>
      </div>
    </div>;
  }

}
