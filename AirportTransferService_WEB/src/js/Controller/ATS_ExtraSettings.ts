import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 加價設定建立
 * @param {string} visible 是否開放
 * @param {string} type 加價類型
 * @param {string} name 加價名稱
 * @param {string} price 加價金額
 */
export interface ATS_ExtraSettingsCreateParams {
    visible: string;
    type: string;
    name: string;
    price: number;
}

/**
 * @description 加價設定建立
 */
export const ATS_ExtraSettingsCreate = async (obj: ATS_ExtraSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_ExtraSettings/ATS_ExtraSettingsCreate", obj);
};

/**
 * @description 加價設定修改
 * @param {string} visible 是否開放
 * @param {string} type 加價類型
 * @param {string} name 加價名稱
 * @param {string} price 加價金額
 * @param {string} es_id 加價ID
 */
export interface ATS_ExtraSettingsUpdateParams {
    visible: string;
    type: string;
    name: string;
    price: number;
    es_id: string;
}

/**
 * @description 加價設定修改
 */
export const ATS_ExtraSettingsUpdate = async (obj: ATS_ExtraSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_ExtraSettings/ATS_ExtraSettingsUpdate", obj);
};

/**
 * @description 加價設定查詢
 * @param {string} visible 是否開放
 * @param {string} type 加價類型
 * @param {string} name 加價名稱
 * @param {string} price 加價金額
 * @param {string} es_id 加價ID
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_ExtraSettingsSearchParams {
    visible: string;
    es_id: string;
    type: string;
    name: string;
    price: number;
    excel: string;
    page: string;
    num_per_page: string;
}

/**
 * @description 加價設定查詢
 */
export const ATS_ExtraSettingsSearch = async (obj: ATS_ExtraSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_ExtraSettings/ATS_ExtraSettingsSearch", obj);
};

/**
 * @description 加價設定刪除
 * @param {string} es_id 加價ID
 */
export interface ATS_ExtraSettingsDeleteParams {
    es_id: string;
}

/**
 * @description 加價設定刪除
 */
export const ATS_ExtraSettingsDelete = async (obj: ATS_ExtraSettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_ExtraSettings/ATS_ExtraSettingsDelete", obj);
};