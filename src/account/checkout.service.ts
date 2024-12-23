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
              operationName: 'getSummaryCheckoutV2',
              variables: {
                request: {
                  isChanges: true,
                },
              },
              query:
                'query getSummaryCheckoutV2($request: SummaryCheckoutV2Request!) {\n  getSummaryCheckoutV2(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      quantity\n      voucherAmount\n      JTPointUsed\n      bankPointRewardUsed\n      insuranceAmount\n      total\n      subTotal\n      pointReward\n      shipping {\n        shippingAmount\n        shippingFinalAmount\n      }\n      minimumPaymentInfo\n    }\n  }\n}\n',
            },
            {
              operationName: 'getCheckoutSKUList',
              variables: {
                request: {
                  isValidate: false,
                },
              },
              query:
                'query getCheckoutSKUList($request: CheckoutSKUListRequest) {\n  getCheckoutSKUList(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      items {\n        productID\n        productImage\n        productName\n        productSKU\n        productFinalPrice\n        productQuantity\n        productWeight\n        productBrandCode\n        productInfo {\n          message\n          quantity\n          stock\n        }\n        isBundling\n        isPreorder\n        analytic {\n          brandID\n          brandName\n          categoryID\n          categoryName\n          function\n          lugWidth\n          movement\n          productBrand\n          productColour\n          productID\n          productImage\n          productLink\n          productName\n          productPrice\n          productSku\n          strapMaterial\n          subBrandID\n          subBrandName\n          productQty\n          subtotal\n          items {\n            index\n            item_id\n            item_name\n            item_brand\n            item_category\n            item_category2\n            item_category3\n            item_category4\n            item_category5\n            item_variant\n            item_list_id\n            item_list_name\n            coupon\n            price\n            quantity\n            discount\n            currency\n            affiliation\n          }\n        }\n        productBundling {\n          productID\n          productImage\n          productName\n          productSKU\n          productFinalPrice\n          productQuantity\n          productWeight\n          productBrandCode\n          productInfo {\n            message\n            quantity\n            stock\n          }\n          analytic {\n            brandID\n            brandName\n            categoryID\n            categoryName\n            function\n            lugWidth\n            movement\n            productBrand\n            productColour\n            productID\n            productImage\n            productLink\n            productName\n            productPrice\n            productSku\n            strapMaterial\n            subBrandID\n            subBrandName\n            productQty\n            subtotal\n            items {\n              index\n              item_id\n              item_name\n              item_brand\n              item_category\n              item_category2\n              item_category3\n              item_category4\n              item_category5\n              item_variant\n              item_list_id\n              item_list_name\n              coupon\n              price\n              quantity\n              discount\n              currency\n              affiliation\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
            },
            {
              operationName: 'addOrderV2',
              variables: {},
              query:
                'mutation addOrderV2($request: addOrderV2Request) {\n  addOrderV2(request: $request) {\n    meta {\n      message\n      error\n      code\n    }\n    result {\n      status\n      payment {\n        status\n        orderId\n        redirectUrl\n      }\n    }\n  }\n}\n',
            },
            {
              operationName: 'getOrderList',
              variables: {
                params: {
                  statusOrder: 'all',
                  typeOrder: 'all',
                  dateOrder: 0,
                  search: '',
                  page: 1,
                  size: 4,
                },
              },
              query:
                'query getOrderList($params: OrderListRequest!) {\n  getOrderList(params: $params) {\n    meta {\n      message\n      error\n      code\n      page\n      size\n      totalData\n      totalPage\n    }\n    result {\n      orderID\n      storeStrukID\n      statusOrder\n      statusOrderCode\n      cart {\n        isNonReview\n        deliveryEstimate\n        cartID\n        brandID\n        productID\n        productName\n        productImage\n        productQuantity\n        productPrice\n        productSlicePrice\n        productTotalPrice\n        productSlug\n        productUrlTracking\n        productDiscount\n        productStock\n        productIsWishlist\n        productStatus {\n          isOos\n          isComingSoon\n          isReady\n          isPreorder\n          isLatest\n        }\n        productLabel {\n          isFreeShipping\n          isFreeInsurance\n          isFlashSale\n          isBundlingStrap\n          isNewArrival\n          isJdm\n          isBestSeller\n          event {\n            status\n            badge\n            title\n          }\n        }\n        productRewardPoint {\n          label\n          value\n        }\n        productBundling {\n          cartID\n          brandID\n          productID\n          productName\n          productImage\n          productQuantity\n          productPrice\n          productSlicePrice\n          productTotalPrice\n          productSlug\n          productDiscount\n          productStock\n          productIsWishlist\n          productStatus {\n            isOos\n            isComingSoon\n            isReady\n            isPreorder\n            isLatest\n          }\n          productLabel {\n            isFreeShipping\n            isFreeInsurance\n            isFlashSale\n            isBundlingStrap\n            isNewArrival\n            isJdm\n            isBestSeller\n            event {\n              status\n              badge\n              title\n            }\n          }\n          productRewardPoint {\n            label\n            value\n          }\n          productMaxBuy\n          productInfoStock\n          productWeight\n          productInfoWeight\n          cartMessage\n        }\n        productMaxBuy\n        productInfoStock\n        productWeight\n        productInfoWeight\n        isChecked\n        cartMessage\n      }\n      shipping {\n        info\n        code\n      }\n      payment {\n        paymentCode\n        paymentName\n        paymentDirectUrl\n        isSingleAttempt3rdParty\n      }\n      paymentExpire\n      createdAt\n      totalBill\n      totalCart\n      note\n      infoCancel\n      isReceived\n      isReviewed\n      isWithinReviewPeriod\n      isHaveResi\n      totalResi\n      source\n      isShowReviewButton\n      isShowReviewButtonV2\n    }\n  }\n}\n',
            },
          ]),
          headers,
        }).then(async (response) => {
          const res: any[] = await response.json();

          if (
            res[res.length - 1].data.getOrderList.result.length === 0 ||
            res[res.length - 1].data.getOrderList.result[0].statusOrderCode !==
              'notYetPaid'
          ) {
            throw new Error('Gagal co harus ulang!');
          }

          console.log(`~success ${JSON.stringify(res)}`);
          return res;
        });
      } catch (error) {
        if (error instanceof Error) console.log(`~error ${error.message}`);
      }
    } while (!res);
  }
}
