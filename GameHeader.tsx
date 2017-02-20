/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {Instructions} from './Instructions';
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



  doAbout() {
    alert("Not Implemented Either")
  }

  doPlay() {
    Game.beginPlay();
  }

  doInstructions() {
    $('#instructionsModal').modal('show');
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
        <input type="image" src="img/info.png" id="info" onClick={this.doInstructions}/>
        <Instructions {...this.props}/>
      </div>
    </div>;
  }

}
