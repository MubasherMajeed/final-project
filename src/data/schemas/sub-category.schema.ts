import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Category } from "./catgory.schema";

export type SubCategoryDocument = SubCategory & Document;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:Category.name})
  category_id:string;
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
