import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import { CheckLogIn, permisionURL } from "./Domain";
import { IndexedDBClass } from "./indexedDB";

const homepage = sessionStorage.home_page;

/**
 * 時間處理
 */
export const DateTimeFormate = (() => {
  /**
   * @description 時間改字串
   * @param { Date } date 不給值就預設現在時間，ex: new Date("2023-04-25")
   * @param { string } Mode
   * @param { string } joinDate ex: "/"、"-"
   * @param { string } joinTime ex: ":"
   */
  const DateTimeToString = ({ type = null, date = null, Mode = "yyyyMMdd", joinDate = "/", joinTime = ":", space = " " }) => {
    let EditTime, year, month, day, hour, minute, second = "";
    if (date) {
      if (type === "newDate") {
        year = date.getFullYear();
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        day = date.getDate().toString().padStart(2, '0');
        hour = date.getHours().toString().padStart(2, '0');
        minute = date.getMinutes().toString().padStart(2, '0');
        second = date.getSeconds().toString().padStart(2, '0');
      } else {
        year = date.substring(0, 4);
        month = date.substring(5, 7);
        day = date.substring(8, 10);
        hour = date.substring(11, 13);
        minute = date.substring(14, 16);
        second = date.substring(17, 19);
      }
    } else {
      let nd = new Date();
      year = nd.getFullYear();
      month = ("0" + (nd.getMonth() + 1)).slice(-2);
      day = ("0" + nd.getDate()).slice(-2);
      hour = ("0" + nd.getHours()).slice(-2);
      minute = ("0" + nd.getMinutes()).slice(-2);
      second = ("0" + nd.getSeconds()).slice(-2);
    }
    switch (Mode) {
      case "yyyyMMddHHmmss":
        EditTime = `${year}${joinDate}${month}${joinDate}${day}${space}${hour}${joinTime}${minute}${joinTime}${second}`;
        break;
      case "yyyyMMddHHmm":
        EditTime = `${year}${joinDate}${month}${joinDate}${day}${space}${hour}${joinTime}${minute}`;
        break;
      case "yyyyMMdd":
        EditTime = `${year}${joinDate}${month}${joinDate}${day}`;
        break;
      case "yyyyMM":
        EditTime = `${year}${joinDate}${month}`;
        break;
      case "MMddHHmm":
        EditTime = `${month}${joinDate}${day}${space}${hour}${joinTime}${minute}`;
        break;
      case "MMdd":
        EditTime = `${month}${joinDate}${day}`;
        break;
      case "HHmmss":
        EditTime = `${hour}${joinTime}${minute}${joinTime}${second}`;
        break;
      case "HHmm":
        EditTime = `${hour}${joinTime}${minute}`;
        break;
      default:
        EditTime = `${year}${joinDate}${month}${joinDate}${day}`;
        break;
    }
    return EditTime;
  };

  /**
   * @description 本月第一天
   */
  const getMonthStart = (date = null) => {
    let d = date === null ? new Date() : date;
    let start = new Date(d.getFullYear(), d.getMonth(), 1);
    return new Date(start);
  };

  /**
   * @description 本月最後一天
   */
  const getMonthEnd = (date = null) => {
    let d = date === null ? new Date() : date;
    let end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return new Date(end);
  };

  return {
    getMonthStart,
    getMonthEnd,
    DateTimeToString,
  };
})();

/**
 * 取得權限
 * 本地也可以抓到測試機所存的權限
 * @param {string} code 檔案名稱
 */
export const GetPermission = async (account) => {
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
export const useCheckLogInXPermission = (pageName = null, btnArr = [], path = null, getPermission = false) => {
  const pagePath = path ? `${path}/${pageName}` : window.location.pathname;
  let PermissionRes = [];
  const navigate = useNavigate();
  const [resPermissionBtn, setResPermissionBtn] = useState({});

  useEffect(() => {
    CheckLogIn().then((res) => {
      if (res.success) {
        GetPermission(res.data.path).then(async (r) => {
          PermissionRes = r;
          let obj = {};
          let nowState = await nowPageState({
            sidebar: r.find((ele) => ele.name === homepage).children.find((ele) => ele.name === "sidebar"),
            groupCode: pagePath.split("/")[2],
            pageCode: pagePath.split("/")[pagePath.split("/").length - 1],
          });
          for (let i in btnArr) {
            let btnBool = await btnState(btnArr[i], nowState, pageName);
            obj = { ...obj, [btnArr[i]]: btnBool };
          }
          setResPermissionBtn(obj);
        });
      }
      else navigate("/System/Login");
    });
  }, []);

  return getPermission ? { data: PermissionRes, Btn: resPermissionBtn } : resPermissionBtn;
};

//檢查頁面群組及頁面的權限
export const nowPageState = async (obj) => {
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

// 檢查按鈕的權限
export const btnState = async (btnId, Arr, pageName) => {
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
    let r = await idb
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

// 用於檢查值是否為 null 或空字串
export const isNullOrEmpty = (value) => value === null || value === "";

/**
 * URL 轉 base64，會有corss 的問題要注意!
 * @param {*} url
 * @returns
 */
export const base64FromURL = (url) =>
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

/**
 * 用base64 取得寬高比例
 * @param {*} base64
 * @returns
 */
export const widthHeightRatio = (base64) =>
  new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i.width / i.height);
    i.src = base64;
  });

