import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Tabs, Tab, TableCell, TableRow } from '@mui/material';
import { HighlightOff, Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusTextIconButton } from '../../../../components/CusButton';
import { NoResults } from '../../../../components/CusError';
import { DDMenu, UserDutyAPI, UserLevelAPI } from '../../../../js/APITS';
import { CusCheckboxBasic } from '../../../../components/CusCheckBox';

export default function UserLevelSecond() {
  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // tabs
  const [tabsValue, setTabsValue] = useState(0);

  // 職務資訊
  const [levelDetail, setLevelDetail] = useState({
    dtlLevel: {
      ul_id: getParams.ul_id
    },
    updLevel: {
      ul_id: getParams.ul_id
    }
  });
  const initLevelDetailCheck = { code: false, name: false, parent_id: false };
  const [levelDetailCheck, setLevelDetailCheck] = useState(initLevelDetailCheck);

  // 職務的職責
  const [levelDuty, setLevelDuty] = useState([]);

  // 下拉選單
  const [options, setOptions] = useState({
    levelOptions: [],
    comOptions: [],
    posOptions: [],
    deptOptions: [],
    titleOptions: []
  });

  // dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 提示框
  const { enqueueSnackbar } = useSnackbar();

  // 取得下拉選單
  const getOptions = async () => {
    const resLevel = await UserLevelAPI.UserLevelSearchAll({ code: "" });
    const comArr = await DDMenu.selectorCode("COM");
    const posArr = await DDMenu.selectorCode("POS");
    const deptArr = await DDMenu.selectorCode("DEP");
    const titleArr = await DDMenu.selectorCode("JTT"); //職稱下拉選單，但ECC目前好像還沒有?先放著

    setOptions(prev => ({
      ...prev,
      levelOptions: resLevel.success ? resLevel.data : [],
      comOptions: comArr,
      posOptions: posArr,
      deptOptions: deptArr,
      titleOptions: titleArr
    }))
  };

  /**
   * 取得職務資訊
   */
  const getLevelDetail = () => {
    UserLevelAPI.UserLevelDetail({ ul_id: getParams.ul_id }).then(res => {
      if (res.success) {
        setLevelDetail(prev => ({
          ...prev,
          dtlLevel: {
            ...prev.dtlLevel,
            ...res.data.info
          }
        }));
        setLevelDuty(res.data.duty)
      }
    });
  };

  useEffect(() => {
    getOptions();
    getLevelDetail();
  }, []);

  /**
   * input
   */
  const edit_HandleInput = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setLevelDetail(prev => ({
      ...prev,
      updLevel: {
        ...prev.updLevel,
        [name]: val
      }
    }));
  };

  /**
   * select
   */
  const edit_HandleSelect = (e) => {
    const { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    setLevelDetail(prev => ({
      ...prev,
      updLevel: {
        ...prev.updLevel,
        [name]: val
      }
    }));
  };

  /**
   * 儲存修改
   */
  const edit_Confirm = () => {
    if (levelDetail.updLevel.code === null || levelDetail.updLevel.name === null || levelDetail.updLevel.parent_id === null) {
      setLevelDetailCheck({
        code: levelDetail.updLevel.code === null ? true : false,
        name: levelDetail.updLevel.name === null ? true : false,
        parent_id: levelDetail.updLevel.parent_id === null ? true : false
      })
    } else {
      setLevelDetailCheck(initLevelDetailCheck);

      UserLevelAPI.UserLevelUpdate(levelDetail.updLevel).then(res => {
        if (res.success) getLevelDetail();
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "error",
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [事件]tabs切換
   * @param {*} e 
   */
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  let data = {
    ...levelDetail.dtlLevel,
    ...levelDetail.updLevel
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12} style={{ marginBottom: '1rem' }}>職務資訊</Grid>
              <Grid item xs={12} sm={3} md={3}>
                <CusInput
                  id={"edit--ul_id"}
                  name={"ul_id"}
                  label={"職務編號"}
                  type={"text"}
                  required={true}
                  disabled={true}
                  value={data.ul_id}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <CusInput
                  id={"edit--code"}
                  name={"code"}
                  label={"職務代碼"}
                  type={"text"}
                  required={true}
                  error={levelDetailCheck.code}
                  value={data.code}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <CusInput
                  id={"edit--name"}
                  name={"name"}
                  label={"職務名稱"}
                  type={"text"}
                  required={true}
                  error={levelDetailCheck.name}
                  value={data.name}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <CusOutlinedSelect
                  id={"edit--parent_id"}
                  name={"parent_id"}
                  label={"母層職務"}
                  options={options.levelOptions}
                  optionKey={"ul_id"}
                  required={true}
                  error={levelDetailCheck.parent_id}
                  value={options.levelOptions.some(item => item.ul_id === data.parent_id) ? options.levelOptions.find(item => item.ul_id === data.parent_id) : null}
                  onChangeEvent={(e) => { edit_HandleSelect(e) }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={4} md={4}>
            <CusOutlinedSelect
              id={"edit--company_id"}
              name={"company_id"}
              label={"公司"}
              options={options.comOptions}
              optionKey={"sps_id"}
              value={options.comOptions.some(item => item.sps_id === data.company_id) ? options.comOptions.find(item => item.sps_id === data.company_id) : null}
              onChangeEvent={(e) => { edit_HandleSelect(e) }}
            />
          </Grid> */}
              <Grid item xs={12} sm={4} md={4}>
                <CusOutlinedSelect
                  id={"edit--position_id"}
                  name={"position_id"}
                  label={"據點"}
                  options={options.posOptions}
                  optionKey={"sps_id"}
                  value={options.posOptions.some(item => item.sps_id === data.position_id) ? options.posOptions.find(item => item.sps_id === data.position_id) : null}
                  onChangeEvent={(e) => { edit_HandleSelect(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusOutlinedSelect
                  id={"edit--department_id"}
                  name={"department_id"}
                  label={options.deptOptions.length > 0 ? "部門" : "查無部門"}
                  disabled={options.deptOptions.length > 0 ? false : true}
                  options={options.deptOptions}
                  optionKey={"sps_id"}
                  value={options.deptOptions.some(item => item.sps_id === data.department_id) ? options.deptOptions.find(item => item.sps_id === data.department_id) : null}
                  onChangeEvent={(e) => { edit_HandleSelect(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusOutlinedSelect
                  id={"edit--title"}
                  name={"title"}
                  label={options.titleOptions.length > 0 ? "職稱" : "查無職稱"}
                  disabled={options.titleOptions.length > 0 ? false : true}
                  options={options.titleOptions}
                  optionKey={"sps_id"}
                  value={options.titleOptions.some(item => item.sps_id === data.title) ? options.titleOptions.find(item => item.sps_id === data.title) : null}
                  onChangeEvent={(e) => { edit_HandleSelect(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={"edit--maximum"}
                  name={"maximum"}
                  label={"可編制人數上限"}
                  type={"number"}
                  value={data.maximum}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={"edit--email"}
                  name={"email"}
                  label={"職務信箱"}
                  type={"text"}
                  value={data.email}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={"edit--phone"}
                  name={"phone"}
                  label={"聯絡方式"}
                  type={"text"}
                  value={data.phone}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <CusInput
                  id={"edit--note"}
                  name={"note"}
                  label={"備註"}
                  type={"text"}
                  value={data.note}
                  onChangeEvent={(e) => { edit_HandleInput(e) }}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={() => edit_Confirm()}
                />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Tabs value={tabsValue}
              onChange={handleTabsChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example">
              <Tab id={"simple-tab-dutySetting"}
                label={"設定職責"}
                aria-controls={"simple-tab-dutySetting"}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <TabPanelDutySetting
              value={tabsValue}
              index={0}
              levelDuty={levelDuty}
              enqueueSnackbar={enqueueSnackbar}
              ul_id={getParams.ul_id}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const TabPanelDutySetting = React.memo(props => {
  //取得傳進來的職務資訊
  const { levelDuty, enqueueSnackbar, ul_id } = props;

  // 職責列表
  const [dutyList, setDutyList] = useState([]);

  /**
   * 查詢職責列表
   */
  const getDutyList = useCallback(() => {
    UserDutyAPI.UserDutySearch({}).then(res => {
      if (res.success) {
        // 處理職務的職責，存在職責的勾起來
        const checkedLevelDuty = res.data.map(d => {
          const isChecked = levelDuty.some(ld => d.ud_id === ld.ud_id) ? "Y" : "N";
          return { ...d, isChecked };
        });

        setDutyList(checkedLevelDuty);
      }
    });
  }, [levelDuty]);

  useEffect(() => {
    getDutyList();
  }, [levelDuty]);

  /**
   * checkbox事件
   */
  const edit_HandleCheckbox = useCallback((e) => {
    const { id, checked } = e.target;
    const checkedVal = checked ? "Y" : "N";
    const idVal = id.split("--")[1];

    // TODO：以下寫法看能不能在優化
    let updateChecked = [];
    if (idVal === "all") {
      // 是全選
      updateChecked = dutyList.map(d => ({
        ...d,
        isChecked: dutyList.every(item => item.isChecked === "Y") ? "N" : "Y"// every都是Y的話全部變N，其餘狀況都變Y
      }));
    } else {
      // 不是全選
      // 選中的那個職責，改變狀態，其餘不變
      updateChecked = dutyList.map(d => {
        if (d.ud_id === parseInt(idVal)) {
          return { ...d, isChecked: checkedVal };
        } else {
          return { ...d };
        }
      });
    }

    setDutyList(updateChecked);

  }, [dutyList]);

  /**
   * 儲存職責
   */
  const saveDutySetting = useCallback(() => {
    // 取得被勾選的職責
    let checkedArr = [];
    dutyList.forEach(d => {
      if (d.isChecked === "Y") checkedArr.push(d.ud_id);
    });

    UserLevelAPI.UserLevelUpdateDuty({
      ul_id: ul_id,
      ud_ids: checkedArr
    }).then(res => {
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  }, [dutyList]);

  const TableBodyContent = React.memo(() => {
    return (
      dutyList.map((item, index) => (
        <TableRow key={item.ud_id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <CusCheckboxBasic
              id={"ud_id--" + item.ud_id}
              name={item.code}
              color={"secondary"}
              value={item.isChecked}
              onChangeEvent={(e) => { edit_HandleCheckbox(e) }}
            />
            {item.ud_id}
          </TableCell>
          <TableCell>{item.code}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.ul_name}</TableCell>
        </TableRow>
      ))
    )
  }, []);

  return (
    <React.Fragment>
      <CusCard content={
        <React.Fragment>
          <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            <CusTextIconButton
              color={"primary"}
              text={"儲存權限"}
              startIcon={<Save />}
              onClick={() => saveDutySetting()}
            />
          </Grid>
          <Grid item xs={12}>
            {dutyList.length > 0
              ? <CusBasicTable
                TableHead={[
                  { name: "排序" },
                  {
                    name: <React.Fragment>
                      <CusCheckboxBasic
                        id={"all--all"}
                        name={"All"}
                        color={"secondary"}
                        value={dutyList.every(item => item.isChecked === "Y") ? "Y" : "N"}
                        onChangeEvent={(e) => { edit_HandleCheckbox(e) }}
                      />職責編號
                    </React.Fragment>
                  },
                  { name: "職責代碼" },
                  { name: "職責" },
                  { name: "邏輯主管" }
                ]}
                TableBody={<TableBodyContent />}
              />
              : <NoResults />}
          </Grid>
        </React.Fragment>}
      />
    </React.Fragment>
  )
});
