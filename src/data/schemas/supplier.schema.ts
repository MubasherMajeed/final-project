import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
