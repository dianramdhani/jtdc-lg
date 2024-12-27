import { Test } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Cookie } from 'puppeteer';
import { ScheduleModule } from '@nestjs/schedule';
import { addMinutes, format } from 'date-fns';

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
        where: { username: 'twilight.spark@gmx.com' },
      });
      // const time = format(addMinutes(new Date(), 1), 'HH:mm');
      const time = '06:44';
      const parsedCookies = JSON.parse(cookies) as Cookie[];
      if (parsedCookies.length) {
        console.log(`Checkout in ${time}`);
        await checkoutService.checkout(parsedCookies, time);
      }
    },
    6 * 60 * 60 * 1000,
  );

  it(
    'should be checkout all accounts',
    async () => {
      const usernames = ['twilight.spark@gmx.com', 'luminous.tracker@gmx.com'];
      const time = '08:00';
      const allCookies = await Promise.all(
        usernames.map(async (username) => {
          const { cookies } = await prismaService.account.findFirst({
            where: { username },
          });
          return JSON.parse(cookies) as Cookie[];
        }),
      );

      await Promise.all(
        allCookies.map((cookies) => checkoutService.checkout(cookies, time)),
      );
    },
    6 * 60 * 60 * 1000,
  );

  it(
    'should be checkout 2 accounts',
    async () => {
      const seiko = await prismaService.account.findFirst({
        where: { username: 'mystic.whisperer@gmx.com' },
      });
      const jamDinding = await prismaService.account.findFirst({
        where: { username: 'moonbeam.traveler@gmx.com' },
      });
      const time = '00:00';
      await Promise.all([
        checkoutService.checkout(JSON.parse(seiko.cookies) as Cookie[], time),
        checkoutService.checkout2(
          JSON.parse(jamDinding.cookies) as Cookie[],
          time,
        ),
      ]);
    },
    6 * 60 * 60 * 1000,
  );

  it(
    'should be add to cart and checkout',
    async () => {
      const time = format(addMinutes(new Date(), 1), 'HH:mm');
      const { cookies } = await prismaService.account.findFirst({
        where: { username: 'moonbeam.traveler@gmx.com' },
      });
      await checkoutService.checkout2(JSON.parse(cookies) as Cookie[], time);
    },
    6 * 60 * 60 * 1000,
  );
});
