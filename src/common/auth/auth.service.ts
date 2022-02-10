import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { NoGeneratorUtils } from "../lib/no-generator-utils";
import { PersonWithoutPasswordResponse } from "../../data/dtos/person.dto";
import { SignUpRequest } from "../../data/dtos/auth.dto";
import { PersonService } from "../../Modules/person/person.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private personService: PersonService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.personService.fetchByUsername(username, pass);

    if (user) {
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        sub: user._id,
      }),
    };
  }

  async signUp(data: SignUpRequest) {



    const code = await NoGeneratorUtils.generateCode(2);
    const person = (await this.personService.create(
      data,
    )) as PersonWithoutPasswordResponse;
    console.log(person);
    return person;

  }

  async profile(user: any) {
    return await this.personService.fetch(user.userId);
  }
}
