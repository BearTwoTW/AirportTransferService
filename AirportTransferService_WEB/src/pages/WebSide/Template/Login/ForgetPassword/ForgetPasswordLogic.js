import { useState } from 'react';

import { CustomerAPI } from '../../../../../js/APITS';
import { isNullOrEmpty } from '../../../../../js/FunctionTS';

/** 忘記密碼邏輯 */
export const useForgetPasswordLogic = () => {
  /** 信箱 */
  const [forgetPasswordData, setForgetPasswordData] = useState({ username: null });
  const initForgetPassworCheck = { username: false };
  const [forgetPasswordCheck, setForgetPasswordCheck] = useState(initForgetPassworCheck);
  /** 寄送驗整碼api結果 */
  const [sendVerifyResult, setSendVerifyResult] = useState({
    success: null,
    message: null,
    data: null
  })

  /** 寄送密碼驗證信 */
  const handleSendVerifyEmail = async (e) => {
    e.stopPropagation();

    let dataCheck = {};
    for (let key in forgetPasswordData) {
      if (forgetPasswordCheck.hasOwnProperty(key)) {
        dataCheck[key] = isNullOrEmpty(forgetPasswordData[key]);
      }
    }

    if (Object.values(dataCheck).some(value => value === true)) {
      setForgetPasswordCheck(dataCheck);

      setSendVerifyResult(prev => ({
        ...prev,
        success: null,
        message: null,
        data: null
      }));
    } else {
      setForgetPasswordCheck(initForgetPassworCheck);

      const { success, message, data } = await CustomerAPI.ForgetPassword(forgetPasswordData);

      setSendVerifyResult(prev => ({
        ...prev,
        success: success,
        message: message,
        data: data
      }));
    }
  };

  /** 輸入帳號密碼 */
  const add_HandleInput = (e) => {
    const { name, value } = e.target;
    setForgetPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    forgetPasswordCheck,
    forgetPasswordData,
    add_HandleInput,
    handleSendVerifyEmail,
    sendVerifyResult
  };
};