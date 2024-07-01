import { ResultObj, AuthorizeFetch } from "../DomainTS";

export const SystemSettingSearch = async (obj: {}): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemSettings/SystemSettingSearch", obj);
};

/**統規則設定編輯參數 */
export interface SystemSettingUpdateParams {
  ssm_id: string;
  value_json: string;
}

/**系統規則設定編輯*/
export const SystemSettingUpdate = async (obj: SystemSettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("SystemSettings/SystemSettingUpdate", obj);
};
