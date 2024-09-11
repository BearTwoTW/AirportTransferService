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
import { UserAPI, OptionList, DDMenu, ATS_CityAreaSettings } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { isNullOrEmpty } from '../../../../js/FunctionTS';

export default function CityArea() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    //權限
    const permission = useCheckLogInXPermission("CityAreaFirst", ["Add", "Delete", "Edit"]);

    // 頁面資訊
    const [pageSearch, setPageSearch] = useState({
        visible: null,
        cas_id: null,
        zip: null,
        city: null,
        area: null,
        road: null,
        section: null,
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
        areaOptions: [],
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
     * 查詢城市區域選單
     */
    const seacrhOptions = async () => {
        ATS_CityAreaSettings.ATS_CityAreaSettingsSearch({
            visible: "Y",
            cas_id: null,
            zip: null,
            city: null,
            area: null,
            road: null,
            section: null,
            page: 0,
            num_per_page: 0,
            excel: "",
        }).then(async res => {
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
                        cityOptions,
                        areaOptions,
                    };
                });
            }
        })
    }

    /** 編輯是否開放 */
    const edit_Visible = async ({ id, visible }) => {
        const { success, message } = await ATS_CityAreaSettings.ATS_CityAreaSettingsUpdate({
            cas_id: id,
            visible: visible === "Y" ? "N" : "Y"
        });

        if (success) searchCityArea(pageSearch);

        enqueueSnackbar(message, {
            variant: success ? "success" : "warning",
            persist: !success
        });
    };

    /**
     * 查詢城市區域列表
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
            visible: null,
            cas_id: null,
            zip: null,
            city: null,
            area: null,
            road: null,
            section: null,
            page: 1,
            num_per_page: 10,
            excel: "",
        }));
    };

    useEffect(() => {
        seacrhOptions();
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
                    <TableCell>
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            control={
                                <Switch
                                    checked={item.visible === "Y" ? true : false}
                                    color={"success"}
                                    onChange={() => edit_Visible({ id: item.cas_id, visible: item.visible })}
                                />
                            }
                        />
                    </TableCell>
                    <TableCell>{item.zip}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.road}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>
                        {permission.Edit ?
                            <CusIconButton
                                onClick={(e) => edit_Click({ e: e, name: item.name, id: item.cas_id })}
                                color='primary'
                                icon={<Edit />}
                            />
                            : null}
                        {permission.Delete
                            ?
                            <React.Fragment>
                                <CusIconButton
                                    onClick={(e) => del_Click({ e: e, name: item.name, id: item.cas_id })}
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

    /**[修改]行政區 */
    const edit_Click = ({ e, id }) => {
        e.stopPropagation();
        useDialog.current.handleOpen();

        const getEditData = cityAreaList.filter(item => item.cas_id === id)[0];

        setDialogData(({
            id: 'edit',
            DialogTitle: '修改',
            DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} cas_id={id} />,
            DialogActions: (
                <React.Fragment>
                    <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
                    <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
                </React.Fragment>)
        }));
    };

    /**[修改確認]行政區 */
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

            const { success, message } = await ATS_CityAreaSettings.ATS_CityAreaSettingsUpdate(editData.updData);

            if (success) {
                dialogClose();
                searchCityArea(pageSearch);
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
        ATS_CityAreaSettings.ATS_CityAreaSettingsDelete({ cas_id: _id }).then(res => {
            if (res.success) {
                dialogClose();
                searchCityArea({
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

        if (name === "city") {
            setPageSearch(prev => ({
                ...prev,
                area: null,
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
                                <CusInput
                                    id={"search--zip"}
                                    name={"zip"}
                                    label={"郵遞區號"}
                                    value={pageSearch.zip}
                                    onChangeEvent={(e) => search_handleInput(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--city"}
                                    name={"city"}
                                    label={"城市"}
                                    options={options.cityOptions}
                                    optionKey={"name"}
                                    value={options.cityOptions.some(item => item.name === pageSearch.city) ? options.cityOptions.find(item => item.name === pageSearch.city) : null}
                                    onChangeEvent={(e) => search_handleSelect(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={3}>
                                <CusOutlinedSelect
                                    id={"search--area"}
                                    name={"area"}
                                    label={"區域"}
                                    options={options.areaOptions.filter(item => item.city === pageSearch.city)}
                                    optionKey={"name"}
                                    value={options.areaOptions.some(item => item.name === pageSearch.area) ? options.areaOptions.find(item => item.name === pageSearch.area) : null}
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
                                                onPageChange={handleChangePage}
                                                count={pageCount}
                                                page={pageSearch.page}
                                                onRowsPerPageChange={onRowsPerPageChange}
                                                tableHead={[
                                                    { name: "排序" },
                                                    { name: "開放狀態" },
                                                    { name: "區號" },
                                                    { name: "城市" },
                                                    { name: "區域" },
                                                    { name: "路名" },
                                                    { name: "段" },
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
    const { type, name, getEditData, cas_id } = props;

    // 新增行政區
    const [cityAreaAdd, setCityAreaAdd] = useState({
        visible: "Y",
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

    // 編輯機場航廈
    const [editData, setEditData] = useState({
        dtlData: getEditData,
        updData: { cas_id: cas_id }
    });

    const editInitCheckState = {
        zip: false,
        city: false,
        area: false,
        road: false,
        section: false,
    };
    const [editFieldCheck, setEditFieldCheck] = useState(editInitCheckState);

    /**新增 input */
    const add_handelInput = e => {
        const { name, value } = e.target;
        const val = value === "" ? null : value;

        setCityAreaAdd(prev => ({
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
        cityAreaAdd,
        initCityAreaAddCheck,
        setCityAreaAddCheck,

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
    } else if (type === 'edit') {
        let data = {
            ...editData.dtlData,
            ...editData.updData
        }
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--zip'}
                        name={'zip'}
                        label={'郵遞區號'}
                        type={'text'}
                        error={editFieldCheck.zip}
                        value={data.zip}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--city'}
                        name={'city'}
                        label={'城市'}
                        type={'text'}
                        error={editFieldCheck.city}
                        value={data.city}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--area'}
                        name={'area'}
                        label={'區域'}
                        type={'text'}
                        error={editFieldCheck.area}
                        value={data.area}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--road'}
                        name={'road'}
                        label={'路'}
                        type={'text'}
                        error={editFieldCheck.road}
                        value={data.road}
                        onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CusInput
                        id={'edit--section'}
                        name={'section'}
                        label={'段'}
                        type={'text'}
                        error={editFieldCheck.section}
                        value={data.section}
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