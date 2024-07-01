import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button } from '@mui/material';

export default function ApplePay() {

  const ApplePaySession = window.ApplePaySession;
  // Define ApplePayPaymentRequest
  const request = {
    "countryCode": "US",
    "currencyCode": "USD",
    "merchantCapabilities": [
      "supports3DS"
    ],
    "supportedNetworks": [
      "visa",
      "masterCard",
      "amex",
      "discover"
    ],
    "total": {
      "label": "Demo (Card is not charged)",
      "type": "final",
      "amount": "1.99"
    }
  };
  console.log("ApplePaySession", ApplePaySession)
  console.log("window", window)

  useEffect(() => {
    if (ApplePaySession) {
      const session = new window.ApplePaySession(3, request);
      console.log("session", session)

      const merchantIdentifier = 'merchant.com.ecc';
      // 檢查是否支援 Apple Pay
      if (ApplePaySession.canMakePayments()) {
        // 檢查是否有可用的信用卡
        const promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);

        promise.then((canMakePayments) => {
          if (canMakePayments) {
            console.log('有可用的信用卡');

          } else {
            console.log('沒有可用的信用卡');
          }
        });
      } else {
        console.log('Cannot make payments 隱藏或不顯示 Apple Pay 支付按鈕');
      }
    } else {
      console.log('ApplePaySession is not available');
    }
  }, [ApplePaySession])


  const onApplePayButtonClicked = () => {
    console.log("ApplePaySession", ApplePaySession)
    if (!ApplePaySession) {
      return;
    }

    /**Create ApplePaySession 
     * @param unsignedlong version, 
     * @param ApplePayPaymentRequest paymentRequest
     */
    const session = new window.ApplePaySession(3, request);
    console.log("session", session)

    if (session) {
      session.onvalidatemerchant = async event => {
        const validationURL = event.validationURL;
        // Call your own server to request a new merchant session.
        const merchantSession = await validateMerchant(validationURL);
        console.log("merchantSession", merchantSession)
        session.completeMerchantValidation(merchantSession);
      };

      session.onpaymentmethodselected = event => {
        // 根據所選的支付方式定義ApplePayPaymentMethodUpdate。
        // 不需要進行更新或錯誤，傳遞一個空對象。
        const update = {};
        session.completePaymentMethodSelection(update);
      };

      session.onshippingmethodselected = event => {
        // 根據所選的運送方式定義ApplePayShippingMethodUpdate。
        // 不需要進行更新或錯誤，傳遞一個空對象。
        const update = {};
        session.completeShippingMethodSelection(update);
      };

      session.onshippingcontactselected = event => {
        // Define ApplePayShippingContactUpdate based on the selected shipping contact.
        const update = {};
        session.completeShippingContactSelection(update);
      };

      session.onpaymentauthorized = event => {
        // Define ApplePayPaymentAuthorizationResult
        const result = {
          "status": ApplePaySession.STATUS_SUCCESS
        };
        session.completePayment(result);
      };

      session.oncouponcodechanged = event => {
        // Define ApplePayCouponCodeUpdate
        // const newTotal = calculateNewTotal(event.couponCode);
        // const newLineItems = calculateNewLineItems(event.couponCode);
        // const newShippingMethods = calculateNewShippingMethods(event.couponCode);
        // const errors = calculateErrors(event.couponCode);


        // session.completeCouponCodeChange({
        //   newTotal: newTotal,
        //   newLineItems: newLineItems,
        //   newShippingMethods: newShippingMethods,
        //   errors: errors,
        // });
      };

      session.oncancel = event => {
        // Payment canceled by WebKit
      };

      session.begin();
    }
  }

  const validateMerchant = (url) => {

    return new Promise(function (resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/applepay/ValidateMerchant');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ validationUrl: url }));
    });
  }

  return (
    <React.Fragment>
      <Button className={"apple-pay-button"} onClick={() => onApplePayButtonClicked()}></Button>
      <apple-pay-button buttonstyle="black" type="plain" locale="en-US"></apple-pay-button>

      {/* <style type='text/css'
        dangerouslySetInnerHTML={{
          __html: `apple-pay-button {

            --apple-pay-button-width: 150px;
            --apple-pay-button-height: 30px;
            --apple-pay-button-border-radius: 3px;
            --apple-pay-button-padding: 0px 0px;
            --apple-pay-button-box-sizing: border-box;
            }`}}>
      </style> */}

      <style type='text/css'
        dangerouslySetInnerHTML={{
          __html: `.apple-pay-button {
            background-color: black !important;
            background-image: -webkit-named-image(apple-pay-logo-white)!important;
            background-position: 50% 50% !important;
            background-repeat: no-repeat !important;
            background-size: 100% calc(60% + 2px) !important;
            border-radius: 5px !important;
            float: left !important;
            height: 30px !important;
            margin: 0px 0px 10px 0px !important;
            width: 100px !important;
            }`}}>
      </style>
    </React.Fragment>
  )
}