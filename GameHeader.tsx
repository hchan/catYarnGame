/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class GameHeader extends React.Component<GameProps, GameProps> {
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
    window.location.hash = '';
    Game.instance.doWelcome();
  }

  render() {
    return <div className="game-row">
      <div className="game-table-cell left">
        <input type="image" src="img/home.png" id="info" onClick={this.doHome}/>
      </div>
      <div className="game-table-cell center">
        <LevelSelector {...this.props}/>
      </div>
      <div className="game-table-cell right">
        <input type="image" src="img/info.png" id="info" onClick={this.doInfo}/>
      </div>
    </div>;
  }

}
