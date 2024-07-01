import { ResultObj, AuthorizeFetch } from "../DomainTS";

// #region 庫存查詢
/**庫存查詢參數
 * @param {string} expired_date_start 有效日期起
 * @param {string} expired_date_end 有效日期迄
 * @param {string} commodity_id 商品流水號
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} iscombination 是否為組合商品
 * @param {string} type 類型
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} ct_id 類別流水號
 * @param {string} ctf_id 分類流水號
 * @param {number} page 頁數
 * @param {number} num_per_page 每頁筆數
 * @param {boolean} excel 是否為匯出excel
 */
export interface StockSearchParams {
  expired_date_start: string;
  expired_date_end: string;
  commodity_id: string;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
  commodity_code: string;
  commodity_name: string;
  iscombination: string;
  type: string;
  warehouse_id: string;
  ct_id: string;
  ctf_id: string;
  page: number;
  num_per_page: number;
  excel: boolean;
}

/** 庫存查詢結果
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_id 換算單位流水號
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_id 基本單位流水號
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} warehouse_name 倉庫名稱
 * @param {number} count 數量
 * @param {string} expired_date 有效日期
 */
export interface StockSearchResItem {
  stock_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_id: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_id: string;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id: string;
  warehouse_name: string;
  count: number;
  expired_date: string;
}

/**StockAPI 庫存api  */
export const StockSearch = async (obj: StockSearchParams): Promise<ResultObj<StockSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockSearch", obj);
};

/**庫存異動查詢參數
 * @description
 * @param {string} commodity_id 商品流水號
 * @param {string} cre_time_start 異動日期起
 * @param {string} cre_time_end 異動日期迄
 * @param {string} sort_name 排序欄位
 * @param {string} sort_order 排序方式
 * @param {string[]} types 異動類型
 */
export interface StockLogSearch {
  commodity_id: string;
  cre_time_start: string;
  cre_time_end: string;
  sort_name: string;
  sort_order: string;
  types: string[];
}

/**庫存異動查詢結果
 * @description
 * @param {string} id 流水號
 * @param {string} code 編號
 * @param {string} type 異動類型
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} warehouse_name 倉庫名稱
 * @param {string} warehouse_id_to 倉庫流水號(轉倉)
 * @param {string} warehouse_name_to 倉庫名稱(轉倉)
 * @param {string} expired_date 有效日期
 * @param {number} count 數量
 * @param {number} refund 退貨數量
 * @param {string} company_name 廠商名稱
 * @param {string} cre_time 異動日期
 * @param {string} cre_userid 異動人員
 * @param {string} name 異動人員名稱
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 */
export interface StockLogSearchResItem {
  id: string;
  code: string;
  type: string;
  stock_id: string;
  commodity_code: string;
  commodity_name: string;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id: string;
  warehouse_name: string;
  warehouse_id_to: string;
  warehouse_name_to: string;
  expired_date: string;
  count: number;
  refund: number;
  company_name: string;
  cre_time: string;
  cre_userid: string;
  name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
}

/**庫存異動查詢
 * @description
 * @param {StockLogSearch} obj 參數
 * @returns 庫存異動查詢結果
 */
export const StockLogSearch = async (obj: StockLogSearch): Promise<ResultObj<StockLogSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockLogSearch", obj);
};
// #endregion

// #region 庫存調整
/**庫存調整主項查詢參數
 * @description
 * @param {string} date 調整日期
 * @param {string} reason 調整原因
 * @param {string} is_complete 是否結案
 * @param {string} complete_time_start 結案日期起
 * @param {string} complete_time_end 結案日期迄
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockAdjustMasterSearchParams {
  date: string | null;
  reason: string;
  is_complete: string;
  complete_time_start: string | null;
  complete_time_end: string | null;
  position_id: string;
  page: number;
  num_per_page: number;
}

/**庫存調整主項查詢結果
 * @description
 * @param {string} sam_id 庫存調整主項流水號
 * @param {string} date 庫存調整日期
 * @param {string} note 備註
 * @param {string} reason 庫存調整原因代碼
 * @param {string} reason_name 庫存調整原因名稱
 * @param {string} complete_user_username 結案人員帳號
 * @param {string} complete_user_name 結案人員姓名
 * @param {string} complete_time 結案時間
 */
