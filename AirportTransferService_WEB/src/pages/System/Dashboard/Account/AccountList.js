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
import { UserAPI, OptionList, DDMenu } from '../../../../js/APITS';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';

export default function AccountList() {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  //權限
  const permission = useCheckLogInXPermission("AccountList", ["Add", "Delete", "Edit"]);

  // 頁面資訊
  const [pageSearch, setPageSearch] = useState({
    jobBind: "Y",
    disable: "",
    username: "",
    name: "",
    company_id: "",
    page: 1,
    num_per_page: 10,
    search: false
  });

  // indexedDB
  const [indexDB, setIndexDB] = useState(null);
  const [initDB, setInitDB] = useState(false);
  const initDBRef = useRef(initDB);
  initDBRef.current = initDB;

  // 帳號資料
  const [isLoading, setIsLoading] = useState(true);
  const [accountList, setAccountList] = useState([]);
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
      searchUser(search_set ?? pageSearch);
    });
    setInitDB(true);
  }, []);

  /**查詢帳號*/
  const searchUser = async (searchParams) => {
    setIsLoading(true);
    if (initDBRef.current) {
      try {
        let res = null;
        if (searchParams.jobBind === "Y") {
          res = await UserAPI.UserListSearch({
            jobBind: searchParams.jobBind,
            disable: searchParams.disable,
            username: searchParams.username,
            name: searchParams.name,
            company_id: searchParams.company_id,
            page: searchParams.page,
            num_per_page: searchParams.num_per_page
          });
        } else {
          res = await UserAPI.UserListNoLevelSearch({
            username: searchParams.username,
            name: searchParams.name,
            page: searchParams.page,
            num_per_page: searchParams.num_per_page
          });
        }

        if (res !== null && res.success) {
          if (indexDB !== null) {
            await indexDB.update("QueryCondition", {
              page: window.location.pathname,
              action: "Search",
              user_id: sessionStorage.user_id,
              data: {
                ...searchParams,
                page: searchParams.page
              }
            });
          }

          setAccountList(res.data);
          setPageCount(res.page);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        enqueueSnackbar("查詢失敗", {
          variant: "error",
          persist: true
        });
      }
    }
  };

  useEffect(() => {
    searchUser(pageSearch);
  }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

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

  /**輸入框*/
  const search_handleInput = (e) => {
    const { name, value } = e.target

    setPageSearch(prevParams => ({
      ...prevParams,
      page: 1,
      [name]: value
    }));
  };

  /** table body */
  const TableBodyContent = React.memo(() => {
    const navigate_HandleSecond = (user_id, username) => {
      if (permission.Edit) {
        navigate(`${location.pathname}/AccountEdit`, {
          state: {
            user_id,
            username
          }
        });
      } else {
        enqueueSnackbar('此帳號無權限使用', {
          variant: 'warning',
          persist: true
        });
        return
      }
    };

    return (
      accountList.map((item, index) => (
        <TableRow
          hover
          key={item.user_id}
          onClick={() => { navigate_HandleSecond(item.user_id, item.username) }}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.user_id}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.ul_name}</TableCell>
          <TableCell>
            {item.disable === 'N'
              ? <Chip label="正常" color="success" size="small" variant="outlined" />
              : <Chip label="停用" color="error" size="small" variant="outlined" />}
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
      DialogTitle: '新增帳號',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
      DialogActions: (
        <>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
        </>
      ),
      maxWidth: 'md'
    }));
  };

  /**確認新增*/
  const add_Confirm = () => {
    const { accountAdd, initAccountAddCheck, setAccountAddCheck } = useDialogInner.current;
    if (!accountAdd.username || !accountAdd.on_board_date || !accountAdd.home_page || !accountAdd.name) {
      setAccountAddCheck({
        username: !accountAdd.username ? true : false,
        on_board_date: !accountAdd.on_board_date ? true : false,
        home_page: !accountAdd.home_page ? true : false,
        name: !accountAdd.name ? true : false
      })
    } else {
      setAccountAddCheck(initAccountAddCheck);

      UserAPI.UserCreate(
        accountAdd.password
          ? {
            ...accountAdd,
            password: MD5(accountAdd.password).toString()
          }
          : accountAdd
      ).then(res => {
        if (res.success) {
          dialogClose();
          searchUser({
            ...pageSearch,
            page: 1,
            jobBind: "N"
          });
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "error",
          persist: !res.success
        });
      });
    }
  };

  /**關閉Dialog  */
  const dialogClose = () => {
    useDialog.current.handleClose();
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


  /** [清除]查查查查 */
  const cleanSearch_Click = () => {
    setPageSearch(prevData => ({
      ...prevData,
      jobBind: "Y",
      disable: "",
      username: "",
      name: "",
      company_id: "",
      page: 1,
      num_per_page: 10,
      search: !prevData.search,
    }));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"search--username"}
                  name={"username"}
                  label={"使用者帳號"}
                  value={pageSearch.username}
                  onChangeEvent={(e) => search_handleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"search--name"}
                  name={"name"}
                  label={"使用者姓名"}
                  value={pageSearch.name}
                  onChangeEvent={(e) => search_handleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusOutlinedSelect
                  id={"search--jobBind"}
                  name={"jobBind"}
                  label={"是否綁定職務"}
                  options={OptionList.JobBindArr}
                  optionKey={"value"}
                  value={OptionList.JobBindArr.some(item => item.value === pageSearch.jobBind) ? OptionList.JobBindArr.find(item => item.value === pageSearch.jobBind) : null}
                  onChangeEvent={(e) => search_handleSelect(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusOutlinedSelect
                  id={"search--disable"}
                  name={"disable"}
                  label={"選擇帳號狀態"}
                  options={OptionList.DisableArr}
                  optionKey={"value"}
                  value={OptionList.DisableArr.find(item => item.value === pageSearch.disable)}
                  onChangeEvent={(e) => search_handleSelect(e)}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"default"}
                  text={"清除"}
                  startIcon={<HighlightOff />}
                  onClick={() => cleanSearch_Click()} />
                <CusTextIconButton
                  color={"info"}
                  text={"查詢"}
                  startIcon={<Search />}
                  onClick={() => searchUser(pageSearch)}
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
                      text={"新增帳號"}
                      startIcon={<Add />}
                      onClick={() => add_click()}
                    />
                    : null}
                </Box>
                {!isLoading
                  ? accountList.length > 0
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
                          { name: "ID" },
                          { name: "帳號" },
                          { name: "姓名" },
                          { name: "職務" },
                          { name: "狀態" }
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
  // 下拉選單
  const [options, setOptions] = useState({
    sysOptions: [],
    genderOptions: [],
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
      const sys = await DDMenu.selectorCode("SYS");
      const gender = await DDMenu.selectorCode("SEX");
      const city = await DDMenu.nestCode("cityareazip");

      setOptions(prev => ({
        ...prev,
        sysOptions: sys,
        genderOptions: gender,
        cityOptions: city,
        cityCensusOptions: city,
      }));
    };

    getOptions();
  }, []);

  // 新增帳號
  const [accountAdd, setAccountAdd] = useState({
    username: null,
    on_board_date: new Date(),
    name: null,
    home_page: "001",
  });
  const initAccountAddCheck = { username: false, on_board_date: false, name: false, home_page: false }
  const [accountAddCheck, setAccountAddCheck] = useState(initAccountAddCheck);

  /**處理區域代碼
   * @param {*} city 選擇的縣市
   * @param {*} options 縣市區域整包下拉選單
   * @param {*} paramOptions options裡面的區域參數
   * @param {*} paramAdd 新增裡面的area參數
   */
  const getAreaOptions = (city, options, paramOptions, paramAdd) => {
    if (city) {
      // 填入所選縣市的區域代碼
      setOptions(prev => ({
        ...prev,
        [paramOptions]: options.find(o => o.name === city).children
      }));
    }

    // 重置新增參數裡面的區域代碼
    setAccountAdd(prev => ({
      ...prev,
      [paramAdd]: null
    }));
  };

  /**新增 input */
  const add_handelInput = e => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setAccountAdd(prev => ({
      ...prev,
      [name]: val
    }));
  };

  /**新增 select */
  const add_handelSelect = (e) => {
    let { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    if (name === "city") getAreaOptions(val, options.cityOptions, "areaOptions", "area");
    if (name === "city_census") getAreaOptions(val, options.cityCensusOptions, "areaCensusOptions", "area_census");

    setAccountAdd(prev => ({
      ...prev,
      [name]: val
    }));
  };

  // 給父層function使用
  useImperativeHandle(ref, () => ({
    accountAdd,
    initAccountAddCheck,
    setAccountAddCheck
  }));

  if (props.type === "add") {
    return (
      <>
        <Grid container>
          <Grid item lg={12} md={12} xs={12}>
            <CusInfoTitle
              label={"帳號資訊"}
              content={
                <>
                  <Grid item lg={3} sm={3} xs={12}>
                    <CusInput
                      id={"add--username"}
                      name={"username"}
                      label={"使用者帳號 (新增後無法修改)"}
                      required={true}
                      error={accountAddCheck.username}
                      value={accountAdd.username}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                  {/* <Grid item lg={3} sm={3} xs={12}>
                    <CusInput
                      id={"add--password"}
                      name={"password"}
                      type={"password"}
                      label={"使用者密碼"}
                      value={accountAdd.password}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                  <Grid item lg={3} sm={3} xs={12}>
                    <CusDatePicker
                      id={"add--on_board_date"}
                      name={"on_board_date"}
                      label={"到職日"}
                      views={["year", "month", "day"]}
                      required={true}
                      error={accountAddCheck.on_board_date}
                      onChangeEvent={(e) => add_handelInput(e)}
                    />
                  </Grid>
                  <Grid item lg={3} sm={3} xs={12}>
                    <CusOutlinedSelect
                      id={"add--home_page"}
                      name={"home_page"}
                      label={"系統登入頁"}
                      options={options.sysOptions}
                      optionKey={"sps_id"}
                      required={true}
                      error={accountAddCheck.home_page}
                      value={options.sysOptions.some(item => item.sps_id === accountAdd.home_page) ? options.sysOptions.find(item => item.sps_id === accountAdd.home_page) : null}
                      onChangeEvent={(e) => add_handelSelect(e)}
                    />
                  </Grid> */}
                </>
              }
            />
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <CusInfoTitle
            label={"基本資料"}
            content={
              <>
                <Grid item lg={6} sm={6} xs={12}>
                  <CusInput
                    id={"add--name"}
                    name={"name"}
                    label={"姓名"}
                    required={true}
                    error={accountAddCheck.name}
                    value={accountAdd.name}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <CusOutlinedSelect
                    id={"add--gender"}
                    name={"gender"}
                    label={"性別"}
                    options={options.genderOptions}
                    optionKey={"sps_id"}
                    value={options.genderOptions.some(item => item.sps_id === accountAdd.gender) ? options.genderOptions.find(item => item.sps_id === accountAdd.gender) : null}
                    onChangeEvent={(e) => add_handelSelect(e)}
                  />
                </Grid>
                {/* <Grid item lg={4} sm={4} xs={12}>
                  <CusInput
                    id={"add--blood_type"}
                    name={"blood_type"}
                    label={"血型"}
                    value={accountAdd.blood_type}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid> */}
                {/* <Grid item lg={4} sm={4} xs={12}>
                  <CusInput
                    id={"add--identity_card"}
                    name={"identity_card"}
                    label={"身分證"}
                    value={accountAdd.identity_card}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid> */}
                {/* <Grid item lg={4} sm={4} xs={12}>
                  <CusDatePicker
                    id={"add--birthday"}
                    name={"birthday"}
                    label={"生日"}
                    views={["year", "month", "day"]}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid> */}
                <Grid item lg={6} sm={6} xs={12}>
                  <CusInput
                    id={"add--mobile_phone"}
                    name={"mobile_phone"}
                    label={"手機"}
                    value={accountAdd.mobile_phone}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
                {/* <Grid item lg={4} sm={4} xs={12}>
                  <CusInput
                    id={"add--telephone"}
                    name={"telephone"}
                    label={"電話"}
                    value={accountAdd.telephone}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid> */}
                <Grid item lg={6} sm={6} xs={12}>
                  <CusInput
                    id={"add--email"}
                    name={"email"}
                    label={"電子信箱"}
                    value={accountAdd.email}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
              </>
            }
          />
        </Grid>
        {/* <Grid item lg={12} md={12} xs={12}>
          <CusInfoTitle
            label={"聯絡地址"}
            content={
              <>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusOutlinedSelect
                    id={"add--city"}
                    name={"city"}
                    label={"縣市"}
                    options={options.cityOptions}
                    optionKey={"name"}
                    value={options.cityOptions.some(item => item.name === accountAdd.city) ? options.cityOptions.find(item => item.name === accountAdd.city) : null}
                    onChangeEvent={(e) => add_handelSelect(e)}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusOutlinedSelect
                    id={"add-area"}
                    name={"area"}
                    label={!accountAdd.city ? "請先選擇縣市" : "區域"}
                    options={options.areaOptions}
                    optionKey={"name"}
                    disabled={!accountAdd.city ? true : false}
                    value={options.areaOptions.some(item => item.name === accountAdd.area) ? options.areaOptions.find(item => item.name === accountAdd.area) : null}
                    onChangeEvent={(e) => add_handelSelect(e)}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusInput
                    id={"add--address"}
                    name={"address"}
                    label={"地址"}
                    value={accountAdd.address}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
              </>
            }
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <CusInfoTitle
            label={"戶籍地址"}
            content={
              <>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusOutlinedSelect
                    id={"add--city_census"}
                    name={"city_census"}
                    label={"縣市"}
                    options={options.cityCensusOptions}
                    optionKey={"name"}
                    value={options.cityCensusOptions.some(item => item.name === accountAdd.city_census) ? options.cityCensusOptions.find(item => item.name === accountAdd.city_census) : null}
                    onChangeEvent={(e) => add_handelSelect(e)}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusOutlinedSelect
                    id={"add-area_census"}
                    name={"area_census"}
                    label={!accountAdd.city_census ? "請先選擇縣市" : "區域"}
                    options={options.areaCensusOptions}
                    optionKey={"name"}
                    disabled={!accountAdd.city_census ? true : false}
                    value={options.areaCensusOptions.some(item => item.name === accountAdd.area_census) ? options.areaCensusOptions.find(item => item.name === accountAdd.area_census) : null}
                    onChangeEvent={(e) => add_handelSelect(e)}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={12}>
                  <CusInput
                    id={"add--address_census"}
                    name={"address_census"}
                    label={"地址"}
                    value={accountAdd.address_census}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
              </>
            }
          />
        </Grid> */}
        <Grid item lg={12} md={12} xs={12}>
          <CusInfoTitle
            label={"其它"}
            content={
              <>
                <Grid item lg={12} sm={12} xs={12}>
                  <CusInput
                    id={"add--note"}
                    name={"note"}
                    label={"備註"}
                    value={accountAdd.note}
                    onChangeEvent={(e) => add_handelInput(e)}
                  />
                </Grid>
              </>
            }
          />
        </Grid>
      </>
    );
  }
});