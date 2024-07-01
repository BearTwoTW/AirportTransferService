import { ResultObj, AuthorizeFetch, AuthorizeFetch_forCustomer, AuthorizeFetch_SimsCustomer } from "../DomainTS";

// #region 後台會員

/** 會員參數 */
export interface CustomerParams {
  customer_id: string;
}

/** 會員新建參數
 * @param {string} name              姓名
 * @param {string} password          密碼
 * @param {string} gender            性別
 * @param {string} birthday          生日
 * @param {string} telephone         電話
 * @param {string} mobile_phone      手機
 * @param {string} email             電子信箱
 * @param {string} email             電子信箱
 * @param {string} zip_code          郵遞區號(聯絡)
 * @param {string} area              區域(聯絡)
 * @param {string} address           住址(聯絡)
 * @param {string} city_census       城市(戶籍)
 * @param {string} area_census       區域(戶籍)
 * @param {string} address_census    住址(戶籍)
 * @param {string} note              備註
 * @param {string} identity_card     身分證
 * @param {string} cl_id             會員層級
 */
export interface CustomerCreateParams {
  name: string;
  password: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  zip_code: string;
  city: string;
  area: string;
  address: string;
  zip_code_census: string;
  city_census: string;
  area_census: string;
  address_census: string;
  note: string;
  identity_card: string;
  cl_id: number;
}

/** 會員新建 */
export const CustomerCreate = async (obj: CustomerCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerCreate", obj);
};

/** 會員修改
 * @param {string} customer_id       會員流水號
 * @param {string} name              姓名
 * @param {string} gender            性別
 * @param {string} birthday          生日
 * @param {string} telephone         電話
 * @param {string} mobile_phone      手機
 * @param {string} email             電子信箱
 * @param {string} city              城市(聯絡)
 * @param {string} area              區域(聯絡)
 * @param {string} address           住址(聯絡)
 * @param {string} city_census       城市(戶籍)
 * @param {string} area_census       區域(戶籍)
 * @param {string} address_census    住址(戶籍)
 * @param {string} note              備註
 * @param {string} identity_card     身分證
 */
export interface CustomerUpdateParams {
  customer_id: string;
  name: string;
  password: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  zip_code: string;
  city: string;
  area: string;
  address: string;
  city_census: string;
  area_census: string;
  address_census: string;
  note: string;
  identity_card: string;
  cl_id: number;
  shopping_voucher_note: string;
}

/** 會員修改 */
export const CustomerUpdate = async (obj: CustomerUpdateParams, is_front: boolean = false): Promise<ResultObj> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerUpdate", obj);
  } else {
    return await AuthorizeFetch("EC_Customer/CustomerUpdate", obj);
  }
};

/** 會員查詢參數
 * @param {string} name 姓名
 * @param {string} mobile_phone 手機
 * @param {string} email 電子信箱
 * @param {string} ismember 是否為會員
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 * @param {string} excel 是否匯出excel
 */
export interface CustomerSearchParams {
  name: string;
  mobile_phone: string;
  email: string;
  cl_id: number;
  cl_level_start: number;
  cl_level_end: number;
  ismember: string;
  page: number;
  num_per_page: number;
  excel?: "N" | "Y";
}

/** 會員查詢結果
 * @param {string} cre_time 建立時間
 * @param {string} customer_id 會員流水號
 * @param {string} username 會員帳號
 * @param {string} name 姓名
 * @param {string} gender 性別
 * @param {string} birthday 生日
 * @param {string} telephone 電話
 * @param {string} mobile_phone 手機
 * @param {string} email 電子信箱
 * @param {string} city 城市(聯絡)
 * @param {string} area 區域(聯絡)
 * @param {string} address 住址(聯絡)
 * @param {string} city_census 城市(戶籍)
 * @param {string} area_census 區域(戶籍)
 * @param {string} address_census 住址(戶籍)
 * @param {string} note 備註
 * @param {string} identity_card 身分證
 * @param {string} ismember 是否為會員
 * @param {string} disable 是否停用
 * @param {string} signin_time 最後登入時間
 */
