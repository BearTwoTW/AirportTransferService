import { ResultObj, AuthorizeFetch } from "../DomainTS";

/* ---------------------- 採購主項 ---------------------- */
/**
 * @description 採購主項查詢參數
 * @param {string} purchase_code 採購單編號
 * @param {string} outer_purchase_code 外部採購編號
 * @param {string} purchase_date_start 採購日期起
 * @param {string} purchase_date_end 採購日期迄
 * @param {string} status 狀態
 * @param {string} company_name 廠商名稱
 * @param {string} invoice_number 發票號碼
 * @param {string} ispaid 是否已付款
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 * @param {string} sort_name 排序依據
 * @param {string} sort_order 排序順序
 * @param {string} excel 是否匯出
 */
export interface PurchaseMasterSearchParams {
    purchase_code: string;
    outer_purchase_code: string;
    purchase_date_start: string;
    purchase_date_end: string;
    status: string;
    company_name: string;
    invoice_number: string;
    ispaid: string;
    page: number;
    num_per_page: number;
    sort_name: string;
    sort_order: string;
    excel: string;
}

/**
 * @description 採購主項查詢結果
 * @param {string} purchase_id 採購單流水號
 * @param {string} purchase_code 採購單編號
 * @param {string} purchase_user 採購人員
 * @param {string} purchase_username 採購人員名稱
 * @param {string} purchase_usercre_time 採購單建立時間
 * @param {string} purchase_date 採購日期
 * @param {string} status 狀態
 * @param {string} status_name 狀態名稱
 * @param {string} pay_method 付款方式
 * @param {string} ispaid 是否已付款
 * @param {number} pay_price 付款金額
 * @param {string} company_name 廠商名稱
 * @param {string} ispay_date 實際付款日期
 * @param {string} pay_date 預計付款日期
 */
export interface PurchaseMasterSearchResult {
    purchase_id: string;
    purchase_code: string;
    purchase_user: string;
    purchase_username: string;
    purchase_usercre_time: string;
    purchase_date: string;
    status: string;
    status_name: string;
    pay_method: null;
    ispaid: string;
    pay_price: number;
    company_name: string;
    ispay_date: string;
    pay_date: string;
}

/**
 * @description 採購主項查詢
 * @param {PurchaseMasterSearchParams} obj 參數
 * @returns {Promise<ResultObj<PurchaseMasterSearchResult[]>>} 採購主項查詢結果
 */
export const PurchaseMasterSearch = async (obj: PurchaseMasterSearchParams): Promise<ResultObj<PurchaseMasterSearchResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterSearch", obj);
};

/**
 * @description 採購主項列表參數
 * @param {string} purchase_code 採購單編號
 * @param {string} outer_purchase_code 外部採購編號
 */
export interface PurchaseMasterListParams {
    purchase_code: string;
    outer_purchase_code: string;
}

/**
 * @description 採購主項列表結果
 * @param {string} purchase_id 採購單流水號
 * @param {string} purchase_code 採購單編號
 * @param {string} company_name 廠商名稱
 */
export interface PurchaseMasterListResult {
    purchase_id: string;
    purchase_code: string;
    company_name: string;
}

/**
 * @description 採購主項列表
 * @param {PurchaseMasterListParams} obj 參數
 * @returns {Promise<ResultObj<PurchaseMasterListResult[]>>} 回傳結果
 */
export const PurchaseMasterList = async (obj: PurchaseMasterListParams): Promise<ResultObj<PurchaseMasterListResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterList", obj);
};

/**
 * @description 採購主項刪除參數
 * @param {string} purchase_id 採購單流水號
 */
export interface PurchaseMasterDeleteParams {
    purchase_id: string;
}

/**
 * 採購主項刪除
 * @param {PurchaseMasterDeleteParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項刪除結果
 */
export const PurchaseMasterDelete = async (obj: PurchaseMasterDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterDelete", obj);
};

/**
 * @description 採購主項新建參數
 */
export interface PurchaseMasterAddParams {
    outer_purchase_code: string;
    purchase_user: string;
    purchase_date: string;
    status: string;
    pay_method: string;
    pay_date: string;
    tax_type: string;
    tax_rate: number;
    currency: string;
    exchange_rate: number;
    company_id: string;
    note: string;
}

/**
 * @description 採購主項新建
 * @param {PurchaseMasterDeleteParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PurchaseMasterCreate = async (obj: PurchaseMasterDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterCreate", obj);
};

/**
 * @description 採購主項細項參數
 * @param {string} purchase_id 採購單流水號
 */
