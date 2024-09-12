import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { HighlightOff, Add, Search, Delete, Edit } from '@mui/icons-material';
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
import { UserAPI, OptionList, DDMenu, ATS_AirportTerminalSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';

export default function AirportTerminal() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("AirportTerminalFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        ats_id: null,
        airport: null,
        terminal: null,
        page: 1,
        num_per_page: 10,
        excel: "",
    });

    // indexedDB
    const [indexDB, setIndexDB] = useState(null);
    const [initDB, setInitDB] = useState(false);
    const initDBRef = useRef(initDB);
    initDBRef.current = initDB;

    // 帳號資料
    const [isLoading, setIsLoading] = useState(true);
    const [airportTerminalList, setAirportTerminalList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    // Dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    // 下拉選單
    const [options, setOptions] = useState({
        airportOptions: [],
        terminalOptions: [],
    });

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
                ...search_set
            }));

            // 存在search_set就用indexedDB的搜尋條件，不然就用預設的搜尋條件
            searchAirportTerminal(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢機場航廈選單
     */
    const seacrhOptions = async () => {
        ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsSearch({
            visible: null,
            ats_id: null,
            airport: null,
            terminal: null,
            page: 0,
            num_per_page: 0,
            excel: "",
        }).then(async res => {
            if (res.success) {
                setOptions(prev => {
                    const airportOptions = res.data
                        .map(item => item.airport)
                        .filter((airport, index, self) => self.indexOf(airport) === index)
                        .map((name, index) => ({ key: index, name }));

                    const uniqueAreaMap = new Map();
                    res.data.forEach((item, index) => {
                        if (!uniqueAreaMap.has(item.airport)) {
                            uniqueAreaMap.set(item.airport, new Set());
                        }
                        uniqueAreaMap.get(item.airport).add(item.terminal);
                    });

                    const terminalOptions = [];
                    let keyIndex = 0;
                    uniqueAreaMap.forEach((terminals, airport) => {
                        terminals.forEach(terminal => {
                            terminalOptions.push({ key: keyIndex++, airport, name: terminal });
                        });
                    });

                    return {
                        ...prev,
                        airportOptions,
                        terminalOptions,
                    };
                });
            }
        })
    }

    /** 編輯是否開放 */
    const edit_Visible = async ({ id, visible }) => {
        const { success, message } = await ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsUpdate({
            ats_id: id,
            visible: visible === "Y" ? "N" : "Y"
        });

        if (success) searchAirportTerminal(pageSearch);

        enqueueSnackbar(message, {
            variant: success ? "success" : "warning",
            persist: !success
        });
    };

    /**
     * 查詢機場航廈
     */
    const searchAirportTerminal = async (searchPrams, searchbutton = false) => {
        setIsLoading(true);
        if (searchbutton) {
            setPageSearch(prevParams => ({
                ...prevParams,
                page: 1
            }));
        }
        if (initDBRef.current) {
            try {
                ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsSearch(searchPrams).then(async res => {
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

                        setAirportTerminalList(res.data);
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

    /** [清除]查查查查 */
    const cleanSearch_Click = () => {
        setPageSearch(prevData => ({
            ...prevData,
            visible: null,
            ats_id: null,
            airport: null,
            terminal: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        seacrhOptions();
        searchAirportTerminal(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            airportTerminalList.map((item, index) => (
                <TableRow
                    hover
                    key={item.ats_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            control={
                                <Switch
                                    checked={item.visible === "Y" ? true : false}
                                    color={"success"}
                                    onChange={() => edit_Visible({ id: item.ats_id, visible: item.visible })}
                                />
                            }
                        />
                    </TableCell>
                    <TableCell>{item.airport}</TableCell>
                    <TableCell>{item.terminal}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, id: item.ats_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete
                            ?
                            <React.Fragment>

                                <CusIconButton
                                    onClick={(e) => del_Click({ e: e, id: item.ats_id })}
                                    color='primary'
                                    icon={<Delete />}
                                />
                            </React.Fragment>
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
            DialogTitle: '新增機場航廈',
            DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
            DialogActions: (
                <>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
                </>
            ),
            maxWidth: 'xs'
        }));
    };

    /**確認新增機場航廈*/
    const add_Confirm = () => {
        const { airportAdd, initAirportAddCheck, setAirportAddCheck } = useDialogInner.current;
        if (!airportAdd.airport || !airportAdd.terminal) {
            setAirportAddCheck({
                airport: !airportAdd.airport ? true : false,
                terminal: !airportAdd.terminal ? true : false,
            })
        } else {
            setAirportAddCheck(initAirportAddCheck);

            ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsCreate(airportAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchAirportTerminal({
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

    /**[修改]行政區 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = airportTerminalList.filter(item => item.ats_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} ats_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]機場航廈 */
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

            const { success, message } = await ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchAirportTerminal(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    /**[刪除]行政區 */
    const del_Click = useCallback(({ e, name, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        setDialogData(({
            id: 'del',
            DialogTitle: '刪除',
            DialogContent: <DialogsInner type={'del'} ref={useDialogInner} name={name} id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { del_Confirm(e, id) }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    }, [])

    /**[確認]刪除行政區 */
    const del_Confirm = useCallback((e, _id) => {
        e.stopPropagation();
        ATS_AirportTerminalSettings.ATS_AirportTerminalSettingsDelete({ ats_id: _id }).then(res => {
            if (res.success) {
                dialogClose();
                searchAirportTerminal({
                    ...pageSearch,
                });
            }
            enqueueSnackbar(res.message, {
                variant: res.success ? "success" : "warning",
                persist: !res.success
            });
        });
    }, []);

    /**[事件]下拉選單 */
    const search_handleSelect = (e) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        if (name === "airport") {
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
                                    id={"search--airport"}
                                    name={"airport"}
                                    label={"機場"}
                                    options={options.airportOptions}
                                    optionKey={"name"}
                                    value={options.airportOptions.some(item => item.name === pageSearch.airport) ? options.airportOptions.find(item => item.name === pageSearch.airport) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--terminal"}
                                    name={"terminal"}
                                    label={"航廈"}
                                    options={options.terminalOptions.filter(item => item.airport === pageSearch.airport)}
                                    optionKey={"name"}
                                    value={options.terminalOptions.some(item => item.name === pageSearch.terminal) ? options.terminalOptions.find(item => item.name === pageSearch.terminal) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                    disabled={pageSearch.airport ? false : true}
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
                                    onClick={() => searchAirportTerminal(pageSearch, true)}
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
                                    {permission.Add
                                        ? <CusTextIconButton
                                            color={"primary"}
                                            text={"新增機場航廈"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? airportTerminalList.length > 0
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
                                                    { name: "開放狀態" },
                                                    { name: "機場" },
                                                    { name: "航廈" },
                                                    { name: "操作" },
                                                ]}
                                                tableBody={<TableBodyContent />}
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
    const { type, name, getEditData, ats_id } = props;
    // 新增機場航廈
    const [airportAdd, setAirportAdd] = useState({
        visible: "Y",
        airport: null,
        terminal: null,
    });
    const initAirportAddCheck = {
        airport: false,
        terminal: false,
    }
    const [airportAddCheck, setAirportAddCheck] = useState(initAirportAddCheck);

    // 編輯機場航廈
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { ats_id: ats_id }
    });

    const editInitCheckState = {
        airport: false,
        terminal: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setAirportAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    /**
     * @description [事件]input
     */
    const edit_HandleInput = (e) => {
        const { name, value } = e.target;

        setEditData(prevData => ({
            ...prevData,
            updData: {
                ...prevData.updData,
                [name]: value
            }
        }));
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        airportAdd,
        initAirportAddCheck,
        setAirportAddCheck,

        editData,
        editInitCheckState,
        setEditFieldCheck
    }));

    if (type === "add") {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--airport"}
                            name={"airport"}
                            label={"機場"}
                            error={airportAddCheck.airport}
                            value={airportAdd.airport}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--terminal"}
                            name={"terminal"}
                            label={"航廈"}
                            error={airportAddCheck.terminal}
                            value={airportAdd.terminal}
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
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--airport'}
                        name={'airport'}
                        label={'機場'}
                        type={'text'}
                        required={true}
                        error={editFieldCheck.airport}
                        value={data.airport}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--terminal'}
                        name={'terminal'}
                        label={'航廈'}
                        type={'text'}
                        required={true}
                        error={editFieldCheck.terminal}
                        value={data.terminal}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
            </React.Fragment>
        )
    } else if (type === "del") {
        return (
            <Typography component={"p"}>
                確定刪除 <CusSpan text={name} color="info" /> ?
            </Typography>
        )
    }
});