export interface CustomerSearchResItem {
  cre_time: string;
  customer_id: string;
  username: string;
  name: string;
  gender: string;
  birthday: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  city_census: string;
  area_census: string;
  address_census: string;
  note: string;
  identity_card: string;
  ismember: string;
  disable: string;
  signin_time: string;
}

/** 會員查詢 */
export const CustomerSearch = async (obj: CustomerSearchParams): Promise<ResultObj<CustomerSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Customer/CustomerSearch", obj);
};

/** 會員細項 */
export const CustomerDetail = async (obj: CustomerParams, is_front: boolean = false): Promise<ResultObj<CustomerSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerDetail", obj);
  } else {
    return await AuthorizeFetch("EC_Customer/CustomerDetail", obj);
  }
};

/**[模擬消費者]會員細項 */
export const SimsCustomerDetail = async (obj: CustomerParams): Promise<ResultObj<CustomerSearchResItem[]>> => {
  return await AuthorizeFetch_SimsCustomer("EC_Customer/CustomerDetail", obj);
};
// #endregion

// #region 前台會員
/** 前台登入參數
 * @param {string} username 帳號
 * @param {string} password 密碼
 * @param {string} device_type 裝置類型
 * @param {number} device_code 裝置代碼
 */
export interface SigninParams {
  username: null;
  password: null;
  device_type: null;
  device_code: null;
}
/** 前台登入結果
 * @param {string} token token
 * @param {string} customer_name 會員名稱
 * @param {string} customer_id 會員流水號
 */
export interface SigninResItem {
  token: string;
  customer_name: string;
  customer_id: string;
}
/** 前台登入 */
export const Signin = async (obj: SigninParams): Promise<ResultObj<SigninResItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/Signin", obj);
};

