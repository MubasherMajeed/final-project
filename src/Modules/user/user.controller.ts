import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, SearchUserByEmail } from "../../data/dtos/dto";
import { JwtAuthGuard } from "../../data/utilities/auth/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Users')
@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {
  }

  @Post()
  @ApiBody({
    type: CreateUserDto
  })
  @ApiCreatedResponse()
  create(@Body() data: any) {
    return this.service.add(data);
  }

  @Post("search")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: SearchUserByEmail,
    description: "Use Email to search users"
  })
  async search(@Body() data: any) {
    return this.service.search(data);
  }

  @Patch(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type:CreateUserDto
  })
  update(@Param("uid") uid: string, @Body() data: any) {
    return this.service.update(uid, data);
  }

  @Delete(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async delete(@Param("uid") uid: string) {
    await this.service.delete(uid);
    return `user with ${uid} is deleted`;
  }

  @Get(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  getOne(@Param("id") id: string) {
    return this.service.fetch(id);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async fetchAll(@Request() req) {
    if (req.user.role === 1){
      return this.service.fetch();
    }
    throw new UnauthorizedException()
  }
}
