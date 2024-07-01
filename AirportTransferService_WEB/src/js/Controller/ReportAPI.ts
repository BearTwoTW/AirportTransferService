import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**訂單銷售總表參數
 * @description 
 * @param {string} cre_date_start            建立日期起
 * @param {string} cre_date_end              建立日期迄
 * @param {number} logistics_id              物流流水號
 * @param {string} position_id               據點流水號
 * @param {string} officesite_pay_statuses   官網付款狀態們
 * @param {string} officesite_order_statuses 官網訂單狀態們
 * @param {string} pay_statuses              付款狀態們
 * @param {string} pick_statuses             揀貨狀態們
 * @param {string} ship_statuses             出貨狀態們
 * @param {string} order_statuses            訂單狀態們
 */
export interface EC_OrderSaleSummaryParams {
  cre_date_start: string
  cre_date_end: string
  logistics_id: number
  position_id: string
  officesite_pay_statuses: string[]
  officesite_order_statuses: string[]
  pay_statuses: string[]
  pick_statuses: string[]
  ship_statuses: string[]
  order_statuses: string[]
}

/**訂單銷售總表結果
 * @param {string} order_sale_summary_list  銷售統計物件
 * @param {number} order_create_today       本日新增訂單
 * @param {number} order_create_growth_rate 訂單成長率
 * @param {number} order_cancel_count       本日取消的訂單數
 * @param {number} order_return_count       本日退貨的訂單數
 * @param {number} order_wait_to_ship_count 訂單待出貨數
*/
export interface EC_OrderSaleSummaryResItem {
  order_sale_summary_list: [{
    month: string
    deal_price: number
    turnover_price: number
    customer_count: number
    deal_count: number
    order_count: number
    average_order_price: number
  }]
  order_create_today: number
  order_create_growth_rate: number
  order_cancel_count: number
  order_return_count: number
  order_wait_to_ship_count: number
}

/**訂單銷售總表 */
export const ECOrderSaleSummary = async (
  obj: EC_OrderSaleSummaryParams
): Promise<ResultObj<EC_OrderSaleSummaryResItem[]>> => {
  return await AuthorizeFetch("Report/EC_OrderSaleSummary", obj);
};

/**訂單促銷統計參數
 * @description 
 * @param {string} cre_date_start  建立日期起
 * @param {string} cre_date_end    建立日期迄
 * @param {string} position_id     據點流水號
 * @param {string[]} promotion_ids 促銷流水號們
 */
export interface EC_OrderPromotionSummaryParams {
  cre_date_start: string
  cre_date_end: string
  promotion_ids: string[]
}

/**訂單促銷統計結果
 * @param {string} order_promotion_summary_list  促銷統計物件
 * @param {number} order_create_today       本日新增訂單
 * @param {number} order_create_growth_rate 訂單成長率
 * @param {number} order_cancel_count       本日取消的訂單數
 * @param {number} order_return_count       本日退貨的訂單數
 * @param {number} order_wait_to_ship_count 訂單待出貨數
*/
export interface EC_OrderPromotionSummaryResItem {
  order_promotion_summary_list: [{
    month: string
    promotion_id: number
    promotion_name: number
    deal_price: number
    deal_count: number
  }]
  order_create_today: number
  order_create_growth_rate: number
  order_cancel_count: number
  order_return_count: number
  order_wait_to_ship_count: number
}

/**訂單促銷統計 */
export const EC_OrderPromotionSummary = async (
  obj: EC_OrderPromotionSummaryParams
): Promise<ResultObj<EC_OrderPromotionSummaryResItem[]>> => {
  return await AuthorizeFetch("Report/EC_OrderPromotionSummary", obj);
};


/**會員統計參數
 * @description 
 * @param {string} cre_date_start            建立日期起
 * @param {string} cre_date_end              建立日期迄
 * @param {string} position_id               據點流水號
 */
export interface EC_CustomerSummaryParams {
  cre_date_start: string
  cre_date_end: string
  position_id: string
}

/**會員統計結果
 * @param {string} customer_summary_list    會員統計物件
 * @param {number} order_create_today       本日新增訂單
 * @param {number} order_create_growth_rate 訂單成長率
 * @param {number} order_cancel_count       本日取消的訂單數
 * @param {number} order_return_count       本日退貨的訂單數
 * @param {number} order_wait_to_ship_count 訂單待出貨數
*/
export interface EC_CustomerSummaryResItem {
  customer_summary_list: [{
    month: string
    create_count: number
  }]
  order_create_today: number
  order_create_growth_rate: number
  order_cancel_count: number
  order_return_count: number
  order_wait_to_ship_count: number
}

