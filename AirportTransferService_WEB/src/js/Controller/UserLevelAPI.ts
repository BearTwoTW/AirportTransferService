import { ResultObj, AuthorizeFetch } from "../DomainTS";

/** 建立職務參數
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {string} parent_id 上層職務ID
 * @param {string} company_id 公司ID
 * @param {string} email 聯絡信箱
 * @param {string} phone 聯絡電話
 * @param {string} title 職務頭銜
 * @param {string} maximum 最大人數
 * @param {string} note 備註
 */
export interface UserLevelCreateParams {
  code: string;
  name: string;
  parent_id: string;
  company_id: string;
  email: string;
  phone: string;
  title: string;
  maximum: string;
  note: string;
}

/** 建立職務
 * @param {UserLevelCreateParams} obj 建立職務參數
 */
export const UserLevelCreate = async (obj: UserLevelCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserLevel/UserLevelCreate", obj);
};

/** 職務查詢參數
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {number} num_per_page 每頁筆數
 * @param {number} page 頁碼
 * @param {string} parent_id 上層職務ID
 */
export interface UserLevelSearchParams {
  code: string;
  name: string;
  num_per_page: number;
  page: number;
  parent_id: string;
}

/** 職務查詢結果 */
export interface UserLevelSearchResItem {
  ul_id: number;
  code: string;
  name: string;
  department_name: string;
  position_name: string;
  parent_name: string;
}

/** 職務查詢
 * @param {UserLevelSearchParams} obj 職務查詢參數
 */
export const UserLevelSearch = async (obj: UserLevelSearchParams): Promise<ResultObj<UserLevelSearchResItem[]>> => {
  return await AuthorizeFetch("UserLevel/UserLevelSearch", obj);
};

/** 職務查詢參數 (無視權限選所有職務 職責選邏輯主管用 設定錯誤使用者才有辦法自行調整回來)
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {number} num_per_page 每頁筆數
 * @param {number} page 頁碼
 * @param {string} parent_id 上層職務ID
 */
export interface UserLevelSearchAllParams {
  code: string;
  name: string;
  num_per_page: number;
  page: number;
  parent_id: string;
}

/** 職務查詢結果 (無視權限選所有職務 職責選邏輯主管用 設定錯誤使用者才有辦法自行調整回來)
 * @param {string} cre_userid 建立者ID
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者ID
 * @param {string} upd_time 更新時間
 * @param {number} ul_id 職務ID
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {number} parent_id 上層職務ID
 * @param {string} parent_name 上層職務名稱
 * @param {string} company_id 公司ID
 * @param {string} general_manager_id 總經理ID
 * @param {string} department_id 部門ID
 * @param {string} position_id 職位ID
 * @param {string} class_id 班別ID
 * @param {string} group_id 組別ID
 * @param {string} office_id 辦公室ID
 * @param {string} email 聯絡信箱
 * @param {string} phone 聯絡電話
 * @param {string} salary_type 薪資類型
 * @param {string} title 職務頭銜
 * @param {number} maximum 最大人數
 * @param {string} note 備註
 * @param {number} lowest_ucr_id 最低職等ID
 * @param {number} lowest_career_level 最低職等
 * @param {number} leave_day_audit 請假天數審核
 * @param {string} level_audit_type 職等審核類型
 * @param {number} perfect_attendance_bonus 全勤獎金
 * @param {number} order_over_discount_audit 訂單超折扣審核
 * @param {number} pdi_price_audit PDI價格審核
 * @param {string} company_name 公司名稱
 * @param {string} general_manager_name 總經理名稱
 * @param {string} department_name 部門名稱
 * @param {string} position_name 職位名稱
 * @param {string} class_name 班別名稱
 * @param {string} group_name 組別名稱
 * @param {string} office_name 辦公室名稱
 * @param {number} career_rank 職等
 */
export interface UserLevelSearchAllResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  ul_id: number;
  code: string;
  name: string;
  parent_id: number;
  parent_name: string;
  company_id: string;
  general_manager_id: string;
  department_id: string;
  position_id: string;
  class_id: string;
  group_id: string;
  office_id: string;
  email: string;
  phone: string;
  salary_type: string;
  title: string;
  maximum: number;
  note: string;
  lowest_ucr_id: number;
  lowest_career_level: number;
  leave_day_audit: number;
  level_audit_type: string;
  perfect_attendance_bonus: number;
  order_over_discount_audit: number;
  pdi_price_audit: number;
  company_name: string;
  general_manager_name: string;
  department_name: string;
  position_name: string;
  class_name: string;
  group_name: string;
  office_name: string;
  career_rank: number;
}

/** 職務查詢 (無視權限選所有職務 職責選邏輯主管用 設定錯誤使用者才有辦法自行調整回來)
 * @param {UserLevelSearchAllParams} obj 職務查詢參數
 */
export const UserLevelSearchAll = async (obj: UserLevelSearchAllParams): Promise<ResultObj<UserLevelSearchAllResItem[]>> => {
  return await AuthorizeFetch("UserLevel/UserLevelSearchAll", obj);
};

/** 職務詳細資料查詢參數
 * @param {string} ul_id 職務ID
 */
export interface UserLevelDetailParams {
  ul_id: string;
}

