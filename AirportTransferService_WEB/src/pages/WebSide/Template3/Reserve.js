import React, { useRef, useState, useContext, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Tabs, Tab, Typography, TextField, Autocomplete, Button, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import "moment/locale/zh-tw";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocationOnOutlined, LocationOn, CalendarMonth, PeopleAltOutlined, DirectionsCar, Add, EditNote, AccessTime, Backpack } from '@mui/icons-material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Outlet, Link, NavLink, Navigate } from 'react-router-dom'
import { WebDialog3 } from '../../../components/WebSide/WebDialog';
import { CusBackdropLoading } from '../../../components/CusProgressTS';
import { WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { TabPanel } from '../../../components/CusTab';
import { CusInput } from '../../../components/CusInput';
import { CusOutlinedSelect } from '../../../components/CusSelect';
import { CusDatePicker } from '../../../components/CusDatePicker';
import { CusTimePicker } from '../../../components/CusTimePicker';
import { CustomerAPI } from "../../../js/APITS";
import { localStorageClear } from "../../../js/Function";
import { OfficeSiteContext } from '../../../store/OfficeSiteContext'
import { ATS_OrderMaster, ATS_CityAreaSettings, ATS_AirportTerminalSettings, ATS_CarModelSettings, ATS_ExtraSettings, ATS_PriceLinkSettings } from '../../../js/APITS';

export default function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialType = query.get('type') || '0';

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});
  const [backdropOpen, setBackdropOpen] = useState(false);

  // 新增訂單
  const [orderAdd, setOrderAdd] = useState({
    visible: "Y",
    type: "送機",
    city: null,
    area: null,
    road: null,
    section: null,
    address: null,
    airport: null,
    terminal: null,
    flght_number: null,
    date_travel: null,
    time_travel: null,
    number_passenger: null,
    number_bags: null,
    cms_id: null,
    es_ids: null,
    signboard_title: null,
    signboard_content: null,
    name_purchaser: null,
    phone_purchaser: null,
    email_purchaser: null,
    name_passenger: null,
    phone_passenger: null,
    email_passenger: null,
    calculation: null,
  });

  // 城市區域查詢
  const [cityAreaSearch, setCityAreaSearch] = useState({
    visible: null,
    zip: null,
    road: null,
    section: null,
    cas_id: null,
    city: null,
    area: null,
    excel: "",
    page: 0,
    num_per_page: 0,
  })

  // 機場航廈查詢
  const [airPortSearch, setAirPortSearch] = useState({
    visible: null,
    ats_id: null,
    excel: null,
    airport: null,
    terminal: null,
    excel: "",
    page: 0,
    num_per_page: 0,
  })

  // 車型查詢
  const [carModelSearch, setCarModelSearch] = useState({
    visible: null,
    name: null,
    max_passengers: null,
    max_luggage: null,
    max_child_seats: null,
    max_service_extras: null,
    cms_id: null,
    excel: "",
    page: 0,
    num_per_page: 0,
  })

  // 加價查詢
  const [extraSearch, setExtraSearch] = useState({
    visible: null,
    es_id: null,
    type: null,
    name: null,
    excel: "",
    page: 0,
    num_per_page: 0,
  })

  // 下拉選單
  const [options, setOptions] = useState({
    cityAreaOptions: { // 城市區域
      cityOptions: [],
      areaOptions: []
    },
    airPortOptions: { // 機場航廈 
      airportOptions: [],
      terminalOptions: []
    },
    carModelOptions: [], // 車型
    extraOptions: [], // 加價服務
    passengerOptions: [], // 人數
    bagsOptions: [], // 行李數
    extraCount: [
      { key: 0, name: "1" },
      { key: 1, name: "2" },
    ], // 加價服務
  });

  // Tabs 狀態
  // 將 'type' 參數轉換為 tab 的 index
  const tabMapping = {
    'go': 0,
    'leave': 1,
  };
  const initialTab = tabMapping[initialType];
  const [tabsValue, setTabsValue] = useState(initialTab);
  const useTabContent = useRef([]);
  useTabContent.current = [0, 1].map(() => React.createRef())

  const searchSelectOption = async () => {
    // 查城市區域 (下拉選單用)
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
    // 查機場航廈 (下拉選單用)
    ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsSearch(airPortSearch).then(async res => {
      if (res.success) {
        setOptions(prev => ({
          ...prev,
          airPortOptions: {
            airportOptions: res.data
              .map(item => item.airport)
              .filter((airport, index, self) => self.indexOf(airport) === index)
              .map((name, index) => ({ key: index, name })),
            terminalOptions: res.data.map((item, index) => { return { key: index, airport: item.airport, name: item.terminal } }),
          }
        }));
      }
    })
    // 查車型 (下拉選單用)
    ATS_CarModelSettings.ATS_CarModelSettingsSearch(carModelSearch).then(async res => {
      if (res.success) {
        // 找到 max_passengers 最大的物件
        let maxPassengers = 0;
        let maxLuggage = 0;
        res.data.forEach(item => {
          if (item.max_passengers > maxPassengers) {
            maxPassengers = item.max_passengers;
          }
        });
        // 找到 max_luggage 最大的物件
        res.data.forEach(item => {
          if (item.max_luggage > maxLuggage) {
            maxLuggage = item.max_luggage;
          }
        });

        // 生成人數下拉選單選項
        const passengersOptions = [];
        for (let i = 1; i <= maxPassengers; i++) {
          passengersOptions.push({ key: i - 1, name: i.toString() });
        }

        // 生成行李數下拉選單選項
        const luggageOptions = [];
        for (let i = 1; i <= maxPassengers; i++) {
          luggageOptions.push({ key: i - 1, name: i.toString() });
        }

        setOptions(prev => ({
          ...prev,
          carModelOptions: res.data,
          passengerOptions: passengersOptions,
          bagsOptions: luggageOptions,
        }));
      }
    })
    // 查加購 (下拉選單用)
    ATS_ExtraSettings.ATS_ExtraSettingsSearch(extraSearch).then(async res => {
      if (res.success) {
        setOptions(prev => ({
          ...prev,
          extraOptions: res.data,
        }));
      }
    })
  }

  useEffect(() => {
    searchSelectOption();
  }, [cityAreaSearch, airPortSearch, carModelSearch, extraSearch]);

  // 日期選擇器語系設定
  moment.updateLocale("zh-tw", {
    weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
    week: { dow: 0 }
  });

  useEffect(() => {
    setTabsValue(initialTab);
  }, [initialTab]);

  const handleTabsChange = (e, newValue) => {
    setTabsValue(newValue);
    navigate(`/Reserve?type=${Object.keys(tabMapping)[newValue]}`);
  };

  // [事件]預約送機 & 預約接機 打開 Modal
  const reserve_next = ({ e, type, orderAdd, signboard, extra, sameDetail, price }) => {
    console.log(orderAdd)
    useDialog.current.handleOpen();
    setDialogData({
      id: type,
      maxWidth: "md",
      DialogTitle: "車資金額確認及前往付款",
      DialogContent: <DialogsInner type={type} ref={useDialogInner} orderAdd={orderAdd} price={price} options={options} signboard={signboard} extra={extra} sameDetail={sameDetail} />,
      DialogActions: (
        <React.Fragment>
          <Button color="secondary" variant='outlined' onClick={dialogClose}>
            上一步
          </Button>
          <Button color="primary" variant='contained' onClick={(e) => { reserve_confirm({ e: e, orderAdd: orderAdd, price: price }) }}>
            確定預約/結帳
          </Button>
        </React.Fragment>)
    });
  }

  const reserve_confirm = ({ e, orderAdd, price }) => {
    // 建立訂單並跳轉至付款頁
    ATS_OrderMaster.ATS_OrderMasterCreate({
      ...orderAdd,
      calculation: "N",
    }).then(async res => {
      if (res.success) {
        ATS_PriceLinkSettings.ATS_PriceLinkSettingsSearch({
          visible: "Y",
          price: price,
        }).then(async res => {
          if (res.success) {
            setBackdropOpen(true);

            // 延遲兩秒才call api，看起來比較有在等待的感覺?
            setTimeout(() => {
              dialogClose();
              setBackdropOpen(false);
              // 跳轉
              window.location.href = res.data[0].link;
            }, 2000);
          }
        })
      } else {
        console.log("訂單建立失敗!")
      }
    })
  }

  // [事件]預約送機 & 預約接機 打開 Modal 超出限制提醒
  const reserve_error = ({ e, type, message }) => {
    useDialog.current.handleOpen();
    setDialogData({
      id: type,
      DialogTitle: "預約提醒",
      DialogContent: <DialogsInner type={type} ref={useDialogInner} message={message} />,
      DialogActions: (
        <React.Fragment>
          <Button color="secondary" variant='outlined' onClick={dialogClose}>
            關閉
          </Button>
          <Button color="primary" variant='contained' onClick={dialogClose}>
            確定
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
        <Box className="mt-40 mb-40 border rounded-lg">
          <Box>
            <Tabs
              sx={{
                paddingTop: "20px",
                margin: "0 20px",
                borderBottom: "1px solid #e0e0e0",
              }}
              value={tabsValue}
              onChange={handleTabsChange}
              variant="scrollable"
              textColor="secondary"
              indicatorColor="secondary"
              allowScrollButtonsMobile
              aria-label="scrollable force tabs">
              <Tab label={"預約送機/前往機場"} icon={<FlightTakeoffIcon />} aria-controls={`simple-tab-go`} />
              <Tab label={"預約接機/離開機場"} icon={<FlightLandIcon />} aria-controls={`simple-tab-leave`} />
            </Tabs>
          </Box>
          <Box className="p-5">
            <GoTabPanel
              value={tabsValue}
              index={0}
              options={options}
              reserve_next={reserve_next}
              reserve_error={reserve_error}
              ref={useTabContent.current[0]}
            />
            <LeaveTabPanel
              value={tabsValue}
              index={1}
              options={options}
              reserve_next={reserve_next}
              reserve_error={reserve_error}
              ref={useTabContent.current[1]}
            />
          </Box>
        </Box>
      </Box>
      <WebDialog3 ref={useDialog} info={dialogData} />
      <CusBackdropLoading open={backdropOpen} text={"頁面跳轉中"} />
    </React.Fragment>
  )
};


/** [內容]送機 */
const GoTabPanel = forwardRef((props, ref) => {
  const { value, index, options, reserve_next, reserve_error } = props

  // 新增訂單
  const [orderAdd, setOrderAdd] = useState({
    visible: "Y",
    type: "送機",
    city: null,
    area: null,
    road: null,
    section: null,
    address: null,
    airport: null,
    terminal: null,
    flght_number: null,
    date_travel: null,
    time_travel: null,
    number_passenger: null,
    number_bags: null,
    cms_id: null,
    es_ids: null,
    signboard_title: null,
    signboard_content: null,
    name_purchaser: null,
    phone_purchaser: null,
    email_purchaser: null,
    name_passenger: null,
    phone_passenger: null,
    email_passenger: null,
    calculation: "Y"
  });

  // 驗證有沒有填寫
  const initOrderAddCheck = {
    type: false,
    city: false,
    area: false,
    road: false,
    section: false,
    address: false,
    airport: false,
    terminal: false,
    flght_number: false,
    date_travel: false,
    time_travel: false,
    number_passenger: false,
    number_bags: false,
    cms_id: false,
    name_purchaser: false,
    phone_purchaser: false,
    email_purchaser: false,
    name_passenger: false,
    phone_passenger: false,
    email_passenger: false,
  }
  const [orderAddCheck, setOrderAddCheck] = useState(initOrderAddCheck);
  const [carModelOptions, setCarModelOptions] = useState(options.carModelOptions);

  // checkbox 狀態
  const [checkboxState, setCheckboxState] = useState({
    signboard: false,
    extra: false,
    sameDetail: false,
  });

  /**新增 input */
  const add_handelInput = e => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    if (name === "date_travel") {
      let formattedValue = val;
      formattedValue = formattedValue.split('T')[0];

      setOrderAdd(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else if (name === "time_travel") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val + ":00"
      }));
    } else {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val
      }));
    }
  };

  /**[事件]下拉選單 */
  const add_HandleSelect = (e) => {
    const { id, name, value, key } = e.target;
    const val = value === null ? null : value[key];

    if (name === "city") {
      setOrderAdd(prev => ({
        ...prev,
        area: null,
        [name]: val,
      }));
    } else if (name === "airport") {
      setOrderAdd(prev => ({
        ...prev,
        terminal: null,
        [name]: val,
      }));
    } else if (name === "number_passenger") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));

      const passengerCount = parseInt(val) || 0; // 選擇人數
      const luggageCount = parseInt(orderAdd.number_bags ? orderAdd.number_bags : 0) || 0; // 選擇行李數

      const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

      setCarModelOptions(filteredVehicles);
    } else if (name === "number_bags") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));

      const passengerCount = parseInt(orderAdd.number_passenger ? orderAdd.number_passenger : 0) || 0; // 選擇人數
      const luggageCount = parseInt(val) || 0; // 選擇行李數

      const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

      setCarModelOptions(filteredVehicles);
    } else if (name === "es_ids") {
      let arr = orderAdd.es_ids ? [...orderAdd.es_ids] : []; // 使用展開運算符號來複製陣列
      const index = arr.findIndex(item => item.es_id === id); // 找到相同 es_id 的物件索引

      if (index !== -1) {
        // 如果已經存在相同 es_id，更新 count
        if (val === null) {
          // 如果 count 為 0，移除該物件
          arr = arr.filter(item => item.es_id !== id);
        } else {
          arr[index].count = val;
        }
      } else {
        // 如果不存在相同 es_id，新增一個新物件
        arr.push({
          es_id: id,
          count: val,
        });
      }

      setOrderAdd(prev => ({
        ...prev,
        [name]: arr.length > 0 ? arr : null,
      }))
    } else {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "signboard") { // 舉牌
      // 如果勾選, 就把舉牌加入es_ids欄位
      let arr = [];
      if (checked) {
        arr.push(
          {
            es_id: options.extraOptions.find(item => item.type === "舉牌").es_id,
            count: "1",
          }
        );
      }
      // 更新加購
      setOrderAdd(prev => ({
        ...prev,
        es_ids: checked ? arr : null,
      }))
    } else if (name === "sameDetail" && checked) { // 同訂購人
      setOrderAdd(prev => ({
        ...prev,
        name_passenger: orderAdd.name_purchaser,
        phone_passenger: orderAdd.phone_purchaser,
        email_passenger: orderAdd.email_purchaser,
      }));
    } else {
      setOrderAdd(prev => ({
        ...prev,
        name_passenger: null,
        phone_passenger: null,
        email_passenger: null,
      }));
    }

    setCheckboxState({
      ...checkboxState,
      [name]: checked,
    });
  };

  const confrm_Click = ({ e, type, cal, orderAdd, signboard, extra, sameDetail }) => {
    if (!orderAdd.type || !orderAdd.city || !orderAdd.area || !orderAdd.road || !orderAdd.address
      || !orderAdd.airport || !orderAdd.terminal || !orderAdd.flght_number || !orderAdd.date_travel || !orderAdd.time_travel
      || !orderAdd.number_passenger || !orderAdd.number_bags || !orderAdd.cms_id
      || !orderAdd.name_purchaser || !orderAdd.phone_purchaser || !orderAdd.email_purchaser
      || !orderAdd.name_passenger || !orderAdd.phone_passenger || !orderAdd.email_passenger
    ) {
      setOrderAddCheck({
        type: !orderAdd.type ? true : false,
        city: !orderAdd.city ? true : false,
        area: !orderAdd.area ? true : false,
        road: !orderAdd.road ? true : false,
        address: !orderAdd.address ? true : false,
        airport: !orderAdd.airport ? true : false,
        terminal: !orderAdd.terminal ? true : false,
        flght_number: !orderAdd.flght_number ? true : false,
        date_travel: !orderAdd.date_travel ? true : false,
        time_travel: !orderAdd.time_travel ? true : false,
        number_passenger: !orderAdd.number_passenger ? true : false,
        number_bags: !orderAdd.number_bags ? true : false,
        cms_id: !orderAdd.cms_id ? true : false,
        name_purchaser: !orderAdd.name_purchaser ? true : false,
        phone_purchaser: !orderAdd.phone_purchaser ? true : false,
        email_purchaser: !orderAdd.email_purchaser ? true : false,
        name_passenger: !orderAdd.name_passenger ? true : false,
        phone_passenger: !orderAdd.phone_passenger ? true : false,
        email_passenger: !orderAdd.email_passenger ? true : false,
      })
    } else {
      // 金額試算
      ATS_OrderMaster.ATS_OrderMasterCreate(orderAdd).then(async res => {
        if (res.success) {
          reserve_next({ e: e, type: type, orderAdd: orderAdd, signboard: signboard, extra: extra, sameDetail: sameDetail, price: res.data })
        } else {
          reserve_error({ e: e, type: "error", message: res.message })
        }
      })
    }
  };

  return (
    <TabPanel value={value} index={index}>
      <Grid container className="space-y-2.5">
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOnOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">上車地點</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--city"}
                  name={"city"}
                  label={"城市"}
                  options={options.cityAreaOptions.cityOptions}
                  optionKey={"name"}
                  error={orderAddCheck.city}
                  value={options.cityAreaOptions.cityOptions.some(item => item.name === orderAdd.city) ? options.cityAreaOptions.cityOptions.find(item => item.name === orderAdd.city) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--area"}
                  name={"area"}
                  label={"區域"}
                  options={options.cityAreaOptions.areaOptions.filter(item => item.city === orderAdd.city)}
                  optionKey={"name"}
                  error={orderAddCheck.area}
                  value={options.cityAreaOptions.areaOptions.some(item => item.name === orderAdd.area) ? options.cityAreaOptions.areaOptions.find(item => item.name === orderAdd.area) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.city ? false : true}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--road"}
                  name={"road"}
                  label={"路"}
                  error={orderAddCheck.road}
                  value={orderAdd.road}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--section"}
                  name={"section"}
                  label={"段"}
                  error={orderAddCheck.section}
                  value={orderAdd.section}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--address"}
                  name={"address"}
                  label={"地址"}
                  error={orderAddCheck.address}
                  value={orderAdd.address}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOn color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">下車地點</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--airport"}
                  name={"airport"}
                  label={"機場"}
                  options={options.airPortOptions.airportOptions}
                  optionKey={"name"}
                  error={orderAddCheck.airport}
                  value={options.airPortOptions.airportOptions.some(item => item.name === orderAdd.airport) ? options.airPortOptions.airportOptions.find(item => item.name === orderAdd.airport) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--terminal"}
                  name={"terminal"}
                  label={"航廈"}
                  options={options.airPortOptions.terminalOptions.filter(item => item.airport === orderAdd.airport)}
                  optionKey={"name"}
                  error={orderAddCheck.terminal}
                  value={options.airPortOptions.terminalOptions.some(item => item.name === orderAdd.terminal) ? options.airPortOptions.terminalOptions.find(item => item.name === orderAdd.terminal) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <CalendarMonth color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--flght_number"}
                  name={"flght_number"}
                  label={"航班號碼"}
                  error={orderAddCheck.flght_number}
                  value={orderAdd.flght_number}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusDatePicker
                  id={"add--date_travel"}
                  name={"date_travel"}
                  label={"出發日期"}
                  views={["year", "month", "day"]}
                  error={orderAddCheck.date_travel}
                  value={orderAdd.date_travel}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusTimePicker
                  id={"add--time_travel"}
                  name={"time_travel"}
                  label={orderAdd.type === "送機" ? "乘車時間" : "航班抵達時間"}
                  views={['hours', 'minutes']}
                  error={orderAddCheck.time_travel}
                  value={orderAdd.time_travel}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <PeopleAltOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">人數及行李</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--number_passenger"}
                  name={"number_passenger"}
                  label={"人數"}
                  options={options.passengerOptions}
                  optionKey={"name"}
                  error={orderAddCheck.number_passenger}
                  value={options.passengerOptions.some(item => item.name === orderAdd.number_passenger) ? options.passengerOptions.find(item => item.name === orderAdd.number_passenger) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--number_bags"}
                  name={"number_bags"}
                  label={"行李數"}
                  options={options.bagsOptions}
                  optionKey={"name"}
                  error={orderAddCheck.number_bags}
                  value={options.bagsOptions.some(item => item.name === orderAdd.number_bags) ? options.bagsOptions.find(item => item.name === orderAdd.number_bags) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.number_passenger ? false : true}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <DirectionsCar color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">車型</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--cms_id"}
                  name={"cms_id"}
                  label={"車型"}
                  options={carModelOptions}
                  optionKey={"cms_id"}
                  error={orderAddCheck.cms_id}
                  value={carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? carModelOptions.find(item => item.cms_id === orderAdd.cms_id) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.number_passenger && orderAdd.number_bags ? false : true}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <Add color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">加價服務</Typography>
            </Box>
            <Grid container>
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="signboard" checked={checkboxState.signboard} onChange={handleCheckboxChange} />}
                    label="接機舉牌 (+$200)"
                  />
                </FormGroup>
              </Grid>
              {checkboxState.signboard ?
                <React.Fragment>
                  <Grid item lg={12} sm={12} xs={12}>
                    <CusInput
                      id={"add--signboard_title"}
                      name={"signboard_title"}
                      label={"舉牌標題"}
                      error={orderAddCheck.signboard_title}
                      value={orderAdd.signboard_title}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                  <Grid item lg={12} sm={12} xs={12}>
                    <CusInput
                      multiline
                      rows={4}
                      id={"add--signboard_content"}
                      name={"signboard_content"}
                      label={"舉牌內容"}
                      error={orderAddCheck.signboard_content}
                      value={orderAdd.signboard_content}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                </React.Fragment>
                : null}
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="extra" checked={checkboxState.extra} onChange={handleCheckboxChange} />}
                    label="加購兒童安全座椅及增高墊 (+$200)"
                  />
                </FormGroup>
              </Grid>
              {checkboxState.extra ?
                options.extraOptions.filter(filterEle => filterEle.type !== "舉牌").map((mapEle, index) => {
                  return (
                    <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                      <CusOutlinedSelect
                        id={mapEle.es_id}
                        name={"es_ids"}
                        label={mapEle.name}
                        options={options.extraCount}
                        optionKey={"name"}
                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                        onChangeEvent={(e) => add_HandleSelect(e)}
                      />
                    </Grid>
                  )
                })
                : null}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <EditNote color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">填寫基本資料</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--name_purchaser"}
                  name={"name_purchaser"}
                  label={"訂購人姓名"}
                  error={orderAddCheck.name_purchaser}
                  value={orderAdd.name_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--phone_purchaser"}
                  name={"phone_purchaser"}
                  label={"訂購人電話"}
                  error={orderAddCheck.phone_purchaser}
                  value={orderAdd.phone_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--email_purchaser"}
                  name={"email_purchaser"}
                  label={"訂購人信箱"}
                  error={orderAddCheck.email_purchaser}
                  value={orderAdd.email_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="sameDetail" checked={checkboxState.sameDetail} onChange={handleCheckboxChange} />}
                    label="乘客同訂購人"
                  />
                </FormGroup>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--name_passenger"}
                  name={"name_passenger"}
                  label={"乘客姓名"}
                  error={orderAddCheck.name_passenger}
                  value={orderAdd.name_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--phone_passenger"}
                  name={"phone_passenger"}
                  label={"乘客電話"}
                  error={orderAddCheck.phone_passenger}
                  value={orderAdd.phone_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--email_passenger"}
                  name={"email_passenger"}
                  label={"乘客信箱"}
                  error={orderAddCheck.email_passenger}
                  value={orderAdd.email_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
            <Box className="flex justify-end">
              <WebTextIconButton3
                size={"medium"}
                color={"secondary"}
                text={"下一步"}
                onClick={(e) => confrm_Click({ e: e, type: "go", cal: "Y", orderAdd: orderAdd, signboard: checkboxState.signboard, extra: checkboxState.extra, sameDetail: checkboxState.sameDetail })}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </TabPanel>
  )
})

/** [內容]送機 */
const LeaveTabPanel = forwardRef((props, ref) => {
  const { value, index, options, reserve_next, reserve_error } = props

  // 新增訂單
  const [orderAdd, setOrderAdd] = useState({
    visible: "Y",
    type: "接機",
    city: null,
    area: null,
    road: null,
    section: null,
    address: null,
    airport: null,
    terminal: null,
    flght_number: null,
    date_travel: null,
    time_travel: null,
    number_passenger: null,
    number_bags: null,
    cms_id: null,
    es_ids: null,
    signboard_title: null,
    signboard_content: null,
    name_purchaser: null,
    phone_purchaser: null,
    email_purchaser: null,
    name_passenger: null,
    phone_passenger: null,
    email_passenger: null,
    calculation: "Y"
  });

  // 驗證有沒有填寫
  const initOrderAddCheck = {
    type: false,
    city: false,
    area: false,
    road: false,
    section: false,
    address: false,
    airport: false,
    terminal: false,
    flght_number: false,
    date_travel: false,
    time_travel: false,
    number_passenger: false,
    number_bags: false,
    cms_id: false,
    name_purchaser: false,
    phone_purchaser: false,
    email_purchaser: false,
    name_passenger: false,
    phone_passenger: false,
    email_passenger: false,
  }
  const [orderAddCheck, setOrderAddCheck] = useState(initOrderAddCheck);
  const [carModelOptions, setCarModelOptions] = useState(options.carModelOptions);

  // checkbox 狀態
  const [checkboxState, setCheckboxState] = useState({
    signboard: false,
    extra: false,
    sameDetail: false,
  });

  /**新增 input */
  const add_handelInput = e => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;
    console.log(val)

    if (name === "date_travel") {
      let formattedValue = val;
      formattedValue = formattedValue.split('T')[0];

      setOrderAdd(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else if (name === "time_travel") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val + ":00"
      }));
    } else {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val
      }));
    }
  };

  /**[事件]下拉選單 */
  const add_HandleSelect = (e) => {
    const { id, name, value, key } = e.target;
    const val = value === null ? null : value[key];

    if (name === "city") {
      setOrderAdd(prev => ({
        ...prev,
        area: null,
        [name]: val,
      }));
    } else if (name === "airport") {
      setOrderAdd(prev => ({
        ...prev,
        terminal: null,
        [name]: val,
      }));
    } else if (name === "number_passenger") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));

      const passengerCount = parseInt(val) || 0; // 選擇人數
      const luggageCount = parseInt(orderAdd.number_bags ? orderAdd.number_bags : 0) || 0; // 選擇行李數

      const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

      setCarModelOptions(filteredVehicles);
    } else if (name === "number_bags") {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));

      const passengerCount = parseInt(orderAdd.number_passenger ? orderAdd.number_passenger : 0) || 0; // 選擇人數
      const luggageCount = parseInt(val) || 0; // 選擇行李數

      const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

      setCarModelOptions(filteredVehicles);
    } else if (name === "es_ids") {
      let arr = orderAdd.es_ids ? [...orderAdd.es_ids] : []; // 使用展開運算符號來複製陣列
      const index = arr.findIndex(item => item.es_id === id); // 找到相同 es_id 的物件索引

      if (index !== -1) {
        // 如果已經存在相同 es_id，更新 count
        if (val === null) {
          // 如果 count 為 0，移除該物件
          arr = arr.filter(item => item.es_id !== id);
        } else {
          arr[index].count = val;
        }
      } else {
        // 如果不存在相同 es_id，新增一個新物件
        arr.push({
          es_id: id,
          count: val,
        });
      }

      setOrderAdd(prev => ({
        ...prev,
        [name]: arr.length > 0 ? arr : null,
      }))
    } else {
      setOrderAdd(prev => ({
        ...prev,
        [name]: val,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "signboard") { // 舉牌
      // 如果勾選, 就把舉牌加入es_ids欄位
      let arr = [];
      if (checked) {
        arr.push(
          {
            es_id: options.extraOptions.find(item => item.type === "舉牌").es_id,
            count: "1",
          }
        );
      }
      // 更新加購
      setOrderAdd(prev => ({
        ...prev,
        es_ids: checked ? arr : null,
      }))
    } else if (name === "sameDetail" && checked) { // 同訂購人
      setOrderAdd(prev => ({
        ...prev,
        name_passenger: orderAdd.name_purchaser,
        phone_passenger: orderAdd.phone_purchaser,
        email_passenger: orderAdd.email_purchaser,
      }));
    } else {
      setOrderAdd(prev => ({
        ...prev,
        name_passenger: null,
        phone_passenger: null,
        email_passenger: null,
      }));
    }

    setCheckboxState({
      ...checkboxState,
      [name]: checked,
    });
  };

  const confrm_Click = ({ e, type, cal, orderAdd, signboard, extra, sameDetail }) => {
    if (!orderAdd.type || !orderAdd.city || !orderAdd.area || !orderAdd.road || !orderAdd.address
      || !orderAdd.airport || !orderAdd.terminal || !orderAdd.flght_number || !orderAdd.date_travel || !orderAdd.time_travel
      || !orderAdd.number_passenger || !orderAdd.number_bags || !orderAdd.cms_id
      || !orderAdd.name_purchaser || !orderAdd.phone_purchaser || !orderAdd.email_purchaser
      || !orderAdd.name_passenger || !orderAdd.phone_passenger || !orderAdd.email_passenger
    ) {
      setOrderAddCheck({
        type: !orderAdd.type ? true : false,
        city: !orderAdd.city ? true : false,
        area: !orderAdd.area ? true : false,
        road: !orderAdd.road ? true : false,
        address: !orderAdd.address ? true : false,
        airport: !orderAdd.airport ? true : false,
        terminal: !orderAdd.terminal ? true : false,
        flght_number: !orderAdd.flght_number ? true : false,
        date_travel: !orderAdd.date_travel ? true : false,
        time_travel: !orderAdd.time_travel ? true : false,
        number_passenger: !orderAdd.number_passenger ? true : false,
        number_bags: !orderAdd.number_bags ? true : false,
        cms_id: !orderAdd.cms_id ? true : false,
        name_purchaser: !orderAdd.name_purchaser ? true : false,
        phone_purchaser: !orderAdd.phone_purchaser ? true : false,
        email_purchaser: !orderAdd.email_purchaser ? true : false,
        name_passenger: !orderAdd.name_passenger ? true : false,
        phone_passenger: !orderAdd.phone_passenger ? true : false,
        email_passenger: !orderAdd.email_passenger ? true : false,
      })
    } else {
      // 金額試算
      ATS_OrderMaster.ATS_OrderMasterCreate(orderAdd).then(async res => {
        if (res.success) {
          reserve_next({ e: e, type: type, orderAdd: orderAdd, signboard: signboard, extra: extra, sameDetail: sameDetail, price: res.data })
        } else {
          reserve_error({ e: e, type: "error", message: res.message })
        }
      })
    }
  };

  return (
    <TabPanel value={value} index={index}>
      <Grid container className="space-y-2.5">
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOnOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">上車地點</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--airport"}
                  name={"airport"}
                  label={"機場"}
                  options={options.airPortOptions.airportOptions}
                  optionKey={"name"}
                  error={orderAddCheck.airport}
                  value={options.airPortOptions.airportOptions.some(item => item.name === orderAdd.airport) ? options.airPortOptions.airportOptions.find(item => item.name === orderAdd.airport) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--terminal"}
                  name={"terminal"}
                  label={"航廈"}
                  options={options.airPortOptions.terminalOptions.filter(item => item.airport === orderAdd.airport)}
                  optionKey={"name"}
                  error={orderAddCheck.terminal}
                  value={options.airPortOptions.terminalOptions.some(item => item.name === orderAdd.terminal) ? options.airPortOptions.terminalOptions.find(item => item.name === orderAdd.terminal) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOn color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">下車地點</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--city"}
                  name={"city"}
                  label={"城市"}
                  options={options.cityAreaOptions.cityOptions}
                  optionKey={"name"}
                  error={orderAddCheck.city}
                  value={options.cityAreaOptions.cityOptions.some(item => item.name === orderAdd.city) ? options.cityAreaOptions.cityOptions.find(item => item.name === orderAdd.city) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--area"}
                  name={"area"}
                  label={"區域"}
                  options={options.cityAreaOptions.areaOptions.filter(item => item.city === orderAdd.city)}
                  optionKey={"name"}
                  error={orderAddCheck.area}
                  value={options.cityAreaOptions.areaOptions.some(item => item.name === orderAdd.area) ? options.cityAreaOptions.areaOptions.find(item => item.name === orderAdd.area) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.city ? false : true}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--road"}
                  name={"road"}
                  label={"路"}
                  error={orderAddCheck.road}
                  value={orderAdd.road}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--section"}
                  name={"section"}
                  label={"段"}
                  error={orderAddCheck.section}
                  value={orderAdd.section}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--address"}
                  name={"address"}
                  label={"地址"}
                  error={orderAddCheck.address}
                  value={orderAdd.address}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <CalendarMonth color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--flght_number"}
                  name={"flght_number"}
                  label={"航班號碼"}
                  error={orderAddCheck.flght_number}
                  value={orderAdd.flght_number}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusDatePicker
                  id={"add--date_travel"}
                  name={"date_travel"}
                  label={"出發日期"}
                  views={["year", "month", "day"]}
                  error={orderAddCheck.date_travel}
                  value={orderAdd.date_travel}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusTimePicker
                  id={"add--time_travel"}
                  name={"time_travel"}
                  label={orderAdd.type === "送機" ? "乘車時間" : "航班抵達時間"}
                  views={['hours', 'minutes']}
                  error={orderAddCheck.time_travel}
                  value={orderAdd.time_travel}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <PeopleAltOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">人數及行李</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--number_passenger"}
                  name={"number_passenger"}
                  label={"人數"}
                  options={options.passengerOptions}
                  optionKey={"name"}
                  error={orderAddCheck.number_passenger}
                  value={options.passengerOptions.some(item => item.name === orderAdd.number_passenger) ? options.passengerOptions.find(item => item.name === orderAdd.number_passenger) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--number_bags"}
                  name={"number_bags"}
                  label={"行李數"}
                  options={options.bagsOptions}
                  optionKey={"name"}
                  error={orderAddCheck.number_bags}
                  value={options.bagsOptions.some(item => item.name === orderAdd.number_bags) ? options.bagsOptions.find(item => item.name === orderAdd.number_bags) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.number_passenger ? false : true}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <DirectionsCar color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">車型</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusOutlinedSelect
                  id={"add--cms_id"}
                  name={"cms_id"}
                  label={"車型"}
                  options={carModelOptions}
                  optionKey={"cms_id"}
                  error={orderAddCheck.cms_id}
                  value={carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? carModelOptions.find(item => item.cms_id === orderAdd.cms_id) : null}
                  onChangeEvent={(e) => add_HandleSelect(e)}
                  disabled={orderAdd.number_passenger && orderAdd.number_bags ? false : true}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <Add color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">加價服務</Typography>
            </Box>
            <Grid container>
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="signboard" checked={checkboxState.signboard} onChange={handleCheckboxChange} />}
                    label="接機舉牌 (+$200)"
                  />
                </FormGroup>
              </Grid>
              {checkboxState.signboard ?
                <React.Fragment>
                  <Grid item lg={12} sm={12} xs={12}>
                    <CusInput
                      id={"add--signboard_title"}
                      name={"signboard_title"}
                      label={"舉牌標題"}
                      error={orderAddCheck.signboard_title}
                      value={orderAdd.signboard_title}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                  <Grid item lg={12} sm={12} xs={12}>
                    <CusInput
                      multiline
                      rows={4}
                      id={"add--signboard_content"}
                      name={"signboard_content"}
                      label={"舉牌內容"}
                      error={orderAddCheck.signboard_content}
                      value={orderAdd.signboard_content}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                </React.Fragment>
                : null}
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="extra" checked={checkboxState.extra} onChange={handleCheckboxChange} />}
                    label="加購兒童安全座椅及增高墊 (+$200)"
                  />
                </FormGroup>
              </Grid>
              {checkboxState.extra ?
                options.extraOptions.filter(filterEle => filterEle.type !== "舉牌").map((mapEle, index) => {
                  return (
                    <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                      <CusOutlinedSelect
                        id={mapEle.es_id}
                        name={"es_ids"}
                        label={mapEle.name}
                        options={options.extraCount}
                        optionKey={"name"}
                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                        onChangeEvent={(e) => add_HandleSelect(e)}
                      />
                    </Grid>
                  )
                })
                : null}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="space-y-1">
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <EditNote color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">填寫基本資料</Typography>
            </Box>
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--name_purchaser"}
                  name={"name_purchaser"}
                  label={"訂購人姓名"}
                  error={orderAddCheck.name_purchaser}
                  value={orderAdd.name_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--phone_purchaser"}
                  name={"phone_purchaser"}
                  label={"訂購人電話"}
                  error={orderAddCheck.phone_purchaser}
                  value={orderAdd.phone_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--email_purchaser"}
                  name={"email_purchaser"}
                  label={"訂購人信箱"}
                  error={orderAddCheck.email_purchaser}
                  value={orderAdd.email_purchaser}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="sameDetail" checked={checkboxState.sameDetail} onChange={handleCheckboxChange} />}
                    label="乘客同訂購人"
                  />
                </FormGroup>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--name_passenger"}
                  name={"name_passenger"}
                  label={"乘客姓名"}
                  error={orderAddCheck.name_passenger}
                  value={orderAdd.name_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--phone_passenger"}
                  name={"phone_passenger"}
                  label={"乘客電話"}
                  error={orderAddCheck.phone_passenger}
                  value={orderAdd.phone_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <CusInput
                  id={"add--email_passenger"}
                  name={"email_passenger"}
                  label={"乘客信箱"}
                  error={orderAddCheck.email_passenger}
                  value={orderAdd.email_passenger}
                  onChangeEvent={(e) => add_handelInput(e)}
                />
              </Grid>
            </Grid>
            <Box className="flex justify-end">
              <WebTextIconButton3
                size={"medium"}
                color={"secondary"}
                text={"下一步"}
                onClick={(e) => confrm_Click({ e: e, type: "leave", cal: "Y", orderAdd: orderAdd, signboard: checkboxState.signboard, extra: checkboxState.extra, sameDetail: checkboxState.sameDetail })}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </TabPanel>
  )
})

/** [內容]Dialog*/
const DialogsInner = forwardRef((props, ref) => {
  const { type, orderAdd, options, signboard, extra, sameDetail, price, message } = props;
  if (type === "go") {
    // 日期格式yyyy-mm-dd
    const date_travel = new Date(orderAdd.date_travel).toISOString().split('T')[0];
    // 車型名稱
    const car_model = options.carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? options.carModelOptions.find(item => item.cms_id === orderAdd.cms_id).name : null;
    return (
      <React.Fragment>
        <Grid container spacing={2} className="p-2.5">
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOnOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">上車地點</Typography>
            </Box>
            <Box className="mt-2.5">
              <Typography color="info" fontWeight="bold">{orderAdd.city + orderAdd.area + orderAdd.road + orderAdd.section + orderAdd.address}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOn color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">下車地點</Typography>
            </Box>
            <Box className="mt-2.5">
              <Typography color="info" fontWeight="bold">{orderAdd.airport + orderAdd.terminal}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <CalendarMonth color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
            </Box>
            <Grid container className="mt-2.5">
              <Grid item xs={6}>
                <Box className="flex gap-2">
                  <CalendarMonth color={"info"} />
                  <Typography color="info" fontWeight="bold">{date_travel}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="flex gap-2">
                  <AccessTime color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.time_travel}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <DirectionsCar color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">車型/人數及行李</Typography>
            </Box>
            <Grid container className="mt-2.5 gap-2">
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <DirectionsCar color={"info"} />
                  <Typography color="info" fontWeight="bold">{car_model}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <PeopleAltOutlined color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.number_passenger + "位"}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <Backpack color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.number_bags + "件"}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <Add color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">加價服務</Typography>
            </Box>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="signboard" checked={signboard} disabled />}
                  label="接機舉牌 (+$200)"
                />
              </FormGroup>
              {signboard ?
                <Grid container>
                  <Grid item xs={12} >
                    <CusInput
                      disabled
                      id={"add--signboard_title"}
                      name={"signboard_title"}
                      label={"舉牌標題"}
                      value={orderAdd.signboard_title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CusInput
                      disabled
                      multiline
                      rows={4}
                      id={"add--signboard_content"}
                      name={"signboard_content"}
                      label={"舉牌內容"}
                      value={orderAdd.signboard_content}
                    />
                  </Grid>
                </Grid>
                : null}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="signboard" checked={extra} disabled />}
                  label="兒童座椅及增高墊 (+$200)"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <EditNote color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">基本資料</Typography>
            </Box>
            <Grid container className="mt-2.5 gap-2">
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人姓名: ${orderAdd.name_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人電話: ${orderAdd.phone_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人信箱: ${orderAdd.email_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客姓名: ${orderAdd.name_passenger}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客電話: ${orderAdd.phone_passenger}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客信箱: ${orderAdd.email_passenger}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className="border-b"></Box>
          </Grid>
        </Grid>
        <Box className="p-2.5 pt-0">
          <Typography variant="h6" color="secondary" className="text-right">{`總金額: ${price}`} </Typography>
        </Box>
      </React.Fragment>
    )
  } else if (type === "leave") {
    // 日期格式yyyy-mm-dd
    const date_travel = new Date(orderAdd.date_travel).toISOString().split('T')[0];
    // 車型名稱
    const car_model = options.carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? options.carModelOptions.find(item => item.cms_id === orderAdd.cms_id).name : null;
    return (
      <React.Fragment>
        <Grid container spacing={2} className="p-2.5">
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOnOutlined color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">上車地點</Typography>
            </Box>
            <Box className="mt-2.5">
              <Typography color="info" fontWeight="bold">{orderAdd.airport + orderAdd.terminal}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <LocationOn color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">下車地點</Typography>
            </Box>
            <Box className="mt-2.5">
              <Typography color="info" fontWeight="bold">{orderAdd.city + orderAdd.area + orderAdd.road + orderAdd.section + orderAdd.address}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <CalendarMonth color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
            </Box>
            <Grid container className="mt-2.5">
              <Grid item xs={6}>
                <Box className="flex gap-2">
                  <CalendarMonth color={"info"} />
                  <Typography color="info" fontWeight="bold">{date_travel}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="flex gap-2">
                  <AccessTime color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.time_travel}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <DirectionsCar color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">車型/人數及行李</Typography>
            </Box>
            <Grid container className="mt-2.5 gap-2">
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <DirectionsCar color={"info"} />
                  <Typography color="info" fontWeight="bold">{car_model}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <PeopleAltOutlined color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.number_passenger + "位"}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-2">
                  <Backpack color={"info"} />
                  <Typography color="info" fontWeight="bold">{orderAdd.number_bags + "件"}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <Add color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">加價服務</Typography>
            </Box>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="signboard" checked={signboard} disabled />}
                  label="接機舉牌 (+$200)"
                />
              </FormGroup>
              {signboard ?
                <Grid container>
                  <Grid item xs={12} >
                    <CusInput
                      disabled
                      id={"add--signboard_title"}
                      name={"signboard_title"}
                      label={"舉牌標題"}
                      value={orderAdd.signboard_title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CusInput
                      disabled
                      multiline
                      rows={4}
                      id={"add--signboard_content"}
                      name={"signboard_content"}
                      label={"舉牌內容"}
                      value={orderAdd.signboard_content}
                    />
                  </Grid>
                </Grid>
                : null}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="signboard" checked={extra} disabled />}
                  label="兒童座椅及增高墊 (+$200)"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="flex items-center border-b pb-2.5 gap-2">
              <EditNote color={"secondary"} />
              <Typography color="secondary" fontWeight="bold">基本資料</Typography>
            </Box>
            <Grid container className="mt-2.5 gap-2">
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人姓名: ${orderAdd.name_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人電話: ${orderAdd.phone_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{`訂購人信箱: ${orderAdd.email_purchaser}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客姓名: ${orderAdd.name_passenger}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客電話: ${orderAdd.phone_passenger}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="info" fontWeight="bold">{sameDetail ? "乘客姓名: 同訂購人" : `乘客信箱: ${orderAdd.email_passenger}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className="border-b"></Box>
          </Grid>
        </Grid>
        <Box className="p-2.5 pt-0">
          <Typography variant="h6" color="secondary" className="text-right">{`總金額: ${price}`} </Typography>
        </Box>
      </React.Fragment>
    )
  } else if (type === "error") {
    return (
      <React.Fragment>
        <Box className="p-2.5">
          <Typography variant="body">{message}</Typography>
        </Box>
      </React.Fragment>
    )
  }
})