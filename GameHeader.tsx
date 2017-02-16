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
  changeLevel : Function;
}


export class GameHeader extends React.Component<Props, {}> {
  state : Props;
  title : string;
  constructor(props) {
    super(props);
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

  doInfo() {
    alert("TODO - show Info ... info buttons are usually top right corner right?");
  }

  doHome() {
    alert("TODO - should this go to welcome page?");
  }

  render() {
    return <div className="game-row">
      <div className="game-table-cell left">
        <input type="image" src="img/home.png" id="info" onClick={this.doHome}/>
      </div>
      <div className="game-table-cell center">
        <LevelSelector levelIndex={this.props.levelIndex} changeLevel={this.props.changeLevel}/>
      </div>
      <div className="game-table-cell right">
        <input type="image" src="img/info.png" id="info" onClick={this.doInfo}/>
      </div>
    </div>;
  }

}
