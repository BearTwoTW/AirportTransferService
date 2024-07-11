import { AuthorizeFetch_ImportFile } from "../DomainTS";

/** 匯入檔案參數
 * @param {File} file 所選檔案
 */
export type ImportFareFile = {
    file: File;
};

/** 車資匯入
 * @param {File} obj
 * @returns
 */
export const ImportFare = async (obj: ImportFareFile) => {
    return await AuthorizeFetch_ImportFile("ImportData/ImportFare", obj);
};

/** 匯入檔案參數
 * @param {File} file 所選檔案
 */
export type ImportPriceLinkFile = {
    file: File;
};

/** 價錢連結匯入
 * @param {File} obj
 * @returns
 */
export const ImportPriceLink = async (obj: ImportPriceLinkFile) => {
    return await AuthorizeFetch_ImportFile("ImportData/ImportPriceLink", obj);
};