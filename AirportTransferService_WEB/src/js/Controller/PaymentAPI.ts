import { ResultObj, AuthorizeFetch } from "../DomainTS";

/** 付款方式建立參數
 * @param {string} payment_name 付款方式名稱
 * @param {string} payment_code 付款方式代碼
 * @param {string} note 備註
 * @param {string} transfer_account 轉帳帳號
 * @param {string} transfer_account_name 轉帳帳號名稱
 * @param {string} transfer_bank_code 轉帳銀行代碼
 * @param {string} transfer_bank 轉帳銀行
 * @param {string} series_connection_type 串接類型
 */
export interface EC_PaymentCreateParams {
  payment_name: string;
  payment_code: string;
  note: string;
  transfer_account: string;
  transfer_account_name: string;
  transfer_bank_code: string;
  transfer_bank: string;
  series_connection_type: string;
}

/** 付款方式建立
 * @param {PaymentCreateParams} obj 付款方式建立參數
 */
export const EC_PaymentCreate = async (obj: EC_PaymentCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Payment/EC_PaymentCreate", obj);
};

/** 付款方式修改參數
 * @param {string} id 付款方式ID
 * @param {string} payment_name 付款方式名稱
 * @param {string} payment_code 付款方式代碼
 * @param {string} note 備註
 * @param {string} transfer_account 轉帳帳號
 * @param {string} transfer_account_name 轉帳帳號名稱
 * @param {string} transfer_bank_code 轉帳銀行代碼
 * @param {string} transfer_bank 轉帳銀行
 * @param {string} series_connection_type 串接類型
 * @param {string} visible 是否顯示
 */
export interface EC_PaymentUpdateParams {
  id: string;
  payment_name: string;
  payment_code: string;
  note: string;
  transfer_account: string;
  transfer_account_name: string;
  transfer_bank_code: string;
  transfer_bank: string;
  series_connection_type: string;
  visible: string;
}

/** 付款方式修改 */
export const EC_PaymentUpdate = async (obj: EC_PaymentUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Payment/EC_PaymentUpdate", obj);
};

/** 付款方式查詢參數
 * @param {string} id 付款方式ID
 * @param {string} payment_name 付款方式名稱
 * @param {string} payment_code 付款方式代碼
 * @param {string} transfer_account 轉帳帳號
 * @param {string} transfer_account_name 轉帳帳號名稱
 * @param {string} transfer_bank_code 轉帳銀行代碼
 * @param {string} transfer_bank 轉帳銀行
 * @param {string} series_connection_type 串接類型
 * @param {string} visible 是否顯示
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface EC_PaymentSearchParams {
  id: string;
  payment_name: string;
  payment_code: string;
  transfer_account: string;
  transfer_account_name: string;
  transfer_bank_code: string;
  transfer_bank: string;
  series_connection_type: string;
  visible: string;
  page: number;
  num_per_page: number;
}

/** 付款方式查詢結果
 * @param {string} id 付款方式ID
 * @param {string} payment_name 付款方式名稱
 * @param {string} payment_code 付款方式代碼
 * @param {string} note 備註
 * @param {string} transfer_account 轉帳帳號
 * @param {string} transfer_account_name 轉帳帳號名稱
 * @param {string} transfer_bank_code 轉帳銀行代碼
 * @param {string} transfer_bank 轉帳銀行
 * @param {string} series_connection_type 串接類型
 * @param {string} visible 是否顯示
 */
export interface EC_PaymentSearchResItem {
  id: string;
  payment_name: string;
  payment_code: string;
  note: string;
  transfer_account: string;
  transfer_account_name: string;
  transfer_bank_code: string;
  transfer_bank: string;
  series_connection_type: string;
  visible: string;
}

/** 付款方式查詢
 * @param {PaymentSearchParams} obj 付款方式查詢參數
 */
export const EC_PaymentSearch = async (obj: EC_PaymentSearchParams): Promise<ResultObj<EC_PaymentSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Payment/EC_PaymentSearch", obj);
};

/** 付款方式刪除參敃
 * @param {string} id 付款方式ID
 */
export interface EC_PaymentDeleteParams {
  id: string;
}

/** 付款方式刪除
 * @param {PaymentDeleteParams} obj 付款方式刪除參數
 */
export const EC_PaymentDelete = async (obj: EC_PaymentDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Payment/EC_PaymentDelete", obj);
};
