import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box, Typography } from '@mui/material';
import { HighlightOff, Add, Search, Edit, Delete } from '@mui/icons-material';
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
import { UserAPI, OptionList, DDMenu, ATS_CarModelSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';

export default function CarModel() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("CarModelFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        cms_id: null,
        name: null,
        max_passengers: null,
        max_luggage: null,
        max_child_seats: null,
        max_service_extras: null,
        excel: "",
        page: 1,
        num_per_page: 10,
    });

    // indexedDB
    const [indexDB, setIndexDB] = useState(null);
    const [initDB, setInitDB] = useState(false);
    const initDBRef = useRef(initDB);
    initDBRef.current = initDB;

    // 帳號資料
    const [isLoading, setIsLoading] = useState(true);
    const [carModelList, setCarModelList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    // Dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    // 下拉選單
    const [options, setOptions] = useState({
        carModelOptions: [],
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
            searchCarModel(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢車型選單
     */
    const seacrhOptions = async () => {
        ATS_CarModelSettings.ATS_CarModelSettingsSearch({
            visible: "Y",
            cms_id: null,
            name: null,
            max_passengers: null,
            max_luggage: null,
            max_child_seats: null,
            max_service_extras: null,
            page: 0,
            num_per_page: 0,
            excel: "",
        }).then(async res => {
            if (res.success) {
                setOptions(prev => ({
                    ...prev,
                    carModelOptions: res.data,
                }));
            }
        })
    }

    /**
     * 查詢車型列表
     */
    const searchCarModel = async (searchPrams) => {
        setIsLoading(true);
        if (initDBRef.current) {
            try {
                ATS_CarModelSettings.ATS_CarModelSettingsSearch(searchPrams).then(async res => {
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

                        setCarModelList(res.data);
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
            cms_id: null,
            name: null,
            max_passengers: null,
            max_luggage: null,
            max_child_seats: null,
            max_service_extras: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        seacrhOptions();
        searchCarModel(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            carModelList.map((item, index) => (
                <TableRow
                    hover
                    key={item.cms_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.max_passengers}</TableCell>
                    <TableCell>{item.max_luggage}</TableCell>
                    <TableCell>{item.max_child_seats}</TableCell>
                    <TableCell>{item.max_service_extras}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, name: item.name, id: item.cms_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete
                            ?
                            <React.Fragment>
                                <CusIconButton
                                    onClick={(e) => del_Click({ e: e, name: item.name, id: item.cms_id })}
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
            DialogTitle: '新增車型',
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

    /**確認新增行政區*/
    const add_Confirm = () => {
        const { carModelAdd, initCarModelAddCheck, setCarModelAddCheck } = useDialogInner.current;
        if (!carModelAdd.name || !carModelAdd.max_passengers || !carModelAdd.max_luggage || !carModelAdd.max_child_seats || !carModelAdd.max_service_extras) {
            setCarModelAddCheck({
                name: !carModelAdd.name ? true : false,
                max_passengers: !carModelAdd.max_passengers ? true : false,
                max_luggage: !carModelAdd.max_luggage ? true : false,
                max_child_seats: !carModelAdd.max_child_seats ? true : false,
                max_service_extras: !carModelAdd.max_service_extras ? true : false,
            })
        } else {
            setCarModelAddCheck(initCarModelAddCheck);

            ATS_CarModelSettings.ATS_CarModelSettingsCreate(carModelAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchCarModel({
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

    /**[修改]車型 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = carModelList.filter(item => item.cms_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} cms_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]車型 */
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

            const { success, message } = await ATS_CarModelSettings.ATS_CarModelSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchCarModel(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    /**[刪除]車型 */
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

    /**[確認]刪除車型 */
    const del_Confirm = useCallback((e, _id) => {
        e.stopPropagation();
        ATS_CarModelSettings.ATS_CarModelSettingsDelete({ cms_id: _id }).then(res => {
            if (res.success) {
                dialogClose();
                searchCarModel({
                    ...pageSearch,
                });
            }
            enqueueSnackbar(res.message, {
                variant: res.success ? "success" : "warning",
                persist: !res.success
            });
        });
    }, []);

    /**輸入框*/
    const search_handleInput = (e) => {
        const { name, value } = e.target

        setPageSearch(prevParams => ({
            ...prevParams,
            page: 1,
            [name]: value
        }));
    };

    /**[事件]下拉選單 */
    const search_handleSelect = (e) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        setPageSearch(prev => ({
            ...prev,
            [name]: val,
        }));
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
                                    id={"search--name"}
                                    name={"name"}
                                    label={"車型"}
                                    options={options.carModelOptions}
                                    optionKey={"name"}
                                    value={options.carModelOptions.some(item => item.name === pageSearch.name) ? options.carModelOptions.find(item => item.name === pageSearch.name) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--max_passengers"}
                                    name={"max_passengers"}
                                    type={"number"}
                                    label={"乘車人數上限"}
                                    value={pageSearch.max_passengers}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--max_luggage"}
                                    name={"max_luggage"}
                                    type={"number"}
                                    label={"行李數上限"}
                                    value={pageSearch.max_luggage}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--max_child_seats"}
                                    name={"max_child_seats"}
                                    type={"number"}
                                    label={"安全座椅上限"}
                                    value={pageSearch.max_child_seats}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--max_service_extras"}
                                    name={"max_service_extras"}
                                    type={"number"}
                                    label={"安全座椅及增高墊上限"}
                                    value={pageSearch.max_service_extras}
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
                                    onClick={() => searchCarModel(pageSearch)} ㄋ
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
                                            text={"新增車型"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? carModelList.length > 0
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
                                                    { name: "車型名稱" },
                                                    { name: "乘車人數上限" },
                                                    { name: "行李數上限" },
                                                    { name: "安全座椅上限" },
                                                    { name: "安全座椅及增高墊上限" },
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
    const { type, name, getEditData, cms_id } = props;

    // 新增車型
    const [carModelAdd, setCarModelAdd] = useState({
        visible: "Y",
        name: null,
        max_passengers: null,
        max_luggage: null,
        max_child_seats: null,
        max_service_extras: null
    });
    const initCarModelAddCheck = {
        name: false,
        max_passengers: false,
        max_luggage: false,
        max_child_seats: false,
        max_service_extras: false
    }
    const [carModelAddCheck, setCarModelAddCheck] = useState(initCarModelAddCheck);

    // 編輯車型
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { cms_id: cms_id }
    });

    const editInitCheckState = {
        name: false,
        max_passengers: false,
        max_luggage: false,
        max_child_seats: false,
        max_service_extras: false
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setCarModelAdd(prev => ({
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
        carModelAdd,
        initCarModelAddCheck,
        setCarModelAddCheck,

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
                            id={"search--name"}
                            name={"name"}
                            label={"車型名稱"}
                            error={carModelAddCheck.name}
                            value={carModelAdd.name}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--max_passengers"}
                            name={"max_passengers"}
                            type="number"
                            label={"乘車人數上限"}
                            error={carModelAddCheck.max_passengers}
                            value={carModelAdd.max_passengers}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--max_luggage"}
                            name={"max_luggage"}
                            type="number"
                            label={"行李數上限"}
                            error={carModelAddCheck.max_luggage}
                            value={carModelAdd.max_luggage}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--max_child_seats"}
                            name={"max_child_seats"}
                            type="number"
                            label={"安全座椅上限"}
                            error={carModelAddCheck.max_child_seats}
                            value={carModelAdd.max_child_seats}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--max_service_extras"}
                            name={"max_service_extras"}
                            type="number"
                            label={"安全座椅及增高墊上限"}
                            error={carModelAddCheck.max_service_extras}
                            value={carModelAdd.max_service_extras}
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
                        id={'edit--name'}
                        name={'name'}
                        label={'車型名稱'}
                        type={'text'}
                        error={editFieldCheck.name}
                        value={data.name}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--max_passengers'}
                        name={'max_passengers'}
                        label={'乘車人數上限'}
                        type={'number'}
                        error={editFieldCheck.max_passengers}
                        value={data.max_passengers}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--max_luggage'}
                        name={'max_luggage'}
                        label={'行李數上限'}
                        type={'number'}
                        error={editFieldCheck.max_luggage}
                        value={data.max_luggage}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--max_child_seats'}
                        name={'max_child_seats'}
                        label={'安全座椅上限'}
                        type={'number'}
                        error={editFieldCheck.max_child_seats}
                        value={data.max_child_seats}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--max_service_extras'}
                        name={'max_service_extras'}
                        label={'安全座椅及增高墊上限'}
                        type={'number'}
                        error={editFieldCheck.max_service_extras}
                        value={data.max_service_extras}
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