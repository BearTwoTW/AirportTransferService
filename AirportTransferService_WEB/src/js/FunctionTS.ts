/**
 * @author Sabrina
 * @date 20240119
 * @description 以tryCatchError func 進度為準，轉好TypeScript 有沒有bug不知道，沒有全測，所以用之前看一下型態意義以及測試
 */
import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ResultObj, CheckLogIn, permisionURL } from "./DomainTS";
import { nowPageStateParam, nowPageStateResult } from "./Types";
import { IndexedDBClass } from "./indexedDB";
import ReactDOMServer from "react-dom/server";
const homepage = sessionStorage.home_page;

/** 日期時間格式化 */
export const DateTimeFormat = (() => {
  enum DateTimeMode {
    yyyyMMddHHmmss = "yyyyMMddHHmmss",
    yyyyMMddHHmm = "yyyyMMddHHmm",
    yyyyMMdd = "yyyyMMdd",
    yyyyMM = "yyyyMM",
    MMddHHmm = "MMddHHmm",
    MMdd = "MMdd",
    HHmmss = "HHmmss",
    HHmm = "HHmm",
  }

  /** 日期時間格式轉換
   * @description 日期時間格式轉換，沒給date就會給當前日期時間
   * @param {string} date 日期時間
   * @param {DateTimeMode} Mode 日期時間格式
   * @param {string} joinDate 日期分隔符號
   * @param {string} joinTime 時間分隔符號
   * @param {string} space 日期時間分隔符號
   */
  const DateTimeToString = ({ date = null, Mode = DateTimeMode.yyyyMMdd, joinDate = "/", joinTime = ":", space = " " }: { date?: string | null; Mode?: DateTimeMode; joinDate?: string; joinTime?: string; space?: string }) => {
    let dt = new Date();

    if (date) dt = new Date(date);

    let year = dt.getFullYear().toString();
    let month = ("0" + (dt.getMonth() + 1)).slice(-2);
    let day = ("0" + dt.getDate()).slice(-2);
    let hour = ("0" + dt.getHours()).slice(-2);
    let minute = ("0" + dt.getMinutes()).slice(-2);
    let second = ("0" + dt.getSeconds()).slice(-2);

    let editTime = "";

    switch (Mode) {
      case DateTimeMode.yyyyMMddHHmmss:
        editTime = `${year}${joinDate}${month}${joinDate}${day}${space}${hour}${joinTime}${minute}${joinTime}${second}`;
        break;
      case DateTimeMode.yyyyMMddHHmm:
        editTime = `${year}${joinDate}${month}${joinDate}${day}${space}${hour}${joinTime}${minute}`;
        break;
      case DateTimeMode.yyyyMMdd:
        editTime = `${year}${joinDate}${month}${joinDate}${day}`;
        break;
      case DateTimeMode.yyyyMM:
        editTime = `${year}${joinDate}${month}`;
        break;
      case DateTimeMode.MMddHHmm:
        editTime = `${month}${joinDate}${day}${space}${hour}${joinTime}${minute}`;
        break;
      case DateTimeMode.MMdd:
        editTime = `${month}${joinDate}${day}`;
        break;
      case DateTimeMode.HHmmss:
        editTime = `${hour}${joinTime}${minute}${joinTime}${second}`;
        break;
      case DateTimeMode.HHmm:
        editTime = `${hour}${joinTime}${minute}`;
        break;
      default:
        editTime = `${year}${joinDate}${month}${joinDate}${day}`;
        break;
    }

    return editTime;
  };

  /** 本月第一天 */
  const getMonthStart = (date: Date | null = null): Date => {
    const d = date === null ? new Date() : date;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  };

  /** 本月最後一天 */
  const getMonthEnd = (date: Date | null = null): Date => {
    const d = date === null ? new Date() : date;
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  };

  /** 計算目標日期與今日日期相差天數
   * @param {string} targetDateString 目標日期
   */
  const getDiffDay = (targetDateString: string): number => {
    const targetDate = new Date(targetDateString);
    targetDate.setHours(0, 0, 0, 0); // 時分秒毫秒歸零

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // 時分秒毫秒歸零

    // 計算相差天數
    const timeDiff = todayDate.getTime() - targetDate.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    return dayDiff;
  };

  /**回推日子 */
  const calculateDayBefore = (data: Date | null, ago: number) => {
    const currentDate = data ? new Date(data) : new Date();
    currentDate.setDate(currentDate.getDate() - ago);
    return currentDate.toISOString().split(".")[0];
  };

  /**回推月份 */
  const calculateMonthBefore = (data: Date | null, ago: number, dayOne: boolean = false) => {
    const currentDate = data ? new Date(data) : new Date();
    if (dayOne) currentDate.setDate(1);
    const month = typeof data === "number" ? data : currentDate.getMonth();
    currentDate.setMonth(month - ago);
    return currentDate.toISOString().split(".")[0];
  };

  /**月份取當月最後一天 */
  const getLastDayOfMonth = (value: Date) => {
    let d = new Date(new Date(value).getFullYear(), new Date(value).getMonth() + 1, 0);
    d.setDate(d.getDate());
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}T00:00:00`;
  };

  return {
    DateTimeMode,
    getMonthStart,
    getMonthEnd,
    getDiffDay,
    DateTimeToString,
    calculateMonthBefore,
    calculateDayBefore,
    getLastDayOfMonth,
  };
})();

/** 取得權限
 * @description 本地也可以抓到測試機所存的權限
 * @param {string} account 檔案名稱
 */
export const GetPermission = async (account: string): Promise<any> => {
  let path = "";
  if (window.location.origin.indexOf("localhost") !== -1 || window.location.origin.indexOf("127.0.0.1") !== -1) {
    path = `${permisionURL}/Users/${account}/permission.json?x=${Date.now()}`;
  } else {
    path = `${window.location.protocol}//${window.location.host}/_${sessionStorage.company_code}/Users/${account}/permission.json?x=${Date.now()}`;
  }
  return await fetch(path).then((data) => data.json());
};

