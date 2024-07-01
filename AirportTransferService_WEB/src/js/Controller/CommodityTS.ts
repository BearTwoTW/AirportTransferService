import { ResultObj, AuthorizeFetch } from "../DomainTS";
//----------------------- 商品影片 -----------------------//

/**
 * @description 查詢商品影片參數
 * @param {string} commodity_id  商品流水號
 * @returns
 */
export interface CommodityVideoSearchParams {
    commodity_id: string;
}

/**
 * @description  查詢商品影片結果
 */
export interface CommodityVideoSearchResItem {
    commodity_id: string;
    isis_common_front: "Y" | "N";
    is_nav: "Y" | "N";
    notice: string[];
}

/**
 * Commodity/CommodityVideoSearch
 * @description 查詢商品影片
 */
export const CommodityVideoSearch = async (obj: CommodityVideoSearchParams): Promise<ResultObj<CommodityVideoSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityVideoSearch", obj);
};

/**
 * Commodity/CommodityVideoCreate
 * @description 新增商品影片
 * @param {CommodityVideos[]} CommodityVideos   影片們
 * @returns
 */
export interface CommodityVideoCreateParams {
    CommodityVideos: string[];
}

/**
 * Commodity/CommodityVideoCreate
 * @description 新增商品影片
 */
export const CommodityVideoCreate = async (obj: CommodityVideoCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityVideoCreate", obj);
};

/**
 * Commodity/CommodityVideoUpdate
 * @description 修改商品影片
 * @param {string} v_id  影片流水號
 * @param {CommodityVideos[]} CommodityVideos   影片們
 * @returns
 */
export interface CommodityVideoUpdateParams {
    v_id: string;
    CommodityVideos: string[];
}

/**
 * Commodity/CommodityVideoUpdate
 * @description 修改商品影片
 */
export const CommodityVideoUpdate = async (obj: CommodityVideoUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityVideoUpdate", obj);
};

/**
 * Commodity/CommodityVideoDelete
 * @description 刪除商品影片
 * @param {string} v_id  影片流水號
 * @returns
 */
export interface CommodityVideoDeleteParams {
    v_id: string;
}

/**
 * Commodity/CommodityVideoDelete
 * @description 刪除商品影片
 */
export const CommodityVideoDelete = async (obj: CommodityVideoDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityVideoDelete", obj);
};

//----------------------- 商品上架 -----------------------//

/**
 * @description 查詢商品上架時段參數
 * @param {string} commodity_id     商品流水號
 * @param {number} page             頁碼
 * @param {number} num_per_page     一頁幾筆
 * @returns
 */
export interface CommodityOnShelfPeriodSearchParams {
    commodity_id: string;
    page: number;
    num_per_page: number;
}

/**
 * @description 查詢商品上架時段結果
 * @returns
 */
export interface CommodityOnShelfPeriodSearchResItem {
    buy_retail_price: number;
    buy_wholesale_price: number;
    ccad_ids_1: string[];
    ccad_ids_2: string[];
    ccad_price_setting: string[];
    commodity_id: string;
    cosp_id: string;
    note: string;
    on_shelf_time_end: string;
    on_shelf_time_start: string;
    sale_price: number;
    suggested_price: number;
}

/**
 * @description 商品上架流水號參數
 * @param {string} commodity_id     商品流水號
 * @param {number} page             頁碼
 * @param {number} num_per_page     一頁幾筆
 * @returns
 */
export interface CommodityOnShelfPeriodParams {
    cosp_id: string;
}

/**
 * Commodity/CommodityOnShelfPeriodSearch
 * @description 查詢商品上架時段
 */
export const CommodityOnShelfPeriodSearch = async (obj: CommodityOnShelfPeriodSearchParams): Promise<ResultObj<CommodityOnShelfPeriodSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodSearch", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodDetail
 * @description 查詢商品上架時段細項
 */
export const CommodityOnShelfPeriodDetail = async (obj: CommodityOnShelfPeriodParams): Promise<ResultObj<CommodityOnShelfPeriodSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodDetail", obj);
};

/**
 * @description 新增商品上架時段參數
 * @param {string} commodity_id          商品主項流水號
 * @param {string} on_shelf_time_start   上架時間起
 * @param {string} on_shelf_time_end     上架時間迄
 * @param {string} suggested_price       建議售價
 * @param {number} sale_price            售價
 * @param {number} note                  備註
 * @param {ccad_ids_1[]} ccad_ids_1      自訂屬性細項們1
 * @param {ccad_ids_2[]} ccad_ids_2      自訂屬性細項們2
 * @returns
 */
export interface CommodityOnShelfPeriodCreateParams {
    commodity_id: string;
    on_shelf_time_start: string;
    on_shelf_time_end: string;
    suggested_price: number;
    sale_price: number;
    note: string;
    uc_id: string;
    ccad_ids_1: string;
    ccad_ids_2: string;
    ccad_price_settings: string[];
}

