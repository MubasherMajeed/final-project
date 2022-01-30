import { HttpException, HttpStatus } from "@nestjs/common";

export class Http500 {
  static throw(error: any) {
    console.log(error);
    throw new HttpException(
      error,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}