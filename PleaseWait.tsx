/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {LevelSelector} from './LevelSelector';
import {MoveCount} from './MoveCount';
import {GameLevel} from './GameLevel';
import {Hints} from './Hints';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class PleaseWait extends React.Component<{}, {}> {

  static PLEASEWAITTEXT: string = "Please Wait";
  static ANIMATELOADINGLOOPCOUNT: number = 0;
  static ANIMATELOADINGINTERVALID: number;
  constructor(props) {
    super(props);
    this.animateLoading();
  }

  // need this like to help with transpile
  refs : {}

  animateLoading() {
      PleaseWait.ANIMATELOADINGINTERVALID = self.setInterval(function() {
          var indexOfAnimation: number = PleaseWait.ANIMATELOADINGLOOPCOUNT % PleaseWait.PLEASEWAITTEXT.length;
          var preText: string = PleaseWait.PLEASEWAITTEXT.substring(0, indexOfAnimation);
          var postText: string = PleaseWait.PLEASEWAITTEXT.substring(indexOfAnimation + 1);
          $("#pleaseWait").html(preText + "." + postText);
          PleaseWait.ANIMATELOADINGLOOPCOUNT++;
      }, 1000);
  }

  render() {
    return <span id='game'>
       <span id='game-header'>
       </span>
       <span id='game-body'>
        <div id='loading'>
          <div id='pleaseWait'>
          {PleaseWait.PLEASEWAITTEXT}
          </div>
        </div>
       </span>
       <span id='game-footer'>
       </span>
      </span>;
  }

}
