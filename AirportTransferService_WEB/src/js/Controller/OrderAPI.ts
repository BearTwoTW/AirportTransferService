import { ResultObj, AuthorizeFetch, AuthorizeFetch_forCustomer, AuthorizeFetch_SimsCustomer } from "../DomainTS";
/**訂單ID參數*/
export interface OrderParams {
  ec_order_id: string;
}
// #region 揀貨
/**查詢要揀貨的訂單總列表參數
   * @param {string} ec_order_code    商品主項流水號
   * @param {string} cre_date_start   單位換算流水號
   * @param {string} cre_date_end     自訂屬性細項流水號1
 * @returns
 */
export interface OrderPickingSearchParams {
  ec_order_code: string,
  cre_date_start: string,
  cre_date_end: string,
  logistics_id: string,
  position_id: string,
}
/**查詢要揀貨的訂單總列表結果 */
export interface OrderPickingSearchResItem {
  dt_o: [{
    cre_time: string,
    ec_order_logistics_id: string,
    ec_order_id: string,
    ec_order_code: string,
    ship_type: string,
    ship_type_name: string,
    logistics_name: string,
    position_store_name: string
  }],
  dt: [{
    ec_order_id: string,
    commodity_id: string,
    commodity_code: string,
    commodity_name: string,
    uc_id: string,
    ccad_name_1: string,
    ccad_id_1: string,
    ccad_name_2: string,
    ccad_id_2: string,
    count: number,
    ship_type: string,
    ship_type_name: string
  }]
}
/**查詢要揀貨的訂單 */
export const OrderPickingSearch = async (obj: OrderPickingSearchParams): Promise<ResultObj<OrderPickingSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Order/OrderPickingSearch", obj);
};

/**建立揀貨單主細項參數
 * @param {string} note   備註
 * @param {ec_order_ids[]} ec_order_ids   揀貨商品們
 * @returns
 */
export interface OrderPickingMasterCreateParams {
  note: string,
  ec_order_ids: string[],
  position_id: string
}
/**建立揀貨單主細項 */
export const OrderPickingMasterCreate = async (obj: OrderPickingMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderPickingMasterCreate", obj);
};

/**查詢揀貨單主項參數
 * @param {string} ec_opm_id        揀貨單主項流水號
 * @param {string} cre_date_start   建立日期起
 * @param {string} cre_date_end     建立日期迄
 * @param {string} name             姓名
 * @param {number} page             頁碼
 * @param {number} num_per_page     一頁幾筆
 * @returns
 */
export interface OrderPickingMasterSearchParams {
  ec_opm_id: string,
  position_id: string,
  cre_date_start: string,
  cre_date_end: string,
  name: string,
  page: number,
  num_per_page: number
}
/**查詢揀貨單主項結果 */
export interface OrderPickingMasterSearchResItem {
  cre_time: string,
  cre_userid: string,
  cre_username: string,
  cre_user_name: string,
  ec_opm_id: string,
  note: string,
  complete_time: string,
  ship_type: string,
  ship_type_name: string,
  series_connection_type: string,
  position_id: string,
  position_name: string
}
/**查詢揀貨單主項 */
export const OrderPickingMasterSearch = async (obj: OrderPickingMasterSearchParams): Promise<ResultObj<OrderPickingMasterSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Order/OrderPickingMasterSearch", obj);
};

/**查詢揀貨單細項參數
 * @param {string} ec_opm_id         揀貨單主項流水號
 * @param {string} ec_order_code     訂單編號
 * @param {string} excel          是否匯出
 * @param {number} page           頁碼
 * @param {number} num_per_page   一頁幾筆
 * @returns
 */
export interface OrderPickingDetailSearchParams {
  ec_opm_id: string,
  ec_order_code: string,
  excel: string,
  page: number,
  num_per_page: number,
}
/**查詢揀貨單細項+ 匯出excel */
export const OrderPickingDetailSearch = async (obj: OrderPickingDetailSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderPickingDetailSearch", obj);
};

/**訂單揀貨細項更新參數
 * @param {string} ec_opm_id  揀貨單主項流水號
 * @param {string} pick_list  訂單編號
 * @returns
 */