/** 前台登出 */
export const Signout = async (obj: {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/Signout", obj);
};

/** 會員修改密碼參數
 * @param {string} old_password 舊密碼
 * @param {string} new_password 新密碼
 */
export interface UpdatePasswordParams {
  old_password: string;
  new_password: string;
}
/** 會員修改密碼 */
export const UpdatePassword = async (obj: UpdatePasswordParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/UpdatePassword", obj);
};

/** 會員忘記密碼參數
 * @param {string} username 帳號
 */
export interface ForgetPasswordParams {
  username: string;
}
/** 會員忘記密碼 */
export const ForgetPassword = async (obj: ForgetPasswordParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/ForgetPassword", obj);
};

/** 會員重設密碼密碼參數
 * @param {string} password 新密碼
 * @param {string} code 驗證碼
 */
export interface CustomerResetPasswordParams {
  password: string;
  code: string;
}
/** 會員重設密碼密碼 */
export const CustomerResetPassword = async (obj: CustomerResetPasswordParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerResetPassword", obj);
};

/** 會員驗證參數
 * @param {string} verify_code 驗證碼
 */
export interface CustomerVerifyParams {
  verify_code: string;
}
/** 會員驗證 */
export const CustomerVerify = async (obj: CustomerVerifyParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerVerify", obj);
};

/** 重寄驗證信參數
 * @param {string} email 電子信箱
 */
export interface CustomerResendVerifyEmailParams {
  email: string;
}
/** 重寄驗證信 */
export const CustomerResendVerifyEmail = async (obj: CustomerResendVerifyEmailParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerResendVerifyEmail", obj);
};

/** 前台商品查詢
 * @param {string} commodity_name     商品名稱
 * @param {string} type               商品類別
 * @param {string} label_big          大標籤
 * @param {number} label_mid          中標籤
 * @param {number} label_small        小標籤
 * @param {string} language_name      語系名稱
 * @param {string} iscombination      是否組合商品
 * @param {string} promotion_id       促銷流水號
 * @param {number} page               頁碼
 * @param {number} num_per_page       一頁幾筆
 */
export interface CustomerCommoditySearchParams {
  commodity_name: string;
  type: string;
  commodity_code: string;
  label_big: string;
  label_mid: string;
  label_small: string;
  iscombination: string;
  promotion_id: string;
  quick_search: string;
  page: number;
  num_per_page: number;
  sort_name: string;
  sort_order: string;
}
/** 前台商品查詢結果
 * @param {number} cosp_id 商品細項流水號
 * @param {string} commodity_id 商品流水號
 * @param {string} visible 是否顯示
 * @param {string[]} ccad_ids_1 屬性1流水號
 * @param {string[]} ccad_ids_2 屬性2流水號
 * @param {string[]} ccad_price_setting 屬性價格設定
 * @param {string} commodity_name 商品名稱
 * @param {string} iscombination 是否組合商品
 * @param {string} uc_id 單位流水號
 * @param {number} suggested_price 建議售價
 * @param {number} sale_price 售價
 * @param {string} on_shelf_time_start 上架時間起
 * @param {string} on_shelf_time_end 上架時間迄
 * @param {string[]} promotion_name 促銷名稱
 * @param {number} stock_remain 庫存
 * @param {string} path 路徑
 * @param {string} language_code 語系代碼
 * @param {string} name 語系名稱
 */
export interface CustomerCommoditySearchResItem {
  cosp_id: number;
  commodity_id: string;
  visible: string;
  ccad_ids_1: string[];
  ccad_ids_2: string[];
  ccad_price_setting: string[];
  commodity_name: string;
  iscombination: string;
  uc_id: string;
  suggested_price: number;
  sale_price: number;
  on_shelf_time_start: string;
  on_shelf_time_end: string;
  promotion_name: string[];
  stock_remain: 0;
  path: string;
  language_code: string;
  name: string;
}
/** 前台商品查詢 */
export const CustomerCommoditySearch = async (obj: CustomerCommoditySearchParams, fetchKey?: null | string): Promise<ResultObj<CustomerCommoditySearchResItem[]>> => {
  if (fetchKey === "forCustomer") {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCommoditySearch", obj);
  } else return await AuthorizeFetch("EC_Customer/CustomerCommoditySearch", obj);
};

/** 前台商品細項參數
 * @param {string} commodity_id 商品流水號
 * @param {string} cosp_id 商品細項流水號
 */
export interface CustomerCommodityDetailParams {
  commodity_id: string;
  cosp_id: string;
}
/** 前台商品細項查詢結果 */
export interface CustomerCommodityDetailResItem {
  dt: {
    cosp_id: number;
    commodity_id: string;
    ccad_ids_1: string;
    ccad_ids_2: string;
    ccad_price_setting: string;
    commodity_code: string;
    commodity_name: string;
    iscombination: string;
    uc_id: string;
    suggested_price: number;
    sale_price: number;
    on_shelf_time_start: string;
    on_shelf_time_end: string;
    promotion_name: string;
    note: string;
    shopping_notice: string;
    ccam_id_1: string;
    ccam_name_1: string;
    ccam_id_2: string;
    ccam_name_2: string;
    introduction: string;
    filepath_headshot: string;
    is_preorder: string;
    preorder_limit: number;
  };
  dt_combination: [
    {
      ccd_id: number;
      commoditycombination_id: string;
      commodity_id: string;
      commodity_code: string;
      commodity_name: string;
      uc_id: string;
      count: number;
      ccad_id_1: string;
      ccad_name_1: string;
      ccad_id_2: string;
      ccad_name_2: string;
      sale_price: number;
    }
  ];
  dt_attr_detail: [
    {
      ccam_id: string;
      ccam_name: string;
      ccad_id: string;
      ccad_name: string;
    }
  ];
  dt_stock: [
    {
      commodity_id: string;
      uc_id: string;
      ccad_id_1: string;
      ccad_id_2: string;
      stock_remain: number;
    }
  ];
  dt_video: [
    {
      v_id: number;
      commodity_id: string;
      video_content: string;
    }
  ];
  dt_logistic: [
    {
      commodity_id: string;
      logistics_id: number;
      logistics_name: string;
    }
  ];
}
/** 前台商品細項查詢 */
export const CustomerCommodityDetail = async (obj: CustomerCommodityDetailParams): Promise<ResultObj<CustomerCommodityDetailResItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCommodityDetail", obj);
};

