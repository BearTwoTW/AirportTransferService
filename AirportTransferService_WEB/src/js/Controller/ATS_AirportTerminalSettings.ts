import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 機場航廈設定建立
 * @param {string} visible 是否開放
 * @param {string} airport 航廈
 * @param {string} terminal 航站
 */
export interface ATS_AirportTerminalSettingsCreateParams {
    visible: string;
    airport: string;
    terminal: string;
}

/**
 * @description 機場航廈設定建立
 */
export const ATS_AirportTerminalSettingsCreate = async (obj: ATS_AirportTerminalSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_AirportTerminalSettings/ATS_AirportTerminalSettingsCreate", obj);
};

/**
 * @description 機場航廈設定修改
 * @param {string} visible 是否開放
 * @param {string} airport 航廈
 * @param {string} terminal 航站
 * @param {string} ats_id 航站ID
 */
export interface ATS_AirportTerminalSettingsUpdateParams {
    visible: string;
    airport: string;
    terminal: string;
    ats_id: string;
}

/**
 * @description 機場航廈設定修改
 */
export const ATS_AirportTerminalSettingsUpdate = async (obj: ATS_AirportTerminalSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_AirportTerminalSettings/ATS_AirportTerminalSettingsUpdate", obj);
};

/**
 * @description 機場航廈設定查詢
 * @param {string} visible 是否開放
 * @param {string} ats_id 航站ID
 * @param {string} airport 航廈
 * @param {string} terminal 航站
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_AirportTerminalSettingsSearchParams {
    visible: string;
    ats_id: string;
    airport: string;
    terminal: string;
    excel: string;
    page: 0;
    num_per_page: 0;
}

/**
 * @description 機場航廈設定查詢
 */
export const ATS_AirportTerminalSettingsSearch = async (obj: ATS_AirportTerminalSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("/ATS_AirportTerminalSettings/ATS_AirportTerminalSettingsSearch", obj);
};

/**
 * @description 機場航廈設定刪除
 * @param {string} ats_id 航站ID
 */
export interface ATS_AirportTerminalSettingsDeleteParams {
    ats_id: string;
}

/**
 * @description 機場航廈設定刪除
 */
export const ATS_AirportTerminalSettingsDelete = async (obj: ATS_AirportTerminalSettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_AirportTerminalSettings/ATS_AirportTerminalSettingsDelete", obj);
};