export interface OrderPickingDetailUpdateParams {
  ec_opm_id: string,
  pick_list: string[],
}
/**訂單揀貨細項更新 */
export const OrderPickingDetailUpdate = async (obj: OrderPickingDetailUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderPickingDetailUpdate", obj);
};

// #endregion
// #region 出貨單
/**刪除出貨單檔案參數 */
export interface OrderShipmentFilesDeleteParams {
  osf_idObj: string[]
}
/**刪除出貨單檔案 */
export const OrderShipmentFilesDelete = async (obj: OrderShipmentFilesDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderShipmentFilesDelete", obj);
};

/**新建出貨單檔案參數
 * @param {string} ec_opm_id            揀貨單主項流水號
 * @param {string} UploadHtmlPDFObj     出貨單們
 * @returns
 */
export interface OrderShipmentFilesCreateParams {
  ec_opm_id: string,
  UploadHtmlPDFObj: string[],
}
/**新建出貨單檔案結果 */
export interface OrderShipmentFilesCreateResItem {
  ec_order_id: string,
  osf_id: string
}
/**新建出貨單檔案 + HTML轉PDF */
export const OrderShipmentFilesCreate = async (obj: OrderShipmentFilesCreateParams): Promise<ResultObj<OrderShipmentFilesCreateResItem>> => {
  return await AuthorizeFetch("EC_Order/OrderShipmentFilesCreate", obj);
};

/**查詢出貨單檔案參數
 * @param {string} id   所屬流水號
 * @returns
 */
export interface OrderShipmentFilesSearchParams {
  id: string
}
/**查詢出貨單檔案結果 */
export interface OrderShipmentFilesSearchResItem {
  ec_order_id: string,
  file_code: string,
  path: string,
  ec_opm_id: string,
}
/**查詢出貨單檔案 */
export const OrderShipmentFilesSearch = async (obj: OrderShipmentFilesSearchParams): Promise<ResultObj<OrderShipmentFilesSearchResItem>> => {
  return await AuthorizeFetch("EC_Order/OrderShipmentFilesSearch", obj);
};

// #endregion
// #region 物流標籤
/**刪除物流標籤檔案參數 */
export interface OrderLogisticsFilesDeleteParams {
  olf_idObj: string[]
}
/**刪除物流標籤檔案 */
export const OrderLogisticsFilesDelete = async (obj: OrderLogisticsFilesDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderLogisticsFilesDelete", obj);
};

/**新建出貨單檔案參數
 * @param {string} ec_opm_id    揀貨單主項流水號
 * @param {string} OLFC_list   訂單總重&箱數物件們
 * @returns
 */
export interface OrderLogisticsFilesCreateParams {
  ec_opm_id: string,
  OLFC_list: string[],
}
/**新建出貨單檔案結果 */
export interface OrderLogisticsFilesCreateResItem {
  ec_order_id: string,
  file_code: string
  path: string
}
/**新建出貨單檔案 + HTML轉PDF */
export const OrderLogisticsFilesCreate = async (obj: OrderLogisticsFilesCreateParams): Promise<ResultObj<OrderLogisticsFilesCreateResItem>> => {
  return await AuthorizeFetch("EC_Order/OrderLogisticsFilesCreate", obj);
};

/**查詢物流標籤檔案參數
 * @param {string} id    揀貨單主項流水號
 * @returns
 */
export interface OrderLogisticsFilesSearchParams {
  id: string
}
/**查詢物流標籤檔案結果 */
export interface OrderLogisticsFilesSearchResItem {
  ec_order_id: string,
  ec_order_logistics_id: string
  file_code: string
  ec_opm_id: string
  path: string
}
/**查詢物流標籤檔案 */
export const OrderLogisticsFilesSearch = async (obj: OrderLogisticsFilesSearchParams): Promise<ResultObj<OrderLogisticsFilesSearchResItem>> => {
  return await AuthorizeFetch("EC_Order/OrderLogisticsFilesSearch", obj);
};
// #endregion
// #region 前台
/**加入購物車參數
 * @param {string} commodity_id  商品主項流水號
 * @param {string} uc_id         單位換算流水號
 * @param {string} ccad_id_1     自訂屬性細項流水號1
 * @param {string} ccad_id_2     自訂屬性細項流水號2
 * @param {string} count         數量
 * @returns
 */
