import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../schemas/image.schema";
import { User } from "../../common/auth/users/user.schema";

export class PersonCreateRequest extends User {
  @ApiProperty({ required: true })
  first_name: string;

  @ApiProperty({ required: true })
  last_name: string;

  @ApiProperty()
  phone: string;
}

export class PersonUpdateRequest {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  image: Image;
}

export class PersonWithoutPasswordResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  image: Image;

  @ApiProperty()
  token: string;
}

export class PasswordUpdateRequest {
  @ApiProperty({ required: true, description: "Person Id" })
  person_id: string;

  @ApiProperty({ required: true })
  oldPassword: string;

  @ApiProperty({ required: true })
  newPassword: string;
}

export class AccountVerification {
  @ApiProperty()
  hash: string;

  @ApiProperty()
  id: string;
}

export class AccountVerificationEmail {
  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class SaveImage {
  @ApiProperty({ required: true, type: "string", format: "binary" })
  image: Image;
}
