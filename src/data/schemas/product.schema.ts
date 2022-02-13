import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from './catgory.schema';
import { Supplier } from './supplier.schema';
import { SubCategory } from "./sub-category.schema";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  rating: number;
  @Prop()
  quantity: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SubCategory.name })
  categoryId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Supplier.name })
  supplierId: string;
  @Prop()
  color: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
