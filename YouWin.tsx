/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {MoveCount, Props} from './MoveCount';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {

}


export class YouWin extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  // need this like to help with transpile
  refs : {}

  close() {
    console.log("CLOSE");
    $("#youWinModal").modal("hide");
  }

  render() {
    console.log("IN RENDER")
    var imgStyle = {
      height:200
    };
    return <div className="modal fade game-modal" id="youWinModal"  role="dialog" aria-labelledby="myModalLabel" >
      <div className="vertical-alignment-helper">
        <div className="modal-dialog vertical-align-center" role="document">
          <div className="modal-content-small">
                <div className="modal-body">
                  <p id="youWin" style={imgStyle}>
                    <input type="image" style={imgStyle} src="img/goodJob.png" id="info" onClick={this.close}/>
                  </p>
                </div>
         </div>
       </div>
      </div>
    </div>;
  }

  componentDidMount ()  {
    console.log("did mount")
  }

}
