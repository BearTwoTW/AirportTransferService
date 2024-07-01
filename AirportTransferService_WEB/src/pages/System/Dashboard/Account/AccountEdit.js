import React, { useRef, useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useLocation } from "react-router-dom";
import { TabPanel } from '../../../../components/CusTab';
import { Grid, Divider, Tabs, Tab, TableCell, TableRow, Card, CardHeader, CardContent, Collapse } from '@mui/material';
import { CusDialog } from '../../../../components/CusDialog';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { Save } from '@mui/icons-material';
import { CusTextIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusInfoTitle } from '../../../../components/CusInfo';
import { CusInput } from '../../../../components/CusInput';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusDatePicker } from '../../../../components/CusDatePicker';
import { CusListButton } from '../../../../components/CusList';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusCheckboxBasic } from '../../../../components/CusCheckBox';
import { CusAlert } from '../../../../components/CusAlert';
import { UserAPI, UserLevelAPI, UserDutyAPI, OptionList, DDMenu, ToDoListAPI } from '../../../../js/APITS';

export default function AccountEdit() {
  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // tabs
  const [tabsValue, setTabsValue] = useState(0);

  // 下拉選單
  const [options, setOptions] = useState({
    sysOptions: [],
    genderOptions: [],
    cityOptions: [],
    cityCensusOptions: [],
    areaOptions: [],
    areaCensusOptions: [],
  });

  // 帳號資訊
  const [UserDetail, setUserDetail] = useState({
    dtlUser: {
      user_id: getParams.user_id,
    },
    updUser: {
      user_id: getParams.user_id,
    }
  });
  const initUserDetailCheck = { username: false, on_board_date: false, name: false, home_page: false, disable: false };
  const [userDetailCheck, setUserDetailCheck] = useState(initUserDetailCheck);

  // 查詢所有職務
  const [userLevelSearch, setUserLevelSearch] = useState([]);

  // 查詢職務條件
  const [levelSearchParams, setLevelSearchParams] = useState({
    code: "",
    name: "",
    parent_id: "",
    page: 0,
    num_per_page: 10
  });

  // 該帳號職務細項
  const [userLevelDetail, setUserLevelDetail] = useState({});

  // 所選職務細項
  const [selectedLevelDetail, setSelectedLevelDetail] = useState({});

  // 職責設定資料
  const [userDutyData, setUserDutyData] = useState([]);

  // 提示框
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    /**初始化下拉選單 */
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

  /**處理區域代碼
   * @param {*} city 選擇的縣市
   * @param {*} options 縣市區域整包下拉選單
   * @param {*} paramOptions options裡面的區域參數
   */
  const getAreaOptions = (city, options, paramOptions) => {
    // 填入所選縣市的區域代碼
    if (city) {
      setOptions(prev => ({
        ...prev,
        [paramOptions]: options.find(o => o.name === city).children
      }));
    }
  };

  /**取得帳號資訊
   * @returns {object} ul_id, city, city_census 回傳職務id，縣市，戶籍縣市
   */
  const getUserDetail = async () => {
    let res = await UserAPI.UserDetail({ user_id: getParams.user_id });
    if (res.success) {
      setUserDetail(prev => ({
        ...prev,
        dtlUser: {
          ...prev.dtlUser,
          ...res.data
        }
      }));

      return {
        ul_id: res.data.ul_id,
        city: res.data.city,
        city_census: res.data.city_census
      };
    }
  };

  /**查帳號的職務詳細資訊
   * @param {*} _ul_id 職務id
   */
  const getUserLevelDetail = async (_ul_id) => {
    let res = await UserLevelAPI.UserLevelDetail({ ul_id: _ul_id });
    if (res.success) {
      setUserLevelDetail(res.data.info);
    }
  };

  /**取得所有職務 */
  const getAllLevel = async () => {
    let res = await UserLevelAPI.UserLevelSearch(levelSearchParams);
    if (res.success) {
      setUserLevelSearch(res.data)
    }
  };

  // 給條件查詢職務
  useEffect(() => {
    const searchLevel = async () => {
      let res = await UserLevelAPI.UserLevelSearch(levelSearchParams);
      if (res.success) {
        setUserLevelSearch(res.data)
      }
    };

    searchLevel();
  }, [levelSearchParams]);

  /**取得並且整理好職責資料 (包括裡面checkbox的狀態) */
  const getDutyData = async (_ul_id) => {
    // 取得所有職責名稱
    let resAllDuty = await UserDutyAPI.UserDutySearch({});

    // 取得該職務有的職責
    let resLevelDuty = await UserLevelAPI.UserLevelDetail({ ul_id: _ul_id });

    // 取得帳號有的職責
    let resOwnDuty = await UserDutyAPI.UserOwnDutySearch({ user_id: getParams.user_id });

    if (resAllDuty.success && resLevelDuty.success && resOwnDuty.success) {
      // 處理職責資料
      let dutyData = resAllDuty.data.map(ad => {
        // 找出該職務有的職責
        let isDuty = resLevelDuty.data.duty.find(ld => ld.ud_id === ad.ud_id) ? "Y" : "N";

        // 找出該帳號有的職責
        let matchOwnDuty = resOwnDuty.data.find(od => od.ud_id === ad.ud_id);
        let hY = resOwnDuty.data.find(od => od.ud_id === ad.ud_id && od.isneed === "Y");
        let hN = resOwnDuty.data.find(od => od.ud_id === ad.ud_id && od.isneed === "N");

        let isneed = hY ? "Y" : hN ? "N" : "";
        let isOwn = matchOwnDuty && (isneed === "Y" || isneed === "") ? "Y" : "N";

        return {
          ...ad,
          isDuty,
          isneed,
          isOwn
        }
      });

      setSelectedLevelDetail(resLevelDuty.data.info);
      setUserDutyData(dutyData);
    }
  };

  /**頁面載入要做的事情*/
  const pageBegin = async () => {
    const { ul_id, city, city_census } = await getUserDetail();
    await getAllLevel();
    if (ul_id !== -1 && ul_id) {
      await getUserLevelDetail(ul_id);
      await getDutyData(ul_id);
    }

    // 處理區域
    if (city && options.cityOptions.length > 0) {
      getAreaOptions(city, options.cityOptions, "areaOptions");
    }
    if (city_census && options.cityCensusOptions.length > 0) {
      getAreaOptions(city_census, options.cityCensusOptions, "areaCensusOptions");
    }
  };

  useEffect(() => {
    pageBegin();
  }, [options.cityOptions, options.cityCensusOptions]);

  /**編輯輸入框*/
  const edit_handelInput = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setUserDetail(prev => ({
      ...prev,
      updUser: {
        ...prev.updUser,
        [name]: val
      }
    }));
  };

  /**編輯下拉選單 */
  const edit_handelSelect = (e) => {
    const { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    if (name === "city") {
      getAreaOptions(val, options.cityOptions, "areaOptions");
      setUserDetail(prev => ({
        ...prev,
        updUser: {
          ...prev.updUser,
          area: null
        }
      }));
    }
    if (name === "city_census") {
      getAreaOptions(val, options.cityCensusOptions, "areaCensusOptions");
      setUserDetail(prev => ({
        ...prev,
        updUser: {
          ...prev.updUser,
          area_census: null
        }
      }));
    }

    setUserDetail(prev => ({
      ...prev,
      updUser: {
        ...prev.updUser,
        [name]: val
      }
    }));
  };

  /**Checkbox事件 */
  const edit_HandleCheck = (e) => {
    const { id, name } = e.target;
    const [_, idVal] = id.split("--");

    /**更改選中狀態*/
    const getCheck = (_isneed) => {
      if (name === "add") return _isneed === "Y" ? "" : "Y";
      else if (name === "del") return _isneed === "N" ? "" : "N";
    };

    let data = userDutyData.map(ud => {
      if (ud.ud_id === parseInt(idVal)) {
        return {
          ...ud,
          "isneed": getCheck(ud.isneed),
        }
      }
      return ud;
    });

    setUserDutyData(data);
  };

  /**[事件]tabs切換*/
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={tabsValue}
        onChange={handleTabsChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example">
        <Tab id={"simple-tab-accountInfo"}
          label={"帳號資訊"}
          aria-controls={"simple-tab-accountInfo"}
        />
        <Tab id={"simple-tab-duty"}
          label={"職務"}
          aria-controls={"simple-tab-duty"}
        />
      </Tabs>
      <TabPanelAccountInfo
        value={tabsValue}
        index={0}
        userId={getParams.user_id}
        userName={getParams.username}
        UserDetail={UserDetail}
        userDetailCheck={userDetailCheck}
        initUserDetailCheck={initUserDetailCheck}
        setUserDetailCheck={setUserDetailCheck}
        sysOptions={options.sysOptions}
        genderOptions={options.genderOptions}
        cityOptions={options.cityOptions}
        areaOptions={options.areaOptions}
        cityCensusOptions={options.cityCensusOptions}
        areaCensusOptions={options.areaCensusOptions}
        disableArr={OptionList.DisableArr.filter(item => item.value !== "")}
        edit_handelInput={edit_handelInput}
        edit_handelSelect={edit_handelSelect}
        enqueueSnackbar={enqueueSnackbar}
      />
      <TabPanelDuty
        value={tabsValue}
        index={1}
        getParams={getParams}
        levelSearchParams={levelSearchParams}
        setLevelSearchParams={setLevelSearchParams}
        userLevelSearch={userLevelSearch}
        getUserLevelDetail={getUserLevelDetail}
        userLevelDetail={userLevelDetail}
        selectedLevelDetail={selectedLevelDetail}
        getDutyData={getDutyData}
        userDutyData={userDutyData}
        edit_HandleCheck={edit_HandleCheck}
        enqueueSnackbar={enqueueSnackbar}
      />
    </React.Fragment >
  )
};

