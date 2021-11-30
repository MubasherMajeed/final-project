import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Supplier, SupplierDocument } from "../../data/schemas/supplier.schema";
import { Model } from "mongoose";

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private readonly model:Model<SupplierDocument>) {
  }
  async fetch(id?: string) {
    if (id) {
      return this.model.findById(id);
    }
    return await this.model
      .find()
      .sort({
        name: 'DESC',
      })
      .exec();
  }

  async search(data:any){
    return this.model.find({
      email:{$regex : data.email}
    }).exec();
  }

  async delete(uId:string){
    return this.model.findByIdAndDelete(uId);
  }

  async add(data: any) {
    const emailCheck = await this.model.findOne({
      email: data.email,
    });
    if (emailCheck) {
      throw new HttpException(
        'Supplier with this email already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const user = await this.model.create(data);
    return user.save();
  }

  async update(uid:string, data:any){
    return this.model.findByIdAndUpdate(uid, data);
  }


}
