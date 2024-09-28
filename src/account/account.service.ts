import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Account } from './entities/account.entity';
import puppeteer from 'puppeteer';
import { AuthResponse } from './types/auth-response';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AccountService {
  headers!: any;
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const accounts = await this.prismaService.account.findMany();
    return accounts.map((account) => plainToClass(Account, account));
  }

  @Cron('30 28 0 * * *')
  private async getPoint() {
    const accounts = await this.getAll();
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
            const result = await this.prismaService.account.update({
              data: { point: authResponse.signInByEmail.result.user.points },
              where: { id: account.id },
            });
            console.log(result);
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
    return this.getAll();
  }
}
