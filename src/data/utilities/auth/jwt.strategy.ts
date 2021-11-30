import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConstant } from "./constant";


export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstant.secret
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      role: payload.role,
      address: payload.address,
      createdAt:payload.createdAt,
      updatedAt:payload.updatedAt
    };
  }

}
