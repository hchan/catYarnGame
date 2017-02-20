import {Game} from './Game'
import {Cell} from './Cell'
export class SoundHelper {
  static DIR : string = "snd";

  populate() {
      Game.SOUND_LOCATIONS.push(SoundHelper.DIR + "/" + "meow.mp3");
  }


}
