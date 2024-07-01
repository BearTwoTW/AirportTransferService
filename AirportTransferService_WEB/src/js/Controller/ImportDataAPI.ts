import { AuthorizeFetch_ImportFile } from "../DomainTS";

/** 匯入檔案參數
 * @param {File} file 所選檔案
 */
export type ImportDataFile = {
  file: File;
};

/** 商品匯入
 * @param {File} obj
 * @returns
 */
export const ImportCommodity = async (obj: ImportDataFile) => {
  return await AuthorizeFetch_ImportFile("ImportData/ImportCommodity", obj);
};

/** 會員紅利匯入
 * @param {File} obj
 * @returns
 */
export const ImportEC_CustomerBonus = async (obj: ImportDataFile) => {
  return await AuthorizeFetch_ImportFile("ImportData/ImportEC_CustomerBonus", obj);
};
