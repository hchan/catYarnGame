/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {PuzzleCreator} from "./PuzzleCreator";
import {LevelDefnComponent} from "./LevelDefnComponent";
import * as React from "react"
import * as ReactDOM from 'react-dom';
import stylePropType from 'react-style-proptype';
import reactElementToJSXString from 'react-element-to-jsx-string';

export interface LevelDefn {
  boardRepresentation : JSX.Element;
  hints? : string[];
  soln : number[];
}