export interface StockAdjustMasterSearchResItem {
  sam_id: string;
  date: string;
  note: string;
  reason: string;
  reason_name: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
  position_id: string;
  position_name: string;
}

/**庫存調整主項查詢
 * @description
 * @param {StockAdjustMasterSearchParams} obj 參數
 * @returns 庫存調整主項查詢結果
 */
export const StockAdjustMasterSearch = async (obj: StockAdjustMasterSearchParams): Promise<ResultObj<StockAdjustMasterSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterSearch", obj);
};

/** 新增庫存調整參數
 * @description
 * @param {string} date 調整日期
 * @param {string} note 備註
 * @param {string} reason 調整原因
 */
export interface StockAdjustMasterCreateParams {
  date: string;
  note: string;
  reason: string;
  position_id: string;
}

/** 新增庫存調整
 * @description
 * @param {StockAdjustMasterCreateParams} obj 參數
 * @returns
 */
export const StockAdjustMasterCreate = async (obj: StockAdjustMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterCreate", obj);
};

/**庫存調整主項明細查詢參數
 * @description
 * @param {string} sam_id 庫存調整主項流水號
 */
export interface StockAdjustMasterDetailParams {
  sam_id: string;
}

/**庫存調整主項明細查詢結果
 * @description
 * @param {string} sam_id 庫存調整主項流水號
 * @param {string} date 調整日期
 * @param {string} note 備註
 * @param {string} reason 調整原因
 * @param {string} reason_name 調整原因名稱
 * @param {string} complete_user_username 結案人員帳號
 * @param {string} complete_user_name 結案人員姓名
 * @param {string} complete_time 結案時間
 */
export interface StockAdjustMasterDetailResItem {
  sam_id: string;
  date: string;
  note: string;
  reason: string;
  reason_name: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
}

/**庫存調整主項明細查詢
 * @description
 * @param {StockAdjustMasterDetailParams} obj 參數
 * @returns 庫存調整主項明細查詢結果
 */
export const StockAdjustMasterDetail = async (obj: StockAdjustMasterDetailParams): Promise<ResultObj<StockAdjustMasterDetailResItem>> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterDetail", obj);
};

/**庫存調整主項結案參數
 * @description
 * @param {string} sam_id 庫存調整主項流水號
 */
export interface StockAdjustMasterCompleteParams {
  sam_id: string;
}

/**庫存調整主項結案
 * @description
 * @param {StockAdjustMasterCompleteParams} obj 參數
 * @returns
 */
export const StockAdjustMasterComplete = async (obj: StockAdjustMasterCompleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterComplete", obj);
};

/**新建庫存調整細項參數 */
export interface StockAdjustDetailCreateParams {
  sam_id: string;
  stock_id: string;
  count: string;
}

/**新建庫存調整細項
 * @description
 * @param {StockAdjustDetailCreateParams }obj 參數
 * @returns
 */
export const StockAdjustDetailCreate = async (obj: StockAdjustDetailCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockAdjustDetailCreate", obj);
};

/**庫存調整細項查詢參數
 * @description
 * @param {string} sam_id 庫存調整主項流水號
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockAdjustDetailSearchParams {
  sam_id: string;
  stock_id: string;
  commodity_code: string;
  commodity_name: string;
  page: number;
  num_per_page: number;
}

/**庫存調整細項查詢結果
 * @description
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} warehouse_name 倉庫名稱
 * @param {string} warehouse_storage_space //?!?!
 * @param {number} count 數量
 * @param {string} date 調整日期
 * @param {string} expired_date 有效日期
 * @param {string} cre_time 異動日期
 * @param {string} cre_userid 異動人員流水號
 * @param {string} name 異動人員名稱
 */
export interface StockAdjustDetailResItem {
  stock_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id: string;
  warehouse_name: string;
  warehouse_storage_space: string;
  count: number;
  date: string;
  expired_date: string;
  cre_time: string;
  cre_userid: string;
  name: string;
}

/**庫存調整細項查詢
 * @description
 * @param { StockAdjustDetailSearchParams} obj 參數
 * @returns 庫存調整細項查詢結果
 */
export const StockAdjustDetailSearch = async (obj: StockAdjustDetailSearchParams): Promise<ResultObj<StockAdjustDetailResItem[]>> => {
  return await AuthorizeFetch("Stock/StockAdjustDetailSearch", obj);
};