/** 前台商品圖片查詢參數 */
export interface CustomerCommoditySearchFileParams {
  file_id: string;
  belong: string;
  type: string;
  id: string;
  cre_time_start: string;
  cre_time_end: string;
  blob: string;
  isvalid: string;
}
/** 前台商品圖片查詢結果 */
export interface CustomerCommoditySearchFileResItem {
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
          value: [string];
        }
      ];
    };
    statusCode: number;
    reasonPhrase: string;
    headers: [
      {
        key: string;
        value: [string];
      }
    ];
    trailingHeaders: [
      {
        key: string;
        value: [string];
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
            value: [string];
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
          value: [string];
        }
      ];
      options: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
      };
    };
    isSuccessStatusCode: boolean;
  };
}
/** 前台商品圖片查詢 */
export const CustomerCommoditySearchFile = async (obj: CustomerCommoditySearchFileParams): Promise<ResultObj<CustomerCommoditySearchFileResItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCommoditySearchFile", obj);
};

/** 前台商品標籤查詢參數
 * @description 前台商品標籤查詢
 * @param {string} label_big   大分類
 * @param {string} label_mid   中分類
 */
export interface CustomerCommodityLabelSearchParams {
  label_big: string;
  label_mid: string;
  content: string;
  visible: string;
  type: string;
  is_front: string;
  is_nav: string;
}
/** 前台商品標籤查詢結果 */
export interface CustomerCommodityLabelSearchResItem {
  dt_big: [
    {
      cl_id: string;
      label_big: string;
      label_mid: string;
      content: string;
      visible: string;
      type: string;
      is_front: string;
      is_nav: string;
      seq: number;
      filepath_headshot: string;
    }
  ];
  dt_mid: [
    {
      cl_id: string;
      label_big: string;
      label_mid: string;
      content: string;
      visible: string;
      type: string;
      is_front: string;
      is_nav: string;
      seq: number;
      filepath_headshot: string;
    }
  ];
  dt_small: [
    {
      cl_id: string;
      label_big: string;
      label_mid: string;
      content: string;
      visible: string;
      type: string;
      is_front: string;
      is_nav: string;
      seq: number;
      filepath_headshot: string;
    }
  ];
}
/** 前台商品標籤查詢 */
export const CustomerCommodityLabelSearch = async (obj: CustomerCommodityLabelSearchParams): Promise<ResultObj<CustomerCommodityLabelSearchResItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCommodityLabelSearch", obj);
};

/** 查詢促銷計算(沒登入購物車用)參數
 * @description 查詢促銷計算(沒登入購物車用)
 * @param {string} label_big   大分類
 * @param {string} label_mid   中分類
 */
export interface CustomerPromotionCalculateParams {
  commoditys: [
    {
      commodity_id: string;
      uc_id: string;
      ccad_id_1: string;
      ccad_id_2: string;
      count: number;
      customer_id: string;
      is_login: boolean;
      skip_search: boolean;
    }
  ];
  gifts: [
    {
      commodity_id: string;
      uc_id: string;
      ccad_id_1: string;
      ccad_id_2: string;
      count: number;
      customer_id: string;
      is_login: boolean;
      skip_search: boolean;
      promotion_id: string;
      pxg_id: number;
      gift_loop_now: number;
    }
  ];
}
/** 查詢促銷計算(沒登入購物車用) */
export const CustomerPromotionCalculate = async (obj: CustomerPromotionCalculateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerPromotionCalculate", obj);
};

/** 前台查詢促銷 */
export const CustomerPromotionSearch = async (obj: {}): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerPromotionSearch", obj);
};

/**前台特殊系統設定查詢參數
 * EC_Customer/CustomerSystemSettingSearch
 * @description 前台特殊系統設定查詢
 * @param {object} ssm_name
 */
export interface CustomerSystemSettingSearchParams {
  ssm_name: string;
}
/** 前台特殊系統設定查詢 */
export const CustomerSystemSettingSearch = async (obj: CustomerSystemSettingSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerSystemSettingSearch", obj);
};

/**前台查詢物流方式參數
 * EC_Customer/CustomerLogisticsSearch
 * @description 前台查詢物流方式
 * @param {object} ssm_name
 */
export interface CustomerLogisticsSearchParams {
  id: string;
  lm_id: string;
  lm_name: string;
  freight: string;
  visible: string;
  note: string;
  ship_type: string;
  ship_type_name: string;
  position_id: string;
  position_name: string;
  position_store_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
}
/** 前台查詢物流方式 */
export const CustomerLogisticsSearch = async (obj: CustomerLogisticsSearchParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerLogisticsSearch", obj);
};

