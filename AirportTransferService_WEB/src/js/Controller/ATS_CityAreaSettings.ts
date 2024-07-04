import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 行政區域設定建立
 * @param {string} visible 是否開放
 * @param {string} zip 郵遞區號
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 街道
 * @param {string} section 段
 */
export interface ATS_CityAreaSettingsCreateParams {
    visible: string;
    zip: string;
    city: string;
    area: string;
    road: string;
    section: string;
}

/**
 * @description 行政區域設定建立
 */
export const ATS_CityAreaSettingsCreate = async (obj: ATS_CityAreaSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CityAreaSettings/ATS_CityAreaSettingsCreate", obj);
};

/**
 * @description 行政區域設定修改
 * @param {string} visible 是否開放
 * @param {string} zip 郵遞區號
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 街道
 * @param {string} section 段
 * @param {string} cas_id 行政區域設定ID
 */
export interface ATS_CityAreaSettingsUpdateParams {
    visible: string;
    zip: string;
    city: string;
    area: string;
    road: string;
    section: string;
    cas_id: string;
}

/**
 * @description 行政區域設定修改
 */
export const ATS_CityAreaSettingsUpdate = async (obj: ATS_CityAreaSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CityAreaSettings/ATS_CityAreaSettingsUpdate", obj);
};

/**
 * @description 行政區域設定查詢
 * @param {string} cas_id 行政區域設定ID
 * @param {string} visible 是否開放
 * @param {string} zip 郵遞區號
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 街道
 * @param {string} section 段
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_CityAreaSettingsSearchParams {
    cas_id: string;
    visible: string;
    zip: string;
    city: string;
    area: string;
    road: string;
    section: string;
    excel: string;
    page: 0;
    num_per_page: 0;
}

/**
 * @description 行政區域設定查詢
 */
export const ATS_CityAreaSettingsSearch = async (obj: ATS_CityAreaSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CityAreaSettings/ATS_CityAreaSettingsSearch", obj);
};

/**
 * @description 行政區域設定刪除
 * @param {string} cas_id 行政區域設定ID
 */
export interface ATS_CityAreaSettingsDeleteParams {
    cas_id: string;
}

/**
 * @description 行政區域設定刪除
 */
export const ATS_CityAreaSettingsDelete = async (obj: ATS_CityAreaSettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_CityAreaSettings/ATS_CityAreaSettingsDelete", obj);
};