import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description GA設定建立
 * @param {string} tracking_code GA追蹤碼
 * @param {string} keyword 關鍵字
 * @param {string} summary 摘要
 * @param {string} descriptive_url 描述網址
 */
export interface ATS_GASettingsCreateParams {
    tracking_code: string;
    keyword: string;
    summary: string;
    descriptive_url: string;
}

/**
 * @description GA設定建立
 */
export const ATS_GASettingsCreate = async (obj: ATS_GASettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_GASettings/ATS_GASettingsCreate", obj);
};

/**
 * @description GA設定修改
 * @param {string} tracking_code GA追蹤碼
 * @param {string} keyword 關鍵字
 * @param {string} summary 摘要
 * @param {string} descriptive_url 描述網址
 * @param {string} gas_id GA設定ID
 */
export interface ATS_GASettingsUpdateParams {
    tracking_code: string;
    keyword: string;
    summary: string;
    descriptive_url: string;
    gas_id: string;
}

/**
 * @description GA設定修改
 */
export const ATS_GASettingsUpdate = async (obj: ATS_GASettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_GASettings/ATS_GASettingsUpdate", obj);
};

/**
 * @description GA設定查詢
 * @param {string} tracking_code GA追蹤碼
 * @param {string} keyword 關鍵字
 * @param {string} summary 摘要
 * @param {string} descriptive_url 描述網址
 * @param {string} gas_id GA設定ID
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_GASettingsSearchParams {
    tracking_code: string;
    keyword: string;
    summary: string;
    descriptive_url: string;
    gas_id: string;
    excel: string;
    page: string;
    num_per_page: string;
}

/**
 * @description GA設定查詢
 */
export const ATS_GASettingsSearch = async (obj: ATS_GASettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_GASettings/ATS_GASettingsSearch", obj);
};

/**
 * @description GA設定刪除
 * @param {string} gas_id GA設定ID
 */
export interface ATS_GASettingsDeleteParams {
    gas_id: string;
}

/**
 * @description GA設定刪除
 */
export const ATS_GASettingsDelete = async (obj: ATS_GASettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_GASettings/ATS_GASettingsDelete", obj);
};