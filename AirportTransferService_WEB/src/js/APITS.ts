import { companyFileURL } from "./Domain";

import * as UserControlAPI from "./Controller/UserControlAPI";
import * as PageAPI from "./Controller/PageAPI";
import * as CurrencyAPI from "./Controller/CurrencyAPI";
import * as UserAPI from "./Controller/UserAPI";
import * as UserDutyAPI from "./Controller/UserDutyAPI";
import * as UserLevelAPI from "./Controller/UserLevelAPI";

import { CommodityAPI } from "./Controller/CommodityAPI";
import * as CommodityTS from "./Controller/CommodityTS";

import * as CompanyAPI from "./Controller/CompanyAPI";

import { PromotionAPI } from "./Controller/PromotionAPI";
import * as PromotionTS from "./Controller/PromotionTS";

import * as SystemSettingAPI from "./Controller/SystemSettingAPI";
import * as FilesAPI from "./Controller/FilesAPI";
import * as CustomerAPI from "./Controller/CustomerAPI";
import * as OrderAPI from "./Controller/OrderAPI";
import * as SystemParamAPI from "./Controller/SystemParamAPI";
import * as TaxAPI from "./Controller/TaxAPI";
import * as LogisticsAPI from "./Controller/LogisticsAPI";
import * as EC_Payment from "./Controller/PaymentAPI";
import * as WarehouseAPI from "./Controller/WarehouseAPI";
import * as PermissionFunctionAPI from "./Controller/PermissionFunctionAPI";
import * as StockAPI from "./Controller/StockAPI";
import * as ToDoListAPI from "./Controller/ToDoListAPI";
import * as PurchaseAPI from "./Controller/PurchaseAPI";
import * as ImportAPI from "./Controller/ImportAPI";
import * as ImportDataAPI from "./Controller/ImportDataAPI";
import * as DashboardAPI from "./Controller/DashboardAPI";
import * as OfficeSiteSettingAPI from "./Controller/OfficeSiteSettingAPI";
import * as EinvInvoiceAPI from "./Controller/EinvInvoiceAPI";
import * as ReportAPI from "./Controller/ReportAPI";
import * as OauthAPI from "./Controller/OauthAPI";
import { DDMenuItem } from "./Types";

// ATS API
import * as ATS_WebSetting from "./Controller/ATS_WebSetting";
import * as ATS_CityAreaSettings from "./Controller/ATS_CityAreaSettings";
import * as ATS_CarModelSettings from "./Controller/ATS_CarModelSettings";


export { UserControlAPI, PageAPI, UserAPI, UserDutyAPI, UserLevelAPI, CommodityAPI, CurrencyAPI, CommodityTS, CompanyAPI, PromotionTS, PromotionAPI, SystemSettingAPI, FilesAPI, CustomerAPI, OrderAPI, SystemParamAPI, TaxAPI, LogisticsAPI, EC_Payment, WarehouseAPI, PermissionFunctionAPI, StockAPI, ToDoListAPI, PurchaseAPI, ImportAPI, ImportDataAPI, DashboardAPI, OfficeSiteSettingAPI, EinvInvoiceAPI, ReportAPI, OauthAPI, ATS_WebSetting, ATS_CityAreaSettings, ATS_CarModelSettings };

/**選單代碼 */
export const DDMenu = (() => {
  /**系統及選單代碼
   * @param {string} spp_id
   * @returns {Promise<any[]>} The list of system and menu codes
   */
  const selectorCode = async (spp_id: string): Promise<any[]> => {
    // Call the API to fetch the codes
    const res = await SystemParamAPI.SecondList({
      spp_id: spp_id,
      visible: "",
    });
    if (res.success) {
      return res.data;
    } else {
      console.log("查無代碼檔：" + spp_id, res);
      return [];
    }
  };

  /** 系統及選單代碼 */
  const nestCode = async (menuName: string): Promise<DDMenuItem[]> => {
    // 用DDMenu資料夾內的json檔案
    try {
      let path = "";
      if (window.location.origin.indexOf("localhost") !== -1 || window.location.origin.indexOf("127.0.0.1") !== -1) {
        path = `${companyFileURL}/DDMenu/${menuName}.json?x=${Date.now()}`;
      } else {
        path = `${window.location.protocol}//${window.location.host}/_${sessionStorage.company_code}/DDMenu/${menuName}.json?x=${Date.now()}`;
      }
      return await fetch(path).then((data) => data.json());
    } catch (err) {
      console.log("查無代碼檔", err);
      return [];
    }
  };

  return {
    selectorCode,
    nestCode,
  };
})();

