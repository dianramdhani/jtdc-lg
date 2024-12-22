import { Test } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { addMinutes, format } from 'date-fns';
import { Cookie } from 'puppeteer';
import { ScheduleModule } from '@nestjs/schedule';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot()],
      providers: [CheckoutService, PrismaService],
    }).compile();

    checkoutService = moduleRef.get(CheckoutService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(checkoutService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it(
    'should be checkout',
    async () => {
      const { cookies } = await prismaService.account.findFirst({
        where: { username: 'aurora.dreamer@gmx.com' },
      });
      // const time = format(addMinutes(new Date(), 1), 'HH:mm');
      const time = '00:00';
      const parsedCookies = JSON.parse(cookies) as Cookie[];
      if (parsedCookies.length) {
        console.log(`Checkout in ${time}`);
        await checkoutService.checkout(parsedCookies, time);
      }
    },
    6 * 60 * 60 * 1000,
  );
});
