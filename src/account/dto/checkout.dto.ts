import { ApiProperty } from '@nestjs/swagger';

export default class CheckoutDto {
  @ApiProperty({ example: 'silviagustianggraeni022@gmail.com' })
  username: string;
}
