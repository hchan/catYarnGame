import {Game} from './Game'
import {Cell} from './Cell'
export class ImageHelper {
  static DIR : string = "img";

  populate() {
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat0" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat1" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat2" + Cell.IMAGENAME_SUFFIX);
  }


}
