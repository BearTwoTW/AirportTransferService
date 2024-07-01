import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Error } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { FacebookIcon, InstagramIcon, LineIcon } from '../CusSvgLibrary';
import { OfficeSiteContext } from '../../store/OfficeSiteContext'
import { WebDialog3 } from '../../components/WebSide/WebDialog';
import { CustomerAPI } from '../../js/APITS';
import { imageURL } from '../../js/Domain';
import { tryCatchError } from '../../js/FunctionTS';

// TODO 2023/12/08 by Sabrina 目前只有信用卡所以不放，有其他付款方式再放
// TODO 2023/12/08 by Sabrina 目前沒有訂閱

export const WebFooter3 = (props) => {
  const { officeSiteSetting } = props
  const OfficeSiteCtx = useContext(OfficeSiteContext)
  const navigate = useNavigate();
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  /**
   * [事件] 會員登出
   */
  const Signout = async () => {
    const Res = await CustomerAPI.Signout({})
    useDialog.current.handleOpen();
    if (Res.success) {
      setDialogData(({
        autoClose: true,
        DialogContent: <DialogsInner ref={useDialogInner} message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <Error className={"text-footerInfo"} />
            <span style={{ marginLeft: "0.5rem" }}>登出成功！</span>
          </span>} />,
      }));
      // 清除 localStorage
      localStorage.Web_username = (localStorage.isRemember === "Y" ? localStorage.Web_username : "")
      localStorage.cus_token = "";
      localStorage.Web_customerName = "";
      localStorage.customer_id = "";
      setTimeout(() => {
        navigate("/Login")
      }, 2000);
    } else console.error(Res)
  }

  /**查網站設定
   * [事件] 查網站設定
   */
  useEffect(() => {
    if (OfficeSiteCtx.officeSite) {
      try {
        setImageFile(OfficeSiteCtx.officeSite.files.find(ele => ele.type === "LOGO"))
      } catch (e) {
        tryCatchError(e)
        console.error("WebNavigation3 查網站設定 錯誤")
      }
    }
  }, [OfficeSiteCtx.officeSite]);
  return (
    <React.Fragment>
      <Box className={"w-full flex bg-primary animate-fadeIn"}>
        <Box className={"container m-auto py-10"}>
          <Box className="flex justify-between items-center max-md:px-2.5 max-md:flex-col max-md:space-y-5">
            <Box className="w-[250px] h-[100px]">
              <img src="https://fakeimg.pl/250x100/?text=img"></img>
            </Box>
            <Box className="flex flex-col space-y-2.5">
              <h2>聯繫方式</h2>
              <h3>客服資訊：</h3>
              <h3>手機直撥 55688 (每秒0.1元)</h3>
              <h3>市話直撥 55688</h3>
              <h3>(資訊服務費每分鐘3元，市話通話費另計，前10秒不計費)</h3>
            </Box>
          </Box>
          <Divider className={"w-full mt-8 mb-4"} />
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <p className="text-xs text-footerInfo">All Rights Reserved By 55688 Taiwan Taxi.</p>
          </Box>
        </Box>
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </React.Fragment >
  )
}

/**
 * @description [內容]Dialog
 */
const DialogsInner = (props) => {
  let { type, message } = props
  return (<h3 style={{ margin: "1.5rem" }}>{message}</h3>)
}