/** 檢查頁面群組及頁面的權限 X 檢查按鈕的權限 [合體]
 * @param {string} pageName 頁面名稱
 * @param {array} btnArr 按鈕名稱們
 * @param {string} path 頁面路徑 => 為了可以取得其他頁面的權限
 * @param {boolean} getPermission 是否要取得權限???
 */
export const useCheckLogInXPermission = (
  pageName: string | null = null,
  btnArr: string[] = [],
  path: string | null = null,
  getPermission: boolean = false
):
  | {
    data: any[];
    Btn: { [key: string]: boolean };
  }
  | { [key: string]: boolean } => {
  const pagePath = path ? `${path}/${pageName}` : window.location.pathname;
  let PermissionRes: any[] = [];
  const navigate = useNavigate();
  const [resPermissionBtn, setResPermissionBtn] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    CheckLogIn().then((res) => {
      if (res.success) {
        GetPermission(res.data.path).then(async (r) => {
          PermissionRes = r;
          let obj: { [key: string]: boolean } = {};
          let nowState = await nowPageState({
            sidebar: r.find((ele: { name: string }) => ele.name === homepage).children.find((ele: { name: string }) => ele.name === "sidebar"),
            groupCode: pagePath.split("/")[2],
            pageCode: pagePath.split("/")[pagePath.split("/").length - 1],
          });
          for (let i in btnArr) {
            let btnBool = await btnState(btnArr[i], nowState, pageName !== null ? pageName : undefined);
            obj = { ...obj, [btnArr[i]]: btnBool };
          }
          setResPermissionBtn(obj);
        });
      } else navigate("/System/Login");
    });
  }, []);

  return getPermission ? { data: PermissionRes, Btn: resPermissionBtn } : resPermissionBtn;
};

/** 檢查頁面群組及頁面的權限 */
export const nowPageState = async (obj: nowPageStateParam): Promise<nowPageStateResult> => {
  let groupArr = obj.sidebar === null ? [] : obj.sidebar.children.filter((i) => i.code === obj.groupCode);
  let groupY = groupArr.length > 0 ? true : false;
  let pageArr = groupY ? groupArr[0].children.filter((i) => i.code === obj.pageCode) : [];
  let pageY = pageArr.length > 0 ? (pageArr[0].code === obj.pageCode ? true : false) : false;
  return {
    groupArr: groupArr,
    groupY: groupY,
    pageArr: pageArr,
    pageY: pageY,
  };
};

/** 檢查按鈕的權限 */
export const btnState = async (btnId: string, Arr: nowPageStateResult, pageName: string = ""): Promise<boolean> => {
  if (Arr.pageArr.length > 0) {
    return Arr.pageArr[0].children.some((i) => i.ctrl_code === btnId);
  } else {
    let pageArr = Arr.groupArr[0].children;
    if (pageName) pageArr = pageArr.filter((j) => j.code === pageName);
    return pageArr[0].children.some((i) => i.ctrl_code === btnId);
  }
};

