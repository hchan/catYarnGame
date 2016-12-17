export class ControlPanel {
  jQuerySelector : any;
  constructor (width : number, height : number) {
    var controlPanel = $("<span id='controlPanel'/>")
    controlPanel.html("Controls")
    controlPanel.css({
      "vertical-align": "top",
      width: width-height,
      display: "table-cell",
      "background-color" : "red"
    });
    this.jQuerySelector = controlPanel;
  }
}
