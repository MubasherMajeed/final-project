import * as fs from "fs";
import * as webpConverter from "webp-converter";
import { Image } from "../../data/schemas/image.schema";

export class ImageUtils {
  static imagePath = process.cwd() + "uploads";

  static async toWebp(
    imagePath: string,
    destination = imagePath,
    quality = 20
  ): Promise<void> {
    await webpConverter.cwebp(imagePath, destination, "-q " + quality);
  }

  static deleteImages(deletedImages: any, fromPathList: boolean): void {
    if (fromPathList) {
      if (Array.isArray(deletedImages)) {
        for (let delImg of deletedImages) {
          fs.unlinkSync(delImg.toString());
        }
      } else {
        fs.unlinkSync(deletedImages.toString());
      }
    } else {
      if (Array.isArray(deletedImages)){
        for (const image of deletedImages) {
          fs.unlinkSync(image.path.toString());
        }
      }
      else
        fs.unlinkSync((deletedImages as Image).path.toString())
    }
  }
}