/**修改庫存調整主項參數 */
export interface StockAdjustMasterUpdateParams {
  sam_id: string;
  date: string;
  note: string;
  reason: string;
}

/**修改庫存調整主項
 * @description
 * @param {StockAdjustMasterUpdateParams}obj 參數
 * @returns
 */
export const StockAdjustMasterUpdate = async (obj: StockAdjustMasterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterUpdate", obj);
};

/**刪除庫存調整主項參數 */
export interface StockAdjustMasterDeleteParams {
  sam_id: string;
}

/**刪除庫存調整主項
 * @description
 * @param {StockAdjustMasterDeleteParams}obj 參數
 * @returns
 */
export const StockAdjustMasterDelete = async (obj: StockAdjustMasterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockAdjustMasterDelete", obj);
};
// #endregion

// #region 庫存退貨
/**庫存退貨主項查詢參數
 * @description
 * @param {string} date 退貨日期
 * @param {string} company_id 廠商流水號
 * @param {string} is_complete 是否結案
 * @param {string} complete_time_start 結案日期起
 * @param {string} complete_time_end 結案日期迄
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockScrapMasterSearchParams {
  date: string | null;
  company_id: string;
  is_complete: string;
  complete_time_start: string | null;
  complete_time_end: string | null;
  position_id: string;
  page: number;
  num_per_page: number;
}

/**庫存退貨主項查詢結果
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 * @param {string} date 退貨日期
 * @param {string} note 備註
 * @param {string} company_id 廠商流水號
 * @param {string} company_name 廠商名稱
 * @param {string} complete_user_username 使用者名稱
 * @param {string} complete_user_name 使用者名稱
 * @param {string} complete_time 結案時間
 */
export interface StockScrapMasterSearchResItem {
  ssm_id: string;
  date: string;
  note: string;
  company_id: string;
  company_name: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
  position_id: string;
  position_name: string;
}

/**庫存退貨主項查詢
 * @description
 * @param {StockScrapMasterSearchParams} obj 參數
 * @returns 庫存退貨查詢結果
 */
export const StockScrapMasterSearch = async (obj: StockScrapMasterSearchParams): Promise<ResultObj<StockScrapMasterSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockScrapMasterSearch", obj);
};

/**新增庫存退貨參數*/
export interface StockScrapMasterCreateParams {
  date: string;
  note: string;
  company_id: string;
  position_id: string;
}

/**新增庫存退貨
 * @description
 * @param {StockScrapMasterCreateParams} obj 參數
 */
export const StockScrapMasterCreate = async (obj: StockScrapMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockScrapMasterCreate", obj);
};

/**庫存退貨主項明細查詢參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 */
export interface StockScrapMasterDetailParams {
  ssm_id: string;
}

/**庫存退貨主項明細查詢結果
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 * @param {string} date 退貨日期
 * @param {string} note 備註
 * @param {string} company_id 廠商流水號
 * @param {string} company_name 廠商名稱
 * @param {string} complete_user_username 使用者帳號
 * @param {string} complete_user_name 使用者名稱
 * @param {string} complete_time 結案時間
 */
export interface StockScrapMasterDetailResItem {
  ssm_id: string;
  date: string;
  note: string;
  company_id: string;
  company_name: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
}

/**庫存退貨主項明細查詢
 * @description
 * @param {StockScrapMasterDetailParams} obj 參數
 * @returns 庫存退貨主項明細查詢結果
 */
export const StockScrapMasterDetail = async (obj: StockScrapMasterDetailParams): Promise<ResultObj<StockScrapMasterDetailResItem[]>> => {
  return await AuthorizeFetch("Stock/StockScrapMasterDetail", obj);
};

/**新增庫存退貨主項結案參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 */
export interface StockScrapMasterCompleteParams {
  ssm_id: string;
}

/**庫存退貨主項結案
 * @description
 * @param {StockScrapMasterCompleteParams} obj 庫存退貨主項流水號
 */
export const StockScrapMasterComplete = async (obj: StockScrapMasterCompleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockScrapMasterComplete", obj);
};

/**新增庫存退貨參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 * @param {string} stock_id 庫存流水號
 * @param {number} count 數量
 * @param {number} refund 退貨數量
 * @param {string} note 備註
 */
