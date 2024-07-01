import { AuthorizeFetch, AuthorizeFetch_forFile } from "../Domain";

/**
 * @description CommodityAPI 商品
 */
export const CommodityAPI = (() => {
    //----------------------- 商品影片 -----------------------//
    /**
     * Commodity/CommodityVideoCreate
     * @description 新增商品影片
     * @param {CommodityVideos[]} CommodityVideos   影片們
     * @returns
     */
    const CommodityVideoCreate = async function (obj = {
        CommodityVideos: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityVideoCreate', obj);
    }

    /** 
     * @description
     */

    /**
     * Commodity/CommodityVideoUpdate
     * @description 修改商品影片
     * @param {string} v_id  影片流水號
     * @param {CommodityVideos[]} CommodityVideos   影片們
     * @returns
     */
    const CommodityVideoUpdate = async function (obj = {
        v_id: null,
        CommodityVideos: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityVideoUpdate', obj);
    }


    /**
     * Commodity/CommodityVideoDelete
     * @description 刪除商品影片
     * @param {string} v_id  影片流水號
     * @returns
     */
    const CommodityVideoDelete = async function (obj = {
        v_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityVideoDelete', obj);
    }

    /**
     * Commodity/CommodityVideoSearch
     * @description 查詢商品影片
     * @param {string} commodity_id  商品流水號
     * @returns
     */
    const CommodityVideoSearch = async function (obj = {
        commodity_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityVideoSearch', obj);
    }

    //----------------------- 商品上架 -----------------------//
    /**
     * Commodity/CommodityOnShelfPeriodCreate
     * @description 新增商品上架時段
     * @param {string} commodity_id          商品主項流水號
     * @param {string} on_shelf_time_start   上架時間起
     * @param {string} on_shelf_time_end     上架時間迄
     * @param {string} suggested_price       建議售價
     * @param {number} sale_price            售價
     * @param {number} note                  備註
     * @param {ccad_ids_1[]} ccad_ids_1      自訂屬性細項們1
     * @param {ccad_ids_2[]} ccad_ids_2      自訂屬性細項們2
     * @returns
     */
    const CommodityOnShelfPeriodCreate = async function (obj = {
        commodity_id: null,
        on_shelf_time_start: null,
        on_shelf_time_end: null,
        suggested_price: null,
        sale_price: null,
        note: null,
        uc_id: null,
        ccad_ids_1: null,
        ccad_ids_2: null,
        ccad_price_settings: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodCreate', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodUpdate
   * @description 修改商品上架時段
   * @param {string} cosp_id               流水號
   * @param {string} commodity_id          商品主項流水號
   * @param {string} on_shelf_time_start   上架時間起
   * @param {string} on_shelf_time_end     上架時間迄
   * @param {string} suggested_price       建議售價
   * @param {number} sale_price            售價
   * @param {number} note                  備註
   * @param {ccad_ids_1[]} ccad_ids_1      自訂屬性細項們1
   * @param {ccad_ids_2[]} ccad_ids_2      自訂屬性細項們2
   * @returns
   */
    const CommodityOnShelfPeriodUpdate = async function (obj = {
        cosp_id: null,
        commodity_id: null,
        on_shelf_time_start: null,
        on_shelf_time_end: null,
        suggested_price: null,
        sale_price: null,
        note: null,
        uc_id: null,
        ccad_ids_1: null,
        ccad_ids_2: null,
        ccad_price_settings: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodUpdate', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodSearch
   * @description 查詢商品上架時段
   * @param {string} commodity_id     商品流水號
   * @param {number} page             頁碼
   * @param {number} num_per_page     一頁幾筆
   * @returns
   */
    const CommodityOnShelfPeriodSearch = async function (obj = {
        commodity_id: null,
        page: 0,
        num_per_page: 10,
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodSearch', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodDetail
   * @description 商品上架時段細項
   * @param {string} cosp_id     流水號
   * @returns
   */
    const CommodityOnShelfPeriodDetail = async function (obj = {
        cosp_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodDetail', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodDelete
   * @description 刪除商品上架時段
   * @param {string} cosp_id     流水號
   * @returns
   */
    const CommodityOnShelfPeriodDelete = async function (obj = {
        cosp_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodDelete', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodXLabelCreate
       * @description 新增商品上架時段對應標籤
       * @param {string} cosp_id       流水號
       * @param {string} label_big     大標籤
       * @param {string} label_mid     中標籤
       * @param {string} label_small   小標籤
       * @returns
       */
    const CommodityOnShelfPeriodXLabelCreate = async function (obj = {
        cosp_id: null,
        label_big: null,
        label_mid: null,
        label_small: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodXLabelCreate', obj);
    }

    /**
     * Commodity/CommodityOnShelfPeriodXLabelUpdate
     * @description 修改商品上架時段對應標籤
     * @param {string} cospxl_id     流水號
     * @param {string} cosp_id       商品上架時段流水號流水號
    * @param {string} label_big     大標籤
     * @param {string} label_mid     中標籤
     * @param {string} label_small   小標籤
     * @returns
     */
    const CommodityOnShelfPeriodXLabelUpdate = async function (obj = {
        cospxl_id: null,
        cosp_id: null,
        label_big: null,
        label_mid: null,
        label_small: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodXLabelUpdate', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodXLabelSearch
   * @description 查詢商品上架時段對應標籤
   * @param {string} cosp_id       商品上架時段流水號流水號
   * @param {number} page          頁碼
   * @param {number} num_per_page  一頁幾筆
   * @returns
   */
    const CommodityOnShelfPeriodXLabelSearch = async function (obj = {
        cosp_id: null,
        page: 0,
        num_per_page: 10,
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodXLabelSearch', obj);
    }

    /**
     * Commodity/CommodityOnShelfPeriodXLabelDetail
     * @description 商品上架時段對應標籤細項
     * @param {string} cospxl_id       流水號
     * @returns
     */
    const CommodityOnShelfPeriodXLabelDetail = async function (obj = {
        cospxl_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodXLabelDetail', obj);
    }

    /**
   * Commodity/CommodityOnShelfPeriodXLabelDelete
   * @description 刪除商品上架時段對應標籤
   * @param {string} cospxl_id       流水號
   * @returns
   */
    const CommodityOnShelfPeriodXLabelDelete = async function (obj = {
        cospxl_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityOnShelfPeriodXLabelDelete', obj);
    }

    //----------------------- 商品組合 -----------------------//
    /**
     * Commodity/CommodityCombinationCreate
     * @description 商品組合內容新增
     * @param {string} commodity_id   商品主項流水號
     * @param {string} ccad_id_1      自定義屬性細項流水號1
     * @param {string} ccad_id_2      自定義屬性細項流水號2
     * @param {contents[]} contents       內容商品們
    */
    const CommodityCombinationCreate = async function (obj = {
        commodity_id: null,
        ccad_id_1: null,
        ccad_id_2: null,
        contents: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCombinationCreate', obj);
    }

    /**
     * Commodity/CommodityCombinationUpdate
     * @description 商品組合內容修改(數量)
     * @param {string} ccd_id   商品主項流水號
     * @param {number} count    數量
     */
    const CommodityCombinationUpdate = async function (obj = {
        ccd_id: null,
        count: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCombinationUpdate', obj);
    }

    /**
   * Commodity/CommodityCombinationDelete
   * @description 商品組合內容刪除
   * @param {string} ccd_id   商品主項流水號
   */
    const CommodityCombinationDelete = async function (obj = {
        ccd_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCombinationDelete', obj);
    }

    /**
     * Commodity/CommodityCombinationDetailStockSearch
     * @description 商品組合內容庫存查詢
     * @param {string} commodity_id 商品主項流水號
     * @param {string} uc_id 單位流水號
     * @param {string} ccad_id_1 自定義屬性細項流水號1
     * @param {string} ccad_id_2 自定義屬性細項流水號2
     */
    const CommodityCombinationDetailStockSearch = async function (obj = {
        commodity_id: null,
        uc_id: null,
        ccad_id_1: null,
        ccad_id_2: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCombinationDetailStockSearch', obj);
    }
    //----------------------- 商品分類 -----------------------//
    /**
     * Commodity/CommodityLabelSearch
     * @description 商品分類查詢
     * @param {string} label_big    第一層流水號
     * @param {string} label_mid    第二層流水號
     * @param {string} visible      是否可見
     * @param {string} type         商品類別
     * @param {string} is_front     是否前台用
     * @param {string} is_nav       是否放在nav
     */
    const CommodityLabelSearch = async function (obj = {
        label_big: null,
        label_mid: null,
        visible: null,
        type: null,
        is_front: null,
        is_nav: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityLabelSearch', obj);
    }

    /**
     * Commodity/CommodityLabelCreate
     * @description 商品分類新建
   * @param {string} label_big    第一層流水號
     * @param {string} label_mid    第二層流水號
     * @param {string} type         商品類別
     * @param {string} is_front     是否前台用
     * @param {string} is_nav       是否放在nav
     * @param {content[]} content   名稱
     */
    const CommodityLabelCreate = async function (obj = {
        label_big: null,
        label_mid: null,
        content: null,
        type: null,
        is_front: null,
        is_nav: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityLabelCreate', obj);
    }

    /**
   * Commodity/CommodityLabelUpdate
   * @description 商品分類修改
     * @param {string} cl_id        流水號
     * @param {string} label_big    第一層流水號
     * @param {string} label_mid    第二層流水號
     * @param {string} visible      是否可見
     * @param {string} is_front     是否前台用
     * @param {string} is_nav       是否放在nav
     * @param {content[]} content   名稱
   */
    const CommodityLabelUpdate = async function (obj = {
        cl_id: null,
        label_big: null,
        label_mid: null,
        content: null,
        visible: null,
        is_front: null,
        is_nav: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityLabelUpdate', obj);
    }

    /**
     * Commodity/CommodityLabelDetail
     * @description 商品分類細項
     * @param {string} cl_id    流水號
     */
    const CommodityLabelDetail = async function (obj = {
        cl_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityLabelDetail', obj);
    }

    /**
     * Commodity/CommodityLabelDelete
     * @description 商品分類刪除
     * @param {string} cl_id    流水號
     */
    const CommodityLabelDelete = async function (obj = {
        cl_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityLabelDelete', obj);
    }


    //----------------------- 配送方式 -----------------------//

    /**
      * Commodity/CommodityForbidLogisticsUpdate
      * @description 商品禁止物流更新
      * @param {string} commodity_id       商品主項流水號
      * @param {company_id[]} logistics_id 物流流水號列表
      * @returns
      */
    const CommodityForbidLogisticsUpdate = async function (obj = {
        commodity_id: null,
        logistics_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityForbidLogisticsUpdate', obj);
    }

    /**
    * Commodity/CommodityForbidLogisticsSearch
    * @description 商品禁止物流查詢
    * @param {string} commodity_id       商品主項流水號
    * @returns
    */
    const CommodityForbidLogisticsSearch = async function (obj = {
        commodity_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityForbidLogisticsSearch', obj);
    }

    //----------------------- 商品規格 -----------------------//

    /**
     * Commodity/CommodityCustomAttriMasterSearch
     * @description 查詢商品自訂屬性主項
     * @param {string} commodity_id   商品流水號
     * @returns
     */
    const CommodityCustomAttriMasterSearch = async function (obj = {
        commodity_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriMasterSearch', obj);
    }

    /**
     * Commodity/CommodityCustomAttriMasterDetail
     * @description 查詢商品自訂屬性主項跟細項
     * @param {string} commodity_id   商品流水號
     * @returns
     */
    const CommodityCustomAttriMasterDetail = async function (obj = {
        ccam_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriMasterDetail', obj);
    }

    /**
     * 編輯商品自訂屬性主項
     * @param {string} ccam_id 規格主項流水號
     * @param {string} ccam_name 規格主項名稱
     * @returns 
     */
    const CommodityCustomAttriMasterUpdate = async function (obj = {
        ccam_id: null,
        ccam_name: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriMasterUpdate', obj);
    };

    /**
     * Commodity/CommodityCustomAttriDetailSearch
     * @description 查詢商品自訂屬性細項
     * @param {string} commodity_id   商品流水號
     * @returns
     */
    const CommodityCustomAttriDetailSearch = async function (obj = {
        ccam_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriDetailSearch', obj);
    }

    /**
     * 新增商品規格自訂屬性細項
     * @param {string} ccam_id 規格主項流水號
     * @param {string} ccad_name 規格細項名稱
     */
    const CommodityCustomAttriDetailCreate = async function (obj = {
        ccam_id: null,
        ccad_name: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriDetailCreate', obj);
    };

    /**
     * 編輯商品規格自訂屬性細項
     * @param {string} ccad_id 規格細項流水號 
     * @param {string} ccad_name 規格細項名稱 
     */
    const CommodityCustomAttriDetailUpdate = async function (obj = {
        ccad_id: null,
        ccad_name: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriDetailUpdate', obj);
    };

    /**
     * 刪除商品規格自訂屬性細項
     * @param {string} ccad_id 規格細項流水號 
     */
    const CommodityCustomAttriDetailDelete = async function (obj = {
        ccad_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriDetailDelete', obj);
    };

    /**
   * Commodity/CommodityCustomAttriList
   * @description 自訂屬性查詢(可用列表)
   * @param {string} commodity_id   商品流水號
   * @returns
   */
    const CommodityCustomAttriList = async function (obj = {
        commodity_id: null,
        commodity_code: null,
        commodity_name: null,
        type: null,
        page: null,
        num_per_page: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCustomAttriList', obj);
    }

    /**
     * 商品組合
     * @param {string} commodity_id 商品主項流水號
     * @param {string} uc_id 單位流水號
     * @param {string} ccad_id_1 商品細項流水號1
     * @param {string} ccad_id_2 商品細項流水號2
     * @param {string} count 數量
     * @param {string} warehouse_id 倉庫流水號
     */
    const CommodityAssemble = async function (obj = {
        commodity_id: null,
        uc_id: null,
        ccad_id_1: null,
        ccad_id_2: null,
        count: null,
        warehouse_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityAssemble', obj);
    };

    /**
     * 商品拆解
     * @param {string} commodity_id 商品主項流水號
     * @param {string} uc_id 單位流水號
     * @param {string} ccad_id_1 商品細項流水號1
     * @param {string} ccad_id_2 商品細項流水號2
     * @param {string} count 數量
     * @param {string} warehouse_id 倉庫流水號
     */
    const CommodityDisassemble = async function (obj = {
        commodity_id: null,
        uc_id: null,
        ccad_id_1: null,
        ccad_id_2: null,
        count: null,
        warehouse_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityDisassemble', obj);
    };

    //----------------------- 廠商綁定 -----------------------//

    /**
     * Commodity/CommodityXCompanySearch
     * @description 廠商綁定查詢
     * @param {string} commodity_id       商品主項流水號
     * @param {company_id[]} company_id   廠商流水號列表
     * @returns
     */
    const CommodityXCompanySearch = async function (obj = {
        commodity_id: null,
        company_id: null,
    }) {
        return await AuthorizeFetch('Commodity/CommodityXCompanySearch', obj);
    }

    /**
     * Commodity/CommodityXCompanyUpdate
     * @description 廠商綁定
     * @param {string} commodity_id       商品主項流水號
     * @param {company_id[]} company_id   廠商流水號列表
     * @returns
     */
    const CommodityXCompanyUpdate = async function (obj = {
        commodity_id: null,
        company_id: null,
    }) {
        return await AuthorizeFetch('Commodity/CommodityXCompanyUpdate', obj);
    }

    //----------------------- 單位轉換 -----------------------//
    /**
     * Commodity/UnitConversionSearch
     * @description 單位轉換查詢
     * @param {string} commodity_id          商品主項流水號
     * @param {string} visible               是否可見
     * @returns
     */
    const UnitConversionSearch = async function (obj = {
        commodity_id: null,
        visible: null
    }) {
        return await AuthorizeFetch('Commodity/UnitConversionSearch', obj);
    }

    /**
     * Commodity/UnitConversionCreate
     * @description 單位轉換新建
     * @param {string} commodity_id          商品主項流水號
     * @param {string} convert_unit_id       轉換單位流水號
     * @param {string} convert_count         轉換單位數量
     * @param {string} basic_unit_id         基本單位流水號
     * @param {string} basic_count           基本單位數量
     * @param {string} safe_storage          安全庫存
     * @param {string} buy_retail_price      零售買入價
     * @param {string} buy_wholesale_price   批發買入價
     * @param {string} sale_price            售價
     * @returns
     */
    const UnitConversionCreate = async function (obj = {
        commodity_id: null,
        convert_unit_id: null,
        convert_count: null,
        basic_unit_id: null,
        basic_count: null,
        safe_storage: null,
        buy_retail_price: null,
        buy_wholesale_price: null,
        sale_price: null
    }) {
        return await AuthorizeFetch('Commodity/UnitConversionCreate', obj);
    }

    /**
     * Commodity/UnitConversionUpdate
     * @description 單位轉換修改
     * @param {string} uc_id                 單位換算流水號
     * @param {string} commodity_id          商品主項流水號
     * @param {string} convert_unit_id       轉換單位流水號
     * @param {string} convert_count         轉換單位數量
     * @param {string} basic_unit_id         基本單位流水號
     * @param {string} basic_count           基本單位數量
     * @param {string} safe_storage          安全庫存
     * @param {string} visible               是否可見
     * @param {string} buy_retail_price      零售買入價
     * @param {string} buy_wholesale_price   批發買入價
     * @param {string} sale_price            售價
     * @returns
     */
    const UnitConversionUpdate = async function (obj = {
        uc_id: null,
        commodity_id: null,
        convert_unit_id: null,
        convert_count: null,
        basic_unit_id: null,
        basic_count: null,
        safe_storage: null,
        visible: null,
        buy_retail_price: null,
        buy_wholesale_price: null,
        sale_price: null
    }) {
        return await AuthorizeFetch('Commodity/UnitConversionUpdate', obj);
    }

    /**
     * Commodity/UnitConversionDetail
     * @description 單位轉換細項
     * @param {string} uc_id   單位換算流水號
     * @returns
     */
    const UnitConversionDetail = async function (obj = {
        uc_id: null
    }) {
        return await AuthorizeFetch('Commodity/UnitConversionDetail', obj);
    }

    /**
     * Commodity/UnitConversionDelete
     * @description 單位轉換刪除
     * @param {string} uc_id   單位換算流水號
     * @returns
     */
    const UnitConversionDelete = async function (obj = {
        uc_id: null
    }) {
        return await AuthorizeFetch('Commodity/UnitConversionDelete', obj);
    }

    /**
     * @description 單位轉換列表
     * @param {string} commodity_id 商品主項流水號
     * @param {string} commodity_code 商品編號
     * @param {string} commodity_name 商品名稱
     * @param {string} type 商品類別
     * @param {string} page 頁碼
     * @param {string} num_per_page 一頁幾筆
     * @returns 
     */
    const UnitConversionList = async function (obj = {}) {
        return await AuthorizeFetch('Commodity/UnitConversionList', obj);
    };
    //----------------------- 單位 -----------------------//

    /**
     * Commodity/UnitSearch
     * @description 單位查詢
     * @param {string} unit_name    單位名稱
     * @param {string} visible      是否可見
     * @param {number} page          頁碼
     * @param {number} num_per_page  一頁幾筆
     */
    const UnitSearch = async function (obj = {
        unit_name: null,
        visible: null,
        page: null,
        num_per_page: null
    }) {
        return await AuthorizeFetch('Commodity/UnitSearch', obj);
    }

    /**
     * Commodity/UnitCreate
     * @description 單位新建
     * @param {string} unit_name
     */
    const UnitCreate = async function (obj = {
        unit_name: null
    }) {
        return await AuthorizeFetch('Commodity/UnitCreate', obj);
    }

    /**
   * Commodity/UnitUpdate
   * @description 單位修改
   * @param {string} unit_id      單位流水號
   * @param {string} unit_name    單位名稱
   * @param {string} visible      是否可見
   */
    const UnitUpdate = async function (obj = {
        unit_id: null,
        unit_name: null,
        visible: null
    }) {
        return await AuthorizeFetch('Commodity/UnitUpdate', obj);
    }

    /**
   * Commodity/UnitDetail
   * @description 單位細項
   * @param {string} unit_id    單位流水號
   */
    const UnitDetail = async function (obj = {
        unit_id: null
    }) {
        return await AuthorizeFetch('Commodity/UnitDetail', obj)
    }

    //----------------------- 商品 -----------------------//

    /**
     * Commodity/CommoditySearch
     * @description 商品查詢
     * @param {string} unit_name
     */
    const CommoditySearch = async function (obj = {
        commodity_code: null,
        commodity_name: null,
        type: null,
        label_big: null,
        label_mid: null,
        label_small: null,
        visible: null,
        iscombination: null,
        page: null,
        num_per_page: null,
        excel: "N"
    }) {
        return await AuthorizeFetch('Commodity/CommoditySearch', obj);
    }

    /**
     * Commodity/CommodityList
     * @description 商品列表
     * @param {string} commodity_code 商品編號
     * @param {string} commodity_name 商品名稱
     * @param {string} type 商品類別
     * @param {string} company_id 廠商流水號
     * @param {string} ct_id 車型流水號 //??
     * @param {string} ctf_id 車型規格流水號 //??
     * @param {string} label_big 大標籤
     * @param {string} label_mid 中標籤
     * @param {string} label_small 小標籤
     * @param {string} valid_only 是否只查生效中 //??
     * @param {number} page 頁碼
     * @param {number} num_per_page 一頁幾筆
     */
    const CommodityList = async function (obj = {
        commodity_code: null,
        commodity_name: null,
        type: null,
        company_id: null,
        ct_id: null,
        ctf_id: null,
        label_big: null,
        label_mid: null,
        label_small: null,
        valid_only: null,
        page: null,
        num_per_page: null,
    }) {
        return await AuthorizeFetch('Commodity/CommodityList', obj);
    };

    /**
     * Commodity/CommodityCreate
     * @description 商品新建
     * @param {string} unit_name
     */
    const CommodityCreate = async function (obj = {
        commodity_code: null,
        commodity_name: null,
        type: null,
        label_big: null,
        label_mid: null,
        label_small: null,
        unit: null,
        note: null,
        buy_retail_price: null,
        buy_wholesale_price: null,
        sale_price: null,
        suggested_price: null,
        safe_storage: null,
        need_calc_stock: null,
        iscombination: null,
        on_shelf_time: null,
        off_shelf_time: null,
        ccam_name_1: null,
        ccad_name_1: null,
        ccam_name_2: null,
        ccad_name_2: null,
        weight: null,
        introduction: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityCreate', obj);
    }

    // /**
    //  * @description 商品匯入
    //  * @param {File} obj 
    //  * @returns 
    //  */
    // const CommodityImport = async function (obj = {}) {
    //     return await AuthorizeFetch_forFile('Commodity/CommodityImport', obj);
    // }

    /**
   * Commodity/CommodityUpdate
   * @description 商品修改
   * @param {string} unit_name
   */
    const CommodityUpdate = async function (obj = {
        commodity_id: null,
        commodity_code: null,
        commodity_name: null,
        label_big: null,
        label_mid: null,
        label_small: null,
        unit: null,
        note: null,
        visible: null,
        need_calc_stock: null,
        iscombination: null,
        weight: null,
        introduction: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityUpdate', obj);
    }

    /**
     * Commodity/CommodityDetail
     * @description 商品細項查詢
     * @param {string} unit_name
     */
    const CommodityDetail = async function (obj = {
        commodity_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityDetail', obj);
    }

    /**
     * Commodity/CommodityDelete
     * @description 商品刪除
     * @param {string} unit_name
     */
    const CommodityDelete = async function (obj = {
        commodity_id: null
    }) {
        return await AuthorizeFetch('Commodity/CommodityDelete', obj);
    }

    return {
        CommodityVideoCreate,
        CommodityVideoUpdate,
        CommodityVideoDelete,
        CommodityVideoSearch,
        CommodityOnShelfPeriodCreate,
        CommodityOnShelfPeriodUpdate,
        CommodityOnShelfPeriodSearch,
        CommodityOnShelfPeriodDetail,
        CommodityOnShelfPeriodDelete,
        CommodityOnShelfPeriodXLabelCreate,
        CommodityOnShelfPeriodXLabelUpdate,
        CommodityOnShelfPeriodXLabelSearch,
        CommodityOnShelfPeriodXLabelDetail,
        CommodityOnShelfPeriodXLabelDelete,
        CommodityCombinationCreate,
        CommodityCombinationUpdate,
        CommodityCombinationDelete,
        CommodityCombinationDetailStockSearch,
        CommodityCustomAttriMasterSearch,
        CommodityCustomAttriMasterDetail,
        CommodityCustomAttriMasterUpdate,
        CommodityCustomAttriDetailSearch,
        CommodityCustomAttriDetailCreate,
        CommodityCustomAttriDetailUpdate,
        CommodityCustomAttriDetailDelete,
        CommodityAssemble,
        CommodityDisassemble,
        CommodityCustomAttriList,
        CommodityLabelSearch,
        CommodityLabelCreate,
        CommodityLabelUpdate,
        CommodityLabelDetail,
        CommodityLabelDelete,
        CommodityForbidLogisticsUpdate,
        CommodityForbidLogisticsSearch,
        CommodityCustomAttriMasterSearch,
        UnitConversionSearch,
        UnitConversionCreate,
        UnitConversionUpdate,
        UnitConversionDetail,
        UnitConversionDelete,
        UnitConversionList,
        UnitSearch,
        UnitCreate,
        UnitUpdate,
        UnitDetail,
        CommoditySearch,
        CommodityList,
        CommodityCreate,
        // CommodityImport,
        CommodityUpdate,
        CommodityDetail,
        CommodityDelete,
        CommodityXCompanySearch,
        CommodityXCompanyUpdate
    }
})();