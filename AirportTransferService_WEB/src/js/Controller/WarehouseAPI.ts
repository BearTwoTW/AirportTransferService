import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**倉庫主項新建參數
 * @description 倉庫主項新建參數
 * @param {string} name 名稱
 * @param {string} address 地址
 * @param {string} type 類型
 * @param {string} position_id 位置ID
 * @param {string} note 備註
 */
export interface WarehouseMasterCreateParams {
  name: string
  address: string
  type: string
  position_id: string
  note: string
}

/**倉庫主項新建
 * @description 倉庫主項新建
 */
export const WarehouseMasterCreate = async (
  obj: WarehouseMasterCreateParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseMasterCreate", obj);
};

/**倉庫主項修改參數
 * @description 倉庫主項修改參數
 * @param {string} warehouse_master_id 倉庫主項ID
 * @param {string} name 名稱
 * @param {string} address 地址
 * @param {string} visible 可見性
 * @param {string} type 類型
 * @param {string} position_id 位置ID
 * @param {string} note 備註
 */
export interface WarehouseMasterUpdateParams {
  warehouse_master_id: string,
  name: string,
  address: string,
  visible: string,
  type: string,
  position_id: string,
  note: string
}

/**倉庫主項修改
 * @description 倉庫主項修改
 */
export const WarehouseMasterUpdate = async (
  obj: WarehouseMasterUpdateParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseMasterUpdate", obj);
};

/**倉庫主項查詢結果
 * @description 倉庫主項查詢結果
 */
export interface WarehouseMasterSearchResItem {
  warehouse_master_id: string,
  name: string,
  address: string,
  visible: string,
  type: string,
  position_id: string,
  position_name: string,
  note: string
}

/**倉庫主項查詢參數
 * @description 倉庫主項查詢參數
 * @param {string} name 名稱
 * @param {string} visible 可見性
 * @param {string} type 類型
 * @param {string} position_id 位置ID
 */
export interface WarehouseMasterSearchParams {
  name: string
  type: string
  position_id: string
  page: number
  num_per_page: number
  visible: string
}

/**倉庫主項查詢
 * @description 倉庫主項查詢
 */
export const WarehouseMasterSearch = async (
  obj: WarehouseMasterSearchParams
): Promise<ResultObj<WarehouseMasterSearchResItem[]>> => {
  return await AuthorizeFetch("Warehouse/WarehouseMasterSearch", obj);
};

/**倉庫主項細項查詢結果
 * @description 倉庫主項細項查詢結果
 */
export interface WarehouseMasterDetailResItem {
  warehouse_master_id: string,
  name: string,
  address: string,
  visible: string,
  type: string,
  position_id: string,
  position_name: string,
  note: string
}

/**倉庫主項細項查詢參數
 * @description 倉庫主項細項查詢參數
 * @param {string} warehouse_master_id 倉庫主項ID
 */
export interface WarehouseMasterDetailParams {
  warehouse_master_id: string,
}

/**倉庫主項細項查詢
 * @description 倉庫主項細項查詢
 */
export const WarehouseMasterDetail = async (
  obj: WarehouseMasterDetailParams
): Promise<ResultObj<WarehouseMasterDetailResItem[]>> => {
  return await AuthorizeFetch("Warehouse/WarehouseMasterDetail", obj);
};


/**倉庫主項刪除參數
 * @description 倉庫主項刪除參數
 * @param {string} warehouse_master_id 倉庫主項ID
 */
export interface WarehouseMasterDeleteParams {
  warehouse_master_id: string,
}

/**倉庫主項刪除
 * @description 倉庫主項刪除
 */
export const WarehouseMasterDelete = async (
  obj: WarehouseMasterDeleteParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseMasterDelete", obj);
};

/**倉庫細項新增參數
 * @description 倉庫細項新增參數
 * @param {string} warehouse_master_id 倉庫主項ID
 */
export interface WarehouseDetailCreateParams {
  warehouse_master_id: string
  storage_space: string
}

/**倉庫細項新增
 * @description 倉庫細項新增
 */
export const WarehouseDetailCreate = async (
  obj: WarehouseDetailCreateParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseDetailCreate", obj);
};

/**倉庫細項修改參數
 * @description 倉庫細項修改參數
 * @param {string} warehouse_master_id 倉庫主項ID
 */
export interface WarehouseDetailUpdateParams {
  warehouse_master_id: string
  storage_space: string
  visible: string
}

/**倉庫細項修改
 * @description 倉庫細項修改
 */
export const WarehouseDetailUpdate = async (
  obj: WarehouseDetailUpdateParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseDetailUpdate", obj);
};

/**倉庫細項查詢結果
 * @description 倉庫細項查詢結果
 */
export interface WarehouseDetailSearchResItem {
  warehouse_master_id: string
  warehouse_id: string
  name: string
  storage_space: string
  visible: string
  type: string
  position_id: string
  position_name: string
}

/**倉庫細項查詢參數
 * @description 倉庫細項查詢參數
 * @param {string} warehouse_master_id 倉庫主項ID
 */
export interface WarehouseDetailSearchParams {
  warehouse_master_id: string
  storage_space: string
  type: string
  position_id: string
  page: number
  num_per_page: number
  visible: string
}

/**倉庫細項查詢
 * @description 倉庫細項查詢
 */
export const WarehouseDetailSearch = async (
  obj: WarehouseDetailSearchParams
): Promise<ResultObj<WarehouseDetailSearchResItem[]>> => {
  return await AuthorizeFetch("Warehouse/WarehouseDetailSearch", obj);
};

/**倉庫細項刪除參數
 * @description 倉庫細項刪除參數
 * @param {string} warehouse_id 倉庫主項ID
 */
export interface WarehouseDetailDeleteParams {
  warehouse_id: string
}

/**倉庫細項刪除
 * @description 倉庫細項刪除
 */
export const WarehouseDetailDelete = async (
  obj: WarehouseDetailDeleteParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("Warehouse/WarehouseDetailDelete", obj);
};