export interface ShoppingCarAddParams {
  commodity_id: string;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
  count: number;
  logistics_id: number;
}
/**加入購物車 */
export const ShoppingCarAdd = async (obj: ShoppingCarAddParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarAdd", obj);
};

/**[模擬消費者]加入購物車 */
export const SimsShoppingCarAdd = async (obj: ShoppingCarAddParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarAdd", obj);
};

/**贈品加入購物車參數
 * @param {string} commodity_id   商品主項流水號
 * @param {string} uc_id          單位換算流水號
 * @param {string} ccad_id_1      自訂屬性細項流水號1
 * @param {string} ccad_id_2      自訂屬性細項流水號2
 * @param {string} count          數量
 * @param {string} promotion_id   促銷活動流水號
 * @param {string} pxg_id         促銷活動贈品流水號
 * @returns
 */
export interface ShoppingCarAddGiftParams {
  commodity_id: string;
  uc_id: string,
  ccad_id_1: string,
  ccad_id_2: string,
  count: string,
  customer_id: string,
  is_login: boolean,
  skip_search: boolean,
  promotion_id: string,
  pxg_id: string,
  gift_loop_now: string,
}

/**贈品加入購物車 */
export const ShoppingCarAddGift = async (obj: ShoppingCarAddGiftParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarAddGift", obj);
};
/**[模擬消費者]贈品加入購物車 */
export const SimsShoppingCarAddGift = async (obj: ShoppingCarAddGiftParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarAddGift", obj);
};

/**修改購物車(數量)參數
 * @param {string} csh_id   流水號
 * @param {string} count    數量
 * @returns
 */
export interface ShoppingCarUpdateParams {
  csh_id: string;
  count: number;
}
/**修改購物車(數量) */
export const ShoppingCarUpdate = async (obj: ShoppingCarUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarUpdate", obj);
};
/**[模擬消費者]修改購物車 */
export const SimsShoppingCarUpdate = async (obj: ShoppingCarUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarUpdate", obj);
};

/**移出購物車參數
 * @param {string} csh_id   流水號
 * @returns
 */
export interface ShoppingCarDeleteParams {
  csh_id: string;
}
/**移出購物車 */
export const ShoppingCarDelete = async (obj: ShoppingCarDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarDelete", obj);
};
/**[模擬消費者]移出購物車 */
export const SimsShoppingCarDelete = async (obj: ShoppingCarDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarDelete", obj);
};

/**查詢購物車參數
 * @param {string} csh_id 會員流水號
 * @param {string} discount_codes 輸入的折扣碼們
 * @param {string} pul_ids 選擇的優惠券們
 */
export interface ShoppingCarSearchParams {
  customer_id: string,
  discount_codes: string[],
  pul_ids: string[]
}

/**查詢購物車 */
export const ShoppingCarSearch = async (obj: ShoppingCarSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarSearch", obj);
};
/**[模擬消費者]查詢購物車 */
export const SimsShoppingCarSearch = async (obj: ShoppingCarSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarSearch", obj);
};

/**訂單結帳參數
 * @param {string} name                    姓名
 * @param {string} mobile_phone            手機
 * @param {string} email                   電子信箱
 * @param {string} city                    會員城市(聯絡)
 * @param {string} area                    會員區域(聯絡)
 * @param {string} address                 會員住址(聯絡)
 * @param {string} contact_name            聯絡人姓名
 * @param {string} contact_mobile_phone    聯絡人手機
 * @param {string} contact_email           聯絡人電子信箱
 * @param {string} contact_city            聯絡人城市(聯絡)
 * @param {string} contact_area            聯絡人區域(聯絡)
 * @param {string} contact_address         聯絡人住址(聯絡)
 * @param {string} note                    備註
 * @param {string} logistics_id            物流流水號
 * @param {string} cre_token               後台建訂單的操作人員
 * @returns
 */
