import { ResultObj, AuthorizeFetch } from "../DomainTS";
import { AuthorizeFetch_forCustomer, AuthorizeFetch_SimsCustomer } from "../Domain";

// #region 物流api有重改，這邊舊的先註解掉
// /**
//  * @description  物流查詢參數
//  * @returns
//  */
// export interface LogisticsSearchParams {
//     name: string;
//     visible: string;
//     page: number;
//     num_per_page: number;
// }

// /**
//  * @description  物流參數
//  * @returns
//  */
// export interface LogisticsParams {
//     id: string;
// }

// /**
//  * @description  物流查詢結果
//  */
// export interface LogisticsSearchResItem {
//     freight: number;
//     id: string;
//     name: string;
//     note: string;
//     visible: string;
// }

// /**
//  * @description  物流查詢
//  */
// export const LogisticsSearch = async (obj: LogisticsSearchParams): Promise<ResultObj<LogisticsSearchResItem[]>> => {
//     return await AuthorizeFetch("Logistics/LogisticsSearch", obj);
// };

// /**
//  * @description  物流細項
//  */
// export const LogisticsDetail = async (obj: LogisticsParams): Promise<ResultObj<LogisticsSearchResItem[]>> => {
//     return await AuthorizeFetch("Logistics/LogisticsDetail", obj);
// };

// /**
//  * @description  物流新建參數
//  * @returns
//  */
// export interface LogisticsCreateParams {
//     name: string;
//     freight: number;
//     note: string;
// }

// /**
//  * @description  物流新建
//  */
// export const LogisticsCreate = async (obj: LogisticsCreateParams): Promise<ResultObj> => {
//     return await AuthorizeFetch("Logistics/LogisticsCreate", obj);
// };

// /**
//  * @description  物流修改參數
//  * @returns
//  */
// export interface LogisticsUpdateParams {
//     id: string;
//     name: string;
//     freight: number;
//     note: string;
//     visible: string;
// }

// /**
//  * @description  物流修改
//  */
// export const LogisticsUpdate = async (obj: LogisticsUpdateParams): Promise<ResultObj> => {
//     return await AuthorizeFetch("Logistics/LogisticsUpdate", obj);
// };

// /**
//  * @description  物流刪除
//  */
// export const LogisticsDelete = async (obj: LogisticsParams): Promise<ResultObj> => {
//     return await AuthorizeFetch("Logistics/LogisticsDelete", obj);
// };
// #endregion

// #region 新的物流api
/** 物流主項建立參數
 * @param {string} lm_name 物流名稱
 * @param {string} note 備註
 */
export type LogisticsMasterCreateParams = {
  lm_name: string;
  note: string;
};

/** 物流主項建立 */
export const LogisticsMasterCreate = async (obj: LogisticsMasterCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsMasterCreate", obj);
};

/** 物流主項修改參數
 * @param {string} lm_id 物流id
 * @param {string} lm_name 物流名稱
 * @param {string} note 備註
 * @param {string} visible 是否顯示
 */
export type LogisticsMasterUpdateParams = {
  lm_id: string;
  lm_name: string;
  note: string;
  visible: string;
};

/** 物流主項修改 */
export const LogisticsMasterUpdate = async (obj: LogisticsMasterUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsMasterUpdate", obj);
};

/** 物流主項查詢參數
 * @param {string} lm_id 物流id
 * @param {string} lm_name 物流名稱
 * @param {string} visible 是否顯示
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type LogisticsMasterSearchParams = {
  lm_id: string;
  lm_name: string;
  visible: string;
  page: number;
  num_per_page: number;
};

/** 物流主項查詢結果
 * @param {string} lm_id 物流id
 * @param {string} lm_name 物流名稱
 * @param {string} note 備註
 * @param {string} visible 是否顯示
 */
export type LogisticsMasterSearchResItem = {
  lm_id: string;
  lm_name: string;
  note: string;
  visible: string;
};

/** 物流主項查詢 */
export const LogisticsMasterSearch = async (obj: LogisticsMasterSearchParams, fetchKey?: null | string): Promise<ResultObj<LogisticsMasterSearchResItem[]>> => {
  if (fetchKey === "forCustomer") {
    return await AuthorizeFetch_forCustomer("Logistics/LogisticsMasterSearch", obj);
  } else {
    return await AuthorizeFetch("Logistics/LogisticsMasterSearch", obj);
  }
};

