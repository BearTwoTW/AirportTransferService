import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Error } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { FacebookIcon, InstagramIcon, LineIcon } from '../CusSvgLibrary';
import { OfficeSiteContext } from '../../store/OfficeSiteContext'
import { WebDialog3 } from '../../components/WebSide/WebDialog';
import { ATS_WebSetting } from '../../js/APITS';
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

  // 網頁設定資料查詢
  const [pageSearch, setPageSearch] = useState({
    ws_id: "",
    title: "",
    image: "",
    text1: "",
    text2: "",
    text3: "",
    html1: "",
    html2: "",
    html3: "",
    excel: "",
    page: 0,
    num_per_page: 0,
  });
  const [LOGO, setLOGO] = useState();
  const [data_G, setDataG] = useState();

  /**網站設定查詢 */
  const getWebSetting = () => {
    ATS_WebSetting.ATS_WebSettingsSearch(pageSearch).then(res => {
      if (res.success) {
        setLOGO(res.data.filter(e => e.ws_id === "00001")[0].image);
        setDataG(res.data.filter(e => e.ws_id === "00006")[0].html1);
      }
    });
  };

  // 一進頁面就查詢
  useEffect(() => {
    getWebSetting();
  }, [pageSearch]);

  return (
    <React.Fragment>
      <Box className={"w-full flex bg-[#f1f2f6] animate-fadeIn"}>
        <Box className={"container m-auto py-10"}>
          <Box className="flex justify-between items-center max-md:px-2.5 max-md:flex-col max-md:space-y-5">
            <Box>
              <img className="object-cover" src={LOGO ? `${imageURL}${LOGO}` : "https://fakeimg.pl/250x100/?text=img"}></img>
            </Box>
            <Box className="flex flex-col space-y-2.5">
              <Box dangerouslySetInnerHTML={{ __html: data_G }} />
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