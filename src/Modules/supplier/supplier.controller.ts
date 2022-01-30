import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { ApiBearerAuth, ApiBody, ApiFoundResponse, ApiTags } from "@nestjs/swagger";
import { CreateSupplierDto, SearchSupplierByEmail } from "../../data/dtos/dto";

@ApiTags('Suppliers')
@Controller("supplier")
export class SupplierController {
  constructor(private readonly service: SupplierService) {
  }

  @Post()
  // @ApiBearerAuth('access-token')
  @ApiBody({
      type:CreateSupplierDto
  })
  create(@Body() data: any) {
      return this.service.add(data);
  }


  @Post("search")
  // @ApiBearerAuth('access-token')
  @ApiBody({
    type:SearchSupplierByEmail,
    description:"Enter Email of Supplier to search"
  })
  @ApiFoundResponse()
  async search(@Body() data: any) {
    return this.service.search(data);
  }

  @Patch(":id")
  @ApiBody({
    type:CreateSupplierDto
  })
  // @ApiBearerAuth('access-token')
  update(@Param("id") id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(":id")
  // @ApiBearerAuth('access-token')
  async delete(@Param("id") id: string) {
    await this.service.delete(id);
    return `Supplier with ${id} is deleted`;
  }

  @Get(":id")
  // @ApiBearerAuth('access-token')
  getOne(@Param("id") uid: string) {
    return this.service.fetch(uid);
  }

  @Get()
  // @ApiBearerAuth('access-token')
  fetchAll() {
      return this.service.fetch();
  }

}
