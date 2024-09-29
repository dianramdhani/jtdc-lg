import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import puppeteer, { Cookie } from 'puppeteer';

@Injectable()
export class CheckoutService {
  private headers: Record<string, string> = {};
  private addressID: number = -1;

  constructor() {}

  async checkout(cookies: Cookie[], time: string) {
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
          this.addressID = +text.split(' ')[1] ?? -1;
      });
    await page.setCookie(...cookies);
    await page.goto(process.env.URL, {
      waitUntil: 'networkidle2',
    });
    await page.evaluate(this.getAddressID, process.env.URL_QUERY, this.headers);

    const [hour, minute] = time.split(':');
    const cronCheckout = new CronJob(
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
      },
      undefined,
      undefined,
      'Asia/Jakarta',
    );
    cronCheckout.start();
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
    const process = async () => {
      return Promise.all([
        fetch(urlQuery, {
          method: 'POST',
          body: JSON.stringify([
            {
              operationName: 'processCheckout',
              variables: {},
              query:
                'query processCheckout {\n  processCheckout {\n    meta {\n      message\n      error\n      code\n    }\n    result\n  }\n}\n',
            },
          ]),
          headers,
        })
          .then(async (response) => {
            const jsonResponse: any = await response.json();
            console.log(`~processCheckout ${JSON.stringify(jsonResponse)}`);
            return jsonResponse[0].data.processCheckout.meta.code as string;
          })
          .catch(() => 'error'),
        fetch(urlQuery, {
          method: 'POST',
          body: JSON.stringify([
            {
              operationName: 'addPreBook',
              variables: {
                params: {
                  isRewardPoint: true,
                  addressID,
                  shippingID: 4,
                  shippingName: 'J&T',
                  shippingDuration: 'Estimasi pengiriman 2-3 Hari',
                },
              },
              query:
                'mutation addPreBook($params: PreBookRequest!) {\n  addPreBook(params: $params) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n      orderID\n      analytic {\n        affiliation\n        coupon\n        currency\n        transaction_id\n        shipping\n        insurance\n        value\n        partial_reward\n        coupon_discount\n        shipping_discount\n        location\n        quantity\n        items {\n          item_id\n          item_name\n          affiliation\n          coupon\n          currency\n          discount\n          index\n          item_brand\n          item_category\n          item_category2\n          item_category3\n          item_category4\n          item_category5\n          item_list_id\n          item_list_name\n          item_variant\n          price\n          quantity\n        }\n        content_id\n        content_type\n        contents {\n          id\n          quantity\n        }\n        description\n        category_id\n        category_name\n        brand_id\n        brand_name\n        sub_brand_id\n        sub_brand_name\n        order_id\n        order_date\n        total_trx\n        shipping_fee\n        insurance_fee\n        tax\n        discount\n        partial_mw_reward\n        shipping_method\n        payment_method\n        is_dropship\n        voucher_code\n        products\n      }\n    }\n  }\n}\n',
            },
          ]),
          headers,
        })
          .then(async (response) => {
            const jsonResponse: any = await response.json();
            console.log(`~addPreBook ${JSON.stringify(jsonResponse)}`);
            return jsonResponse[0].data.addPreBook.meta.code as string;
          })
          .catch(() => 'error'),
        fetch(urlQuery, {
          method: 'POST',
          body: JSON.stringify([
            {
              operationName: 'addOrder',
              variables: {
                params: {
                  paymentID: 57,
                  paymentCode: 'VABCA',
                  paymentName: 'BCA Virtual Account',
                  paymentParentCode: 'VirtualAccount',
                },
              },
              query:
                'mutation addOrder($params: AddOrderRequest!) {\n  addOrder(params: $params) {\n    meta {\n      error\n      code\n      message\n    }\n    result {\n      payment {\n        status\n        orderId\n        redirectUrl\n      }\n      analytic {\n        affiliation\n        coupon\n        currency\n        transaction_id\n        transaction_code\n        shipping\n        insurance\n        value\n        partial_reward\n        coupon_discount\n        shipping_discount\n        location\n        quantity\n        items {\n          item_id\n          item_name\n          affiliation\n          currency\n          discount\n          index\n          item_brand\n          item_category\n          item_category2\n          item_category3\n          item_category4\n          item_category5\n          item_list_id\n          item_list_name\n          item_variant\n          price\n          quantity\n        }\n        content_id\n        content_type\n        contents {\n          id\n          quantity\n        }\n        description\n        category_id\n        category_name\n        brand_id\n        brand_name\n        sub_brand_id\n        sub_brand_name\n        order_id\n        order_date\n        total_trx\n        shipping_fee\n        insurance_fee\n        tax\n        discount\n        partial_mw_reward\n        shipping_method\n        payment_method\n        is_dropship\n        voucher_code\n        products\n        total_price\n        gender\n        db\n        user_id\n        fb_login_id\n        ip_override\n        user_data {\n          email_address\n          phone_number\n          client_ip_address\n          address {\n            first_name\n            last_name\n            city\n            region\n            postal_code\n            country\n          }\n        }\n      }\n    }\n  }\n}\n',
            },
          ]),
          headers,
        })
          .then(async (response) => {
            const jsonResponse: any = await response.json();
            console.log(`~addOrder ${JSON.stringify(jsonResponse)}`);
            return jsonResponse[0].data.addOrder.meta.code as string;
          })
          .catch(() => 'error'),
      ]);
    };

    let allStatus: string[] = [];
    while (true) {
      allStatus = await process();
      if (!allStatus.some((status) => status !== 'success')) break;
    }
    console.log(`~dataCO ${JSON.stringify(allStatus)}`);
  }
}
