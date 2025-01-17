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
import { UserAPI, OptionList, DDMenu, ATS_ExtraSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';

export default function Extra() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("ExtraFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        es_id: null,
        type: null,
        name: null,
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
    const [extraList, setExtraList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    // Dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    // 下拉選單
    const [options, setOptions] = useState({
        extraOptions: [],
        typeOptions: [
            { name: "舉牌" },
            { name: "合併" },
            { name: "其它" }
        ],
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
            searchExtra(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢加價選單
     */
    const seacrhOptions = async () => {
        ATS_ExtraSettings.ATS_ExtraSettingsSearch({
            visible: null,
            es_id: null,
            type: null,
            name: null,
            page: 0,
            num_per_page: 0,
            excel: "",
        }).then(async res => {
            if (res.success) {
                setOptions(prev => ({
                    ...prev,
                    extraOptions: res.data,
                }));
                setOptions(prev => {
                    const typeOptions = res.data
                        .map(item => item.type)
                        .filter((type, index, self) => self.indexOf(type) === index)
                        .map((name, index) => ({ key: index, name }));

                    return {
                        ...prev,
                        typeOptions,
                    };
                });
            }
        })
    }

    /**
     * 查詢加價項目
     */
    const searchExtra = async (searchPrams, searchbutton = false) => {
        setIsLoading(true);
        if (searchbutton) {
            setPageSearch(prevParams => ({
                ...prevParams,
                page: 1
            }));
        }
        if (initDBRef.current) {
            try {
                ATS_ExtraSettings.ATS_ExtraSettingsSearch(searchPrams).then(async res => {
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

                        setExtraList(res.data);
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

    /** 編輯是否開放 */
    const edit_Visible = async ({ id, visible }) => {
        const { success, message } = await ATS_ExtraSettings.ATS_ExtraSettingsUpdate({
            es_id: id,
            visible: visible === "Y" ? "N" : "Y"
        });

        if (success) searchExtra(pageSearch);

        enqueueSnackbar(message, {
            variant: success ? "success" : "warning",
            persist: !success
        });
    };

    /** [清除]查查查查 */
    const cleanSearch_Click = () => {
        setPageSearch(prevData => ({
            ...prevData,
            visible: null,
            es_id: null,
            type: null,
            name: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        // seacrhOptions();
        searchExtra(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            extraList.map((item, index) => (
                <TableRow
                    hover
                    key={item.es_id}>
                    <TableCell>{index + 1}</TableCell>
                    {/* <TableCell>{item.type}</TableCell> */}
                    <TableCell>
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            control={
                                <Switch
                                    checked={item.visible === "Y" ? true : false}
                                    color={"success"}
                                    onChange={() => edit_Visible({ id: item.es_id, visible: item.visible })}
                                />
                            }
                        />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, id: item.es_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete
                            ?
                            <React.Fragment>
                                <CusIconButton
                                    onClick={(e) => del_Click({ e: e, id: item.es_id })}
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
            DialogTitle: '新增加價項目',
            DialogContent: <DialogsInner type={'add'} ref={useDialogInner} options={options} />,
            DialogActions: (
                <>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
                </>
            ),
            maxWidth: 'xs'
        }));
    };

    /**[新建確認]加價 */
    const add_Confirm = () => {
        const { extraAdd, initExtraAddCheck, setExtraAddCheck } = useDialogInner.current;
        if (!extraAdd.type || !extraAdd.name || !extraAdd.price) {
            setExtraAddCheck({
                type: !extraAdd.type ? true : false,
                name: !extraAdd.name ? true : false,
                price: !extraAdd.price ? true : false,
            })
        } else {
            setExtraAddCheck(initExtraAddCheck);

            ATS_ExtraSettings.ATS_ExtraSettingsCreate(extraAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchExtra({
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

    /**[修改]加價 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = extraList.filter(item => item.es_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} options={options} es_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]加價 */
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

            const { success, message } = await ATS_ExtraSettings.ATS_ExtraSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchExtra(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    /**[刪除]加價 */
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

    /**[確認]刪除加價 */
    const del_Confirm = useCallback((e, _id) => {
        e.stopPropagation();
        ATS_ExtraSettings.ATS_ExtraSettingsDelete({ es_id: _id }).then(res => {
            if (res.success) {
                dialogClose();
                searchExtra(pageSearch);
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
                            {/* <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--type"}
                                    name={"type"}
                                    label={"加價類型"}
                                    options={options.typeOptions}
                                    optionKey={"name"}
                                    value={options.typeOptions.some(item => item.name === pageSearch.type) ? options.typeOptions.find(item => item.name === pageSearch.type) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--name"}
                                    name={"name"}
                                    label={"加價名稱"}
                                    options={options.extraOptions}
                                    optionKey={"name"}
                                    value={options.extraOptions.some(item => item.name === pageSearch.name) ? options.extraOptions.find(item => item.name === pageSearch.name) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--price"}
                                    name={"price"}
                                    label={"加價金額"}
                                    type={"number"}
                                    value={pageSearch.price}
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
                                    onClick={() => searchExtra(pageSearch, true)}
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
                                            text={"新增加價項目"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? extraList.length > 0
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
                                                    // { name: "加價類型" },
                                                    { name: "開放狀態" },
                                                    { name: "加價名稱" },
                                                    { name: "加價金額" },
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
    const { type, name, getEditData, options, es_id } = props;
    // 新增加價
    const [extraAdd, setExtraAdd] = useState({
        visible: "Y",
        type: "其它",
        name: null,
        price: null,
    });
    const initExtraAddCheck = {
        type: false,
        name: false,
        price: false,
    }
    const [extraAddCheck, setExtraAddCheck] = useState(initExtraAddCheck);

    // 編輯加價
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { es_id: es_id }
    });

    const editInitCheckState = {
        type: false,
        name: false,
        price: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    /**[事件]下拉選單 */
    const add_HandleSelect = (e) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        setExtraAdd(prev => ({
            ...prev,
            [name]: val,
        }));
    };

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setExtraAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    /**[事件]下拉選單 */
    const edit_HandleSelect = (e) => {
        const { id, name, value, key } = e.target;
        const val = value === null ? null : value[key];

        setEditData(prevData => ({
            ...prevData,
            updData: {
                ...prevData.updData,
                [name]: val
            }
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
        extraAdd,
        initExtraAddCheck,
        setExtraAddCheck,

        editData,
        editInitCheckState,
        setEditFieldCheck
    }));

    if (type === "add") {
        return (
            <React.Fragment>
                <Grid container>
                    {/* <Grid item xs={12}>
                        <CusOutlinedSelect
                            id={"add--type"}
                            name={"type"}
                            label={"加價類型"}
                            error={extraAddCheck.type}
                            options={options.typeOptions}
                            optionKey={"name"}
                            value={options.typeOptions.some(item => item.name === extraAdd.type) ? options.typeOptions.find(item => item.name === extraAdd.type) : null}
                            onChangeEvent={(e) => add_HandleSelect(e)}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <CusInput
                            id={"add--name"}
                            name={"name"}
                            label={"加價名稱"}
                            error={extraAddCheck.name}
                            value={extraAdd.name}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"add--price"}
                            name={"price"}
                            label={"加價金額"}
                            type={"number"}
                            error={extraAddCheck.price}
                            value={extraAdd.price}
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
                {/* <Grid item xs={12}>
                    <CusOutlinedSelect
                        id={"edit--type"}
                        name={"type"}
                        label={"加價類型"}
                        error={extraAddCheck.type}
                        options={options.typeOptions}
                        optionKey={"name"}
                        value={options.typeOptions.some(item => item.name === data.type) ? options.typeOptions.find(item => item.name === data.type) : null}
                        onChangeEvent={(e) => edit_HandleSelect(e)}
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--name'}
                        name={'name'}
                        label={'加價名稱'}
                        type={'text'}
                        required={true}
                        error={editFieldCheck.name}
                        value={data.name}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--price'}
                        name={'price'}
                        label={'加價金額'}
                        type={'number'}
                        required={true}
                        error={editFieldCheck.price}
                        value={data.price}
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