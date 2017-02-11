
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {CanvasBoard} from './CanvasBoard'
import {ControlPanel, Props} from './ControlPanel'
import {Cell, CellState} from './Cell'
import {Board} from './Board'
import {ImageHelper} from './ImageHelper'
import {GameLevel} from './GameLevel'
import {Settings} from './Settings'
import {Instructions} from './Instructions'
import {Welcome} from './Welcome'
import {GameHeader} from './GameHeader'
import {GameFooter} from './GameFooter'
import * as React from "react"
import * as ReactDOM from 'react-dom';

export enum PaddingDirection {
  HORIZONTAL,
  VERTICAL
}
