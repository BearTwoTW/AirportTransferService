import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**權限功能查詢參數 */
export interface PermissionFunctionSearchParams {
  pfl_id: string,
  name: string,
  page: number,
  num_per_page: number
}

/**權限功能查詢結果 */
export interface PermissionFunctionSearchResult {
  cre_userid: string,
  cre_time: string,
  upd_userid: string,
  upd_time: string,
  pfl_id: number,
  type: string,
  name: string,
  api_name: string,
  join_limit: number
}

/**權限功能查詢
 * @param {PermissionFunctionSearchParams} obj 參數
 * @returns {Promise<ResultObj<PermissionFunctionSearchResult[]>>} 權限功能查詢結果
 */
export const PermissionFunctionSearch = async (obj: PermissionFunctionSearchParams): Promise<ResultObj<PermissionFunctionSearchResult[]>> => {
  return await AuthorizeFetch("PermissionFunction/PermissionFunctionSearch", obj);
};

/**權限功能新建參數 */
export interface PermissionFunctionCreateParams {
  name: string,
  api_name: string,
  join_limit: string
}
/**權限功能新建
 * @param {PermissionFunctionCreateParams} obj 參數
 */
export const PermissionFunctionCreate = async (obj: PermissionFunctionCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("PermissionFunction/PermissionFunctionCreate", obj);
};

/**權限功能修改參數 */
export interface PermissionFunctionUpdateParams {
  pfl_id: string,
  name: string,
  api_name: string,
  join_limit: string
}
/**權限功能修改
 * @param {PermissionFunctionUpdateParams} obj 參數
 */
export const PermissionFunctionUpdate = async (obj: PermissionFunctionUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("PermissionFunction/PermissionFunctionUpdate", obj);
};

/**權限功能細項參數 */
export interface PermissionFunctionDetailParams {
  pfl_id: string,
}

/**權限功能細項結果 */
export interface PermissionFunctionDetailResult {
  info: {
    cre_userid: string,
    cre_time: string,
    upd_userid: string,
    upd_time: string,
    pfl_id: number,
    type: string,
    name: string,
    api_name: string,
    join_limit: number
  },
  duty: [
    {
      cre_userid: string,
      cre_time: string,
      upd_userid: string,
      upd_time: string,
      pfl_id: number,
      ud_id: number,
      ud_code: string,
      ud_name: string,
      api_name: string,
      logic_ul_id: number
    }
  ]
}

/**權限功能細項
 * @param {PermissionFunctionDetailParams} obj 參數
 * @returns {Promise<ResultObj<PermissionFunctionDetailResult[]>>} 權限功能細項結果
 */
export const PermissionFunctionDetail = async (obj: PermissionFunctionDetailParams): Promise<ResultObj<PermissionFunctionDetailResult[]>> => {
  return await AuthorizeFetch("PermissionFunction/PermissionFunctionDetail", obj);
};

/**更新權限功能對應職責參數 */
export interface PermissionFunctionUpdateUserDutyParams {
  pfl_id: string,
  ud_ids: string[],
}
/**更新權限功能對應職責
 * @param {PermissionFunctionUpdateUserDutyParams} obj 參數
 */
export const PermissionFunctionUpdateUserDuty = async (obj: PermissionFunctionUpdateUserDutyParams): Promise<ResultObj> => {
  return await AuthorizeFetch("PermissionFunction/PermissionFunctionUpdateUserDuty", obj);
};

/**權限功能細項結果 */
export interface PermissionCheckValidResult {
  key: string,
  value: string,
}

/**權限功能細項
 * @param {} obj 參數
 * @returns {Promise<ResultObj<PermissionCheckValidResult[]>>} 權限功能細項結果
 */
export const PermissionCheckValid = async (obj: {}): Promise<ResultObj<PermissionCheckValidResult[]>> => {
  return await AuthorizeFetch("PermissionFunction/PermissionCheckValid", obj);
};









