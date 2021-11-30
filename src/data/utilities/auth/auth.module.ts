import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../../../Modules/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtConstant } from "./constant";
import { LocalStrategy } from "./localStrategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [UserModule,PassportModule,JwtModule.register({
    secret:JwtConstant.secret,
    signOptions:{expiresIn: '24h'}
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports : [AuthService],
})
export class AuthModule {}
