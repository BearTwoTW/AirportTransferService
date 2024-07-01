import React, { useState, useEffect, useContext } from 'react';

/** 註冊邏輯 */
export const useSignUp = () => {

  const [singUpData, setSingUpData] = useState({
    name: null,
    email: null,
    password: null,
    checkPassword: null,
  });
  const initSingUpDataCheck = { username: false };
  const [singUpDataCheck, setSingUpDataCheck] = useState(initSingUpDataCheck);


  /** 確認註冊 */
  const handleSignUp = async () => {
    console.log('註冊');
  };


  /** 輸入帳號密碼 */
  const add_HandleInput = (e) => {
    const { name, value } = e.target;
    setSingUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    singUpDataCheck,
    singUpData,
    add_HandleInput,
    handleSignUp
  };
};