/**
 * deviceCode
 * @returns
 */
export const deviceCode = () => {
  let d = new Date();
  return d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2);
};

/**
 * API 錯誤結果 responseAlert
 * @param {*} res
 */

/**
 * 排出重複資料
 * @param {*} res
 */
export const ArrayNotRepeat = (data, key) => {
  if (key) {
    const uniqueMIdObjects = {};
    for (let item of data) {
      if (!uniqueMIdObjects[item[key]]) uniqueMIdObjects[item[key]] = item;
    }
    return Object.values(uniqueMIdObjects);
  } else {
    const uniqueKeys = {};
    const result = [];
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

/**
 * 檢查是否過期
 * @param {*} date （2023-10-25T23:00:00）
 * @returns {boolean}
 */
export const CheckExpiredTime = (date) => {
  const currentDate = new Date();
  const expirationDate = new Date(date);
  if (currentDate > expirationDate) return true;
  else return false;
};

/**
 * @description 另開視窗html列印
 * @param {*} HtmlContent html Components
 */
export const OpenWindowWithContent = (HtmlContent) => {
  let newWindow = window.open("", "_blank");
  let htmlContent = ReactDOMServer.renderToString(HtmlContent);
  newWindow.document.write(htmlContent);
  newWindow.document.close();
  // 打開頁面觸發列印功能
  newWindow.onload = function () {
    newWindow.print();
    // 列印完自動關閉
    // newWindow.onafterprint = function () {
    // 	newWindow.close();
    // };
  };
}

/**
 * @description 訂單狀態判斷
 * @returns 四個狀態 Chip color
 */
export const OrderStatus = (statusName) => {
  let str = "default";
  if (statusName) {
    if (statusName.includes('已')) return str;
    else if (statusName.includes('中')) return str = "warning";
    else if (statusName.includes('完成')) return str;
    else if (statusName.includes('待')) return str = "info";
    else if (statusName.includes('取消')) return str;
    else if (statusName.includes('未')) return str = "error";
    else return str;
  } else return str;
}

/**
   * @description 專門處理標籤加字樣然後排序
   * 要處理大中小標籤 => (側邊欄 & 導覽列沒有的) ? (後台)... : 不做事
   * 然後還要排序
   */
export const LabelSort = (data) => {
  let finalData = data.map(i => ({
    name: (i.is_front === "N" && i.is_nav === "N") ? (`(後台)${i.content}`) : (i.content),
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

/**
 * @description 綠界刷卡
 * @param OrderID 訂單編號
 * @param Amount 要刷卡的金額
 */
export const ECPayGreen = async ({ OrderID, Amount }) => {
  fetch(`${window.location.origin}/api/ECPayGreen/Send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      OrderID: OrderID,
      Amount: Amount,
      ItemName: "",
    })
  }).then(async xhr => {
    let div = document.body;
    if (div !== null) {
      div.innerHTML = await xhr.text();
      let scripts = div.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        eval(script.innerHTML);
      }
    }
  });
}

/**
 * @description 中國信託刷卡
 * @param OrderID 訂單編號
 * @param Amount 要刷卡的金額
 */
export const CTBCCreditCardPay = async ({ OrderID, Amount }) => {
  fetch(`${window.location.origin}/CTBCBank/CreditCard/Send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      OrderID: OrderID,
      Amount: Amount,
      ItemName: "",
    })
  }).then(async xhr => {
    let div = document.body;
    if (div !== null) {
      div.innerHTML = await xhr.text();
      let scripts = div.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        eval(script.innerHTML);
      }
    }
  });
}

/**
 * @description tryCatchError console
 * @param message 錯誤訊息
 */
export const tryCatchError = (message) => {
  console.log(`%c trycatch %c ${message} %c`,
    'background:#d61a2d ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:rgba(229, 115, 115, 0.1) ; padding: 1px; border-radius: 0 3px 3px 0;  color: #e57373',
    'background:transparent')
}

/** 清除localStorage */
export const localStorageClear = () => {
  localStorage.Web_username = (localStorage.isRemember === "Y" ? localStorage.Web_username : "")
  localStorage.cus_token = "";
  localStorage.Web_customerName = "";
  localStorage.customer_id = "";
};

/** 日期相差天數
 * @description 目標日期與今日日期相差天數
 * @param {string} targetDateString 目標日期
 */
export const getDiffDay = (targetDateString) => {
  const targetDate = new Date(targetDateString);
  targetDate.setHours(0, 0, 0, 0); // 時分秒毫秒歸零

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0); // 時分秒毫秒歸零

  // 計算相差天數
  const timeDiff = todayDate - targetDate;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  return dayDiff;
};