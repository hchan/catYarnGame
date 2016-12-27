/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>

export class Settings {
    static KEY : string = "CATYARNGAME";
    gameLevelIndex : number;
    date : Date;

    constructor() {
      this.init();
    }
    init() {
      var localStorageData : string = window.localStorage.getItem(Settings.KEY);


      this.date = new Date();
      if (localStorageData.length === null || localStorageData == "null") {
        this.gameLevelIndex = 0;
      } else {
        $.extend(this, JSON.parse(localStorageData));
      }
      window.localStorage.setItem(Settings.KEY, JSON.stringify(this));

    }
}