/**
 * @author Daniel Wang
 * 2023-01-05
 * @description 回應一個indexedDBClass 的物件，不要直接去 new IndexedDBClass，用這個function
 * factory 算是結合輔助工具 配合當前系統功能的地方
 * @returns indexedDBClass
 * indexedDBClass 的class有哪些功能可以參考 IndexedDBClass.js
 *
 */
export const get_ECC_indexedDB_factory = async () => {
  try {
    let idb = new IndexedDBClass("ATS");
    let r: ResultObj = await idb
      .openIndexedDB()
      .then((res) => res)
      .catch((error) => {
        console.log("%cIDB開啟時發生錯誤", "font-size: 1.5rem; background:red;");
        console.error(error.message);
        return error;
      });
    if (r.success) return idb;
    else return r.data;
  } catch (e) {
    console.warn("ECCNET warning: ", e);
    return null;
  }
};

/** 用於檢查值是否為 null 或空字串 */
export const isNullOrEmpty = (value: string | number): boolean => value === null || value === "";

/** URL 轉 base64，會有corss 的問題要注意! */
export const base64FromURL = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL();
      resolve(dataURL);
    };
    img.onerror = (error) => {
      console.error(url + " 圖片載入失敗，請點擊預覽圖片");
      reject(error);
    };
    img.src = url;
  });

/** 用base64 取得寬高比例
 * @param {*} base64
 * @returns
 */
export const widthHeightRatio = (base64: string) =>
  new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i.width / i.height);
    i.src = base64;
  });

/** deviceCode */
export const deviceCode = (): string => {
  let d = new Date();
  return d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2);
};

/** 排出重複資料 */
export const ArrayNotRepeat = <T extends Record<string, any>>(data: T[], key?: string): T[] => {
  if (key) {
    const uniqueObjects: Record<string, T> = {};
    for (let item of data) {
      if (!uniqueObjects[item[key]]) uniqueObjects[item[key]] = item;
    }
    return Object.values(uniqueObjects);
  } else {
    const uniqueKeys: Record<string, boolean> = {};
    const result: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      let key = Object.keys(obj)[0];
      if (!uniqueKeys[key]) {
        result.push(obj);
        uniqueKeys[key] = true;
      }
    }
    return result;
  }
};

/** 檢查是否過期
 * @param date 日期字符串，格式如 "2023-10-25T23:00:00"
 * @returns 如果當前日期晚於指定日期，則返回 true，否則返回 false
 */
export const CheckExpiredTime = (date: string): boolean => {
  const currentDate = new Date();
  const expirationDate = new Date(date);
  return currentDate > expirationDate;
};

/** 另開視窗html列印
 * @param {*} HtmlContent html Components
 */
export const OpenWindowWithContent = (HtmlContent: ReactElement): void => {
  let newWindow = window.open("", "_blank");
  if (newWindow) {
    let htmlContent = ReactDOMServer.renderToString(HtmlContent);
    newWindow.document.write(htmlContent);
    newWindow.document.close();

    newWindow.onload = function () {
      if (newWindow) newWindow.print();
      // Uncomment the following lines if you want the window to close after printing
      // newWindow.onafterprint = function () {
      //   newWindow.close();
      // };
    };
  }
};

/** 訂單狀態判斷
 * @returns 四個狀態 Chip color
 */
export const OrderStatus = (statusName: string): string => {
  let str = "default";
  if (statusName) {
    if (statusName.includes("已")) return str;
    else if (statusName.includes("中")) return (str = "warning");
    else if (statusName.includes("完成")) return str;
    else if (statusName.includes("待")) return (str = "info");
    else if (statusName.includes("取消")) return str;
    else if (statusName.includes("未")) return (str = "error");
    else return str;
  } else return str;
};
interface LabelData {
  is_front: string;
  is_nav: string;
  content: string;
  cl_id: string;
}

/** 專門處理標籤加字樣然後排序
 * 要處理大中小標籤 => (側邊欄 & 導覽列沒有的) ? (後台)... : 不做事
 * 然後還要排序
 */
export const LabelSort = (data: LabelData[]): { name: string; value: string }[] => {
  let finalData = data.map((i) => ({
    name: i.is_front === "N" && i.is_nav === "N" ? `(後台)${i.content}` : i.content,
    value: i.cl_id,
  }));

  finalData.sort((a, b) => {
    let x = a.name.includes("(後台)") ? a.name : "";
    let y = b.name.includes("(後台)") ? b.name : "";

    // 有加(後台)字樣的往前排
    if (x && !y) return -1;
    else if (!x && y) return 1;
    else return x.localeCompare(y, "zh-Hant-TW", { sensitivity: "accent" });
  });

  return finalData;
};

