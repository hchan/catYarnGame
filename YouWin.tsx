/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex?: number;
}


export class YouWin extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  // need this like to help with transpile
  refs : {}

  render() {
    return <span className="content">
      <span className="title">You Win!</span>
      <br/><br/>
        Next 
    </span>;
  }

}
