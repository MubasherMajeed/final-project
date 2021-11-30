import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum UserRole {
  User,
  Admin

}

export type UserDocument= User&Document;

@Schema({ timestamps : true})
export class User {
  @Prop()
  name:string;
  @Prop()
  email:string;
  @Prop()
  password:string;
  @Prop()
  role:number;
  @Prop()
  phone:string;
  @Prop()
  address:string;
}

export const UserSchema = SchemaFactory.createForClass(User);


