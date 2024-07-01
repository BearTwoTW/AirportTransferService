import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useContext } from "react";

import { Box, Grid } from "@mui/material";
import { Google, CheckCircleOutline, CheckCircle, Error } from "@mui/icons-material";
import { LineIcon, FacebookIcon } from "../../../../../components/CusSvgLibrary";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignUp } from "./SignUpLogic";

import { WebTextButton3, WebTextIconButton3 } from "../../../../../components/WebSide/WebButton";
import { WebDialog3 } from "../../../../../components/WebSide/WebDialog";
import { WebCheckboxLabel3 } from "../../../../../components/WebSide/WebCheckBox";
import { WebInputStandard3 } from "../../../../../components/WebSide/WebInput";

/** 註冊UI */
const SignUpUI = (props) => {
  const { singUpDataCheck, singUpData, add_HandleInput, handleSignUp } = useSignUp();

  return (
    <>
      {/* <Box className="flex flex-col space-y-2.5"> */}
      {/* <WebTextIconButton3
                      fullWidth={true}
                      size={"medium"}
                      color={"secondary"}
                      startIcon={<FacebookOutlined />}
                      text={"使用 Facebook 註冊"}
                      onClick={(e) => signup_Click({ e: e, type: "Facebook" })} /> */}
      {/* <WebTextIconButton3
                      fullWidth={true}
                      size={"medium"}
                      variant="outlined"
                      color={"secondary"}
                      startIcon={<Google className={"fill-info"} />}
                      text={"使用 Google 註冊"}
                      onClick={(e) => signin_Click({ e: e, type: "Google" })} />
                    <WebTextIconButton3
                      fullWidth={true}
                      size={"medium"}
                      variant="outlined"
                      color={"secondary"}
                      startIcon={<LineIcon className={"w-6 fill-info"} />}
                      text={"使用 LINE 註冊"}
                      onClick={(e) => signin_Click({ e: e, type: "LineIcon" })} /> */}
      {/* </Box> */}
      {/* <Box className="flex items-center space-x-2.5">
                    <hr className="w-6/12" />
                    <span className="text-light-gray">or</span>
                    <hr className="w-6/12" />
                  </Box> */}
      <Grid className="flex flex-col space-y-2.5">
        <WebInputStandard3
          type={"text"}
          name={"name"}
          value={singUpData.name}
          error={singUpDataCheck.name}
          required={true}
          placeholder={"請輸入姓名"}
          sxStyle={{ paddingRight: "0" }}
          onChangeEvent={(e) => add_HandleInput({ e: e })} />
        <WebInputStandard3
          type={"text"}
          name={"email"}
          value={singUpData.email}
          error={singUpDataCheck.email}
          required={true}
          placeholder={"請輸入信箱"}
          sxStyle={{ paddingRight: "0" }}
          onChangeEvent={(e) => add_HandleInput({ e: e })} />
        <WebInputStandard3
          password={true}
          type={"password"}
          name={"password"}
          value={singUpData.password}
          error={singUpDataCheck.password}
          required={true}
          placeholder={"請輸入密碼"}
          sxStyle={{ paddingRight: "0" }}
          onChangeEvent={(e) => add_HandleInput({ e: e })} />
        <WebInputStandard3
          password={true}
          type={"password"}
          name={"checkPassword"}
          value={singUpData.checkPassword}
          error={singUpDataCheck.checkPassword}
          required={true}
          placeholder={"請輸入確認密碼"}
          sxStyle={{ paddingRight: "0" }}
          onChangeEvent={(e) => add_HandleInput({ e: e })} />
      </Grid>
      <Box className="flex justify-center">
        <WebTextIconButton3
          fullWidth={true}
          size={"large"}
          color="primary"
          text="註冊"
          onClick={handleSignUp} />
      </Box>
    </>
  );
};

export default SignUpUI;