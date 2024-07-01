import { ResultObj, AuthorizeFetch } from "../DomainTS";

// TODO：舊版把到期庫存查詢註解
/**
 * @description 到期庫存查詢參數
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type ExpiredStockAlertParams = {
  page: number;
  num_per_page: number;
};

/**
 * @description 到期庫存查詢結果
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位轉換流水號
 * @param {string} warehouse_id 倉庫流水號
 * @param {number} count 數量
 * @param {string} expired_date 到期日
 */
export type ExpiredStockAlertResItem = {
  stock_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  warehouse_id: string;
  count: number;
  expired_date: string;
};

/**
 * @description 到期庫存查詢
 * @param {ExpiredStockAlertParams} obj 參數
 * @returns
 */
export const ExpiredStockAlert = async (obj: ExpiredStockAlertParams): Promise<ResultObj<ExpiredStockAlertResItem[]>> => {
  return await AuthorizeFetch("Dashboard/ExpiredStockAlert", obj);
};

/**
 * @description 廠商匯款查詢參數
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type CompanyTransferAlertParams = {
  page: number;
  num_per_page: number;
};

/**
 * @description 廠商匯款查詢結果
 * @param {string} name 姓名
 * @param {string} phone 電話
 * @param {string} note 備註
 * @param {string} start_date 開始日期
 * @param {number} howmany_month 月數
 * @param {string} which_date 日期
 * @param {number} howmany_beforeday 提前天數
 */
export type CompanyTransferAlertResItem = {
  name: string;
  phone: string;
  note: string;
  start_date: string;
  howmany_month: number;
  which_date: string;
  howmany_beforeday: number;
};

/**
 * @description 廠商匯款查詢
 * @param {CompanyTransferAlertResItem} obj 參數
 * @returns
 */
export const CompanyTransferAlert = async (obj: CompanyTransferAlertParams): Promise<ResultObj<CompanyTransferAlertResItem[]>> => {
  return await AuthorizeFetch("Dashboard/CompanyTransferAlert", obj);
};
