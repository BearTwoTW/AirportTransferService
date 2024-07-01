import { AuthorizeFetch, ResultObj } from "../DomainTS";

/** 頁面群組查詢結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {number} seq 順序
 * @param {string} system 系統代碼
 * @param {string} menus 選單代碼
 * @param {string} code 頁面群組代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面群組名稱
 * @param {string} system_name 系統名稱
 * @param {string} menus_name 選單名稱
 */
export interface PageGroupListResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  pg_id: number;
  su: string;
  seq: number;
  system: string;
  menus: string;
  code: string;
  icon: string;
  name: string;
  system_name: string;
  menus_name: string;
}

/** 頁面群組查詢 */
export const PageGroupList = async (obj = {}): Promise<ResultObj<PageGroupListResItem[]>> => {
  return await AuthorizeFetch("Page/PageGroupList", obj);
};

/** 頁面群組新增參數
 * @param {string} su 系統使用
 * @param {string} seq 順序
 * @param {string} system 系統代碼
 * @param {string} menus 選單代碼
 * @param {string} code 頁面群組代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面群組名稱
 */
export interface AddPageGroupParams {
  su: string;
  seq: string;
  system: string;
  menus: string;
  code: string;
  icon: string;
  name: string;
}

/** 頁面群組新增
 * @param {AddPageGroupParams} obj 頁面群組新增參數
 */
export const AddPageGroup = async (obj: AddPageGroupParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/AddPageGroup", obj);
};

/** 頁面群組細項參數
 * @param {string} pg_id 頁面群組ID
 */
export interface PageGroupEditParams {
  pg_id: string;
}

/** 頁面群組細項結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {number} seq 順序
 * @param {string} system 系統代碼
 * @param {string} menus 選單代碼
 * @param {string} code 頁面群組代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面群組名稱
 * @param {string} system_name 系統名稱
 * @param {string} menus_name 選單名稱
 */
export interface PageGroupEditResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  pg_id: number;
  su: string;
  seq: number;
  system: string;
  menus: string;
  code: string;
  icon: string;
  name: string;
  system_name: string;
  menus_name: string;
}

/** 頁面群組細項
 * @param {PageGroupEditParams} obj 頁面群組細項參數
 */
export const PageGroupEdit = async (obj: PageGroupEditParams): Promise<ResultObj<PageGroupEditResItem>> => {
  return await AuthorizeFetch("Page/PageGroupEdit", obj);
};

/** 頁面群組修改參數
 * @param {string} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {string} seq 順序
 * @param {string} system 系統代碼
 * @param {string} menus 選單代碼
 * @param {string} code 頁面群組代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面群組名稱
 */
export interface UpdatePageGroupParams {
  pg_id: string;
  su: string;
  seq: string;
  system: string;
  menus: string;
  code: string;
  icon: string;
  name: string;
}

/** 頁面群組修改
 * @param {UpdatePageGroupParams} obj 頁面群組修改參數
 */
export const UpdatePageGroup = async (obj: UpdatePageGroupParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/UpdatePageGroup", obj);
};

/** 頁面群組刪除參數
 * @param {string} pg_id 頁面群組ID
 */
export interface DeletePageGroupParams {
  pg_id: string;
}

/** 頁面群組刪除
 * @param {DeletePageGroupParams} obj 頁面群組刪除參數
 */
export const DeletePageGroup = async (obj: DeletePageGroupParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/DeletePageGroup", obj);
};

/** 頁面查詢參數
 * @param {string} pg_id 頁面群組ID
 */
export interface PagesListParams {
  pg_id: string;
}

/** 頁面查詢結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} page_id 頁面ID
 * @param {number} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {number} seq 順序
 * @param {string} code 頁面代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面名稱
 */
export interface PagesListResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  page_id: number;
  pg_id: number;
  su: string;
  seq: number;
  code: string;
  icon: string;
  name: string;
}

/** 頁面查詢
 * @param {PagesListParams} obj 頁面查詢參數
 */
export const PagesList = async (obj: PagesListParams): Promise<ResultObj<PagesListResItem[]>> => {
  return await AuthorizeFetch("Page/PagesList", obj);
};

/** 頁面新增參數
 * @param {string} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {string} seq 順序
 * @param {string} code 頁面代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面名稱
 */
export interface AddPagesParams {
  pg_id: string;
  su: string;
  seq: string;
  code: string;
  icon: string;
  name: string;
}

/** 頁面新增
 * @param {AddPagesParams} obj 頁面新增參數
 */
export const AddPages = async (obj: AddPagesParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/AddPages", obj);
};

/** 頁面細項參數
 * @param {string} page_id 頁面ID
 */
export interface PagesEditParams {
  page_id: string;
}

/** 頁面細項結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} page_id 頁面ID
 * @param {number} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {number} seq 順序
 * @param {string} code 頁面代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面名稱
 */
export interface PagesEditResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  page_id: number;
  pg_id: number;
  su: string;
  seq: number;
  code: string;
  icon: string;
  name: string;
}

