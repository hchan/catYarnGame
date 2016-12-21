/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import * as React from "react"
import * as DOM from 'react-dom';
interface Props {
  foo: string;
}

export class ControlPanel extends React.Component<Props, {}> {
  render() {
    return <span id="controlPanel" style={{width:20, height:10}}>X</span>
  }
}