export const OptionList = {
  /**[通用]開放狀態*/
  VisibleArr: [
    { name: "開放", value: "Y" },
    { name: "未開放", value: "N" },
  ],

  /**[商品]是否組合商品 */
  CommodityTypeArr: [
    { name: "組合商品", value: "Y" },
    { name: "一般商品", value: "N" },
  ],

  /**[商品] 是否已分類 */
  HasLabelBigArr: [
    { name: "已分類", value: "Y" },
    { name: "尚未分類", value: "N" },
  ],

  /**[採購]批發零售 */
  SaleTypeArr: [
    { name: "批發", value: "批發" },
    { name: "零售", value: "零售" },
  ],

  /**是否顯示 */
  visArr: [
    { name: "顯示", value: "Y" },
    { name: "隱藏", value: "N" },
  ],

  /**[訂單]訂單官網狀態*/
  OfficesiteOrderStatusArr: [
    { name: "訂單處理中", value: "訂單處理中" },
    { name: "訂單確認", value: "訂單確認" },
    { name: "訂單完成", value: "訂單完成" },
    { name: "訂單取消", value: "訂單取消" },
  ],

  /**[訂單]訂單官網狀態 */
  OfficesitePayStatusArr: [
    { name: "未付款", value: "未付款" },
    { name: "已付款", value: "已付款" },
    { name: "已逾期", value: "已逾期" },
    { name: "退貨申請中", value: "退貨申請中" },
    { name: "退貨中", value: "退貨中" },
    { name: "退款中", value: "退款中" },
    { name: "已退款", value: "已退款" },
  ],

  /**[訂單]付款狀態 */
  PayStatusArr: [
    { name: "未付款", value: "未付款" },
    { name: "已付款", value: "已付款" },
    { name: "退款中", value: "退款中" },
    { name: "已退款", value: "已退款" },
  ],

  /**[訂單]揀貨狀態*/
  PickStatusArr: [
    { name: "未揀貨", value: "未揀貨" },
    { name: "揀貨中", value: "揀貨中" },
    { name: "揀貨完成", value: "揀貨完成" },
    { name: "取消揀貨", value: "取消揀貨" },
  ],

  /**[訂單]出貨/退貨狀態 */
  ShipStatusArr: [
    { name: "待出貨", value: "待出貨" },
    { name: "取消出貨", value: "取消出貨" },
    { name: "出貨中", value: "出貨中" },
    { name: "已出貨", value: "已出貨" },
    { name: "待取貨", value: "待取貨" },
    { name: "已取貨", value: "已取貨" },
    { name: "退貨中", value: "退貨中" },
    { name: "已收到退貨", value: "已收到退貨" },
    { name: "退貨驗貨完成", value: "退貨驗貨完成" },
  ],

  /**[訂單]訂單後台管理狀態 */
  OrderStatusArr: [
    { name: "未付款", value: "未付款" },
    { name: "已取消", value: "已取消" },
    { name: "訂單確認", value: "訂單確認" },
    { name: "揀貨中", value: "揀貨中" },
    { name: "待出貨", value: "待出貨" },
    { name: "出貨中", value: "出貨中" },
    { name: "已出貨", value: "已出貨" },
    { name: "已送達", value: "已送達" },
    { name: "完成訂單", value: "完成訂單" },
    { name: "退貨申請中", value: "退貨申請中" },
    { name: "退貨申請確認", value: "退貨申請確認" },
    { name: "退貨中", value: "退貨中" },
    { name: "已收到退貨", value: "已收到退貨" },
    { name: "退款中", value: "退款中" },
    { name: "退款完成", value: "退款完成" },
  ],

  /**[進貨]驗收狀態 */
  AcceptanceArr: [
    { name: "已驗收", value: "Y" },
    { name: "未驗收", value: "N" },
  ],

  /**[促銷]條件種類 */
  EventTypeArr: [
    { name: "滿件", value: "滿件" },
    { name: "滿額", value: "滿額" },
  ],

  /**[促銷]條件累計方式 */
  CountTypeArr: [
    { name: "按條件商品總計", value: "總計" },
    { name: "按條件商品主項", value: "按商品主項" },
    { name: "按條件商品細項", value: "按商品細項" },
  ],

  /**[促銷]條件種類*/
  DiscountTypeArr: [
    { name: "折百分比", value: "折比例" },
    { name: "折扣金額", value: "折數字" },
    { name: "固定金額", value: "固定金額" },
  ],

  /**[上架]是否預購
   * @description  !先加上去，還沒用到
   */
  IsPreOrderArr: [
    { name: "預購", value: "Y" },
    { name: "非預購", value: "N" },
    { name: "全部", value: "" },
  ],

  /** [帳號管理]是否綁訂職務 */
  JobBindArr: [
    { name: "尚未綁定職務", value: "N" },
    { name: "已綁定職務", value: "Y" },
  ],

  /**[帳號管理]帳號狀態 */
  DisableArr: [
    { name: "正常", value: "N" },
    { name: "停用", value: "Y" },
    { name: "全部", value: "" },
  ],

  /**[上架]上架狀態 */
  OnShelfTypeArr: [
    { name: "上架中", value: "Y" },
    { name: "已下架", value: "N" },
  ],

  /**[訂單]訂單取消原因 */
  CancelReasonArr: [
    { name: "變更購買項目", value: "變更購買項目" },
    { name: "需要更改收件資訊", value: "需要更改收件資訊" },
    { name: "其他/改變主意", value: "其他/改變主意" },
  ],

  /**[庫存紀錄]作業類型
   * @description  退貨,調整,調撥,驗收,訂單成立,訂單取消
   */
  OperationArr: [
    { name: "退貨作業", value: "退貨" },
    { name: "調整作業", value: "調整" },
    { name: "調撥作業", value: "調撥" },
    { name: "驗收作業", value: "驗收" },
    { name: "訂單成立", value: "訂單成立" },
    { name: "訂單取消", value: "訂單取消" },
  ],

  /**[庫存調整]是否結案 */
  CompleteArr: [
    { name: "已結案", value: "Y" },
    { name: "尚未結案", value: "N" },
  ],

  /**[促銷]促銷方式 */
  PromotionTypeArr: [
    { name: "一般", value: "一般" },
    { name: "折扣碼", value: "折扣碼" },
    { name: "優惠券", value: "優惠券" },
  ],

  /**[促銷]適用會員 */
  ForCustomerLevelArr: [
    { name: "全等級", value: "全等級" },
    { name: "指定等級", value: "指定等級" },
    { name: "等級範圍", value: "等級範圍" },
  ],

  /**[促銷]促銷類型 */
  PromotionClassArr: [
    { name: "折扣", value: "折扣" },
    { name: "運費", value: "運費" },
    { name: "加購", value: "加購" },
    { name: "贈品", value: "贈品" },
    { name: "自訂", value: "自訂" },
  ],

  /**[促銷]促銷類型 */
  SelectArr: [
    { name: "全部", value: "全部" },
    { name: "指定", value: "指定" },
  ],

  /**[促銷]贈品同條件 */
  GiftSelectArr: [
    { name: "贈品同條件商品", value: "贈品同條件商品" },
    { name: "指定", value: "指定" },
  ],

  SocialLinkArr: [
    { name: "LINE", value: "LINE" },
    { name: "Facebook", value: "Facebook" },
    { name: "instagram", value: "instagram" },
  ],

  /**[促銷]紅利 */
  BonusTypekArr: [
    { name: "固定", value: "fix" },
    { name: "比例", value: "percent" },
  ],

  /**[會員]紅利匯入結果 */
  BonusImportResultArr: [
    { name: "成功", value: "Y" },
    { name: "失敗", value: "N" },
  ],

  /**[訂單]發票種類 */
  ReceiptTypeArr: [
    { name: "個人發票", value: "個人發票" },
    { name: "雲端發票", value: "雲端發票" },
    { name: "公司戶發票", value: "公司戶發票" },
    // { name: "愛心碼", value: "愛心碼" },
  ],

  /**[倉庫]倉庫種類*/
  WarehouseTypeArr: [
    { name: "一般", value: "一般" },
    { name: "販售", value: "販售" },
    { name: "退貨", value: "退貨" },
    { name: "報廢", value: "報廢" },
  ],

  /** [網站設定]紅利發放時機設定 */
  BonusGetSettingArr: [
    { name: "付款之後", value: "days_after_pay_get_bonus" },
    { name: "取貨之後", value: "days_after_ship_get_bonus" },
  ],

  /** [付款]串接種類 */
  SeriesConnectionArr: [
    { name: "無串接", value: "無" },
    { name: "綠界轉帳", value: "ECATMPay" },
    { name: "綠界刷卡", value: "ECCreditPay" },
    { name: "中信刷卡", value: "CTBCCreditPay" },
    { name: "中信虛擬帳號付款", value: "CTBCATMPay" },
    { name: "富邦刷卡", value: "FubonCreditPay" },
    { name: "LINEPay", value: "LinePay" },
  ],

  /** [發票管理]狀態 */
  InvoiceStateArr: [
    { name: "已開立", value: "Y" },
    { name: "已作廢", value: "N" },
  ],
};
