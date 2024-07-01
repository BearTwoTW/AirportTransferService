import { AuthorizeFetch, ResultObj } from "../DomainTS";

/** 帳號列表查詢參數 (已綁定職務)
 * @param {string} jobBind 是否綁定職務
 * @param {string} disable 是否停用
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} company_id 公司流水號
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface UserListSearchParams {
  jobBind: string;
  disable: string;
  username: string;
  name: string;
  company_id: string;
  page: number;
  num_per_page: number;
}

/** 帳號列表查詢結果 (已綁定職務)
 * @param {string} disable 是否停用
 * @param {string} user_id 使用者流水號
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} ul_name 職務名稱
 * @param {string} position_id 職位流水號
 * @param {string} position_name 職位名稱
 * @param {string} class_id 班別流水號
 * @param {string} class_name 班別名稱
 * @param {string} sc_name 班別名稱
 * @param {string} department_id 部門流水號
 * @param {string} department_name 部門名稱
 * @param {string} state 狀態
 * @param {string} last_clock_out_time 最後打卡時間
 * @param {string} home_page_name 首頁名稱
 */
export interface UserListSearchResItem {
  disable: string;
  user_id: string;
  username: string;
  name: string;
  ul_name: string;
  position_id: string;
  position_name: string;
  class_id: string;
  class_name: string;
  sc_name: string;
  department_id: string;
  department_name: string;
  state: string;
  last_clock_out_time: string;
  home_page_name: string;
}

/** 帳號列表查詢 (已綁定職務)
 * @param {UserListSearchParams} obj 帳號列表查詢參數
 */
export const UserListSearch = async (obj: UserListSearchParams): Promise<ResultObj<UserListSearchResItem[]>> => {
  return await AuthorizeFetch("User/UserSearch", obj);
};

/** 使用者查詢參數 (無視權限選所有在職的 請假選代理人用)
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} company_id 公司流水號
 * @param {string} general_manager_id 總經理流水號
 * @param {string} department_id 部門流水號
 * @param {string} position_id 職位流水號
 * @param {string} class_id 班別流水號
 * @param {string} group_id 組別流水號
 * @param {string} office_id 辦公室流水號
 * @param {string} disable 是否停用
 * @param {string} isresign 是否離職
 * @param {number} ul_id 職務流水號
 * @param {string} state 狀態
 * @param {string} last_clock_out_time 最後打卡時間
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface UserSearchAllParams {
  username: string;
  name: string;
  company_id: string;
  general_manager_id: string;
  department_id: string;
  position_id: string;
  class_id: string;
  group_id: string;
  office_id: string;
  disable: string;
  isresign: string;
  ul_id: number;
  state: string;
  last_clock_out_time: string;
  page: number;
  num_per_page: number;
}

/** 使用者查詢結果 (無視權限選所有在職的 請假選代理人用)
 * @param {string} disable 是否停用
 * @param {string} user_id 使用者流水號
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} ul_name 職務名稱
 * @param {string} position_id 職位流水號
 * @param {string} position_name 職位名稱
 * @param {string} class_id 班別流水號
 * @param {string} class_name 班別名稱
 * @param {string} sc_name 班別名稱
 * @param {string} department_id 部門流水號
 * @param {string} department_name 部門名稱
 * @param {string} state 狀態
 * @param {string} last_clock_out_time 最後打卡時間
 * @param {string} home_page_name 首頁名稱
 */
export interface UserSearchAllResItem {
  disable: string;
  user_id: string;
  username: string;
  name: string;
  ul_name: string;
  position_id: string;
  position_name: string;
  class_id: string;
  class_name: string;
  sc_name: string;
  department_id: string;
  department_name: string;
  state: string;
  last_clock_out_time: string;
  home_page_name: string;
}

/** 使用者查詢參數 (無視權限選所有在職的 請假選代理人用)
 * @param {UserSearchAllParams} obj 使用者查詢參數
 */
export const UserSearchAll = async (obj: UserSearchAllParams): Promise<ResultObj<UserSearchAllResItem[]>> => {
  return await AuthorizeFetch("User/UserSearchAll", obj);
};

/** 使用者細項參數
 * @param {string} user_id 使用者流水號
 */
export interface UserDetailParams {
  user_id: string;
}

