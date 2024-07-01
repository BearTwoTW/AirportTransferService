import { useState, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import MD5 from 'crypto-js/md5';

import { ShoppingCarContext } from '../../../../../store/ShoppingCarContext';

import { CustomerAPI, OrderAPI, OauthAPI } from '../../../../../js/APITS';
import { get_ECC_indexedDB_factory, deviceCode, isNullOrEmpty } from '../../../../../js/FunctionTS';

/** 登入邏輯層 */
export const useSignInLogic = () => {
  /** 導頁 */
  const navigate = useNavigate();
  /** 購物車context */
  const ShoppingCarCtx = useContext(ShoppingCarContext);
  /** 登入相關資訊 */
  const initSignInCheck = { username: false, password: false };
  const [signInCheck, setSignInCheck] = useState(initSignInCheck);
  const [signInData, setSigninData] = useState({
    username: localStorage.isRemember === "Y" ? localStorage.Web_username : null,
    password: null,
    device_type: 'WEB',
    device_code: null,
    isRemember: localStorage.isRemember ? localStorage.isRemember : "N"
  });
  /** indexedDB */
  const [initDB, setInitDB] = useState(false);
  const initDBRef = useRef(initDB);
  initDBRef.current = initDB;
  /** 登入結果 */
  const [signInResult, setSignInResult] = useState({
    success: null,
    data: null,
    message: null
  });

  /** 輸入帳號密碼 */
  const add_HandleInput = (e) => {
    const { name, value } = e.target;
    setSigninData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** 登入事件 */
  const handleSignIn = async ({ isOAuth = false, type = "" }) => {
    const { success, message, data } = isOAuth
      ? await oAuthSignIn(type)
      : await normalSignIn();

    if (success && !isOAuth) {
      addShoppingCar({ customer_id: data.customer_id });
      localStorage.Web_username = signInData.isRemember === "Y" ? signInData.username : ""
      localStorage.isRemember = signInData.isRemember;
    }

    setSignInResult(prev => ({
      ...prev,
      success: success,
      message: message,
      data: data
    }));
  };

  /** 一般登入 */
  const normalSignIn = async () => {
    let dataCheck = {};
    for (let key in signInData) {
      if (initSignInCheck.hasOwnProperty(key)) {
        dataCheck[key] = isNullOrEmpty(signInData[key]);
      }
    }
    if (Object.values(dataCheck).some(value => value === true)) {
      setSignInCheck(dataCheck);

      return {
        success: null,
        message: null
      }
    } else {
      setSignInCheck(initSignInCheck);

      const { success, data, message } = await CustomerAPI.Signin({
        ...signInData,
        password: MD5(signInData.password).toString(),
        device_code: deviceCode()
      });

      if (success) {
        localStorage.cus_token = data.token;
        localStorage.Web_customerName = data.customer_name;
        localStorage.customer_id = data.customer_id;
      }

      return {
        success: success,
        message: message
      }
    }
  };

  /** 第三方登入
   * @param {string} type 第三方登入方式
   */
  const oAuthSignIn = async (type) => {
    switch (type) {
      case "Facebook":
        return await facebookSignIn();
      case "Google":
        return await googleSignIn();
      case "LINE":
        return await lineSignIn();
      default:
        return { success: false, message: "未知的登入方式" };
    };
  };

  /** 第三方登入：Facebook */
  const facebookSignIn = async () => {
    return { success: false, message: "尚未串接" };
  };

  /** 第三方登入：Google */
  const googleSignIn = async () => {
    const { success, data, message } = await OauthAPI.GoogleOAuthNoToken();

    if (success) {
      //data導到google認證頁面
      window.location.replace(data);
    } else {
      console.error(message);
    }

    return {
      success: success,
      message: message
    }
  };

  /** 第三方登入：LINE */
  const lineSignIn = async () => {
    const { success, data, message } = await OauthAPI.LineOAuthNoToken();

    if (success) {
      //data導到Line認證頁面
      window.location.replace(data);
    } else {
      console.error(message);
    }

    return {
      success: success,
      message: message
    }
  };

  /** 寄送會員驗證信 */
  const resendVerify = async ({ e, type }) => {
    e.stopPropagation();
    // 沙小
  };

  /** 綁定其他帳號 */
  const combineAccounts = async ({ e, userData }) => {
    if (userData) {
      const { success, message, data } = await OauthAPI.combineAccounts({
        username: userData.username,
        oauthemail: userData.email,
        device_type: userData.device_type,
        device_code: userData.device_code
      });

      if (success) {
        localStorage.cus_token = data.token;
        localStorage.Web_customerName = data.customer_name;
        localStorage.customer_id = data.customer_id;
        setTimeout(() => {
          navigate("/Index");
        }, 1500);
      } else {
        setTimeout(() => {
          navigate("/Login");
        }, 1500);
      }
    }
  };

  /** 加入購物車 */
  const addShoppingCar = async ({ customer_id }) => {
    get_ECC_indexedDB_factory().then(async (idb) => {
      const search_set = (idb !== null
        ? idb.cursor("CartStorage").then((res) => {
          if (res.success && res.data !== null)
            return res.data
          else
            return null;
        })
        : null);

      let commoditys = [];
      // 有加購物車，但是未登入
      if (search_set && search_set.length > 0) {
        commoditys = search_set.map((item) => item.data);

        const { success } = await OrderAPI.ShoppingCarAddGroup({
          customer_id: customer_id,
          commoditys: commoditys,
          gifts: []
        });

        if (success) {
          setTimeout(() => { navigate("/Checkout") }, 1000);
          // 清indexedDB
          idb.clear("CartStorage");
        } else {
          setTimeout(() => { navigate("/Index") }, 1000);
        }
      }
      setTimeout(() => { navigate("/Index") }, 1000);
      // 查購物車
      ShoppingCarCtx.searchIsShoppingCar();
    });
    setInitDB(true);
  };

  return {
    signInCheck,
    signInData,
    add_HandleInput,
    handleSignIn,
    addShoppingCar,
    signInResult,
    resendVerify,
    combineAccounts,
  };
};