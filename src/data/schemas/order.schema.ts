import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Person } from "./person.schema";

export enum OrderStatus {
  Shipped,
  Delivered,
  Pending,
  Canceled,
  Rejected,
  Packed,
}

export enum PaymentType {
  CashOnDelivery,
  Online,
}


export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person.name })
  userId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: string;
  @Prop()
  quantity: number;
  @Prop()
  paymentType: number;
  @Prop()
  orderStatus: number;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zipCode: number;
  @Prop()
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