/** 前台查詢付款方式結果
 * @param {string} id 付款方式ID
 * @param {string} payment_name 付款方式名稱
 * @param {string} payment_code 付款方式代碼
 * @param {string} note 備註
 * @param {string} transfer_account 轉帳帳號
 * @param {string} transfer_account_name 轉帳帳號名稱
 * @param {string} transfer_bank_code 轉帳銀行代碼
 * @param {string} transfer_bank 轉帳銀行
 * @param {string} series_connection_type 串接類型
 * @param {string} visible 是否顯示
 */
export interface CUstomerEC_PaymentSearchResItem {
  id: string;
  payment_name: string;
  payment_code: string;
  note: string;
  transfer_account: string;
  transfer_account_name: string;
  transfer_bank_code: string;
  transfer_bank: string;
  series_connection_type: string;
  visible: string;
}

/** 前台查詢付款方式 */
export const CustomerEC_PaymentSearch = async (obj = {}): Promise<ResultObj<CUstomerEC_PaymentSearchResItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerEC_PaymentSearch", obj);
};

/**前台查詢可用優惠券參數
 * @param {string} cre_time 建立時間
 * @param {string} pul_id ??
 * @param {string} promotion_id 促銷流水號
 * @param {string} promotion_name 促銷名稱
 * @param {number} expired_date 到期日
 */
export interface CustomerPromotionUseLogSearchItem {
  cre_time: string;
  pul_id: number;
  promotion_id: string;
  promotion_name: string;
  note: string;
  expired_date: string;
  selectable: true;
  ec_order_id: string;
  ec_order_code: string;
  use_time: string;
  isvalid: string;
}
/** 前台查詢可用優惠券 */
export const CustomerPromotionUseLogSearch = async (obj = {}): Promise<ResultObj<CustomerPromotionUseLogSearchItem[]>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerPromotionUseLogSearch", obj);
};

/**會員取消訂單參數 */
export interface CustomerOrderCancelParams {
  ec_order_id: string;
  note: string;
}
/** 會員取消訂單 */
export const CustomerOrderCancel = async (obj: CustomerOrderCancelParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerOrderCancel", obj);
};

// #endregion

// #region 會員收件
/**會員收件資訊新建參數 */
export interface CustomerReceiveInfoCreateParams {
  customer_id: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_zip_code: string;
  receiver_city: string;
  receiver_area: string;
  receiver_address: string;
  convenience_store_id: string;
  convenience_store_name: string;
}
/** 會員收件資訊新建 */
export const CustomerReceiveInfoCreate = async (obj: CustomerReceiveInfoCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerReceiveInfoCreate", obj);
};

/**會員收件資訊修改參數 */
export interface CustomerReceiveInfoUpdateParams {
  ec_cri_id: string;
  customer_id: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_zip_code: string;
  receiver_city: string;
  receiver_area: string;
  receiver_address: string;
  convenience_store_id: string;
  convenience_store_name: string;
}
/** 會員收件資訊修改 */
export const CustomerReceiveInfoUpdate = async (obj: CustomerReceiveInfoUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerReceiveInfoUpdate", obj);
};

/**會員收件資訊查詢參數 */
export interface CustomerReceiveInfoSearchParams {
  customer_id: string;
}
export interface CustomerReceiveInfoSearchItem {
  ec_cri_id: number;
  customer_id: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_zip_code: string;
  receiver_city: string;
  receiver_area: string;
  receiver_address: string;
  convenience_store_id: string;
  convenience_store_name: string;
}
/** 會員收件資訊查詢 */
export const CustomerReceiveInfoSearch = async (obj: CustomerReceiveInfoSearchParams): Promise<ResultObj<CustomerReceiveInfoSearchItem>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerReceiveInfoSearch", obj);
};

/**會員收件資訊刪除參數 */
export interface CustomerReceiveInfoDeleteParams {
  ec_cri_id: string;
}
/** 會員收件資訊刪除 */
export const CustomerReceiveInfoDelete = async (obj: CustomerReceiveInfoDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerReceiveInfoDelete", obj);
};
// #endregion

