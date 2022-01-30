import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({_id: false})
export class Image {
  @ApiProperty()
  @Prop()
  name: String

  @ApiProperty()
  @Prop()
  path: String
}

@Schema({_id: false})
export class Video {
  @ApiProperty()
  @Prop()
  name: String

  @ApiProperty()
  @Prop()
  path: String

  @ApiProperty({ type: Image })
  @Prop()
  thumbnail: Image
}