export interface PurchaseMasterDetailParams {
    purchase_id: string;
}

/**
 * @description 採購主項細項結果
 * @param {string} purchase_id 採購單流水號
 * @param {string} purchase_code 採購單編號
 * @param {string} outer_purchase_code 外部採購編號
 * @param {string} purchase_user 採購人員
 * @param {string} purchase_date 採購日期
 * @param {string} ispaid 是否已付款
 * @param {number} actual_pay_price 實際付款金額
 * @param {string} status 狀態
 * @param {string} pay_method 付款方式
 * @param {string} pay_date 預計付款日期
 * @param {number} pay_price 付款金額
 * @param {number} untaxed_price 未稅金額
 * @param {number} tax_price 稅額
 * @param {number} tax_type 稅別
 * @param {number} tax_rate 稅率
 * @param {number} currency 幣別
 * @param {number} exchange_rate 匯率
 * @param {string} company_id 廠商流水號
 * @param {string} note 備註
 * @param {string} ispay_date 實際付款日期
 * @param {string} invoice_number 發票號碼
 */
export interface PurchaseMasterDetailResult {
    purchase_id: string;
    purchase_code: string;
    outer_purchase_code: string;
    purchase_user: string;
    purchase_date: string;
    ispaid: string;
    actual_pay_price: number;
    status: string;
    pay_method: string;
    pay_date: string;
    pay_price: number;
    untaxed_price: number;
    tax_price: number;
    tax_type: number;
    tax_rate: number;
    currency: number;
    exchange_rate: number;
    company_id: string;
    note: string;
    ispay_date: string;
    invoice_number: string;
}

/**
 * @description 採購主項細項
 * @param {PurchaseMasterDetailParams} obj 參數
 * @returns
 */
export const PurchaseMasterDetail = async (obj: PurchaseMasterDetailParams): Promise<ResultObj<PurchaseMasterDetailResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterDetail", obj);
};

/**
 * @description 採購主項修改參數
 * @param {string} purchase_id 採購單流水號
 * @param {string} purchase_code 採購單編號
 * @param {string} outer_purchase_code 外部採購編號
 * @param {string} purchase_user 採購人員
 * @param {string} purchase_date 採購日期
 * @param {string} ispaid 是否已付款
 * @param {number} actual_pay_price 實際付款金額
 * @param {string} status 狀態
 * @param {string} pay_method 付款方式
 * @param {string} pay_date 預計付款日期
 * @param {number} pay_price 付款金額
 * @param {number} untaxed_price 未稅金額
 * @param {number} tax_price 稅額
 * @param {number} tax_type 稅別
 * @param {number} tax_rate 稅率
 * @param {number} currency 幣別
 * @param {number} exchange_rate 匯率
 * @param {string} company_id 廠商流水號
 * @param {string} note 備註
 * @param {string} ispay_date 實際付款日期
 * @param {string} invoice_number 發票號碼
 */
export interface PurchaseMasterUpdateParams {
    purchase_id: string;
    purchase_code?: string;
    outer_purchase_code?: string;
    purchase_user?: string;
    purchase_date?: string;
    // ispaid: string;
    actual_pay_price?: number;
    status?: string;
    pay_method?: string;
    pay_date?: string;
    // pay_price: number;
    // untaxed_price: number;
    // tax_price: number;
    tax_type?: number;
    tax_rate?: number;
    currency?: number;
    exchange_rate?: number;
    company_id?: string;
    note?: string;
    // ispay_date: string;
    invoice_number?: string;
}

/**
 * @ description 採購主項修改
 * @param {PurchaseMasterUpdateParams} obj 參數
 * @returns
 */
export const PurchaseMasterUpdate = async (obj: PurchaseMasterUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterUpdate", obj);
};

/**
 * @description 採購主項付款參數
 * @param {string} purchase_id 採購單流水號
 * @param {string} actual_pay_price 實際付款金額
 * @param {string} pay_method 付款方式
 * @param {string} invoice_number 發票號碼
 * @param {string} ispaid 是否已付款
 * @param {string} ispay_date 實際付款日期
 */
export interface PurchaseMasterPayParams {
    purchase_id: string;
    actual_pay_price: string;
    pay_method: string;
    invoice_number: string;
    ispaid: string;
    ispay_date: string;
}

/**
 * @description 採購主項付款
 * @param {PurchaseMasterPayParams} obj 參數
 * @returns
 */
