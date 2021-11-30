import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../../data/schemas/catgory.schema";
import { Model } from "mongoose";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly model: Model<CategoryDocument>) {
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
