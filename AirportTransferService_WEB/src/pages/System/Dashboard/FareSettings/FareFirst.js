import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box, Typography } from '@mui/material';
import { HighlightOff, Add, Search, Delete, Edit, CloudUpload } from '@mui/icons-material';
import { CusCard } from '../../../../components/CusCard';
import { CusInfoTitle } from '../../../../components/CusInfo';
import { CusFileImport } from '../../../../components/CusButtonTS';
import { CusDialog } from '../../../../components/CusDialog';
import { useSnackbar } from 'notistack';
import { CusInput } from '../../../../components/CusInput';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusBackdropLoading } from '../../../../components/CusProgressTS';
import { NoResults } from '../../../../components/CusError';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusDatePicker } from '../../../../components/CusDatePicker';
import { UserAPI, OptionList, DDMenu, ATS_FareSettings, ImportData } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';

export default function Fare() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("FareFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        road: null,
        section: null,
        fs_id: null,
        cms_id: null,
        city: null,
        area: null,
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
    const [fareList, setFareList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [backdropOpen, setBackdropOpen] = useState(false);

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
                ...search_set
            }));

            // 存在search_set就用indexedDB的搜尋條件，不然就用預設的搜尋條件
            searchFare(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢車資
     */
    const searchFare = async (searchPrams) => {
        setIsLoading(true);
        if (initDBRef.current) {
            try {
                ATS_FareSettings.ATS_FareSettingsSearch(searchPrams).then(async res => {
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

                        setFareList(res.data);
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
            road: null,
            section: null,
            fs_id: null,
            cms_id: null,
            city: null,
            area: null,
            airport: null,
            terminal: null,
            price: null,
            link: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        searchFare(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            fareList.map((item, index) => (
                <TableRow
                    hover
                    key={item.fs_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.road}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.airport}</TableCell>
                    <TableCell>{item.terminal}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                        {permission.Delete
                            ?
                            <React.Fragment>
                                <CusIconButton
                                    onClick={(e) => edit_Click({ e: e, id: item.fs_id })}
                                    color='primary'
                                    icon={<Edit />}
                                />
                            </React.Fragment>
                            : null}
                    </TableCell>
                </TableRow>
            ))
        );
    });

    /**[修改]車資 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = fareList.filter(item => item.fs_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} fs_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]車資 */
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

            const { success, message } = await ATS_FareSettings.ATS_FareSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchFare(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    /**
     * @description [匯入]匯入車資
     */
    const import_Click = () => {
        useDialog.current.handleOpen();

        setDialogData(({
            id: "import",
            maxWidth: "sm",
            DialogTitle: "匯入車資",
            DialogContent: <DialogsInner
                type={"import"}
                ref={useDialogInner}
            />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={import_Confirm} color="primary" text="上傳檔案" />
                </React.Fragment>)
        }));
    };

    /**
     * @description [匯入確認]匯入車資
     */
    const import_Confirm = () => {
        const { file } = useDialogInner.current;

        if (file) {
            let importData = new FormData();
            importData.append(file.name, file);

            setBackdropOpen(true);

            // 延遲兩秒才call api，看起來比較有在等待的感覺?
            setTimeout(() => {
                ImportData.ImportFare(importData).then(res => {
                    if (res.success) {
                        dialogClose();
                        searchFare(pageSearch);
                    }

                    setBackdropOpen(false);

                    enqueueSnackbar(res.message, {
                        variant: res.success ? "success" : "warning",
                        persist: !res.success
                    });
                });
            }, 2000);
        } else {
            enqueueSnackbar("請選擇檔案", {
                variant: "warning",
                persist: true
            });
        }
    };

    /**輸入框*/
    const search_handleInput = (e) => {
        const { name, value } = e.target

        setPageSearch(prevParams => ({
            ...prevParams,
            page: 1,
            [name]: value
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
                                <CusInput
                                    id={"search--city"}
                                    name={"city"}
                                    label={"城市"}
                                    value={pageSearch.city}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--area"}
                                    name={"area"}
                                    label={"區域"}
                                    value={pageSearch.area}
                                    onChangeEvent={(e) => search_handleInput(e)}
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
                                    id={"search--section"}
                                    name={"section"}
                                    label={"段"}
                                    value={pageSearch.section}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--airport"}
                                    name={"airport"}
                                    label={"機場"}
                                    type={"number"}
                                    value={pageSearch.airport}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--terminal"}
                                    name={"terminal"}
                                    label={"航廈"}
                                    value={pageSearch.terminal}
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
                                    onClick={() => searchFare(pageSearch)}
                                />
                            </Grid>
                        </React.Fragment>
                    } />
                </Grid>
                <Grid item xs={12}>
                    <CusCard content={
                        <React.Fragment>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end">
                                    <CusTextIconButton
                                        color={"secondary"}
                                        variant={"outlined"}
                                        text={"匯入車資"}
                                        startIcon={<CloudUpload />}
                                        onClick={import_Click}
                                    />
                                </Box>
                                {!isLoading
                                    ? fareList.length > 0
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
                                                    { name: "城市" },
                                                    { name: "區域" },
                                                    { name: "路" },
                                                    { name: "段" },
                                                    { name: "機場" },
                                                    { name: "航廈" },
                                                    { name: "金額" },
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
            <CusBackdropLoading open={backdropOpen} text={"匯入中"} />
        </React.Fragment>
    );
};

/**新增modal內容*/
const DialogsInner = forwardRef((props, ref) => {
    const { type, name, getEditData, fs_id } = props;
    const [file, setFile] = useState(null);
    // 編輯加價
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { fs_id: fs_id }
    });

    const editInitCheckState = {
        price: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

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

    /**
     * @description 選擇檔案
     * @param {*} e 
     */
    const addFile_Handler = (e) => {
        setFile(e.target.files[0]);
    };

    /**
     * @description 清除檔案
     */
    const clearFile_Handler = () => {
        setFile(null);
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        editData,
        editInitCheckState,
        setEditFieldCheck,
        file // 上傳車資列表
    }));
    if (type === 'edit') {
        let data = {
            ...editData.dtlData,
            ...editData.updData
        }
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--price'}
                        name={'price'}
                        label={'車資金額'}
                        type={'number'}
                        required={true}
                        error={editFieldCheck.price}
                        value={data.price}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
            </React.Fragment>
        )
    } else if (type === "import") {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            <CusSpan text={"※ 匯入相關事項"} color="error" />
                        </Typography>
                        <Typography gutterBottom>
                            1. 請務必參照提供的 Excel 檔案格式上傳
                        </Typography>
                        <Typography gutterBottom>
                            2. 請先建立車型機場、車型再匯入資料
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <CusFileImport
                            buttonName="選擇檔案"
                            file={file}
                            color={"info"}
                            variant={"outlined"}
                            addFile={(e) => addFile_Handler(e)}
                            clearFile={clearFile_Handler}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
});