/** 職務資訊
 * @param {string} cre_userid 建立者ID
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者ID
 * @param {string} upd_time 更新時間
 * @param {number} ul_id 職務ID
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {number} parent_id 上層職務ID
 * @param {string} parent_name 上層職務名稱
 * @param {string} company_id 公司ID
 * @param {string} general_manager_id 總經理ID
 * @param {string} department_id 部門ID
 * @param {string} position_id 職位ID
 * @param {string} class_id 班別ID
 * @param {string} group_id 組別ID
 * @param {string} office_id 辦公室ID
 * @param {string} email 聯絡信箱
 * @param {string} phone 聯絡電話
 * @param {string} salary_type 薪資類型
 * @param {string} title 職務頭銜
 * @param {number} maximum 最大人數
 * @param {string} note 備註
 * @param {number} lowest_ucr_id 最低職等ID
 * @param {number} lowest_career_level 最低職等
 * @param {number} leave_day_audit 請假天數審核
 * @param {string} level_audit_type 職等審核類型
 * @param {number} perfect_attendance_bonus 全勤獎金
 * @param {number} order_over_discount_audit 訂單超折扣審核
 * @param {number} pdi_price_audit PDI價格審核
 * @param {string} company_name 公司名稱
 * @param {string} general_manager_name 總經理名稱
 * @param {string} department_name 部門名稱
 * @param {string} position_name 職位名稱
 * @param {string} class_name 班別名稱
 * @param {string} group_name 組別名稱
 * @param {string} office_name 辦公室名稱
 * @param {number} career_rank 職等
 */
export interface UserLevelDetailInfo {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  ul_id: number;
  code: string;
  name: string;
  parent_id: number;
  parent_name: string;
  company_id: string;
  general_manager_id: string;
  department_id: string;
  position_id: string;
  class_id: string;
  group_id: string;
  office_id: string;
  email: string;
  phone: string;
  salary_type: string;
  title: string;
  maximum: number;
  note: string;
  lowest_ucr_id: number;
  lowest_career_level: number;
  leave_day_audit: number;
  level_audit_type: string;
  perfect_attendance_bonus: number;
  order_over_discount_audit: number;
  pdi_price_audit: number;
  company_name: string;
  general_manager_name: string;
  department_name: string;
  position_name: string;
  class_name: string;
  group_name: string;
  office_name: string;
  career_rank: number;
}

/** 職務職責
 * @param {string} cre_userid 建立者ID
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者ID
 * @param {string} upd_time 更新時間
 * @param {number} ud_id 職責ID
 * @param {string} code 職責代碼
 * @param {string} name 職責名稱
 * @param {number} ul_id 職務ID
 * @param {string} is_calculate_salary 是否計算薪資
 * @param {string} ul_name 職務名稱
 */
export interface UserLevelDetailDuty {
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

/** 職務詳細資料查詢結果
 * @param {UserLevelDetailInfo} info 職務資訊
 * @param {UserLevelDetailDuty[]} duty 職責資訊
 * @param {number[]} pages 頁面
 * @param {number[]} pageControl 按鈕
 */
export interface UserLevelDetailResItem {
  info: UserLevelDetailInfo;
  duty: UserLevelDetailDuty[];
  pages: number[];
  pageControl: number[];
}

/** 職務詳細資料查詢
 * @param {UserLevelDetailParams} obj 職務詳細資料查詢參數
 */
export const UserLevelDetail = async (obj: UserLevelDetailParams): Promise<ResultObj<UserLevelDetailResItem>> => {
  return await AuthorizeFetch("UserLevel/UserLevelDetail", obj);
};

/** 刪除職務參數
 * @param {string} ul_id 職務ID
 */
export interface UserLevelDeleteParams {
  ul_id: string;
}

/** 刪除職務
 * @param {UserLevelDeleteParams} obj 刪除職務參數
 */
export const UserLevelDelete = async (obj: UserLevelDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserLevel/UserLevelDelete", obj);
};

/** 職務更新參數
 * @param {string} ul_id 職務ID
 * @param {string} code 職務代碼
 * @param {string} name 職務名稱
 * @param {string} parent_id 上層職務ID
 * @param {string} company_id 公司ID
 * @param {string} email 聯絡信箱
 * @param {string} phone 聯絡電話
 * @param {string} title 職務頭銜
 * @param {string} note 備註
 */
export interface UserLevelUpdateParams {
  ul_id: string;
  code: string;
  name: string;
  parent_id: string;
  company_id: string;
  email: string;
  phone: string;
  title: string;
  note: string;
}

/** 職務更新
 * @param {UserLevelUpdateParams} obj 職務更新參數
 */
export const UserLevelUpdate = async (obj: UserLevelUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserLevel/UserLevelUpdate", obj);
};

/** 職務更新職責參數
 * @param {string} ul_id 職務ID
 * @param {number[]} ud_ids 職責ID
 */
export interface UserLevelUpdateDutyParams {
  ul_id: string;
  ud_ids: number[];
}

/** 職務更新職責 */
export const UserLevelUpdateDuty = async (obj: UserLevelUpdateDutyParams): Promise<ResultObj> => {
  return await AuthorizeFetch("UserLevel/UserLevelUpdateDuty", obj);
};
