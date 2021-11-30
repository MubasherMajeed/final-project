import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Modules/user/user.module';
import { ProductModule } from './Modules/product/product.module';
import { CartModule } from "./Modules/cart/cart.module";
import { CategoriesModule } from "./Modules/categories/categories.module";
import { OrderModule } from "./Modules/order/order.module";
import { PurchasesModule } from "./Modules/purchases/purchases.module";
import { SupplierModule } from "./Modules/supplier/supplier.module";
import { AuthModule } from "./data/utilities/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/elecromate'),
    CartModule,
    CategoriesModule,
    OrderModule,
    PurchasesModule,
    SupplierModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