/**會員統計表 */
export const ECCustomerSummary = async (
  obj: EC_CustomerSummaryParams
): Promise<ResultObj<EC_CustomerSummaryResItem[]>> => {
  return await AuthorizeFetch("Report/EC_CustomerSummary", obj);
};

/**安全庫存查詢參數
 * @param {string[]} commodity_ids 商品流水號
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type SafeStorageAlertParams = {
  commodity_ids: string[];
  page: number;
  num_per_page: number;
};

/**安全庫存查詢結果
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位轉換流水號
 * @param {number} count 數量
 * @param {number} safe_storage 安全庫存
 */
export type SafeStorageAlertResItem = {
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  count: number;
  safe_storage: number;
};

/**安全庫存查詢
 * @param {SafeStorageAlertResItem} obj 參數
 * @returns
 */
export const SafeStorageAlert = async (obj: SafeStorageAlertParams): Promise<ResultObj<SafeStorageAlertResItem[]>> => {
  return await AuthorizeFetch("Report/SafeStorageAlert", obj);
};

/**庫存滯銷查詢參數
 * @param {number} sluggish_day 滯銷天數
 * @param {string} position_id  據點流水號
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type EC_StockSluggishSaleParams = {
  sluggish_day: number;
  position_id: string;
  page: number;
  num_per_page: number;
};

/**庫存滯銷查詢結果
 * @param {number} order_create_today       本日新增訂單
 * @param {number} order_create_growth_rate 訂單成長率
 * @param {number} order_cancel_count       本日取消的訂單數
 * @param {number} order_return_count       本日退貨的訂單數
 * @param {number} order_wait_to_ship_count 訂單待出貨數
 * @param {string[]} order_stock_sluggish_sale_list 滯銷警告物件
 */
export type EC_StockSluggishSaleResItem = {
  order_create_today: number;
  order_create_growth_rate: number;
  order_cancel_count: number;
  order_return_count: number;
  order_wait_to_ship_count: number;
  order_stock_sluggish_sale_list: string[]
};

/**庫存滯銷查詢
 * @param {EC_StockSluggishSaleResItem} obj 參數
 * @returns
 */
export const EC_StockSluggishSale = async (obj: EC_StockSluggishSaleParams): Promise<ResultObj<EC_StockSluggishSaleResItem[]>> => {
  return await AuthorizeFetch("Report/EC_StockSluggishSale", obj);
};

/**訂單收入明細參數*/
export interface EC_OrderRevenueDetailParams {
  cre_date_start: string
  cre_date_end: string
  logistics_id: number
  position_id: string
  officesite_pay_statuses: string[]
  officesite_order_statuses: string[]
  pay_statuses: string[]
  pick_statuses: string[]
  ship_statuses: string[]
  order_statuses: string[]
  invoice_isopen: string
  page: number
  num_per_page: number
  excel: string
}

/**訂單收入明細結果
 * @param {string} ec_order_code        訂單編號
 * @param {string} pay_date             入帳日期
 * @param {string} invoiceNo            發票號碼
 * @param {string} customer_name        帳款對象
 * @param {string} total_price          總金額
 * @param {string} pay_price_credit     信用卡付款
 * @param {string} pay_price_transfer   轉帳付款
 * @param {string} pay_price_cash       現金付款
 * @param {string} pay_price_line       linepay付款
 * @param {string} pay_price_apple      apple付款
 * @param {string} bonus_get            紅利積點
 * @param {string} position_store_name  取貨門市
*/
export interface EC_OrderRevenueDetailResItem {
  ec_order_code: string,
  pay_date: string,
  invoiceNo: string,
  customer_name: string,
  total_price: number,
  pay_price_credit: number,
  pay_price_transfer: number,
  pay_price_cash: number,
  pay_price_line: number,
  pay_price_apple: number,
  bonus_get: number,
  position_store_name: string
}