/** 使用者細項結果
 * @param {string} cre_userid 建立者
 * @param {string} cre_time 建立時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {string} disable 是否停用
 * @param {string} company_code 公司代碼
 * @param {string} user_id 使用者流水號
 * @param {string} username 使用者名稱
 * @param {string} password 使用者密碼
 * @param {string} name 使用者姓名
 * @param {string} gender 性別
 * @param {string} birthday 生日
 * @param {string} telephone 電話
 * @param {string} mobile_phone 手機
 * @param {string} email 電子郵件
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} address 地址
 * @param {string} city_census 戶籍城市
 * @param {string} area_census 戶籍區域
 * @param {string} address_census 戶籍地址
 * @param {string} on_board_date 入職日期
 * @param {string} note 備註
 * @param {string} home_page 首頁
 * @param {string} signin_time 登入時間
 * @param {number} ul_id 職務流水號
 * @param {string} blood_type 血型
 * @param {string} identity_card 身分證字號
 * @param {number} ucr_id 使用者角色流水號
 * @param {number} career_level 職級
 * @param {string} isresign 是否離職
 * @param {string} resign_date 離職日期
 * @param {string} resign_reason 離職原因
 * @param {string} smT_username ???使用者名稱
 * @param {string} ul_name 職務名稱
 * @param {string} home_page_name 首頁名稱
 * @param {string} position_id 職位流水號
 * @param {string} insurance_cancel_date 保險取消日期
 */
export interface UserDetailResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  disable: string;
  company_code: string;
  user_id: string;
  username: string;
  password: string;
  name: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  city_census: string;
  area_census: string;
  address_census: string;
  on_board_date: string;
  note: string;
  home_page: string;
  signin_time: string;
  ul_id: number;
  blood_type: string;
  identity_card: string;
  ucr_id: number;
  career_level: number;
  isresign: string;
  resign_date: string;
  resign_reason: string;
  smT_username: string;
  ul_name: string;
  home_page_name: string;
  position_id: string;
  insurance_cancel_date: string;
}

/** 使用者細項
 * @param {UserDetailParams} obj 使用者細項參數
 */
export const UserDetail = async (obj: UserDetailParams): Promise<ResultObj<UserDetailResItem>> => {
  return await AuthorizeFetch("User/UserDetail", obj);
};

/** 帳號列表查詢參數 (未綁定職務)
 * @param {string} jobBind 是否綁定職務
 * @param {string} disable 是否停用
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} company_id 公司流水號
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export interface UserListNoLevelSearchParams {
  jobBind: string;
  disable: string;
  username: string;
  name: string;
  company_id: string;
  page: number;
  num_per_page: number;
}

/** 帳號列表查詢結果 (未綁定職務)
 * @param {string} disable 是否停用
 * @param {string} user_id 使用者流水號
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} ul_name 職務名稱
 * @param {string} position_id 職位流水號
 * @param {string} position_name 職位名稱
 * @param {string} class_id 班別流水號
 * @param {string} class_name 班別名稱
 * @param {string} sc_name 班別名稱
 * @param {string} department_id 部門流水號
 * @param {string} department_name 部門名稱
 * @param {string} state 狀態
 * @param {string} last_clock_out_time 最後打卡時間
 * @param {string} home_page_name 首頁名稱 */
export interface UserListNoLevelSearchResItem {
  disable: string;
  user_id: string;
  username: string;
  name: string;
  ul_name: string;
  position_id: string;
  position_name: string;
  class_id: string;
  class_name: string;
  sc_name: string;
  department_id: string;
  department_name: string;
  state: string;
  last_clock_out_time: string;
  home_page_name: string;
}

/** 帳號列表查詢 (未綁定職務)
 * @param {UserListNoLevelSearchParams} obj 帳號列表查詢參數
 */
export const UserListNoLevelSearch = async (obj: UserListNoLevelSearchParams): Promise<ResultObj<UserListNoLevelSearchResItem[]>> => {
  return await AuthorizeFetch("User/UserSearchNoLevel", obj);
};

