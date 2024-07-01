import packageJson from '../../package.json';
import { localStorageClear } from './Function';

let ecctestDomain = packageJson.testConfig.ecctestDomain;
let eccnetDomain = packageJson.testConfig.eccnetDomain;
// let testDomain = packageJson.testConfig.testDomain;
let domain = window.location.origin + "/api/";
let companyFileURL = window.location.origin + "/_" + sessionStorage.company_code
let permisionURL = window.location.origin + "/_" + sessionStorage.company_code;
let imageURL = window.location.origin;
let exportURL = window.location.protocol + "//" + window.location.host;
let ImportSampleURL = window.location.protocol + "//" + window.location.host + "/ImportSample";
let DeclarePaperURL = window.location.protocol + "//" + window.location.host + "/DeclarePaper";
let isTest = false;// 判斷是不是測試環境所要做的事情，為了解決一直註解或是打開浮水印的問題
if (window.location.origin.indexOf("localhost") !== -1
  || window.location.origin.indexOf("127.0.0.1") !== -1
  || window.location.origin.indexOf("ngrok") !== -1) {
  /// NET
  domain = eccnetDomain + "/api/";
  companyFileURL = eccnetDomain + "/_" + sessionStorage.company_code;
  permisionURL = eccnetDomain + "/_" + sessionStorage.company_code;
  imageURL = eccnetDomain;
  ImportSampleURL = eccnetDomain + "/ImportSample";
  DeclarePaperURL = eccnetDomain + "/DeclarePaper";
}

if (window.location.origin.indexOf("test") !== -1) {
  isTest = true;
}

// else if (window.location.origin.indexOf("test") !== -1) {
//   domain = ecctestDomain + "/api/";
//   companyFileURL = ecctestDomain + "/root/_" + sessionStorage.company_code;
//   permisionURL = ecctestDomain + "/root/_" + sessionStorage.company_code;
//   imageURL = ecctestDomain + "/root"
// }

/**
 * API 需要token
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const AuthorizeFetch = async (url, obj = {}) => {
  const response = await fetch(domain + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + sessionStorage.token
    },
    body: JSON.stringify(obj)
  });
  const res = await response.json();

  if (response.status === 200) {
    return res
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
}


/**
 * API 不需要token
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const UnauthorizedFetch = async (url, obj = {}) => {
  const response = await fetch(domain + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(obj)
  });

  const res = await response.json();

  if (response.status === 200) {
    return res
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
}

/**
 * API 需要token 上傳圖片用
 * @param {string} url api名稱
 * @param {object} obj 參數
 */
const AuthorizeFetch_forFile = async (url, obj = {}) => {
  const response = await fetch(domain + url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.token
    },
    body: obj
  });

  const res = await response.json();

  if (response.status === 200) {
    return res
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
const AuthorizeFetch_SimsCustomer = async (uri, obj = {}) => {
  const response = await fetch(domain + uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + sessionStorage.cus_token
    },
    body: JSON.stringify(obj)
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
}

/**
 * API 客戶token
 * @param {string} cus_token 客戶token
 */
const AuthorizeFetch_forCustomer = async (uri, obj = {}) => {
  const response = await fetch(domain + uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.cus_token
    },
    body: JSON.stringify(obj)
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
}

/** 檢查登入專屬 API 用 */
const CheckLogIn = async () => {
  const res = await AuthorizeFetch("usercontrol/check", {});
  if (!res.success) {
    if (res.message === "deviceCodeError") {
      alert("帳號已登出，請重新登入");
    }
  }
  return res;
};

/** 官網檢查token */
const CustomCheckLogIn = async () => {
  if (localStorage.cus_token) {
    const res = await AuthorizeFetch_forCustomer("EC_Customer/Check", {});
    return res;
  } else {
    return { success: false, message: "未登入" };
  }
};

export {
  AuthorizeFetch,
  AuthorizeFetch_forFile,
  AuthorizeFetch_forCustomer,
  AuthorizeFetch_SimsCustomer,
  UnauthorizedFetch,
  CheckLogIn,
  CustomCheckLogIn,
  domain,
  eccnetDomain,
  companyFileURL,
  permisionURL,
  imageURL,
  ImportSampleURL,
  DeclarePaperURL,
  isTest
}