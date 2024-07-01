import { ResultObj, AuthorizeFetch } from "../DomainTS";

export type GiftCommodityItem = {
  // csh_id: number;
  // pxg_id: number;
  // iscombination: string;
  // commodity_code: string;
  // commodity_name: string;
  // ccad_id_1: string;
  // ccad_id_2: string;
  count: number;
  // stock_count: number;
  price: number;
  // filepath_headshot: string;
  // ship_type_name: string;
} & CommodityItem

export type CommodityItem = {
  commodity_id: string;
  uc_id: string;
  ccad_id_1: string;
  ccad_id_2: string;
}
export type CommodityLabelItem = {
  label_big: string;
  label_mid: string;
  label_small: string;
}

/**
* Promotion/PromotionCreate
 * @description 促銷活動新建參數
 */
export interface PromotionCreateParams {
  name: string;
  note?: string;
  order: number;
  combine_other_promotion: string;
  valid_time_start?: string;
  valid_time_end?: string;
  event_type: string;
  count_type: string;
  event_number_start: number;
  event_number_end: number;
  discount_type?: string;
  discount_startcount?: number;
  discount_maxcount?: number;
  discount_number?: number;
  gift_object_number?: number;
  ismultiple?: string;
  isfreightfree?: string;
  freight_discount?: number;
  promotion_type: string;
  discount_code?: string;
  istemplate?: string;
  personal_use_limit?: number;
  all_use_limit?: number;
  cl_id?: number | null;
  cl_level_start?: number | null;
  cl_level_end?: number | null;
  source_type?: string;
  isadvance?: string;
  su?: string;
  bonus_fix: number | string;
  bonus_percent: number | string;
  restrict_commoditys: CommodityItem[];
  restrict_commodity_labels: CommodityLabelItem[];
  target_commoditys: CommodityItem[];
  target_commodity_labels: CommodityLabelItem[];
  gift_commoditys: GiftCommodityItem[];
}

/**
 * @description 促銷活動新建
 * @param {PromotionCreateParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionCreate = async (obj: PromotionCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionCreate", obj);
};

/**
 * Promotion/PromotionUpdate
 * @description 促銷活動修改參數
 */
export interface PromotionUpdateParams {
  promotion_id: string;
  name: string;
  note: string;
  order: number;
  combine_other_promotion: string;
  valid_time_start?: string;
  valid_time_end?: string;
  event_type: string;
  count_type: string;
  event_number_start: number;
  event_number_end: number;
  discount_type: string;
  discount_startcount: number;
  discount_maxcount: number;
  discount_number: number;
  gift_object_number: number;
  ismultiple: string;
  isfreightfree: string;
  freight_discount: number;
  promotion_type: string;
  discount_code: string;
  istemplate: string;
  personal_use_limit: number;
  all_use_limit: number;
  cl_id: number | null;
  cl_level_start: number | null;
  cl_level_end: number | null;
  source_type: string;
  isadvance: string;
  restrict_commoditys: CommodityItem[];
  restrict_commodity_labels: CommodityLabelItem[];
  target_commoditys: CommodityItem[];
  target_commodity_labels: CommodityLabelItem[];
  gift_commoditys: GiftCommodityItem[];
  visible: string;
}

/**
 * @description 促銷活動修改
 * @param {PromotionUpdateParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdate = async (obj: PromotionUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdate", obj);
};

/**
 * Promotion/PromotionUpdate
 * @description 促銷活動修改參數
 */
export interface PromotionUpdateMasterParams {
  promotion_id: string,
  visible: string,
  name: string,
  note: string,
  order: string,
  combine_other_promotion: string,
  customer_labels: string,
  valid_time_start: string,
  valid_time_end: string
}

/**
 * @description 促銷活動修改主項
 * @param {PromotionUpdateMasterParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdateMaster = async (obj: PromotionUpdateMasterParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdateMaster", obj);
};

/**
 * Promotion/PromotionUpdateDiscount
 * @description 促銷活動修改折扣內容
 */
export interface PromotionUpdateDiscountParams {
  promotion_id: string,
  event_type: string,
  count_type: string,
  event_number_start: string,
  event_number_end: string,
  discount_type: string,
  discount_startcount: string,
  discount_maxcount: string,
  discount_number: string,
  ismultiple: string,
  isfreightfree: string
}

