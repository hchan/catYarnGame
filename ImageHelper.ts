import {Game} from './Game'
import {Cell} from './Cell'
export class ImageHelper {
  static BASE_PATH : string = "../catYarnGame/";
  static MOBILE_DIR : string = ImageHelper.BASE_PATH + "img";
  static LARGE_DIR : string = ImageHelper.BASE_PATH + "imgLarge";
  populate() {
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat0" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat1" + Cell.IMAGENAME_SUFFIX);
      Game.IMAGE_LOCATIONS.push(ImageHelper.getImageDir() + "/" + "cat2" + Cell.IMAGENAME_SUFFIX);
  }

  static getImageDir() : string {
    var url = window.location.href;
    if (url.indexOf("file://") != -1) {
      ImageHelper.BASE_PATH = "";
      this.MOBILE_DIR = ImageHelper.BASE_PATH + "img";
      this.LARGE_DIR = ImageHelper.BASE_PATH + "imgLarge";
    }
    console.log(ImageHelper.LARGE_DIR);
    if (Game.MOBILE) {
      return ImageHelper.MOBILE_DIR;
    } else {
      return ImageHelper.LARGE_DIR;
    }
  }


}