/**
 * Commodity/CommodityOnShelfPeriodCreate
 * @description 新增商品上架時段
 */
export const CommodityOnShelfPeriodCreate = async (obj: CommodityOnShelfPeriodCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodCreate", obj);
};

/**
 * @description 修改商品上架時段參數
 * @param {string} cosp_id               流水號
 * @param {string} commodity_id          商品主項流水號
 * @param {string} on_shelf_time_start   上架時間起
 * @param {string} on_shelf_time_end     上架時間迄
 * @param {string} suggested_price       建議售價
 * @param {number} sale_price            售價
 * @param {number} note                  備註
 * @param {ccad_ids_1[]} ccad_ids_1      自訂屬性細項們1
 * @param {ccad_ids_2[]} ccad_ids_2      自訂屬性細項們2
 * @returns
 */
export interface CommodityOnShelfPeriodUpdateParams {
    cosp_id: string;
    commodity_id: string;
    on_shelf_time_start: string;
    on_shelf_time_end: string;
    suggested_price: number;
    sale_price: number;
    note: string;
    uc_id: string;
    ccad_ids_1: string;
    ccad_ids_2: string;
    ccad_price_settings: string[];
}

/**
 * Commodity/CommodityOnShelfPeriodUpdate
 * @description 修改商品上架時段
 */
