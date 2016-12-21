/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
interface Props {
  style: stylePropType;
  text : string;
}

export class ControlPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    return <span id="controlPanel" style={this.props.style}>
     {this.props.text}
    </span>;
  }
}