/**帳號資訊tab */
const TabPanelAccountInfo = React.memo((props) => {
  const {
    value,
    index,
    userId,
    UserDetail,
    userDetailCheck,
    initUserDetailCheck,
    setUserDetailCheck,
    sysOptions,
    genderOptions,
    cityOptions,
    areaOptions,
    cityCensusOptions,
    areaCensusOptions,
    disableArr,
    edit_handelInput,
    edit_handelSelect,
    enqueueSnackbar
  } = props

  // 變更密碼
  const [updPassword, setUpdPassword] = useState({
    new_password: null,
    confirm_password: null,
  });

  /**重設密碼事件*/
  const setNewPasswordInput = (e) => {
    const { name, value } = e.target;

    setUpdPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**儲存編輯 */
  const saveAccountEdit = () => {
    if (UserDetail.updUser.username === null || UserDetail.updUser.on_board_date === null || UserDetail.updUser.name === null || UserDetail.updUser.home_page === null) {
      setUserDetailCheck(prev => ({
        ...prev,
        username: UserDetail.updUser.username === null ? true : false,
        on_board_date: UserDetail.updUser.on_board_date === null ? true : false,
        name: UserDetail.updUser.name === null ? true : false,
        home_page: UserDetail.updUser.home_page === null ? true : false
      }));
    } else {
      setUserDetailCheck(initUserDetailCheck);
      UserAPI.UserUpdate(UserDetail.updUser).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

  /**重設密碼 */
  const resetPassword = () => {
    if (updPassword.new_password !== updPassword.confirm_password) {
      enqueueSnackbar('密碼不一致', {
        variant: 'warning',
        persist: true
      });
    } else {
      UserAPI.ResetPassword({
        user_id: userId,
        new_password: updPassword.new_password
      }).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });

        setUpdPassword({
          new_password: null,
          confirm_password: null
        });
      });
    };
  };

  /**儲存帳號狀態 */
  const saveAccountStatus = () => {
    if (UserDetail.disable === null) {
      setUserDetailCheck(prev => ({
        ...prev,
        disable: UserDetail.disable === null ? true : false
      }))
    } else {
      setUserDetailCheck(initUserDetailCheck);
      UserAPI.UserUpdateDisable({
        user_id: userId,
        disable: UserDetail.updUser.disable !== undefined ? UserDetail.updUser.disable : UserDetail.dtlUser.disable
      }).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

  /**離職*/
  const resign = () => {
    UserAPI.UserResign({
      user_id: userId,
      resign_date: UserDetail.resign_date,
      resign_reason: UserDetail.resign_reason
    }).then(res => {
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  };

  let data = {
    ...UserDetail.dtlUser,
    ...UserDetail.updUser
  }

  return (
    <React.Fragment >
      <TabPanel value={value} index={index}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CusCard content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"帳號資訊"}
                    buttonType={"button"}
                    buttonGroup={[
                      { name: "儲存修改", variant: "contained", color: "primary", icon: <Save />, onClick: saveAccountEdit },
                    ]}
                    content={
                      <>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            disabled
                            id={"edit--username"}
                            name={"username"}
                            label={"使用者帳號"}
                            required={true}
                            error={userDetailCheck.username}
                            value={data.username}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusDatePicker
                            id={"edit--on_board_date"}
                            name={"on_board_date"}
                            label={"到職日"}
                            views={["year", "month", "day"]}
                            required={true}
                            error={userDetailCheck.on_board_date}
                            value={data.on_board_date}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit--home_page"}
                            name={"home_page"}
                            label={"系統登入頁"}
                            options={sysOptions}
                            optionKey={"sps_id"}
                            required={true}
                            error={userDetailCheck.home_page}
                            value={sysOptions.some(item => item.sps_id === data.home_page) ? sysOptions.find(item => item.sps_id === data.home_page) : null}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"基本資料"}
                    content={
                      <>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--name"}
                            name={"name"}
                            label={"姓名"}
                            required={true}
                            error={userDetailCheck.name}
                            value={data.name}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit--gender"}
                            name={"gender"}
                            label={"性別"}
                            options={genderOptions}
                            optionKey={"sps_id"}
                            value={genderOptions.some(item => item.sps_id === data.gender) ? genderOptions.find(item => item.sps_id === data.gender) : null}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--blood_type"}
                            name={"blood_type"}
                            label={"血型"}
                            value={data.blood_type}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--identity_card"}
                            name={"identity_card"}
                            label={"身分證"}
                            value={data.identity_card}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusDatePicker
                            id={"edit--birthday"}
                            name={"birthday"}
                            label={"生日"}
                            views={["year", "month", "day"]}
                            value={data.birthday}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--mobile_phone"}
                            name={"mobile_phone"}
                            label={"手機"}
                            value={data.mobile_phone}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--telephone"}
                            name={"telephone"}
                            label={"電話"}
                            value={data.telephone}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={8} sm={8} xs={12}>
                          <CusInput
                            id={"edit--email"}
                            name={"email"}
                            label={"電子信箱"}
                            value={data.email}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"聯絡地址"}
                    content={
                      <>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit--city"}
                            name={"city"}
                            label={"縣市"}
                            options={cityOptions}
                            optionKey={"name"}
                            value={cityOptions.some(item => item.name === data.city) ? cityOptions.find(item => item.name === data.city) : null}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit-area"}
                            name={"area"}
                            label={data.city === null || data.city === "" ? "請先選擇縣市" : "區域"}
                            options={areaOptions}
                            optionKey={"name"}
                            value={areaOptions.some(item => item.name === data.area) ? areaOptions.find(item => item.name === data.area) : null}
                            disabled={data.city === null || data.city === "" ? true : false}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--address"}
                            name={"address"}
                            label={"地址"}
                            value={data.address}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"戶籍地址"}
                    content={
                      <>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit--city_census"}
                            name={"city_census"}
                            label={"縣市"}
                            options={cityCensusOptions}
                            optionKey={"name"}
                            value={cityCensusOptions.some(item => item.name === data.city_census) ? cityCensusOptions.find(item => item.name === data.city_census) : null}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusOutlinedSelect
                            id={"edit-area_census"}
                            name={"area_census"}
                            label={data.city_census === null || data.city_census === "" ? "請先選擇縣市" : "區域"}
                            options={areaCensusOptions}
                            optionKey={"name"}
                            value={areaCensusOptions.some(item => item.name === data.area_census) ? areaCensusOptions.find(item => item.name === data.area_census) : null}
                            disabled={data.city_census === null || data.city_census === "" ? true : false}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <CusInput
                            id={"edit--address_census"}
                            name={"address_census"}
                            label={"地址"}
                            value={data.address_census}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"其它"}
                    content={
                      <>
                        <Grid item lg={12} sm={12} xs={12}>
                          <CusInput
                            id={"edit--note"}
                            name={"note"}
                            label={"備註"}
                            value={data.note}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
              </React.Fragment>}
            />
          </Grid>
          <Grid item xs={12}>
            <CusCard content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"變更密碼"}
                    buttonType={"button"}
                    buttonGroup={[
                      { name: "重設密碼", variant: "contained", color: "primary", icon: <Save />, onClick: resetPassword, disabled: !updPassword.new_password || !updPassword.confirm_password ? true : false },
                    ]}
                    content={
                      <>
                        <Grid item lg={6} sm={6} xs={12}>
                          <CusInput
                            id={"edit--new_password"}
                            name={"new_password"}
                            label={"新密碼"}
                            type={"password"}
                            value={updPassword.new_password}
                            onChangeEvent={(e) => setNewPasswordInput(e)}
                          />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <CusInput
                            id={"edit--confirm_password"}
                            name={"confirm_password"}
                            label={"確認密碼"}
                            type={"password"}
                            value={updPassword.confirm_password}
                            onChangeEvent={(e) => setNewPasswordInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
              </React.Fragment>}
            />
          </Grid>
          <Grid item xs={12}>
            <CusCard content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"帳號狀態"}
                    buttonType={"button"}
                    buttonGroup={[
                      { name: "儲存狀態", variant: "contained", color: "primary", icon: <Save />, onClick: saveAccountStatus },
                    ]}
                    content={
                      <>
                        <Grid item lg={6} sm={6} xs={12}>
                          <CusOutlinedSelect
                            id={"edit-disable"}
                            name={"disable"}
                            label={"帳號狀態"}
                            options={disableArr}
                            optionKey={"value"}
                            error={userDetailCheck.disable}
                            value={disableArr.some(item => item.value === data.disable) ? disableArr.find(item => item.value === data.disable) : null}
                            onChangeEvent={(e) => edit_handelSelect(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
              </React.Fragment>}
            />
          </Grid>
          <Grid item xs={12}>
            <CusCard content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"離職"}
                    buttonType={"button"}
                    buttonGroup={[
                      { name: "確認離職", variant: "contained", color: "primary", icon: <Save />, onClick: resign, disabled: !data.resign_date || !data.resign_reason ? true : false },
                    ]}
                    content={
                      <>
                        <Grid item lg={6} sm={6} xs={12}>
                          <CusDatePicker
                            id={"edit--resign_date"}
                            name={"resign_date"}
                            label={"離職日期"}
                            views={["year", "month", "day"]}
                            value={data.resign_date}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <CusInput
                            id={"edit--resign_reason"}
                            name={"resign_reason"}
                            label={"離職原因"}
                            value={data.resign_reason}
                            onChangeEvent={(e) => edit_handelInput(e)}
                          />
                        </Grid>
                      </>
                    }
                  />
                </Grid>
              </React.Fragment>}
            />
          </Grid>
        </Grid>
      </TabPanel>
    </React.Fragment >
  )
});

/**職務設定tab*/
const TabPanelDuty = React.memo((props) => {
  const {
    value,
    index,
    getParams,
    levelSearchParams,
    setLevelSearchParams,
    userLevelSearch,
    getUserLevelDetail,
    userLevelDetail,
    selectedLevelDetail,
    getDutyData,
    userDutyData,
    edit_HandleCheck,
    enqueueSnackbar
  } = props;

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  /**職務查詢 */
  const search_handelInput = (e) => {
    const { name, value } = e.target;

    setLevelSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**按下儲存權限 */
  const edit_DutyClick = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'add',
      DialogTitle: '修改職務、職責',
      DialogContent: <DialogsInner
        type={'add'}
        ref={useDialogInner}
        selectedLevelDetail={selectedLevelDetail}
        userDutyData={userDutyData}
      />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={edit_DutyConfirm} color="primary" text="新增" />
        </React.Fragment>
      ),
      maxWidth: 'md'
    }));
  };

  /**儲存權限編輯確認*/
  const edit_DutyConfirm = async () => {
    const { open, todoDate, setToDoCheck } = useDialogInner.current;

    const filterDuty = userDutyData.filter(item => item.isneed === "Y" || item.isneed === "N");
    const requestDutyArr = filterDuty.map(item => {
      return {
        key: item.ud_id,
        value: item.isneed
      };
    });

    // 排程設定
    if (open) {
      if (!todoDate) {
        setToDoCheck(true);
      } else {
        setToDoCheck(false);

        ToDoListAPI.ToDoListCreate({
          url: "/User/UserUpdateLevel",
          request: JSON.stringify({ ul_id: selectedLevelDetail.ul_id, user_id: getParams.user_id }),
          expect_time: todoDate
        }).then(res => {
          enqueueSnackbar(res.message, {
            variant: res.success ? "success" : "warning",
            persist: !res.success
          });
        });

        ToDoListAPI.ToDoListCreate({
          url: "/User/UserUpdateDuty",
          request: JSON.stringify({ ud_ids: requestDutyArr, user_id: getParams.user_id }),
          expect_time: todoDate
        }).then(res => {
          enqueueSnackbar(res.message, {
            variant: res.success ? "success" : "warning",
            persist: !res.success
          });
        });

        dialogClose();
      }
    } else {
      // 更新職務
      if (selectedLevelDetail.ul_id !== userLevelDetail.ul_id) {
        let res = await UserAPI.UserUpdateLevel({
          ul_id: selectedLevelDetail.ul_id,
          user_id: getParams.user_id,
        });
        if (res.success) {
          getUserLevelDetail(selectedLevelDetail.ul_id);
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      }

      // 更新職責
      let res = await UserAPI.UserUpdateDuty({
        ud_ids: requestDutyArr,
        user_id: getParams.user_id
      });
      if (res.success) {
        getUserLevelDetail(selectedLevelDetail.ul_id);
        getDutyData(selectedLevelDetail.ul_id);
      }

      dialogClose();

      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    }
  };

  /**[關閉]Dialog */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose();
  }, []);

  return (
    <React.Fragment >
      <TabPanel value={value} index={index}>
        <CusCard content={
          <React.Fragment>
            <Grid item xs={12}>
              <Grid container spacing={0} style={{ display: "flex", justifyContent: "flex-end" }}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={() => { edit_DutyClick() }} />
              </Grid>
              <CusDialog ref={useDialog} info={dialogData} />
              <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
                <Grid item lg={6} md={6} xs={12}>
                  <Card style={{ padding: '0 0rem', margin: "0 0.5rem" }} variant="outlined">
                    <CardHeader
                      title={userLevelDetail.name ? `當前職務 - ${userLevelDetail.name}` : "尚未綁定職務"}
                      sx={{ backgroundColor: "#789aaf", textAlign: 'center', color: '#fff', padding: "1rem" }}
                      titleTypographyProps={{ variant: "body1" }}
                    />
                    <CardContent style={{ padding: "0" }}>
                      <Grid container>
                        {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                      公司：{userLevelDetail.company_name}
                    </Grid> */}
                        <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                          據點：{userLevelDetail.position_name}
                        </Grid>
                        <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd", borderLeft: "1px solid #ddd" }}>
                          部門：{userLevelDetail.department_name}
                        </Grid>
                        {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem" }}>
                    廠別：{userLevelDetail.position_name}
                  </Grid>
                  <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderLeft: "1px solid #ddd" }}>
                    課級：{userLevelDetail.group_name}
                  </Grid> */}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <Card style={{ padding: '0 0rem', margin: "0 0.5rem" }} variant="outlined">
                    <CardHeader
                      title={`選擇職務 - ${selectedLevelDetail.name ? selectedLevelDetail.name : ""}`}
                      sx={{ backgroundColor: "#f0f3f5", textAlign: 'center', padding: "1rem" }}
                      titleTypographyProps={{ variant: "body1" }}
                    />
                    <CardContent style={{ padding: "0" }}>
                      <Grid container>
                        {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                      公司：{selectedLevelDetail.company_name}
                    </Grid> */}
                        <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                          據點：{selectedLevelDetail.position_name}
                        </Grid>
                        <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd", borderLeft: "1px solid #ddd" }}>
                          部門：{selectedLevelDetail.department_name}
                        </Grid>
                        {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem" }}>
                    廠別：{selectedLevelDetail.position_name}
                  </Grid>
                  <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderLeft: "1px solid #ddd" }}>
                    課級：{selectedLevelDetail.group_name}
                  </Grid> */}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ margin: "2rem 0" }} />
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} xs={12}>
                  <Card style={{ margin: "0 0.5rem" }} variant="outlined">
                    <Grid item lg={12} md={12} xs={12} >
                      <CardHeader
                        title={"職務項目"}
                        sx={{ backgroundColor: "#f0f3f5", textAlign: 'center', padding: "1rem" }}
                        titleTypographyProps={{ variant: "body1" }}
                      />
                      <CusInput
                        id={'search--name'}
                        name={'name'}
                        label={'職務名稱查詢'}
                        value={levelSearchParams.name}
                        onChangeEvent={(e) => search_handelInput(e)}
                        sxStyle={{ paddingLeft: { sm: "0.6rem", xs: "0rem" } }}
                      />
                    </Grid>
                    <CardContent style={{ padding: "0", height: "35vh" }} sx={{ overflow: "auto" }}>
                      <Grid item lg={12} md={12} xs={12}>
                        {userLevelSearch.map((item, index) => {
                          return (
                            <CusListButton
                              key={index}
                              selected={item.ul_id === selectedLevelDetail.ul_id ? true : false}
                              checked={item.ul_id === userLevelDetail.ul_id ? true : false}
                              name={item.name}
                              label={item.code}
                              onClick={() => { getDutyData(item.ul_id) }}
                            />
                          )
                        })}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={9} md={9} xs={12}>
                  <Card style={{ margin: "0 0.5rem" }} variant="outlined">
                    <CardHeader
                      title={"調整職責"}
                      sx={{ backgroundColor: "#f0f3f5", textAlign: 'center', padding: "1rem" }}
                      titleTypographyProps={{ variant: "body1" }}
                    />
                    <CardContent style={{ padding: "0 1rem", height: '40vh' }} sx={{ overflow: "auto" }}>
                      <Grid item xs={12}>
                        <CusBasicTable
                          TableHead={[
                            { name: "群組職責" },
                            { name: "手動加入" },
                            { name: "手動去除" },
                            { name: "帳號職責" },
                            { name: "職責名稱" },
                            { name: "邏輯主管" }]}
                          TableBody={<TableBodyContent userDutyData={userDutyData} edit_HandleCheck={edit_HandleCheck} />}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>}
        />
      </TabPanel>
    </React.Fragment >
  )
});

