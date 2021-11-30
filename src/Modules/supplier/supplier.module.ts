import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Supplier, SupplierSchema } from "../../data/schemas/supplier.schema";

@Module({
  imports: [MongooseModule.forFeature([{name:Supplier.name,schema:SupplierSchema}])],
  providers: [SupplierService],
  controllers: [SupplierController]
})
export class SupplierModule {}