export interface OrderCheckoutParams {
  name: string,
  mobile_phone: string,
  email: string,
  zip_code: string,
  city: string,
  area: string,
  address: string,
  contact_name: string,
  contact_mobile_phone: string,
  contact_email: string,
  contact_zip_code: string,
  contact_city: string,
  contact_area: string,
  contact_address: string,
  contact_time: string,
  note: string,
  logistics_id: number,
  cre_token: string,
  ec_payment: string,
  shopping_voucher: number,
  bonus_use: number,
  discount_codes: string[],
  pul_ids: string[],
  unifiedRegistrationNumber: string,
  carrierType: string,
  carrierID1: string,
  carrierID2: string,
  npoban: string,
  invoiceNo: string,
  invoiceDate: string,
  invoiceRandomNumber: string
}
/**訂單結帳 */
export const OrderCheckout = async (obj: OrderCheckoutParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/OrderCheckout", obj);
};
/**[模擬消費者]訂單結帳 */
export const SimsOrderCheckout = async (obj: OrderCheckoutParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/OrderCheckout", obj);
};

/**一次加入一堆到購物車(登入之後)參數
 * @param {string} order_id     會員流水號
 * @param {string[]} commoditys 要買的商品
 * @param {string[]} order_id   要買的商品
 * @returns
 */
export interface ShoppingCarAddGroupParams {
  customer_id: string;
  commoditys: string[];
  gifts: string[];
}
/**一次加入一堆到購物車(登入之後) */
export const ShoppingCarAddGroup = async (obj: ShoppingCarAddGroupParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/ShoppingCarAddGroup", obj);
};
/**[模擬消費者]一次加入一堆到購物車(登入之後) */
export const SimsShoppingCarAddGroup = async (obj: ShoppingCarAddGroupParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/ShoppingCarAddGroup", obj);
};

/**是否付款逾期 */
export const OrderExpiredTimeCheck = async (obj: OrderParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/OrderExpiredTimeCheck", obj);
};
/**[模擬消費者]是否付款逾期 */
export const SimsOrderExpiredTimeCheck = async (obj: OrderParams): Promise<ResultObj> => {
  return await AuthorizeFetch_SimsCustomer("EC_Order/OrderExpiredTimeCheck", obj);
};
// #endregion
// #region 訂單
/**訂單查詢參數
 * @description 訂單查詢
 * @param {string} customer_id      會員流水號
 * @param {string} customer_name    會員姓名
 * @param {string} order_code       訂單編號
 * @param {string} cre_date_start   建立日期起
 * @param {string} cre_date_end     建立日期迄
 * @param {string} sort_name        排序依據
 * @param {string} sort_order       排序順序
 * @param {string} page             頁碼
 * @param {string} num_per_page     一頁幾筆
 * @returns
 */
export interface OrderSearchParams {
  customer_id: string;
  customer_name: string;
  order_code: string;
  cre_date_start: string;
  cre_date_end: string;
  sort_name: string;
  sort_order: string;
  page: number;
  num_per_page: number;
}
/**訂單查詢結果 */
export interface OrderSearchResItem {
  dt_o: {
    cre_time: string,
    ec_order_id: string,
    ec_order_code: string,
    customer_name: string,
    total_price: number,
    expired_time: string
  },
  dt_ol: [{
    ec_order_logistics_id: string,
    cre_time: string,
    ec_order_id: string,
    pick_time: string,
    pick_complete_time: string,
    pay_time: string,
    ship_time: string,
    ship_arrive_time: string,
    cancel_apply_time: string,
    cancel_check_note: string,
    return_apply_time: string,
    return_check_note: string,
    logistics_id: number,
    logistics_name: string,
    logistics_freight: number,
    ship_type: string,
    ship_type_name: string,
    series_connection_type: string,
    isfreightfree: string,
    ec_opm_id: string,
    note: string,
    order_message: string,
    total_weight: number,
    officesite_pay_status: string,
    officesite_order_status: string,
    pay_status: string,
    pick_status: string,
    ship_status: string,
    order_status: string,
    preorder_stock_enough: true,
    cancel_check_time: string,
    return_check_time: string,
    return_confirm_time: string,
    return_receive_time: string,
    return_accept_time: string,
    refund_over_time: string,
    cancel_user_id: string,
    cancel_username: string,
    cancel_customer_id: string,
    return_user_id: string,
    return_username: string,
    return_customer_id: string
  }]
}
/**訂單查詢 */
export const OrderSearch = async (obj: OrderSearchParams, is_front: boolean = false): Promise<ResultObj<OrderSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Order/OrderSearch", obj);
  } else {
    return await AuthorizeFetch("EC_Order/OrderSearch", obj);
  }
};