// #region 會員收藏
/**會員收藏新建參數*/
export interface CustomerCollectionCreateParams {
  customer_id: string;
  commodity_id: string;
}
/** 會員收藏新建 */
export const CustomerCollectionCreate = async (obj: CustomerCollectionCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCollectionCreate", obj);
};

/**會員收藏查詢參數*/
export interface CustomerCollectionSearchParams {
  customer_id: string;
  page: number;
  num_per_page: number;
}
/**會員收藏查詢結果*/
export interface CustomerCollectionSearchResItem {
  customer_id: string;
  page: number;
  num_per_page: number;
}
/** 會員收藏查詢 */
export const CustomerCollectionSearch = async (obj: CustomerCollectionSearchParams): Promise<ResultObj<CustomerCollectionSearchResItem>> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCollectionSearch", obj);
};

/**會員收藏查詢細項參數*/
export interface CustomerCollectionDetailParams {
  eccc_id: string;
}
/** 會員收藏查詢細項 */
export const CustomerCollectionDetail = async (obj: CustomerCollectionDetailParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCollectionDetail", obj);
};

/**會員收藏刪除參數 */
export interface CustomerCollectionDeleteParams {
  eccc_id: string;
}
/** 會員收藏刪除 */
export const CustomerCollectionDelete = async (obj: CustomerCollectionDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch_forCustomer("EC_Customer/CustomerCollectionDelete", obj);
};
// #endregion

// #region 會員層級

/** 會員層級修改參數
 * @param {string} cl_name 會員層級名稱
 * @param {number} cl_level 會員層級
 * @param {string} note 備註
 * @param {string} is_default 預設會員
 */
export interface CustomerLevelCreateParams {
  cl_name: string;
  cl_level: number;
  note: string;
  is_default: string;
}

/** 會員層級修改 */
export const CustomerLevelCreate = async (obj: CustomerLevelCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerLevelCreate", obj);
};

/** 會員層級修改參數
 * @param {number} cl_id 會員層級流水號
 * @param {string} cl_name 會員層級名稱
 * @param {number} cl_level 會員層級
 * @param {string} visible 是否顯示
 * @param {string} is_default 預設會員
 */
export interface CustomerLevelUpdateParams {
  cl_id: number;
  cl_name: string;
  cl_level: number;
  visible: string;
  is_default: string;
}

/** 會員層級修改 */
export const CustomerLevelUpdate = async (obj: CustomerLevelUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerLevelUpdate", obj);
};

/** 會員層級查詢參數
 * @param {number} cl_id 會員層級流水號
 * @param {string} cl_name 會員層級名稱
 * @param {number} cl_level_start 會員層級起
 * @param {number} cl_level_end 會員層級迄
 * @param {string} note 備註
 * @param {string} visible 是否顯示
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export interface CustomerLevelSearchParams {
  cl_id?: number;
  cl_name?: string;
  cl_level_start?: number;
  cl_level_end?: number;
  note?: string;
  visible?: string;
  page?: number;
  num_per_page?: number;
  is_default?: string;
}

/** 會員層級查詢結果
 * @param {number} cl_id 會員層級流水號
 * @param {string} cl_name 會員層級名稱
 * @param {number} cl_level 會員層級
 * @param {string} note 備註
 * @param {string} visible 是否顯示
 */
export interface CustomerLevelSearchResItem {
  cl_id: number;
  cl_name: string;
  cl_level: number;
  note: string;
  visible: string;
  is_default: string;
}

/** 會員層級查詢 */
export const CustomerLevelSearch = async (obj: CustomerLevelSearchParams): Promise<ResultObj<CustomerLevelSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Customer/CustomerLevelSearch", obj);
};

/** 會員層級刪除參數
 * @param {string} cl_id 會員層級流水號
 */
export interface CustomerLevelDeleteParams {
  cl_id: string;
}

/** 會員層級刪除 */
export const CustomerLevelDelete = async (obj: CustomerLevelDeleteParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerLevelDelete", obj);
};

// #endregion

// #region 紅利

/** 查詢會員紅利參數
 * @param {string} customer_id 會員流水號
 * @param {string} expired_date_start 到期日起
 * @param {string} expired_date_end 到期日迄
 */
