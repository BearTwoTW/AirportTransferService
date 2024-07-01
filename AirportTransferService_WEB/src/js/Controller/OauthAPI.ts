import { ResultObj, AuthorizeFetch_forCustomer } from "../DomainTS";

/** Google登入 */
export const GoogleOAuth = async (obj = {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("GoogleLogIn/GoogleOAuth", obj);
};

/** Google登入 (無驗證) */
export const GoogleOAuthNoToken = async (obj = {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("GoogleLogIn/GoogleOAuthNotoken", obj);
};

/** Google拿code換token參數
 * @param {string} authCode Google登入後的code
 * @param {string} loginType 登入類型???嗎
 */
export interface GoogleGetAccessTokenParams {
  authCode: string;
  loginType: string;
}

/** Google拿code換token
 * @param {GoogleGetAccessTokenParams} obj
 */
export const GoogleGetAccessToken = async (obj: GoogleGetAccessTokenParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("GoogleLogIn/GoogleGetAccessToken", obj);
};

/** LINE登入 */
export const LineOauth = async (obj = {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("LineLogIn/LineOauth", obj);
};

/** LINE登入 (無驗證) */
export const LineOAuthNoToken = async (obj = {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("LineLogIn/LineOAuthNotoken", obj);
};

/** LINE拿code換token參數
 * @param {string} authCode LINE登入後的code
 * @param {string} loginType 登入類型???嗎
 */
export interface LineGetAccessTokenParams {
  authCode: string;
  loginType: string;
}

/** LINE拿code換token
 * @param {LineGetAccessTokenParams} obj
 */
export const LineGetAccessToken = async (obj: LineGetAccessTokenParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("LineLogIn/LineGetAccessToken", obj);
};

/** 綁定參數
 * @param {string} username 使用者名稱
 * @param {string} oauthemail Oauth登入的email
 * @param {string} device_type 裝置類型
 * @param {string} device_code 裝置代碼
 */
export interface CombineAccountsParams {
  username: string;
  oauthemail: string;
  device_type: string;
  device_code: string;
}

/** 綁定 */
export const combineAccounts = async (obj: CombineAccountsParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("CombineAccounts/CombineAccounts", obj);
};

/** 解除綁定參數
 * @param {string} unbindPlateform 解除綁定的平台
 * @param {string} customer_id 使用者ID
 */
export interface UnbindParams {
  unbindPlateform: string;
  customer_id: string;
}

/** 解除綁定 */
export const Unbind = async (obj: UnbindParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("CombineAccounts/Unbind", obj);
};
