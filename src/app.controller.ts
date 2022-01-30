import { Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiOkResponse, ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { LoginDto } from "./data/dtos/dto";
import { AuthService } from "./common/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUtils } from "./common/lib/image-utils";
import { Http500 } from "./common/lib/Http500";
import { SaveImage } from "./data/dtos/image.dto";
import { Image } from "./data/schemas/image.schema";

@ApiTags("Main")
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getHello(): string {
    return "Hello from the server side";
  }

  // ----------------------------------------- Save Image ---------------------------------------------//
  @ApiCreatedResponse({ type: Image, description: "Image Saved Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiBody({ type: SaveImage })
  @ApiConsumes("multipart/form-data")
  @Post("save-image")
  @UseInterceptors(FileInterceptor("image"))
  saveImage(@UploadedFile() file): any {
    console.log(file);
    return { name: file.filename, path: file.path };
  }

  // ----------------------------------------- delete Image ---------------------------------------------//
  @ApiOkResponse({ description: "Image deleted Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiParam({
    name: "name",
    type: "String",
    required: true
  })
  @Post("delete-image/:name")
  deleteImage(@Param("name") name: string): any {
    const imagePath = ImageUtils.imagePath + "/" + name;
    try {
      return ImageUtils.deleteImages(imagePath, true);
    } catch (error) {
      Http500.throw(error);
    }
  }

}