export interface CustomerBonusStockSearchParams {
  customer_id: string;
  expired_date_start: string;
  expired_date_end: string;
  page: number;
  num_per_page: number;
}

/** 查詢會員紅利結果
 * @param {string} ec_cbs_id 會員紅利庫存流水號
 * @param {string} customer_id 會員流水號
 * @param {string} customer_name 會員名稱
 * @param {string} expired_date 到期日
 * @param {number} bonus 紅利
 */
export interface CustomerBonusStockSearchResItem {
  ec_cbs_id: string;
  customer_id: string;
  customer_name: string;
  expired_date: string;
  bonus: number;
}

/** 查詢會員紅利 */
export const CustomerBonusStockSearch = async (obj: CustomerBonusStockSearchParams, is_front = false): Promise<ResultObj<CustomerBonusStockSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerBonusStockSearch", obj);
  } else {
    return await AuthorizeFetch("EC_Customer/CustomerBonusStockSearch", obj);
  }
};

/** [模擬消費者]查詢會員紅利 */
export const SimsCustomerBonusStockSearch = async (obj: CustomerBonusStockSearchParams): Promise<ResultObj<CustomerBonusStockSearchResItem[]>> => {
  return await AuthorizeFetch_SimsCustomer("EC_Customer/CustomerBonusStockSearch", obj);
};

/** 新增會員紅利參數
 * @param {string} customer_id 會員流水號
 * @param {string} expired_date 到期日
 * @param {string} bonus 紅利
 */
export interface CustomerBonusStockCreateParams {
  customer_id: string;
  expired_date: string;
  bonus: number;
}

/** 新增會員紅利 */
export const CustomerBonusStockCreate = async (obj: CustomerBonusStockCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerBonusStockCreate", obj);
};

/** 修改會員紅利參數
 * @param {string} ec_cbs_id 會員紅利庫存流水號
 * @param {string} expired_date 到期日
 * @param {string} bonus 紅利
 */
export interface CustomerBonusStockUpdateParams {
  ec_cbs_id: string;
  expired_date: string;
  bonus: number;
}

/** 修改會員紅利 */
export const CustomerBonusStockUpdate = async (obj: CustomerBonusStockUpdateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("EC_Customer/CustomerBonusStockUpdate", obj);
};

/**查詢會員紅利紀錄參數
 * @param {string} customer_id 會員流水號
 * @param {string} ec_cbs_id 會員紅利庫存流水號
 */
export interface CustomerBonusLogSearchParams {
  customer_id: string;
  ec_cbs_id: string;
  bonus: number;
}

/** 查詢會員紅利紀錄結果
 * @param {number} id 流水號
 * @param {string} cre_time 建立時間
 * @param {string} ec_cbs_id 會員紅利庫存流水號
 * @param {string} customer_id 會員流水號
 * @param {string} customer_name 會員名稱
 * @param {string} source_type 來源類型
 * @param {string} source_id 來源流水號
 * @param {string} expired_date 到期日
 * @param {number} bonus 紅利
 */
export interface CustomerBonusStockSearchResItem {
  id: number;
  cre_time: string;
  ec_cbs_id: string;
  customer_id: string;
  customer_name: string;
  source_type: string;
  source_id: string;
  expired_date: string;
  bonus: number;
}

/** 查詢會員紅利紀錄 */
export const CustomerBonusLogSearch = async (obj: CustomerBonusLogSearchParams, is_front = false): Promise<ResultObj<CustomerBonusStockSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerBonusLogSearch", obj);
  } else {
    return await AuthorizeFetch("EC_Customer/CustomerBonusLogSearch", obj);
  }
};

/** 查詢會員紅利匯入紀錄參數
 * @param {string} cre_date_start 建立時間起
 * @param {string} cre_date_end 建立時間迄
 * @param {string} cre_userid 建立者
 * @param {string} customer_id 會員流水號
 * @param {string} outer_id 外部流水號
 * @param {string} is_import_success 是否匯入成功
 * @param {number} page 頁碼
 * @param {number} num_per_page 一頁幾筆
 */
