/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameProps} from './GameProps';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';


export class Instructions extends React.Component<GameProps, {}> {
  constructor(props) {
    super(props);
  }

  // need this like to help with transpile
  refs : {}


  render() {
    return <div className="modal fade game-modal" id="instructionsModal"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display:'none'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button id="closeInstructions" type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 id="closeInstructionsHeader" className="modal-title">Instructions</h4>
                </div>
                <div className="modal-body">
                  <p id="instructionsBody">
                  The goal of this game is
                  to give every cat on each tile exactly <span style={{"fontWeight":"bold"}}>2</span> yarn balls.
                  Clicking on a tile will drop a yarn on that tile in addition to
                  its orthogonally adjacent  (up,right,down,left) tiles where applicable.
                  If a tile already contains 2 yarn balls, the cat on that tile will make a mess of
                  the yarn and henceforth be left with no yarn balls.
                  <span style={{"fontWeight":"bold"}}> Good luck!</span>
                  </p>
                </div>
               </div>
              </div>
          </div>;
        }

}