/**
 * @description 促銷活動修改折扣內容
 * @param {PromotionUpdateDiscountParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdateDiscount = async (obj: PromotionUpdateDiscountParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdateDiscount", obj);
};

/**
 * Promotion/PromotionUpdateRestrictCommodity
 * @description 促銷活動修改折扣內容
 */
export interface PromotionUpdateRestrictCommodityParams {
  promotion_id: string,
  restrict_commoditys: CommodityItem[];
  restrict_commodity_labels: CommodityLabelItem[];
}

/**
 * @description 促銷活動修改折扣內容
 * @param {PromotionUpdateRestrictCommodityParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdateRestrictCommodity = async (obj: PromotionUpdateRestrictCommodityParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdateRestrictCommodity", obj);
};

/**
 * Promotion/PromotionUpdateTargetCommodity
 * @description 促銷活動修改目標商品
 */
export interface PromotionUpdateTargetCommodityParams {
  promotion_id: string,
  target_commoditys: CommodityItem[];
  target_commodity_labels: CommodityLabelItem[];
}

/**
 * @description 促銷活動修改目標商品
 * @param {PromotionUpdateTargetCommodityParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdateTargetCommodity = async (obj: PromotionUpdateTargetCommodityParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdateTargetCommodity", obj);
};

/**
 * Promotion/PromotionUpdateGift
 * @description 促銷活動修改贈品
 */
export interface PromotionUpdateGiftParams {
  promotion_id: string,
  gift_object_number: number;
  gift_commoditys: GiftCommodityItem[];
}

/**
 * @description 促銷活動修改贈品
 * @param {PromotionUpdateGiftParams} obj 參數
 * @returns {Promise<ResultObj>} 採購主項新建結果
 */
export const PromotionUpdateGift = async (obj: PromotionUpdateGiftParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUpdateGift", obj);
};

export interface PromotionSearchParams {
  name?: string,
  valid_time_start?: string,
  valid_time_end?: string,
  event_type?: string,
  discount_type?: string,
  combine_other_promotion?: string,
  isfreightfree?: string,
  visible?: string,
  promotion_type?: string,
  discount_code?: string,
  istemplate?: string,
  cl_id?: string,
  cl_level_start?: number,
  cl_level_end?: number,
  source_type?: string,
  isadvance?: string,
  su?: string,
  page: number,
  num_per_page: number
}

export interface PromotionSearchResult {
  promotion_id?: string;
  name?: string;
  note?: string;
  order?: number;
  combine_other_promotion?: string;
  valid_time_start?: string;
  valid_time_end?: string;
  event_type?: string;
  count_type?: string;
  event_number_start?: number;
  event_number_end?: number;
  discount_type?: string;
  discount_startcount?: number;
  discount_maxcount?: number;
  discount_number?: number;
  visible?: string;
  ismultiple?: string;
  isfreightfree?: string;
  freight_discount?: number;
  promotion_type?: string;
  discount_code?: string;
  istemplate?: string;
  personal_use_limit?: number;
  all_use_limit?: number;
  cl_id?: number;
  cl_name?: string;
  cl_level?: number;
  cl_level_start?: number;
  cl_level_end?: number;
  source_type?: string;
  isadvance?: string;
  su?: string;
}

/**
 * @description 促銷活動查詢
 * @param {PromotionSearchParams} obj 參數
 * @returns {Promise<ResultObj<PromotionSearchResult[]>>} 促銷活動查詢結果
 */
export const PromotionSearch = async (obj: PromotionSearchParams): Promise<ResultObj<PromotionSearchResult[]>> => {
  return await AuthorizeFetch("Promotion/PromotionSearch", obj);
};

export interface PromotionDetailParams {
  promotion_id: string
}

