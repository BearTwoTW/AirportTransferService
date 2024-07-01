import React, { useState, useEffect } from 'react';
import { Grid, Divider, Card, CardHeader, CardContent } from '@mui/material';
import { Add, Save, Delete } from '@mui/icons-material';
import { CusCard } from '../../../../components/CusCard';
import { CusTextIconButton, CusIconButton } from '../../../../components/CusButton';
import { CusInput } from '../../../../components/CusInput';
import { CusRadio } from '../../../../components/CusRadio';
import { CircularLoading } from '../../../../components/CusProgress';
import { NoResults } from '../../../../components/CusError';
import { SystemSettingAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';
import { useSnackbar } from 'notistack';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const SystemSetting = () => {
  // 權限
  const permission = useCheckLogInXPermission('SystemSetting', ['Save']);

  // 系統規則資料
  const [systemSettingData, setSystemSettingData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  /**
   * 取得系統規則設定資料
   */
  const getSystemSettingData = () => {
    SystemSettingAPI.SystemSettingSearch({}).then(res => {
      if (res.success) {
        // 處理裡面的value_json
        let dt = res.data.map(ele => ({
          ...ele,
          value_json: JSON.parse(ele.value_json)
        }));

        setSystemSettingData(dt);
      } else {
        enqueueSnackbar(res.message, {
          variant: "warning",
          persist: true
        });
      }
      setIsDataLoading(false);
    });
  };

  useEffect(() => {
    getSystemSettingData();
  }, []);

  /**
   * 編輯確認
   */
  const edit_Confirm = async () => {
    const promises = systemSettingData.map(sd => editSave(sd.ssm_id, sd.value_json));
    await Promise.all(promises);// 等待全部執行完畢，如果有另外錯誤處理，就再另外寫

    const allSuccess = promises.every(p => p === true);
    if (allSuccess) getSystemSettingData();
  };

  /**
   * 儲存設定結果
   * @param {number} _ssm_id id
   * @param {Array} _value_json 值
   * @returns {boolean} 是否成功
   */
  const editSave = async (_ssm_id, _value_json) => {
    const res = await SystemSettingAPI.SystemSettingUpdate({
      ssm_id: _ssm_id,
      value_json: _value_json
    });
    enqueueSnackbar(res.message, {
      variant: res.success ? "success" : "error",
      persist: !res.success
    });
    return res.success ? true : false;
  };

  return (
    <React.Fragment>
      <CusCard content={
        <React.Fragment>
          <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            {permission.Save
              ? <CusTextIconButton
                color={"primary"}
                text={"儲存修改"}
                startIcon={<Save />}
                onClick={() => { edit_Confirm() }} />
              : null}
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            {!isDataLoading
              ? systemSettingData.length > 0
                ? <SettingContent
                  systemSettingData={systemSettingData}
                  setSystemSettingData={setSystemSettingData}
                  enqueueSnackbar={enqueueSnackbar}
                />
                : <NoResults />
              : <CircularLoading />}
          </Grid>
        </React.Fragment>}
      />
    </React.Fragment>
  )
};

export default SystemSetting;

/**
 * 規則設定內容
 */
const SettingContent = (props) => {
  let { systemSettingData, setSystemSettingData, enqueueSnackbar } = props;

  /**
   * @description 增加內容modal
   * @param {*} e 
   */
  const addContent_Click = (e) => {
    systemSettingData = systemSettingData.map(sd => {
      if (sd.ssm_name === "預設其他描述") {
        return {
          ...sd,
          value_json: [...sd.value_json, {
            key: "預設標題",
            type: "textarea",
            value: "預設內容"
          }]
        }
      }
      return sd;
    });

    setSystemSettingData(systemSettingData);
  };

  /**
   * @description 刪除內容modal
   * @param {*} e 
   */
  const deleteContent_Click = (groupId, key) => {
    let filterData = systemSettingData.map(sd => {
      if (sd.ssm_id === groupId) {
        // 檢查內容組的長度，如果只剩一組，就不給刪
        if (sd.value_json.length <= 1) {
          enqueueSnackbar("需至少一組內容", {
            variant: "warning",
            persist: true
          });
        } else {
          // 過濾當前ssm_id的value_json的key
          // 考慮要不要請後端給id，不然如果key給一樣，刪除時會刪光光
          sd.value_json = sd.value_json.filter(vj => vj.key !== key)
        }
      }
      return sd;
    });

    setSystemSettingData(filterData);
  };

  /**
   * 輸入框
   */
  const edit_HandleInput = (e) => {
    const { name, value, type } = e.target;
    const val = value === "" ? null : value;
    const [_, group, ind, KeyValue] = name.split("--");

    systemSettingData = systemSettingData.map(sd => {
      // 先寫死，如果有其他的，再改
      if (sd.ssm_name === "預設其他描述") {
        if (sd.ssm_id === parseInt(group)) {
          return {
            ...sd,
            value_json: sd.value_json.map((vj, index) => {
              if (index === parseInt(ind)) {
                return {
                  ...vj,
                  [KeyValue]: value
                  // [KeyValue]: val
                }
              } else {
                return {
                  ...vj
                }
              }
            })
          }
        }
        return sd;
      } else {
        if (sd.ssm_id === parseInt(group)) {
          return {
            ...sd,
            value_json: sd.value_json.map((vj, index) => {
              if (type === "radio") { // 是radio
                return {
                  ...vj,
                  value: vj.value === "N" ? "Y" : "N" // 本來是N的變Y，其餘變N
                }
              } else { // 不是radio
                if (index === parseInt(ind)) { // 判斷陣列第幾個有沒有對到ind(input渲染時給的順序)
                  // 有對到就改值
                  return {
                    ...vj,
                    value: val,
                    // requireError: val === null ? true : false
                  }
                } else {
                  // 沒對到的不變
                  return {
                    ...vj
                  }
                }
              }
            })
          }
        }
        return sd;
      }
    });

    setSystemSettingData(systemSettingData);
  };

  return (
    systemSettingData.map((ele, index) => {
      return (
        <React.Fragment key={ele.ssm_id}>
          <Grid item lg={6} md={6} xs={12} style={{ marginBottom: "1rem" }}>
            <Card style={{ margin: "0 0.5rem" }} variant="outlined">
              <CardHeader
                title={ele.ssm_name}
                sx={{ backgroundColor: "#f0f3f5" }}
                titleTypographyProps={{ variant: "body1" }}
              />
              {/* remark:value_json裡面的radio資料格式有點特別，所以要特別處理 heyhey*/}
              {ele.value_json[0].type === "radio"
                ? <CardContent>
                  <CusRadio
                    id={`edit--${ele.ssm_id}--${index}`}
                    name={`edit--${ele.ssm_id}--${index}`}
                    formControl={ele.value_json}
                    onChangeEvent={e => { edit_HandleInput(e) }}
                  />
                </CardContent>
                : <CardContent>
                  {ele.value_json.map((v, index) => {
                    switch (v.type) {
                      case "number":
                        return (
                          <React.Fragment key={ele.ssm_id + index}>
                            <CusInput
                              id={`edit--${ele.ssm_id}--${index}`}
                              name={`edit--${ele.ssm_id}--${index}`}
                              required={true}
                              // error={v.requireError}
                              label={v.key}
                              type={v.type}
                              value={v.value}
                              onChangeEvent={e => { edit_HandleInput(e) }}
                            />
                          </React.Fragment>
                        );
                      // 預設其他描述應該搬到其他地方，這邊先註解
                      case "textarea":
                        return (
                          <React.Fragment key={ele.ssm_id + index}>
                            <Grid container>
                              <Grid item xs={10}>
                                <CusInput
                                  id={`edit--${ele.ssm_id}--${index}--key`}
                                  name={`edit--${ele.ssm_id}--${index}--key`}
                                  required={true}
                                  multiline={true}
                                  label={"標題"}
                                  type={v.type}
                                  value={v.key}
                                  onChangeEvent={e => { edit_HandleInput(e) }}
                                />
                                <CusInput
                                  id={`edit--${ele.ssm_id}--${index}--value`}
                                  name={`edit--${ele.ssm_id}--${index}--value`}
                                  // required={true}
                                  multiline={true}
                                  rows={10}
                                  label={"內容"}
                                  type={v.type}
                                  value={v.value}
                                  onChangeEvent={e => { edit_HandleInput(e) }}
                                />
                              </Grid>
                              <Grid item xs={2} display={"flex"} justifyContent="center" alignItems="center">
                                <CusIconButton
                                  onClick={() => deleteContent_Click(ele.ssm_id, v.key)}
                                  color="primary"
                                  icon={<Delete />}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Divider sx={{ margin: "1rem 0" }} />
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        );
                      default:
                        return (<div>未預期的類型</div>)
                    }
                  })}
                  {ele.ssm_name === "預設其他描述"
                    ? <Grid container>
                      <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                        <CusTextIconButton
                          color={"primary"}
                          text={"新增內容"}
                          startIcon={<Add />}
                          onClick={(e) => { addContent_Click(e) }} />
                      </Grid>
                    </Grid>
                    : null}
                </CardContent>
              }
            </Card>
          </Grid>
        </React.Fragment>
      )
    })
  )
};