/**訂單細項參數 */
export interface OrderDetailParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  customer_id: string,
  customer_name: string,
  ec_order_code: string,
  cre_date_start: string,
  cre_date_end: string,
  position_id: string,
  logistics_id: number,
  ship_type: string,
  sort_name: string,
  sort_order: string,
  page: number,
  num_per_page: number,
  officesite_pay_statuses: string[],
  officesite_order_statuses: string[],
  pay_statuses: string[],
  pick_statuses: string[],
  ship_statuses: string[],
  order_statuses: string[],
  transfer_account: string,
  transfer_account_seller: string,
  ec_payment: string,
  ec_refund_payment: string,
  preorder_stock_hint: boolean
}
/**訂單細項結果 */
export interface OrderDetailResItem {
  dt_o: {
    cre_time: string,
    ec_order_id: string,
    ec_order_code: string,
    customer_id: string,
    customer_name: string,
    customer_email: string,
    customer_mobile_phone: string,
    zip_code: string,
    city: string,
    area: string,
    customer_address: string,
    total_price: number,
    shopping_voucher: number,
    bonus_use: number,
    bonus_get: number,
    refund_shopping_voucher: number,
    expired_time: string,
    transfer_account: string,
    transfer_account_seller: string,
    transfer_bank_code_seller: string,
    transfer_bank_name_seller: string,
    ec_payment: string,
    ec_payment_name: string,
    promotion_ids: string,
    order_message_list: [{
      cre_time: string,
      id: number,
      ec_order_id: string,
      ec_order_code: string,
      user_id: string,
      username: string,
      user_name: string,
      customer_id: string,
      customer_name: string,
      message: string
    }],
    unifiedRegistrationNumber: string,
    carrierType: string,
    carrierID1: string,
    carrierID2: string,
    npoban: string,
    invoiceNo: string,
    invoiceDate: string,
    invoiceRandomNumber: string
  },
  dt_ol: [
    {
      ec_order_logistics_id: string,
      cre_time: string,
      ec_order_id: string,
      contact_name: string,
      contact_email: string,
      contact_mobile_phone: string,
      contact_zip_code: string,
      contact_city: string,
      contact_area: string,
      contact_address: string,
      contact_time: string,
      return_name: string,
      return_mobile_phone: string,
      return_zip_code: string,
      return_city: string,
      return_area: string,
      return_address: string,
      refund: number,
      refund_shopping_voucher: number,
      pick_time: string,
      pick_complete_time: string,
      pay_time: string,
      ship_time: string,
      ship_arrive_time: string,
      cancel_apply_time: string,
      cancel_user_id: string,
      cancel_username: string,
      cancel_user_name: string,
      cancel_customer_id: string,
      cancel_check_note: string,
      cancel_check_agree: string,
      return_apply_time: string,
      return_user_id: string,
      return_username: string,
      return_user_name: string,
      return_customer_id: string,
      return_check_note: string,
      return_check_agree: string,
      logistics_id: number,
      logistics_name: string,
      logistics_freight: number,
      ship_type: string,
      ship_type_name: string,
      series_connection_type: string,
      position_name: string,
      position_store_name: string,
      position_city: string,
      position_area: string,
      position_address: string,
      position_bussiness_hour: string,
      isfreightfree: string,
      ec_opm_id: string,
      note: string,
      order_message: string,
      total_weight: number,
      hct_weight: string,
      hct_weight_name: string,
      box_quantity: number,
      logistics_RESQUEST_ID: string,
      logistics_RESPONSE_ID: string,
      logistics_RESPONSE_MSG: string,
      logistics_RETURN_RESPONSE_ID: string,
      logistics_RETURN_RESPONSE_MSG: string,
      other_code: string,
      delivery_code: string,
      officesite_pay_status: string,
      officesite_order_status: string,
      pay_status: string,
      pick_status: string,
      ship_status: string,
      order_status: string,
      preorder_stock_enough: true,
      cancel_check_time: string,
      return_check_time: string,
      return_receive_time: string,
      return_confirm_time: string,
      return_accept_time: string,
      refund_over_time: string,
      ec_refund_payment: string,
      ec_refund_payment_name: string,
      refund_note: string,
      cancel_apply_note: string,
      return_apply_note: string,
      transfer_account_return: string,
      transfer_bank_code_return: string,
      transfer_bank_name_return: string
    }
  ],
  dt_oc_c: [
    {
      ec_oc_id: number,
      ec_order_id: string,
      ec_order_logistics_id: string,
      commodity_id: string,
      commodity_code: string,
      commodity_name: string,
      iscombination: string,
      uc_id: string,
      convert_unit_id: string,
      convert_unit_name: string,
      convert_count: number,
      basic_unit_id: string,
      basic_unit_name: string,
      basic_count: number,
      count: number,
      suggested_price: number,
      sale_price: number,
      ccad_id_1: string,
      ccad_name_1: string,
      ccad_id_2: string,
      ccad_name_2: string,
      isgift: string,
      filepath_headshot: string,
      is_preorder: string,
      ship_type: string,
      ship_type_name: string,
      acceptance_note: string
    }
  ],
  dt_oc_g: [
    {
      ec_oc_id: number,
      ec_order_id: string,
      ec_order_logistics_id: string,
      commodity_id: string,
      commodity_code: string,
      commodity_name: string,
      iscombination: string,
      uc_id: string,
      convert_unit_id: string,
      convert_unit_name: string,
      convert_count: number,
      basic_unit_id: string,
      basic_unit_name: string,
      basic_count: number,
      count: number,
      suggested_price: number,
      sale_price: number,
      ccad_id_1: string,
      ccad_name_1: string,
      ccad_id_2: string,
      ccad_name_2: string,
      isgift: string,
      filepath_headshot: string,
      is_preorder: string,
      ship_type: string,
      ship_type_name: string,
      acceptance_note: string
    }
  ],
  dt_occd: [
    {
      ec_occd_id: number,
      ec_order_id: string,
      commoditycombination_id: string,
      commodity_id: string,
      commodity_code: string,
      commodity_name: string,
      uc_id: string,
      convert_unit_id: string,
      convert_unit_name: string,
      convert_count: number,
      basic_unit_id: string,
      basic_unit_name: string,
      basic_count: number,
      ccad_id_1: string,
      ccad_name_1: string,
      ccad_id_2: string,
      ccad_name_2: string,
      count: number,
      sale_price: number,
      filepath_headshot: string
    }
  ]
}
/**訂單細項 */
export const OrderDetail = async (obj: OrderDetailParams, is_front: boolean = false): Promise<ResultObj<OrderDetailResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer('EC_Order/OrderDetail', obj)
  } else {
    return await AuthorizeFetch("EC_Order/OrderDetail", obj);
  }
};