export const CommodityOnShelfPeriodUpdate = async (obj: CommodityOnShelfPeriodUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodUpdate", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodDelete
 * @description 刪除商品上架時段
 */
export const CommodityOnShelfPeriodDelete = async (obj: CommodityOnShelfPeriodParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodDelete", obj);
};

/**
 * @description 查詢商品上架時段對應標籤參數
 * @param {string} cosp_id       商品上架時段流水號流水號
 * @param {number} page             頁碼
 * @param {number} num_per_page     一頁幾筆
 * @returns
 */
export interface CommodityOnShelfPeriodXLabelSearchParams {
    commodity_id: string;
    page: number;
    num_per_page: number;
}

/**
 * @description 查詢商品上架時段對應標籤結果
 * @returns
 */
export interface CommodityOnShelfPeriodXLabelSearchResItem {
    content_big: string;
    content_mid: string;
    content_small: string;
    cospxl_id: string;
    label_big: string;
    label_mid: string;
    label_small: string;
}

/**
 * @description 商品上架流水號參數
 * @returns
 */
export interface CommodityOnShelfPeriodXLabelParams {
    cospxl_id: string;
}

/**
 * Commodity/CommodityOnShelfPeriodXLabelSearch
 * @description 查詢商品上架時段對應標籤
 */
export const CommodityOnShelfPeriodXLabelSearch = async (obj: CommodityOnShelfPeriodXLabelSearchParams): Promise<ResultObj<CommodityOnShelfPeriodXLabelSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodXLabelSearch", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodXLabelDetail
 * @description 商品上架時段對應標籤細項
 */
export const CommodityOnShelfPeriodXLabelDetail = async (obj: CommodityOnShelfPeriodXLabelParams): Promise<ResultObj<CommodityOnShelfPeriodXLabelSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodXLabelDetail", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodXLabelCreate
 * @description 新增商品上架時段對應標籤
 * @param {string} cosp_id       流水號
 * @param {string} label_big     大標籤
 * @param {string} label_mid     中標籤
 * @param {string} label_small   小標籤
 * @returns
 */
export interface CommodityOnShelfPeriodXLabelCreateParams {
    cosp_id: string;
    label_big: string;
    label_mid: string;
    label_small: string;
}

/**
 * Commodity/CommodityOnShelfPeriodXLabelCreate
 * @description 新增商品上架時段對應標籤
 */
export const CommodityOnShelfPeriodXLabelCreate = async (obj: CommodityOnShelfPeriodXLabelCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodXLabelCreate", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodXLabelCreate
 * @description 修改商品上架時段對應標籤
 * @param {string} cospxl_id     流水號
 * @param {string} cosp_id       商品上架時段流水號流水號
 * @param {string} label_big     大標籤
 * @param {string} label_mid     中標籤
 * @param {string} label_small   小標籤
 * @returns
 */
export interface CommodityOnShelfPeriodXLabelUpdateParams {
    cospxl_id: string;
    cosp_id: string;
    label_big: string;
    label_mid: string;
    label_small: string;
}

/**
 * Commodity/CommodityOnShelfPeriodXLabelUpdate
 * @description 修改商品上架時段對應標籤
 */
export const CommodityOnShelfPeriodXLabelUpdate = async (obj: CommodityOnShelfPeriodXLabelUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodXLabelUpdate", obj);
};

/**
 * Commodity/CommodityOnShelfPeriodXLabelDelete
 * @description 刪除商品上架時段對應標籤
 */
export const CommodityOnShelfPeriodXLabelDelete = async (obj: CommodityOnShelfPeriodXLabelParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityOnShelfPeriodXLabelDelete", obj);
};

//----------------------- 商品組合 -----------------------//

/**
 * @description 商品組合內容新增參數
 * @param {string} commodity_id   商品主項流水號
 * @param {string} ccad_id_1      自定義屬性細項流水號1
 * @param {string} ccad_id_2      自定義屬性細項流水號2
 * @param {contents[]} contents       內容商品們
 */
export interface CommodityCombinationCreateParams {
    commodity_id: string;
    ccad_id_1: string;
    ccad_id_2: string;
    contents: string[];
}
/**
 * Commodity/CommodityCombinationCreate
 * @description 商品組合內容新增
 */
export const CommodityCombinationCreate = async (obj: CommodityCombinationCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityCombinationCreate", obj);
};

/**
 * Commodity/CommodityCombinationUpdate
 * @description 商品組合內容修改(數量)參數
 * @param {string} ccd_id   商品主項流水號
 * @param {number} count    數量
 */

export interface CommodityCombinationUpdateParams {
    ccd_id: string;
    count: string;
}
/**
 * Commodity/CommodityCombinationUpdate
 * @description 商品組合內容修改(數量)
 */
export const CommodityCombinationUpdate = async (obj: CommodityCombinationUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityCombinationUpdate", obj);
};

/**
 * Commodity/CommodityCombinationDelete
 * @description 商品組合內容刪除參數
 * @param {string} ccd_id   商品主項流水號
 */
export interface CommodityCombinationDeleteParams {
    ccd_id: string;
}
/**
 * Commodity/CommodityCombinationDelete
 * @description 商品組合內容刪除
 */
export const CommodityCombinationDelete = async (obj: CommodityCombinationDeleteParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityCombinationDelete", obj);
};

/**
 * @description 商品組合內容庫存查詢參數
 * @param {string} commodity_id 商品主項流水號
 * @param {string} uc_id 單位流水號
 * @param {string} ccad_id_1 自定義屬性細項流水號1
 * @param {string} ccad_id_2 自定義屬性細項流水號2
 */
export interface CommodityCombinationDetailStockSearchParams {
    commodity_id: string;
    uc_id: string;
    ccad_id_1: string;
    ccad_id_2: string;
}

/**
 * @description  商品組合內容庫存查詢結果
 * @param {string} stock_id 庫存流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} type 類型
 * @param {string} commodity_code 商品代碼
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 轉換單位名稱
 * @param {number} convert_count 轉換數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本數量
 * @param {string} uc_id 單位流水號
 * @param {string} ccad_id_1 自定義屬性細項流水號1
 * @param {string} ccad_name_1 自定義屬性細項名稱1
 * @param {string} ccad_id_2 自定義屬性細項流水號2
 * @param {string} ccad_name_2 自定義屬性細項名稱2
 * @param {string} warehouse_id 倉庫流水號
 * @param {string} warehouse_name 倉庫名稱
 * @param {string} warehouse_storage_space 倉庫儲位
 * @param {number} count 數量
 * @param {string} expired_date 過期日
 */
export interface CommodityCombinationDetailStockSearchResItem {
    stock_id: string;
    commodity_id: string;
    type: string;
    commodity_code: string;
    commodity_name: string;
    convert_unit_name: string;
    convert_count: number;
    basic_unit_name: string;
    basic_count: number;
    uc_id: string;
    ccad_id_1: string;
    ccad_name_1: string;
    ccad_id_2: string;
    ccad_name_2: string;
    warehouse_id: string;
    warehouse_name: string;
    warehouse_storage_space: string;
    count: number;
    expired_date: string | null;
}

/**
 * @description 商品組合內容庫存查詢
 * @param obj
 * @returns
 */
export const CommodityCombinationDetailStockSearch = async (obj: CommodityCombinationDetailStockSearchParams): Promise<ResultObj<CommodityCombinationDetailStockSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityCombinationDetailStockSearch", obj);
};
//----------------------- 商品分類 -----------------------//

/**
 * @description 商品分類查詢參數
 * @param {string} label_big    第一層流水號
 * @param {string} label_mid    第二層流水號
 * @param {string} visible      是否可見
 * @param {string} type         商品類別
 * @param {string} is_front     是否前台用
 * @param {string} is_nav       是否放在nav
 * @returns
 */
export interface CommodityLabelSearchParams {
    label_big?: string;
    label_mid?: string;
    visible?: "Y" | "N";
    type?: string;
    is_front?: "Y" | "N";
    is_nav?: "Y" | "N";
}

/**
 * @description  商品分類查詢結果
 */
export interface CommodityLabelSearchResItem {
    cl_id: string;
    content: string;
    is_front: "Y" | "N";
    is_nav: "Y" | "N";
    label_big: string;
    label_mid: string;
    seq: number;
    visible: "Y" | "N";
}
/**
 * @description  商品分類查詢結果
 */
export interface CommodityLabelSearchResult {
    dt_big: CommodityLabelSearchResItem[];
    dt_mid: CommodityLabelSearchResItem[];
    dt_small: CommodityLabelSearchResItem[];
}

/**
 * Commodity/CommodityLabelSearch
 * @description 商品分類查詢
 */
export const CommodityLabelSearch = async (obj: CommodityLabelSearchParams): Promise<ResultObj<CommodityLabelSearchResult>> => {
    return await AuthorizeFetch("Commodity/CommodityLabelSearch", obj);
};

/**
 * Commodity/CommodityLabelCreate
 * @description 商品分類新建
 * @param {string} label_big    第一層流水號
 * @param {string} label_mid    第二層流水號
 * @param {string} type         商品類別
 * @param {string} is_front     是否前台用
 * @param {string} is_nav       是否放在nav
 * @param {content[]} content   名稱
 */
export interface CommodityLabelCreateParams {
    label_big: string;
    label_mid: string;
    content: string;
    type: string;
    is_front: "Y" | "N";
    is_nav: "Y" | "N";
}

/**
 * Commodity/CommodityLabelCreate
 * @description 商品分類新建
 */
export const CommodityLabelCreate = async (obj: CommodityLabelCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityLabelCreate", obj);
};

/**
 * Commodity/CommodityLabelUpdate
 * @description 商品分類修改
 * @param {string} label_big    第一層流水號
 * @param {string} label_mid    第二層流水號
 * @param {string} type         商品類別
 * @param {string} is_front     是否前台用
 * @param {string} is_nav       是否放在nav
 * @param {content[]} content   名稱
 */
export interface CommodityLabelUpdateParams {
    cl_id: string;
    label_big: string;
    label_mid: string;
    content: string;
    visible: "Y" | "N";
    is_front: "Y" | "N";
    is_nav: "Y" | "N";
}

/**
 * Commodity/CommodityLabelUpdate
 * @description 商品分類修改
 */
export const CommodityLabelUpdate = async (obj: CommodityLabelUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityLabelUpdate", obj);
};

/**
 * @description 商品分類細項/刪除
 * @param {string} cl_id    流水號
 * @returns
 */
export interface CommodityLabelParams {
    cl_id: string;
}

/**
 * @description  商品分類細項查詢結果
 */
export interface CommodityLabelDetailResItem {
    commodity_code: string;
    commodity_id: string;
    commodity_name: string;
    introduction: string;
    iscombination: string;
    label_big: string;
    label_mid: string;
    label_small: string;
    need_calc_stock: "Y" | "N";
    note: string;
    type: string;
    unit: string;
    visible: "Y" | "N";
    weight: number;
}

/**
 * Commodity/CommodityLabelDetail
 * @description 商品分類細項查詢
 */
export const CommodityLabelDetail = async (obj: CommodityLabelParams): Promise<ResultObj<CommodityLabelDetailResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityLabelDetail", obj);
};

