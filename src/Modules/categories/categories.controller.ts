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
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CreateCategoriesDto, CreateOrderDto } from "../../data/dtos/dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service:CategoriesService) {
  }
  @Post()
  // @ApiBearerAuth('access-token')
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
  // @ApiBearerAuth('access-token')
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
  // @ApiBearerAuth('access-token')
  @ApiResponse({
    status:204,
    description:"Deleted"
  })
  async delete(@Param("id") id: string) {
    await this.service.delete(id);
    return `deleted`;
  }

  @Get(":id")
  // @ApiBearerAuth('access-token')
  @ApiFoundResponse()
  getOne(@Param("id") uid: string) {
    return this.service.fetch(uid);
  }

  @Get()
  // @ApiBearerAuth('access-token')
  @ApiFoundResponse()
  fetchAll() {
    return this.service.fetch();
  }
}
