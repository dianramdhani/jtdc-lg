import { ApiProperty } from '@nestjs/swagger';

export default class CheckoutDto {
  @ApiProperty({ example: 'astral.whirl@gmx.com' })
  username: string;

  @ApiProperty({ example: '16:03' })
  time: string;
}
