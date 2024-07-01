import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Tabs, Tab, Box, Collapse } from '@mui/material';
import { Save, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusTextIconButton, CusIconButton } from '../../../../components/CusButton';
import { TabPanel } from '../../../../components/CusTab';
import { CusCheckboxLabel, CusCheckboxBasic } from '../../../../components/CusCheckBox';
import { NoResults } from '../../../../components/CusError';
import { SystemParamAPI, UserDutyAPI } from '../../../../js/APITS';
import { GetPermission } from '../../../../js/Function';
import { CheckLogIn } from '../../../../js/Domain';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function UserDutySecond() {
  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // 職責資訊
  const [dutyDetail, setDutyDetail] = useState({
    dtlDuty: {
      ud_id: getParams.ud_id,
    },
    updDuty: {
      ud_id: getParams.ud_id,
    }
  });
  const initDutyDetailCheck = { code: false, name: false };
  const [dutyDetailCheck, setDutyDetailCheck] = useState(initDutyDetailCheck);

  // tab標籤
  const [tabsValue, seTabsValue] = useState(0);

  // 調整版，取得當前使用者可以呈現的所有權限畫面
  const [permissionContent, setPermissionContent] = useState([]);

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  /**
   * 取得所選職責所有相關資訊 => (所選職責資訊、所擁有的頁面與控制項權限)
   */
  const getDutyDetail = async () => {
    try {
      // 用檢查登入狀態，取得帳號
      let resCheckLogin = await CheckLogIn();
      if (resCheckLogin.success) {
        // 取得帳號權限 (得到該帳號所有的權限，決定下方權限頁面要顯示多少資料)
        let resPermission = await GetPermission(resCheckLogin.data.path);

        // 取得所選職責 (資訊、所選職責所擁有的系統、頁面、控制項)
        let resDuty = await UserDutyAPI.UserDutyDetail({ ud_id: getParams.ud_id });

        // 填入編輯框裡面所需資訊
        if (resDuty.success) setDutyDetail(prev => ({
          ...prev,
          dtlDuty: {
            ...prev.dtlDuty,
            ...resDuty.data.info
          }
        }));

        // 取得group => 系統後台、進銷存、網站
        let resSys = await SystemParamAPI.SecondList({ spp_id: "SYS" });

        if (resPermission.length > 0 && resDuty.success && resSys.success) {
          // 處理當前使用者權限，系統入口加上id與備註
          const userPermission = resPermission.map(p => {
            const matchSys = resSys.data.find(s => s.name === p.name);
            if (matchSys) {
              return {
                ...p,
                sps_id: matchSys.sps_id,
                remark: matchSys.remark
              };
            }
            return p;
          });

          // 職責權限與當前使用者的權限跑遞迴，判斷pages與pageControl是否要勾選
          settingCheckState({
            permission: userPermission,
            pages: resDuty.data.pages,
            pageControl: resDuty.data.pageControl
          });

          setPermissionContent(userPermission);
        }
      }
    } catch (error) {
      enqueueSnackbar("查詢失敗", {
        variant: "warning",
        persist: true
      });
    }
  };

  /**
   * [資料處理]遞迴，設定勾選狀態
   * @param {*} props
   */
  const settingCheckState = (props) => {
    let { permission, pages, pageControl } = props

    if (!Array.isArray(permission)) return;

    permission.forEach(pm => {
      if (pm.page_id)
        pages.some(p => p === pm.page_id) ? pm.isChecked = "Y" : pm.isChecked = "N";

      if (pm.pc_id)
        pageControl.some(pc => pc === pm.pc_id) ? pm.isChecked = "Y" : pm.isChecked = "N";

      if (pm.children && pm.children.length > 0) {
        settingCheckState({
          ...props,
          permission: pm.children,
        });
      }
    })
  };

  useEffect(() => {
    getDutyDetail();
  }, []);

  /**
   * @description input
   */
  const edit_HandleInput = (e) => {
    const { name, value, type, checked } = e.target;
    const val = value === "" ? null : value;

    setDutyDetail(prev => ({
      ...prev,
      updDuty: {
        ...prev.updDuty,
        [name]: type === "checkbox"
          ? checked
            ? "Y"
            : "N"
          : val
      }
    }));
  };

  /**
   * @description [確認]儲存職責資訊
   */
  const edit_Confirm = async () => {
    if (dutyDetail.updDuty.code === null || dutyDetail.updDuty.name === null) {
      setDutyDetailCheck({
        code: dutyDetail.updDuty.code === null ? true : false,
        name: dutyDetail.updDuty.name === null ? true : false
      });
    } else {
      setDutyDetailCheck(initDutyDetailCheck);

      UserDutyAPI.UserDutyUpdate(dutyDetail.updDuty).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

  /**
    * @description [儲存]設定職責權限
    */
  const permissionSaveConfirm = () => {
    // 找出有勾選的丟進陣列裡面
    let checkArr = [];

    permissionContent.map((system) => {
      system.children.map((group) => {
        group.children.map((pageGroup) => {
          pageGroup.children.map((page) => {
            if (page.isChecked === "Y") {
              // 勾選的頁面群組與頁面
              checkArr.push({
                pg_id: page.pg_id,
                page_id: page.page_id,
                pc_id: null
              });
              page.children.map((pageControl) => {
                if (pageControl.isChecked === "Y") {
                  // 勾選的頁面群組、頁面 + 控制項
                  checkArr.push({
                    pg_id: page.pg_id,
                    page_id: page.page_id,
                    pc_id: pageControl.pc_id
                  });
                }
              });
            }
          });
        });
      });
    });

    UserDutyAPI.UserDutyUpdatePermission({
      ud_id: getParams.ud_id,
      permission_list: checkArr
    }).then(res => {
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  };

  // TODO：要再優化

  /**
   * @description [事件]checkbox
   * @param {*} e 
   */
  const edit_HandleCheck = (e) => {
    const { name, id, checked } = e.target;
    const checkedVal = checked ? "Y" : "N";
    const [idName, idVal] = id.split("--");

    if (idName === "all") {
      /**
       * 遞迴處理全選與全不選
       * @param {*} data 傳入的子層陣列
       * @param {*} value Y/N
       */
      const settingAllChecked = (data, value) => {
        data.forEach(d => {
          if (d.hasOwnProperty("isChecked")) {
            d.isChecked = value;
          }
          if (d.children && d.children.length > 0) {
            settingAllChecked(d.children, value);
          }
        });
      }
      settingAllChecked(permissionContent.filter(p => p.name === name), checkedVal);

      setPermissionContent([...permissionContent]);
    } else {
      /**
       * 遞迴處理個別單選
       * @param {*} data 傳入的子層陣列
       * @param {*} id 要勾選的id
       * @param {*} value Y/N
       */
      // TODO：pageControl選起來還不能檢查到上一層page，一起選起來
      const settingChecked = (data, id, value) => {
        data.forEach(d => {
          if (d.hasOwnProperty("isChecked")) {
            if (d[idName] === parseInt(id)) {
              d.isChecked = value;
            }
          }

          if (d.children && d.children.length > 0) {
            settingChecked(d.children, id, value);
          }
        });
      }

      settingChecked(permissionContent.filter(p => p.name === name), idVal, checkedVal);

      setPermissionContent([...permissionContent]);
    }
  };

  /**
   * 判斷是否全選
   * @param {*} permissionData 要判斷全選或全不選的資料
   * @returns Y/N
   */
  const getCheckedAllStatus = (permissionData) => {
    let allStatus = "Y";

    /**
     * 遞迴判斷頁面載入時全選與全不選
     * @param {*} data 
     */
    const settingAllStatus = (data) => {
      data.forEach(d => {
        if (d.hasOwnProperty("isChecked")) {
          if (d.isChecked !== "Y") allStatus = "N"
        }

        if (d.children && d.children.length > 0) {
          settingAllStatus(d.children);
        }
      });
    };

    settingAllStatus(permissionData.children);

    return allStatus;
  };

  /**
   * @description [事件]tabs切換
   * @param {*} e 
   */
  const handleTabsChange = (event, newValue) => {
    seTabsValue(newValue);
  };

  let data = {
    ...dutyDetail.dtlDuty,
    ...dutyDetail.updDuty
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} style={{ marginBottom: "1rem" }}>職責資訊</Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--ud_id"}
                  name={"ud_id"}
                  label={"職責編號"}
                  type={"text"}
                  disabled={true}
                  value={data.ud_id}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--code"}
                  name={"code"}
                  label={"職責代碼"}
                  type={"text"}
                  required={true}
                  error={dutyDetailCheck.code}
                  value={data.code}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--name"}
                  name={"name"}
                  label={"職責名稱"}
                  type={"text"}
                  required={true}
                  error={dutyDetailCheck.name}
                  value={data.name}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusCheckboxLabel
                  id={"info--is_calculate_salary"}
                  name={'is_calculate_salary'}
                  label={"是否計薪"}
                  type={"checkbox"}
                  value={data.is_calculate_salary}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={edit_Confirm} />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Tabs
              value={tabsValue}
              onChange={handleTabsChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example">
              {permissionContent.length > 0
                ? permissionContent.map((item) => (<Tab
                  key={item.sps_id}
                  id={item.sps_id}
                  label={item.remark}
                  aria-controls={`simple - tabpanel - ${item.sps_id} `} />))
                : null}
            </Tabs>
          </Grid>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12}>設定職責權限</Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存權限"}
                  startIcon={<Save />}
                  onClick={permissionSaveConfirm} />
              </Grid>
              <Grid item xs={12}>
                {permissionContent.length > 0
                  ? permissionContent.map((item, index) => (
                    <TabPanel value={tabsValue} key={item.sps_id} index={index}>
                      <PermissionContentTabPanel
                        type={item.name}
                        permission={permissionContent.filter(p => p.name === item.name)}
                        handleCheck={edit_HandleCheck}
                        getCheckedAllStatus={getCheckedAllStatus}
                      />
                    </TabPanel>
                  ))
                  : <NoResults />}
              </Grid>
            </React.Fragment>}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

/**
 * 職責權限設定頁面
 */
const PermissionContentTabPanel = React.memo(props => {
  const { permission, type, handleCheck, getCheckedAllStatus } = props;

  const [collapseStates, setCollapseStates] = useState({});

  /**
   * @description [事件]Collapse開關
   * @param {*} e 
   */
  const handleCollapseOpen = (pageId) => {
    setCollapseStates((prevOpenStates) => ({
      ...prevOpenStates,
      [pageId]: !prevOpenStates[pageId],
    }));
  };

  return (
    <React.Fragment>
      {permission.length > 0
        ? <CusBasicTable
          TableHead={[
            { name: "" },
            {
              name:
                <React.Fragment>
                  <CusCheckboxBasic
                    id={"all--all"}
                    name={type}
                    color={"secondary"}
                    value={getCheckedAllStatus(permission[0])}
                    onChangeEvent={(e) => handleCheck(e)}
                  />群組名稱
                </React.Fragment>
            },
            { name: "群組代碼" },
            { name: "頁面名稱" },
            { name: "頁面代碼" }
          ]}
          TableBody={permission[0].children.map((group) => {
            return group.children.map((pageGroup) => {
              return pageGroup.children.map((page) => {
                const isOpen = !!collapseStates[page.page_id];
                return (
                  <React.Fragment key={page.page_id}>
                    <TableRow hover>
                      <TableCell>
                        {page.children.length > 0
                          ? <CusIconButton
                            color="primary"
                            onClick={() => handleCollapseOpen(page.page_id)}
                            icon={isOpen
                              ? <KeyboardArrowUp />
                              : <KeyboardArrowDown />}
                          />
                          : null}
                      </TableCell>
                      <TableCell>
                        <CusCheckboxBasic
                          id={"page_id--" + page.page_id}
                          name={type}
                          color={"secondary"}
                          value={page.isChecked}
                          onChangeEvent={(e) => handleCheck(e)}
                        />{pageGroup.name}
                      </TableCell>
                      <TableCell>{pageGroup.code}</TableCell>
                      <TableCell>{page.name}</TableCell>
                      <TableCell>{page.code}</TableCell>
                    </TableRow>
                    {page.children.length > 0
                      ? <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1.5, display: "flex" }}>
                              {page.children.map((pageControl) => {
                                return (
                                  <Box key={pageControl.pc_id} sx={{ marginRight: 3, marginLeft: 3 }}>
                                    <CusCheckboxLabel
                                      id={"pc_id--" + pageControl.pc_id}
                                      name={type}
                                      label={pageControl.name}
                                      type={'checkbox'}
                                      value={pageControl.isChecked}
                                      onChangeEvent={(e) => handleCheck(e)}
                                    />
                                  </Box>
                                )
                              })}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                      : null}
                  </React.Fragment>
                )
              })
            })
          })}
        />
        : <NoResults />}
    </React.Fragment>
  )
});