interface ECPayGreenParams {
  OrderID: string;
  Amount: number;
}

/** 綠界刷卡
 * @param OrderID 訂單編號
 * @param Amount 要刷卡的金額
 */
export const ECPayGreen = async ({ OrderID, Amount }: ECPayGreenParams): Promise<void> => {
  const response = await fetch(`${window.location.origin}/api/ECPayGreen/Send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      OrderID: OrderID,
      Amount: Amount,
      ItemName: "",
    }),
  });

  const text = await response.text();
  let div = document.body;
  if (div !== null) {
    div.innerHTML = text;
    const scripts = div.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      eval(script.innerHTML);
    }
  }
};

/** tryCatchError console
 * @param message 錯誤訊息
 */
export const tryCatchError = (message: string): void => {
  console.log(`%c trycatch %c ${message} %c`, "background:#d61a2d ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:rgba(229, 115, 115, 0.1) ; padding: 1px; border-radius: 0 3px 3px 0;  color: #e57373", "background:transparent");
};

/** 函數來判斷如何從permission中獲取按鈕權限
 * @author Sabrina
 * 先暫時這樣寫，還想不到有甚麼取代方式
 */
//TODO 先暫時這樣寫，還想不到有甚麼取代方式
export const checkAddTemp = (permission: { [x: string]: any }, btn: string) => {
  if (typeof permission === "object") {
    return permission[btn];
  }
  // 預設返回false
  return false;
};

/** 清除localStorage */
export const localStorageClear = () => {
  localStorage.Web_username = localStorage.isRemember === "Y" ? localStorage.Web_username : "";
  localStorage.cus_token = "";
  localStorage.Web_customerName = "";
  localStorage.customer_id = "";
};

/** 檢查email格式 */
export const validateEmail = (email: string) => {
  // const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return regex.test(email);
};

/** 退貨狀態log  - (超級針對退貨跟訂單的東西)*/
export const createOrderStatusLog = (data: { [x: string]: string }) => {
  // 判斷訂單狀態跟付款狀態，決定查出訂單歷史狀態需要的物件參數
  const cancleNoPaid = [{ key: "cancel_check_time", title: "已取消" }];
  const cancleWithPaidTooLate = [{ key: "cancel_apply_time", title: "付款逾期，系統取消" }];
  const cancleWithPaid = [
    { key: "refund_over_time", title: "已退款" },
    { key: "cancel_check_time", title: "申請已核准" },
    { key: "cancel_apply_time", title: "訂單取消申請" },
  ];
  const returnsWithPaid = [
    { key: "refund_over_time", title: "已退款" },
    { key: "return_accept_time", title: "已驗貨" },
    { key: "return_receive_time", title: "退貨已收回" },
    { key: "return_confirm_time", title: "退貨已確認" },
    { key: "return_check_time", title: "申請已核准" },
    { key: "return_apply_time", title: "訂單退貨申請" },
  ];

  let fields = [];

  if (data.order_status === "已取消" && data.pay_status === "未付款") {
    if (data.officesite_pay_status === "已逾期") {
      fields = cancleWithPaidTooLate;
    } else {
      fields = cancleNoPaid;
    }
  } else if ((data.pay_status === "已付款" || data.pay_status === "退款中" || data.pay_status === "已退款") && data.ship_time === null) {
    fields = cancleWithPaid;
  } else {
    fields = returnsWithPaid;
  }

  return fields
    .map((field) => {
      if (data[field.key] !== undefined && data[field.key] !== null && data[field.key] !== "") {
        return {
          title: field.title,
          text: DateTimeFormat.DateTimeToString({ date: data[field.key], Mode: DateTimeFormat.DateTimeMode.yyyyMMddHHmm }),
        };
      }
    })
    .filter((item) => item !== undefined);
};

/** 發票規格*/
export const checkCarrierid = (type: string, id: string) => {
  let regexp: RegExp = /(?:)/; // Assign an empty regular expression pattern
  switch (type) {
    case "01":
      //手機條碼正規式
      regexp = /^[\/][a-zA-Z0-9\+\-\.]{7}$/;
      break;
    case "02":
      //自然人憑證正規式
      regexp = /^[a-zA-Z]{2}[0-9]{14}$/;
      break;
  }
  return regexp.test(id);
};