/**
 * Commodity/CommodityLabelDelete
 * @description 商品分類刪除
 */
export const CommodityLabelDelete = async (obj: CommodityLabelParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityLabelDelete", obj);
};

//----------------------- 配送方式 -----------------------//

/**
 * @description 商品禁止物流更新
 * @param {string} commodity_id       商品主項流水號
 * @param {company_id[]} logistics_id 物流流水號列表
 * @returns
 */
export interface CommodityForbidLogisticsUpdateParams {
    commodity_id: string;
    logistics_id: string[];
}

/**
 * Commodity/CommodityForbidLogisticsUpdate
 * @description 商品禁止物流更新
 * @param {string} commodity_id       商品主項流水號
 * @param {company_id[]} logistics_id 物流流水號列表
 * @returns
 */
export const CommodityForbidLogisticsUpdate = async (obj: CommodityForbidLogisticsUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityForbidLogisticsUpdate", obj);
};

/**
 * @description 商品禁止物流查詢
 * @param {string} commodity_id  商品主項流水號
 * @returns
 */
export interface CommodityForbidLogisticsSearchParams {
    commodity_id: string;
}

/**
 * @description  商品禁止物流查詢結果
 */
export interface CommodityForbidLogisticsSearchResItem {
    logistics_id: string;
    commodity_id: string;
}

/**
 * Commodity/CommodityForbidLogisticsSearch
 * @description 商品禁止物流查詢
 * @param {string} commodity_id       商品主項流水號
 * @returns
 */
