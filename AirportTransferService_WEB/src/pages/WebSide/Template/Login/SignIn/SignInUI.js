import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useContext } from "react";

import { Box, Grid } from "@mui/material";
import { Google, CheckCircleOutline, CheckCircle, Error } from "@mui/icons-material";
import { LineIcon, FacebookIcon } from "../../../../../components/CusSvgLibrary";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInLogic } from "./SignInLogic";

import { WebTextButton3, WebTextIconButton3 } from "../../../../../components/WebSide/WebButton";
import { WebDialog3 } from "../../../../../components/WebSide/WebDialog";
import { WebCheckboxLabel3 } from "../../../../../components/WebSide/WebCheckBox";
import { WebInputStandard3 } from "../../../../../components/WebSide/WebInput";

/** 登入UI層 */
const SignInUI = (props) => {
  const { handlePageClick, ShowPage } = props;

  const { signInCheck, signInData, add_HandleInput, handleSignIn, addShoppingCar, signInResult, resendVerify, combineAccounts } = useSignInLogic();

  const navigate = useNavigate();
  const location = useLocation();
  const getParams = location.state;

  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  /** 登入結果的效果 */
  useEffect(() => {
    if (signInResult.success !== null) {
      useDialog.current.handleOpen();
      setDialogData({
        autoClose: true,
        DialogContent: (
          <DialogsInner
            ref={useDialogInner}
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{signInResult.message}</span>
              </span>
            }
          />
        ),
      });
    }
  }, [signInResult]);

  /** 第三方登入跳轉回來的效果 */
  useEffect(() => {
    if (getParams) {
      const { success, message, data } = getParams.Res;
      if (data.token) {
        // 正常第三方登入登入 or 第一次註冊
        addShoppingCar({ customer_id: data.customer_id });
      } else {
        // 同一個Email的綁定事件
        useDialog.current.handleOpen();
        setDialogData({
          DialogTitle: "綁定",
          DialogContent: (
            <DialogsInner
              type={"combineAccounts"}
              ref={useDialogInner}
              message={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Error className={"text-info"} />
                  <span style={{ marginLeft: "0.5rem" }}>{message}</span>
                </div>
              }
            />
          ),
          DialogActions: (
            <React.Fragment>
              <WebTextButton3
                fullWidth={false}
                size={"medium"}
                color={"primary"}
                text={"取消"}
                onClick={useDialog.current.handleClose()}
              />
              <WebTextButton3
                fullWidth={false}
                size={"medium"}
                color={"primary"}
                text={"綁定"}
                onClick={(e) => combineAccounts({ e: e, userData: data })}
              />
            </React.Fragment>
          ),
        });
      }
    }
  }, []);

  return (
    <>
      <Box className="flex flex-col space-y-2.5">
        <WebTextIconButton3
          fullWidth={true}
          size={"medium"}
          color={"secondary"}
          startIcon={<FacebookIcon />}
          text={"使用 Facebook 登入"}
          onClick={() => handleSignIn({ isOAuth: true, type: "Facebook" })}
        />
        <WebTextIconButton3
          fullWidth={true}
          size={"medium"}
          variant="outlined"
          color={"secondary"}
          startIcon={<Google className={"fill-info"} />}
          text={"使用 Google 登入"}
          onClick={() => handleSignIn({ isOAuth: true, type: "Google" })}
        />
        <WebTextIconButton3
          fullWidth={true}
          size={"medium"}
          variant="outlined"
          color={"secondary"}
          startIcon={<LineIcon className={"w-6 fill-info"} />}
          text={"使用 LINE 登入"}
          onClick={() => handleSignIn({ isOAuth: true, type: "LINE" })}
        />
      </Box>
      <Box className="flex items-center space-x-2.5">
        <hr className="w-6/12" />
        <span className="text-light-gray">or</span>
        <hr className="w-6/12" />
      </Box>
      <Box className="flex flex-col space-y-2.5">
        <WebInputStandard3
          type={"text"}
          name={"username"}
          value={signInData.username}
          required={true}
          placeholder={"請輸入信箱"}
          sxStyle={{ paddingRight: "0" }}
          error={signInCheck.username}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <WebInputStandard3
          password={true}
          type={"password"}
          name={"password"}
          value={signInData.password}
          required={true}
          placeholder={"請輸入密碼"}
          sxStyle={{ paddingRight: "0" }}
          error={signInCheck.password}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </Box>
      <Box className="flex justify-center">
        <WebTextIconButton3
          fullWidth={true}
          size={"large"}
          color="primary"
          text="登入"
          onClick={() => handleSignIn({})}
        />
      </Box>
      <Box className="flex justify-between">
        <Box className={"text-info"}>
          <WebCheckboxLabel3
            name={"isRemember"}
            label={"記住帳號"}
            color={"primary"}
            type={"text"}
            value={signInData.isRemember}
            onChangeEvent={(e) => add_HandleInput({ e: e, action: "signinData" })}
          />
        </Box>
        <button
          type={"button"}
          className={"text-info underline"}
          onClick={() => handlePageClick(ShowPage.ForgetPassword)}
        >
          <span>忘記密碼？</span>
        </button>
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </>
  );
};

export default SignInUI;

/** dialogs內容 */
const DialogsInner = forwardRef((props, ref) => {
  const { message } = props;
  return <h3 style={{ margin: "1.5rem" }}>{message}</h3>;
});
