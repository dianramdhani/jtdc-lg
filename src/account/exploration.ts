// check order list
fetch('https://gateway.jamtangan.com/query', {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6ImE2YmQwNWEwLTRlMzUtNDMzZS04ZDA2LTdkZjIxMDJhMTBhNSIsImFjY291bnRfZW1haWwiOiJzZXJlbml0eS5wZXRhbEBnbXguY29tIiwiYWNjb3VudF9pZCI6ODQ5OTQyLCJhY2NvdW50X3R5cGUiOiJVU0VSIiwiZXhwIjoxNzM0OTI0NTYyLCJpc19sb2dpbiI6dHJ1ZX0.yB3d2byDtjZ9-OitoAri7tqZzuw_5BQolhgP9tsyeOs',
  },
  body: '[{"operationName":"getOrderList","variables":{"params":{"statusOrder":"all","typeOrder":"all","dateOrder":0,"search":"","page":1,"size":4}},"query":"query getOrderList($params: OrderListRequest!) {\\n  getOrderList(params: $params) {\\n    meta {\\n      message\\n      error\\n      code\\n      page\\n      size\\n      totalData\\n      totalPage\\n    }\\n    result {\\n      orderID\\n      storeStrukID\\n      statusOrder\\n      statusOrderCode\\n      cart {\\n        isNonReview\\n        deliveryEstimate\\n        cartID\\n        brandID\\n        productID\\n        productName\\n        productImage\\n        productQuantity\\n        productPrice\\n        productSlicePrice\\n        productTotalPrice\\n        productSlug\\n        productUrlTracking\\n        productDiscount\\n        productStock\\n        productIsWishlist\\n        productStatus {\\n          isOos\\n          isComingSoon\\n          isReady\\n          isPreorder\\n          isLatest\\n        }\\n        productLabel {\\n          isFreeShipping\\n          isFreeInsurance\\n          isFlashSale\\n          isBundlingStrap\\n          isNewArrival\\n          isJdm\\n          isBestSeller\\n          event {\\n            status\\n            badge\\n            title\\n          }\\n        }\\n        productRewardPoint {\\n          label\\n          value\\n        }\\n        productBundling {\\n          cartID\\n          brandID\\n          productID\\n          productName\\n          productImage\\n          productQuantity\\n          productPrice\\n          productSlicePrice\\n          productTotalPrice\\n          productSlug\\n          productDiscount\\n          productStock\\n          productIsWishlist\\n          productStatus {\\n            isOos\\n            isComingSoon\\n            isReady\\n            isPreorder\\n            isLatest\\n          }\\n          productLabel {\\n            isFreeShipping\\n            isFreeInsurance\\n            isFlashSale\\n            isBundlingStrap\\n            isNewArrival\\n            isJdm\\n            isBestSeller\\n            event {\\n              status\\n              badge\\n              title\\n            }\\n          }\\n          productRewardPoint {\\n            label\\n            value\\n          }\\n          productMaxBuy\\n          productInfoStock\\n          productWeight\\n          productInfoWeight\\n          cartMessage\\n        }\\n        productMaxBuy\\n        productInfoStock\\n        productWeight\\n        productInfoWeight\\n        isChecked\\n        cartMessage\\n      }\\n      shipping {\\n        info\\n        code\\n      }\\n      payment {\\n        paymentCode\\n        paymentName\\n        paymentDirectUrl\\n        isSingleAttempt3rdParty\\n      }\\n      paymentExpire\\n      createdAt\\n      totalBill\\n      totalCart\\n      note\\n      infoCancel\\n      isReceived\\n      isReviewed\\n      isWithinReviewPeriod\\n      isHaveResi\\n      totalResi\\n      source\\n      isShowReviewButton\\n      isShowReviewButtonV2\\n    }\\n  }\\n}\\n"}]',
  method: 'POST',
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});

const res = [
  {
    data: {
      getOrderList: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
          page: 1,
          size: 4,
          totalData: 1,
          totalPage: 1,
        },
        result: [
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35456,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/GD-2128-66%2FGD-2128-66.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Eleganza GD-2128-66 Ladies Gunmetal Dial Gunmetal Stainless Steel Strap [No Box]',
              productPrice: 354000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 1770,
              },
              productSlicePrice: 809000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 354000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 10:19',
            infoCancel: '',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Bayar sebelum: \n23 Desember 2024, 12:19 \nMetode pembayaran: \nBCA Virtual Account',
            orderID: 2412238715,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 12:19',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Belum Bayar',
            statusOrderCode: 'notYetPaid',
            storeStrukID: 0,
            totalBill: 365000,
            totalCart: 1,
            totalResi: 0,
          },
        ],
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          'e96966b62239446eec0f7ec325cc86ae9f0aee25d257e6f83bb6f64dc6408dd8',
        version: '1',
      },
    },
  },
];

