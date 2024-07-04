import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 訂單管理建立
 * @param {string} type 類別(接機/送機)
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 路
 * @param {string} section 段
 * @param {string} address 巷弄與門牌號碼
 * @param {string} airport 機場
 * @param {string} terminal 航廈
 * @param {string} flght_number 航班號碼
 * @param {string} date_travel 航班日期
 * @param {string} time_travel 航班時間
 * @param {string} number_passenger 乘客人數
 * @param {string} number_bags 行李數
 * @param {string} cms_id 車型ID
 * @param {string} signboard_title 舉牌標題
 * @param {string} signboard_content 舉牌內容
 * @param {string} name_purchaser 訂購人姓名
 * @param {string} phone_purchaser 訂購人電話
 * @param {string} email_purchaser 訂購人信箱
 * @param {string} name_passenger 乘客姓名
 * @param {string} phone_passenger 乘客電話
 * @param {string} email_passenger 乘客信箱
 * @param {string} price 價格
 * @param {string} link 連結
 */
export interface ATS_OrderMasterCreateParams {
    visible: string;
    type: string;
    city: string;
    area: string;
    road: string;
    section: string;
    address: string;
    airport: string;
    terminal: string;
    flght_number: string;
    date_travel: string;
    time_travel: string;
    number_passenger: 0;
    number_bags: 0;
    cms_id: string;
    signboard_title: string;
    signboard_content: string;
    name_purchaser: string;
    phone_purchaser: string;
    email_purchaser: string;
    name_passenger: string;
    phone_passenger: string;
    email_passenger: string;
    price: 0;
    link: string;
}

/**
 * @description 訂單管理建立
 */
export const ATS_OrderMasterCreate = async (obj: ATS_OrderMasterCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_OrderMaster/ATS_OrderMasterCreate", obj);
};

/**
 * @description 訂單管理修改
 * @param {string} type 類別(接機/送機)
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 路
 * @param {string} section 段
 * @param {string} address 巷弄與門牌號碼
 * @param {string} airport 機場
 * @param {string} terminal 航廈
 * @param {string} flght_number 航班號碼
 * @param {string} date_travel 航班日期
 * @param {string} time_travel 航班時間
 * @param {string} number_passenger 乘客人數
 * @param {string} number_bags 行李數
 * @param {string} cms_id 車型ID
 * @param {string} signboard_title 舉牌標題
 * @param {string} signboard_content 舉牌內容
 * @param {string} name_purchaser 訂購人姓名
 * @param {string} phone_purchaser 訂購人電話
 * @param {string} email_purchaser 訂購人信箱
 * @param {string} name_passenger 乘客姓名
 * @param {string} phone_passenger 乘客電話
 * @param {string} email_passenger 乘客信箱
 * @param {string} price 價格
 * @param {string} link 連結
 * @param {string} o_id 訂單ID
 */
export interface ATS_OrderMasterUpdateParams {
    visible: string;
    type: string;
    city: string;
    area: string;
    road: string;
    section: string;
    address: string;
    airport: string;
    terminal: string;
    flght_number: string;
    date_travel: string;
    time_travel: string;
    number_passenger: 0;
    number_bags: 0;
    cms_id: string;
    signboard_title: string;
    signboard_content: string;
    name_purchaser: string;
    phone_purchaser: string;
    email_purchaser: string;
    name_passenger: string;
    phone_passenger: string;
    email_passenger: string;
    price: 0;
    link: string;
    o_id: string;
}

/**
 * @description 訂單管理修改
 */
export const ATS_OrderMasterUpdate = async (obj: ATS_OrderMasterUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_OrderMaster/ATS_OrderMasterUpdate", obj);
};

/**
 * @description 訂單管理查詢
 * @param {string} type 類別(接機/送機)
 * @param {string} city 城市
 * @param {string} area 區域
 * @param {string} road 路
 * @param {string} section 段
 * @param {string} address 巷弄與門牌號碼
 * @param {string} airport 機場
 * @param {string} terminal 航廈
 * @param {string} flght_number 航班號碼
 * @param {string} date_travel 航班日期
 * @param {string} time_travel 航班時間
 * @param {string} number_passenger 乘客人數
 * @param {string} number_bags 行李數
 * @param {string} cms_id 車型ID
 * @param {string} signboard_title 舉牌標題
 * @param {string} signboard_content 舉牌內容
 * @param {string} name_purchaser 訂購人姓名
 * @param {string} phone_purchaser 訂購人電話
 * @param {string} email_purchaser 訂購人信箱
 * @param {string} name_passenger 乘客姓名
 * @param {string} phone_passenger 乘客電話
 * @param {string} email_passenger 乘客信箱
 * @param {string} price 價格
 * @param {string} link 連結
 * @param {string} o_id 訂單ID
 * @param {string} excel 匯出excel
 * @param {string} page 頁數
 * @param {string} num_per_page 每頁筆數
 */
export interface ATS_OrderMasterSearchParams {
    visible: string;
    type: string;
    city: string;
    area: string;
    road: string;
    section: string;
    address: string;
    airport: string;
    terminal: string;
    flght_number: string;
    date_travel: string;
    time_travel: string;
    number_passenger: 0;
    number_bags: 0;
    cms_id: string;
    signboard_title: string;
    signboard_content: string;
    name_purchaser: string;
    phone_purchaser: string;
    email_purchaser: string;
    name_passenger: string;
    phone_passenger: string;
    email_passenger: string;
    price: 0;
    link: string;
    o_id: string;
    excel: string;
    page: string;
    num_per_page: string;
}

/**
 * @description 訂單管理查詢
 */
export const ATS_OrderMasterSearch = async (obj: ATS_OrderMasterSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_OrderMaster/ATS_OrderMasterSearch", obj);
};

/**
 * @description 訂單管理刪除
 * @param {string} o_id 訂單ID
 */
export interface ATS_OrderMasterDeleteParams {
    o_id: string;
}

/**
 * @description 訂單管理刪除
 */
export const ATS_OrderMasterDelete = async (obj: ATS_OrderMasterDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("ATS_OrderMaster/ATS_OrderMasterDelete", obj);
};