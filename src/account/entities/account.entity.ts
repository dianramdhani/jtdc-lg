import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class Account {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  cookies: string = '';

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  lastCookiesUpdate: Date = new Date();

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  lastLogin: Date = new Date();

  @ApiProperty()
  @Type(() => Number)
  point: number = 0;

  @ApiProperty()
  username: string = '';
}
