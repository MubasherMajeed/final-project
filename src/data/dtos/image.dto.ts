import { ApiProperty } from "@nestjs/swagger";


export class Image {
  @ApiProperty()
  name:string;
  @ApiProperty()
  path:string;
}
export class SaveImage {
  @ApiProperty({ required: true, type: "string", format: "binary" })
  image: Image;
}
