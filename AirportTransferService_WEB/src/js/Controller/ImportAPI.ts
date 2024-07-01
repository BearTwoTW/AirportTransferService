import { ResultObj, AuthorizeFetch } from "../DomainTS";

/* ---------------------- 進貨主項 ---------------------- */
/**
 * @description 進貨主項新建
 * @param {string} outer_import_code 外部進貨編號
 * @param {string} import_time 進貨時間
 * @param {string} import_user 進貨人員
 * @param {string} purchase_id 採購主項流水號
 * @param {string} purchase_code 採購主項編號
 * @param {string} purchase_user 採購人員
 * @param {string} purchase_date 採購日期
 * @param {string} pay_method 付款方式
 * @param {string} pay_date 付款日期
 * @param {string} tax_type 稅別
 * @param {string} tax_rate 稅率
 * @param {string} currency 幣別
 * @param {string} exchange_rate 匯率
 * @param {string} company_id 廠商編號
 * @param {string} warehouse_master_id 倉庫主項流水號
 * @param {string} warehouse_id 倉庫編號
 * @param {string} position_id 據點流水號
 * @param {string} invoice_number 發票號碼
 * @param {string} note 備註
 */
export interface ImportMasterCreateParams {
  outer_import_code: string;
  import_time: string;
  import_user: string;
  purchase_id: string;
  purchase_code: string;
  purchase_user: string;
  purchase_date: string;
  pay_method: string;
  pay_date: string;
  tax_type: string;
  tax_rate: string;
  currency: string;
  exchange_rate: string;
  company_id: string;
  warehouse_master_id: string;
  warehouse_id: string;
  position_id: string;
  invoice_number: string;
  note: string;
}

/**
 * @description 進貨主項新建
 * @param {ImportMasterCreateParams} obj 參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportMasterCreate = async (obj: ImportMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportMasterCreate", obj);
};

/**
 * @description 進貨主項修改參數
 * @param {string} import_id 進貨主項流水號
 * @param {string} outer_import_code 外部進貨編號
 * @param {string} import_time 進貨時間
 * @param {string} import_user 進貨人員
 * @param {string} ispaid 是否付款
 * @param {string} pay_method 付款方式
 * @param {string} pay_date 付款日期
 * @param {string} tax_type 稅別
 * @param {string} tax_rate 稅率
 * @param {string} currency 幣別
 * @param {string} exchange_rate 匯率
 * @param {string} company_id 廠商編號
 * @param {string} warehouse_master_id 倉庫編號
 * @param {string} warehouse_id 儲位
 * @param {string} position_id 據點
 * @param {string} invoice_number 發票號碼
 * @param {string} note 備註
 */
export interface ImportMasterUpdateParams {
  import_id: string;
  outer_import_code?: string;
  import_time?: string;
  import_user?: string;
  ispaid?: string;
  pay_method?: string;
  pay_date?: string;
  tax_type?: string;
  tax_rate?: string;
  currency?: string;
  exchange_rate?: string;
  company_id?: string;
  warehouse_master_id?: string;
  warehouse_id?: string;
  position_id?: string;
  invoice_number?: string;
  note?: string;
}

/**
 * @description 進貨主項修改
 * @param {ImportMasterUpdateParams} obj 進貨主項修改參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportMasterUpdate = async (obj: ImportMasterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportMasterUpdate", obj);
};

/**
 * @description 進貨主項刪除參數
 * @param {string} import_id 進貨主項流水號
 */
export interface ImportMasterDeleteParams {
  import_id: string;
}

/**
 * @description 進貨主項刪除
 * @param {ImportMasterDeleteParams} obj 進貨主項刪除參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportMasterDelete = async (obj: ImportMasterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportMasterDelete", obj);
};

/**
 * @description 進貨主項查詢參數
 * @param {string} outer_import_code 外部進貨編號
 * @param {string} import_date_start 進貨日期起
 * @param {string} import_date_end 進貨日期迄
 * @param {string} isacceptance 是否驗收
 * @param {string} purchase_code 採購主項編號
 * @param {string} import_code 進貨主項編號
 * @param {string} page 頁碼
 * @param {string} num_per_page 每頁筆數
 * @param {string} sort_name 排序欄位
 * @param {string} sort_order 排序方式
 */
export interface ImportMasterSearchParams {
  outer_import_code: string;
  import_date_start: string | null;
  import_date_end: string | null;
  isacceptance: string;
  purchase_code: string;
  import_code: string;
  position_id: string;
  page: string;
  num_per_page: string;
  sort_name: "進貨時間" | "建立時間";
  sort_order: "正" | "倒";
  excel: string;
}

