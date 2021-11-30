import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Supplier } from './supplier.schema';
import { Product } from './product.schema';

export type PurchasesDocument = Purchases & Document;

@Schema({ timestamps: true })
export class Purchases {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Supplier.name })
  supplierId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: string;
  @Prop()
  quantity: number;
  @Prop()
  purchasePrice: number;
}

export const PurchasesSchema = SchemaFactory.createForClass(Purchases);
