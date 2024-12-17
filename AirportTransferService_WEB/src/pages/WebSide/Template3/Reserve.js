import React, { useRef, useState, useContext, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Tabs, Tab, Typography, TextField, Autocomplete, Button, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { max, Moment } from 'moment';
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
import { ATS_OrderMaster, ATS_CityAreaSettings, ATS_AirportTerminalSettings, ATS_CarModelSettings, ATS_ExtraSettings, ATS_PriceLinkSettings, ATS_WebSetting } from '../../../js/APITS';

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

    // 網站設定查詢
    const [webSettingSearch, setWebSettingSearch] = useState({
        ws_id: "",
        title: "",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
        page: 0,
        num_per_page: 0,
        excel: "",
    })

    // 城市區域查詢
    const [cityAreaSearch, setCityAreaSearch] = useState({
        visible: "Y",
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
        visible: "Y",
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
        visible: "Y",
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
        visible: "Y",
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
        extraCount: [
            { key: 0, name: "1" },
            { key: 1, name: "2" },
        ], // 加價服務
        passengerOptions: [], // 人數
        bagsOptions: [], // 行李數
    });

    const [extraVisible, setExtraVisible] = useState(false);
    const [extraText, setExtraText] = useState();

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

    /**網站設定查詢 */
    const getWebSetting = () => {
        ATS_WebSetting.ATS_WebSettingsSearch(webSettingSearch).then(res => {
            if (res.success) {
                setExtraVisible(res.data.filter(e => e.ws_id === "00010")[0].text1 === "Y" ? true : false);
                setExtraText(res.data.filter(e => e.ws_id === "00010")[0].text2);
            }
        });
    };

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
                const luggageOptions = [{ key: 0, name: '0' }];
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
        getWebSetting();
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
    const reserve_next = ({ e, type, orderAdd, signboard, extra, other, sameDetail, price }) => {
        useDialog.current.handleOpen();
        setDialogData({
            id: type,
            maxWidth: "md",
            DialogTitle: "車資金額確認及前往付款",
            DialogContent: <DialogsInner type={type} ref={useDialogInner} orderAdd={orderAdd} price={price} options={options} signboard={signboard} extra={extra} other={other} sameDetail={sameDetail} extraVisible={extraVisible} />,
            DialogActions: (
                <React.Fragment>
                    <Button color="secondary" variant='outlined' onClick={dialogClose}>
                        上一步
                    </Button>
                    <Button sx={{ color: "#FFFFFF" }} color="info" variant='contained' onClick={(e) => { reserve_confirm({ e: e, orderAdd: orderAdd, price: price }) }}>
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
                // ATS_OrderMasterCreate 直接回傳連結 2024-09-01 Beck
                let o_id = res.data.o_id;
                let link = res.data.link;
                setBackdropOpen(true);
                // 延遲兩秒才call api，看起來比較有在等待的感覺?
                setTimeout(() => {
                    dialogClose();
                    setBackdropOpen(false);
                    // 跳轉
                    window.location.href = link;
                }, 2000);

                // ATS_PriceLinkSettings.ATS_PriceLinkSettingsSearch({
                //   visible: "Y",
                //   price: price,
                // }).then(async res => {
                //   if (res.success) {
                //     setBackdropOpen(true);

                //     // 延遲兩秒才call api，看起來比較有在等待的感覺?
                //     setTimeout(() => {
                //       dialogClose();
                //       setBackdropOpen(false);
                //       // 跳轉
                //       window.location.href = res.data[0].link;
                //     }, 2000);
                //   }
                // })
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
            <Box className="container mx-auto pt-20 pb-20 ">
                <Box className="rounded-lg bg-white">
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
                            extraVisible={extraVisible}
                            extraText={extraText}
                            ref={useTabContent.current[0]}
                        />
                        <LeaveTabPanel
                            value={tabsValue}
                            index={1}
                            options={options}
                            reserve_next={reserve_next}
                            reserve_error={reserve_error}
                            extraVisible={extraVisible}
                            extraText={extraText}
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
    const { value, index, options, reserve_next, reserve_error, extraVisible, extraText } = props
    const otherExtra = options.extraOptions.filter(option => option.type === "其它");
    const [extraOptions, setExtraOptions] = useState([]);
    const [selectedCounts, setSelectedCounts] = useState({});
    const [maxServiceExtrasMessage, setMaxServiceExtrasMessage] = useState({
        message: "",
    });

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
        other: false,
        sameDetail: false,
    });

    // 根據 extraNum 生成選項範圍，不包含 0
    // const generateOptions = (num) => {
    //   return Array.from({ length: num }, (_, i) => ({ name: (i + 1).toString(), value: i + 1 }));
    // };

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        let checkAlert = false;
        if (name === "road" || name === "section") {
            // 使用正則表達式來移除所有阿拉伯數字
            const filteredValue = val ? val.replace(/[0-9]/g, '') : null;

            if (name === "road") {
                checkAlert = val ? !val.includes("道") && !val.includes("路") && !val.includes("街") && !val.includes("村") && !val.includes("鄰") : false;
            }

            if (name === "section") {
                checkAlert = val ? !val.includes("段") : false;
            }

            setOrderAdd(prev => ({
                ...prev,
                [name]: filteredValue
            }));
        } else if (name === "date_travel") {
            let formattedValue = val ? val.split('T')[0] : null; // 格式化日期為 YYYY-MM-DD

            setOrderAdd(prev => ({
                ...prev,
                [name]: formattedValue
            }));

            // 檢查是否為三天後的日期
            if (formattedValue && moment(formattedValue).isSame(moment().add(3, 'days'), 'day')) {
                setOrderAdd(prev => ({
                    ...prev,
                    minTime: moment().format('HH:mm:ss'), // 如果是三天後，設定 minTime 為當前時間
                }));
            } else {
                setOrderAdd(prev => ({
                    ...prev,
                    minTime: null, // 否則取消時間限制
                }));
            }
        } else if (name === "time_travel") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val ? val + ":00" : null
            }));
        } else {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val
            }));
        }

        setOrderAddCheck(prev => ({
            ...prev,
            [name]: name === "section" ? checkAlert : !val ? true : checkAlert,
        }));
    };

    /**[事件]下拉選單 */
    const add_HandleSelect = (e, type) => {
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

            const passengerCount = parseInt(val) || 0;
            const luggageCount = parseInt(orderAdd.number_bags ? orderAdd.number_bags : 0) || 0;

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "number_bags") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));

            const passengerCount = parseInt(orderAdd.number_passenger ? orderAdd.number_passenger : 0) || 0;
            const luggageCount = parseInt(val) || 0;

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "cms_id") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));

            const selectedCarModel = carModelOptions.find(model => model.cms_id === val);

            if (selectedCarModel) {
                const maxServiceExtras = selectedCarModel.max_service_extras;

                const newExtraOptions = Array.from({ length: maxServiceExtras + 1 }, (_, index) => ({
                    name: `${index}`,
                    value: index
                }));

                setMaxServiceExtrasMessage(() => ({
                    message: `安全座椅及增高墊，加總上限為 ${maxServiceExtras} 個`
                }));
                setExtraOptions(newExtraOptions);
            }
        } else if (name === "es_ids") {
            let arr = orderAdd.es_ids ? [...orderAdd.es_ids] : [];
            const index = arr.findIndex(item => item.es_id === id);

            if (index !== -1) {
                if (val === null) {
                    arr = arr.filter(item => item.es_id !== id);
                } else {
                    arr[index].count = val;
                }
            } else {
                arr.push({
                    es_id: id,
                    count: val,
                    extraType: type,
                });
            }

            // 計算當前總數
            const totalCount = arr.reduce((acc, item) => acc + (parseInt(item.count) || 0), 0);
            const selectedCarModel = carModelOptions.find(model => model.cms_id === orderAdd.cms_id);
            const maxServiceExtras = selectedCarModel ? selectedCarModel.max_service_extras : 0;

            if (totalCount > maxServiceExtras) {
                // 提示用戶並不更新狀態
                alert(`加總上限不能超過 ${maxServiceExtras} 個`);
                return;
            }

            if (type === "合併") {
                setOrderAddCheck(prev => ({
                    ...prev,
                    es_ids_merge: false,
                }));
            } else {
                setOrderAddCheck(prev => ({
                    ...prev,
                    es_ids_other: false,
                }));
            }

            setOrderAdd(prev => ({
                ...prev,
                [name]: arr.length > 0 ? arr : null,
            }));
        } else {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));
        }

        setOrderAddCheck(prev => ({
            ...prev,
            [name]: !val ? true : false,
        }));
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
            } else {
                setOrderAdd(prev => ({
                    ...prev,
                    signboard_title: null,
                    signboard_content: null,
                }));
            }
            // 更新加購
            setOrderAdd(prev => ({
                ...prev,
                es_ids: checked ? arr : null,
            }))
        } else if (name === "extra") {
            // 如果取消勾選, 就把加購清空
            if (!checked) {
                setOrderAdd(prev => ({
                    ...prev,
                    es_ids: prev.es_ids ? prev.es_ids.filter(item => item.extraType !== "合併") : null,
                }));
            }
        } else if (name === "other") {
            if (!checked) {
                setOrderAdd(prev => ({
                    ...prev,
                    es_ids: prev.es_ids ? prev.es_ids.filter(item => item.extraType !== "其它") : null,
                }));
            }
        } else if (name === "sameDetail") { // 同訂購人
            setOrderAdd(prev => ({
                ...prev,
                name_passenger: checked ? orderAdd.name_purchaser : null,
                phone_passenger: checked ? orderAdd.phone_purchaser : null,
                email_passenger: checked ? orderAdd.email_purchaser : null,
            }));
            setOrderAddCheck(prev => ({
                ...prev,
                name_passenger: checked ? false : true,
                phone_passenger: checked ? false : true,
                email_passenger: checked ? false : true,
            }));
        }

        setCheckboxState({
            ...checkboxState,
            [name]: checked,
        });
    };

    const confrm_Click = ({ e, type, cal, orderAdd, signboard, extra, sameDetail, other }) => {
        // 定義需要檢查的欄位
        const requiredFields = {
            type: !orderAdd.type,
            city: !orderAdd.city,
            area: !orderAdd.area,
            road: !orderAdd.road,
            address: !orderAdd.address,
            airport: !orderAdd.airport,
            terminal: !orderAdd.terminal,
            date_travel: !orderAdd.date_travel,
            time_travel: !orderAdd.time_travel,
            number_passenger: !orderAdd.number_passenger,
            number_bags: !orderAdd.number_bags,
            cms_id: !orderAdd.cms_id,
            name_purchaser: !orderAdd.name_purchaser,
            phone_purchaser: !orderAdd.phone_purchaser,
            email_purchaser: !orderAdd.email_purchaser,
            name_passenger: !orderAdd.name_passenger,
            phone_passenger: !orderAdd.phone_passenger,
            email_passenger: !orderAdd.email_passenger,
        };

        // 檢查下拉選單的錯誤狀態
        const mergeError =
            checkboxState.extra && !orderAdd.es_ids?.some((item) => item.extraType === "合併");

        // 檢查下拉選單的錯誤狀態 - 其它
        const otherError =
            checkboxState.other && !orderAdd.es_ids?.some((item) => item.extraType === "其它");

        if (orderAdd.road) requiredFields.road = !orderAdd.road.includes("道") && !orderAdd.road.includes("路") && !orderAdd.road.includes("街") && !orderAdd.road.includes("村") && !orderAdd.road.includes("鄰");
        if (orderAdd.section) requiredFields.section = !orderAdd.section.includes("段");

        // 檢查是否有任何必填欄位未填
        const hasError = Object.values(requiredFields).some(Boolean) || mergeError || otherError;

        if (hasError) {
            setOrderAddCheck({
                ...requiredFields,
                es_ids_merge: mergeError,
                es_ids_other: otherError,
            });

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // 金額試算
            ATS_OrderMaster.ATS_OrderMasterCreate(orderAdd).then(async res => {
                if (res.success) {
                    reserve_next({ e: e, type: type, orderAdd: orderAdd, signboard: signboard, extra: extra, sameDetail: sameDetail, other: other, price: res.data })
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
                                    label={"道/路/街/村/鄰 (數字限輸入中文如: 六村十一鄰)"}
                                    helperText={!orderAdd.road ? "" : orderAddCheck.road ? `內容必須包含"道/路/街/村/鄰 (數字限輸入中文如: 六村十一鄰)"` : ""}
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
                                    helperText={!orderAdd.section ? " " : orderAddCheck.section ? `內容必須包含"段"` : ""}
                                    error={orderAddCheck.section}
                                    value={orderAdd.section}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12}>
                                <CusInput
                                    id={"add--address"}
                                    name={"address"}
                                    label={"巷/弄/號"}
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
                                    minDate={moment().add(3, 'days')}
                                    maxDate={moment().add(30, 'days')}
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
                                    minTime={orderAdd.minTime ? moment(orderAdd.minTime, 'HH:mm:ss') : null}  // 動態設定 minTime
                                    error={orderAddCheck.time_travel}
                                    value={orderAdd.time_travel}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                    disabled={orderAdd.date_travel ? false : true}
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
                {extraVisible ?
                    <Grid item xs={12}>
                        <Box className="">
                            <Box className="flex items-center border-b pb-2.5 gap-2">
                                <Add color={"secondary"} />
                                <Typography color="secondary" fontWeight="bold">加價服務</Typography>
                            </Box>
                            <Grid container>
                                <Grid item lg={12} sm={12} xs={12}>
                                    <Box className="flex flex-wrap items-center">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox name="extra" checked={checkboxState.extra} onChange={handleCheckboxChange} />}
                                                label="加購兒童安全座椅及增高墊 (+$200)"
                                            />
                                        </FormGroup>
                                        {maxServiceExtrasMessage.message != "" ? <Typography color="error" fontWeight="bold">{`(${maxServiceExtrasMessage.message})`}</Typography> : null}
                                    </Box>
                                </Grid>
                                {checkboxState.extra ?
                                    options.extraOptions.filter(filterEle => filterEle.type === "合併").map((mapEle, index) => {
                                        return (
                                            <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                                <CusOutlinedSelect
                                                    id={mapEle.es_id}
                                                    name={"es_ids"}
                                                    label={mapEle.name}
                                                    error={orderAddCheck.es_ids_merge}
                                                    options={extraOptions}
                                                    optionKey={"name"}
                                                    value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? extraOptions.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                    onChangeEvent={(e) => add_HandleSelect(e, mapEle.type)}
                                                />
                                            </Grid>
                                        )
                                    })
                                    : null}
                                {otherExtra ?
                                    <Grid item lg={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox name="other" checked={checkboxState.other} onChange={handleCheckboxChange} />}
                                                label="加購其它服務"
                                            />
                                        </FormGroup>
                                    </Grid>
                                    : null}
                                {checkboxState.other ?
                                    options.extraOptions.filter(filterEle => filterEle.type === "其它").map((mapEle, index) => {
                                        return (
                                            <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                                <CusOutlinedSelect
                                                    id={mapEle.es_id}
                                                    name={"es_ids"}
                                                    label={mapEle.name}
                                                    error={orderAddCheck.es_ids_other}
                                                    options={options.extraCount}
                                                    optionKey={"name"}
                                                    value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                    onChangeEvent={(e) => add_HandleSelect(e, mapEle.type)}
                                                />
                                            </Grid>
                                        )
                                    })
                                    : null}
                            </Grid>
                        </Box>
                    </Grid>
                    :
                    <Typography color="error" fontWeight="bold">{extraText}</Typography>
                }
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
                                sx={{ color: "#FFFFFF" }}
                                size={"medium"}
                                color={"secondary"}
                                text={"下一步"}
                                onClick={(e) => confrm_Click({ e: e, type: "go", cal: "Y", orderAdd: orderAdd, signboard: checkboxState.signboard, extra: checkboxState.extra, sameDetail: checkboxState.sameDetail, other: checkboxState.other })}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </TabPanel>
    )
})

