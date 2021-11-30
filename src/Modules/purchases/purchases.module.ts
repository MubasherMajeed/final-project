import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Purchases, PurchasesSchema } from "../../data/schemas/purchases.schema";

@Module({
  imports: [MongooseModule.forFeature([{name:Purchases.name,schema:PurchasesSchema}])],
  providers: [PurchasesService],
  controllers: [PurchasesController]
})
export class PurchasesModule {}
