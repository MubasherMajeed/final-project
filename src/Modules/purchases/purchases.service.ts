import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Purchases, PurchasesDocument } from "../../data/schemas/purchases.schema";
import { Model } from "mongoose";

@Injectable()
export class PurchasesService {
  constructor(@InjectModel(Purchases.name) private readonly model:Model<PurchasesDocument>) {
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
