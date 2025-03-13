import {Game} from './Game'
import {Cell} from './Cell'
import {ImageHelper} from './ImageHelper'
export class SoundHelper {
  static DIR : string = "snd";

  populate() {
      Game.SOUND_LOCATIONS.push(ImageHelper.BASE_PATH + SoundHelper.DIR + "/" + "meow.mp3");
      Game.SOUND_LOCATIONS.push(ImageHelper.BASE_PATH + SoundHelper.DIR + "/" + "youWin.mp3");
  }


}