export const CommodityForbidLogisticsSearch = async (obj: CommodityForbidLogisticsSearchParams): Promise<ResultObj<CommodityForbidLogisticsSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityForbidLogisticsSearch", obj);
};

//----------------------- 商品規格 -----------------------//
/**
 * @description 自訂屬性主項查詢
 * @param {string} commodity_id  商品主項流水號
 * @returns
 */
export interface CommodityCustomAttriMasterSearchParams {
    commodity_id: string;
}

/**
 * @description  自訂屬性主項查詢結果
 */
export interface CommodityCustomAttriMasterSearchResItem {
    ccam_id: string;
    ccam_name: string;
    commodity_id: string;
}

/**
 * Commodity/CommodityCustomAttriMasterSearch
 * @description 查詢商品自訂屬性主項
 * @param {string} commodity_id   商品流水號
 * @returns
 */
export const CommodityCustomAttriMasterSearch = async (obj: CommodityCustomAttriMasterSearchParams): Promise<ResultObj<CommodityCustomAttriMasterSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityCustomAttriMasterSearch", obj);
};

//----------------------- 廠商綁定 -----------------------//

/**
 * @description 廠商綁定查詢
 * @param {string} commodity_id       商品主項流水號
 * @param {string[]} company_id   廠商流水號列表
 * @returns
 */
export interface CommodityXCompanyParams {
    commodity_id: string;
    company_id: string[];
}

/**
 * @description  廠商綁定查詢結果
 */
export interface CommodityXCompanySearchResItem {
    company_id: string;
    commodity_id: string;
}

/**
 * @description 單位轉換查詢
 */
export const CommodityXCompanySearch = async (obj: CommodityXCompanyParams): Promise<ResultObj<CommodityXCompanySearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityXCompanySearch", obj);
};

/**
 * @description 廠商綁定
 */
export const CommodityXCompanyUpdate = async (obj: CommodityXCompanyParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityXCompanyUpdate", obj);
};

//----------------------- 單位轉換 -----------------------//

/**
 * @description 單位查詢參數
 * @param {string} commodity_id  商品主項流水號
 * @param {string} visible       是否可見
 * @returns
 */
export interface UnitConversionSearchParams {
    commodity_id: string;
    visible?: "Y" | "N";
}

/**
 * @description  單位轉換查詢結果
 */
export interface UnitConversionSearchResItem {
    basic_count: number;
    basic_unit_id: string;
    basic_unit_name: string;
    buy_retail_price: number;
    buy_wholesale_price: number;
    commodity_id: string;
    convert_count: number;
    convert_unit_id: string;
    convert_unit_name: string;
    safe_storage: number;
    sale_price: number;
    uc_id: string;
    visible: "Y" | "N";
}

/**
 * @description 單位轉換查詢
 */
export const UnitConversionSearch = async (obj: UnitConversionSearchParams): Promise<ResultObj<UnitConversionSearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/UnitConversionSearch", obj);
};

/**
 * @description 單位轉換新建參數
 * @param {string} commodity_id          商品主項流水號
 * @param {string} convert_unit_id       轉換單位流水號
 * @param {string} convert_count         轉換單位數量
 * @param {string} basic_unit_id         基本單位流水號
 * @param {string} basic_count           基本單位數量
 * @param {string} safe_storage          安全庫存
 * @param {string} buy_retail_price      零售買入價
 * @param {string} buy_wholesale_price   批發買入價
 * @param {string} sale_price            售價
 * @returns
 */
export interface UnitConversionCreateParams {
    commodity_id: string;
    convert_unit_id: string;
    convert_count: number;
    basic_unit_id: string;
    basic_count: number;
    safe_storage: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    sale_price: number;
}
/**
 * @description 單位轉換新建
 */
export const UnitConversionCreate = async (obj: UnitConversionCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitConversionCreate", obj);
};

/**
 * @description 單位轉換修改參數
 * @param {string} uc_id                 單位換算流水號
 * @param {string} commodity_id          商品主項流水號
 * @param {string} convert_unit_id       轉換單位流水號
 * @param {string} convert_count         轉換單位數量
 * @param {string} basic_unit_id         基本單位流水號
 * @param {string} basic_count           基本單位數量
 * @param {string} safe_storage          安全庫存
 * @param {string} visible               是否可見
 * @param {string} buy_retail_price      零售買入價
 * @param {string} buy_wholesale_price   批發買入價
 * @param {string} sale_price            售價
 * @returns
 */
export interface UnitConversionUpdateParams {
    uc_id: string;
    commodity_id: string;
    convert_unit_id: string;
    convert_count: number;
    basic_unit_id: string;
    basic_count: number;
    visible: "Y" | "N";
    safe_storage: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    sale_price: number;
}
/**
 * @description 單位轉換修改
 */
