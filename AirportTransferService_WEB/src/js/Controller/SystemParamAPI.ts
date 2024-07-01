import { ResultObj, AuthorizeFetch } from "./../DomainTS";



/**大分類查詢結果 */
export interface PrimaryListResultItem {
  tax_id: number;
  tax_rate: string;
  tax_type: string;
}

/**大分類查詢 */
export const PrimaryList = async (
  obj: {}
): Promise<ResultObj<PrimaryListResultItem[]>> => {
  return await AuthorizeFetch("SystemParam/PrimaryList", obj);
};

/**大分類新增參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} su 是否系統使用
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface AddPrimaryParams {
  spp_id: string;
  su: string;
  name: string;
  remark?: string;
}

/**大分類新增 */
export const AddPrimary = async (
  obj: AddPrimaryParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemParam/AddPrimary", obj);
};

/**大分類細項參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} su 是否系統使用
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface PrimaryDetailParams {
  spp_id: string;
  visible: string;
}

export interface PrimaryDetailResultItem {
  spp_id: string,
  su: string,
  name: string,
  remark: string
}

/**大分類細項 */
export const PrimaryDetail = async (
  obj: PrimaryDetailParams
): Promise<ResultObj<PrimaryDetailResultItem[]>> => {
  return await AuthorizeFetch("SystemParam/PrimaryDetail", obj);
};

/**大分類修改參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} su 是否系統使用
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface UpdatePrimaryParams {
  spp_id: string;
  su: string;
  name: string;
  remark?: string;
}

/**大分類修改 */
export const UpdatePrimary = async (
  obj: UpdatePrimaryParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemParam/UpdatePrimary", obj);
};

/**中分類查詢參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} su 是否系統使用
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface SecondListParams {
  spp_id: string;
  visible: string;
}

export interface SecondListResultItem {
  sps_id: string,
  spp_id: string,
  name: string,
  code: string,
  remark: string,
  visible: string,
  seq: number
}

/**中分類查詢 */
export const SecondList = async (
  obj: SecondListParams
): Promise<ResultObj<SecondListResultItem[]>> => {
  return await AuthorizeFetch("SystemParam/SecondList", obj);
};

/**中分類新增參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface AddSecondParams {
  spp_id: string;
  name: string;
  remark?: string;
  code?: string;
  seq?: string;
}

/**中分類新增 */
export const AddSecond = async (
  obj: AddSecondParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemParam/AddSecond", obj);
};

/**中分類細項參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} su 是否系統使用
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface SecondDetailParams {
  spp_id: string;
  sps_id: string;
}

export interface SecondDetailResultItem {
  sps_id: string,
  spp_id: string,
  name: string,
  code: string,
  remark: string,
  visible: string,
  seq: number
}

/**中分類細項 */
export const SecondDetail = async (
  obj: SecondDetailParams
): Promise<ResultObj<SecondDetailResultItem[]>> => {
  return await AuthorizeFetch("SystemParam/SecondDetail", obj);
};

/**中分類修改參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface UpdateSecondParams {
  spp_id: string;
  sps_id: string;
  name?: string;
  remark?: string;
  visible?: string;
}

/**中分類修改 */
export const UpdateSecond = async (
  obj: UpdateSecondParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemParam/UpdateSecond", obj);
};

/**中分類刪除參數
 * @description 
 * @param {string} spp_id 大分類代碼
 * @param {string} name 名稱
 * @param {string} remark 備註
 */
export interface DeleteSecondParams {
  spp_id: string;
  sps_id: string;
}

/**中分類刪除 */
export const DeleteSecond = async (
  obj: DeleteSecondParams
): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemParam/DeleteSecond", obj);
};