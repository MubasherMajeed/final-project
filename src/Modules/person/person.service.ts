import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Http500 } from "../../common/lib/Http500";
import { Person, PersonDocument } from "../../data/schemas/person.schema";
import { InjectModel } from "@nestjs/mongoose";
import { ForgotPassword, ForgotPasswordDocument } from "../../data/schemas/forgotPassword.schema";

@Injectable()
export class PersonService {

  constructor(@InjectModel(Person.name) private readonly model: Model<PersonDocument>,
              @InjectModel(ForgotPassword.name) private readonly forgotPasswordModel: Model<ForgotPasswordDocument>) {
  }

  ///////////////////////////
  // Person Module Routes ///
  ///////////////////////////

  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find().exec();
  }

  async create(data: any) {
    if (await this.model.findOne({ username: data.username })) {
      throw new HttpException(
        "User with this email already exist",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    return this.model.create(data);
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data,{new:true}).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  async fetchByUsername(username: string, password: string): Promise<Person> {
    return await this.model.findOne({ username, password }).exec();
  }

  /////////////////////////////
  // Forgot Password Routes ///
  /////////////////////////////

  async forgotPassword(email: string) {
    const person = await this.model
      .findOne({ username: email })
      .exec() as Person;

    if (person) {
      try {
        // const hash = await NoGeneratorUtils.generateCode();

        // if (await EmailUtils.sendForgotPasswordEmail(person.name, hash, email)) {
        //   await this.forgotPasswordModel.findOneAndDelete({ person: person._id }).exec();
        //   return await this.forgotPasswordModel.create({
        //     _id: new ObjectID().toHexString(),
        //     person: person._id,
        //     hash,
        //   });
        // }
      } catch (error) {
        Http500.throw(error);
      }
    } else {
      throw new HttpException(
        "Email not exists!",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

}
