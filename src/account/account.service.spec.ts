import { Test } from '@nestjs/testing';
import { AccountService } from './account.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CheckoutService } from './checkout.service';

describe('AccountService', () => {
  let accountService: AccountService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AccountService, PrismaService, CheckoutService],
    }).compile();

    accountService = moduleRef.get(AccountService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should be get all accounts', async () => {
    const accounts = await accountService.getAll();
    expect(accounts.length).toBeGreaterThan(0);
    accounts.forEach((account) => expect(account).toHaveProperty('username'));
  });

  it('should be test service return "berhasil"', async () => {
    expect(await accountService.test()).toBe('berhasil');
  });

  it(
    'should be login first account',
    async () => {
      const { username } = await prismaService.account.findFirst();
      const cookies = await accountService['loginAccount'](username);
      expect(cookies.length).toBeGreaterThan(0);
    },
    60 * 1000,
  );

  it(
    'should be login all accounts',
    async () => {
      await accountService.login();
      const accounts = await prismaService.account.findMany();
      accounts.forEach((account) => {
        console.log(account);
        expect(account.cookies).not.toBe('[]');
      });
    },
    30 * 60 * 1000,
  );

  it(
    'should be get point first account',
    async () => {
      const account = await prismaService.account.findFirst();
      expect(await accountService['getPoint'](account)).toHaveProperty('point');
    },
    60 * 5000,
  );
});
