import { AuthorizeFetch, ResultObj } from "../DomainTS";

/** 幣別新建參數
 * @param {string} currency 幣別
 * @param {string} exchange_rate 匯率
 */
export interface CurrencyCreateParams {
  currency: string;
  exchange_rate: string;
}

/** 幣別新建
 * @param {CurrencyCreateParams} obj 幣別新建參數
 */
export const CurrencyCreate = async (obj: CurrencyCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Currency/CurrencyCreate", obj);
};

/** 幣別修改參數
 * @param {string} currency_id 幣別流水號
 * @param {string} currency 幣別
 * @param {string} exchange_rate 匯率
 */
export interface CurrencyUpdateParams {
  currency_id: string;
  currency: string;
  exchange_rate: string;
}

/** 幣別修改
 * @param {CurrencyUpdateParams} obj 幣別修改參數
 */
export const CurrencyUpdate = async (obj: CurrencyUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Currency/CurrencyUpdate", obj);
};

/** 幣別查詢參數
 * @param {string} currency 幣別
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface CurrencySearchParams {
  currency: string;
  page: number;
  num_per_page: number;
}

/** 幣別查詢結果
 * @param {number} currency_id 幣別流水號
 * @param {string} currency 幣別
 * @param {number} exchange_rate 匯率
 */
export interface CurrencySearchResItem {
  currency_id: number;
  currency: string;
  exchange_rate: number;
}

/** 幣別查詢
 * @param {CurrencySearchParams} obj 幣別查詢參數
 */
export const CurrencySearch = async (obj: CurrencySearchParams): Promise<ResultObj<CurrencySearchResItem[]>> => {
  return await AuthorizeFetch("Currency/CurrencySearch", obj);
};

/** 幣別刪除參數
 * @param {number} currency_id 幣別流水號
 */
export interface CurrencyDeleteParams {
  currency_id: number;
}

/** 幣別刪除
 * @param {CurrencyDeleteParams} obj 幣別刪除參數
 */
export const CurrencyDelete = async (obj: CurrencyDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Currency/CurrencyDelete", obj);
};

/** 幣別細項參數
 * @param {number} currency_id 幣別流水號
 */
export interface CurrencyDetailParams {
  currency_id: number;
}

/** 幣別細項結果
 * @param {number} currency_id 幣別流水號
 * @param {string} currency 幣別
 * @param {number} exchange_rate 匯率
 */
export interface CurrencyDetailResItem {
  currency_id: number;
  currency: string;
  exchange_rate: number;
}

/** 幣別細項
 * @param {CurrencyDetailParams} obj 幣別細項參數
 */
export const CurrencyDetail = async (obj: CurrencyDetailParams): Promise<ResultObj<CurrencyDetailResItem>> => {
  return await AuthorizeFetch("Currency/CurrencyDetail", obj);
};
