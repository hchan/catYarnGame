/// <reference path="node_modules/@types/jquery/index.d.ts"/>
import {Game} from './Game'

$().ready(function() {
  window['jQuery'] = window['$'] = jQuery;
  var game : Game = new Game();
});
