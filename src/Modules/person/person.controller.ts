import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PersonService } from "./person.service";
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiResponse
} from "@nestjs/swagger";
import { PersonUpdateRequest, PersonWithoutPasswordResponse } from "../../data/dtos/person.dto";

@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {
  }

  @ApiResponse({
    status: 200,
    type: [PersonWithoutPasswordResponse],
    description: "Get all users"
  })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get()
  fetchAll() {
    return this.service.fetch();
  }

  @ApiResponse({
    status: 200,
    type: PersonWithoutPasswordResponse,
    description: "Get single user"
  })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get(":id")
  fetchOne(@Param("id") id: string) {
    return this.service.fetch(id);
  }

  @ApiCreatedResponse({ type: PersonWithoutPasswordResponse, description: "Person Updated Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: PersonUpdateRequest) {
    return this.service.update(id, data);
  }

  @ApiOkResponse({ description: "Person deleted successfully" })
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.delete(id);
  }

  // ----------------------------------------- Forgot Password ---------------------------------------------//
  @ApiOkResponse({
    description: "Email has been sent successfully"
  })
  @ApiNotAcceptableResponse({ description: "Email not exists!" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Post("forgot-password/:email")
  async forgotPassword(@Param("email") email: string): Promise<any> {
    return this.service.forgotPassword(email);
  }
}