const res2 = [
  {
    data: {
      getOrderList: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
          page: 1,
          size: 4,
          totalData: 1,
          totalPage: 1,
        },
        result: [
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35456,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/GD-2128-66%2FGD-2128-66.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Eleganza GD-2128-66 Ladies Gunmetal Dial Gunmetal Stainless Steel Strap [No Box]',
              productPrice: 354000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 1770,
              },
              productSlicePrice: 809000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 354000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 10:19',
            infoCancel: 'Lainnya',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Ups pesanan kamu gagal. Order lagi yuk!',
            orderID: 2412238715,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 12:19',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Dibatalkan',
            statusOrderCode: 'canceled',
            storeStrukID: 0,
            totalBill: 365000,
            totalCart: 1,
            totalResi: 0,
          },
        ],
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          'e96966b62239446eec0f7ec325cc86ae9f0aee25d257e6f83bb6f64dc6408dd8',
        version: '1',
      },
    },
  },
];

// coba

fetch('https://gateway.jamtangan.com/query', {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6Ijg4YWY1ZWFiLTYyNmEtNDkyNi1hNDUxLTIwY2IyYzhkNGJhMyIsImFjY291bnRfZW1haWwiOiJzZXJlbml0eS5wZXRhbEBnbXguY29tIiwiYWNjb3VudF9pZCI6ODQ5OTQyLCJhY2NvdW50X3R5cGUiOiJVU0VSIiwiZXhwIjoxNzM0OTI2OTk1LCJpc19sb2dpbiI6dHJ1ZX0.C_6qmrvsDEoDrANN7MfVAPvJrh5lnOrFphaXJ4NsuYI',
  },
  body: JSON.stringify([
    {
      operationName: 'getCartListV2',
      variables: {},
      query:
        'query getCartListV2 {\n  getCartListV2 {\n    __typename\n    meta {\n      __typename\n      message\n      error\n      code\n    }\n    result {\n      __typename\n      totalPoint\n      totalAmount\n      totalData\n      analytic {\n        __typename\n        currency\n        value\n        items {\n          __typename\n          item_id\n          item_name\n          item_brand\n          item_category\n          item_category2\n          item_category3\n          item_category4\n          item_category5\n          item_variant\n        }\n        quantity\n        description\n        content_id\n        content_ids\n        content_type\n        category_id\n        category_name\n        brand_id\n        brand_name\n        sub_brand_id\n        sub_brand_name\n        product_id\n        product_name\n        product_price\n        fb_content_id\n        fb_content_type\n        fb_currency\n        fb_num_items\n        fb_price\n      }\n      listCart {\n        __typename\n        deliveryEstimate\n        isBackToNormal\n        analytic {\n          __typename\n          brandID\n          brandName\n          categoryID\n          categoryName\n          function\n          lugWidth\n          movement\n          productBrand\n          productColour\n          productID\n          productImage\n          productLink\n          productName\n          productPrice\n          productSku\n          strapMaterial\n          subBrandID\n          subBrandName\n          productQty\n          subtotal\n          items {\n            __typename\n            index\n            item_id\n            item_name\n            item_brand\n            item_category\n            item_category2\n            item_category3\n            item_category4\n            item_category5\n            item_variant\n            item_list_id\n            item_list_name\n            coupon\n            price\n            quantity\n            discount\n            currency\n            affiliation\n          }\n        }\n        cartMessage\n        cartID\n        brandID\n        productID\n        productDiscount\n        productName\n        productImage\n        productQuantity\n        productPrice\n        productSlicePrice\n        productTotalPrice\n        productSlug\n        productUrlTracking\n        productDiscount\n        productIsWishlist\n        productCategory\n        productSku\n        brandName\n        productSeries\n        productColor\n        productStatus {\n          __typename\n          isOos\n          isComingSoon\n          isReady\n          isPreorder\n          isLatest\n        }\n        productLabel {\n          __typename\n          isFreeShipping\n          isFreeInsurance\n          isFlashSale\n          isBundlingStrap\n          isNewArrival\n          isJdm\n          isBestSeller\n          event {\n            __typename\n            status\n            badge\n            title\n          }\n        }\n        productRewardPoint {\n          __typename\n          label\n          value\n        }\n        productBundling {\n          __typename\n          analytic {\n            __typename\n            brandID\n            brandName\n            categoryID\n            categoryName\n            function\n            lugWidth\n            movement\n            productBrand\n            productColour\n            productID\n            productImage\n            productLink\n            productName\n            productPrice\n            productSku\n            strapMaterial\n            subBrandID\n            subBrandName\n            productQty\n            subtotal\n            items {\n              __typename\n              index\n              item_id\n              item_name\n              item_brand\n              item_category\n              item_category2\n              item_category3\n              item_category4\n              item_category5\n              item_variant\n              item_list_id\n              item_list_name\n              coupon\n              price\n              quantity\n              discount\n              currency\n              affiliation\n            }\n          }\n          cartMessage\n          brandID\n          productID\n          productDiscount\n          cartID\n          productName\n          productImage\n          productQuantity\n          productPrice\n          productSlicePrice\n          productTotalPrice\n          productSlug\n          productSku\n          productDiscount\n          productIsWishlist\n          productStatus {\n            __typename\n            isOos\n            isComingSoon\n            isReady\n            isPreorder\n            isLatest\n          }\n          productLabel {\n            __typename\n            isFreeShipping\n            isFreeInsurance\n            isFlashSale\n            isBundlingStrap\n            isNewArrival\n            isJdm\n            isBestSeller\n            event {\n              __typename\n              status\n              badge\n              title\n            }\n          }\n          productRewardPoint {\n            __typename\n            label\n            value\n          }\n          productMaxBuy\n          productInfoStock\n          productStock\n        }\n        productMaxBuy\n        productInfoStock\n        isChecked\n        productStock\n      }\n      listCartOos {\n        __typename\n        deliveryEstimate\n        isBackToNormal\n        analytic {\n          __typename\n          brandID\n          brandName\n          categoryID\n          categoryName\n          function\n          lugWidth\n          movement\n          productBrand\n          productColour\n          productID\n          productImage\n          productLink\n          productName\n          productPrice\n          productSku\n          strapMaterial\n          subBrandID\n          subBrandName\n          productQty\n          subtotal\n          items {\n            __typename\n            index\n            item_id\n            item_name\n            item_brand\n            item_category\n            item_category2\n            item_category3\n            item_category4\n            item_category5\n            item_variant\n            item_list_id\n            item_list_name\n            coupon\n            price\n            quantity\n            discount\n            currency\n            affiliation\n          }\n        }\n        cartMessage\n        cartID\n        brandID\n        productID\n        productDiscount\n        productName\n        productImage\n        productQuantity\n        productPrice\n        productSlicePrice\n        productTotalPrice\n        productSlug\n        productUrlTracking\n        productDiscount\n        productIsWishlist\n        productCategory\n        productSku\n        brandName\n        productSeries\n        productColor\n        productStatus {\n          __typename\n          isOos\n          isComingSoon\n          isReady\n          isPreorder\n          isLatest\n        }\n        productLabel {\n          __typename\n          isFreeShipping\n          isFreeInsurance\n          isFlashSale\n          isBundlingStrap\n          isNewArrival\n          isJdm\n          isBestSeller\n          event {\n            __typename\n            status\n            badge\n            title\n          }\n        }\n        productRewardPoint {\n          __typename\n          label\n          value\n        }\n        productBundling {\n          __typename\n          analytic {\n            __typename\n            brandID\n            brandName\n            categoryID\n            categoryName\n            function\n            lugWidth\n            movement\n            productBrand\n            productColour\n            productID\n            productImage\n            productLink\n            productName\n            productPrice\n            productSku\n            strapMaterial\n            subBrandID\n            subBrandName\n            productQty\n            subtotal\n            items {\n              __typename\n              index\n              item_id\n              item_name\n              item_brand\n              item_category\n              item_category2\n              item_category3\n              item_category4\n              item_category5\n              item_variant\n              item_list_id\n              item_list_name\n              coupon\n              price\n              quantity\n              discount\n              currency\n              affiliation\n            }\n          }\n          cartMessage\n          brandID\n          productID\n          productDiscount\n          cartID\n          productName\n          productImage\n          productQuantity\n          productPrice\n          productSlicePrice\n          productTotalPrice\n          productSlug\n          productSku\n          productDiscount\n          productIsWishlist\n          productStatus {\n            __typename\n            isOos\n            isComingSoon\n            isReady\n            isPreorder\n            isLatest\n          }\n          productLabel {\n            __typename\n            isFreeShipping\n            isFreeInsurance\n            isFlashSale\n            isBundlingStrap\n            isNewArrival\n            isJdm\n            isBestSeller\n            event {\n              __typename\n              status\n              badge\n              title\n            }\n          }\n          productRewardPoint {\n            __typename\n            label\n            value\n          }\n          productMaxBuy\n          productInfoStock\n          productStock\n        }\n        productMaxBuy\n        productInfoStock\n        isChecked\n        productStock\n      }\n      info {\n        __typename\n        id\n        type\n        message\n      }\n      isOverload\n    }\n  }\n}',
    },
  ]),
  method: 'POST',
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});