export const UnitConversionUpdate = async (obj: UnitConversionUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitConversionUpdate", obj);
};

/**
 * @description 單位轉換參數
 * @param {string} uc_id   單位換算流水號
 * @returns
 */
export interface UnitConversionParams {
    uc_id: string;
}

/**
 * @description  單位轉換細項查詢結果
 */
export interface UnitConversionDetailResItem {
    commodity_id: string;
    basic_count: number;
    basic_unit_id: string;
    basic_unit_name: string;
    buy_retail_price: number;
    buy_wholesale_price: number;
    convert_count: number;
    convert_unit_id: string;
    convert_unit_name: string;
    safe_storage: number;
    sale_price: number;
    uc_id: string;
    visible: "Y" | "N";
}

/**
 * @description 單位轉換細項
 */
export const UnitConversionDetail = async (obj: UnitConversionParams): Promise<ResultObj<UnitConversionDetailResItem[]>> => {
    return await AuthorizeFetch("Commodity/UnitConversionDetail", obj);
};

/**
 * @description 單位轉換刪除
 */
export const UnitConversionDelete = async (obj: UnitConversionParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitConversionDelete", obj);
};

/**
 * @description 單位轉換列表參數
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} type 商品類別
 * @param {string} page 頁碼
 * @param {string} num_per_page 一頁幾筆
 * @returns
 */
export interface UnitConversionListParams {
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    type: string;
    page: number;
    num_per_page: number;
}

/**
 * @description 單位轉換列表結果
 * @param {string} commodity_name 商品名稱
 * @param {string} commodity_code 商品編號
 * @param {string} uc_id 單位換算流水號
 * @param {string} commodity_id 商品主項流水號
 * @param {string} convert_unit_id 轉換單位流水號
 * @param {string} convert_unit_name 轉換單位名稱
 * @param {string} convert_count 轉換單位數量
 * @param {string} basic_unit_id 基本單位流水號
 * @param {string} basic_unit_name 基本單位名稱
 * @param {string} basic_count 基本單位數量
 * @param {string} safe_storage 安全庫存
 * @param {string} buy_retail_price 零售買入價
 * @param {string} buy_wholesale_price 批發買入價
 * @param {string} sale_price 售價
 * @param {string} visible 是否可見
 */
export interface UnitConversionListResItem {
    commodity_name: string;
    commodity_code: string;
    uc_id: string;
    commodity_id: string;
    convert_unit_id: string;
    convert_unit_name: string;
    convert_count: number;
    basic_unit_id: string;
    basic_unit_name: string;
    basic_count: number;
    safe_storage: number;
    buy_retail_price: number;
    buy_wholesale_price: number;
    sale_price: number;
    visible: "Y" | "N";
}

/**
 * @description 單位轉換列表
 * @param {UnitConversionListParams} obj 參數
 * @returns
 */
export const UnitConversionList = async (obj: UnitConversionListParams): Promise<ResultObj<UnitConversionListResItem[]>> => {
    return await AuthorizeFetch("Commodity/UnitConversionList", obj);
};

//----------------------- 單位 -----------------------//
/**
 * @description 單位查詢參數
 * @param {string} unit_name    單位名稱
 * @param {string} visible      是否可見
 * @param {number} page         頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface UnitSearchParams {
    unit_name: string;
    visible: "Y" | "N";
    page: number;
    num_per_page: number;
}

/**
 * @description 單位查詢
 */
export const UnitSearch = async (obj: UnitSearchParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitSearch", obj);
};

/**
 * Commodity/UnitCreate
 * @description 單位新建參數
 * @param {string} unit_name
 */
export interface UnitCreateParams {
    unit_name: string;
}

/**
 * @description 單位新建
 */
export const UnitCreate = async (obj: UnitCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitCreate", obj);
};

/**
 * Commodity/UnitUpdate
 * @description 單位修改參數
 * @param {string} unit_id      單位流水號
 * @param {string} unit_name    單位名稱
 * @param {string} visible      是否可見
 */
export interface UnitUpdateParams {
    cl_id: string;
    unit_name: string;
    visible: "Y" | "N";
}

/**
 * @description 單位修改
 */
export const UnitUpdate = async (obj: UnitUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitUpdate", obj);
};

/**
 * @description 單位細項查詢參數
 * @param {string} unit_id 單位流水號
 */
export interface UnitDetailParams {
    unit_id: string;
}

/**
 * @description 單位細項
 */
export const UnitDetail = async (obj: UnitDetailParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/UnitDetail", obj);
};

