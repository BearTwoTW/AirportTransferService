import { ResultObj, AuthorizeFetch, UnauthorizedFetch } from "../DomainTS";

/** 系統登入參數
 * @param {string} username 使用者名稱
 * @param {string} password 使用者密碼
 * @param {string} device_type 裝置類型
 * @param {string} device_code 裝置判斷
 */
export interface UserLoginParams {
  username: string;
  password: string;
  device_type: string;
  device_code: string;
}

/** 登入
 * @param {UserLoginParams} obj 登入參數
 */
export const LogIn = async (obj: UserLoginParams): Promise<ResultObj> => {
  return await UnauthorizedFetch("usercontrol/signin", obj);
};

/** 登出 */
export const LogOut = async (obj = {}) => {
  return await AuthorizeFetch("usercontrol/signout", obj);
};
