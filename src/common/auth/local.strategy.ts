import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./users/user.schema";

/**
 *
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super();
  }

  /**
   *
   * @param username
   * @param password
   *
   * @return Promise<User>
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.service.validateUser(username, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
