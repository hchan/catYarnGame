/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  style?: stylePropType;
  body : React.Component<any, any>;
}


export class ControlPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  static initialBody =
  <div className="content">
    <span className="title">Cat Yarn Puzzle</span>
    <br/><br/>
    <span className="description">The goal of this game is
    to give every cat on each tile exactly <span style={{"font-weight":"bold"}}>2</span> yarn balls.
    Clicking on a tile will drop a yarn on that tile in addition to
    its orthogonally adjacent  (up,right,down,left) tiles where applicable.
    If a tile already contains 2 yarn balls, the cat on that tile will make a mess of
    the yarn and henceforth be left with no yarn balls.
    <br/><br/>
    Good luck!
    </span>
  </div>;

  render() {
    return <span id="controlPanel" style={this.props.style}>
     {this.props.body}
    </span>;
  }
}
