import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  ProductId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);