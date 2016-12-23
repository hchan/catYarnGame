import {Game} from './Game'
export class ImageHelper {
  static DIR : string = "img";

  populate() {
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat0.jpg")
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat1.jpg")
      Game.IMAGE_LOCATIONS.push(ImageHelper.DIR + "/" + "cat2.jpg")
  }


}
