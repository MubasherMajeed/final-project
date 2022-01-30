import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class User {
  @ApiProperty()
  @Prop({ unique: true })
  username: string;

  @ApiProperty({ format: "password" })
  @Prop({ select: false })
  password: string;
}
