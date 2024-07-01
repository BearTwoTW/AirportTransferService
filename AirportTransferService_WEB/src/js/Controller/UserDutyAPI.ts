import { AuthorizeFetch, ResultObj } from "../DomainTS";

/** 搜尋職責參數
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_id 使用者等級ID
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface UserDutySearchParams {
  code: string;
  name: string;
  is_calculate_salary: string;
  ul_id: string;
  page: number;
  num_per_page: number;
}

/** 搜尋職責結果
 * @param {string} cre_userid 建立者
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} ud_id 職責ID
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {number} ul_id 使用者等級ID
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_name 使用者等級名稱
 */
export interface UserDutySearchResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  ud_id: number;
  code: string;
  name: string;
  ul_id: number;
  is_calculate_salary: string;
  ul_name: string;
}

/** 搜尋職責
 * @param {UserDutySearchParams} obj 搜尋職責參數
 */
export const UserDutySearch = async (obj: UserDutySearchParams): Promise<ResultObj<UserDutySearchResItem[]>> => {
  return await AuthorizeFetch("UserDuty/UserDutySearch", obj);
};

// TODO: 好像沒用到，swagger也沒有，也不知道回傳啥?
// /** 檢查檢查是否存在
//  * @param {string} code 職責代碼
//  */
// export interface UserDutyExistParams {
//   code: string;
// }

// /** 檢查檢查是否存在
//  * @param {UserDutyExistParams} obj 檢查檢查是否存在參數
//  */
// export const UserDutyExist = async (obj: UserDutyExistParams): Promise<ResultObj> => {
//   return await AuthorizeFetch("UserDuty/UserDutyExist", obj);
// };

/** 新建職責參數
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_id 使用者等級ID
 */
export interface UserDutyCreateParams {
  code: string;
  name: string;
  is_calculate_salary: string;
  ul_id: string;
}

/** 新建職責
 * @param {UserDutyCreateParams} obj 新建職責參數
 */
export const UserDutyCreate = async (obj: UserDutyCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserDuty/UserDutyCreate", obj);
};

/** 職責細項參數
 * @param {string} ud_id 職責ID
 */
export interface UserDutyDetailParams {
  ud_id: string;
}

/** 職責細項結果
 * @param {string} cre_userid 建立者
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} ud_id 職責ID
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {number} ul_id 使用者等級ID
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_name 使用者等級名稱
 */
export interface UserDutyDetailResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  ud_id: number;
  code: string;
  name: string;
  ul_id: number;
  is_calculate_salary: string;
  ul_name: string;
}

/** 職責細項
 * @param {UserDutyDetailParams} obj 職責細項參數
 */
export const UserDutyDetail = async (obj: UserDutyDetailParams): Promise<ResultObj<UserDutyDetailResItem>> => {
  return await AuthorizeFetch("UserDuty/UserDutyDetail", obj);
};

/** 修改職責參數
 * @param {string} ud_id 職責ID
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_id 使用者等級ID
 */
export interface UserDutyUpdateParams {
  ud_id: string;
  code: string;
  name: string;
  is_calculate_salary: string;
  ul_id: string;
}

/** 修改職責
 * @param {UserDutyUpdateParams} obj 修改職責參數
 */
export const UserDutyUpdate = async (obj: UserDutyUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserDuty/UserDutyUpdate", obj);
};

/** 權限相關代碼列表 */
export interface PermissionList {
  pg_id: string;
  page_id: string;
  pc_id: string;
}

/** 更新職責對應權限參數
 * @param {string} ud_id 職責ID
 * @param {PermissionList} permission_list 權限相關代碼列表
 */
export interface UserDutyUpdatePermissionParams {
  ud_id: string;
  permission_list: PermissionList[];
}

/** 更新職責對應權限 */
export const UserDutyUpdatePermission = async (obj: UserDutyUpdatePermissionParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserDuty/UserDutyUpdatePermission", obj);
};

/** 查詢使用者擁有的職責參數 */
export interface UserOwnDutySearchParams {
  user_id: string;
  page: number;
  num_per_page: number;
}

/** 查詢使用者擁有的職責結果 */
export interface UserOwnDutySearchResItem {
  ud_id: number;
  code: string;
  name: string;
  ul_id: number;
  is_calculate_salary: string;
  isneed: string;
  source_user_id: string;
}

/** 查詢使用者擁有的職責
 * @param {UserOwnDutySearchParams} obj 查詢使用者擁有的職責參數
 */
export const UserOwnDutySearch = async (obj: UserOwnDutySearchParams): Promise<ResultObj<UserOwnDutySearchResItem[]>> => {
  return await AuthorizeFetch("UserDuty/UserOwnDutySearch", obj);
};