/**訂單修改參數 */
export interface OrderDetailUpdateParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  order_message: string,
  other_code: string,
  unifiedRegistrationNumber: string,
  carrierID1: string,
  carrierID2: string
}
/**訂單修改 */
export const OrderDetailUpdate = async (obj: OrderDetailUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderDetailUpdate", obj);
};

// /**訂單取消參數
//  * @param {string} ec_order_id   訂單流水號
//  * @param {string} order_message 訂單備註
//  * @returns
//  */
// export interface OrderCancelParams {
//   ec_order_id: string;
//   order_message: string;
// }
// /**訂單取消 */
// export const OrderCancel = async (obj: OrderCancelParams): Promise<ResultObj> => {
//   return await AuthorizeFetch("EC_Order/OrderCancel", obj);
// };

/**會員取消訂單參數 */
export interface OrderCustomerCancelParams {
  ec_order_id: string,
  customer_id: string,
  order_message: string,
  transfer_bank_code_return: string,
  transfer_account_return: string,
  transfer_bank_name_return: string,// 暫時用不到
}
/**會員取消訂單 */
export const OrderCustomerCancel = async (obj: OrderCustomerCancelParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Order/OrderCustomerCancel", obj);
};

/**訂單出貨參數
 * @param {string} ec_order_id   訂單流水號
 * @param {string} delivery_code 物流編號
 * @returns
 */
