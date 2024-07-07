import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 車資設定修改
 * @param {string} visible 是否開放
 * @param {string} fs_id 車資ID
 * @param {string} price 車資金額
 * @param {string} link 車資連結
 */
export interface ATS_FareSettingsUpdateParams {
    visible: string;
    fs_id: string;
    price: number;
    link: string;
}

/**
 * @description 車資設定修改
 */
export const ATS_FareSettingsUpdate = async (obj: ATS_FareSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_FareSettings/ATS_FareSettingsUpdate", obj);
};

/**
 * @description 車資設定查詢
 * @param {string} visible 是否開放
 * @param {string} cms_id 行政區ID
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 路
 * @param {string} section 段
 * @param {string} airport 機場
 * @param {string} terminal 航廈
 * @param {string} price 車資金額
 * @param {string} link 車資連結
 * @param {string} fs_id 車資ID
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_FareSettingsSearchParams {
    visible: string,
    fs_id: string,
    cms_id: string,
    city: string,
    area: string,
    road: string,
    section: string,
    airport: string,
    terminal: string,
    price: 0,
    link: string
    excel: string,
    page: 0,
    num_per_page: 0,
}

/**
 * @description 車資設定查詢
 */
export const ATS_FareSettingsSearch = async (obj: ATS_FareSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_FareSettings/ATS_FareSettingsSearch", obj);
};
