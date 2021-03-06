/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameLevel} from './GameLevel';
import {GameFooter} from './GameFooter';
import {GameProps} from './GameProps';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class LevelSelector extends React.Component<GameProps, {}> {
  static DAILY_RANDOM : number = -1;
  static DAILY_RANDOM_TEXT : string = "Daily Random";
  
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
  }


  // need this like to help with transpile
  refs : {}

  changeLevel(e : React.FormEvent) {
    let target : HTMLSelectElement = e.target as HTMLSelectElement;
    let gameLevelIndex : number = parseInt(target.value);
    //this.setState( {levelIndex : parseInt(gameLevelIndex)} as Props);
    //this.props.change(gameLevelIndex)
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
  //  let state : Props = this.state;
    //state.moves = 0;
  //  state.levelIndex = gameLevelIndex;
    //this.setState(state);
    Game.instance.canvasBoard.loadBoardAndDraw();
  //  Game.replaceElement("game-footer",<GameFooter/>);
  //  Game.instance.resizeGameHeaderAndFooter();
  //  Game.instance.fixFontSize();
    this.props.changeLevel(e);
  }



  getLevels() : JSX.Element[] {
      let retval : JSX.Element[] = [];
      if (GameLevel.LEVELS == null) {
          GameLevel.init();
      }
      for (let i = 0; i < GameLevel.LEVELS.length; i++) {
        retval.push(<option value={i} key={i}>Level {i+1}</option>);
      }
      retval.push(<option value={GameLevel.DAILY_RANDOM} key={GameLevel.DAILY_RANDOM}>{LevelSelector.DAILY_RANDOM_TEXT}</option>);
      return retval;
  }
  render() {
    return <span className="levelSelector">
             <select className="form-control" onChange={this.changeLevel} value={this.props.levelIndex}>
              {this.getLevels()}
             </select>
           </span>;
  }

}
