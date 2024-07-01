import { ResultObj, AuthorizeFetch, AuthorizeFetch_forCustomer } from "../DomainTS";

//----------------------- 網站基本設定 -----------------------//

/**
 * @description 網站基本設定修改參數
 * @returns
 */
export interface OSS_WebsiteSettingUpdateParams {
  website_name: string;
  bussiness_hour: string;
  phone: string;
  address: string;
  email: string;
  can_website_cancel_order: string;
  order_bonus_limit_rate: string;
}

/**
 * @description  網站基本設定修改
 */
export const OSS_WebsiteSettingUpdate = async (obj: OSS_WebsiteSettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_WebsiteSettingUpdate", obj);
};

/**
 * @description 網站基本設定查詢回傳
 * @returns
 */
export interface OSS_WebsiteSettingSearchResult {
  website_name: string;
  bussiness_hour: string;
  phone: string;
  address: string;
  email: string;
}

/**
 * @description  網站基本設定查詢
 */
export const OSS_WebsiteSettingSearch = async (obj = {}): Promise<ResultObj<OSS_WebsiteSettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_WebsiteSettingSearch", obj);
};
//----------------------- 社群連結設定 -----------------------//
/**
 * @description 社群連結設定新建參數
 * @returns
 */
export interface OSS_SocialLinkSettingCreateParams {
  name: string;
  icon: string;
  url: string;
  seq: number;
}

/**
 * @description  社群連結設定新建
 */
export const OSS_SocialLinkSettingCreate = async (obj: OSS_SocialLinkSettingCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_SocialLinkSettingCreate", obj);
};

/**
 * @description 社群連結設定修改參數
 * @returns
 */
export interface OSS_SocialLinkSettingUpdateParams {
  id: string;
  name: string;
  icon: string;
  url: string;
  visible: string;
  seq: number;
}

/**
 * @description  社群連結設定修改
 */
export const OSS_SocialLinkSettingUpdate = async (obj: OSS_SocialLinkSettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_SocialLinkSettingUpdate", obj);
};

/**
 * @description 社群連結設定查詢回傳
 * @returns
 */
export interface OSS_SocialLinkSettingSearchResult {
  id: string;
  name: string;
  icon: string;
  url: string;
  visible: string;
  seq: number;
}

/**
 * @description  社群連結設定查詢
 */
export const OSS_SocialLinkSettingSearch = async (obj = {}): Promise<ResultObj<OSS_SocialLinkSettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_SocialLinkSettingSearch", obj);
};

/**
 * @description 社群連結設定刪除參數
 * @returns
 */
export interface OSS_SocialLinkSettingDeleteParams {
  id: string;
}

/**
 * @description  社群連結設定刪除
 */
export const OSS_SocialLinkSettingDelete = async (obj: OSS_SocialLinkSettingDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_SocialLinkSettingDelete", obj);
};
//----------------------- 問與答設定 -----------------------//

/**
 * @description 問與答設定新建參數
 * @returns
 */
export interface OSS_QASettingCreateParams {
  answer: string;
  question: string;
  seq: number;
}

/**
 * @description  問與答設定新建
 */
export const OSS_QASettingCreate = async (obj: OSS_QASettingCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_QASettingCreate", obj);
};

/**
 * @description 問與答設定修改參數
 * @returns
 */
export interface OSS_QASettingUpdateParams {
  id: string;
  answer: string;
  question: string;
  visible: string;
  seq: number;
}

/**
 * @description  問與答設定修改
 */
export const OSS_QASettingUpdate = async (obj: OSS_QASettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_QASettingUpdate", obj);
};

/**
 * @description 問與答設定查詢參數
 * @returns
 */
export interface OSS_QASettingSearchResult {
  id: string;
  answer: string;
  question: string;
  visible: string;
  seq: number;
}

/**
 * @description  問與答設定查詢
 */
export const OSS_QASettingSearch = async (obj = {}): Promise<ResultObj<OSS_QASettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_QASettingSearch", obj);
};

/**
 * @description 問與答設定刪除參數
 * @returns
 */
export interface OSS_QASettingDeleteParams {
  id: string;
}

/**
 * @description  問與答設定刪除
 */
export const OSS_QASettingDelete = async (obj: OSS_QASettingDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_QASettingDelete", obj);
};
//----------------------- 條款設定 -----------------------//

/**
 * @description 條款設定修改參數
 * @returns
 */
export interface OSS_TermSettingUpdateParams {
  privacy_policy: string;
  service_policy: string;
  purchase_notice: string;
}

/**
 * @description  條款設定修改
 */
export const OSS_TermSettingUpdate = async (obj: OSS_TermSettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_TermSettingUpdate", obj);
};

