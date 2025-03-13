import {Game} from './Game'
import {Cell} from './Cell'
import {ImageHelper} from './ImageHelper'
export class SoundHelper {
  static DIR : string = ImageHelper.BASE_PATH + "snd";

  populate() {
      Game.SOUND_LOCATIONS.push(SoundHelper.DIR + "/" + "meow.mp3");
      Game.SOUND_LOCATIONS.push(SoundHelper.DIR + "/" + "youWin.mp3");
  }


}