export type CustomerBonusImportDetailSearchParams = {
  cre_date_start: string;
  cre_date_end: string;
  cre_userid: string;
  customer_id: string;
  outer_id: string;
  is_import_success: string;
  page: number;
  num_per_page: number;
};

/** 查詢會員紅利匯入紀錄結果
 * @param {number} ec_cbid_id 流水號
 * @param {string} cre_time 建立時間
 * @param {string} cre_userid 建立者
 * @param {string} cre_username 建立者帳號
 * @param {string} cre_user_name 建立者名稱
 * @param {string} customer_id 會員流水號
 * @param {string} customer_name 會員名稱
 * @param {number} bonus 紅利
 * @param {string} expired_date 到期日
 * @param {string} outer_id 外部流水號
 * @param {string} note 備註
 * @param {string} is_import_success 是否匯入成功
 * @param {string} import_failed_reason 匯入失敗原因
 */
export type CustomerBonusImportDetailSearchResItem = {
  ec_cbid_id: number;
  cre_time: string;
  cre_userid: string;
  cre_username: string;
  cre_user_name: string;
  customer_id: string;
  customer_name: string;
  bonus: number;
  expired_date: string;
  outer_id: string;
  note: string;
  is_import_success: string;
  import_failed_reason: string;
};

/** 查詢會員紅利匯入紀錄 */
export const CustomerBonusImportDetailSearch = async (obj: CustomerBonusImportDetailSearchParams): Promise<ResultObj<CustomerBonusImportDetailSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Customer/CustomerBonusImportDetailSearch", obj);
};
// #endregion

// #region 購物金
/**查詢會員購物金紀錄參數
 * @param {string} customer_id 會員流水號
 */
export interface CustomerShoppingVoucherLogSearchhParams {
  customer_id: string;
  page: number;
  num_per_page: number;
}

/** 查詢會員紅利紀錄結果
 * @param {number} id               流水號
 * @param {string} cre_time         建立時間
 * @param {string} cre_user_name    建立使用者姓名
 * @param {string} customer_id      會員流水號
 * @param {string} customer_name    會員姓名
 * @param {string} source_type      來源
 * @param {string} source_id        來源流水號
 * @param {number} source_code      來源編號
 * @param {number} shopping_voucher 購物金
 */
export interface CustomerShoppingVoucherLogSearchResItem {
  id: number;
  cre_time: string;
  cre_user_name: string;
  customer_id: string;
  customer_name: string;
  source_type: string;
  source_id: string;
  source_code: string;
  shopping_voucher: number;
}

/** 查詢會員購物金紀錄 */
export const CustomerShoppingVoucherLogSearch = async (obj: CustomerShoppingVoucherLogSearchhParams, is_front = false): Promise<ResultObj<CustomerShoppingVoucherLogSearchResItem[]>> => {
  if (is_front) {
    return await AuthorizeFetch_forCustomer("EC_Customer/CustomerShoppingVoucherLogSearch", obj);
  } else {
    return await AuthorizeFetch("EC_Customer/CustomerShoppingVoucherLogSearch", obj);
  }
};
// #endregion

// #region 前台物流

/** 前台查詢物流主項結果 */
export interface CustomerLogisticsMasterSearchResItem {
  lm_id: string;
  lm_name: string;
  note: string;
  visible: string;
  series_connection_type: string;
}

/** 前台查詢物流主項 */
export const CustomerLogisticsMasterSearch = async (obj: {}): Promise<ResultObj<CustomerLogisticsMasterSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Customer/CustomerLogisticsMasterSearch", obj);
};

/** 前台查詢物流細項結果 */
export interface CustomerLogisticsDetailSearchResItem {
  id: number;
  lm_id: string;
  lm_name: string;
  freight: number;
  visible: string;
  note: string;
  ship_type: string;
  ship_type_name: string;
  position_id: string;
  position_name: string;
  position_city: string;
  position_area: string;
  position_address: string;
  position_bussiness_hour: string;
}
/** 前台查詢物流細項 */
export const CustomerLogisticsDetailSearch = async (obj: {}): Promise<ResultObj<CustomerLogisticsDetailSearchResItem[]>> => {
  return await AuthorizeFetch("EC_Customer/CustomerLogisticsDetailSearch", obj);
};

// #endregion