/** 物流主項刪除參數
 * @param {string} lm_id 物流id
 */
export type LogisticsMasterDeleteParams = {
  lm_id: string;
};

/** 物流主項刪除 */
export const LogisticsMasterDelete = async (obj: LogisticsMasterDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsMasterDelete", obj);
};

/** 物流細項建立參數
 * @param {string} lm_id 物流id
 * @param {number} freight 運費
 * @param {string} note 備註
 * @param {string} ship_type 配送方式
 */
export type LogisticsDetailCreateParams = {
  lm_id: string;
  freight: number;
  note: string;
  ship_type: string;
  position_id: string;
  position_store_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
};

/** 物流細項建立 */
export const LogisticsDetailCreate = async (obj: LogisticsDetailCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsDetailCreate", obj);
};

/** 物流細項修改參數
 * @param {string} id 物流細項id
 * @param {number} freight 運費
 * @param {string} note 備註
 * @param {string} visible 是否顯示
 * @param {string} ship_type 配送方式
 */
export type LogisticsDetailUpdateParams = {
  id: string;
  freight: number;
  note: string;
  visible: string;
  ship_type: string;
  position_id: string;
  position_store_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
};

/** 物流細項修改 */
export const LogisticsDetailUpdate = async (obj: LogisticsDetailUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsDetailUpdate", obj);
};

/** 物流細項查詢參數
 * @param {string} lm_id 物流id
 * @param {string} visible 是否顯示
 * @param {string} ship_type 配送方式
 * @param {number} page 頁碼
 * @param {number} num_per_page 每頁筆數
 */
export type LogisticsDetailSearchParams = {
  lm_id: string;
  visible: string;
  ship_type: string;
  page: number;
  num_per_page: number;
};

/** 物流細項查詢結果
 * @param {number} id 物流細項id
 * @param {string} lm_id 物流id
 * @param {string} lm_name 物流名稱
 * @param {number} freight 運費
 * @param {string} visible 是否顯示
 * @param {string} note 備註
 * @param {string} ship_type 配送方式
 * @param {string} ship_type_name 配送方式名稱
 */
export type LogisticsDetailSearchResItem = {
  id: number;
  lm_id: string;
  lm_name: string;
  freight: number;
  visible: string;
  note: string;
  ship_type: string;
  ship_type_name: string;
  position_id: string;
  position_store_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
};

/** 物流細項查詢 */
export const LogisticsDetailSearch = async (obj: LogisticsDetailSearchParams, fetchKey?: null | string): Promise<ResultObj<LogisticsDetailSearchResItem[]>> => {
  if (fetchKey === "SimsCustomer") {
    return await AuthorizeFetch_SimsCustomer("Logistics/LogisticsDetailSearch", obj);
  } else if (fetchKey === "forCustomer") {
    return await AuthorizeFetch_forCustomer("Logistics/LogisticsDetailSearch", obj);
  } else {
    return await AuthorizeFetch("Logistics/LogisticsDetailSearch", obj);
  }
};

/** 物流細項細項參數
 * @param {number} id 物流細項id
 */
export type LogisticsDetailDetailParams = {
  id: number;
};

/** 物流細項細項結果
 * @param {number} id 物流細項id
 * @param {string} lm_id 物流id
 * @param {string} lm_name 物流名稱
 * @param {number} freight 運費
 * @param {string} visible 是否顯示
 * @param {string} note 備註
 * @param {string} ship_type 配送方式
 * @param {string} ship_type_name 配送方式名稱
 */
export type LogisticsDetailDetailRes = {
  id: number;
  lm_id: string;
  lm_name: string;
  freight: number;
  visible: string;
  note: string;
  ship_type: string;
  ship_type_name: string;
  position_id: string;
  position_store_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
};

/** 物流細項刪除(訂單沒選過才能刪)參數
 * @param {number} id 物流細項id
 */
export type LogisticsDetailDeleteParams = {
  id: number;
};

/** 物流細項刪除(訂單沒選過才能刪) */
export const LogisticsDetailDelete = async (obj: LogisticsDetailDetailParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Logistics/LogisticsDetailDelete", obj);
};
// #endregion
