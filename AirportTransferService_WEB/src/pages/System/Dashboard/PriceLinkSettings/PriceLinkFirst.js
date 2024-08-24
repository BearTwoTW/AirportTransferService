import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box, Typography } from '@mui/material';
import { HighlightOff, Add, Search, Delete, Edit, CloudUpload, CloudDownload } from '@mui/icons-material';
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
import { UserAPI, OptionList, DDMenu, ATS_PriceLinkSettings, ImportData } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';
import { exportURL, ImportSampleURL } from '../../../../js/DomainTS';

export default function PriceLink() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("PriceLinkFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        pls_id: null,
        price: null,
        link: null,
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
    const [priceLinkList, setPriceLinkList] = useState([]);
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
            searchPriceLink(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢車資
     */
    const searchPriceLink = async (searchPrams) => {
        setIsLoading(true);
        if (initDBRef.current) {
            try {
                ATS_PriceLinkSettings.ATS_PriceLinkSettingsSearch(searchPrams).then(async res => {
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

                        setPriceLinkList(res.data);
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
            pls_id: null,
            price: null,
            link: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        searchPriceLink(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            priceLinkList.map((item, index) => (
                <TableRow
                    hover
                    key={item.pls_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.link}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, id: item.pls_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete
                            ?
                            <React.Fragment>
                                <CusIconButton
                                    onClick={(e) => del_Click({ e: e, id: item.pls_id })}
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
            DialogTitle: '新增價錢連結',
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

    /**[新建確認]價錢連結 */
    const add_Confirm = () => {
        const { priceLinkAdd, initPriceLinkAddCheck, setPriceLinkAddCheck } = useDialogInner.current;
        if (!priceLinkAdd.price || !priceLinkAdd.link) {
            setPriceLinkAddCheck({
                price: !priceLinkAdd.price ? true : false,
                link: !priceLinkAdd.link ? true : false,
            })
        } else {
            setPriceLinkAddCheck(initPriceLinkAddCheck);

            ATS_PriceLinkSettings.ATS_PriceLinkSettingsCreate(priceLinkAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchPriceLink({
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

    /**[修改]價錢連結 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = priceLinkList.filter(item => item.pls_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} pls_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]價錢連結 */
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

            const { success, message } = await ATS_PriceLinkSettings.ATS_PriceLinkSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchPriceLink(pageSearch);
            }

            enqueueSnackbar(message, {
                variant: success ? "success" : "warning",
                persist: !success
            });
        }
    };

    /**[刪除]價錢連結 */
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

    /**[確認]價錢連結 */
    const del_Confirm = useCallback((e, _id) => {
        e.stopPropagation();
        ATS_PriceLinkSettings.ATS_PriceLinkSettingsDelete({ pls_id: _id }).then(res => {
            if (res.success) {
                dialogClose();
                searchPriceLink(pageSearch);
            }
            enqueueSnackbar(res.message, {
                variant: res.success ? "success" : "warning",
                persist: !res.success
            });
        });
    }, []);

    /**
     * @description [匯入範本下載]價錢連結
     */
    const exampleDownload = () => {
        window.open(`${ImportSampleURL}/連結匯入格式.xlsx`);
    };

    /**
     * @description [匯入]匯入價錢連結
     */
    const import_Click = () => {
        useDialog.current.handleOpen();

        setDialogData(({
            id: "import",
            maxWidth: "sm",
            DialogTitle: "匯入價錢連結",
            DialogContent: <DialogsInner
                type={"import"}
                ref={useDialogInner}
                exampleDownload={exampleDownload}
            />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={import_Confirm} color="primary" text="上傳檔案" />
                </React.Fragment>)
        }));
    };

    /**
     * @description [匯入確認]匯入價錢連結
     */
    const import_Confirm = () => {
        const { file } = useDialogInner.current;

        if (file) {
            let importData = new FormData();
            importData.append(file.name, file);

            setBackdropOpen(true);

            // 延遲兩秒才call api，看起來比較有在等待的感覺?
            setTimeout(() => {
                ImportData.ImportPriceLink(importData).then(res => {
                    if (res.success) {
                        dialogClose();
                        searchPriceLink(pageSearch);
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
                                    id={"search--price"}
                                    name={"price"}
                                    label={"價錢"}
                                    type={"number"}
                                    value={pageSearch.price}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusInput
                                    id={"search--link"}
                                    name={"link"}
                                    label={"連結"}
                                    value={pageSearch.link}
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
                                    onClick={() => searchPriceLink(pageSearch)}
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
                                        text={"匯入價錢連結"}
                                        startIcon={<CloudUpload />}
                                        onClick={import_Click}
                                    />
                                    {permission.Add
                                        ? <CusTextIconButton
                                            color={"primary"}
                                            text={"新增價錢連結"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? priceLinkList.length > 0
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
                                                    { name: "價錢" },
                                                    { name: "連結" },
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
    const { type, name, getEditData, pls_id, exampleDownload } = props;
    const [file, setFile] = useState(null);

    // 新增價錢連結
    const [priceLinkAdd, setPriceLinkAdd] = useState({
        visible: "Y",
        price: null,
        link: null,
    });
    const initPriceLinkAddCheck = {
        price: false,
        link: false,
    }
    const [priceLinkAddCheck, setPriceLinkAddCheck] = useState(initPriceLinkAddCheck);

    // 編輯加價
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { pls_id: pls_id }
    });

    const editInitCheckState = {
        price: false,
        link: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setPriceLinkAdd(prev => ({
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
        priceLinkAdd,
        initPriceLinkAddCheck,
        setPriceLinkAddCheck,

        editData,
        editInitCheckState,
        setEditFieldCheck,
        file // 上傳車資列表
    }));

    if (type === "add") {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--price"}
                            name={"price"}
                            label={"價錢"}
                            error={priceLinkAddCheck.price}
                            value={priceLinkAdd.price}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--link"}
                            name={"link"}
                            label={"連結"}
                            error={priceLinkAddCheck.link}
                            value={priceLinkAdd.link}
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
                        id={'edit--price'}
                        name={'price'}
                        label={'價錢'}
                        type={'number'}
                        required={true}
                        error={editFieldCheck.price}
                        value={data.price}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                    <CusInput
                        id={'edit--link'}
                        name={'link'}
                        label={'連結'}
                        required={true}
                        error={editFieldCheck.link}
                        value={data.link}
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
                    <Grid item xs={12} md={3} display={"flex"} justifyContent={"flex-end"}>
                        <CusTextIconButton
                            color={"info"}
                            text={"範本下載"}
                            startIcon={<CloudDownload />}
                            onClick={exampleDownload}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else if (type === "del") {
        return (
            <Typography component={"p"}>
                確定刪除 <CusSpan text={name} color="info" /> ?
            </Typography>
        )
    }
});