export interface StockScrapDetailCreateParams {
  ssm_id: string;
  stock_id: string;
  count: number;
  refund: number;
  note: string;
}

/**新增庫存退貨
 * @description
 * @param {StockScrapDetailCreateParams} obj 參數
 * @returns
 */
export const StockScrapDetailCreate = async (obj: StockScrapDetailCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockScrapDetailCreate", obj);
};

/**庫存退貨明細查詢參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_code 商品代碼
 * @param {string} commodity_name 商品名稱
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockScrapDetailSearchParams {
  ssm_id: string;
  stock_id: string;
  commodity_code: string;
  commodity_name: string;
  page: number;
  num_per_page: number;
}

/**庫存退貨明細查詢結果
 * @description
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品代碼
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 轉換單位名稱
 * @param {number} convert_count 轉換數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位轉換流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} warehouse_name 倉庫名稱
 * @param {string} warehouse_storage_space 倉庫儲位
 * @param {number} count 數量
 * @param {string} date 日期
 * @param {string} note 備註
 * @param {string} expired_date 過期日期
 * @param {string} cre_time 建立時間
 * @param {string} cre_userid 建立使用者ID
 * @param {string} name 名稱
 */
export interface StockScrapDetailSearchResItem {
  stock_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id: string;
  warehouse_name: string;
  warehouse_storage_space: string;
  count: number;
  date: string;
  note: string;
  expired_date: string;
  cre_time: string;
  cre_userid: string;
  name: string;
}

/**庫存退貨明細查詢
 * @description
 * @param {StockScrapDetailSearchParams} obj 參數
 * @returns 庫存退貨明細查詢結果
 */
export const StockScrapDetailSearch = async (obj: StockScrapDetailSearchParams): Promise<ResultObj<StockScrapDetailSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockScrapDetailSearch", obj);
};

/**修改庫存退回主項參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 * @param {string} date 庫存流水號
 * @param {string} note 數量
 * @param {string} company_id 退貨數量
 */
export interface StockScrapMasterUpdateParams {
  ssm_id: string;
  date: string;
  note: string;
  refuncompany_idd: string;
}

/**修改庫存退回主項
 * @description
 * @param {StockScrapMasterUpdateParams} obj 參數
 * @returns
 */
export const StockScrapMasterUpdate = async (obj: StockScrapMasterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockScrapMasterUpdate", obj);
};

/**刪除庫存退回主項參數
 * @description
 * @param {string} ssm_id 庫存退貨主項流水號
 */
export interface StockScrapMasterDeleteParams {
  ssm_id: string;
}

/**刪除庫存退回主項
 * @description
 * @param {StockScrapMasterDeleteParams} obj 參數
 * @returns
 */
export const StockScrapMasterDelete = async (obj: StockScrapMasterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockScrapMasterDelete", obj);
};

// #endregion

// #region 庫存調撥
/**庫存調撥主項查詢參數
 * @description
 * @param {string} date 調撥日期
 * @param {string} is_complete 是否結案
 * @param {string} complete_time_start 結案日期起
 * @param {string} complete_time_end 結案日期迄
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockTransferMasterSearchParams {
  date: string | null;
  is_complete: string;
  complete_time_start: string | null;
  complete_time_end: string | null;
  page: number;
  num_per_page: number;
}

/**庫存調撥主項查詢結果
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 * @param {string} date 調撥日期
 * @param {string} note 備註
 * @param {string} complete_user_username 使用者名稱
 * @param {string} complete_user_name 使用者名稱
 * @param {string} complete_time 結案時間
 */
export interface StockTransferMasterSearchResItem {
  stm_id: string;
  date: string;
  note: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
}

/**庫存調撥主項查詢
 * @description
 * @param {StockTransferMasterSearchParams} obj 參數
 * @returns 庫存調撥主項查詢結果
 */
export const StockTransferMasterSearch = async (obj: StockTransferMasterSearchParams): Promise<ResultObj<StockTransferMasterSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockTransferMasterSearch", obj);
};

/**新增庫存調撥參數
 * @description
 * @param {string} date 調撥日期
 * @param {string} note 備註
 */
export interface StockTransferMasterCreateParams {
  date: string;
  note: string;
}

