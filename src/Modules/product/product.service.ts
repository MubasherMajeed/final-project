import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from "../../data/schemas/product.schema";
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}


  async fetch(id?: string) {
    if (id) {
      return this.model.findById(id);
    }
    return await this.model
      .find()
      .exec();
  }


  async delete(uId:string){
    return this.model.findByIdAndDelete(uId);
  }

  async add(data: any) {
    const user = await this.model.create(data);
    return user.save();
  }

  async update(uid:string, data:any){
    return this.model.findByIdAndUpdate(uid, data);
  }


}