export const PurchaseMasterPay = async (obj: PurchaseMasterPayParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseMasterPay", obj);
};

/* ---------------------- 採購細項 ---------------------- */
/**
 * @description 採購細項新建參數
 * @param {string} purchase_id 採購主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} purchase_count 採購數量
 * @param {string} unit_price_type 單價種類
 * @param {string} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 */
export interface PurchaseDetailCreateParams {
    purchase_id: string;
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    purchase_count: string;
    unit_price_type: string;
    unit_price: string;
    uc_id: string;
    ccad_id_1: string;
    ccad_id_2: string;
}

/**
 * @description 採購細項新建
 * @param {PurchaseDetailCreateParams} obj 參數
 * @returns
 */
export const PurchaseDetailCreate = async (obj: PurchaseDetailCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailCreate", obj);
};

/**
 * @description 採購細項修改參數
 * @param {string} pd_id 採購細項流水號
 * @param {string} purchase_id 採購主項流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} purchase_count 採購數量
 * @param {string} unit_price_type 單價種類
 * @param {string} unit_price 單價
 * @param {string} uc_id 單位換算流水號
 * @param {string} ccad_id_1 自訂屬性細項流水號1
 * @param {string} ccad_id_2 自訂屬性細項流水號2
 */
export interface PurchaseDetailUpdateParams {
    pd_id: string;
    purchase_id?: string;
    commodity_id?: string;
    commodity_code?: string;
    commodity_name?: string;
    purchase_count?: string;
    unit_price_type?: string;
    unit_price?: string;
    uc_id?: string;
    ccad_id_1?: string;
    ccad_id_2?: string;
}

/**
 * @description 採購細項修改
 * @param {PurchaseDetailUpdateParams} obj 參數
 * @returns
 */
export const PurchaseDetailUpdate = async (obj: PurchaseDetailUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailUpdate", obj);
};

/**
 * @description 採購細項刪除參數
 * @param {string} pd_id 採購細項流水號
 */
export interface PurchaseDetailDeleteParams {
    pd_id: string;
}

/**
 * @description 採購細項刪除
 * @param {PurchaseDetailDeleteParams} obj 參數
 * @returns
 */
export const PurchaseDetailDelete = async (obj: PurchaseDetailDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailDelete", obj);
};

/**
 * @description 採購細項查詢參數
 * @param {string} purchase_id 採購主項流水號
 */
export interface PurchaseDetailSearchParams {
    purchase_id: string;
}

export interface PurchaseDetailSearchResult {
    pd_id: string;
    purchase_id: string;
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
    imported_count: number;
    returned_count: number;
    acceptance_count: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    currency: string;
    ispay_date: string;
}

/**
 * @description 採購細項查詢
 * @param {PurchaseDetailSearchParams} obj 參數
 * @returns
 */
export const PurchaseDetailSearch = async (obj: PurchaseDetailSearchParams): Promise<ResultObj<PurchaseDetailSearchResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailSearch", obj);
};

/**
 * @description 採購細項細項參數
 * @param {string} pd_id 採購細項流水號
 */
export interface PurchaseDetailDetailParams {
    pd_id: string;
}

/**
 * @description 採購細項細項結果
 */
export interface PurchaseDetailDetailResult {
    pd_id: string;
    purchase_id: string;
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
    imported_count: number;
    returned_count: number;
    acceptance_count: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    currency: string;
    ispay_date: string;
}

/**
 * @description 採購細項細項
 * @param {PurchaseDetailDetailParams} obj 參數
 * @returns
 */
export const PurchaseDetailDetail = async (obj: PurchaseDetailDetailParams): Promise<ResultObj<PurchaseDetailDetailResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailDetail", obj);
};

/**
 * @description 採購細項列表參數
 * @param {string} purchase_id 採購主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 */
export interface PurchaseDetailListParams {
    purchase_id: string;
    commodity_code?: string;
    commodity_name?: string;
}

/**
 * @description 採購細項列表結果
 */
export interface PurchaseDetailListResult {
    pd_id: string;
    purchase_id: string;
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
    imported_count: number;
    returned_count: number;
    acceptance_count: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    currency: string;
    ispay_date: string;
}

/**
 * @description 採購細項列表
 * @param {PurchaseDetailListParams} obj 參數
 * @returns
 */
export const PurchaseDetailList = async (obj: PurchaseDetailListParams): Promise<ResultObj<PurchaseDetailListResult[]>> => {
    return await AuthorizeFetch("Purchase/PurchaseDetailList", obj);
};
