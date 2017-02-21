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


export class LevelDefnComponent extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
  }

  // need this like to help with transpile
  refs : {}


  render() {
    return <span></span>;
  }

}
