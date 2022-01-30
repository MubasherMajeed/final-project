import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Document } from 'mongoose';
import { Person } from "./person.schema";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person.name })
  userId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  ProductId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
