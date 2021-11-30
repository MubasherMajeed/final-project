import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../data/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findByEmail(username:string){
    return this.model.findOne({ email: username });

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
        'User with this email already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if(!data.role){
      data.role=0;
    }
    const user = await this.model.create(data);
    return user.save();
  }

  async update(uid:string, data:any){
    return this.model.findByIdAndUpdate(uid, data);
  }


}
