import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenResponse {
  @ApiProperty()
  access_token: string;
}

export class SignInRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class SignUpRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  phone: string;
}


