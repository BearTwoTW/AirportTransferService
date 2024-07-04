import React, { useState, useRef, forwardRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { Typography, Badge, Box } from '@mui/material';
import { Error, SearchRounded, PermIdentityRounded, ShoppingCartOutlined, MenuRounded, HowToRegRounded } from '@mui/icons-material';
import { ArrowForwardIosSlenderDownOutlined, ArrowForwardIosSlenderTopOutlined } from '../CusSvgLibrary';
import { WebIconButton3 } from './WebButton';
import { WebDialog3 } from '../../components/WebSide/WebDialog';
import { WebInputSelect3 } from '../WebSide/WebInput';
import { ATS_WebSetting } from '../../js/APITS';
import { OfficeSiteContext } from '../../store/OfficeSiteContext'
import { tryCatchError } from '../../js/FunctionTS'
import { imageURL } from '../../js/Domain';

export const WebNavigation3 = (props) => {
  const { onSideBarOpen, officeSiteSetting, onScrollToTarget } = props
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
  /**網站設定查詢 */
  const getWebSetting = () => {
    ATS_WebSetting.ATS_WebSettingsSearch(pageSearch).then(res => {
      if (res.success) {
        setLOGO(res.data.filter(e => e.ws_id === "00001")[0].image);
      }
    });
  };

  // 一進頁面就查詢
  useEffect(() => {
    getWebSetting();
  }, [pageSearch]);


  /**
   * 預約及車資計算跳轉
   */
  const reserve_Click = ({ type }) => {
    navigate(`/Reserve?type=${type}`)
  };
  console.log("LOGO", LOGO)
  return (
    <React.Fragment>
      <header className="p-5 w-full bg-primary flex flex-col items-center top-0 z-10 fixed transition-all">
        <Box className="container mx-auto space-y-2.5 flex flex-col justify-center">
          <Box className="flex justify-between items-center ">
            <Box className="">
              <Typography sx={{ cursor: "pointer" }} component="a" onClick={() => navigate("/Index")}>
                <Box sx={{ height: "60px" }}>
                  {/* <img className={"h-full"} src={imageFile ? `${imageURL}${imageFile.path}` : ""}></img> */}
                  <img className={"h-full"} src={LOGO ? `${imageURL}${LOGO}` : "https://fakeimg.pl/250x100/?text=img"}></img>
                </Box>
              </Typography>
            </Box>
            <Box className="flex space-x-10 text-info font-bold max-md:hidden">
              <a className="cursor-pointer hover:opacity-80" onClick={onScrollToTarget}>預約流程</a>
              <a className="cursor-pointer hover:opacity-80" onClick={() => navigate("/Price")}>加價服務</a>
              <a className="cursor-pointer hover:opacity-80" onClick={() => reserve_Click({ type: "go" })}>預約及車資計算</a>
            </Box>
            <WebIconButton3
              className={"md:hidden"}
              size={"medium"}
              variant="contained"
              icon={<MenuRounded />}
              color={"headerInfo"}
              onClick={() => onSideBarOpen("left")}
            />
          </Box>
        </Box>
      </header>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </React.Fragment>
  );
};