/**新增庫存調撥
 * @description
 * @param {StockTransferMasterCreateParams} obj 參數
 */
export const StockTransMasterCreate = async (obj: StockTransferMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockTransferMasterCreate", obj);
};

/**查詢庫存調撥主項細項參數
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 */
export interface StockTransferMasterDetailParams {
  stm_id: string;
}

/**查詢庫存調撥主項細項結果
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 * @param {string} date 調撥日期
 * @param {string} note 備註
 * @param {string} complete_user_username 使用者帳號
 * @param {string} complete_user_name 使用者名稱
 * @param {string} complete_time 結案時間
 */
export interface StockTransferMasterDetailResItem {
  stm_id: string;
  date: string;
  note: string;
  complete_user_username: string;
  complete_user_name: string;
  complete_time: string;
}

/**查詢庫存調撥主項細項
 * @description
 * @param {StockTransferMasterDetailParams} obj 參數
 * @returns
 */
export const StockTransferMasterDetail = async (obj: StockTransferMasterDetailParams): Promise<ResultObj<StockTransferMasterDetailResItem>> => {
  return await AuthorizeFetch("Stock/StockTransferMasterDetail", obj);
};

/**庫存調撥主項結案參數
 * @description
 */
export interface StockTransferMasterCompleteParams {
  stm_id: string;
}

/**庫存調撥主項結案
 * @description
 * @param {StockTransferMasterCompleteParams} obj 參數
 * @returns
 */
export const StockTransferMasterComplete = async (obj: StockTransferMasterCompleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockTransferMasterComplete", obj);
};

/**查詢庫存調撥細項參數
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_code 商品代碼
 * @param {string} commodity_name 商品名稱
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockTransferDetailSearchParams {
  stm_id: string;
  stock_id: string;
  commodity_code: string;
  commodity_name: string;
  page: number;
  num_per_page: number;
}

/**查詢庫存調撥細項結果
 * @description
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品代碼
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 轉換單位名稱
 * @param {number} convert_count 轉換數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位轉換流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id_from 倉庫流水號(調出)
 * @param {string} warehouse_name_from 倉庫名稱(調出)
 * @param {string} warehouse_storage_space_from 倉庫儲位(調出)
 * @param {string} warehouse_id_to 倉庫流水號(調入)
 * @param {string} warehouse_name_to 倉庫名稱(調入)
 * @param {string} warehouse_storage_space_to 倉庫儲位(調入)
 * @param {number} count 數量
 * @param {string} date 日期
 * @param {string} expired_date 過期日期
 * @param {string} cre_time 建立時間
 * @param {string} cre_userid 建立使用者ID
 * @param {string} name 建立使用者名稱
 */
export interface StockTransferDetailSearchResItem {
  stock_id: string;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id_from: string;
  warehouse_name_from: string;
  warehouse_storage_space_from: string;
  warehouse_id_to: string;
  warehouse_name_to: string;
  warehouse_storage_space_to: string;
  count: number;
  date: string;
  expired_date: string;
  cre_time: string;
  cre_userid: string;
  name: string;
}

/**查詢庫存調撥細項
 * @description
 * @param {StockTransferDetailSearchResItem} obj 參數
 * @returns
 */
export const StockTransferDetailSearch = async (obj: StockTransferDetailSearchParams): Promise<ResultObj<StockTransferDetailSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockTransferDetailSearch", obj);
};

/**新增庫存調撥細項參數
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 * @param {string} stock_id 庫存流水號
 * @param {number} count 數量
 * @param {string} warehouse_id 倉庫流水號
 */
export interface StockTransferDetailCreate {
  stm_id: string;
  stock_id: string;
  count: number;
  warehouse_id: string;
}

/**新增庫存調撥細項
 * @description
 * @param {StockTransferDetailCreate} obj 參數
 * @returns
 */
export const StockTransferDetailCreate = async (obj: StockTransferDetailCreate): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockTransferDetailCreate", obj);
};

/**修改庫存調撥主項參數
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 * @param {string} date 調撥單建立
 * @param {string} note 備註
 */
export interface StockTransferMasterUpdateParams {
  stm_id: string;
  date: string;
  note: string;
}

/**修改庫存調撥主項
 * @description
 * @param {StockTransferMasterUpdateParams} obj 參數
 * @returns
 */
