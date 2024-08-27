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

    /**
     * 查詢訂單
     */
    const searchOrder = async (searchPrams) => {
        setIsLoading(true);
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
        const { orderAdd, initOrderAddCheck, setOrderAddCheck } = useDialogInner.current;
        if (!orderAdd.type || !orderAdd.city || !orderAdd.area || !orderAdd.road || !orderAdd.section || !orderAdd.address
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
                section: !orderAdd.section ? true : false,
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
        const { editData, editInitCheckState, setEditFieldCheck } = useDialogInner.current;

        const checkField = Object.keys(editData.updData).reduce((checkItem, key) => {
            if (editInitCheckState.hasOwnProperty(key)) {
                checkItem[key] = isNullOrEmpty(editData.updData[key]);
            }
            return checkItem;
        }, {});

        if (Object.values(checkField).some(item => item === true)) {
            setEditFieldCheck(checkField);
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
                                <CusOutlinedSelect
                                    id={"search--visible"}
                                    name={"visible"}
                                    label={"訂單狀態"}
                                    options={options.visible}
                                    optionKey={"value"}
                                    value={options.visible.some(item => item.value === pageSearch.visible) ? options.visible.find(item => item.value === pageSearch.visible) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
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
                                    onClick={() => searchOrder(pageSearch)}
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
    const filteredData = type === "edit" ? getEditData.es_ids.filter(item => item.es_id !== "00001") : null;
    const isNotEmpty = type === "edit" ? filteredData.length !== 0 : null;
    // checkbox 狀態
    const [checkboxState, setCheckboxState] = useState({
        signboard: type === "edit" ? getEditData.es_ids.some(item => item.es_id === "00001") : false,
        extra: type === "edit" ? isNotEmpty : false,
        sameDetail: false,
    });

    const orderTypeOptions = options.orderTypeOptions; // 訂單類型 (送機/接機)
    const cityOptions = options.cityAreaOptions.cityOptions; // 城市
    const areaOptions = options.cityAreaOptions.areaOptions; // 區域
    const airportOptions = options.airPortOptions.airportOptions; // 機場
    const terminalOptions = options.airPortOptions.terminalOptions; // 航廈
    const passengerOptions = options.passengerOptions; // 人數
    const bagsOptions = options.bagsOptions; // 行李數
    const [carModelOptions, setCarModelOptions] = useState(options.carModelOptions);

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
        calculation: "N"
    });

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
        updData: { o_id: o_id }
    });

    useEffect(() => {
        if (type === "edit") {
            let arr = [];
            if (filteredData) {
                arr.push(
                    {
                        es_id: "00001",
                        count: "1",
                    }
                );
            }
            if (isNotEmpty) {
                getEditData.es_ids.forEach(item => {
                    arr.push(
                        {
                            es_id: item.es_id,
                            count: item.count,
                        }
                    );
                });
            }
            setEditData(prevData => ({
                ...prevData,
                updData: {
                    ...prevData.updData,
                    es_ids: arr,
                }
            }));
        }
    }, [getEditData]);

    const editInitCheckState = {
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

    // 編輯加價勾選
    const handleCheckboxChangeEdit = (event) => {
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
            setEditData(prevData => ({
                ...prevData,
                updData: {
                    ...prevData.updData,
                    es_ids: checked ? arr : null,
                }
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

    /**
     * @description [事件]input
     */
    const edit_HandleInput = (e) => {
        const { name, value } = e.target;

        if (name === "date_travel") {
            let formattedValue = value;
            formattedValue = formattedValue.split('T')[0];

            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: formattedValue
                }
            }));
        } else if (name === "time_travel") {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: value + ":00"
                }
            }));
        } else {
            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: value
                }
            }));
        }
    };

    /**[事件]下拉選單 */
    const edit_HandleSelect = (e) => {
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
                });
            }

            setEditData(prev => ({
                ...prev,
                updData: {
                    ...prev.updData,
                    [name]: arr.length > 0 ? arr : null,
                }
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
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        orderAdd,
        initOrderAddCheck,
        setOrderAddCheck,

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
                                    error={orderAddCheck.section}
                                    value={orderAdd.section}
                                    onChangeEvent={(e) => add_handelInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"add--address"}
                                    name={"address"}
                                    label={"地址"}
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
                                        error={orderAddCheck.section}
                                        value={orderAdd.section}
                                        onChangeEvent={(e) => add_handelInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"add--address"}
                                        name={"address"}
                                        label={"地址"}
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
                            error={orderAddCheck.flght_number}
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
                            error={orderAddCheck.time_travel}
                            value={orderAdd.time_travel}
                            onChangeEvent={(e) => add_handelInput(e)}
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
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>加價服務</Typography>
                    </Grid>
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
            ...editData.updData
        }
        console.log("data: ", editData)
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>訂單類型</Typography>
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
                                    error={editFieldCheck.section}
                                    value={data.section}
                                    onChangeEvent={(e) => edit_HandleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <CusInput
                                    id={"edit--address"}
                                    name={"address"}
                                    label={"地址"}
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
                                        error={editFieldCheck.section}
                                        value={data.section}
                                        onChangeEvent={(e) => edit_HandleInput(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CusInput
                                        id={"edit--address"}
                                        name={"address"}
                                        label={"地址"}
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
                            error={editFieldCheck.flght_number}
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
                            error={editFieldCheck.time_travel}
                            value={data.time_travel}
                            onChangeEvent={(e) => edit_HandleInput(e)}
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
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>加價服務</Typography>
                    </Grid>
                    <Grid container>
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
                                        error={editFieldCheck.signboard_title}
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
                                        error={editFieldCheck.signboard_content}
                                        value={data.signboard_content}
                                        onChangeEvent={(e) => edit_HandleInput(e)}
                                    />
                                </Grid>
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
                            options.extraOptions.filter(filterEle => filterEle.type !== "舉牌").map((mapEle, index) => {
                                return (
                                    <Grid key={mapEle.es_id} item lg={4} sm={4} xs={12}>
                                        <CusOutlinedSelect
                                            id={mapEle.es_id}
                                            name={"es_ids"}
                                            label={mapEle.name}
                                            options={options.extraCount}
                                            optionKey={"name"}
                                            value={data.es_ids ? (data.es_ids.some(item => item.es_id === mapEle.es_id) ? options.extraCount.find(item => item.name === String(data.es_ids.find(item => item.es_id === mapEle.es_id).count)) : null) : null}
                                            onChangeEvent={(e) => edit_HandleSelect(e)}
                                        />
                                    </Grid>
                                )
                            })
                            : null}
                    </Grid>
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