/** [內容]接機 */
const LeaveTabPanel = forwardRef((props, ref) => {
    const { value, index, options, reserve_next, reserve_error, extraVisible, extraText } = props
    const otherExtra = options.extraOptions.filter(option => option.type === "其它");
    const [extraOptions, setExtraOptions] = useState([]);
    const [selectedCounts, setSelectedCounts] = useState({});
    const [maxServiceExtrasMessage, setMaxServiceExtrasMessage] = useState({
        message: "",
    });

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
        other: false,
        sameDetail: false,
    });

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        let checkAlert = false;
        if (name === "road" || name === "section") {
            // 使用正則表達式來移除所有阿拉伯數字
            const filteredValue = val ? val.replace(/[0-9]/g, '') : null;

            if (name === "road") {
                checkAlert = val ? !val.includes("道") && !val.includes("路") && !val.includes("街") && !val.includes("村") && !val.includes("鄰") : false;
            }

            if (name === "section") {
                checkAlert = val ? !val.includes("段") : false;
            }

            setOrderAdd(prev => ({
                ...prev,
                [name]: filteredValue
            }));
        } else if (name === "date_travel") {
            let formattedValue = val ? val.split('T')[0] : null; // 格式化日期為 YYYY-MM-DD

            setOrderAdd(prev => ({
                ...prev,
                [name]: formattedValue
            }));

            // 檢查是否為三天後的日期
            if (formattedValue && moment(formattedValue).isSame(moment().add(3, 'days'), 'day')) {
                setOrderAdd(prev => ({
                    ...prev,
                    minTime: moment().format('HH:mm:ss'), // 如果是三天後，設定 minTime 為當前時間
                }));
            } else {
                setOrderAdd(prev => ({
                    ...prev,
                    minTime: null, // 否則取消時間限制
                }));
            }
        } else if (name === "time_travel") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val ? val + ":00" : null
            }));
        } else {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val
            }));
        }

        setOrderAddCheck(prev => ({
            ...prev,
            [name]: name === "section" ? checkAlert : !val ? true : checkAlert,
        }));
    };

    /**[事件]下拉選單 */
    const add_HandleSelect = (e, type) => {
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

            const passengerCount = parseInt(val) || 0;
            const luggageCount = parseInt(orderAdd.number_bags ? orderAdd.number_bags : 0) || 0;

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "number_bags") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));

            const passengerCount = parseInt(orderAdd.number_passenger ? orderAdd.number_passenger : 0) || 0;
            const luggageCount = parseInt(val) || 0;

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "cms_id") {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));

            const selectedCarModel = carModelOptions.find(model => model.cms_id === val);

            if (selectedCarModel) {
                const maxServiceExtras = selectedCarModel.max_service_extras;

                const newExtraOptions = Array.from({ length: maxServiceExtras + 1 }, (_, index) => ({
                    name: `${index}`,
                    value: index
                }));

                setMaxServiceExtrasMessage(() => ({
                    message: `安全座椅及增高墊，加總上限為 ${maxServiceExtras} 個`
                }));
                setExtraOptions(newExtraOptions);
            }
        } else if (name === "es_ids") {
            let arr = orderAdd.es_ids ? [...orderAdd.es_ids] : [];
            const index = arr.findIndex(item => item.es_id === id);

            if (index !== -1) {
                if (val === null) {
                    arr = arr.filter(item => item.es_id !== id);
                } else {
                    arr[index].count = val;
                }
            } else {
                arr.push({
                    es_id: id,
                    count: val,
                    extraType: type,
                });
            }

            // 計算當前總數
            const totalCount = arr.reduce((acc, item) => acc + (parseInt(item.count) || 0), 0);
            const selectedCarModel = carModelOptions.find(model => model.cms_id === orderAdd.cms_id);
            const maxServiceExtras = selectedCarModel ? selectedCarModel.max_service_extras : 0;

            if (totalCount > maxServiceExtras) {
                // 提示用戶並不更新狀態
                alert(`加總上限不能超過 ${maxServiceExtras} 個`);
                return;
            }

            if (type === "合併") {
                setOrderAddCheck(prev => ({
                    ...prev,
                    es_ids_merge: false,
                }));
            } else {
                setOrderAddCheck(prev => ({
                    ...prev,
                    es_ids_other: false,
                }));
            }

            setOrderAdd(prev => ({
                ...prev,
                [name]: arr.length > 0 ? arr : null,
            }));
        } else {
            setOrderAdd(prev => ({
                ...prev,
                [name]: val,
            }));
        }

        setOrderAddCheck(prev => ({
            ...prev,
            [name]: !val ? true : false,
        }));
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
            } else {
                setOrderAdd(prev => ({
                    ...prev,
                    signboard_title: null,
                    signboard_content: null,
                }));
            }
            // 更新加購
            setOrderAdd(prev => ({
                ...prev,
                es_ids: checked ? arr : null,
            }))
        } else if (name === "extra") {
            // 如果取消勾選, 就把加購清空
            if (!checked) {
                setOrderAdd(prev => ({
                    ...prev,
                    es_ids: prev.es_ids ? prev.es_ids.filter(item => item.extraType !== "合併") : null,
                }));
            }
        } else if (name === "other") {
            if (!checked) {
                setOrderAdd(prev => ({
                    ...prev,
                    es_ids: prev.es_ids ? prev.es_ids.filter(item => item.extraType !== "其它") : null,
                }));
            }
        } else if (name === "sameDetail") { // 同訂購人
            setOrderAdd(prev => ({
                ...prev,
                name_passenger: checked ? orderAdd.name_purchaser : null,
                phone_passenger: checked ? orderAdd.phone_purchaser : null,
                email_passenger: checked ? orderAdd.email_purchaser : null,
            }));
            setOrderAddCheck(prev => ({
                ...prev,
                name_passenger: checked ? false : true,
                phone_passenger: checked ? false : true,
                email_passenger: checked ? false : true,
            }));
        }

        setCheckboxState({
            ...checkboxState,
            [name]: checked,
        });
    };

    const confrm_Click = ({ e, type, cal, orderAdd, signboard, extra, sameDetail, other }) => {
        // 定義需要檢查的欄位
        const requiredFields = {
            type: !orderAdd.type,
            city: !orderAdd.city,
            area: !orderAdd.area,
            road: !orderAdd.road,
            address: !orderAdd.address,
            airport: !orderAdd.airport,
            terminal: !orderAdd.terminal,
            date_travel: !orderAdd.date_travel,
            time_travel: !orderAdd.time_travel,
            number_passenger: !orderAdd.number_passenger,
            number_bags: !orderAdd.number_bags,
            cms_id: !orderAdd.cms_id,
            name_purchaser: !orderAdd.name_purchaser,
            phone_purchaser: !orderAdd.phone_purchaser,
            email_purchaser: !orderAdd.email_purchaser,
            name_passenger: !orderAdd.name_passenger,
            phone_passenger: !orderAdd.phone_passenger,
            email_passenger: !orderAdd.email_passenger,
            signboard_title: checkboxState.signboard && !orderAdd.signboard_title,
            signboard_content: checkboxState.signboard && !orderAdd.signboard_content,
        };

        // 檢查下拉選單的錯誤狀態 - 合併
        const mergeError =
            checkboxState.extra &&
            !orderAdd.es_ids?.some((item) => item.extraType === "合併" && item.es_id !== "00001");

        // 檢查下拉選單的錯誤狀態 - 其它
        const otherError =
            checkboxState.other &&
            !orderAdd.es_ids?.some((item) => item.extraType === "其它" && item.es_id !== "00001");

        if (orderAdd.section) requiredFields.section = !orderAdd.section.includes("段");
        if (orderAdd.road) requiredFields.road = !orderAdd.road.includes("道") && !orderAdd.road.includes("路") && !orderAdd.road.includes("街") && !orderAdd.road.includes("村") && !orderAdd.road.includes("鄰");

        // 檢查是否有任何必填欄位未填
        const hasError = Object.values(requiredFields).some(Boolean) || mergeError || otherError;

        if (hasError) {
            setOrderAddCheck({
                ...requiredFields,
                es_ids_merge: mergeError,
                es_ids_other: otherError,
            });

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // 金額試算
            ATS_OrderMaster.ATS_OrderMasterCreate(orderAdd).then(async res => {
                if (res.success) {
                    reserve_next({ e: e, type: type, orderAdd: orderAdd, signboard: signboard, extra: extra, sameDetail: sameDetail, other: other, price: res.data })
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
                                    label={"道/路/街/村/鄰 (數字限輸入中文如: 六村十一鄰)"}
                                    helperText={!orderAdd.road ? "" : orderAddCheck.road ? `內容必須包含"道/路/街/村/鄰 (數字限輸入中文如: 六村十一鄰)"` : ""}
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
                                    helperText={!orderAdd.section ? " " : orderAddCheck.section ? `內容必須包含"段"` : ""}
                                    error={orderAddCheck.section}
                                    value={orderAdd.section}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12}>
                                <CusInput
                                    id={"add--address"}
                                    name={"address"}
                                    label={"巷/弄/號"}
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
                                    value={orderAdd.flght_number}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12}>
                                <CusDatePicker
                                    id={"add--date_travel"}
                                    name={"date_travel"}
                                    label={"抵達日期"}
                                    views={["year", "month", "day"]}
                                    minDate={moment().add(3, 'days')}
                                    maxDate={moment().add(30, 'days')}
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
                                    minTime={orderAdd.minTime ? moment(orderAdd.minTime, 'HH:mm:ss') : null}  // 動態設定 minTime
                                    views={['hours', 'minutes']}
                                    error={orderAddCheck.time_travel}
                                    value={orderAdd.time_travel}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                    disabled={orderAdd.date_travel ? false : true}
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
                {extraVisible ?
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
                                    <Box className="flex flex-wrap items-center">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox name="extra" checked={checkboxState.extra} onChange={handleCheckboxChange} />}
                                                label="加購兒童安全座椅及增高墊 (+$200)"
                                            />
                                        </FormGroup>
                                        {maxServiceExtrasMessage.message != "" ? <Typography color="error" fontWeight="bold">{`(${maxServiceExtrasMessage.message})`}</Typography> : null}
                                    </Box>
                                </Grid>
                                {checkboxState.extra ?
                                    options.extraOptions.filter(filterEle => filterEle.type === "合併").map((mapEle, index) => {
                                        return (
                                            <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                                <CusOutlinedSelect
                                                    id={mapEle.es_id}
                                                    name={"es_ids"}
                                                    label={mapEle.name}
                                                    error={orderAddCheck.es_ids_merge}
                                                    options={extraOptions}
                                                    optionKey={"name"}
                                                    value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? extraOptions.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                    onChangeEvent={(e) => add_HandleSelect(e, mapEle.type)}
                                                />
                                            </Grid>
                                        )
                                    })
                                    : null}
                                {otherExtra ?
                                    <Grid item lg={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox name="other" checked={checkboxState.other} onChange={handleCheckboxChange} />}
                                                label="加購其它服務"
                                            />
                                        </FormGroup>
                                    </Grid>
                                    : null}
                                {checkboxState.other ?
                                    options.extraOptions.filter(filterEle => filterEle.type === "其它").map((mapEle, index) => {
                                        return (
                                            <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                                <CusOutlinedSelect
                                                    id={mapEle.es_id}
                                                    name={"es_ids"}
                                                    label={mapEle.name}
                                                    error={orderAddCheck.es_ids_other}
                                                    options={options.extraCount}
                                                    optionKey={"name"}
                                                    value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                    onChangeEvent={(e) => add_HandleSelect(e, mapEle.type)}
                                                />
                                            </Grid>
                                        )
                                    })
                                    : null}
                            </Grid>
                        </Box>
                    </Grid>
                    :
                    <Typography color="error" fontWeight="bold">{extraText}</Typography>
                }
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
                                sx={{ color: "#FFFFFF" }}
                                size={"medium"}
                                color={"secondary"}
                                text={"下一步"}
                                onClick={(e) => confrm_Click({ e: e, type: "leave", cal: "Y", orderAdd: orderAdd, signboard: checkboxState.signboard, extra: checkboxState.extra, sameDetail: checkboxState.sameDetail, other: checkboxState.other })}
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
    const { type, orderAdd, options, signboard, extra, sameDetail, other, price, message, extraVisible } = props;
    console.log(other)
    if (type === "go") {
        // 日期格式yyyy-mm-dd
        const date_travel = new Date(orderAdd.date_travel).toISOString().split('T')[0];
        // 車型名稱
        const car_model = options.carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? options.carModelOptions.find(item => item.cms_id === orderAdd.cms_id).name : null;
        return (
            <React.Fragment>
                <Grid container spacing={2} className="p-2.5">
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <LocationOnOutlined color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">上車地點</Typography>
                        </Box>
                        <Box className="mt-2.5 pl-8">
                            <Typography color="info" fontWeight="bold">{orderAdd.city + orderAdd.area + orderAdd.road + (orderAdd.section ? orderAdd.section : "") + orderAdd.address}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <LocationOn color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">下車地點</Typography>
                        </Box>
                        <Box className="mt-2.5 pl-8">
                            <Typography color="info" fontWeight="bold">{orderAdd.airport + orderAdd.terminal}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="border-b ml-4" />
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <CalendarMonth color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 space-y-2.5">
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <FlightTakeoffIcon color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.flght_number} 航班</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex gap-2">
                                    <CalendarMonth color={"black"} />
                                    <Typography color="info" fontWeight="bold">{date_travel}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex gap-2">
                                    <AccessTime color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.time_travel}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <DirectionsCar color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">車型/人數及行李</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 gap-2">
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <DirectionsCar color={"black"} />
                                    <Typography color="info" fontWeight="bold">{car_model}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <PeopleAltOutlined color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.number_passenger + "位乘客"}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <Backpack color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.number_bags + "件行李"}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="border-b ml-4" />
                    {extraVisible ?
                        <Grid item xs={12} md={6} lg={6}>
                            <Box className="flex items-center pb-2.5 gap-2">
                                <Add color={"secondary"} />
                                <Typography color="secondary" fontWeight="bold">加價服務請於【結帳】時加購</Typography>
                            </Box>
                            <Box>
                                {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="signboard" checked={extra} disabled />}
              label="兒童座椅及增高墊 (+$200)"
            />
          </FormGroup> */}
                                <Box className="mt-2.5 pl-8 gap-2">
                                    <Typography color="info" fontWeight="bold">兒童座椅及增高墊 (+$200)</Typography>
                                </Box>
                                <Grid container>
                                    {extra ?
                                        options.extraOptions.filter(filterEle => filterEle.type === "合併").map((mapEle, index) => {
                                            return (
                                                <Grid key={mapEle.es_id} item lg={6} sm={6} xs={12}>
                                                    <CusOutlinedSelect
                                                        id={mapEle.es_id}
                                                        name={"es_ids"}
                                                        label={mapEle.name}
                                                        options={options.extraCount}
                                                        optionKey={"name"}
                                                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                        disabled
                                                    />
                                                </Grid>
                                            )
                                        })
                                        : null}
                                </Grid>
                                {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="other" checked={other} disabled />}
              label="其它服務"
            />
          </FormGroup> */}
                                <Box className="mt-2.5 pl-8 gap-2">
                                    <Typography color="info" fontWeight="bold">其它服務</Typography>
                                </Box>
                                <Grid container>
                                    {other ?
                                        options.extraOptions.filter(filterEle => filterEle.type === "其它").map((mapEle, index) => {
                                            return (
                                                <Grid key={mapEle.es_id} item lg={6} sm={6} xs={12}>
                                                    <CusOutlinedSelect
                                                        id={mapEle.es_id}
                                                        name={"es_ids"}
                                                        label={mapEle.name}
                                                        options={options.extraCount}
                                                        optionKey={"name"}
                                                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                        disabled
                                                    />
                                                </Grid>
                                            )
                                        })
                                        : null}
                                </Grid>
                            </Box>
                        </Grid>
                        : null}
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <EditNote color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">基本資料</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 gap-2">
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
                        <Box className="flex items-center pb-2.5 gap-2">
                            <LocationOnOutlined color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">上車地點</Typography>
                        </Box>
                        <Box className="mt-2.5">
                            <Typography color="info" fontWeight="bold">{orderAdd.airport + orderAdd.terminal}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <LocationOn color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">下車地點</Typography>
                        </Box>
                        <Box className="mt-2.5">
                            <Typography color="info" fontWeight="bold">{orderAdd.city + orderAdd.area + orderAdd.road + (orderAdd.section ? orderAdd.section : "") + orderAdd.address}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="border-b ml-4" />
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <CalendarMonth color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 space-y-2.5">
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <FlightLandIcon color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.flght_number} 航班</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex gap-2">
                                    <CalendarMonth color={"black"} />
                                    <Typography color="info" fontWeight="bold">{date_travel}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex gap-2">
                                    <AccessTime color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.time_travel}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <DirectionsCar color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">車型/人數及行李</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 gap-2">
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <DirectionsCar color={"black"} />
                                    <Typography color="info" fontWeight="bold">{car_model}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <PeopleAltOutlined color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.number_passenger + "位乘客"}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="flex gap-2">
                                    <Backpack color={"black"} />
                                    <Typography color="info" fontWeight="bold">{orderAdd.number_bags + "件行李"}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="border-b ml-4" />
                    {extraVisible ?
                        <Grid item xs={12} md={6} lg={6}>
                            <Box className="flex items-center pb-2.5 gap-2">
                                <Add color={"secondary"} />
                                <Typography color="secondary" fontWeight="bold">加價服務請於【結帳】時加購</Typography>
                            </Box>
                            <Box>
                                {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="signboard" checked={signboard} disabled />}
              label="接機舉牌 (+$200)"
            />
          </FormGroup> */}
                                <Box className="mt-2.5 pl-8 gap-2">
                                    <Typography color="info" fontWeight="bold">接機舉牌 (+$200)</Typography>
                                </Box>
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
                                {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="signboard" checked={extra} disabled />}
              label="兒童座椅及增高墊 (+$200)"
            />
          </FormGroup> */}
                                <Box className="mt-2.5 pl-8 gap-2">
                                    <Typography color="info" fontWeight="bold">兒童座椅及增高墊 (+$200)</Typography>
                                </Box>
                                <Grid container>
                                    {extra ?
                                        options.extraOptions.filter(filterEle => filterEle.type === "合併").map((mapEle, index) => {
                                            return (
                                                <Grid key={mapEle.es_id} item lg={6} sm={6} xs={12}>
                                                    <CusOutlinedSelect
                                                        id={mapEle.es_id}
                                                        name={"es_ids"}
                                                        label={mapEle.name}
                                                        options={options.extraCount}
                                                        optionKey={"name"}
                                                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                        disabled
                                                    />
                                                </Grid>
                                            )
                                        })
                                        : null}
                                </Grid>
                                {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="other" checked={other} disabled />}
              label="其它服務"
            />
          </FormGroup> */}
                                <Box className="mt-2.5 pl-8 gap-2">
                                    <Typography color="info" fontWeight="bold">其它服務</Typography>
                                </Box>
                                <Grid container>
                                    {other ?
                                        options.extraOptions.filter(filterEle => filterEle.type === "其它").map((mapEle, index) => {
                                            return (
                                                <Grid key={mapEle.es_id} item lg={6} sm={6} xs={12}>
                                                    <CusOutlinedSelect
                                                        id={mapEle.es_id}
                                                        name={"es_ids"}
                                                        label={mapEle.name}
                                                        options={options.extraCount}
                                                        optionKey={"name"}
                                                        value={orderAdd.es_ids ? (orderAdd.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === orderAdd.es_ids.find(item => item.es_id === mapEle.es_id).count) : null) : null}
                                                        disabled
                                                    />
                                                </Grid>
                                            )
                                        })
                                        : null}
                                </Grid>
                            </Box>
                        </Grid>
                        : null}
                    <Grid item xs={12} md={6} lg={6}>
                        <Box className="flex items-center pb-2.5 gap-2">
                            <EditNote color={"secondary"} />
                            <Typography color="secondary" fontWeight="bold">基本資料</Typography>
                        </Box>
                        <Grid container className="mt-2.5 pl-8 gap-2">
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