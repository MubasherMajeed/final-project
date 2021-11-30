import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Cart, CartDocument } from "../../data/schemas/cart.schema";
import { Model } from "mongoose";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly model: Model<CartDocument>) {
  }


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
