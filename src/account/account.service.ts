import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/database/prisma/prisma.service';
import puppeteer, { Browser, Cookie } from 'puppeteer';
import { AuthResponse } from './types/auth-response';
import { Cron } from '@nestjs/schedule';
import { formatInTimeZone } from 'date-fns-tz';
import { account } from '@prisma/client';
import CheckoutDto from './dto/checkout.dto';
import { CheckoutService } from './checkout.service';

@Injectable()
export class AccountService {
  headers!: any;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly checkoutService: CheckoutService,
  ) {}

  async getAll() {
    return (
      await this.prismaService.account.findMany({
        select: { username: true, point: true },
        orderBy: { point: 'desc' },
      })
    ).map(({ username, point }) => ({ username, point: Number(point) }));
  }

  async test() {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
      });
      const page = await browser.newPage();
      await page.goto(process.env.URL, { waitUntil: 'domcontentloaded' });
      await browser.close();
      return 'berhasil';
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
  }

  async checkout(checkoutDto: CheckoutDto) {
    let account: account;
    try {
      account = await this.prismaService.account.findFirst({
        where: { username: checkoutDto.username },
      });
    } catch (error) {
      throw new NotFoundException('Account not found');
    }

    this.checkoutService.checkout(
      JSON.parse(account.cookies),
      checkoutDto.time,
    );
  }

  @Cron('30 20 0 * * *')
  async login() {
    const accounts = await this.prismaService.account.findMany({
      select: { id: true, username: true },
      orderBy: { point: 'desc' },
    });
    for (const account of accounts) {
      const cookies = await this.loginAccount(account.username);
      await this.prismaService.account.update({
        where: { id: account.id },
        data: {
          cookies: JSON.stringify(cookies),
          lastCookiesUpdate: formatInTimeZone(
            new Date(),
            'Asia/Jakarta',
            'dd-MM-yyyy HH:mm:ss',
          ),
          lastLogin: formatInTimeZone(
            new Date(),
            'Asia/Jakarta',
            'dd-MM-yyyy HH:mm:ss',
          ),
        },
      });
    }
  }

  @Cron('30 28 0 * * *')
  async getPoint() {
    const accounts = await this.prismaService.account.findMany({
      select: { id: true, username: true },
      orderBy: { point: 'desc' },
    });
    for (const account of accounts) {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
      });
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page;
      page
        .on('request', (request) => request.continue())
        .on('response', async (response) => {
          if (response.url().includes('/query')) {
            try {
              await response.json();
              this.headers = response.request().headers();
            } catch (error) {}
          }
        })
        .on('console', async (message) => {
          const text = message.text();
          if (!text.includes('~ABC')) return;
          if (text.includes('auth')) {
            browser.close();
            const authResponse = plainToClass(
              AuthResponse,
              JSON.parse(text.replace('~ABC-auth ', '')),
            );
            console.log(
              await this.prismaService.account.update({
                select: { username: true, point: true },
                data: { point: authResponse.signInByEmail.result.user.points },
                where: { id: account.id },
              }),
            );
          }
        });
      await page.goto(process.env.URL);
      await page.evaluate(
        (headers: any, email: string, urlQuery: string, password: string) => {
          fetch(urlQuery, {
            method: 'POST',
            body: JSON.stringify([
              {
                operationName: 'signInByEmail',
                variables: {
                  input: {
                    email,
                    password,
                  },
                },
                query:
                  'mutation signInByEmail($input: signInByEmailReq!) {\n  signInByEmail(input: $input) {\n    result {\n      auth {\n        token\n        tokenRefresh\n        tokenExpiry\n      }\n      user {\n        name\n        email\n        phone\n        isSubscriber\n        memberLevel\n        points\n        address\n        addressCity\n        addressDistrict\n        addressProvince\n        addressPostalCode\n        birthDate\n        isActive\n        userId\n        isReseller\n        isVerifiedEmail\n        isVerifiedPhone\n        isPurchasers\n        gender\n      }\n      message\n      status\n      firstLogin\n    }\n    meta {\n      error\n      message\n      code\n    }\n  }\n}\n',
              },
            ]),
            headers,
          })
            .then((response) => response.json())
            .then((rawData) => {
              const { data } = rawData[0];
              console.log(`~ABC-auth ${JSON.stringify(data)}`);
            });
        },
        this.headers,
        account.username,
        process.env.URL_QUERY,
        process.env.PASSWORD,
      );
    }
  }

  private async loginAccount(username: string) {
    const start = new Date().getTime();
    let browser: Browser;
    let cookies: Cookie[] = [];

    try {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
      });
      const page = await browser.newPage();
      await page.goto(`${process.env.URL}/login`, {
        waitUntil: 'networkidle2',
      });
      const usernameFld = 'input[name="username"]';
      await page.waitForSelector(usernameFld);
      await page.type(usernameFld, username);
      const passwordFld = 'input[name="password"]';
      await page.waitForSelector(passwordFld);
      await page.type(passwordFld, process.env.PASSWORD);
      const rememberChk = '#remember-me';
      await page.waitForSelector(rememberChk);
      await page.click(rememberChk);
      const loginBtn = '.qa-login-button';
      await page.waitForSelector(loginBtn);
      await page.click(loginBtn);
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      cookies = await page.cookies();
      console.error(
        `Success login ${username} ${new Date().getTime() - start}`,
      );
    } catch (error) {
      console.error(`Failed login ${username} ${new Date().getTime() - start}`);
    } finally {
      await browser.close();
    }

    return cookies;
  }
}
