import { ResultObj, AuthorizeFetch } from "../DomainTS";

/** 公司查詢參數
 * @param {string} name          公司名稱
 * @param {string} city          城市
 * @param {string} area          地區
 * @param {string} visible       是否可見
 * @param {number} page          頁碼
 * @param {number} num_per_page  一頁幾筆
 */
export interface CompanySearchParams {
  name?: string;
  city?: string;
  area?: string;
  visible?: string;
  page?: number;
  num_per_page?: number;
}

/** 公司查詢 */
export const CompanySearch = async (obj: CompanySearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanySearch", obj);
};

/** 公司新建參數
 * @param {string} name                公司名稱
 * @param {string} tax_id              統編號碼
 * @param {string} city                城市
 * @param {string} area                地區
 * @param {string} phone               電話
 * @param {string} url                 網址
 * @param {string} note                備註
 * @param {string} transfer_account    匯款帳號
 * @param {string} start_date          起始年月
 * @param {string} howmany_month       美幾個月
 * @param {string} which_date          幾號通知
 * @param {string} howmany_beforeday   幾天前通知
 */
export interface CompanyCreateParams {
  name: string;
  tax_id: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  url: string;
  note: string;
  transfer_account: string;
  start_date: string;
  howmany_month: string;
  which_date: string;
  howmany_beforeday: string;
}

/** 公司新建 */
export const CompanyCreate = async (obj: CompanyCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyCreate", obj);
};

/** 公司修改參數
 * @param {string} company_id          公司流水號
 * @param {string} name                公司名稱
 * @param {string} tax_id              統編號碼
 * @param {string} city                城市
 * @param {string} area                地區
 * @param {string} phone               電話
 * @param {string} url                 網址
 * @param {string} note                備註
 * @param {string} visible             是否可見
 * @param {string} transfer_account    匯款帳號
 * @param {string} start_date          起始年月
 * @param {string} howmany_month       美幾個月
 * @param {string} which_date          幾號通知
 * @param {string} howmany_beforeday   幾天前通知
 */
export interface CompanyUpdateParams {
  company_id: string;
  name: string;
  tax_id: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  url: string;
  note: string;
  transfer_account: string;
  start_date: string;
  howmany_month: string;
  which_date: string;
  howmany_beforeday: string;
}

/** 公司修改 */
export const CompanyUpdate = async (obj: CompanyUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyUpdate", obj);
};

/** 公司細項查詢參數
 * @param {string} company_id 公司流水號
 */
export interface CompanyDetailParams {
  company_id: string;
}
/** 公司細項回傳參數 */
export interface CompanyDetailResItem {
  address: string;
  area: string;
  city: string;
  code: string;
  company_id: string;
  howmany_beforeday: number;
  howmany_month: number;
  name: string;
  note: string;
  phone: string;
  start_date: string;
  tax_id: string;
  transfer_account: string;
  type: string;
  url: string;
  visible: "Y" | "N";
  which_date: string;
}

/** 公司細項查詢 */
export const CompanyDetail = async (obj: CompanyDetailParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyDetail", obj);
};

/** 聯絡人新建參數
 * @param {string} company_id 公司流水號
 * @param {string} name 聯絡人名稱
 * @param {string} phone 電話
 * @param {string} gender 性別
 * @param {string} position 職位
 * @param {string} email 電子郵件
 */
export interface CompanyContacterCreateParams {
  company_id: string;
  name: string;
  phone: string;
  gender: string;
  position: string;
  email: string;
}

/** 聯絡人新建
 * @param {CompanyContacterCreateParams} obj 聯絡人新建參數
 */
export const CompanyContacterCreate = async (obj: CompanyContacterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyContacterCreate", obj);
};

/** 聯絡人修改參數
 * @param {string} cc_id 聯絡人流水號
 * @param {string} company_id 公司流水號
 * @param {string} name 聯絡人名稱
 * @param {string} phone 電話
 * @param {string} gender 性別
 * @param {string} position 職位
 * @param {string} email 電子郵件
 */
export interface CompanyContacterUpdateParams {
  cc_id: string;
  company_id: string;
  name: string;
  phone: string;
  gender: string;
  position: string;
  email: string;
}

/** 聯絡人修改
 * @param {CompanyContacterUpdateParams} obj 聯絡人修改參數
 */
export const CompanyContacterUpdate = async (obj: CompanyContacterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyContacterUpdate", obj);
};

/** 聯絡人查詢參數
 * @param {string} company_id 公司流水號
 * @param {string} page 頁碼
 * @param {string} num_per_page 一頁幾筆
 */
export interface CompanyContacterSearchParams {
  company_id: string;
  page: string;
  num_per_page: string;
}

/** 聯絡人查詢結果
 * @param {string} cc_id 聯絡人流水號
 * @param {string} company_id 公司流水號
 * @param {string} name 聯絡人名稱
 * @param {string} phone 電話
 * @param {string} gender 性別
 * @param {string} gender_name 性別名稱
 * @param {string} position 職位
 * @param {string} email 電子郵件
 */
export interface CompanyContacterSearchResItem {
  cc_id: string;
  company_id: string;
  name: string;
  phone: string;
  gender: string;
  gender_name: string;
  position: string;
  email: string;
}

/** 聯絡人查詢
 * @param {CompanyContacterSearchParams} obj 聯絡人查詢參數
 */
export const CompanyContacterSearch = async (obj: CompanyContacterSearchParams): Promise<ResultObj<CompanyContacterSearchResItem[]>> => {
  return await AuthorizeFetch("Company/CompanyContacterSearch", obj);
};

/** 聯絡人細項參數
 * @param {string} cc_id 聯絡人流水號
 */
export interface CompanyContacterDetailParams {
  cc_id: string;
}

/** 聯絡人細項結果
 * @param {string} cc_id 聯絡人流水號
 * @param {string} company_id 公司流水號
 * @param {string} name 聯絡人名稱
 * @param {string} phone 電話
 * @param {string} gender 性別
 * @param {string} gender_name 性別名稱
 * @param {string} position 職位
 * @param {string} email 電子郵件 */
export interface CompanyContacterDetailResItem {
  cc_id: string;
  company_id: string;
  name: string;
  phone: string;
  gender: string;
  gender_name: string;
  position: string;
  email: string;
}

/** 聯絡人細項
 * @param {CompanyContacterDetailParams} obj 聯絡人細項參數
 */
export const CompanyContacterDetail = async (obj: CompanyContacterDetailParams): Promise<ResultObj<CompanyContacterDetailResItem>> => {
  return await AuthorizeFetch("Company/CompanyContacterDetail", obj);
};

/** 聯絡人刪除參數
 * @param {string} cc_id 聯絡人流水號
 */
export interface CompanyContacterDeleteParams {
  cc_id: string;
}

/** 聯絡人刪除
 * @param {CompanyContacterDeleteParams} obj 聯絡人刪除參數
 */
export const CompanyContacterDelete = async (obj: CompanyContacterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Company/CompanyContacterDelete", obj);
};
