/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  style?: stylePropType;
  body : JSX.Element;
}


export class ControlPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  // need this like to help with transpile
  refs : {}


  render() {
    return <span id="controlPanel" style={this.props.style}>
     {this.props.body}
    </span>;
  }
}