fetch('https://gateway.jamtangan.com/query', {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6ImI2Y2IxODA1LWZmNjMtNGU4YS05MzQwLTE0NWRhMDZmMDVlMyIsImFjY291bnRfZW1haWwiOiJzZXJlbml0eS5wZXRhbEBnbXguY29tIiwiYWNjb3VudF9pZCI6ODQ5OTQyLCJhY2NvdW50X3R5cGUiOiJVU0VSIiwiZXhwIjoxNzM0OTI3ODk1LCJpc19sb2dpbiI6dHJ1ZX0.e9pxdLDS7fPf4epPr-0tsN1x3xbGqV64Cr-LKPxw8Gw',
  },
  body: JSON.stringify([
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
  ]),
  method: 'POST',
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});

fetch('https://gateway.jamtangan.com/query', {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6IjFjN2JiNWI4LTcyNDMtNDY0MS04YzhlLTM3MzgwMWQyMDU0NyIsImFjY291bnRfZW1haWwiOiJzZXJlbml0eS5wZXRhbEBnbXguY29tIiwiYWNjb3VudF9pZCI6ODQ5OTQyLCJhY2NvdW50X3R5cGUiOiJVU0VSIiwiZXhwIjoxNzM0OTI2MDU4LCJpc19sb2dpbiI6dHJ1ZX0.0PcgL7oY07ZSL6Gmiq96uRme43WFvHtRbyJBdAuMSBI',
  },
  body: JSON.stringify([
    {
      operationName: 'getAddressList',
      variables: {
        size: 8,
        page: 1,
      },
      query:
        'query getAddressList($size: Int, $page: Int, $keyword: String) {\n  getAddressList(size: $size, page: $page, keyword: $keyword) {\n    meta {\n      page\n      size\n      sort\n      sortType\n      keyword\n      totalData\n      totalPage\n      message\n      error\n      code\n    }\n    result {\n      isSelected\n      isSelectedNew\n      isPrimary\n      addressID\n      addressName\n      addressPhone\n      addressLabel\n      addressZipCode\n      addressDetail\n      latitude\n      longitude\n      provinceID\n      provinceName\n      districtName\n      districtID\n      subdistrictName\n      subdistrictID\n      pinPointAddress\n    }\n  }\n}\n',
    },
  ]),
  method: 'POST',
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});

