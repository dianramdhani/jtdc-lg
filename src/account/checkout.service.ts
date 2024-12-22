import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import puppeteer, { Cookie } from 'puppeteer';

@Injectable()
export class CheckoutService {
  private headers: Record<string, string> = {};
  private addressID: number = -1;

  constructor() {}

  async checkout(cookies: Cookie[], time: string) {
    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      page.setRequestInterception(true);
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
        .on('console', (message) => {
          const text = message.text();
          if (!text.includes('~')) return;
          if (text.includes('~addressID'))
            this.addressID = Number(text.split(' ')[1]) ?? -1;
        });
      await page.setCookie(...cookies);
      await page.goto(process.env.URL, {
        waitUntil: 'networkidle2',
      });
      await page.evaluate(
        this.getAddressID,
        process.env.URL_QUERY,
        this.headers,
      );

      const [hour, minute] = time.split(':');
      new CronJob(
        `${minute} ${hour} * * *`,
        async () => {
          const start = new Date().getTime();
          await page.evaluate(
            this.processCheckout,
            process.env.URL_QUERY,
            this.headers,
            this.addressID,
          );
          console.log(`co time ${new Date().getTime() - start}`);
          await browser.close();
          resolve(true);
        },
        undefined,
        true,
        'Asia/Jakarta',
      );
    });
  }

  private async getAddressID(urlQuery: string, headers: typeof this.headers) {
    try {
      const addressID = await fetch(urlQuery, {
        method: 'POST',
        body: JSON.stringify([
          {
            operationName: 'getAddressList',
            variables: {},
            query:
              'query getAddressList($size: Int, $page: Int) {\n  getAddressList(size: $size, page: $page) {\n    meta {\n      page\n      size\n      sort\n      sortType\n      keyword\n      totalData\n      totalPage\n      message\n      error\n      code\n    }\n    result {\n      isSelected\n      addressID\n      addressName\n      addressPhone\n      addressLabel\n      addressZipCode\n      addressDetail\n      latitude\n      longitude\n      provinceID\n      provinceName\n      districtName\n      districtID\n      subdistrictName\n      subdistrictID\n    }\n  }\n}\n',
          },
        ]),
        headers,
      }).then(async (response) => {
        const addressList: any = await response.json();
        return addressList[0].data.getAddressList.result[0].addressID as number;
      });

      addressID
        ? console.log(`~addressID ${addressID}`)
        : console.log('~error gak ada address id');
    } catch {}
  }

  private async processCheckout(
    urlQuery: string,
    headers: typeof this.headers,
    addressID: number,
  ) {
    let res: any;
    do {
      try {
        res = await fetch(urlQuery, {
          method: 'POST',
          body: JSON.stringify([
            {
              operationName: 'processCheckoutV2',
              variables: {},
              query:
                'query processCheckoutV2 {\n  processCheckoutV2 {\n    __typename\n    meta {\n      __typename\n      message\n      error\n      code\n    }\n    result {\n      __typename\n      isContinueProcessCheckout\n      isGoToNewCheckout\n      isAddressAvailable\n    }\n  }\n}',
            },
            {
              operationName: 'updateSummaryShipping',
              variables: {
                request: {
                  addressID,
                  shippingID: 4,
                },
              },
              query:
                'mutation updateSummaryShipping($request: UpdateSummaryShippingRequest!) {\n  updateSummaryShipping(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n    }\n  }\n}\n',
            },
            {
              operationName: 'updateSummaryPayment',
              variables: {
                request: {
                  paymentID: 57,
                  paymentCode: 'VABCA',
                  paymentParentCode: 'VirtualAccount',
                  paymentName: 'Virtual Account',
                  paymentChildName: 'BCA Virtual Account',
                  minimumAmount: 10000,
                },
              },
              query:
                'mutation updateSummaryPayment($request: UpdateSummaryPaymentRequest!) {\n  updateSummaryPayment(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n    }\n  }\n}\n',
            },
            {
              operationName: 'updateSummaryJTPoint',
              variables: {
                request: {
                  isJTPoint: true,
                },
              },
              query:
                'mutation updateSummaryJTPoint($request: UpdateSummaryJTPointRequest!) {\n  updateSummaryJTPoint(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n    }\n  }\n}\n',
            },
            {
              operationName: 'addOrderV2',
              variables: {},
              query:
                'mutation addOrderV2($request: addOrderV2Request) {\n  addOrderV2(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n      payment {\n        status\n        orderId\n        redirectUrl\n      }\n    }\n  }\n}\n',
            },
          ]),
          headers,
        }).then(async (response) => {
          const res: any = await response.json();
          console.log(`~success ${JSON.stringify(res)}`);
          return res;
        });
      } catch (error) {
        if (error instanceof Error) console.log(`~error ${error.message}`);
      }
    } while (!res);
  }
}
