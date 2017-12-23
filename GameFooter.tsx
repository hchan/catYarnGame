/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {LevelSelector} from './LevelSelector';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
import {ImageHelper} from './ImageHelper';
import {Hints} from './Hints';
import {YouWin} from './YouWin';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class GameFooter extends React.Component<GameProps, {}> {
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
    this.setState({}); // forces update so that Hints.getLevelDisplay will work
  }

  doReset() {
    Game.instance.canvasBoard.loadBoardAndDraw();
    Game.resetMoves();
  }


  render() {
    return <div className="game-row">
      <div className="game-table-cell left">
        <input type="image" src={ImageHelper.getImageDir() + "/reset.png"}  id="info" onClick={this.doReset}/>
      </div>
      <div className="game-table-cell center">
        <span id="movesContainer">
          <span>Moves:   </span>
          <span id="movesCount">0</span>
        </span>
      </div>
      <div className="game-table-cell right">
        <input type="image" src={ImageHelper.getImageDir() + "/hints.png"} id="info" onClick={this.doHints}/>
        <Hints {...this.props}/>
      </div>
      <YouWin/>
    </div>;
  }



}