fetch('https://gateway.jamtangan.com/query', {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6ImI2Y2IxODA1LWZmNjMtNGU4YS05MzQwLTE0NWRhMDZmMDVlMyIsImFjY291bnRfZW1haWwiOiJzZXJlbml0eS5wZXRhbEBnbXguY29tIiwiYWNjb3VudF9pZCI6ODQ5OTQyLCJhY2NvdW50X3R5cGUiOiJVU0VSIiwiZXhwIjoxNzM0OTI3ODk1LCJpc19sb2dpbiI6dHJ1ZX0.e9pxdLDS7fPf4epPr-0tsN1x3xbGqV64Cr-LKPxw8Gw',
  },
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
          addressID: 608730,
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
  method: 'POST',
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});

const resTerakhir = [
  {
    data: {
      processCheckoutV2: {
        __typename: 'ProcessCheckoutV2Response',
        meta: {
          __typename: 'OrderMetaResponse',
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          __typename: 'ProcessCheckoutV2Result',
          isAddressAvailable: true,
          isContinueProcessCheckout: true,
          isGoToNewCheckout: true,
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          '31d995bb7771c651483536d2dd15dc8d14949082944c559ce9f415720eaedfcf',
        version: '1',
      },
    },
  },
  {
    data: {
      updateSummaryShipping: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          status: true,
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          '64befbfe5503217b26f4ae6a7128102f1aa759515e6c2d97c44a8efa91b5acea',
        version: '1',
      },
    },
  },
  {
    data: {
      updateSummaryPayment: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          status: true,
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          '20ebb427bc08774a9e46f7f076045aaf997eb2241c5b7bf1a196931a3169e1c1',
        version: '1',
      },
    },
  },
  {
    data: {
      getSummaryCheckoutV2: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          JTPointUsed: 0,
          bankPointRewardUsed: 0,
          insuranceAmount: 0,
          minimumPaymentInfo: 'Min. Rp10.000 untuk metode pembayaran ini.',
          pointReward: 2310,
          quantity: '1 pcs',
          shipping: {
            shippingAmount: 11000,
            shippingFinalAmount: 11000,
          },
          subTotal: 462000,
          total: 473000,
          voucherAmount: 0,
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          'd2de880b3e3edfc2aef170f3707f48d9296338401da81dd8a895f5007e72c202',
        version: '1',
      },
    },
  },
  {
    data: {
      getCheckoutSKUList: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          items: [
            {
              analytic: {
                brandID: 126,
                brandName: 'Giordano',
                categoryID: 1,
                categoryName: 'Jam Tangan',
                function: '',
                items: [
                  {
                    affiliation: 'Machtwatch',
                    coupon: '',
                    currency: 'IDR',
                    discount: 368000,
                    index: 0,
                    item_brand: 'Giordano',
                    item_category: 'Jam Tangan',
                    item_category2: 'Giordano',
                    item_category3: 'Giordano metropolitan',
                    item_category4: '',
                    item_category5: '',
                    item_id: '35315',
                    item_list_id: 'Flash Sale',
                    item_list_name: 'Flash Sale',
                    item_name:
                      'Giordano Metropolitan 1982-44 Diamond Men Silver Dial Dual Tone Stainless Steel Strap [No Box]',
                    item_variant: 'rose-gold;silver',
                    price: 682000,
                    quantity: 1,
                  },
                ],
                lugWidth: '',
                movement: '',
                productBrand: 'Giordano',
                productColour: 'rose-gold;silver',
                productID: 35315,
                productImage:
                  'https://assets.jamtangan.com/images/product/giordano/1982-44%2F1982-44.jpg',
                productLink:
                  'giordano-metropolitan-198244-diamond-men-silver-dial-dual-tone-stainless-steel-strap-[no-box]-353151',
                productName:
                  'Giordano Metropolitan 1982-44 Diamond Men Silver Dial Dual Tone Stainless Steel Strap [No Box]',
                productPrice: '682000',
                productQty: 1,
                productSku: '1982-44',
                strapMaterial: 'steel',
                subBrandID: 1389,
                subBrandName: 'Giordano metropolitan',
                subtotal: 682000,
              },
              isBundling: false,
              isPreorder: false,
              productBrandCode: 'giordano',
              productBundling: [],
              productFinalPrice: 462000,
              productID: 35315,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/1982-44%2F1982-44.jpg',
              productInfo: null,
              productName:
                'Giordano Metropolitan 1982-44 Diamond Men Silver Dial Dual Tone Stainless Steel Strap [No Box]',
              productQuantity: 1,
              productSKU: '1982-44',
              productWeight: '0.7 kg',
            },
          ],
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          '9339b7da37b24cc6d2a3a2dd052f3abfec2b1149546b563039be7aea58a5315f',
        version: '1',
      },
    },
  },
  {
    data: {
      addOrderV2: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
        },
        result: {
          payment: {
            orderId: 2412237260,
            redirectUrl: '',
            status: true,
          },
          status: true,
        },
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          '9b0d98e617b9937d94f4e757b3bc8e436b474393db51a014b6f7578dd3f425d4',
        version: '1',
      },
    },
  },
  {
    data: {
      getOrderList: {
        meta: {
          code: 'success',
          error: '',
          message: 'Success',
          page: 1,
          size: 4,
          totalData: 5,
          totalPage: 2,
        },
        result: [
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35315,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/1982-44%2F1982-44.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Metropolitan 1982-44 Diamond Men Silver Dial Dual Tone Stainless Steel Strap [No Box]',
              productPrice: 462000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 2310,
              },
              productSlicePrice: 1050000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 462000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 11:13',
            infoCancel: '',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Bayar sebelum: \n23 Desember 2024, 13:13 \nMetode pembayaran: \nBCA Virtual Account',
            orderID: 2412237260,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 13:13',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Belum Bayar',
            statusOrderCode: 'notYetPaid',
            storeStrukID: 0,
            totalBill: 473000,
            totalCart: 1,
            totalResi: 0,
          },
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35456,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/GD-2128-66%2FGD-2128-66.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Eleganza GD-2128-66 Ladies Gunmetal Dial Gunmetal Stainless Steel Strap [No Box]',
              productPrice: 354000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 1770,
              },
              productSlicePrice: 809000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 354000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 11:09',
            infoCancel: 'Lainnya',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Ups pesanan kamu gagal. Order lagi yuk!',
            orderID: 2412231563,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 13:09',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Dibatalkan',
            statusOrderCode: 'canceled',
            storeStrukID: 0,
            totalBill: 365000,
            totalCart: 1,
            totalResi: 0,
          },
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35456,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/GD-2128-66%2FGD-2128-66.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Eleganza GD-2128-66 Ladies Gunmetal Dial Gunmetal Stainless Steel Strap [No Box]',
              productPrice: 354000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 1770,
              },
              productSlicePrice: 809000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 354000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 11:01',
            infoCancel: 'Lainnya',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Ups pesanan kamu gagal. Order lagi yuk!',
            orderID: 2412235165,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 13:01',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Dibatalkan',
            statusOrderCode: 'canceled',
            storeStrukID: 0,
            totalBill: 365000,
            totalCart: 1,
            totalResi: 0,
          },
          {
            cart: {
              brandID: 0,
              cartID: 0,
              cartMessage: null,
              deliveryEstimate: '2 hari',
              isChecked: false,
              isNonReview: false,
              productBundling: [],
              productDiscount: 0,
              productID: 35456,
              productImage:
                'https://assets.jamtangan.com/images/product/giordano/GD-2128-66%2FGD-2128-66.jpg',
              productInfoStock: '',
              productInfoWeight: '',
              productIsWishlist: false,
              productLabel: {
                event: {
                  badge: '',
                  status: false,
                  title: '',
                },
                isBestSeller: false,
                isBundlingStrap: false,
                isFlashSale: false,
                isFreeInsurance: false,
                isFreeShipping: false,
                isJdm: false,
                isNewArrival: false,
              },
              productMaxBuy: 0,
              productName:
                'Giordano Eleganza GD-2128-66 Ladies Gunmetal Dial Gunmetal Stainless Steel Strap [No Box]',
              productPrice: 354000,
              productQuantity: 1,
              productRewardPoint: {
                label: '',
                value: 1770,
              },
              productSlicePrice: 809000,
              productSlug: '',
              productStatus: {
                isComingSoon: false,
                isLatest: false,
                isOos: false,
                isPreorder: false,
                isReady: false,
              },
              productStock: 0,
              productTotalPrice: 354000,
              productUrlTracking: '',
              productWeight: 0,
            },
            createdAt: '23-12-2024, 10:51',
            infoCancel: 'Lainnya',
            isHaveResi: false,
            isReceived: false,
            isReviewed: false,
            isShowReviewButton: true,
            isShowReviewButtonV2: false,
            isWithinReviewPeriod: false,
            note: 'Ups pesanan kamu gagal. Order lagi yuk!',
            orderID: 2412233707,
            payment: {
              isSingleAttempt3rdParty: false,
              paymentCode: 'VirtualAccount',
              paymentDirectUrl: '',
              paymentName: 'BCA Virtual Account',
            },
            paymentExpire: '23-12-2024, 12:51',
            shipping: {
              code: 'Regular',
              info: 'J&T EZ | Estimasi Pengiriman 2-3 Hari',
            },
            source: 'online',
            statusOrder: 'Dibatalkan',
            statusOrderCode: 'canceled',
            storeStrukID: 0,
            totalBill: 365000,
            totalCart: 1,
            totalResi: 0,
          },
        ],
      },
    },
    extensions: {
      persistedQuery: {
        sha265Hash:
          'e96966b62239446eec0f7ec325cc86ae9f0aee25d257e6f83bb6f64dc6408dd8',
        version: '1',
      },
    },
  },
];
