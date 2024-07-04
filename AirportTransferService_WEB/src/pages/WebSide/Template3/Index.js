import React, { useState, useEffect, useContext, useRef, forwardRef } from 'react';
import Carousel from 'react-material-ui-carousel'
import { WebCommodityCard3 } from '../../../components/WebSide/WebCard';
import { WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { useNavigate } from "react-router-dom";
import { imageURL } from '../../../js/Domain';
import { OfficeSiteContext } from '../../../store/OfficeSiteContext'
import { Box, Button } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { ATS_WebSetting } from '../../../js/APITS';
import { Helmet } from "react-helmet";
import fakeimg from '../../../images/FakeImages/fakeimg.png';
import { tryCatchError } from '../../../js/FunctionTS';
import Pagination from '@mui/material/Pagination';
import { isTest } from '../../../js/DomainTS';
import { WebDialog3 } from '../../../components/WebSide/WebDialog';

export default function Index() {
  const navigate = useNavigate();
  const [websiteSetting, setwebsiteSetting] = useState(null)
  const [ICO, setICO] = useState(null)

  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

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

  const [webData, setWebData] = useState([]);
  const [imageC, setImageC] = useState();
  const [imageD, setImageD] = useState();
  const [imageE, setImageE] = useState();
  const [imageF, setImageF] = useState();
  const [textF, setTextF] = useState();
  const [modalA, setModalA] = useState();
  const [modalB, setModalB] = useState();


  /**網站設定查詢 */
  const getWebSetting = () => {
    ATS_WebSetting.ATS_WebSettingsSearch(pageSearch).then(res => {
      if (res.success) {
        setWebData(res.data);
        setImageC(res.data.filter(e => e.ws_id === "00002")[0].image);
        setImageD(res.data.filter(e => e.ws_id === "00003")[0].image);
        setImageE(res.data.filter(e => e.ws_id === "00004")[0].image);
        setImageF(res.data.filter(e => e.ws_id === "00005")[0].image);
        setTextF(res.data.filter(e => e.ws_id === "00005")[0].text1);
        setModalA(res.data.filter(e => e.ws_id === "00007")[0].html1)
        setModalB(res.data.filter(e => e.ws_id === "00008")[0].html1)
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
  const confirm_Click = ({ type }) => {
    navigate(`/Reserve?type=${type}`)
  };


  // [事件]預約送機 & 預約接機 打開 Modal
  const reserve_Click = ({ e, type }) => {
    useDialog.current.handleOpen();
    setDialogData({
      id: type,
      maxWidth: "sm",
      DialogTitle: type === "go" ? "預約送機" : "預約接機",
      DialogContent: <DialogsInner type={type} ref={useDialogInner} html={type === "go" ? modalA : modalB} />,
      DialogActions: (
        <React.Fragment>
          <Button color="secondary" variant='outlined' onClick={dialogClose}>
            取消
          </Button>
          <Button color="secondary" variant='contained' onClick={() => confirm_Click({ type: type })}>
            前往預約
          </Button>
        </React.Fragment>)
    });
  }

  /**關閉Dialog  */
  const dialogClose = () => {
    useDialog.current.handleClose();
  };

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
        <title>
          {websiteSetting ? `${websiteSetting.website_name} | 首頁` : ""}
        </title>

      </Helmet>
      <Box className="flex max-lg:flex-col">
        <Box className="lg:flex-1 max-lg:w-full">
          <Box className="">
            <img className="w-full object-contain" src={imageC ? `${imageURL}${imageC}` : "https://fakeimg.pl/250x100/?text=img"}></img>
          </Box>
        </Box>
        <Box className="p-5 w-[400px] max-lg:w-full flex lg:flex-col lg:space-y-5 max-lg:space-x-5">
          <Box className="bg-[#3F7C38] hover:opacity-80 flex flex-col justify-center items-center w-full h-full rounded-lg space-y-2.5 max-lg:h-[200px] p-2.5 cursor-pointer" onClick={() => reserve_Click({ type: "go" })}>
            <FlightTakeoffIcon className="text-[#FFF]" fontSize='large' />
            <h1 className="text-[#FFF] font-bold max-md:hidden">預約送機/前往機場</h1>
            <h3 className="text-[#FFF] font-bold md:hidden">預約送機/前往機場</h3>
          </Box>
          <Box className="bg-[#EE732A] hover:opacity-80 flex flex-col justify-center items-center w-full h-full rounded-lg space-y-2.5 max-lg:h-[200px] p-2.5 cursor-pointer" onClick={() => reserve_Click({ type: "leave" })}>
            <FlightLandIcon className="text-[#FFF]" fontSize='large' />
            <h1 className="text-[#FFF] font-bold max-md:hidden">預約接機/離開機場</h1>
            <h3 className="text-[#FFF] font-bold md:hidden">預約接機/離開機場</h3>
          </Box>
        </Box>
      </Box>
      <Box className="object-cover">
        <img className="w-full object-contain" src={imageD ? `${imageURL}${imageD}` : "https://fakeimg.pl/250x100/?text=img"}></img>
      </Box>
      <Box className="flex flex-col space-y-5">
        <Box className="object-cover">
          <img className="w-full object-contain" src={imageE ? `${imageURL}${imageE}` : "https://fakeimg.pl/250x100/?text=img"}></img>
        </Box>
        <Box className="container mx-auto p-5">
          <WebTextIconButton3
            className={"h-20 rounded-full"}
            fullWidth={true}
            size={"medium"}
            color={"primary"}
            text={"立即預約"}
            onClick={() => reserve_Click({ type: "go" })} />
        </Box>
      </Box>
      <Box className="relative mt-5">
        <Box className="object-cover">
          <img className="w-full h-[420px] object-cover" src={imageF ? `${imageURL}${imageF}` : "https://fakeimg.pl/250x100/?text=img"}></img>
        </Box>
        <Box className="absolute inset-0 flex items-center justify-center text-center">
          <Box className="w-3/6 max-md:w-4/6">
            <h3>{textF}</h3>
          </Box>
        </Box>
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </React.Fragment>
  )
};

/** [內容]Dialog*/
const DialogsInner = forwardRef((props, ref) => {
  const { type, html } = props;

  if (type === "go") {
    return (
      <React.Fragment>
        <Box sx={{ p: "1rem" }}>
          <Box dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
      </React.Fragment>
    )
  } else if (type === "leave") {
    return (
      <React.Fragment>
        <Box sx={{ p: "1rem" }}>
          <Box dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
      </React.Fragment>
    )
  }
})