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
import { CartService } from "./cart.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiProperty,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CreateCartDto, CreateOrderDto } from "../../data/dtos/dto";

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {
  }
  @Post()
  // @ApiBearerAuth('access-token')
  @ApiBody({
    type:CreateCartDto
  })
  @ApiCreatedResponse()
  create(@Body() data: any) {
      return this.service.add(data);
  }


  @Patch(":id")
  // @ApiBearerAuth('access-token')
  @ApiResponse({
    status:203,
    description:"Updated"
  })
  @ApiBody({
    type:CreateCartDto
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
