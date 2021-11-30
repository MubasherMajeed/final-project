import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiProperty,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../data/utilities/auth/jwt-auth.guard";
import { CreateCategoriesDto, CreateOrderDto } from "../../data/dtos/dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service:CategoriesService) {
  }
  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type:CreateCategoriesDto
  })
  @ApiCreatedResponse()
  create(@Body() data: any,@Req() req) {
    if (req.user.role === 1){
      return this.service.add(data);
    }
    throw new UnauthorizedException()
  }


  @Patch(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status:203,
    description:"Updated"
  })
  @ApiBody({
    type:CreateCategoriesDto
  })
  update(@Param("id") id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status:204,
    description:"Deleted"
  })
  async delete(@Param("id") id: string) {
    await this.service.delete(id);
    return `deleted`;
  }

  @Get(":id")
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiFoundResponse()
  getOne(@Param("id") uid: string) {
    return this.service.fetch(uid);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiFoundResponse()
  fetchAll() {
    return this.service.fetch();
  }
}
