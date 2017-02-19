/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {LevelSelector} from './LevelSelector';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
import {GameHeader} from './GameHeader';
import {GameFooter} from './GameFooter';
import {Hints} from './Hints';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class GameComponent extends React.Component<GameProps, GameProps> {

  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    //$.extend(this.state, this.props);

    this.state = {
      levelIndex : this.props.levelIndex,
      changeLevel : this.changeLevel
    };
    
  }


  // need this like to help with transpile
  refs : {}

  changeLevel(e : React.FormEvent) {
      let target : HTMLSelectElement = e.target as HTMLSelectElement;
      let newLevelIndex : number = parseInt(target.value);
      this.setState({
        levelIndex : newLevelIndex
      })
      $("#movesCount").html("0");
  }

  render() {
    return <span id='game'>
       <span id='game-header'>
        <GameHeader {...this.state} />
       </span>
       <span id='game-body'/>
       <span id='game-footer'>
        <GameFooter {...this.state}/>
       </span>
      </span>;
  }

}
