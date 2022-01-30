import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './Modules/product/product.module';
import { CartModule } from "./Modules/cart/cart.module";
import { CategoriesModule } from "./Modules/categories/categories.module";
import { OrderModule } from "./Modules/order/order.module";
import { PurchasesModule } from "./Modules/purchases/purchases.module";
import { SupplierModule } from "./Modules/supplier/supplier.module";
import { DbModule } from "./common/db/db.module";
import { AuthModule } from "./common/auth/auth.module";
import { PersonModule } from "./Modules/person/person.module";
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from "@nestjs/platform-express";
import { ImageUtils } from "./common/lib/image-utils";


@Module({
  imports: [DbModule,
    ConfigModule.forRoot(),
    AuthModule,
    CartModule,
    CategoriesModule,
    OrderModule,
    PurchasesModule,
    SupplierModule,
    PersonModule,
    ProductModule,
    MulterModule.register({
      dest: ImageUtils.imagePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
