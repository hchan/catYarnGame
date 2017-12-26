import {Game} from './Game'
import {Cell} from './Cell'
export class ImageHelper {
  static MOBILE_DIR : string = "img";
  static LARGE_DIR : string = "../imgLarge";
  populate() {
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat0" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat1" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat2" + Cell.IMAGENAME_SUFFIX);
  }

  static getImageDir() : string {
    if (Game.MOBILE) {
      return ImageHelper.MOBILE_DIR;
    } else {
      return ImageHelper.LARGE_DIR;
    }
  }


}
