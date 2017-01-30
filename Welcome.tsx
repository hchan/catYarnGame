/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {

}


export class Welcome extends React.Component<Props, {}> {
  title : string;
  constructor() {
    super();
    this.title = $("title").text();
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

  render() {
    return <div id="welcome">
      <span id="welcome-left">{' '}</span>
        <span className="description">

          <img src="img/cat0.png" id="meetOomiImg"/>
          <span className="text">
          Meet Oomi!<br/>
          Much sad,<br/>
          need yarn.<br/>
          Please help.
          </span>
          <br/>
          <span className="buttonContainer">
            <span className="buttonTableContainer">
              <span className="buttonFiller">{' '}</span>
                <input type="button" id="instructionsBtn"
                onClick={this.doInstructions}
                className="btn-primary welcome-btn" value="Instructions"/>
              <span className="buttonFiller">{' '}</span>
            </span>
          </span>
          <span className="buttonContainer">
            <span className="buttonTableContainer">
              <span className="buttonFiller">{' '}</span>
                <input type="button" id="aboutBtn" className="btn-primary welcome-btn"
                onClick={this.doAbout}
                value="About"/>
              <span className="buttonFiller">{' '}</span>
            </span>
          </span>

          <input type="button" id="playBtn" className="btn-primary welcome-btn"
          onClick={this.doPlay}
          value="Play"/>
        </span>

      <span id="welcome-right">{' '}</span>
    </div>;
  }

}
