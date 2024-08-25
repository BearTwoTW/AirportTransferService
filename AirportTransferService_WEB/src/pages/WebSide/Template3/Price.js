import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Google, CheckCircleOutline, CheckCircle, Error } from '@mui/icons-material';
import { LineIcon } from '../../../components/CusSvgLibrary';
import { WebInputStandard3 } from '../../../components/WebSide/WebInput';
import { WebTextButton3, WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { WebCheckboxLabel3, WebCheckboxBasic3 } from '../../../components/WebSide/WebCheckBox';
import { WebDialog3 } from '../../../components/WebSide/WebDialog';
import { CusBackdropLoading } from '../../../components/CusProgressTS';
import { CusOutlinedSelect } from '../../../components/CusSelect';
import { OauthAPI } from '../../../js/APITS';
import { CustomerAPI, OrderAPI, ATS_FareSettings, ATS_CityAreaSettings, ATS_ExtraSettings, ATS_WebSetting } from '../../../js/APITS';
import { imageURL } from '../../../js/Domain';
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [websiteSetting, setwebsiteSetting] = useState(null);
  const [ICO, setICO] = useState(null)
  const [fareList, setFareList] = useState([]);
  const [extraList, setExtraList] = useState([]);

  // Model
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});
  // 下拉選單
  const [options, setOptions] = useState({
    cityAreaOptions: { // 城市區域
      cityOptions: [],
      areaOptions: []
    },
    extraOptions: [], // 加價服務
  });

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

  // 查車資
  const [fareSearch, setFareSearch] = useState({
    visible: "Y",
    road: null,
    section: null,
    fs_id: null,
    cms_id: null,
    city: "台北市",
    area: null,
    airport: null,
    terminal: null,
    page: 0,
    num_per_page: 0,
    excel: "",
    distinct: "Y"
  });

  // 查城市區域
  const [cityAreaSearch, setCityAreaSearch] = useState({
    visible: "Y",
    cas_id: null,
    zip: null,
    city: null,
    area: null,
    road: null,
    section: null,
    page: 0,
    num_per_page: 0,
    excel: "",
  });

  // 查加價
  const [extraSearch, setExtraSearch] = useState({
    visible: "Y",
    es_id: null,
    type: null,
    name: null,
    page: 0,
    num_per_page: 0,
    excel: "",
  });

  const [webData, setWebData] = useState([]);
  const [imageC, setImageC] = useState();
  const [imageD, setImageD] = useState();
  const [imageE, setImageE] = useState();
  const [imageF, setImageF] = useState();
  const [textF, setTextF] = useState();
  const [modalA, setModalA] = useState();
  const [modalB, setModalB] = useState();
  const [night, setNight] = useState();

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
        setNight(res.data.filter(e => e.ws_id === "00009")[0].html1)
      }
    });
  };

  /**
   * 查詢車資
   */
  const searchFare = async (fareSearch) => {
    ATS_FareSettings.ATS_FareSettingsSearch(fareSearch).then(async res => {
      if (res.success) {
        setFareList(res.data);
      }
    });
  };

  /**
   * 查詢城市區域
   */
  const searchCityArea = async (cityAreaSearch) => {
    ATS_CityAreaSettings.ATS_CityAreaSettingsSearch(cityAreaSearch).then(async res => {
      if (res.success) {
        setOptions(prev => {
          const cityOptions = res.data
            .map(item => item.city)
            .filter((city, index, self) => self.indexOf(city) === index)
            .map((name, index) => ({ key: index, name }));

          const uniqueAreaMap = new Map();
          res.data.forEach((item, index) => {
            if (!uniqueAreaMap.has(item.city)) {
              uniqueAreaMap.set(item.city, new Set());
            }
            uniqueAreaMap.get(item.city).add(item.area);
          });

          const areaOptions = [];
          let keyIndex = 0;
          uniqueAreaMap.forEach((areas, city) => {
            areas.forEach(area => {
              areaOptions.push({ key: keyIndex++, city, name: area });
            });
          });

          return {
            ...prev,
            cityAreaOptions: {
              cityOptions,
              areaOptions,
            },
          };
        });
      }
    })
  };

  /**
   * 查詢加購
   */
  const searchExtra = async (extraSearch) => {
    ATS_ExtraSettings.ATS_ExtraSettingsSearch(extraSearch).then(async res => {
      if (res.success) {
        setExtraList(res.data);
      }
    });
  };

  useEffect(() => {
    getWebSetting();
    searchCityArea(cityAreaSearch);
    searchExtra(extraSearch);
  }, [cityAreaSearch, extraSearch]);

  useEffect(() => {
    searchFare(fareSearch);
  }, [fareSearch]);

  /**[事件]下拉選單 */
  // const seacrh_HandleSelect = (e) => {
  //   const { id, name, value, key } = e.target;
  //   const val = value === null ? null : value[key];

  //   if (name === "city") {
  //     setFareSearch(prev => ({
  //       ...prev,
  //       area: null,
  //       [name]: val,
  //     }));
  //   } else {
  //     setFareSearch(prev => ({
  //       ...prev,
  //       [name]: val,
  //     }));
  //   }
  // };

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
      <Box className="container mx-auto">
        <Helmet>
          <link rel="icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
          <title>
            {websiteSetting ? `${websiteSetting.website_name} | 登入` : ""}
          </title>
        </Helmet>
        <Box className="flex justify-center pt-10 pb-2.5 border-b">
          <h1 className="text-[#192F64]">加價服務項目及收費標準</h1>
        </Box>
        <Box className="container mx-auto my-5 space-y-5">
          {/* <Grid container>
          <Grid item lg={6} sm={6} xs={12}>
            <CusOutlinedSelect
              id={"add--city"}
              name={"city"}
              label={"城市"}
              options={options.cityAreaOptions.cityOptions}
              optionKey={"name"}
              value={options.cityAreaOptions.cityOptions.some(item => item.name === fareSearch.city) ? options.cityAreaOptions.cityOptions.find(item => item.name === fareSearch.city) : null}
              onChangeEvent={(e) => seacrh_HandleSelect(e)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <CusOutlinedSelect
              id={"add--area"}
              name={"area"}
              label={"區域"}
              options={options.cityAreaOptions.areaOptions.filter(item => item.city === fareSearch.city)}
              optionKey={"name"}
              value={options.cityAreaOptions.areaOptions.some(item => item.name === fareSearch.area) ? options.cityAreaOptions.areaOptions.find(item => item.name === fareSearch.area) : null}
              onChangeEvent={(e) => seacrh_HandleSelect(e)}
            />
          </Grid>
        </Grid>
        <Box className="border rounded-lg">
          <Box className="flex max-md:flex-col">
            <Box className="w-full pb-5 space-y-5">
              <Box className="bg-[#192F64] h-[60px] rounded-t-lg max-md:rounded-t-lg flex justify-center items-center">
                <h2 className="text-[#FFF] self-center">車資查詢</h2>
              </Box>
              <Box className="flex flex-wrap justify-center gap-2.5">
                {fareList.map((item, index) => (
                  <Box key={item.fs_id + index} className="bg-[#EEEEEE] text-info p-2 rounded-lg">{`${item.area} $${item.price}`}</Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box> */}
          <Box className="border rounded-lg">
            <Box className="flex max-md:flex-col">
              <Box className="w-3/6 max-md:w-full border-r pb-5 space-y-5">
                <Box className="bg-[#192F64] h-[60px] rounded-tl-lg max-md:rounded-t-lg flex justify-center items-center">
                  <h2 className="text-[#FFF] self-center">夜間加成(23:00~05:59)</h2>
                </Box>
                <Box className="flex flex-col justify-center items-center p-10">
                  <Box sx={{ p: "1rem" }}>
                    <Box dangerouslySetInnerHTML={{ __html: night }} />
                  </Box>
                </Box>
              </Box>
              <Box className="w-3/6 max-md:w-full pb-5 space-y-5">
                <Box className="bg-[#192F64] h-[60px] rounded-tr-lg max-md:rounded-t-lg flex justify-center items-center">
                  <h2 className="text-[#FFF] self-center">加價服務</h2>
                </Box>
                <Box className="flex flex-wrap justify-center items-center gap-2.5 p-20">
                  {extraList.map((item, index) => (
                    <Box key={item.es_id + index} className="bg-[#EEEEEE] text-info p-2 rounded-lg">{`${item.name} $${item.price}`}</Box>
                  ))}
                </Box>
              </Box>
            </Box>
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
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
    </React.Fragment>
  )
}

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


