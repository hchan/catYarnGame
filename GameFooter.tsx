/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
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
    this.getLevelDisplay = this.getLevelDisplay.bind(this);
    this.doHints = this.doHints.bind(this);
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

  doReset() {
    alert("TODO - Reset Board")
  }

  doHints() {
    $('#hintsModal').modal('show');
    this.setState({}); // forces update so that getLevelDisplay will work
  }

  getLevelDisplay() : string {
    return $(".levelSelector option:selected").text();
  }

  getSolvableMoves() : number {
    let levelIndex = parseInt($(".levelSelector option:selected").val());
    return GameLevel.LEVELS[levelIndex].soln.length;
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
        <div className="modal fade" id="hintsModal"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display:'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Hints - {this.getLevelDisplay()}</h4>
              </div>
              <div className="modal-body">
                <p id="hintsBody">These hints are only applicable when the board has been set to its inital state</p>
                <p><span className="levelDisplay">{this.getLevelDisplay()}</span>, can be solved in
                  <span className="solvableMoves">{this.getSolvableMoves()}</span> moves
                </p>
              </div>
             </div>
            </div>
        </div>
      </div>
    </div>;
  }

}