export interface OrderShipmentParams {
  ec_order_id: string;
  delivery_code: string;
}
/**訂單出貨 */
export const OrderShipment = async (obj: OrderShipmentParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderShipment", obj);
};

/**訂單付款 */
export const OrderPaid = async (obj: OrderParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderPaid", obj);
};
// #endregion
// #region 後臺建訂單
/**查詢客戶資料+取得客戶token參數 */
export interface OrderCreateCustomerSearchParams {
  name: string,
  mobile_phone: string,
  device_type: string,
  device_code: string,
}
/**查詢客戶資料+取得客戶token */
export const OrderCreateCustomerSearch = async (obj: OrderCreateCustomerSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderCreateCustomerSearch", obj);
};
// #endregion
// #region 貨況
/**物流貨況查詢參數 */
export interface OrderShipmentHCTSearchParams {
  name: string,
  mobile_phone: string,
  device_type: string,
  device_code: string,
}
/**物流貨況查詢結果 */
export interface OrderShipmentHCTSearchResItem {
  ec_order_id: string,
  ec_order_logistics_id: string,
  hct_url: string
}
/**物流貨況查詢 */
export const OrderShipmentHCTSearch = async (obj: OrderShipmentHCTSearchParams, is_front: boolean = false): Promise<ResultObj<OrderShipmentHCTSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer('EC_Order/OrderShipmentHCTSearch', obj)
  } else {
    return await AuthorizeFetch("EC_Order/OrderShipmentHCTSearch", obj);
  }
};

/**訂單出貨狀態更新 出貨中之後到已取貨的狀態更新參數 */
export interface OrderShipmentStatusUpdateParams {
  ec_order_list: string[],
}
/**訂單出貨狀態更新 出貨中之後到已取貨的狀態更新 */
export const OrderShipmentStatusUpdate = async (obj: OrderShipmentStatusUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Order/OrderShipmentStatusUpdate", obj);
};

/**訂單修改匯款帳號參數 */
export interface OrderUpdateTransferParams {
  ec_order_id: string,
  transfer_account: string,
}
/**訂單修改匯款帳號 */
export const OrderUpdateTransfer = async (obj: OrderUpdateTransferParams, is_front: boolean = false): Promise<ResultObj> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer('EC_Order/OrderUpdateTransfer', obj)
  } else {
    return await AuthorizeFetch('EC_Order/OrderUpdateTransfer', obj)
  }
};

/**訂單託運總表參數 */
export interface OrderConsignmentSearchParams {
  ec_order_ids: string[],
  pick_time_start: string,
  pick_time_end: string,
  logistics_id: number,
  position_id: string
}
/**訂單託運總表結果 */
export interface OrderConsignmentSearchResItem {
  ec_order_id: string,
  ec_order_code: string,
  contact_name: string,
  contact_mobile_phone: string,
  contact_zip_code: string,
  contact_city: string,
  contact_area: string,
  contact_address: string,
  logistics_id: number,
  logistics_name: string,
  logistics_freight: number,
  isfreightfree: string,
  ec_opm_id: string,
  note: string,
  order_message: string,
  total_weight: number,
  hct_weight: string,
  hct_weight_name: string,
  box_quantity: number,
  logistics_RESQUEST_ID: string,
  logistics_RESPONSE_ID: string,
  logistics_RESPONSE_MSG: string,
  delivery_code: string
}
/**訂單託運總表 */
export const OrderConsignmentSearch = async (obj: OrderConsignmentSearchParams): Promise<ResultObj<OrderConsignmentSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Order/OrderConsignmentSearch", obj);
};
// #endregion
// #region 退貨
/**訂單取消確認參數 */
export interface OrderCancelCheckParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  isagree: string,
  cancel_check_note: string,
  transfer_bank_code_return: string,
  transfer_account_return: string
}
/**訂單取消確認 */
export const OrderCancelCheck = async (obj: OrderCancelCheckParams): Promise<ResultObj> => {
  return await AuthorizeFetch('EC_Order/OrderCancelCheck', obj)
};

