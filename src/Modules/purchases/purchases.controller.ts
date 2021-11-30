import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { PurchasesService } from "./purchases.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiProperty,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CreatePurchaseDto } from "../../data/dtos/dto";
import { JwtAuthGuard } from "../../data/utilities/auth/jwt-auth.guard";


@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service:PurchasesService) {
  }
  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type:CreatePurchaseDto
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
    type:CreatePurchaseDto
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
