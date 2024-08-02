import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.account.findMany();
  }

  getPoint() {}
}
