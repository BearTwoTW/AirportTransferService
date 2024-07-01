import { ResultObj, AuthorizeFetch } from "../DomainTS";

/** 發票參數
 * @param {string} ec_order_id 訂單流水號
 */
export interface InvoiceParams {
  ec_order_id: string;
}

/** 開立發票 */
export const OpenInvoice = async (obj: InvoiceParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EinvInvoice/openInvoice", obj);
};

/** 查看發票PDF */
export const GetInvoiceB2CPDF = async (obj: InvoiceParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EinvInvoice/getInvoiceB2CPDF", obj);
};

/** 發票作廢參數
 * @param {string} ec_order_id 訂單流水號
 * @param {string} cancelReason 作廢原因
 */
export interface CancelInvoiceParams extends InvoiceParams {
  cancelReason: string;
}

/** 作廢發票 */
export const CancelInvoice = async (obj: CancelInvoiceParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EinvInvoice/cancelInvoice", obj);
};
