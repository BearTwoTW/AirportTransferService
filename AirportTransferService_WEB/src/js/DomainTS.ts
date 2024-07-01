import packageJson from "../../package.json";
import { localStorageClear } from "./FunctionTS";

// let ecctestDomain = packageJson.testConfig.ecctestDomain;
let eccnetDomain = packageJson.testConfig.atsDomain;
// let testDomain = packageJson.testConfig.testDomain;
let domain = window.location.origin + "/api/";
let companyFileURL = window.location.origin + "/_" + sessionStorage.company_code;
let permisionURL = window.location.origin + "/_" + sessionStorage.company_code;
let imageURL = window.location.origin;
let exportURL = window.location.protocol + "//" + window.location.host;
let ImportSampleURL = window.location.protocol + "//" + window.location.host + "/ImportSample";
let DeclarePaperURL = window.location.protocol + "//" + window.location.host + "/DeclarePaper";
let isTest = false; // 判斷是不是測試環境所要做的事情，為了解決一直註解或是打開浮水印的問題

if (window.location.origin.indexOf("localhost") !== -1 || window.location.origin.indexOf("127.0.0.1") !== -1) {
  /// NET
  domain = eccnetDomain + "/api/";
  companyFileURL = eccnetDomain + "/_" + sessionStorage.company_code;
  permisionURL = eccnetDomain + "/_" + sessionStorage.company_code;
  imageURL = eccnetDomain;
  ImportSampleURL = eccnetDomain + "/ImportSample";
  DeclarePaperURL = eccnetDomain + "/DeclarePaper";
}

if (window.location.origin.indexOf("test") !== -1 || window.location.origin.indexOf("localhost") !== -1 || window.location.origin.indexOf("ecc") !== -1) {
  isTest = true;
}

// else if (window.location.origin.indexOf("test") !== -1) {
//     domain = ecctestDomain + "/api/";
//     companyFileURL = ecctestDomain + "/root/_" + sessionStorage.company_code;
//     permisionURL = ecctestDomain + "/root/_" + sessionStorage.company_code;
//     imageURL = ecctestDomain;
// }

export type ResultObj<T = any, T2 = any> = {
  success: boolean;
  data: T;
  message: string;
  dt2?: T2 | null;
  page?: number;
};

/**
 * request data type
 */
type RequestObj = { [key: string]: any } | FormData;

/**
 * API 需要token
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const AuthorizeFetch = async (url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + sessionStorage.token,
    },
    body: JSON.stringify(obj),
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/**
 * API 不需要token
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const UnauthorizedFetch = async (url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/**
 * API 需要token 上傳圖片用
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const AuthorizeFetch_forFile = async <T = RequestObj>(url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.token,
    },
    body: obj,
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/**
 * API 客戶token
 * @param {string} cus_token 客戶token
 */
const AuthorizeFetch_SimsCustomer = async (url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + sessionStorage.cus_token,
    },
    body: JSON.stringify(obj),
  });
  const res = await response.json();
  if (response.status === 200) {
    return res;
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/**
 * API 客戶token
 * @param {string} cus_token 客戶token
 */
const AuthorizeFetch_forCustomer = async (url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + localStorage.cus_token,
    },
    body: JSON.stringify(obj),
  });
  const res = await response.json();
  if (response.status === 200) {
    return res;
  } else if (response.status === 401) {
    localStorageClear();
    window.location.replace("/Login");
    return { success: false, data: res, message: "會員登入逾時，請重新登入" };
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/**
 * @author Yu
 * @date 2023/12/05
 * @description API 需要token 上傳檔案用
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
// TODO：要問一下上面上傳圖片的API跟這個有什麼差別
const AuthorizeFetch_ImportFile = async (url: string = "", obj: any = {}): Promise<ResultObj> => {
  const response = await fetch(domain + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.token,
    },
    body: obj,
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  } else {
    let errorMessages = "";
    if (res.hasOwnProperty("errors")) {
      for (const k in res.errors) {
        errorMessages += `${res.errors[k][0]}，`;
      }
    } else {
      errorMessages = `系統錯誤：http status：${response.status}`;
    }
    return { success: false, data: res, message: errorMessages.replace(/，$/, "") };
  }
};

/** 檢查登入專屬 API 用
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const CheckLogIn = async (): Promise<ResultObj> => {
  const res = await AuthorizeFetch("usercontrol/check", {});
  if (!res.success) {
    if (res.message === "deviceCodeError") {
      alert("帳號已登出，請重新登入");
    }
  }
  return res;
};

/** 官網檢查token */
const CustomCheckLogIn = async (): Promise<ResultObj> => {
  if (localStorage.cus_token) {
    const res = await AuthorizeFetch_forCustomer("EC_Customer/Check", {});
    return res;
  } else {
    return { success: false, message: "未登入", data: null };
  }
};

export { AuthorizeFetch, UnauthorizedFetch, AuthorizeFetch_forFile, AuthorizeFetch_ImportFile, CheckLogIn, CustomCheckLogIn, AuthorizeFetch_SimsCustomer, AuthorizeFetch_forCustomer, domain, companyFileURL, permisionURL, imageURL, exportURL, ImportSampleURL, DeclarePaperURL, isTest };
