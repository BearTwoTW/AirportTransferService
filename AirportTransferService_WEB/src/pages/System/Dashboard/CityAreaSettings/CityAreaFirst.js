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
import { UserAPI, OptionList, DDMenu, ATS_CityAreaSettings } from '../../../../js/APITS';
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
        cas_id: "",
        zip: "",
        city: "",
        area: "",
        road: "",
        section: "",
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
    const [cityAreaList, setCityAreaList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    // Dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    // 提示框
    const { enqueueSnackbar } = useSnackbar();

    // 下拉選單
    const [options, setOptions] = useState({
        cityOptions: [],
        cityCensusOptions: [],
        areaOptions: [],
        areaCensusOptions: []
    });

    useEffect(() => {
        /**
         * 初始化下拉選單
         */
        const getOptions = async () => {
            const city = await DDMenu.nestCode("cityareazip");

            setOptions(prev => ({
                ...prev,
                cityOptions: city,
                cityCensusOptions: city,
            }));
        };

        getOptions();
    }, []);

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
            searchCityArea(search_set ?? pageSearch);
        });
        setInitDB(true);
    }, []);

    /**
     * 查詢職責列表
     */
    const searchCityArea = async (searchPrams) => {
        setIsLoading(true);
        if (initDBRef.current) {
            try {
                ATS_CityAreaSettings.ATS_CityAreaSettingsSearch(searchPrams).then(async res => {
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

                        setCityAreaList(res.data);
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
            cas_id: "",
            zip: "",
            city: "",
            area: "",
            road: "",
            section: "",
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        searchCityArea(pageSearch);
    }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

    /** table body */
    const TableBodyContent = React.memo(() => {
        return (
            cityAreaList.map((item, index) => (
                <TableRow
                    hover
                    key={item.cas_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.zip}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.road}</TableCell>
                    <TableCell>{item.section}</TableCell>
                </TableRow>
            ))
        );
    });

    /**跳出新增視窗 */
    const add_click = () => {
        useDialog.current.handleOpen();
        setDialogData(({
            id: 'add',
            DialogTitle: '新增行政區',
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
        const { cityAreaAdd, initCityAreaAddCheck, setCityAreaAddCheck } = useDialogInner.current;
        if (!cityAreaAdd.zip || !cityAreaAdd.city || !cityAreaAdd.area) {
            setCityAreaAddCheck({
                zip: !cityAreaAdd.zip ? true : false,
                city: !cityAreaAdd.city ? true : false,
                area: !cityAreaAdd.area ? true : false,
            })
        } else {
            setCityAreaAddCheck(initCityAreaAddCheck);

            ATS_CityAreaSettings.ATS_CityAreaSettingsCreate(cityAreaAdd).then(res => {
                if (res.success) {
                    dialogClose();
                    searchCityArea({
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
                                    id={"search--zip"}
                                    name={"zip"}
                                    label={"郵遞區號"}
                                    value={pageSearch.zip}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
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
                                    onClick={() => searchCityArea(pageSearch)}
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
                                            text={"新增行政區"}
                                            startIcon={<Add />}
                                            onClick={() => add_click()}
                                        />
                                        : null}
                                </Box>
                                {!isLoading
                                    ? cityAreaList.length > 0
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
                                                    { name: "區號" },
                                                    { name: "城市" },
                                                    { name: "區域" },
                                                    { name: "路名" },
                                                    { name: "段" },
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
    const [cityAreaAdd, setCityAreaAdd] = useState({
        visible: null,
        zip: null,
        city: null,
        area: null,
        road: null,
        section: null
    });
    const initCityAreaAddCheck = {
        zip: false,
        city: false,
        area: false,
        road: false,
        section: false
    }
    const [cityAreaAddCheck, setCityAreaAddCheck] = useState(initCityAreaAddCheck);

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setCityAreaAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    /**新增 select */
    const add_handelSelect = (e) => {
        let { name, key, value } = e.target;
        const val = value === null ? null : value[key];

        setCityAreaAdd(prev => ({
            ...prev,
            [name]: val
        }));
    };

    // 給父層function使用
    useImperativeHandle(ref, () => ({
        cityAreaAdd,
        initCityAreaAddCheck,
        setCityAreaAddCheck
    }));

    if (props.type === "add") {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--zip"}
                            name={"zip"}
                            label={"郵遞區號"}
                            error={cityAreaAddCheck.zip}
                            value={cityAreaAdd.zip}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--city"}
                            name={"city"}
                            label={"城市"}
                            error={cityAreaAddCheck.city}
                            value={cityAreaAdd.city}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--area"}
                            name={"area"}
                            label={"區域"}
                            error={cityAreaAddCheck.area}
                            value={cityAreaAdd.area}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--road"}
                            name={"road"}
                            label={"路"}
                            error={cityAreaAddCheck.road}
                            value={cityAreaAdd.road}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CusInput
                            id={"search--section"}
                            name={"section"}
                            label={"段"}
                            error={cityAreaAddCheck.section}
                            value={cityAreaAdd.section}
                            onChangeEvent={(e) => add_handelInput(e)}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
});