/**
 * @description 進貨主項查詢結果
 * @param {string} import_date_start 進貨日期起
 * @param {string} import_date_end 進貨日期迄
 * @param {string} isacceptance 是否驗收
 * @param {string} purchase_code 採購主項編號
 * @param {string} import_code 進貨主項編號
 * @param {string} outer_import_code 外部進貨編號
 * @param {string} position_id 據點流水號
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 * @param {string} sort_name 排序欄位
 * @param {string} sort_order 排序方式
 */
export interface ImportMasterSearchResult {
  acceptance_date: string,
  acceptance_user_name: string,
  cre_time: string,
  import_code: string,
  import_id: string,
  import_time: string,
  import_user: string,
  import_user_name: string,
  isacceptance: string,
  ispaid: string,
  outer_import_code: string,
  outer_purchase_code: string,
  pay_date: string,
  pay_method: string,
  pay_price: number,
  position_id: string,
  position_name: string,
  purchase_code: string,
  warehouse_id: string,
  warehouse_master_id: string,
  warehouse_name: string,
  warehouse_storage_space: string
}

/**
 * @description 進貨主項查詢
 * @param {ImportMasterSearchParams} obj 參數
 * @returns {Promise<ResultObj<ImportMasterSearchResult[]>>} 回傳結果
 */
export const ImportMasterSearch = async (obj: ImportMasterSearchParams): Promise<ResultObj<ImportMasterSearchResult[]>> => {
  return await AuthorizeFetch("Import/ImportMasterSearch", obj);
};

/**
 * @description 進貨主項細項參數
 * @param {string} import_id 進貨主項流水號
 */
export interface ImportMasterDetailParams {
  import_id: string;
}

/**
 * @description 進貨主項細項結果
 * @param {string} import_id 進貨主項流水號
 * @param {string} import_time 進貨時間
 * @param {string} import_user 進貨人員
 * @param {string} isacceptance 是否驗收
 * @param {string} acceptance_date 驗收時間
 * @param {string} acceptance_username 驗收人員
 * @param {string} acceptance_usercre_time 驗收人員建立時間
 * @param {string} ispaid 是否付款
 * @param {string} purchase_id 採購主項流水號
 * @param {string} purchase_code 採購主項編號
 * @param {string} purchase_user 採購人員
 * @param {string} purchase_date 採購日期
 * @param {string} pay_method 付款方式
 * @param {string} pay_date 付款日期
 * @param {number} pay_price 付款金額
 * @param {number} actual_pay_price 實付金額
 * @param {number} untaxed_price 未稅金額
 * @param {number} tax_price 稅額
 * @param {string} tax_type 稅別
 * @param {number} tax_rate 稅率
 * @param {string} currency 幣別
 * @param {number} exchange_rate 匯率
 * @param {string} company_id 廠商編號
 * @param {string} warehouse_id 倉庫編號
 * @param {string} invoice_number 發票號碼
 * @param {string} note 備註
 * @param {string} status 狀態
 * @param {string} status_name 狀態名稱
 */
export interface ImportMasterDetailResult {
  import_id: string;
  import_time: string;
  import_user: string;
  isacceptance: string;
  acceptance_date: string;
  acceptance_username: string;
  acceptance_usercre_time: string;
  ispaid: string;
  purchase_id: string;
  purchase_code: string;
  purchase_user: string;
  purchase_date: string;
  pay_method: string;
  pay_date: string;
  pay_price: number;
  actual_pay_price: number;
  untaxed_price: number;
  tax_price: number;
  tax_type: string;
  tax_rate: number;
  currency: string;
  exchange_rate: number;
  company_id: string;
  warehouse_id: string;
  invoice_number: string;
  note: string;
  status: string;
  status_name: string;
}

/**
 * @description 進貨主項細項
 * @param {ImportMasterDetailParams} obj 參數
 * @returns {Promise<ResultObj<ImportMasterDetailResult[]>>} 回傳結果
 */
export const ImportMasterDetail = async (obj: ImportMasterDetailParams): Promise<ResultObj<ImportMasterDetailResult[]>> => {
  return await AuthorizeFetch("Import/ImportMasterDetail", obj);
};

/* ---------------------- 進貨細項 ---------------------- */
/**
 * @description 進貨細項新建參數
 * @param {string} import_id 進貨主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {number} purchase_count 採購數量
 * @param {string} unit_price_type 單價類型
 * @param {number} unit_price 單價
 * @param {string} uc_id 單位編號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {number} import_count 本次進貨數量
 * @param {number} return_count 本次退貨數量
 * @param {string} expired_date 到期日期
 */
export interface ImportDetailCreateParams {
  import_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  purchase_count: number;
  unit_price_type: string;
  unit_price: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
  import_count: number;
  return_count: number;
  expired_date: string;
}