/**訂單收入明細表 */
export const ECOrderRevenueDetail = async (
  obj: EC_OrderRevenueDetailParams
): Promise<ResultObj<EC_OrderRevenueDetailResItem[]>> => {
  return await AuthorizeFetch("Report/EC_OrderRevenueDetail", obj);
};

/**發票檢查表參數*/
export interface EC_OrderInvoiceDetailParams {
  cre_date_start: string
  cre_date_end: string
  invoiceDate_start: string
  invoiceDate_end: string
  logistics_id: number
  position_id: string
  officesite_pay_statuses: string[]
  officesite_order_statuses: string[]
  pay_statuses: string[]
  pick_statuses: string[]
  ship_statuses: string[]
  order_statuses: string[]
  invoice_isopen: string
  page: number
  num_per_page: number
  excel: string
}

/**發票檢查表結果
 * @param {string} invoiceNo                 發票號碼
 * @param {string} invoiceDate               發票日期
 * @param {string} unifiedRegistrationNumber 統一編號
 * @param {string} total_price               發票金額
 * @param {string} tax_price                 稅額
 * @param {string} sale_price                銷售金額
 * @param {string} ec_order_code             交易單號
 * @param {string} cre_date                  交易日期
 * @param {string} customer_name             交易對象
 * @param {string} position_store_name       取貨門市
*/
export interface EC_OrderInvoiceDetailResItem {
  invoiceNo: string,
  invoiceDate: string,
  unifiedRegistrationNumber: string,
  total_price: number,
  tax_price: number,
  sale_price: number,
  ec_order_code: string,
  cre_date: string,
  customer_name: string,
  position_store_name: string
}

/**發票檢查表 */
export const ECOrderInvoiceDetail = async (
  obj: EC_OrderInvoiceDetailParams
): Promise<ResultObj<EC_OrderInvoiceDetailResItem[]>> => {
  return await AuthorizeFetch("Report/EC_OrderInvoiceDetail", obj);
};

/**銷貨明細參數*/
export interface EC_OrderSaleDetailParams {
  cre_date_start: string
  cre_date_end: string
  invoiceDate_start: string
  invoiceDate_end: string
  logistics_id: number
  position_id: string
  officesite_pay_statuses: string[]
  officesite_order_statuses: string[]
  pay_statuses: string[]
  pick_statuses: string[]
  ship_statuses: string[]
  order_statuses: string[]
  invoice_isopen: string
  page: number
  num_per_page: number
  excel: string
}

/**銷貨明細結果
 * @param {string} ec_order_logistics_id   訂單物流流水號
 * @param {string} position_name           據點名稱
 * @param {string} warehouse_name          倉庫名稱
 * @param {string} warehouse_storage_space 儲位名稱
 * @param {string} ec_order_code           訂單號碼
 * @param {string} customer_name           會員名稱
 * @param {string} cre_date                銷貨日期
 * @param {string} invoiceDate             發票日期
 * @param {string} invoiceNo               發票號碼
 * @param {string} commodity_code          商品代號
 * @param {string} commodity_name          商品名稱
 * @param {string} ccad_name_1             規格1
 * @param {string} ccad_name_2             規格2
 * @param {string} count                   數量
 * @param {string} suggested_price         單價
 * @param {string} sale_price              銷售金額
 * @param {string} return_count            退貨數量
 * @param {string} refund                  退貨金額
 * @param {string} cost                    成本
 * @param {string} cost_sum                總成本
 * @param {string} gross_profit            毛利
 * @param {string} gross_profit_rate       毛利率
 * @param {string} ship_user_name          出貨人員
*/
export interface EC_OrderSaleDetailResItem {
  ec_order_logistics_id: string
  position_name: string
  warehouse_name: string
  warehouse_storage_space: string
  ec_order_code: string
  customer_name: string
  cre_date: string
  invoiceDate: string
  invoiceNo: string
  commodity_code: string
  commodity_name: string
  ccad_name_1: string
  ccad_name_2: string
  count: number
  suggested_price: number
  sale_price: number
  return_count: number
  refund: number
  cost: number
  cost_sum: number
  gross_profit: number
  gross_profit_rate: number
  ship_user_name: string
}

/**銷貨明細 */
export const ECOrderSaleDetail = async (
  obj: EC_OrderSaleDetailParams
): Promise<ResultObj<EC_OrderSaleDetailResItem[]>> => {
  return await AuthorizeFetch("Report/EC_OrderSaleDetail", obj);
};