//----------------------- 商品 -----------------------//
/**
 * Commodity/CommoditySearch
 * @description 商品查詢參數
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} type           商品類別
 * @param {string} label_big      大分類
 * @param {string} label_mid      中分類
 * @param {string} label_small    小分類
 * @param {string} visible        開放
 * @param {string} iscombination  是否組合商品
 * @param {number} page           頁碼
 * @param {number} num_per_page   幾頁
 * @param {string} excel          商品匯出
 */
export interface CommoditySearchParams {
    commodity_code?: string;
    commodity_name: string;
    type: string;
    label_big?: string;
    label_mid?: string;
    label_small?: string;
    visible: "Y" | "N";
    iscombination?: "Y" | "N";
    page: number;
    num_per_page: number;
    excel: "Y" | "N";
}

/**
 * @description  商品查詢結果
 */
export interface CommoditySearchResItem {
    CommodityXCompany: string;
    Upd_Time: string;
    commodity_code: string;
    commodity_id: string;
    commodity_name: string;
    content_big: string;
    cre_time: string;
    iscombination: "Y" | "N";
    label_big: string;
    note: string;
    type: string;
    visible: "Y" | "N";
}

/**
 * @description 商品查詢
 */
export const CommoditySearch = async (obj: CommoditySearchParams): Promise<ResultObj<CommoditySearchResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommoditySearch", obj);
};

/**
 * Commodity/CommodityList
 * @description 商品列表
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} type 商品類別
 * @param {string} company_id 廠商流水號
 * @param {string} ct_id 車型流水號 //??
 * @param {string} ctf_id 車型規格流水號 //??
 * @param {string} label_big 大標籤
 * @param {string} label_mid 中標籤
 * @param {string} label_small 小標籤
 * @param {string} valid_only 是否只查生效中 //??
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface CommodityListParams {
    commodity_code?: string;
    commodity_name?: string;
    type?: string;
    company_id?: string;
    ct_id?: number;
    ctf_id?: number;
    label_big?: string;
    label_mid?: string;
    label_small?: string;
    valid_only?: string;
    page?: number;
    num_per_page?: number;
}

/**
 * @description  商品列表結果
 * @param {string} commodity_id 商品流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} uc_id 單位換算流水號
 * @param {string} type 商品類別
 * @param {string} ccam_id_1 自定義屬性主項流水號1
 * @param {string} ccam_name_1 自定義屬性主項名稱1
 * @param {string} ccam_id_2 自定義屬性主項流水號1
 * @param {string} ccam_name_2 自定義屬性主項名稱2
 * @param {number} seq 排序
 */
export interface CommodityListResItem {
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    uc_id: string;
    type: string;
    ccam_id_1: string;
    ccam_name_1: string;
    ccam_id_2: string;
    ccam_name_2: string;
    seq: number;
}

/**
 * @description 商品列表
 * @param {CommodityListParams} obj 參數
 * @returns
 */
export const CommodityList = async (obj: CommodityListParams): Promise<ResultObj<CommodityListResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityList", obj);
};

/**
 * Commodity/CommodityCreate
 * @description 商品新建
 * @param {string} commodity_code       商品編號
 * @param {string} commodity_name       商品名稱
 * @param {string} type                 商品類別
 * @param {string} label_big            大分類
 * @param {string} label_mid            中分類
 * @param {string} label_small          小分類
 * @param {string} unit                 單位
 * @param {string} note                 備註
 * @param {number} buy_retail_price     零售買入價
 * @param {number} buy_wholesale_price  批發買入價
 * @param {number} sale_price           售價
 * @param {number} suggested_price      建議售價
 * @param {number} safe_storage         安全庫存
 * @param {string} need_calc_stock      是否需要計算庫存
 * @param {string} iscombination        是否組合商品
 * @param {string} on_shelf_time        上架時間
 * @param {string} off_shelf_time       下架時間
 * @param {string} ccam_name_1          屬性主項名稱1
 * @param {string} ccad_name_1          屬性細項名稱1
 * @param {string} ccam_name_2          屬性主項名稱2
 * @param {string} ccad_name_2          屬性細項名稱2
 * @param {number} weight               重量(公斤)
 * @param {string} introduction         商品介紹
 */
export interface CommodityCreateParams {
    commodity_code: string;
    commodity_name: string;
    type: string;
    label_big: string;
    label_mid: string;
    label_small: string;
    unit: string;
    note: string;
    buy_retail_price: number;
    buy_wholesale_price: number;
    sale_price: number;
    suggested_price: number;
    safe_storage: number;
    need_calc_stock: "Y" | "N";
    iscombination: "Y" | "N";
    on_shelf_time: string;
    off_shelf_time: string;
    ccam_name_1: string;
    ccad_name_1: string;
    ccam_name_2: string;
    ccad_name_2: string;
    weight: number;
    introduction: string;
}

/**
 * @description 商品新建
 */
export const CommodityCreate = async (obj: CommodityCreateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityCreate", obj);
};

