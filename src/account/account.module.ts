import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CheckoutService } from './checkout.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, CheckoutService],
})
export class AccountModule {}
