import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useContext } from "react";

import { Box, Grid } from "@mui/material";
import { Helmet } from "react-helmet";

import { ShoppingCarContext } from "../../../../store/ShoppingCarContext";
import { OfficeSiteContext } from "../../../../store/OfficeSiteContext";

import { imageURL } from '../../../../js/DomainTS';

import SignInUI from "./SignIn/SignInUI";
import ForgetPasswordUI from './ForgetPassword/ForgetPasswordUI';
import SignUpUI from './SignUp/SignUpUI';

/** 畫面種類 */
const ShowPage = {
  SignIn: "SignIn",
  SignUp: "SignUp",
  SignUpVerify: "SignUpVerify",
  ForgetPassword: "ForgetPassword",
};

/** 官網登入 */
const Login = () => {
  const { officeSite } = useContext(OfficeSiteContext);
  const { website_setting } = officeSite || { website_setting: null };
  const [ICO, setICO] = useState(null);
  // const ShoppingCarCtx = useContext(ShoppingCarContext);
  /** 當前畫面 */
  const [showPage, setShowPage] = useState(ShowPage.SignIn);

  /** 畫面滾到最上方 */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /** 控制要顯示的畫面 */
  const handlePageClick = (page) => {
    setShowPage(page);
  };

  return (
    <Box className="container mx-auto">
      <Helmet>
        <link rel="shortcut icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
        <title>
          {website_setting ? `${website_setting.website_name} | 登入` : ""}
        </title>
      </Helmet>
      <Box className="flex justify-center pt-40">
        <Box className="w-[400px] max-md:flex-wrap flex border border-light-gray">
          <Box className="w-full flex flex-col space-y-5 p-5 px-10">
            <Box className="flex justify-center">
              {(() => {
                if (showPage === ShowPage.SignIn) {
                  return <h1>歡迎回來</h1>
                } else if (showPage === ShowPage.SignUp) {
                  return <h1>立即註冊</h1>
                } else if (showPage === ShowPage.ForgetPassword) {
                  return <h1>忘記密碼</h1>
                }
              })()}
            </Box>
            <Box className="flex justify-center space-x-2.5">
              <span className="text-info">
                {showPage === ShowPage.SignIn
                  ? "還沒有"
                  : "已經有"}
                {website_setting ? " " + website_setting.website_name + " " : ""}
                帳號嗎?
              </span>
              <button
                type={"button"}
                className="font-bold text-info underline"
                onClick={() => handlePageClick(
                  showPage === ShowPage.SignIn ?
                    ShowPage.SignUp
                    : ShowPage.SignIn
                )}>
                {showPage === ShowPage.SignIn
                  ? "立即註冊"
                  : "立即登入"}
              </button>
              {/* {(() => {
                if (showPage === ShowPage.SignIn) {
                  return (
                    <>
                      <span className="text-info">還沒有{website_setting ? " " + website_setting.website_name + " " : ""}帳號嗎?</span>
                      <button
                        type={"button"}
                        className="font-bold text-info underline"
                        onClick={() => handlePageClick(ShowPage.SignUp)}>
                        立即註冊
                      </button>
                    </>
                  )
                } else {
                  return (
                    <>
                      <span className="text-info">已經有{website_setting ? " " + website_setting.website_name + " " : ""}帳號嗎?</span>
                      <button
                        type={"button"}
                        className="font-bold text-info underline"
                        onClick={() => handlePageClick(ShowPage.SignIn)}>
                        立即登入
                      </button>
                    </>
                  )
                }
              })()} */}
            </Box>
            {(() => {
              if (showPage === ShowPage.SignIn) {
                return (
                  <SignInUI
                    handlePageClick={handlePageClick}
                    ShowPage={ShowPage}
                  />
                );
              } else if (showPage === ShowPage.SignUp) {
                return (
                  <SignUpUI
                    handlePageClick={handlePageClick}
                    ShowPage={ShowPage}
                  />
                );
              } else if (showPage === ShowPage.ForgetPassword) {
                return (
                  <ForgetPasswordUI
                    handlePageClick={handlePageClick}
                    ShowPage={ShowPage}
                  />
                );
              }
              // else if (showPage === ShowPage.SignUpVerify) {
              //   return (
              //     <div>註冊確認</div>
              //   );
              // } else {
              //   return (
              //     <div>未知畫面</div>
              //   );
              // }
            })()}
          </Box>
        </Box>
      </Box>

      {/* <WebDialog3 ref={useDialog} info={dialogData} />
      <CusBackdropLoading open={signupLoading} text={"註冊中，請稍後"} />
      <CusBackdropLoading open={resendVerifyLoading} text={"重發驗證信中，請稍後"} /> */}
    </Box>
  );
};

export default Login;
