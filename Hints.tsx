/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import {LevelDefn} from './LevelDefn';
import {PuzzleCreator} from './PuzzleCreator';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
import {GameFooter} from './GameFooter';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex? : number
  revealIndex? : number
}


export class Hints extends React.Component<Props, Props> {
  title : string;

  constructor(props) {
    super(props);
    this.state = {
        levelIndex : this.props.levelIndex,
        revealIndex : 0
    }
    this.getMoves = this.getMoves.bind(this);
    this.revealNext = this.revealNext.bind(this);
  }


  // need this like to help with transpile
  refs : {}


  getLevelDisplay() : string {
    let retval : string = "Level ";
    if (this.props.levelIndex == LevelSelector.DAILY_RANDOM) {
      retval = LevelSelector.DAILY_RANDOM_TEXT;
    } else {
      retval += (this.props.levelIndex+1);
    }
    return retval;
  }

  getSolvableMoves() : number {
    if (this.props.levelIndex == LevelSelector.DAILY_RANDOM) {
      return PuzzleCreator.DEFAULT_NUM_MOVES;
    } else {
      return GameLevel.LEVELS[this.props.levelIndex].soln.length;
    }
  }

  componentWillReceiveProps (newProps : Props) {
    if (!(newProps.levelIndex == this.props.levelIndex)) {
      this.setState({
          revealIndex : 0
      })
    }
  }

  getMoves() : JSX.Element[] {
    let retval : JSX.Element[] = new Array<JSX.Element>();
    let levelDefn : LevelDefn = null;
    if (this.props.levelIndex != LevelSelector.DAILY_RANDOM) {
      levelDefn =  GameLevel.LEVELS[this.props.levelIndex]
    } else {
      let puzzleCreator : PuzzleCreator = new PuzzleCreator();
      levelDefn = puzzleCreator.createLevelDefn();
    }

    for (let i = 0; i < levelDefn.soln.length; i++) {
      let solnIndex : number = levelDefn.soln[i];
      if (i <= this.state.revealIndex) {
        retval.push(<li key={i} className="solnIndex">{solnIndex+1}</li>);
      } else {
        let revealLink : JSX.Element = null;
        if (i == this.state.revealIndex+1) {
          revealLink = <a onClick={this.revealNext}>Reveal</a>;
        }
        retval.push(<li key={i} className="solnIndex">? {revealLink}</li>);
      }
    }
    return retval;
  }

  revealNext() {
    let newRevealIndex = this.state.revealIndex+1;
    this.setState ({
      revealIndex : newRevealIndex
    })
  }

  render() {
    return <div className="modal fade game-modal" id="hintsModal"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display:'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button id="hintsCloseButton" type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 id="hintsCloseHeader" className="modal-title">Hints - {this.getLevelDisplay()}</h4>
              </div>
              <div className="modal-body">
                <p id="hintsBody">These hints are only applicable when the board has been set to its inital state</p>
                <p><span className="levelDisplay">{this.getLevelDisplay()}</span>, can be solved in&nbsp;
                  <span className="solvableMoves">{this.getSolvableMoves()}</span> moves
                </p>
                <ol style={{"marginLeft":"20px"}}>
                  {this.getMoves()}
                </ol>
              </div>
             </div>
            </div>
        </div>;
  }
}
