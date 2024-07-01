import { useRef, useState, useEffect, forwardRef } from "react";

import { Box } from "@mui/material";
import { Error } from "@mui/icons-material";
import { useForgetPasswordLogic } from "./ForgetPasswordLogic";

import { WebTextIconButton3 } from "../../../../../components/WebSide/WebButton";
import { WebDialog3 } from "../../../../../components/WebSide/WebDialog";
import { WebInputStandard3 } from "../../../../../components/WebSide/WebInput";

/** 忘記密碼UI */
const ForgetPasswordUI = (props) => {
  const { handlePageClick, ShowPage } = props;

  const { forgetPasswordCheck, forgetPasswordData, add_HandleInput, handleSendVerifyEmail, sendVerifyResult } = useForgetPasswordLogic();

  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  /** 寄送驗證碼的效果 */
  useEffect(() => {
    if (sendVerifyResult.success !== null) {
      useDialog.current.handleOpen();
      setDialogData({
        autoClose: true,
        DialogContent: (
          <DialogsInner
            ref={useDialogInner}
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{sendVerifyResult.message}</span>
              </span>
            }
          />
        ),
      });

      // 成功寄送驗證碼 => 回去登入畫面
      if (sendVerifyResult.success) {
        setTimeout(() => {
          handlePageClick(ShowPage.SignIn);
        }, 1500);
      }
    }
  }, [sendVerifyResult]);

  return (
    <>
      <Box className="flex items-center space-x-2.5">
        <hr className="w-6/12" />
        <span className="text-light-gray">or</span>
        <hr className="w-6/12" />
      </Box>
      <Box className="flex flex-col space-y-2.5">
        <WebInputStandard3
          type={"text"}
          name={"username"}
          required={true}
          value={forgetPasswordData.username}
          error={forgetPasswordCheck.username}
          placeholder={"請輸入信箱"}
          sxStyle={{ paddingRight: "0" }}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </Box>
      <Box className="flex justify-center">
        <WebTextIconButton3
          fullWidth={true}
          size={"large"}
          color="primary"
          text="寄送密碼驗證信"
          onClick={(e) => handleSendVerifyEmail(e)}
        />
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </>
  );
};

export default ForgetPasswordUI;

/** dialogs內容 */
const DialogsInner = forwardRef((props, ref) => {
  const { message } = props;
  return <h3 style={{ margin: "1.5rem" }}>{message}</h3>;
});