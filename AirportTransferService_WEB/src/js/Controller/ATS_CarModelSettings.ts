import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 車型設定建立
 * @param {string} visible 是否開放
 * @param {string} name 車型名稱
 * @param {string} max_passengers 乘客數
 * @param {string} max_luggage 行李數
 * @param {string} max_child_seats 兒童座椅數
 * @param {string} max_service_extras 服務額外數
 */
export interface ATS_CarModelSettingsCreateParams {
    visible: string;
    name: string;
    max_passengers: 0;
    max_luggage: 0;
    max_child_seats: 0;
    max_service_extras: 0;
}

/**
 * @description 車型設定建立
 */
export const ATS_CarModelSettingsCreate = async (obj: ATS_CarModelSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CarModelSettings/ATS_CarModelSettingsCreate", obj);
};

/**
 * @description 車型設定修改
 * @param {string} cms_id 車型設定ID
 * @param {string} visible 是否開放
 * @param {string} name 車型名稱
 * @param {string} max_passengers 乘客數
 * @param {string} max_luggage 行李數
 * @param {string} max_child_seats 兒童座椅數
 * @param {string} max_service_extras 服務額外數
 */
export interface ATS_CarModelSettingsUpdateParams {
    cms_id: string;
    visible: string;
    name: string;
    max_passengers: 0;
    max_luggage: 0;
    max_child_seats: 0;
    max_service_extras: 0;
}

/**
 * @description 車型設定修改
 */
export const ATS_CarModelSettingsUpdate = async (obj: ATS_CarModelSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CarModelSettings/ATS_CarModelSettingsUpdate", obj);
};

/**
 * @description 車型設定查詢
 * @param {string} cms_id 車型設定ID
 * @param {string} visible 是否開放
 * @param {string} name 車型名稱
 * @param {string} max_passengers 乘客數
 * @param {string} max_luggage 行李數
 * @param {string} max_child_seats 兒童座椅數
 * @param {string} max_service_extras 服務額外數
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_CarModelSettingsSearchParams {
    cms_id: string,
    visible: string,
    name: string
    max_passengers: 0,
    max_luggage: 0,
    max_child_seats: 0,
    max_service_extras: 0,
    excel: string,
    page: 0,
    num_per_page: 0,
}

/**
 * @description 車型設定查詢
 */
export const ATS_CarModelSettingsSearch = async (obj: ATS_CarModelSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CarModelSettings/ATS_CarModelSettingsSearch", obj);
};

/**
 * @description 車型設定刪除
 * @param {string} cms_id 車型設定ID
 */
export interface ATS_CarModelSettingsDeleteParams {
    cms_id: string;
}

/**
 * @description 車型設定刪除
 */
export const ATS_CarModelSettingsDelete = async (obj: ATS_CarModelSettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CarModelSettings/ATS_CarModelSettingsDelete", obj);
};