/**
 * @description 進貨細項新建
 * @param {ImportDetailCreateParams} obj 參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportDetailCreate = async (obj: ImportDetailCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportDetailCreate", obj);
};

/**
 * @description 進貨細項修改參數
 * @param {string} importdetail_id 進貨細項流水號
 * @param {string} import_id 進貨主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {number} purchase_count 採購數量
 * @param {string} unit_price_type 單價類型
 * @param {number} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {number} import_count 本次進貨數量
 * @param {number} return_count 本次退貨數量
 * @param {string} expired_date 到期日期
 */
export interface ImportDetailUpdateParams {
  importdetail_id: string;
  import_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  purchase_count: number;
  unit_price_type: string;
  unit_price: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
  import_count: number;
  return_count: number;
  expired_date: string;
}

/**
 * @description 進貨細項修改
 * @param {ImportDetailUpdateParams} obj 參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportDetailUpdate = async (obj: ImportDetailUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportDetailUpdate", obj);
};

/**
 * @description 進貨細項刪除參數
 * @param {string} importdetail_id 進貨細項流水號
 */
export interface ImportDetailDeleteParams {
  importdetail_id: string;
}

/**
 * @description 進貨細項刪除
 * @param {ImportDetailDeleteParams} obj 參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportDetailDelete = async (obj: ImportDetailDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportDetailDelete", obj);
};

/**
 * @description 進貨細項查詢參數
 * @param {string} import_id 進貨主項流水號
 */
export interface ImportDetailSearchParams {
  import_id: string;
}

/**
 * @description 進貨細項查詢結果
 * @param {string} importdetail_id 進貨細項流水號
 * @param {string} import_id 進貨主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {number} purchase_count 採購數量
 * @param {string} unit_price_type 單價類型
 * @param {number} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} convert_unit_name 單位換算名稱
 * @param {number} convert_count 單位換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本單位數量
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {number} import_count 本次進貨數量
 * @param {number} return_count 本次退貨數量
 * @param {number} acceptance_count 本次驗收數量
 * @param {string} expired_date 到期日期
 * @param {string} currency 幣別
 */
export interface ImportDetailSearchResult {
  importdetail_id: string;
  import_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  purchase_count: number;
  unit_price_type: string;
  unit_price: number;
  uc_id: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  import_count: number;
  return_count: number;
  acceptance_count: number;
  expired_date: string;
  currency: string;
}

/**
 * @description 進貨細項查詢
 * @param {ImportDetailSearchParams} obj 參數
 * @returns {Promise<ResultObj<ImportDetailSearchResult[]>>} 進貨細項查詢回傳結果
 */
export const ImportDetailSearch = async (obj: ImportDetailSearchParams): Promise<ResultObj<ImportDetailSearchResult[]>> => {
  return await AuthorizeFetch("Import/ImportDetailSearch", obj);
};

/**
 * @description 進貨細項細項參數
 * @param {string} importdetail_id 進貨細項流水號
 */
export interface ImportDetailDetailParams {
  importdetail_id: string;
}

/**
 * @description 進貨細項細項結果
 * @param {string} importdetail_id 進貨細項流水號
 * @param {string} import_id 進貨主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {number} purchase_count 採購數量
 * @param {string} unit_price_type 單價類型
 * @param {number} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} convert_unit_name 單位換算名稱
 * @param {number} convert_count 單位換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本單位數量
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {number} import_count 本次進貨數量
 * @param {number} return_count 本次退貨數量
 * @param {number} acceptance_count 本次驗收數量
 * @param {number} buy_retail_price 零售價
 * @param {number} buy_wholesale_price 批發價
 * @param {string} expired_date 到期日期
 * @param {string} currency 幣別
 */
export interface ImportDetailDetailResult {
  importdetail_id: string;
  import_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  purchase_count: number;
  unit_price_type: string;
  unit_price: number;
  uc_id: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  import_count: number;
  return_count: number;
  acceptance_count: number;
  buy_retail_price: number;
  buy_wholesale_price: number;
  expired_date: string;
  currency: string;
}

/**
 * @description 進貨細項細項
 * @param {ImportDetailDetailParams} obj 參數
 * @returns {Promise<ResultObj<ImportDetailDetailResult[]>>} 進貨細項細項回傳結果
 */
export const ImportDetailDetail = async (obj: ImportDetailDetailParams): Promise<ResultObj<ImportDetailDetailResult[]>> => {
  return await AuthorizeFetch("Import/ImportDetailDetail", obj);
};

/**
 * @description 進貨細項驗收參數
 * @param {string} importdetail_id 進貨細項流水號
 * @param {string} acceptance_date 驗收時間
 */
export interface ImportAcceptanceParams {
  import_id: string;
  acceptance_date: string;
}

/**
 * @description 進貨細項驗收
 * @param {ImportAcceptanceParams} obj 參數
 * @returns {Promise<ResultObj>} 回傳結果
 */
export const ImportAcceptance = async (obj: ImportAcceptanceParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Import/ImportAcceptance", obj);
};
