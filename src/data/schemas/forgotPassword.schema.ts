import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Person } from "./person.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema({ timestamps: true })
export class ForgotPassword {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person.name, required: true })
  person: string;

  @Prop({ required: true })
  hash: string;
}

export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
