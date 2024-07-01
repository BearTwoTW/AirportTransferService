import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusCheckboxBasic } from '../../../../components/CusCheckBox';
import { CusInput } from '../../../../components/CusInput';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusTextIconButton } from '../../../../components/CusButton';
import { PermissionFunctionAPI, UserDutyAPI } from '../../../../js/APITS';
import { NoResults } from '../../../../components/CusError';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function SysPermissionSecond() {
  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // 系統功能權限資訊
  const [functionDetail, setFunctionDetail] = useState({
    dtlFunction: {
      pfl_id: getParams.pfl_id
    },
    updFunction: {
      pfl_id: getParams.pfl_id
    }
  });
  const initFunctionDetialCheck = { name: false, api_name: false };
  const [functionDetialCheck, setFunctionDetialCheck] = useState(initFunctionDetialCheck);

  // 功能職責列表
  const [functionDuty, setFunctionDuty] = useState([]);

  // 職責列表
  const [dutyList, setDutyList] = useState([]);

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  /**
   * @description [查詢]權限功能資訊細項
   */
  const getPermissionFunctionDetail = () => {
    PermissionFunctionAPI.PermissionFunctionDetail({ pfl_id: getParams.pfl_id }).then(res => {
      if (res.success) {
        setFunctionDetail(prev => ({
          ...prev,
          dtlFunction: res.data.info
        }));
        setFunctionDuty(res.data.duty);
      }
    });
  };

  useEffect(() => {
    getPermissionFunctionDetail();
  }, []);

  /**
   * @description [查詢]職責列表
   */
  const getDutyList = () => {
    UserDutyAPI.UserDutySearch({}).then(res => {
      if (res.success) {
        // 處理職責，存在職責的勾起來
        const checkedDuty = res.data.map(d => {
          const isChecked = functionDuty.some(fd => d.ud_id === fd.ud_id) ? "Y" : "N";
          return { ...d, isChecked };
        });

        setDutyList(checkedDuty);
      }
    });
  };

  useEffect(() => {
    getDutyList();
  }, [functionDuty]);

  /**
   * @description [事件]input
   */
  const edit_HandleInput = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setFunctionDetail(prev => ({
      ...prev,
      updFunction: {
        ...prev.updFunction,
        [name]: val
      }
    }));
  };

  /**
   * @description [確認]儲存權限資訊
   */
  const edit_Confirm = () => {
    if (functionDetail.updFunction.name === null || functionDetail.updFunction.api_name === null) {
      setFunctionDetialCheck({
        name: functionDetail.updFunction.name === null ? true : false,
        api_name: functionDetail.updFunction.api_name ? true : false
      });
    } else {
      setFunctionDetialCheck(initFunctionDetialCheck);

      PermissionFunctionAPI.PermissionFunctionUpdate(functionDetail.updFunction).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [確認]功能職責綁定
   */
  const edit_DutyConfirm = () => {
    let checkedArr = [];
    dutyList.forEach(d => {
      if (d.isChecked === "Y") checkedArr.push(d.ud_id);
    });

    PermissionFunctionAPI.PermissionFunctionUpdateUserDuty({
      pfl_id: getParams.pfl_id,
      ud_ids: checkedArr
    }).then(res => {
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  };

  /**
   * @description [事件]checkbox
   * @param {*} e 
   */
  const edit_HandleCheck = (e) => {
    const { id, checked } = e.target;
    const checkedVal = checked ? "Y" : "N";
    const idVal = id.split("--")[1];

    let updateChecked = [];
    if (idVal === "all") {
      updateChecked = dutyList.map(d => ({
        ...d,
        isChecked: dutyList.every(item => item.isChecked === "Y") ? "N" : "Y"
      }));
    } else {
      updateChecked = dutyList.map(d => {
        if (d.ud_id === parseInt(idVal)) {
          return { ...d, isChecked: checkedVal };
        } else {
          return { ...d };
        }
      });
    }

    setDutyList(updateChecked);
  };

  let data = {
    ...functionDetail.dtlFunction,
    ...functionDetail.updFunction
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>權限資訊</Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--name"}
                  name={"name"}
                  label={"權限名稱"}
                  type={"text"}
                  required={true}
                  error={functionDetialCheck.name}
                  value={data.name}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--api_name"}
                  name={"api_name"}
                  label={"API名稱"}
                  type={"text"}
                  required={true}
                  error={functionDetialCheck.api_name}
                  value={data.api_name}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--join_limit"}
                  name={"join_limit"}
                  label={"綁定上限"}
                  type={"number"}
                  value={data.join_limit}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={edit_Confirm}
                />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12}>設定綁定功能</Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={edit_DutyConfirm} />
              </Grid>
              {dutyList.length > 0
                ? <Grid item xs={12}>
                  <CusBasicTable
                    TableHead={[
                      { name: "排序" },
                      {
                        name:
                          <React.Fragment>
                            <CusCheckboxBasic
                              id={"all--all"}
                              name={"All"}
                              color={"secondary"}
                              value={dutyList.every(item => item.isChecked === "Y") ? "Y" : "N"}
                              onChangeEvent={(e) => edit_HandleCheck(e)}
                            />職責代碼
                          </React.Fragment>
                      },
                      { name: "職責名稱" }]}
                    TableBody={(dutyList.map((ele, index) => (
                      <TableRow hover key={ele.ud_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <CusCheckboxBasic
                            id={"ud_id--" + ele.ud_id}
                            value={ele.isChecked}
                            color={"secondary"}
                            onChangeEvent={(e) => edit_HandleCheck(e)}
                          />{ele.code}
                        </TableCell>
                        <TableCell>{ele.name}</TableCell>
                      </TableRow>
                    )))} />
                </Grid>
                : <NoResults />}
            </React.Fragment>}
          />
        </Grid>
      </Grid>
    </React.Fragment >
  )
};