export type DetailResultInfoItem = {
  promotion_id: string,
  name: string,
  note: string,
  order: number,
  combine_other_promotion: string,
  valid_time_start: string,
  valid_time_end: string,
  event_type: string,
  count_type: string,
  event_number_start: number,
  event_number_end: number,
  discount_type: string,
  discount_startcount: number,
  discount_maxcount: number,
  discount_number: number,
  gift_object_number: number,
  visible: string,
  ismultiple: string,
  isfreightfree: string,
  freight_discount: number,
  promotion_type: string,
  discount_code: string,
  istemplate: string,
  personal_use_limit: number,
  all_use_limit: number,
  cl_id: number | null,
  cl_name: string,
  cl_level: number | null,
  cl_level_start: number | null,
  cl_level_end: number,
  source_type: string,
  isadvance: string,
  su: string
}
export type DetailResultItem = {
  promotion_id: string,
  commodity_id: string,
  commodity_code: string,
  commodity_name: string,
  uc_id: string,
  convert_unit_name: string,
  convert_count: 0,
  basic_unit_name: string,
  basic_count: 0,
  ccad_id_1: string,
  ccad_name_1: string,
  ccad_id_2: string,
  ccad_name_2: string
}

export type DetailResultCommodityItem = {
  type: string,
} & DetailResultItem

export type DetailResultGiftItem = {
  count: 0,
  price: 0
} & DetailResultItem

export type DetailResultLabelsItem = {
  promotion_id: string,
  type: string,
  label_big: string,
  content_big: string,
  label_mid: string,
  content_mid: string,
  label_small: string,
  content_small: string
}
export interface PromotionDetailResult {
  info: DetailResultInfoItem,
  dt_restrict_commoditys: DetailResultCommodityItem[],
  dt_target_commoditys: DetailResultCommodityItem[],
  dt_restrict_labels: DetailResultLabelsItem[],
  dt_target_labels: DetailResultLabelsItem[],
  dt_gift_commoditys: DetailResultGiftItem[]
}

/**
 * @description 促銷活動細項
 * @param {PromotionDetailParams} obj 參數
 * @returns {Promise<ResultObj<PromotionDetailResult[]>>} 促銷活動細項結果
 */
export const PromotionDetail = async (obj: PromotionDetailParams): Promise<ResultObj<PromotionDetailResult>> => {
  return await AuthorizeFetch("Promotion/PromotionDetail", obj);
};

export interface PromotionDeleteParams {
  promotion_id: string,
}
/**
 * @description 促銷活動刪除
 * @param {PromotionDeleteParams} obj 參數
 */
export const PromotionDelete = async (obj: PromotionDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionDelete", obj);
};

export interface PromotionUseLogCreateParams {
  customer_ids: string[],
  promotion_id: string,
  expired_date: string
}
/**
 * @description 建立促銷活動使用紀錄(發優惠券)
 * @param {PromotionUseLogCreateParams} obj 參數
 */
export const PromotionUseLogCreate = async (obj: PromotionUseLogCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUseLogCreate", obj);
};

export type PromotionUseLogUpdateItem = {
  pul_id: number,
  isvalid: string,
  expired_date: string
}

export interface PromotionUseLogUpdateParams {
  pul_list: PromotionUseLogUpdateItem[],
}
/**
 * @description 修改促銷活動使用紀錄
 * @param {PromotionUseLogUpdateParams} obj 參數
 */
export const PromotionUseLogUpdate = async (obj: PromotionUseLogUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Promotion/PromotionUseLogUpdate", obj);
};

export interface PromotionUseLogSearchParams {
  pul_id: number,
  promotion_id: string,
  promotion_type: string,
  ec_order_id: string,
  customer_id: string,
  expired_date_start: string,
  expired_date_end: string,
  use_date_start: string,
  use_date_end: string,
  cre_date_start: string,
  cre_date_end: string,
  isvalid: string,
  page: number,
  num_per_page: number
}
export interface PromotionUseLogSearchResult {
  cre_time: string,
  pul_id: number,
  promotion_id: string,
  promotion_name: string,
  ec_order_id: string,
  ec_order_code: string,
  customer_id: string,
  customer_name: string,
  expired_date: string,
  use_time: string,
  isvalid: string
}
/**
 * @description 查詢促銷活動使用紀錄
 * @param {PromotionUseLogSearchParams} obj 參數
 * @returns {Promise<ResultObj<PromotionUseLogSearchResult[]>>} 促銷活動使用紀錄結果
 */
export const PromotionUseLogSearch = async (obj: PromotionUseLogSearchParams): Promise<ResultObj<PromotionUseLogSearchResult[]>> => {
  return await AuthorizeFetch("Promotion/PromotionUseLogSearch", obj);
};

