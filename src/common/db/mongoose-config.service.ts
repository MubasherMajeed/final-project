import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private username: string = "";
  private password: string = "";

  constructor() {
  }

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      uri: "mongodb+srv://mubashir:123@cluster0.crunx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    };
  }
}
