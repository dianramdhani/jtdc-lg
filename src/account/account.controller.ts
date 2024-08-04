import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiResponse } from '@nestjs/swagger';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiResponse({ type: Account, isArray: true })
  getAll() {
    return this.accountService.getAll();
  }
}
