import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 價錢連結建立
 * @param {string} visible 是否開放
 * @param {string} price 價錢
 * @param {string} link 連結
 */
export interface ATS_PriceLinkSettingsCreateParams {
    visible: string,
    price: 0,
    link: string
}

/**
 * @description 價錢連結建立
 */
export const ATS_PriceLinkSettingsCreate = async (obj: ATS_PriceLinkSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_PriceLinkSettings/ATS_PriceLinkSettingsCreate", obj);
};

/**
 * @description 價錢連結修改
 * @param {string} visible 是否開放
 * @param {string} pls_id 價錢連結ID
 * @param {string} price 價錢
 * @param {string} link 連結
 */
export interface ATS_PriceLinkSettingsUpdateParams {
    pls_id: string,
    visible: string,
    price: 0,
    link: string
}

/**
 * @description 價錢連結修改
 */
export const ATS_PriceLinkSettingsUpdate = async (obj: ATS_PriceLinkSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_PriceLinkSettings/ATS_PriceLinkSettingsUpdate", obj);
};

/**
 * @description 價錢連結查詢
 * @param {string} visible 是否開放
 * @param {string} pls_id 價錢連結ID
 * @param {string} price 價錢
 * @param {string} link 連結
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_PriceLinkSettingsSearchParams {
    visible: string,
    pls_id: string,
    price: 0,
    link: string
    excel: string,
    page: number,
    num_per_page: number,
}

/**
 * @description 價錢連結查詢
 */
export const ATS_PriceLinkSettingsSearch = async (obj: ATS_PriceLinkSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_PriceLinkSettings/ATS_PriceLinkSettingsSearch", obj);
};

/**
 * @description 價錢連結刪除
 * @param {string} pls_id 價錢連結ID
 */
export interface ATS_PriceLinkSettingsDeleteParams {
    pls_id: string,
}

/**
 * @description 價錢連結刪除
 */
export const ATS_PriceLinkSettingsDelete = async (obj: ATS_PriceLinkSettingsDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_PriceLinkSettings/ATS_PriceLinkSettingsDelete", obj);
};