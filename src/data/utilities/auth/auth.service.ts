import { Injectable } from '@nestjs/common';
import { UserService } from "../../../Modules/user/user.service";
import { User } from "../../schemas/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor( private readonly userService:UserService,private jwtService:JwtService) {
  }

  async validateUser(username:string,pass:string){
    const user = await this.userService.findByEmail(username);
    if (user && user.password === pass){
      const {password, ...result} = user;
      return result;
    }
  }

  async login(user:any){
    const payload ={email:user.email,sub:user._id,role:user.role,phone:user.phone,address:user.address,
      name:user.name
    ,createdAt:user.createdAt,updatedAt:user.updatedAt
    };
    return{
      access_token:this.jwtService.sign(payload),
    };
  }


}
