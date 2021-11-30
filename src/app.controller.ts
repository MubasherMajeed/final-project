import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./data/utilities/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./data/utilities/auth/jwt-auth.guard";
import { LoginDto } from "./data/dtos/dto";

@ApiTags("login")
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({
    type:LoginDto
  })
  async login(@Request() req){
    return this.authService.login(req.user._doc);
  }


  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard("jwt"))
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

}
