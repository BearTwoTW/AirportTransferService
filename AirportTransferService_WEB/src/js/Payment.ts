/** 付款參數
 * @param {string} ec_order_code 訂單編號
 * @param {number} amount 金額
 * @param {string} ChoosePayment 付款方式 (綠界用)
 * @param {string} ChoosePaymentSub 付款方式子選項 (綠界用)
 */
export type PayParams = {
  ec_order_code: string;
  amount: number;
  ChoosePayment?: string;
  ChoosePaymentSub?: string;
};

/** 封裝各種付款串接 */
const PayMethods = (() => {
  /** 綠界刷卡
   * @param {PayParams} payParams 付款參數
   */
  const ECPay = async (payParams: PayParams): Promise<void> => {
    const response = await fetch(`${window.location.origin}/api/ECPayGreen/Send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        OrderID: payParams.ec_order_code,
        Amount: payParams.amount,
        ChoosePayment: payParams.ChoosePayment,
        ChoosePaymentSub: payParams.ChoosePaymentSub,
      }),
    });

    const text = await response.text();
    let div = document.body;
    if (div !== null) {
      div.innerHTML = text;
      const scripts = div.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        eval(script.innerHTML);
      }
    }
  };

  /** 中信刷卡
   * @param {PayParams} payParams 付款參數
   */
  const CTBCCreditCardPay = async (payParams: PayParams): Promise<void> => {
    const response = await fetch(`${window.location.origin}/CTBCBank/CreditCard/Send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        OrderID: payParams.ec_order_code,
        Amount: payParams.amount,
      }),
    });

    const text = await response.text();
    let div = document.body;
    if (div !== null) {
      div.innerHTML = text;
      const scripts = div.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        eval(script.innerHTML);
      }
    }
  };

  /** 富邦刷卡
   * @param {PayParams} payParams 付款參數
   */
  const FubonCreditCardPay = async (payParams: PayParams): Promise<void> => {
    console.log("這是富邦刷卡", payParams);
    alert("好像還沒看到文件");
  };

  /** LINE Pay
   * @param {PayParams} payParams 付款參數
   */
  const LinePay = async (payParams: PayParams): Promise<void> => {
    console.log("這是LINE Pay", payParams);
    alert("好像還沒看到文件");
  };

  return {
    ECPay,
    CTBCCreditCardPay,
    FubonCreditCardPay,
    LinePay,
  };
})();

/** 付款串接
 * @param {string} SeriesConnectionType 付款串接種類
 * @param {PayParams} payParams 付款參數
 */
export const usingPayment = async (SeriesConnectionType: string, payParams: PayParams) => {
  switch (SeriesConnectionType) {
    case "ECATMPay":
      return await PayMethods.ECPay({ ...payParams, ChoosePayment: "ATM" });
    case "ECCreditPay":
      return await PayMethods.ECPay({ ...payParams, ChoosePayment: "Credit", ChoosePaymentSub: "once" }); // 綠界信用卡，先寫死一次付清
    case "CTBCCreditPay":
      return await PayMethods.CTBCCreditCardPay(payParams);
    case "FubonCreditPay":
      return await PayMethods.FubonCreditCardPay(payParams);
    case "LinePay":
      return await PayMethods.LinePay(payParams);
    // 中信虛擬帳戶雖然也是串接，但他屬於一般轉帳，因此這邊串接就不做中信虛擬帳戶
  }
};