/**訂單退貨參數 */
export interface OrderReturnParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  return_name: string,
  return_phone: string,
  return_zip_code: string,
  return_city: string,
  return_area: string,
  return_address: string,
  box_quantity: number
}
/**訂單退貨 */
export const OrderReturn = async (obj: OrderReturnParams): Promise<ResultObj> => {
  return await AuthorizeFetch('EC_Order/OrderReturn', obj)
};

/**訂單退貨狀態更新 退貨中之後到已收到退貨的狀態更新參數 */
export interface OrderShipmentReturnStatusUpdateParams {
  ec_order_list: string[]
}
/**訂單退貨狀態更新 退貨中之後到已收到退貨的狀態更新 */
export const OrderShipmentReturnStatusUpdate = async (obj: OrderShipmentReturnStatusUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch('EC_Order/OrderShipmentReturnStatusUpdate', obj)
};

/**訂單退貨驗貨參數 */
export interface OrderReturnAcceptanceParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  order_return_list: string[]
}
/**訂單退貨驗貨 */
export const OrderReturnAcceptance = async (obj: OrderReturnAcceptanceParams): Promise<ResultObj> => {
  return await AuthorizeFetch('EC_Order/OrderReturnAcceptance', obj)
};

/**訂單退款參數 */
export interface OrderRefundParams {
  ec_order_id: string,
  ec_order_logistics_id: string,
  refund_shopping_voucher: string,
  refund: string,
  ec_refund_payment: string,
  refund_note: string,
  transfer_bank_code_return: string,
  transfer_account_return: string
}
/**訂單退款 */
export const OrderRefund = async (obj: OrderRefundParams): Promise<ResultObj> => {
  return await AuthorizeFetch('EC_Order/OrderRefund', obj)
};

// #endregion
// #region 訂單問與答
/**控制台查詢有訊息的訂單參數 */
export interface OrderMessageChatSearchParams {
  ec_order_code: string,
  cre_date_start: string,
  cre_date_end: string,
  page: number,
  num_per_page: number
}
/**控制台查詢有訊息的訂單結果 */
export interface OrderMessageChatSearchResItem {
  cre_time: string,
  id: number,
  ec_order_id: string,
  ec_order_code: string,
  user_id: string,
  username: string,
  user_name: string,
  customer_id: string,
  customer_name: string,
  message: string
}
/**控制台查詢有訊息的訂單 */
export const OrderMessageChatSearch = async (obj: OrderMessageChatSearchParams): Promise<ResultObj<OrderMessageChatSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Order/OrderMessageChatSearch", obj);
};

/**訂單物流留言建立參數 */
export interface OrderMessageCreateParams {
  ec_order_id: string,
  message: string
}
/**訂單物流留言建立 */
export const OrderMessageCreate = async (obj: OrderMessageCreateParams, is_front: boolean = false): Promise<ResultObj> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer('EC_Order/OrderMessageCreate', obj);
  } else {
    return await AuthorizeFetch('EC_Order/OrderMessageCreate', obj);
  }
};

/**訂單物流留言查詢參數 */
export interface OrderMessageSearchParams {
  ec_order_id: string,
  page: number,
  num_per_page: number
}
/**訂單物流留言查詢結果 */
export interface OrderMessageSearchResItem {
  cre_time: string,
  id: number,
  ec_order_id: string,
  ec_order_code: string,
  user_id: string,
  username: string,
  user_name: string,
  customer_id: string,
  customer_name: string,
  message: string
}
/**訂單物流留言查詢 */
export const OrderMessageSearch = async (obj: OrderMessageSearchParams, is_front: boolean = false): Promise<ResultObj<OrderMessageSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer('EC_Order/OrderMessageSearch', obj);
  } else {
    return await AuthorizeFetch('EC_Order/OrderMessageSearch', obj);
  }
};
// #endregion
