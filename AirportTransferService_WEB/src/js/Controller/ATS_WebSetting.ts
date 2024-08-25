import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 網站設定查詢
 * @param {string} ws_id 網站設定ID
 * @param {string} title 標題
 * @param {string} image 圖片
 * @param {string} text1 文字1
 * @param {string} text2 文字2
 * @param {string} text3 文字3
 * @param {string} html1 HTML標籤1
 * @param {string} html2 HTML標籤2
 * @param {string} html3 HTML標籤3
 * @param {string} excel Excel匯出
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_WebSettingsSearchParams {
    ws_id: string;
    title: string;
    image: string;
    text1: string;
    text2: string;
    text3: string;
    html1: string;
    html2: string;
    html3: string;
    excel: string;
    page: number;
    num_per_page: number;
}

/**
 * @description 網站設定查詢
 */
export const ATS_WebSettingsSearch = async (obj: ATS_WebSettingsSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_WebSettings/ATS_WebSettingsSearch", obj);
};

/**
 * @description 網站設定修改
 * @param {string} ws_id 網站設定ID
 * @param {string} title 標題
 * @param {string} image 圖片
 * @param {string} text1 文字1
 * @param {string} text2 文字2
 * @param {string} text3 文字3
 * @param {string} html1 HTML標籤1
 * @param {string} html2 HTML標籤2
 * @param {string} html3 HTML標籤3
 */
export interface ATS_WebSettingsCreateParams {
    title: string;
    image: string;
    text1: string;
    text2: string;
    text3: string;
    html1: string;
    html2: string;
    html3: string;
}

/**
 * @description 網站設定修改
 */
export const ATS_WebSettingsCreate = async (obj: ATS_WebSettingsCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_WebSettings/ATS_WebSettingsCreate", obj);
};

/**
 * @description 網站設定修改
 * @param {string} ws_id 網站設定ID
 * @param {string} title 標題
 * @param {string} image 圖片
 * @param {string} text1 文字1
 * @param {string} text2 文字2
 * @param {string} text3 文字3
 * @param {string} html1 HTML標籤1
 * @param {string} html2 HTML標籤2
 * @param {string} html3 HTML標籤3
 */
export interface ATS_WebSettingsUpdateParams {
    ws_id: string;
    title: string;
    image: string;
    text1: string;
    text2: string;
    text3: string;
    html1: string;
    html2: string;
    html3: string;
}

/**
 * @description 網站設定修改
 */
export const ATS_WebSettingsUpdate = async (obj: ATS_WebSettingsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_WebSettings/ATS_WebSettingsUpdate", obj);
};