const TableBodyContent = (props) => {
  const { userDutyData, edit_HandleCheck } = props;

  return (
    <React.Fragment>
      {userDutyData.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              <CusCheckboxBasic
                id={"levelDuty--" + item.ud_id.toString()}
                name={"Duty"}
                color={"secondary"}
                value={item.isDuty}
                disabled={true}
              />{item.code}
            </TableCell>
            <TableCell>
              <CusCheckboxBasic
                id={"add--" + item.ud_id.toString()}
                name={"add"}
                color={"secondary"}
                value={item.isneed === "Y" ? "Y" : "N"}
                onChangeEvent={(e) => { edit_HandleCheck(e) }}
              />{item.code}
            </TableCell>
            <TableCell>
              <CusCheckboxBasic
                id={"del--" + item.ud_id.toString()}
                name={"del"}
                color={"secondary"}
                value={item.isneed === "N" ? "Y" : "N"}
                onChangeEvent={(e) => { edit_HandleCheck(e) }}
              />{item.code}
            </TableCell>
            <TableCell>
              <CusCheckboxBasic
                id={"ownDuty--" + item.ud_id.toString()}
                name={"ownDuty"}
                color={"secondary"}
                value={item.isOwn}
                disabled={true}
              />{item.code}
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.ul_name}</TableCell>
          </TableRow>
        )
      })}
    </React.Fragment>
  )
}

