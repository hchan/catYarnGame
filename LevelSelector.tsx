/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {GameLevel} from './GameLevel';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {
  levelIndex?: number;
  moves? : number;
  change : React.EventHandler<any>;
}


export class LevelSelector extends React.Component<Props, {}> {
  state : Props;
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = { change : null};
    $.extend(this.state, this.props);
  }


  // need this like to help with transpile
  refs : {}

  changeLevel(e : React.FormEvent) {
    let target : HTMLSelectElement = e.target as HTMLSelectElement;
    let gameLevelIndex = target.value;
    this.props.change(gameLevelIndex)
  }



  getLevels() : JSX.Element[] {
      let retval : JSX.Element[] = [];
      for (let i = 0; i < GameLevel.LEVELS.length; i++) {

        retval.push(<option value={i} key={i}>Level {i+1}</option>);
      }
      return retval;
  }
  render() {
    return <span className="bottomRight">
             <select onChange={this.changeLevel} value={this.state.levelIndex}>
              {this.getLevels()}
             </select>
           </span>;
  }

}
