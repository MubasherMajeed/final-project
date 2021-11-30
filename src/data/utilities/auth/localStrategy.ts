import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private Auth:AuthService) {
    super();
  }

  async validate(username:string,password:string){
    const user = this.Auth.validateUser(username,password);
    if (!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}