/**
 * 新增帳號參數
 * @param {string} username 使用者名稱
 * @param {string} name 使用者姓名
 * @param {string} password 密碼
 * @param {string} gender 性別
 * @param {string} birthday 生日
 * @param {string} telephone 電話
 * @param {string} mobile_phone 手機
 * @param {string} email 電子郵件
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} address 地址
 * @param {string} city_census 戶籍城市
 * @param {string} area_census 戶籍區域
 * @param {string} address_census 戶籍地址
 * @param {string} on_board_date 入職日期
 * @param {string} note 備註
 * @param {string} home_page 首頁
 * @param {string} blood_type 血型
 * @param {string} identity_card 身分證字號
 */
export interface UserCreateParams {
  username: string;
  name: string;
  password: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  city_census: string;
  area_census: string;
  address_census: string;
  on_board_date: string;
  note: string;
  home_page: string;
  blood_type: string;
  identity_card: string;
}

/** 新增帳號
 * @param {UserCreateParams} obj 新增帳號參數
 */
export const UserCreate = async (obj: UserCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserCreate", obj);
};

/** 編輯帳號參數
 * @param {string} user_id 使用者流水號
 * @param {string} username 使用者名稱
 * @param {string} password 密碼
 * @param {string} name 使用者姓名
 * @param {string} gender 性別
 * @param {string} birthday 生日
 * @param {string} telephone 電話
 * @param {string} mobile_phone 手機
 * @param {string} email 電子郵件
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} address 地址
 * @param {string} city_census 戶籍城市
 * @param {string} area_census 戶籍區域
 * @param {string} address_census 戶籍地址
 * @param {string} on_board_date 入職日期
 * @param {string} note 備註
 * @param {string} home_page 首頁
 * @param {string} blood_type 血型
 * @param {string} identity_card 身分證字號
 */
export interface UserUpdateParams {
  user_id: string;
  username: string;
  name: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  city_census: string;
  area_census: string;
  address_census: string;
  on_board_date: string;
  note: string;
  home_page: string;
  blood_type: string;
  identity_card: string;
}

/** 編輯帳號 */
export const UserUpdate = async (obj: UserUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserUpdate", obj);
};

/** 重設密碼參數
 * @param {string} user_id 使用者流水號
 * @param {string} new_password 新密碼
 */
export interface ResetPasswordParams {
  user_id: string;
  new_password: string;
}

/** 重設密碼
 * @param {ResetPasswordParams} obj 重設密碼參數
 */
export const ResetPassword = async (obj: ResetPasswordParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/ResetPassword", obj);
};

/** 變更帳號狀態參數
 * @param {string} user_id 使用者流水號
 * @param {string} disable 是否停用
 */
export interface UserUpdateDisableParams {
  user_id: string;
  disable: string;
}

/** 變更帳號狀態
 * @param {UserUpdateDisableParams} obj 變更帳號狀態參數
 */
export const UserUpdateDisable = async (obj: UserUpdateDisableParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserUpdateDisable", obj);
};

/** 離職參數
 * @param {string} user_id 使用者流水號
 * @param {string} resign_date 離職日期
 * @param {string} resign_reason 離職原因
 */
export interface UserResignParams {
  user_id: string;
  resign_date: string;
  resign_reason: string;
}

/** 離職
 * @param {UserResignParams} obj 離職參數
 */
export const UserResign = async (obj: UserResignParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserResign", obj);
};

/** 更新職務參數
 * @param {string} user_id 使用者流水號
 * @param {string} ul_id 職務流水號
 * @param {string} ucr_id 使用者角色流水號
 * @param {string} career_level 職級
 */
export interface UserUpdateLevelParams {
  user_id: string;
  ul_id: string;
  ucr_id: string;
  career_level: string;
}

/** 更新職務
 * @param {UserUpdateLevelParams} obj 更新職務參數
 */
export const UserUpdateLevel = async (obj: UserUpdateLevelParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserUpdateLevel", obj);
};

/** 更新職責參數
 * @param {string} ud_ids 職責流水號
 * @param {string} user_id 使用者流水號
 */
export interface UserUpdateDutyParams {
  ud_ids: string;
  user_id: string;
}

/** 更新職責
 * @param {UserUpdateDutyParams} obj 更新職責參數
 */
export const UserUpdateDuty = async (obj: UserUpdateDutyParams): Promise<ResultObj> => {
  return await AuthorizeFetch("User/UserUpdateDuty", obj);
};
