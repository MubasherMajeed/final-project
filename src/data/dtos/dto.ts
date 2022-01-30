import { ApiProperty } from "@nestjs/swagger";


export class LoginDto {
  @ApiProperty()
  username:string;
  @ApiProperty()
  password:string;
}

export class CreateSupplierDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
}

export class CreatePurchaseDto {
  @ApiProperty()
  supplierId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  purchasePrice: number;
}

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  quantity: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  supplierId: string;
  @ApiProperty()
  color: string;
}

export class CreateOrderDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  paymentType: number;
  @ApiProperty()
  orderStatus: number;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zipCode: number;
  @ApiProperty()
  date: Date;
}
export class CreateCategoriesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}

export class CreateCartDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  ProductId: string;
}

export class CreateUserDto {
  @ApiProperty()
  name:string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  password:string;
  @ApiProperty()
  role:number;
  @ApiProperty()
  phone:string;
  @ApiProperty()
  address:string;
}


export class SearchUserByEmail {
  @ApiProperty()
  email:string
}
export class SearchSupplierByEmail {
  @ApiProperty()
  email:string
}