export const StockTransferMasterUpdate = async (obj: StockTransferMasterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockTransferMasterUpdate", obj);
};

/**刪除庫存調撥主項參數
 * @description
 * @param {string} stm_id 庫存調撥主項流水號
 */
export interface StockTransferMasterDeleteParams {
  stm_id: string;
}

/**刪除庫存調撥主項
 * @description
 * @param {StockTransferMasterDeleteParams} obj 參數
 * @returns
 */
export const StockTransferMasterDelete = async (obj: StockTransferMasterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockTransferMasterDelete", obj);
};
// #endregion

// #region 商品入庫
/** 入庫主項查詢參數
 * @param {string} date_start 開始日期
 * @param {string} date_end 結束日期
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface StockPutInMasterSearchParams {
  date_start: string | null;
  date_end: string | null;
  page: number;
  num_per_page: number;
}

/** 入庫主項查詢結果
 * @param {string} spim_id 入庫主項流水號
 * @param {string} date 入庫日期
 * @param {string} note 備註
 */
export interface StockPutInMasterSearchResItem {
  spim_id: string;
  date: string;
  note: string;
}

/** 入庫主項查詢
 * @param {StockInMasterSearchParams} obj 參數
 * @returns 入庫主項查詢結果
 */
export const StockPutInMasterSearch = async (obj: StockPutInMasterSearchParams): Promise<ResultObj<StockPutInMasterSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockPutInMasterSearch", obj);
};

/** 入庫細項查詢參數
 * @param {string} spim_id 入庫主項流水號
 */
export interface StockPutInDetailSearchParams {
  spim_id: string;
}

/** 入庫細項查詢結果
 * @param {string} spim_id 入庫主項流水號
 * @param {string} spid_id 入庫細項流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_id 換算單位流水號
 * @param {string} convert_unit_name 換算單位名稱
 * @param {number} convert_count 換算數量
 * @param {string} basic_unit_id 基本單位流水號
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_name_1 自訂屬性細項名稱1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} ccad_name_2 自訂屬性細項名稱2
 * @param {string} warehouse_id 儲位流水號
 * @param {string} warehouse_master_id 倉庫流水號
 * @param {string} position_id 據點流水號
 * @param {string} position_name 據點名稱
 * @param {string} warehouse_name 倉庫名稱
 * @param {string} warehouse_storage_space 儲位名稱
 * @param {number} count 數量
 * @param {number} unit_price 單價
 */
export interface StockPutInDetailSearchResItem {
  spim_id: string;
  spid_id: number;
  commodity_id: string;
  commodity_code: string;
  commodity_name: string;
  convert_unit_id: string;
  convert_unit_name: string;
  convert_count: number;
  basic_unit_id: string;
  basic_unit_name: string;
  basic_count: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_name_1: string;
  ccad_id_2: string;
  ccad_name_2: string;
  warehouse_id: string;
  warehouse_master_id: string;
  position_id: string;
  position_name: string;
  warehouse_name: string;
  warehouse_storage_space: string;
  count: number;
  unit_price: number;
}

/** 入庫細項查詢
 * @param {StockPutInDetailSearchParams} obj 參數
 * @returns 入庫細項查詢結果
 */
export const StockPutInDetailSearch = async (obj: StockPutInDetailSearchParams): Promise<ResultObj<StockPutInDetailSearchResItem[]>> => {
  return await AuthorizeFetch("Stock/StockPutInDetailSearch", obj);
};

/** 新增商品入庫 => 商品參數
 * @param {string} commodity_id 商品流水號
 * @param {number} count 數量
 * @param {number} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 * @param {string} warehouse_id 儲位流水號
 */
export interface StockPutInCreateCommodityParams {
  commodity_id: string;
  count: number;
  unit_price: number;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
  warehouse_id: string;
}

/** 新增商品入庫參數
 * @param {string} date 入庫日期
 * @param {string} note 備註
 * @param {StockPutInCreateCommodityParams[]} list 商品列表
 */
export interface StockPutInCreateParams {
  date: string;
  note: string;
  list: StockPutInCreateCommodityParams[];
}

/** 新增商品入庫
 * @param {StockPutInCreateParams} obj 參數
 * @returns
 */
export const StockPutInCreate = async (obj: StockPutInCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Stock/StockPutInCreate", obj);
};
// #endregion
