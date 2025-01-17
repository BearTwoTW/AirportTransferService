import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box, Typography, Switch, FormControlLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import { HighlightOff, Add, Search, Delete, Edit, Pages, CloudDownload, PublishedWithChanges } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { CusCard } from '../../../../components/CusCard';
import { CusInfoTitle } from '../../../../components/CusInfo';
import { CusDialog } from '../../../../components/CusDialog';
import { useSnackbar } from 'notistack';
import { CusInput } from '../../../../components/CusInput';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { NoResults } from '../../../../components/CusError';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusDatePicker } from '../../../../components/CusDatePicker';
import { CusTimePicker } from '../../../../components/CusTimePicker';
import { UserAPI, OptionList, DDMenu, ATS_OrderMaster, ATS_CityAreaSettings, ATS_ExtraSettings, ATS_AirportTerminalSettings, ATS_CarModelSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';
import { exportURL } from '../../../../js/DomainTS';
import moment, { max, Moment } from 'moment';
import "moment/locale/zh-tw";

export default function Order() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("OrderFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        signboard_title: null,
        signboard_content: null,
        o_id: null,
        visible: "Y",
        order_status: null,
        type: null,
        city: null,
        area: null,
        road: null,
        section: null,
        address: null,
        airport: null,
        terminal: null,
        flght_number: null,
        date_travel_start: null,
        date_travel_end: null,
        time_travel_start: null,
        time_travel_end: null,
        number_passenger: null,
        number_bags: null,
        cms_id: null,
        name_purchaser: null,
        phone_purchaser: null,
        email_purchaser: null,
        name_passenger: null,
        phone_passenger: null,
        email_passenger: null,
        excel: "",
        page: 1,
        num_per_page: 10,
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

    // indexedDB
    const [indexDB, setIndexDB] = useState(null);
    const [initDB, setInitDB] = useState(false);
    const initDBRef = useRef(initDB);
    initDBRef.current = initDB;

    // 帳號資料
    const [isLoading, setIsLoading] = useState(true);
    const [orderList, setOrderList] = useState([]); // 訂單列表
    // 下拉選單
    const [options, setOptions] = useState({
        cityAreaOptions: {
            cityOptions: [],
            areaOptions: []
        },
        airPortOptions: {
            airportOptions: [],
            terminalOptions: []
        },
        passengerOptions: [],
        bagsOptions: [], // 行李數
        carModelOptions: [],
        orderStatusOptions: [],
        orderTypeOptions: [
            { name: "送機" },
            { name: "接機" }
        ],
        extraOptions: [], // 加價服務
        extraCount: [
            { key: 0, name: "1" },
            { key: 1, name: "2" },
        ], // 加價服務
        visible: [
            { name: "作廢", value: "N" },
            { name: "正常", value: "Y" },
        ],
    });
    const [pageCount, setPageCount] = useState(0);

    // Dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    // 提示框
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // 初始化indexedDB
        get_ECC_indexedDB_factory().then(async idb => {
            let search_set = (idb !== null
                ? await idb.search(
                    "QueryCondition",
                    [window.location.pathname, "Search", sessionStorage.user_id,]
                ).then(res => {
                    if (res.success && res.data !== null) return res.data.data;
                    else return null;
                })
                : null);
            setIndexDB(idb);
            setPageSearch(prev => ({
                ...prev,
                ...search_set,
            }));

            // 存在search_set就用indexedDB的搜尋條件，不然就用預設的搜尋條件
            searchOrder(pageSearch ?? pageSearch);
        });
        setInitDB(true);
    }, []);

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

    /**
     * 查詢訂單
     */
    const searchOrder = async (searchPrams, searchbutton = false) => {
        setIsLoading(true);
        if (searchbutton) {
            setPageSearch(prevParams => ({
                ...prevParams,
                page: 1
            }));
        }
        if (initDBRef.current) {
            try {
                ATS_OrderMaster.ATS_OrderMasterSearch(searchPrams).then(async res => {
                    if (res.success) {
                        if (indexDB !== null) {
                            await indexDB.update("QueryCondition", {
                                page: window.location.pathname,
                                action: "Search",
                                user_id: sessionStorage.user_id,
                                data: {
                                    ...searchPrams,
                                    page: searchPrams.page
                                }
                            });
                        }

                        setOrderList(res.data);
                        setPageCount(res.page);
                    }
                    setIsLoading(false);
                });
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                enqueueSnackbar("查詢失敗", {
                    variant: "error",
                    persist: true
                });
            }
        }
    };

    /**[作廢]訂單 */
    const visible_Click = useCallback(({ e, id, visible }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        setDialogData(({
            id: 'visible',
            DialogTitle: visible === "N" ? '訂單作廢' : "訂單生效",
            DialogContent: <DialogsInner type={'visible'} ref={useDialogInner} options={options} o_id={id} visible={visible} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => edit_Visible(id, visible)} color="primary" text="確認" />
                </React.Fragment>)
        }));
    }, [])

    /** 編輯是否開放 */
    const edit_Visible = async (id, visible) => {
        const { success, message } = await ATS_OrderMaster.ATS_OrderMasterUpdate({
            o_id: id,
            visible: visible
        });

        if (success) {
            dialogClose();
            searchOrder(pageSearch);
        }

        enqueueSnackbar(message, {
            variant: success ? "success" : "warning",
            persist: !success
        });
    };

    /** [清除]查查查查 */
    const cleanSearch_Click = () => {
        setPageSearch(prevData => ({
            ...prevData,
            signboard_title: null,
            signboard_content: null,
            o_id: null,
            visible: "Y",
            order_status: null,
            type: null,
            city: null,
            area: null,
            road: null,
            section: null,
            address: null,
            airport: null,
            terminal: null,
            flght_number: null,
            date_travel_start: null,
            date_travel_end: null,
            time_travel_start: null,
            time_travel_end: null,
            number_passenger: null,
            number_bags: null,
            cms_id: null,
            name_purchaser: null,
            phone_purchaser: null,
            email_purchaser: null,
            name_passenger: null,
            phone_passenger: null,
            email_passenger: null,
            excel: "",
            page: 1,
            num_per_page: 10,
        }));
    };

    useEffect(() => {
        // 初始化下拉選單
        async function awaitJsonList() {
            const orderStatusArr = await DDMenu.selectorCode('OS');

            setOptions(prevData => ({
                ...prevData,
                orderStatusOptions: orderStatusArr,
            }));
        };

        awaitJsonList();
        searchSelectOption();
        searchOrder(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo((props) => {
        return (
            orderList.map((item, index) => (
                <TableRow
                    hover
                    key={item.o_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.o_id}</TableCell>
                    <TableCell>{item.order_status}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.road}</TableCell>
                    <TableCell>{item.flght_number}</TableCell>
                    <TableCell>{item.date_travel}</TableCell>
                    <TableCell>{item.time_travel.slice(0, 5)}</TableCell>
                    <TableCell>{item.name_purchaser}</TableCell>
                    <TableCell>{item.phone_purchaser}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, id: item.o_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete ?
                            item.visible === "Y" ?
                                <CusIconButton
                                    onClick={(e) => visible_Click({ e: e, id: item.o_id, visible: "N" })}
                                    color='primary'
                                    icon={<Delete />}
                                /> :
                                <CusIconButton
                                    onClick={(e) => visible_Click({ e: e, id: item.o_id, visible: "Y" })}
                                    color='primary'
                                    icon={<PublishedWithChanges />}
                                />
                            : null}
                    </TableCell>
                </TableRow>
            ))
        );
    });

    /**跳出新增視窗 */
    const add_click = () => {
        useDialog.current.handleOpen();
        setDialogData(({
            id: 'add',
            DialogTitle: '新增訂單',
            DialogContent: <DialogsInner type={'add'} ref={useDialogInner} options={options} />,
            DialogActions: (
                <>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
                </>
            ),
            maxWidth: 'md'
        }));
    };

    /**[新建確認]訂單 */
    const add_Confirm = () => {
        const { orderAdd, initOrderAddCheck, setOrderAddCheck, checkboxState } = useDialogInner.current;
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

        // 檢查下拉選單的錯誤狀態
        const mergeError =
            checkboxState.extra && !orderAdd.es_ids?.some((item) => item.extraType === "合併");

        // 檢查下拉選單的錯誤狀態 - 其它
        const otherError =
            checkboxState.other && !orderAdd.es_ids?.some((item) => item.extraType === "其它");

        // 檢查是否有任何必填欄位未填
        const hasError = Object.values(requiredFields).some(Boolean) || mergeError || otherError;

        if (hasError) {
            setOrderAddCheck({
                ...requiredFields,
                es_ids_merge: mergeError,
                es_ids_other: otherError,
            });
        } else {
            setOrderAddCheck(initOrderAddCheck);

            ATS_OrderMaster.ATS_OrderMasterCreate(orderAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchOrder({
                        ...pageSearch,
                    });
                }
                enqueueSnackbar(res.message, {
                    variant: res.success ? "success" : "error",
                    persist: !res.success
                });
            });
        }
    };

    /**[修改]訂單 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = orderList.filter(item => item.o_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} options={options} getEditData={getEditData} o_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>),
            maxWidth: 'md'
        }));
    };

    /**[修改確認]訂單 */
    const edit_Confirm = async () => {
        const { editData, editInitCheckState, setEditFieldCheck, checkboxState } = useDialogInner.current;
        let data = {
            ...editData.dtlData,
            ...editData.updData
        }
        // 定義需要檢查的欄位
        const requiredFields = {
            order_status: !data.order_status,
            type: !data.type,
            city: !data.city,
            area: !data.area,
            road: !data.road,
            address: !data.address,
            airport: !data.airport,
            terminal: !data.terminal,
            date_travel: !data.date_travel,
            time_travel: !data.time_travel,
            number_passenger: !data.number_passenger,
            number_bags: data.number_bags === null || data.number_bags === "" || data.number_bags === undefined, // !data.number_bags 會把 0 當成 true
            cms_id: !data.cms_id,
            name_purchaser: !data.name_purchaser,
            phone_purchaser: !data.phone_purchaser,
            email_purchaser: !data.email_purchaser,
            name_passenger: !data.name_passenger,
            phone_passenger: !data.phone_passenger,
            email_passenger: !data.email_passenger,
            signboard_title: checkboxState.signboard && !data.signboard_title,
            signboard_content: checkboxState.signboard && !data.signboard_content,
        };

        // 檢查下拉選單的錯誤狀態
        const extraError =
            checkboxState.extra && data.es_ids?.some((item) => item.extraType === "合併" && !item.count);
        console.log(extraError)

        // 檢查下拉選單的錯誤狀態 - 其它
        const otherError =
            checkboxState.other && data.es_ids?.some((item) => item.extraType === "其它" && !item.count);

        // 檢查是否有任何必填欄位未填
        const hasError = Object.values(requiredFields).some(Boolean) || extraError || otherError;

        if (hasError) {
            setEditFieldCheck({
                ...requiredFields,
                es_ids_merge: extraError,
                es_ids_other: otherError,
            });
        } else {
            setEditFieldCheck(editInitCheckState);

            const { success, message } = await ATS_OrderMaster.ATS_OrderMasterUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchOrder(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    // /**[刪除]訂單 */
    // const del_Click = useCallback(({ e, name, id }) => {
    //     e.stopPropagation();
    //     useDialog.current.handleOpen();

    //     setDialogData(({
    //         id: 'del',
    //         DialogTitle: '刪除',
    //         DialogContent: <DialogsInner type={'del'} ref={useDialogInner} options={options} name={name} id={id} />,
    //         DialogActions: (
    //             <React.Fragment>
    //                 <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
    //                 <CusTextButton autoFocus onClick={() => { del_Confirm(e, id) }} color="primary" text="確認" />
    //             </React.Fragment>)
    //     }));
    // }, [])

    // /**[確認]刪除訂單 */
    // const del_Confirm = useCallback((e, _id) => {
    //     e.stopPropagation();
    //     ATS_OrderMaster.ATS_OrderMasterDelete({ o_id: _id }).then(res => {
    //         if (res.success) {
    //             dialogClose();
    //             searchOrder(pageSearch);
    //         }
    //         enqueueSnackbar(res.message, {
    //             variant: res.success ? "success" : "warning",
    //             persist: !res.success
    //         });
    //     });
    // }, []);

    /**輸入框*/
    const search_handleInput = (e) => {
        const { name, value } = e.target
        let formattedValue = value;
        if (name === "date_travel_start" || name === "date_travel_end") {
            formattedValue = new Date(value).toLocaleDateString('en-CA');
        }

        setPageSearch(prevParams => ({
            ...prevParams,
            page: 1,
            [name]: name === "date_travel_start" || name === "date_travel_end" ? formattedValue : value
        }));
    };

    /**[事件]下拉選單 */
    const search_handleSelect = (e) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        if (name === "city") {
            setPageSearch(prev => ({
                ...prev,
                area: null,
                [name]: val,
            }));
        } else if (name === "airport") {
            setPageSearch(prev => ({
                ...prev,
                terminal: null,
                [name]: val,
            }));
        } else {
            setPageSearch(prev => ({
                ...prev,
                [name]: val,
            }));
        }
    };

    /**選擇分頁顯示行數 */
    const onRowsPerPageChange = async (e) => {
        setPageSearch((prevData) => ({
            ...prevData,
            page: 1,
            num_per_page: parseInt(e.target.value, 10)
        }));
    };

    /**選擇頁碼 */
    const handleChangePage = async (e, nowPage) => {
        setPageSearch((prevData) => ({
            ...prevData,
            page: parseInt(nowPage),
        }))
    };

    /**匯出訂單*/
    const exportImport = async () => {
        let importData = await ATS_OrderMaster.ATS_OrderMasterSearch({
            ...pageSearch,
            excel: "Y"
        });

        if (importData.success) {
            let url = exportURL + "/" + importData.data;
            window.open(url);
        } else {
            enqueueSnackbar(importData.message, {
                variant: "error",
                persist: true
            });
        }
    };

    /**關閉Dialog  */
    const dialogClose = () => {
        useDialog.current.handleClose();
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CusCard content={
                        <React.Fragment>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--o_id"}
                                    name={"o_id"}
                                    label={"訂單編號"}
                                    value={pageSearch.o_id}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--order_status"}
                                    name={"order_status"}
                                    label={"訂單狀態"}
                                    options={options.orderStatusOptions}
                                    optionKey={"name"}
                                    value={options.orderStatusOptions.some(item => item.name === pageSearch.order_status) ? options.orderStatusOptions.find(item => item.name === pageSearch.order_status) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--type"}
                                    name={"type"}
                                    label={"訂單類型"}
                                    options={options.orderTypeOptions}
                                    optionKey={"name"}
                                    value={options.orderTypeOptions.some(item => item.name === pageSearch.type) ? options.orderTypeOptions.find(item => item.name === pageSearch.type) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--city"}
                                    name={"city"}
                                    label={"城市"}
                                    options={options.cityAreaOptions.cityOptions}
                                    optionKey={"name"}
                                    value={options.cityAreaOptions.cityOptions.some(item => item.name === pageSearch.city) ? options.cityAreaOptions.cityOptions.find(item => item.name === pageSearch.city) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--area"}
                                    name={"area"}
                                    label={"區域"}
                                    options={options.cityAreaOptions.areaOptions.filter(item => item.city === pageSearch.city)}
                                    optionKey={"name"}
                                    value={options.cityAreaOptions.areaOptions.some(item => item.name === pageSearch.area) ? options.cityAreaOptions.areaOptions.find(item => item.name === pageSearch.area) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                    disabled={pageSearch.city ? false : true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--road"}
                                    name={"road"}
                                    label={"路"}
                                    value={pageSearch.road}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--flght_number"}
                                    name={"flght_number"}
                                    label={"航班號碼"}
                                    value={pageSearch.flght_number}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <CusDatePicker
                                    id={"search--date_travel_start"}
                                    name={"date_travel_start"}
                                    label={"出發日期起"}
                                    views={["year", "month", "day"]}
                                    value={pageSearch.date_travel_start}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <CusDatePicker
                                    id={"search--date_travel_end"}
                                    name={"date_travel_end"}
                                    label={"出發日期迄"}
                                    views={["year", "month", "day"]}
                                    value={pageSearch.date_travel_end}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--name_purchaser"}
                                    name={"name_purchaser"}
                                    label={"訂購人姓名"}
                                    value={pageSearch.name_purchaser}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--phone_purchaser"}
                                    name={"phone_purchaser"}
                                    label={"訂購人電話"}
                                    value={pageSearch.phone_purchaser}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                                <CusTextIconButton
                                    color={"default"}
                                    text={"清除"}
                                    startIcon={<HighlightOff />}
                                    onClick={() => cleanSearch_Click()}
                                />
                                <CusTextIconButton
                                    color={"info"}
                                    text={"查詢"}
                                    startIcon={<Search />}
                                    onClick={() => searchOrder(pageSearch, true)}
                                />
                            </Grid>
                        </React.Fragment>
                    } />
                </Grid>
                <Grid item xs={12}>
                    <CusCard content={
                        <React.Fragment>
                            <Grid item xs={12}>
                                <Box display={"flex"} justifyContent={"flex-end"}>
                                    <CusTextIconButton
                                        color={"secondary"}
                                        variant={"outlined"}
                                        text={"匯出訂單"}
                                        startIcon={<CloudDownload />}
                                        onClick={exportImport} />
                                    {permission.Add
                                        ? <CusTextIconButton
                                            color={"primary"}
                                            text={"新增訂單"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? orderList.length > 0
                                        ? <React.Fragment>
                                            <CusBasicTableTS
                                                hasRowsPerPage={true}
                                                rowsPerPage={pageSearch.num_per_page}
                                                onPageChange={handleChangePage}
                                                count={pageCount}
                                                page={pageSearch.page}
                                                onRowsPerPageChange={onRowsPerPageChange}
                                                tableHead={[
                                                    { name: "排序" },
                                                    { name: "訂單編號" },
                                                    { name: "訂單狀態" },
                                                    { name: "訂單類型" },
                                                    { name: "城市" },
                                                    { name: "區域" },
                                                    { name: "路" },
                                                    { name: "航班號碼" },
                                                    { name: "出發日期" },
                                                    { name: "乘車時間" },
                                                    { name: "訂購人姓名" },
                                                    { name: "訂購人電話" },
                                                    { name: "訂單金額" },
                                                    { name: "操作" },
                                                ]}
                                                tableBody={
                                                    <TableBodyContent
                                                        edit_Visible={edit_Visible}
                                                    />
                                                }
                                            />
                                            <PaginationActionsTS
                                                totalPage={pageCount}
                                                page={pageSearch.page}
                                                onPageChange={(e, nowPage) => handleChangePage(e, nowPage)}
                                            />
                                        </React.Fragment>
                                        : <NoResults />
                                    : <CircularLoading />}
                            </Grid>
                        </React.Fragment>
                    } />
                </Grid>
            </Grid>
            <CusDialog ref={useDialog} info={dialogData} />
        </React.Fragment>
    );
};

/**新增modal內容*/
const DialogsInner = forwardRef((props, ref) => {
    const { type, name, getEditData, o_id, options, visible } = props;
    const extraData = type === "edit" ? getEditData.es_ids.filter(item => item.es_type === "合併") : null; // 有沒有加購服務(不包含舉牌)
    const otherData = type === "edit" ? getEditData.es_ids.filter(item => item.es_type === "其它") : null; // 有沒有其它服務(不包含舉牌)
    const extraIsNotEmpty = type === "edit" ? extraData.length !== 0 : false; // 在加購服務中是否有資料
    const otherIsNotEmpty = type === "edit" ? otherData.length !== 0 : false; // 在加購服務中是否有資料
    const sameDetail =
        type === "edit" ? getEditData.name_passenger === getEditData.name_purchaser
            && getEditData.phone_passenger === getEditData.phone_purchaser
            && getEditData.email_passenger === getEditData.email_purchaser
            : false; // 乘客資料是否與訂購人相同

    // checkbox 狀態
    const [checkboxState, setCheckboxState] = useState({
        signboard: type === "edit" ? getEditData.es_ids.some(item => item.es_id === "00001") : false,
        extra: type === "edit" ? extraIsNotEmpty : false,
        other: type === "edit" ? otherIsNotEmpty : false,
        sameDetail: type === "edit" ? sameDetail : false,
    });

    const orderStatusOptions = options.orderStatusOptions; // 訂單狀態
    const orderTypeOptions = options.orderTypeOptions; // 訂單類型 (送機/接機)
    const cityOptions = options.cityAreaOptions.cityOptions; // 城市
    const areaOptions = options.cityAreaOptions.areaOptions; // 區域
    const airportOptions = options.airPortOptions.airportOptions; // 機場
    const terminalOptions = options.airPortOptions.terminalOptions; // 航廈
    const passengerOptions = options.passengerOptions; // 人數
    const bagsOptions = options.bagsOptions; // 行李數

    const otherExtra = options.extraOptions.filter(option => option.type === "其它");

    const [carModelOptions, setCarModelOptions] = useState(options.carModelOptions);

    const [extraOptions, setExtraOptions] = useState([]);
    const [selectedCounts, setSelectedCounts] = useState({});


    // 新增訂單
    const [orderAdd, setOrderAdd] = useState({
        visible: "Y",
        type: "送機",
        city: null,
        area: null,
        road: null,
        address: null,
        airport: null,
        terminal: null,
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
        calculation: "N"
    });

    const initOrderAddCheck = {
        type: false,
        city: false,
        area: false,
        road: false,
        address: false,
        airport: false,
        terminal: false,
        date_travel: false,
        time_travel: false,
        number_passenger: false,
        number_bags: false,
        cms_id: false,
        signboard_title: false,
        signboard_content: false,
        name_purchaser: false,
        phone_purchaser: false,
        email_purchaser: false,
        name_passenger: false,
        phone_passenger: false,
        email_passenger: false,
    }
    const [orderAddCheck, setOrderAddCheck] = useState(initOrderAddCheck);

    // 編輯訂單
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { o_id: o_id },
        signboardData: type === "edit" ? (getEditData.es_ids ? getEditData.es_ids.filter(item => item.es_type === "舉牌") : []) : [],
        extraData: type === "edit" ? (getEditData.es_ids ? getEditData.es_ids.filter(item => item.es_type === "合併") : []) : [],
        otherData: type === "edit" ? (getEditData.es_ids ? getEditData.es_ids.filter(item => item.es_type === "其它") : []) : [],
    });

    const editInitCheckState = {
        order_status: false,
        type: false,
        city: false,
        area: false,
        road: false,
        address: false,
        airport: false,
        terminal: false,
        date_travel: false,
        time_travel: false,
        number_passenger: false,
        number_bags: false,
        cms_id: false,
        signboard_title: false,
        signboard_content: false,
        name_purchaser: false,
        phone_purchaser: false,
        email_purchaser: false,
        name_passenger: false,
        phone_passenger: false,
        email_passenger: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    // 新增加價勾選
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

    // 編輯加價勾選
    const handleCheckboxChangeEdit = (event) => {
        const { name, checked } = event.target;
        // let data = {
        //     ...editData.dtlData,
        //     ...editData.updData
        // }
        let dtlData = editData.dtlData;
        let updData = editData.updData;
        let arr = updData ? updData.es_ids ? updData.es_ids : [] : [];
        let signboardData = editData.signboardData;
        let extraData = editData.extraData.es_ids ? editData.extraData.es_ids : [];
        let otherData = editData.otherData.es_ids ? editData.otherData.es_ids : [];

        if (name === "signboard") { // 舉牌
            // 如果勾選, 就把舉牌加入es_ids欄位
            if (checked) {
                // 如果本來就有這個加價項目，還能把checkbox打勾，就是已經經過一次取消勾選了
                if (signboardData.some(item => item.es_id === options.extraOptions.find(item => item.type === "舉牌").es_id)) {
                    // 調整新的array
                    arr = arr.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "舉牌").es_id);
                    // 調整原本的array
                    let arrEs_id = signboardData.filter(item => item.es_id === options.extraOptions.find(item => item.type === "舉牌").es_id)[0];
                    arrEs_id.count = 1;
                    let newDtlData = signboardData.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "舉牌").es_id);
                    newDtlData.push(arrEs_id);
                    setEditData(prev => ({
                        ...prev,
                        signboardData: newDtlData,
                    }));
                } else {
                    arr.push({
                        es_id: options.extraOptions.find(item => item.type === "舉牌").es_id,
                        count: "1",
                        type: "Create",
                    });
                }
                console.log("1173,arr: ", arr);
                // 更新加購
                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        es_ids: arr,
                    }
                }));
            } else {
                // 如果本來就有這個加價項目，把checkbox取消，就是要刪除
                if (signboardData.some(item => item.es_id === options.extraOptions.find(item => item.type === "舉牌").es_id)) {
                    // 加到調整的array
                    arr.push({
                        es_id: options.extraOptions.find(item => item.type === "舉牌").es_id,
                        count: "1",
                        type: "Delete",
                    });
                    // 調整原本的array
                    let arrEs_id = signboardData.filter(item => item.es_id === options.extraOptions.find(item => item.type === "舉牌").es_id)[0];
                    arrEs_id.count = 0;
                    let newDtlData = signboardData.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "舉牌").es_id);
                    newDtlData.push(arrEs_id);
                    setEditData(prev => ({
                        ...prev,
                        signboardData: newDtlData
                    }));
                }
                else arr = arr.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "舉牌").es_id);

                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        signboard_title: null,
                        signboard_content: null,
                        es_ids: arr,
                    }
                }));
            }
        } else if (name === "extra") {
            if (!checked) {
                // 如果本來就有這個加價項目，把checkbox取消，就是要刪除
                if (extraData.some(item => item.es_id === options.extraOptions.find(item => item.type === "合併").es_id)) {
                    // 加到調整的array
                    extraData.forEach(dtlItem => {
                        arr.push({
                            es_id: dtlItem.es_id,
                            count: "1",
                            type: "Delete",
                        });
                    });
                    // 調整原本的array
                    let arrEs_id = extraData.filter(item => item.es_id === options.extraOptions.find(item => item.type === "合併").es_id)[0];
                    arrEs_id.count = 0;
                    let newDtlData = extraData.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "合併").es_id);
                    newDtlData.push(arrEs_id);
                    setEditData(prev => ({
                        ...prev,
                        extraData: newDtlData
                    }));
                }
                else arr = arr.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "合併").es_id);
                console.log("1205,arr: ", arr);
                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        es_ids: arr,
                    }
                }));
            }
        } else if (name === "other") {
            if (!checked) {
                // 如果本來就有這個加價項目，把checkbox取消，就是要刪除
                if (otherData.some(item => item.es_id === options.extraOptions.find(item => item.type === "其它").es_id)) {
                    // 加到調整的array
                    otherData.forEach(dtlItem => {
                        arr.push({
                            es_id: dtlItem.es_id,
                            count: "1",
                            type: "Delete",
                        });
                    });
                    // 調整原本的array
                    let arrEs_id = otherData.filter(item => item.es_id === options.extraOptions.find(item => item.type === "其它").es_id)[0];
                    arrEs_id.count = 0;
                    let newDtlData = otherData.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "其它").es_id);
                    newDtlData.push(arrEs_id);
                    setEditData(prev => ({
                        ...prev,
                        otherData: newDtlData
                    }));
                }
                else arr = arr.filter(item => item.es_id !== options.extraOptions.find(item => item.type === "其它").es_id);
                console.log("1205,arr: ", arr);
                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        es_ids: arr,
                    }
                }));
            }
        } else if (name === "sameDetail") { // 同訂購人
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    name_passenger: checked ? editData.dtlData.name_purchaser : null,
                    phone_passenger: checked ? editData.dtlData.phone_purchaser : null,
                    email_passenger: checked ? editData.dtlData.email_purchaser : null,
                }
            }));
            setEditFieldCheck(prev => ({
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

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        if (name === "section" || name === "road") {
            // 使用正則表達式來移除所有阿拉伯數字
            const filteredValue = val ? val.replace(/[0-9]/g, '') : null;

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
                alert(`選擇的數量不能超過 ${maxServiceExtras}`);
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

    /**
     * @description [事件]input
     */
    const edit_HandleInput = (e) => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        if (name === "section" || name === "road") {
            // 使用正則表達式來移除所有阿拉伯數字
            const filteredValue = val ? val.replace(/[0-9]/g, '') : null;

            setOrderAdd(prev => ({
                ...prev,
                [name]: filteredValue
            }));
        } else if (name === "date_travel") {
            let formattedValue = val ? val.split('T')[0] : null; // 格式化日期為 YYYY-MM-DD

            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: formattedValue
                }
            }));

            // 檢查是否為三天後的日期
            if (formattedValue && moment(formattedValue).isSame(moment().add(3, 'days'), 'day')) {
                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        minTime: moment().format('HH:mm:ss'), // 如果是三天後，設定 minTime 為當前時間
                    }
                }));
            } else {
                setEditData(prev => ({
                    ...prev,
                    updData: {
                        ...prev.updData,
                        minTime: null, // 否則取消時間限制
                    }
                }));
            }
        } else if (name === "time_travel") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: val ? val + ":00" : null
                }
            }));
        } else {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: val
                }
            }));
        }
    };

    /**[事件]下拉選單 */
    const edit_HandleSelect = (e, type) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        if (name === "city") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    area: null,
                    [name]: val
                }
            }));
        } else if (name === "airport") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    terminal: null,
                    [name]: val
                }
            }));
        } else if (name === "number_passenger") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: val,
                }
            }));

            const passengerCount = parseInt(val) || 0; // 選擇人數
            const luggageCount = parseInt(editData.number_bags ? editData.number_bags : 0) || 0; // 選擇行李數

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "number_bags") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: val,
                }
            }));

            const passengerCount = parseInt(editData.number_passenger ? editData.number_passenger : 0) || 0; // 選擇人數
            const luggageCount = parseInt(val) || 0; // 選擇行李數

            const filteredVehicles = options.carModelOptions.filter(item => item.max_passengers >= passengerCount && item.max_luggage >= luggageCount);

            setCarModelOptions(filteredVehicles);
        } else if (name === "es_ids") {
            let arr = editData.updData.es_ids ? [...editData.updData.es_ids] : []; // 使用展開運算符號來複製陣列
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
                    extraType: type,
                });
            }
            if (type === "合併") {
                setEditFieldCheck(prev => ({
                    ...prev,
                    es_ids_merge: false,
                }));
                setEditData(prev => ({
                    ...prev,
                    extraData: {
                        ...prev.extraData,
                        [name]: arr.length > 0 ? arr : null,
                    },
                }))
            } else {
                setEditFieldCheck(prev => ({
                    ...prev,
                    es_ids_other: false,
                }));
                setEditData(prev => ({
                    ...prev,
                    otherData: {
                        ...prev.otherData,
                        [name]: arr.length > 0 ? arr : null,
                    },
                }))
            }

            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: arr.length > 0 ? arr : null,
                },
            }))
        } else {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: val
                }
            }));
        }
        setEditFieldCheck(prev => ({
            ...prev,
            [name]: !val ? true : false,
        }));
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        orderAdd,
        initOrderAddCheck,
        setOrderAddCheck,
        checkboxState,

        editData,
        editInitCheckState,
        setEditFieldCheck
    }));

    if (type === "add") {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>訂單類型</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"add--type"}
                            name={"type"}
                            label={"訂單類型"}
                            options={orderTypeOptions}
                            optionKey={"name"}
                            error={orderAddCheck.type}
                            value={orderTypeOptions.some(item => item.name === orderAdd.type) ? orderTypeOptions.find(item => item.name === orderAdd.type) : null}
                            onChangeEvent={(e) => add_HandleSelect(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>上車地點</Typography>
                    </Grid>
                    {orderAdd.type === "送機" ?
                        <React.Fragment>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"add--city"}
                                    name={"city"}
                                    label={"城市"}
                                    options={cityOptions}
                                    optionKey={"name"}
                                    error={orderAddCheck.city}
                                    value={cityOptions.some(item => item.name === orderAdd.city) ? cityOptions.find(item => item.name === orderAdd.city) : null}
                                    onChangeEvent={(e) => add_HandleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"add--area"}
                                    name={"area"}
                                    label={"區域"}
                                    options={areaOptions.filter(item => item.city === orderAdd.city)}
                                    optionKey={"name"}
                                    error={orderAddCheck.area}
                                    value={areaOptions.some(item => item.name === orderAdd.area) ? areaOptions.find(item => item.name === orderAdd.area) : null}
                                    onChangeEvent={(e) => add_HandleSelect(e)}
                                    disabled={orderAdd.city ? false : true}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"add--road"}
                                    name={"road"}
                                    label={"路"}
                                    error={orderAddCheck.road}
                                    value={orderAdd.road}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"add--section"}
                                    name={"section"}
                                    label={"段"}
                                    value={orderAdd.section}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"add--address"}
                                    name={"address"}
                                    label={"巷/弄/號"}
                                    error={orderAddCheck.address}
                                    value={orderAdd.address}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                        </React.Fragment>
                        : orderAdd.type === "接機" ?
                            <React.Fragment>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"add--airport"}
                                        name={"airport"}
                                        label={"機場"}
                                        options={airportOptions}
                                        optionKey={"name"}
                                        error={orderAddCheck.airport}
                                        value={airportOptions.some(item => item.name === orderAdd.airport) ? airportOptions.find(item => item.name === orderAdd.airport) : null}
                                        onChangeEvent={(e) => add_HandleSelect(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"add--terminal"}
                                        name={"terminal"}
                                        label={"航廈"}
                                        options={terminalOptions.filter(item => item.airport === orderAdd.airport)}
                                        optionKey={"name"}
                                        error={orderAddCheck.terminal}
                                        value={terminalOptions.some(item => item.name === orderAdd.terminal) ? terminalOptions.find(item => item.name === orderAdd.terminal) : null}
                                        onChangeEvent={(e) => add_HandleSelect(e)}
                                    />
                                </Grid>
                            </React.Fragment>
                            : null}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>下車地點</Typography>
                    </Grid>
                    {orderAdd.type === "送機" ?
                        <React.Fragment>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"add--airport"}
                                    name={"airport"}
                                    label={"機場"}
                                    options={airportOptions}
                                    optionKey={"name"}
                                    error={orderAddCheck.airport}
                                    value={airportOptions.some(item => item.name === orderAdd.airport) ? airportOptions.find(item => item.name === orderAdd.airport) : null}
                                    onChangeEvent={(e) => add_HandleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"add--terminal"}
                                    name={"terminal"}
                                    label={"航廈"}
                                    options={terminalOptions.filter(item => item.airport === orderAdd.airport)}
                                    optionKey={"name"}
                                    error={orderAddCheck.terminal}
                                    value={terminalOptions.some(item => item.name === orderAdd.terminal) ? terminalOptions.find(item => item.name === orderAdd.terminal) : null}
                                    onChangeEvent={(e) => add_HandleSelect(e)}
                                />
                            </Grid>
                        </React.Fragment>
                        : orderAdd.type === "接機" ?
                            <React.Fragment>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"add--city"}
                                        name={"city"}
                                        label={"城市"}
                                        options={cityOptions}
                                        optionKey={"name"}
                                        error={orderAddCheck.city}
                                        value={cityOptions.some(item => item.name === orderAdd.city) ? cityOptions.find(item => item.name === orderAdd.city) : null}
                                        onChangeEvent={(e) => add_HandleSelect(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"add--area"}
                                        name={"area"}
                                        label={"區域"}
                                        options={areaOptions.filter(item => item.city === orderAdd.city)}
                                        optionKey={"name"}
                                        error={orderAddCheck.area}
                                        value={areaOptions.some(item => item.name === orderAdd.area) ? areaOptions.find(item => item.name === orderAdd.area) : null}
                                        onChangeEvent={(e) => add_HandleSelect(e)}
                                        disabled={orderAdd.city ? false : true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"add--road"}
                                        name={"road"}
                                        label={"路"}
                                        error={orderAddCheck.road}
                                        value={orderAdd.road}
                                        onChangeEvent={(e) => add_handelInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"add--section"}
                                        name={"section"}
                                        label={"段"}
                                        value={orderAdd.section}
                                        onChangeEvent={(e) => add_handelInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"add--address"}
                                        name={"address"}
                                        label={"巷/弄/號"}
                                        error={orderAddCheck.address}
                                        value={orderAdd.address}
                                        onChangeEvent={(e) => add_handelInput(e)}
                                    />
                                </Grid>
                            </React.Fragment>
                            : null}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>預約乘車日期及時間</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"add--flght_number"}
                            name={"flght_number"}
                            label={"航班號碼"}
                            value={orderAdd.flght_number}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusDatePicker
                            id={"add--date_travel"}
                            name={"date_travel"}
                            label={"出發日期"}
                            views={["year", "month", "day"]}
                            minDate={moment().add(3, 'days')}
                            error={orderAddCheck.date_travel}
                            value={orderAdd.date_travel}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
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
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>人數及行李</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"add--number_passenger"}
                            name={"number_passenger"}
                            label={"人數"}
                            options={passengerOptions}
                            optionKey={"name"}
                            error={orderAddCheck.number_passenger}
                            value={passengerOptions.some(item => item.name === orderAdd.number_passenger) ? passengerOptions.find(item => item.name === orderAdd.number_passenger) : null}
                            onChangeEvent={(e) => add_HandleSelect(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"add--number_bags"}
                            name={"number_bags"}
                            label={"行李數"}
                            options={bagsOptions}
                            optionKey={"name"}
                            error={orderAddCheck.number_bags}
                            value={bagsOptions.some(item => item.name === orderAdd.number_bags) ? bagsOptions.find(item => item.name === orderAdd.number_bags) : null}
                            onChangeEvent={(e) => add_HandleSelect(e)}
                            disabled={orderAdd.number_passenger ? false : true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>車型</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"add--cms_id"}
                            name={"cms_id"}
                            label={"車型"}
                            options={carModelOptions}
                            optionKey={"cms_id"}
                            error={orderAddCheck.airport}
                            value={carModelOptions.some(item => item.cms_id === orderAdd.cms_id) ? carModelOptions.find(item => item.cms_id === orderAdd.cms_id) : null}
                            onChangeEvent={(e) => add_HandleSelect(e)}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>加價服務</Typography>
                    </Grid>
                    <Grid container>
                        {orderAdd.type === "接機" ?
                            <React.Fragment>
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
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>基本資料</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"add--name_purchaser"}
                            name={"name_purchaser"}
                            label={"訂購人姓名"}
                            error={orderAddCheck.name_purchaser}
                            value={orderAdd.name_purchaser}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"add--phone_purchaser"}
                            name={"phone_purchaser"}
                            label={"訂購人電話"}
                            error={orderAddCheck.phone_purchaser}
                            value={orderAdd.phone_purchaser}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
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
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"add--name_passenger"}
                            name={"name_passenger"}
                            label={"乘客姓名"}
                            error={orderAddCheck.name_passenger}
                            value={orderAdd.name_passenger}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"add--phone_passenger"}
                            name={"phone_passenger"}
                            label={"乘客電話"}
                            error={orderAddCheck.phone_passenger}
                            value={orderAdd.phone_passenger}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
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
            </React.Fragment>
        );
    } else if (type === 'edit') {
        let data = {
            ...editData.dtlData,
            ...editData.updData,
            signboardData: editData.signboardData,
            extraData: editData.extraData,
            otherData: editData.otherData,
        }
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>訂單類型</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"edit--order_status"}
                            name={"order_status"}
                            label={"訂單狀態"}
                            options={orderStatusOptions}
                            optionKey={"name"}
                            error={editFieldCheck.order_status}
                            value={orderStatusOptions.some(item => item.name === data.order_status) ? orderStatusOptions.find(item => item.name === data.order_status) : null}
                            onChangeEvent={(e) => edit_HandleSelect(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"edit--type"}
                            name={"type"}
                            label={"訂單類型"}
                            options={orderTypeOptions}
                            optionKey={"name"}
                            error={editFieldCheck.type}
                            value={orderTypeOptions.some(item => item.name === data.type) ? orderTypeOptions.find(item => item.name === data.type) : null}
                            onChangeEvent={(e) => edit_HandleSelect(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>上車地點</Typography>
                    </Grid>
                    {data.type === "送機" ?
                        <React.Fragment>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"edit--city"}
                                    name={"city"}
                                    label={"城市"}
                                    options={cityOptions}
                                    optionKey={"name"}
                                    error={editFieldCheck.city}
                                    value={cityOptions.some(item => item.name === data.city) ? cityOptions.find(item => item.name === data.city) : null}
                                    onChangeEvent={(e) => edit_HandleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"edit--area"}
                                    name={"area"}
                                    label={"區域"}
                                    options={areaOptions.filter(item => item.city === data.city)}
                                    optionKey={"name"}
                                    error={editFieldCheck.area}
                                    value={areaOptions.some(item => item.name === data.area) ? areaOptions.find(item => item.name === data.area) : null}
                                    onChangeEvent={(e) => edit_HandleSelect(e)}
                                    disabled={data.city ? false : true}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"edit--road"}
                                    name={"road"}
                                    label={"路"}
                                    error={editFieldCheck.road}
                                    value={data.road}
                                    onChangeEvent={(e) => edit_HandleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"edit--section"}
                                    name={"section"}
                                    label={"段"}
                                    value={data.section}
                                    onChangeEvent={(e) => edit_HandleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"edit--address"}
                                    name={"address"}
                                    label={"巷/弄/號"}
                                    error={editFieldCheck.address}
                                    value={data.address}
                                    onChangeEvent={(e) => edit_HandleInput(e)}
                                />
                            </Grid>
                        </React.Fragment>
                        : data.type === "接機" ?
                            <React.Fragment>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"edit--airport"}
                                        name={"airport"}
                                        label={"機場"}
                                        options={airportOptions}
                                        optionKey={"name"}
                                        error={editFieldCheck.airport}
                                        value={airportOptions.some(item => item.name === data.airport) ? airportOptions.find(item => item.name === data.airport) : null}
                                        onChangeEvent={(e) => edit_HandleSelect(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"edit--terminal"}
                                        name={"terminal"}
                                        label={"航廈"}
                                        options={terminalOptions.filter(item => item.airport === data.airport)}
                                        optionKey={"name"}
                                        error={editFieldCheck.terminal}
                                        value={terminalOptions.some(item => item.name === data.terminal) ? terminalOptions.find(item => item.name === data.terminal) : null}
                                        onChangeEvent={(e) => edit_HandleSelect(e)}
                                    />
                                </Grid>
                            </React.Fragment>
                            : null}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>下車地點</Typography>
                    </Grid>
                    {data.type === "送機" ?
                        <React.Fragment>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"edit--airport"}
                                    name={"airport"}
                                    label={"機場"}
                                    options={airportOptions}
                                    optionKey={"name"}
                                    error={editFieldCheck.airport}
                                    value={airportOptions.some(item => item.name === data.airport) ? airportOptions.find(item => item.name === data.airport) : null}
                                    onChangeEvent={(e) => edit_HandleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusOutlinedSelect
                                    id={"edit--terminal"}
                                    name={"terminal"}
                                    label={"航廈"}
                                    options={terminalOptions.filter(item => item.airport === data.airport)}
                                    optionKey={"name"}
                                    error={editFieldCheck.terminal}
                                    value={terminalOptions.some(item => item.name === data.terminal) ? terminalOptions.find(item => item.name === data.terminal) : null}
                                    onChangeEvent={(e) => edit_HandleSelect(e)}
                                />
                            </Grid>
                        </React.Fragment>
                        : data.type === "接機" ?
                            <React.Fragment>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"edit--city"}
                                        name={"city"}
                                        label={"城市"}
                                        options={cityOptions}
                                        optionKey={"name"}
                                        error={editFieldCheck.city}
                                        value={cityOptions.some(item => item.name === data.city) ? cityOptions.find(item => item.name === data.city) : null}
                                        onChangeEvent={(e) => edit_HandleSelect(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusOutlinedSelect
                                        id={"edit--area"}
                                        name={"area"}
                                        label={"區域"}
                                        options={areaOptions.filter(item => item.city === data.city)}
                                        optionKey={"name"}
                                        error={editFieldCheck.area}
                                        value={areaOptions.some(item => item.name === data.area) ? areaOptions.find(item => item.name === data.area) : null}
                                        onChangeEvent={(e) => edit_HandleSelect(e)}
                                        disabled={data.city ? false : true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"edit--road"}
                                        name={"road"}
                                        label={"路"}
                                        error={editFieldCheck.road}
                                        value={data.road}
                                        onChangeEvent={(e) => edit_HandleInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"edit--section"}
                                        name={"section"}
                                        label={"段"}
                                        value={data.section}
                                        onChangeEvent={(e) => edit_HandleInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"edit--address"}
                                        name={"address"}
                                        label={"巷/弄/號"}
                                        error={editFieldCheck.address}
                                        value={data.address}
                                        onChangeEvent={(e) => edit_HandleInput(e)}
                                    />
                                </Grid>
                            </React.Fragment>
                            : null}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>預約乘車日期及時間</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--flght_number"}
                            name={"flght_number"}
                            label={"航班號碼"}
                            value={data.flght_number}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusDatePicker
                            id={"edit--date_travel"}
                            name={"date_travel"}
                            label={"出發日期"}
                            views={["year", "month", "day"]}
                            minDate={moment().add(3, 'days')}
                            error={editFieldCheck.date_travel}
                            value={data.date_travel}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusTimePicker
                            id={"edit--time_travel"}
                            name={"time_travel"}
                            label={data.type === "送機" ? "乘車時間" : "航班抵達時間"}
                            views={['hours', 'minutes']}
                            minTime={data.minTime ? moment(data.minTime, 'HH:mm:ss') : null}  // 動態設定 minTime
                            error={editFieldCheck.time_travel}
                            value={data.time_travel}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                            disabled={data.date_travel ? false : true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>人數及行李</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"edit--number_passenger"}
                            name={"number_passenger"}
                            label={"人數"}
                            options={passengerOptions}
                            optionKey={"name"}
                            error={editFieldCheck.number_passenger}
                            value={passengerOptions.some(item => item.name === String(data.number_passenger)) ? passengerOptions.find(item => item.name === String(data.number_passenger)) : null}
                            onChangeEvent={(e) => edit_HandleSelect(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"edit--number_bags"}
                            name={"number_bags"}
                            label={"行李數量"}
                            options={bagsOptions}
                            optionKey={"name"}
                            error={editFieldCheck.number_bags}
                            value={bagsOptions.some(item => item.name === String(data.number_bags)) ? bagsOptions.find(item => item.name === String(data.number_bags)) : null}
                            onChangeEvent={(e) => edit_HandleSelect(e)}
                            disabled={data.number_passenger ? false : true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>車型</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusOutlinedSelect
                            id={"edit--cms_id"}
                            name={"cms_id"}
                            label={"車型"}
                            options={carModelOptions}
                            optionKey={"cms_id"}
                            error={editFieldCheck.airport}
                            value={carModelOptions.some(item => item.cms_id === data.cms_id) ? carModelOptions.find(item => item.cms_id === data.cms_id) : null}
                            onChangeEvent={(e) => edit_HandleSelect(e)}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>加價服務</Typography>
                    </Grid>
                    <Grid container>
                        {data.type === "接機" ?
                            <React.Fragment>
                                <Grid item lg={12} sm={12} xs={12}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox name="signboard" checked={checkboxState.signboard} onChange={handleCheckboxChangeEdit} />}
                                            label="接機舉牌 (+$200)"
                                        />
                                    </FormGroup>
                                </Grid>
                                {checkboxState.signboard ?
                                    <React.Fragment>
                                        <Grid item lg={12} sm={12} xs={12}>
                                            <CusInput
                                                id={"edit--signboard_title"}
                                                name={"signboard_title"}
                                                label={"舉牌標題"}
                                                error={checkboxState.signboard && editFieldCheck.signboard_title}
                                                value={data.signboard_title}
                                                onChangeEvent={(e) => edit_HandleInput(e)}
                                            />
                                        </Grid>
                                        <Grid item lg={12} sm={12} xs={12}>
                                            <CusInput
                                                multiline
                                                rows={4}
                                                id={"edit--signboard_content"}
                                                name={"signboard_content"}
                                                label={"舉牌內容"}
                                                error={checkboxState.signboard && editFieldCheck.signboard_content}
                                                value={data.signboard_content}
                                                onChangeEvent={(e) => edit_HandleInput(e)}
                                            />
                                        </Grid>
                                    </React.Fragment>
                                    : null}
                            </React.Fragment>
                            : null}
                        <Grid item lg={12} sm={12} xs={12}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name="extra" checked={checkboxState.extra} onChange={handleCheckboxChangeEdit} />}
                                    label="加購兒童安全座椅及增高墊 (+$200)"
                                />
                            </FormGroup>
                        </Grid>
                        {checkboxState.extra ?
                            options.extraOptions.filter(filterEle => filterEle.type === "合併").map((mapEle, index) => {
                                return (
                                    <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                        <CusOutlinedSelect
                                            id={mapEle.es_id}
                                            name={"es_ids"}
                                            label={mapEle.name}
                                            error={editFieldCheck.es_ids_merge}
                                            options={options.extraCount}
                                            optionKey={"name"}
                                            value={data.extraData.es_ids ? (data.extraData.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === String(data.extraData.es_ids.find(item => item.es_id === mapEle.es_id).count)) : null) : null}
                                            onChangeEvent={(e) => edit_HandleSelect(e, mapEle.type)}
                                        />
                                    </Grid>
                                )
                            })
                            : null}
                        {otherExtra ?
                            <Grid item lg={12} sm={12} xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox name="other" checked={checkboxState.other} onChange={handleCheckboxChangeEdit} />}
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
                                            error={editFieldCheck.es_ids_other}
                                            options={options.extraCount}
                                            optionKey={"name"}
                                            value={data.otherData.es_ids ? (data.otherData.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === String(data.otherData.es_ids.find(item => item.es_id === mapEle.es_id).count)) : null) : null}
                                            onChangeEvent={(e) => edit_HandleSelect(e, mapEle.type)}
                                        />
                                    </Grid>
                                )
                            })
                            : null}
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>基本資料</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--name_purchaser"}
                            name={"name_purchaser"}
                            label={"訂購人姓名"}
                            error={editFieldCheck.name_purchaser}
                            value={data.name_purchaser}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--phone_purchaser"}
                            name={"phone_purchaser"}
                            label={"訂購人電話"}
                            error={editFieldCheck.phone_purchaser}
                            value={data.phone_purchaser}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--email_purchaser"}
                            name={"email_purchaser"}
                            label={"訂購人信箱"}
                            error={editFieldCheck.email_purchaser}
                            value={data.email_purchaser}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox name="sameDetail" checked={checkboxState.sameDetail} onChange={handleCheckboxChangeEdit} />}
                                label="乘客同訂購人"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--name_passenger"}
                            name={"name_passenger"}
                            label={"乘客姓名"}
                            error={editFieldCheck.name_passenger}
                            value={data.name_passenger}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--phone_passenger"}
                            name={"phone_passenger"}
                            label={"乘客電話"}
                            error={editFieldCheck.phone_passenger}
                            value={data.phone_passenger}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CusInput
                            id={"edit--email_passenger"}
                            name={"email_passenger"}
                            label={"乘客信箱"}
                            error={editFieldCheck.email_passenger}
                            value={data.email_passenger}
                            onChangeEvent={(e) => edit_HandleInput(e)}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    } else if (type === "visible") {
        return (
            <Typography component={"p"}>
                確定要{visible === "N" ? "作廢" : "重新生效"}訂單編號：<CusSpan text={o_id} color="info" /> 嗎 ?
            </Typography>
        )
    }
});