const DialogsInner = forwardRef((props, ref) => {
  const { selectedLevelDetail, userDutyData } = props;

  // Collapse開關
  const [open, setOpen] = useState(false);

  // 排程時間
  const [todoDate, setToDoDate] = useState(null);
  const [todoDateCheck, setToDoCheck] = useState(false);

  /**排程日期input*/
  const edit_ToDoDate = (e) => {
    const { value } = e.target;

    setToDoDate(value);
  };

  /**控制開合*/
  const handleCollapse = (openStatus) => {
    setOpen(openStatus);
    if (open === false) {
      setToDoDate(null);
      setToDoCheck(false);
    }
  };

  /**傳遞給父層的資料 */
  useImperativeHandle(ref, () => ({
    open,
    todoDate,
    setToDoCheck
  }));

  const dutyInfoResult = userDutyData.filter(item => (item.isDuty === "Y" && item.isneed !== "N") || item.isneed === "Y");

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          {open
            ? <CusTextIconButton
              color={"secondary"}
              text={"取消排程"}
              startIcon={null}
              onClick={() => { handleCollapse(false) }}
            />
            : <CusTextIconButton
              color={"primary"}
              text={"設定排程"}
              startIcon={null}
              onClick={() => { handleCollapse(true) }}
            />}

        </Grid>
        <Grid item lg={12} md={12} xs={12} >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid item lg={12} md={12} xs={12} >
              <CusAlert
                severity="info"
                text="可以前往「帳號調整排程」查看所有排程"
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12} >
              <CusDatePicker
                id={"edit--execute_date"}
                name={"execute_date"}
                label={"排程日期"}
                required={true}
                error={todoDateCheck}
                views={["year", "month", "day"]}
                value={todoDate}
                onChangeEvent={(e) => { edit_ToDoDate(e) }}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12} >
              <Divider sx={{ margin: "1rem 0" }} />
            </Grid>
          </Collapse>
        </Grid>
        <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>職務資訊</Grid>
        <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>
          <Card style={{ padding: '0 0rem', margin: "0 0.5rem" }} variant="outlined">
            <CardHeader
              title={`職務：${selectedLevelDetail.name}`}
              sx={{ backgroundColor: "#f0f3f5", textAlign: 'center' }}
              titleTypographyProps={{ variant: "body1" }}
            />
            <CardContent style={{ padding: "0" }}>
              <Grid container>
                {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                  公司：{selectedLevelDetail.company_name}
                </Grid> */}
                <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
                  據點：{selectedLevelDetail.position_name}
                </Grid>
                <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderBottom: "1px solid #ddd", borderLeft: "1px solid #ddd" }}>
                  部門：{selectedLevelDetail.department_name}
                </Grid>
                {/* <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem" }}>
                  廠別：{selectedLevelDetail.position_name}
                </Grid>
                <Grid item lg={6} md={6} xs={6} style={{ padding: "1rem", borderLeft: "1px solid #ddd" }}>
                  課級：{selectedLevelDetail.group_name}
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: "1rem 0" }} />
        </Grid>
        <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>職務列表</Grid>
        <Grid item lg={12} md={12} xs={12}>
          <CusBasicTable
            TableHead={[
              { name: "排序" },
              { name: "代碼" },
              { name: "職責名稱" },
              { name: "邏輯主管" }]}
            TableBody={
              dutyInfoResult.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.code} </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.ul_name}</TableCell>
                  </TableRow>
                )
              })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}, []);