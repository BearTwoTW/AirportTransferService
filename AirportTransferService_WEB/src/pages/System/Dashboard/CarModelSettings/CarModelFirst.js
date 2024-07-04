import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import MD5 from 'crypto-js/md5';
import { useLocation, useNavigate } from "react-router-dom";
import { CircularLoading } from '../../../../components/CusProgress';
import { Grid, TableCell, TableRow, Chip, Box } from '@mui/material';
import { HighlightOff, Add, Search } from '@mui/icons-material';
import { CusCard } from '../../../../components/CusCard';
import { CusInfoTitle } from '../../../../components/CusInfo';
import { CusDialog } from '../../../../components/CusDialog';
import { useSnackbar } from 'notistack';
import { CusInput } from '../../../../components/CusInput';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { NoResults } from '../../../../components/CusError';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusTextIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusDatePicker } from '../../../../components/CusDatePicker';
import { UserAPI, OptionList, DDMenu, ATS_CarModelSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';

export default function CityArea() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("CityAreaFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: "",
        cms_id: "",
        name: "",
        max_passengers: "",
        max_luggage: "",
        max_child_seats: "",
        max_service_extras: "",
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
     * 查詢職責列表
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
            visible: "",
            cms_id: "",
            name: "",
            max_passengers: "",
            max_luggage: "",
            max_child_seats: "",
            max_service_extras: "",
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
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

    /**輸入框*/
    const search_handleInput = (e) => {
        const { name, value } = e.target

        setPageSearch(prevParams => ({
            ...prevParams,
            page: 1,
            [name]: value
        }));
    };

    /**下拉選單 */
    const search_handleSelect = (e) => {
        const { name, key, value } = e.target
        const val = value === null ? "" : value[key];

        setPageSearch(prevParams => ({
            ...prevParams,
            page: 1,
            [name]: val,
        }));
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
                                    id={"search--name"}
                                    name={"name"}
                                    label={"車型名稱"}
                                    value={pageSearch.name}
                                    onChangeEvent={(e) => search_handleInput(e)}
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
                                    label={"服務加成項目上限"}
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
                                                // onPageChange={handleChangePage}
                                                count={pageCount}
                                                page={pageSearch.page}
                                                // onRowsPerPageChange={onRowsPerPageChange}
                                                tableHead={[
                                                    { name: "排序" },
                                                    { name: "車型名稱" },
                                                    { name: "乘車人數上限" },
                                                    { name: "行李數上限" },
                                                    { name: "安全座椅上限" },
                                                    { name: "服務加成項目上限" },
                                                ]}
                                                tableBody={<TableBodyContent />}
                                            />
                                            <PaginationActionsTS
                                                totalPage={pageCount}
                                                page={pageSearch.page}
                                            // onPageChange={(e, nowPage) => handleChangePage(e, nowPage)}
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
    // 新增帳號
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

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setCarModelAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    /**新增 select */
    const add_handelSelect = (e) => {
        let { name, key, value } = e.target;
        const val = value === null ? null : value[key];

        setCarModelAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        carModelAdd,
        initCarModelAddCheck,
        setCarModelAddCheck
    }));

    if (props.type === "add") {
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
                            label={"服務加成項目上限"}
                            error={carModelAddCheck.max_service_extras}
                            value={carModelAdd.max_service_extras}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
});