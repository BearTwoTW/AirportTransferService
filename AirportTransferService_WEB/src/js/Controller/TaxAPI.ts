import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**稅別查詢結果*/
export interface TaxSearchResItem {
  tax_id: number;
  tax_rate: string;
  tax_type: string;
}

/**稅別查詢參數
 * @description 
 * @param {string} tax_type 稅別
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface TaxSearchParams {
  tax_type: string;
  page: number;
  num_per_page: number;
}

/**稅別查詢 */
export const TaxSearch = async (
  obj: TaxSearchParams
): Promise<ResultObj<TaxSearchResItem[]>> => {
  return await AuthorizeFetch("Tax/TaxSearch", obj);
};

/**稅別細項查詢參數
 * @description 
 * @param {string} tax_type 稅別
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface TaxDetailParams {
  tax_id: string;
}

/**稅別細項查詢*/
export const TaxDetail = async (
  obj: TaxDetailParams
): Promise<ResultObj<TaxSearchResItem[]>> => {
  return await AuthorizeFetch("Tax/TaxDetail", obj);
};

/**稅別修改參數 */
export interface TaxUpdateParams {
  tax_id: string;
  tax_type: string;
  tax_rate: string;
}

/**稅別修改 */
export const TaxUpdate = async (obj: TaxUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Tax/TaxUpdate", obj);
};

/**稅別刪除參數 */
export interface TaxDeleteParams {
  tax_id: string;
}

/**稅別刪除*/
export const TaxDelete = async (obj: TaxDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Tax/TaxDelete", obj);
};

/**稅別新建參數 */
export interface TaxCreateParams {
  tax_type: string;
  tax_rate: string;
}

/**稅別新建*/
export const TaxCreate = async (obj: TaxCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Tax/TaxCreate", obj);
};
