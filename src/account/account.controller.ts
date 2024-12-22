import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import CheckoutDto from './dto/checkout.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAll() {
    return this.accountService.getAll();
  }

  @Get('get-point-all-accounts')
  getPointAllAcounts() {
    this.accountService.getPointAllAccounts();
    return 'On process';
  }

  @Get('login')
  login() {
    this.accountService.login();
    return 'On process';
  }

  @Get('test')
  test() {
    return this.accountService.test();
  }

  @Get('checkout')
  checkout(@Query() checkoutDto: CheckoutDto) {
    this.accountService.checkout(checkoutDto);
    return 'On process';
  }
}
