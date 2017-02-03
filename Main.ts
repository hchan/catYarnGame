/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="node_modules/@types/bootstrap/index.d.ts"/>
import {Game} from './Game'

import * as $ from "jquery";

window['$'] = $;
window['jQuery'] = $;
import "bootstrap";

$().ready(function() {
  var game : Game = new Game();
});
