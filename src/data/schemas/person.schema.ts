import { Document } from "mongoose";
import { Image } from "./image.schema";
import { User } from "../../common/auth/users/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
  user,
  Admin
}

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person extends User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;

  @Prop()      
  image: Image;

  @Prop()
  address: string;

  @Prop()
  token: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
