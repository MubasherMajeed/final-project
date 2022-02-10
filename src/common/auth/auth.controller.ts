import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Person } from '../../data/schemas/person.schema';
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AccessTokenResponse, SignInRequest, SignUpRequest } from "../../data/dtos/auth.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {
  }

  @ApiResponse({
    status: 200,
    type: AccessTokenResponse,
    description: 'SignIn successful',
  })
  @ApiUnauthorizedResponse({ description: 'email or Password is incorrect' })
  @ApiBody({ type: SignInRequest })
  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signIn(@Request() request: any): Promise<AccessTokenResponse> {
    console.log(request.user)
    return this.service.signIn(request.user);
  }


  @ApiResponse({
    status: 201,
    description: 'SignUp successful',
  })
  @ApiBadRequestResponse({ description: 'Issue in request data' })
  @ApiUnauthorizedResponse({ description: 'Email already exists' })
  @Post('sign-up')
  signUp(@Body() data: SignUpRequest): Promise<any> {
    console.log(data);
    return this.service.signUp(data);
  }

  @ApiResponse({
    status: 200,
    type: Person,
    description: 'Get person from access token',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  profile(@Request() request): Promise<any> {
    return this.service.profile(request.user);
  }

  @ApiOkResponse({ description: 'SignOut successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @Post('sign-out')
  @UseGuards(AuthGuard('jwt'))
  signOut(@Request() request: any): Promise<any> {
    return request.logout;
  }
}