/** 頁面細項
 * @param {PagesEditParams} obj 頁面細項參數
 */
export const PagesEdit = async (obj: PagesEditParams): Promise<ResultObj<PagesEditResItem>> => {
  return await AuthorizeFetch("Page/PagesEdit", obj);
};

/** 頁面修改參數
 * @param {string} page_id 頁面ID
 * @param {string} pg_id 頁面群組ID
 * @param {string} su 系統使用
 * @param {string} seq 順序
 * @param {string} code 頁面代碼
 * @param {string} icon 圖示
 * @param {string} name 頁面名稱
 */
export interface UpdatePagesParams {
  page_id: string;
  pg_id: string;
  su: string;
  seq: string;
  code: string;
  icon: string;
  name: string;
}

/** 頁面修改 */
export const UpdatePages = async (obj: UpdatePagesParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/UpdatePages", obj);
};

/** 頁面刪除參數
 * @param {string} page_id 頁面ID
 */
export interface DeletePagesParams {
  page_id: string;
}

/** 頁面刪除
 * @param {DeletePagesParams} obj 頁面刪除參數
 */
export const DeletePages = async (obj: DeletePagesParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/DeletePages", obj);
};

/** 頁面控制項查詢參數
 * @param {string} page_id 頁面ID
 */
export interface PageControlListParams {
  page_id: string;
}

/** 頁面控制項查詢結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} pc_id 控制項ID
 * @param {number} page_id 頁面ID
 * @param {string} su 系統使用
 * @param {string} code 頁面代碼
 * @param {string} ctrl_code 控制項代碼
 * @param {string} name 控制項名稱
 */
export interface PageControlListResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  pc_id: number;
  page_id: number;
  su: string;
  code: string;
  ctrl_code: string;
  name: string;
}

/** 頁面控制項查詢
 * @param {PageControlListParams} obj 頁面控制項查詢參數
 */
export const PageControlList = async (obj: PageControlListParams): Promise<ResultObj<PageControlListResItem[]>> => {
  return await AuthorizeFetch("Page/PageControlList", obj);
};

/** 頁面控制項新增參數
 * @param {string} page_id 頁面ID
 * @param {string} su 系統使用
 * @param {string} code 頁面代碼
 * @param {string} ctrl_code 控制項代碼
 * @param {string} name 控制項名稱
 */
export interface AddPageControlParams {
  page_id: string;
  su: string;
  code: string;
  ctrl_code: string;
  name: string;
}

/** 頁面控制項新增
 * @param {AddPageControlParams} obj 頁面控制項新增參數
 */
export const AddPageControl = async (obj: AddPageControlParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/AddPageControl", obj);
};

/** 頁面控制項細項參數
 * @param {string} pc_id 控制項ID
 */
export interface PageControlEditParams {
  pc_id: string;
}

/** 頁面控制項細項結果
 * @param {string} cre_userid 創建者
 * @param {string} cre_time 創建時間
 * @param {string} upd_userid 更新者
 * @param {string} upd_time 更新時間
 * @param {number} pc_id 控制項ID
 * @param {number} page_id 頁面ID
 * @param {string} su 系統使用
 * @param {string} code 頁面代碼
 * @param {string} ctrl_code 控制項代碼
 * @param {string} name 控制項名稱
 */
export interface PageControlEditResItem {
  cre_userid: string;
  cre_time: string;
  upd_userid: string;
  upd_time: string;
  pc_id: number;
  page_id: number;
  su: string;
  code: string;
  ctrl_code: string;
  name: string;
}

/** 頁面控制項細項
 * @param {PageControlEditParams} obj 頁面控制項細項參數
 */
export const PageControlEdit = async (obj: PageControlEditParams): Promise<ResultObj<PageControlEditResItem>> => {
  return await AuthorizeFetch("Page/PageControlEdit", obj);
};

/** 頁面控制項修改參數
 * @param {string} pc_id 控制項ID
 * @param {string} page_id 頁面ID
 * @param {string} su 系統使用
 * @param {string} code 頁面代碼
 * @param {string} ctrl_code 控制項代碼
 * @param {string} name 控制項名稱
 */
export interface UpdatePageControlParams {
  pc_id: string;
  page_id: string;
  su: string;
  code: string;
  ctrl_code: string;
  name: string;
}

/** 頁面控制項修改
 * @param {UpdatePageControlParams} obj 頁面控制項修改參數
 */
export const UpdatePageControl = async (obj: UpdatePageControlParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/UpdatePageControl", obj);
};

/** 頁面控制項刪除參數
 * @param {string} pc_id 控制項ID
 */
export interface DeletePageControlParams {
  pc_id: string;
}

/** 頁面控制項
 * @param {DeletePageControlParams} obj 頁面控制項刪除參數
 */
export const DeletePageControl = async (obj: DeletePageControlParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Page/DeletePageControl", obj);
};
