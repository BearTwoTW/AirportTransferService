import { ResultObj, AuthorizeFetch, AuthorizeFetch_forFile } from "../DomainTS";

/**檔案查詢結果 */
export interface SearchFileResItem {
  belong: string;
  custom_key1: string;
  custom_key2: string;
  custom_name1: string;
  custom_name2: string;
  file_id: number;
  filename: string;
  id: string;
  path: string;
  type: string;
}

/**檔案查詢參數
 * @description 檔案查詢參數
 * @param {*} belong       檔案所屬
 * @param {*} type         檔案類型
 * @param {*} id           所屬流水號
 * @param {*} custom_key1  自訂key1
 * @param {*} custom_key2  自訂key2
 * @returns
 */
export interface SearchFileParams {
  file_id: string;
  belong: string;
  type: string;
  id: string;
  custom_key1: string;
  custom_key2: string;
}
/**檔案查詢 */
export const SearchFile = async (
  obj: SearchFileParams
): Promise<ResultObj<SearchFileResItem[]>> => {
  return await AuthorizeFetch("Files/SearchFile", obj);
};

/**檔案上傳參數 */
export interface UploadFileParams {
  HttpFileCollection: FormData;
  UploadFile: UploadFileObj;
}
export type UploadFileObj = {
  belong: string;
  type: string;
  id: string;
  custom_key1: string;
  custom_key2: string;
};

/**檔案上傳 */
export const UploadFile = async (obj: FormData) => {
  return await AuthorizeFetch_forFile<FormData>("Files/UploadFile", obj);
};

/**檔案刪除參數 */
export interface DeleteFileParams {
  file_id: string;
}
/**檔案刪除 */
export const DeleteFile = async (obj: DeleteFileParams): Promise<ResultObj> => {
  return await AuthorizeFetch("Files/DeleteFile", obj);
};

/**檔案修改參數 */
export interface UpdateFileParams {
  UpdateFile: FormData;
}
/**檔案修改 */
export const UpdateFile = async (obj: FormData): Promise<ResultObj> => {
  return await AuthorizeFetch_forFile<FormData>("Files/UpdateFile", obj);
};