/**
 * @description 條款設定查詢參數
 * @returns
 */
export interface OSS_TermSettingSearchResult {
  privacy_policy: string;
  service_policy: string;
  purchase_notice: string;
}

/**
 * @description  條款設定查詢
 */
export const OSS_TermSettingSearch = async (obj = {}): Promise<ResultObj<OSS_TermSettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_TermSettingSearch", obj);
};

//----------------------- 自訂頁面設定 -----------------------//
/**
 * @description 自訂頁面設定新建參數
 * @returns
 */
export interface OSS_CustomPageSettingCreateParams {
  name: string;
  content: string;
  seq: number;
}

/**
 * @description  自訂頁面設定新建
 */
export const OSS_CustomPageSettingCreate = async (obj: OSS_CustomPageSettingCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_CustomPageSettingCreate", obj);
};

/**
 * @description 自訂頁面設定修改參數
 * @returns
 */
export interface OSS_CustomPageSettingUpdateParams {
  id: string;
  name: string;
  content: string;
  visible: string;
  seq: number;
}

/**
 * @description  自訂頁面設定修改
 */
export const OSS_CustomPageSettingUpdate = async (obj: OSS_CustomPageSettingUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_CustomPageSettingUpdate", obj);
};

/**
 * @description 自訂頁面設定查詢參數
 * @returns
 */
export interface OSS_CustomPageSettingSearchResult {
  id: number;
  name: string;
  content: string;
  visible: string;
  seq: number;
  file_id: number;
  file_path: string;
}

/**
 * @description  自訂頁面設定查詢
 */
export const OSS_CustomPageSettingSearch = async (obj = {}): Promise<ResultObj<OSS_CustomPageSettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_CustomPageSettingSearch", obj);
};

/**
 * @description 自訂頁面設定刪除參數
 * @returns
 */
export interface OSS_CustomPageSettingDeleteParams {
  id: string;
}

/**
 * @description  自訂頁面設定刪除
 */
export const OSS_CustomPageSettingDelete = async (obj: OSS_CustomPageSettingDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_CustomPageSettingDelete", obj);
};

//----------------------- 查詢所有網站設定 -----------------------//
/**
 * @description 查詢所有網站設定參數
 * @returns
 */
export interface OSS_AllSettingSearchResult {
  website_setting: {
    website_name: string;
    bussiness_hour: string;
    phone: string;
    address: string;
    email: string;
  };
  social_link_settings: [
    {
      id: number;
      name: string;
      icon: string;
      url: string;
      visible: string;
      seq: number;
    }
  ];
  qa_settings: [
    {
      id: number;
      question: string;
      answer: string;
      visible: string;
      seq: number;
    }
  ];
  term_setting: {
    privacy_policy: string;
    service_policy: string;
    purchase_notice: string;
  };
  custom_page_settings: [
    {
      id: number;
      name: string;
      content: string;
      visible: string;
      seq: number;
      file_id: number;
      file_path: string;
      file_url: string;
    }
  ];
  files: [
    {
      cre_userid: string;
      cre_time: string;
      upd_userid: string;
      upd_time: string;
      file_id: number;
      file_code: string;
      belong: string;
      id: string;
      type: string;
      path: string;
      isvalid: string;
      custom_key1: string;
      custom_key2: string;
      seq: number;
      url: string;
      filename: string;
      custom_name1: string;
      custom_name2: string;
      custom_value1: string;
      custom_value2: string;
      blob_result: {
        version: {
          major: number;
          minor: number;
          build: number;
          revision: number;
          majorRevision: number;
          minorRevision: number;
        };
        content: {
          headers: [
            {
              key: string;
              value: string[];
            }
          ];
        };
        statusCode: 100;
        reasonPhrase: string;
        headers: [
          {
            key: string;
            value: string[];
          }
        ];
        trailingHeaders: [
          {
            key: string;
            value: string[];
          }
        ];
        requestMessage: {
          version: {
            major: number;
            minor: number;
            build: number;
            revision: number;
            majorRevision: number;
            minorRevision: number;
          };
          versionPolicy: number;
          content: {
            headers: [
              {
                key: string;
                value: string[];
              }
            ];
          };
          method: {
            method: string;
          };
          requestUri: string;
          headers: [
            {
              key: string;
              value: string[];
            }
          ];
          options: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
          };
        };
        isSuccessStatusCode: true;
      };
    }
  ];
}

/**
 * @description  查詢所有網站設定
 */
export const OSS_AllSettingSearch = async (obj = {}): Promise<ResultObj<OSS_CustomPageSettingSearchResult>> => {
  return await AuthorizeFetch("OfficeSiteSetting/OSS_AllSettingSearch", obj);
};
