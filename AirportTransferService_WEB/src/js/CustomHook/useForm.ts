//!!! 還沒弄完，目前用不到，先放著
import { useState, useEffect } from "react";
import { isNullOrEmpty } from "../FunctionTS";

export const useForm = (formData: any, checkData: any) => {
  /**
   * 外面傳入相關state物件，需要包含是否必填
   * 是不是要有handleChange的function
   * 外傳setter，讓外部可以自訂一些奇怪的input需求
   */

  // 外部傳入的資料
  formData = {
    account: "",
    name: "",
    age: "",
  };

  // 外部傳入的檢查
  checkData = {
    account: true,
    name: true,
  };

  const [form, setForm] = useState<any>(formData);
  const initCheckData = checkData;
  const [checkForm, setCheckForm] = useState(initCheckData);

  /** 輸入框事件
   * @description 新增用 => 給外部的input或是select使用的函式
   */
  const handleOnChangeForm = (inputName: string) => {
    setForm((prev: any) => ({
      ...prev,
      [inputName]: "",
    }));
  };

  /** 輸入框update
   * @description 更新用 => 給外部的input或是select使用的函式
   */
  const handleOnChangeFormUpdate = (inputName: string) => {
    setForm((prev: any) => ({
      ...prev,
      updData: {
        ...prev.updData,
        [inputName]: "",
      },
    }));
  };

  /** 定義檢查的型態 */
  interface CheckItem {
    [key: string]: boolean;
  }

  /** 必填檢查
   * @description 應該是外部的click觸發時，使用這個函式
   */
  const handleCheckForm = () => {
    const checkField = Object.keys(form).reduce((checkItem: CheckItem, key) => {
      if (checkForm.hasOwnProperty(key)) {
        checkItem[key] = isNullOrEmpty(form[key]);
      }
      return checkItem;
    }, {});

    if (Object.values(checkField).some((item) => item === true)) {
      setCheckForm(checkField);
      return false;
    } else {
      setCheckForm(initCheckData);
      return true;
    }
  };

  return {
    form,
    setForm, // 保留可以自訂一些奇怪的input需求，因此把setter傳出去
    checkForm,
    handleOnChangeForm,
    handleOnChangeFormUpdate,
    handleCheckForm,
  };
};