/**
 * Commodity/CommodityUpdate
 * @description 商品修改
 * @param {string} commodity_id         商品主項流水號
 * @param {string} commodity_code       商品編號
 * @param {string} commodity_name       商品名稱
 * @param {string} label_big            大分類
 * @param {string} label_mid            中分類
 * @param {string} label_small          小分類
 * @param {string} unit                 單位
 * @param {string} note                 備註
 * @param {number} visible              安全庫存
 * @param {string} need_calc_stock      是否需要計算庫存
 * @param {string} iscombination        是否組合商品
 * @param {number} weight               重量(公斤)
 * @param {string} introduction         商品介紹
 */
export interface CommodityUpdateParams {
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    label_big: string;
    label_mid: string;
    label_small: string;
    unit: string;
    note: string;
    visible: "Y" | "N";
    need_calc_stock: "Y" | "N";
    iscombination: "Y" | "N";
    weight: number;
    introduction: string;
}

/**
 * @description 商品新建
 */
export const CommodityUpdate = async (obj: CommodityUpdateParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityUpdate", obj);
};

/**
 * @description 商品細項查詢參數 / 刪除參數
 * @param {string} commodity_id 商品主項流水號
 */
export interface CommodityIdParams {
    commodity_id: string;
}

/**
 * @description  商品細項查詢結果
 */
export interface CommodityDetailResItem {
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    label_big: string;
    label_mid: string;
    label_small: string;
    unit: string;
    note: string;
    type: string;
    visible: "Y" | "N";
    need_calc_stock: "Y" | "N";
    iscombination: "Y" | "N";
    weight: number;
    introduction: string;
}

/**
 * @description 商品細項
 */
export const CommodityDetail = async (obj: CommodityIdParams): Promise<ResultObj<CommodityDetailResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityDetail", obj);
};

/** 商品資訊查詢參數
 * @description 商品資訊查詢參數
 * @param {string} commodity_id 商品主項流水號
 * @param {string} uc_id 單位轉換流水號
 * @param {string} ccad_id_1 自定義屬性細項流水號1
 * @param {string} ccad_id_2 自定義屬性細項流水號2
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface CommodityStorageParams {
    commodity_id: string;
    uc_id: string;
    ccad_id_1: string;
    ccad_id_2: string;
    page: number;
    num_per_page: number;
}

/** 商品資訊結果
 * @description  商品資訊結果
 * @param {string} commodity_id 商品主項流水號
 * @param {string} commodity_code 商品編號
 * @param {string} commodity_name 商品名稱
 * @param {string} convert_unit_name 轉換單位名稱
 * @param {number} convert_count 轉換單位數量
 * @param {string} basic_unit_name 基本單位名稱
 * @param {number} basic_count 基本單位數量
 * @param {string} uc_id 單位轉換流水號
 * @param {string} ccad_name_1 自定義屬性細項名稱1
 * @param {string} ccad_name_2 自定義屬性細項名稱2
 * @param {number} count 數量
 * @param {number} safe_storage 安全庫存
 */
export interface CommodityStorageResItem {
    commodity_id: string;
    commodity_code: string;
    commodity_name: string;
    convert_unit_name: string;
    convert_count: number;
    basic_unit_name: string;
    basic_count: number;
    uc_id: string;
    ccad_name_1: string;
    ccad_name_2: string;
    count: number;
    safe_storage: number;
}

/** 商品資訊
 * @description 商品資訊
 */
export const CommodityStorage = async (obj: CommodityStorageParams): Promise<ResultObj<CommodityStorageResItem>> => {
    return await AuthorizeFetch("Commodity/CommodityStorage", obj);
};

/** 商品刪除
 * @description 商品刪除
 */
export const CommodityDelete = async (obj: CommodityIdParams): Promise<ResultObj> => {
    return await AuthorizeFetch("Commodity/CommodityDelete", obj);
};


export interface CommodityCustomAttriListParams {
    commodity_id?: string,
    commodity_code?: string,
    commodity_name?: string,
    type?: string,
    page?: number,
    num_per_page?: number
}

/** 商品資訊結果
 * @description  商品資訊結果
 * @param {string} commodity_id   商品流水號
 */
export interface CommodityCustomAttriListResItem {
    commodity_id: string,
    ccam_id: string,
    ccam_name: string,
    ccad_id: string,
    ccad_name: string,
    color_code: string
}

/** Commodity/CommodityCustomAttriList
* @description 自訂屬性查詢(可用列表)
* @param {string} commodity_id   商品流水號
* @returns
*/
export const CommodityCustomAttriList = async (obj: CommodityCustomAttriListParams): Promise<ResultObj<CommodityCustomAttriListResItem[]>> => {
    return await AuthorizeFetch("Commodity/CommodityCustomAttriList", obj);
};