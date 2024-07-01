import React, { useEffect, useState } from 'react';
import { gsap } from "gsap";
import {
  Add, Delete, Remove, AccountBox, RecentActors, Edit, Check, OpenInNew,
  Backspace, FileUpload, FirstPage, LastPage, KeyboardArrowUp, KeyboardArrowDown,
  KeyboardArrowLeft, KeyboardArrowRight, Save, ContentCopy, Circle, AttachMoney, CheckCircle,
  Download, Search, Print, Upload, Cancel, BuildCircle, Redo, HelpOutline, CheckCircleOutline,
  Close, BrowserNotSupportedOutlined, Category, Animation
} from '@mui/icons-material';
import { Grid, Tabs, Tab, Box, Button, IconButton, Tooltip, Typography, ButtonGroup, TableCell, TableRow, List, Divider } from '@mui/material';
import { TabPanel } from '../../../../components/CusTab';
import { CusTextIconButton, CusIconButton, CusToggleButtonGroup, CusButtonGroup, CusTextButton } from '../../../../components/CusButton';
import { CusSwitch } from '../../../../components/CusSwitchTS';
import { CusChip } from '../../../../components/CusChip';
import { CusInfoTitle, CusInfoContent } from '../../../../components/CusInfo';
import { CusCheckboxBasic } from '../../../../components/CusCheckBox';
import { CusInput } from '../../../../components/CusInput';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusDatePicker, CusDateTimePicker } from '../../../../components/CusDatePicker';
import { CusHtmlTooltip } from '../../../../components/CusTooltip';
import { CusBasicTable, CusCardTable } from '../../../../components/CusTable';
import { CusTableCollapse } from '../../../../components/CusCollapse';
import { CusCard, CusHeaderCard, CusSmallCard, CusBarCodeCard, CusDashboardCard, CusListCard } from '../../../../components/CusCard';
import { CusLineChart, CusBarChart, CusPieChart } from '../../../../components/CusChart';
import { CusRadio, CusRadioCard } from '../../../../components/CusRadio';
import { CusListButton, CusListItem, CusListItemCollapse } from '../../../../components/CusList';
import { CusUploadImgFilePreview, CusUploadImgFile } from '../../../../components/CusFileUpload';
import { CusAlert, CusTimeLineAlert } from '../../../../components/CusAlert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import ApplePay from '../../../../components/ApplePayButton';

const SystemStyle = () => {
  const [tabsValue, setTabsValue] = useState(0);

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
          icon={<Category />}
          label={"組件"}
          aria-controls={"simple-tab-component"}
        />
        <Tab id={"simple-tab-duty"}
          label={"動畫實驗室"}
          icon={<Animation />}
          aria-controls={"simple-tab-animation"}
        />
        <Tab id={"simple-tab-ApplePay"}
          label={"ApplePay測試"}
          aria-controls={"simple-tab-ApplePay"}
        />
      </Tabs>
      <TabComponents
        value={tabsValue}
        index={0}
      />
      <TabAnimation
        value={tabsValue}
        index={1}
      />
      <ApplePayTest
        value={tabsValue}
        index={2}
      />
    </React.Fragment >
  )
};

const TabComponents = (props) => {
  const { value, index } = props
  // tabs
  const [tabsValue, setTabsValue] = useState(0);
  const [checkBoxState, setCheckBoxState] = useState("N");
  const [toggleBtn, setToggleBtn] = useState("ON");
  const [inputValue, setInputValue] = useState("");
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [checked, setChecked] = useState("Y");
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState({});
  const [ImageSize, setImageSize] = useState(null);

  const handleClickCollapse = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
    console.log("isOpen")
  };
  const handleUpload = (e) => {
    setUploadFile(e.target.files[0])
  };
  const getSize = (size) => {
    setImageSize(size)
  };
  const handleEdit = () => {
    setEdit(prev => !prev);
    console.log("edit")
  };
  const handleSave = () => {
    setEdit(prev => !prev);
    console.log("save")
  };
  const handleLink = () => {
    console.log("link")
  };
  const handleClick = () => {
    console.log("click")
  };
  const handleSwitch = () => {
    setChecked(checked === "N" ? "Y" : "N");
  };
  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setToolTipOpen(true);
  };
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const handleCheckBoxClick = (e) => {
    e.stopPropagation();
    setCheckBoxState(checkBoxState === "N" ? "Y" : "N");
  };
  const handleToggleBtnClick = (event, newValue) => {
    setToggleBtn(newValue);
  };
  const handelInput = (event, newValue) => {
    setInputValue(newValue);
  }
  const fakeFunction = () => {
    // 防爆用
  };

  let radioData = [
    { key: "1", label: "卡片標題1", text: "說明文字", value: "option1", disabled: false },
    { key: "2", label: "卡片標題2", text: "說明文字", value: "option2", disabled: false },
    { key: "3", label: "卡片標題3", text: "說明文字", value: "option3", disabled: false },
    { key: "4", label: "卡片標題4", text: "說明文字", value: "option4", disabled: false },
    { key: "5", label: "卡片標題5", text: "說明文字", value: "option5", disabled: false },
  ]
  return (
    <React.Fragment>
      <TabPanel value={value} index={index}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={3}>
            <CusDashboardCard title={"本日新增訂單"} icon={<ContentCopy />} value={123} value2={-5} title2={"昨日訂單數"} />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <CusDashboardCard title={"本日訂單取消數"} icon={<ContentCopy />} value={123} />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <CusDashboardCard title={"本日退貨數"} icon={<ContentCopy />} value={123} />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <CusDashboardCard title={"待出貨"} icon={<ContentCopy />} value={123} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"Charts"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusLineChart
                            height={300}
                            title={"折線圖"}
                            value={123456}
                            xAxis={[
                              {
                                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                                scaleType: "point"
                              }
                            ]}
                            series={[
                              { data: [3000, 2000, 4000, 2000, 5000, 3000, 4000, 2000, 5000, 3000, 4000, 2000] }
                            ]}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusBarChart
                            height={300}
                            title={"長條圖"}
                            value={123456}
                            xAxis={[{ scaleType: 'band', data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] }]}
                            series={[
                              { data: [4, 3, 5, 4, 3, 4, 7, 8, 9, 10, 3, 4], label: "促銷 A" },
                              { data: [1, 6, 3, 5, 4, 3, 4, 7, 8, 9, 2, 10], label: "促銷 B" },
                              { data: [2, 5, 6, 4, 7, 8, 4, 3, 5, 1, 6, 3], label: "促銷 C" },
                            ]}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusPieChart
                            height={300}
                            title={"圓餅圖"}
                            value={123456}
                            series={[
                              {
                                data: [
                                  { id: 0, value: 10, label: '促銷 A' },
                                  { id: 1, value: 15, label: '促銷 B' },
                                  { id: 2, value: 20, label: '促銷 C' },
                                ],
                              },
                            ]}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Contained Button (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusTextIconButton
                          color={"default"}
                          text={"default"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"primary"}
                          text={"primary"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"secondary"}
                          text={"secondary"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"success"}
                          text={"success"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"info"}
                          text={"info"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"warning"}
                          text={"warning"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"error"}
                          text={"error"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          disabled={true}
                          text={"disabled"}
                          startIcon={<Circle />}
                        />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Outlined Button (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusTextIconButton
                          color={"primary"}
                          variant="outlined"
                          text={"primary"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"secondary"}
                          variant="outlined"
                          text={"secondary"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"success"}
                          variant="outlined"
                          text={"success"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"info"}
                          variant="outlined"
                          text={"info"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"warning"}
                          variant="outlined"
                          text={"warning"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          color={"error"}
                          variant="outlined"
                          text={"error"}
                          startIcon={<Circle />}
                        />
                        <CusTextIconButton
                          disabled={true}
                          variant="outlined"
                          text={"disabled"}
                          startIcon={<Circle />}
                        />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Contained Button Group (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"default"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"primary"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"secondary"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"success"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"info"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"warning"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"error"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          disabled
                          variant="contained"
                          name={"ButtonGroup"}
                          color={"info"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Outlined Button Group (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"primary"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"secondary"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"success"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"info"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"warning"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"error"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                        <CusButtonGroup
                          disabled
                          variant="outlined"
                          name={"ButtonGroup"}
                          color={"info"}
                          buttonsArr={[{ name: "one", value: "one" }, { name: "two", value: "two" }, { name: "three", value: "three" }]}
                          onChangeEvent={""}>
                        </CusButtonGroup>
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Icon Button (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusIconButton
                          color='secondary'
                          icon={<Add />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<Remove />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<Edit />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<Save />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<Delete />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<ContentCopy />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<OpenInNew />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<Check />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<FileUpload />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<FirstPage />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<LastPage />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<KeyboardArrowUp />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<KeyboardArrowDown />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<KeyboardArrowLeft />}
                        />
                        <CusIconButton
                          color='secondary'
                          icon={<KeyboardArrowRight />}
                        />
                        <CusIconButton
                          color='error'
                          icon={<Backspace />}
                        />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Toggle Button Group"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusToggleButtonGroup
                          name={"ToggleButton"}
                          color={"primary"}
                          value={"ON"}
                          buttonsArr={[{ name: "ON", value: "ON" }, { name: "OFF", value: "OFF" }]}
                          onChangeEvent={handleToggleBtnClick}
                        />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Radio"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <FormControl>
                          <RadioGroup
                            row
                            defaultValue="primary"
                          >
                            <FormControlLabel value="primary" control={<Radio color={"primary"} />} label="PRIMARY" />
                            <FormControlLabel value="secondary" control={<Radio color={"secondary"} />} label="SECONDARY" />
                            <FormControlLabel value="success" control={<Radio color={"success"} />} label="SUCCESS" />
                            <FormControlLabel value="info" control={<Radio color={"info"} />} label="INFO" />
                            <FormControlLabel value="warning" control={<Radio color={"warning"} />} label="WARNING" />
                            <FormControlLabel value="error" control={<Radio color={"error"} />} label="ERROR" />
                            <FormControlLabel disabled value="disabled" control={<Radio color={"error"} />} label="DISABLED" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Radio Card"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusRadioCard name="test" data={radioData} />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Switch (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusSwitch color={"primary"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"secondary"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"info"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"warning"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"error"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch disabled color={"primary"} checked={false} onChange={(e) => handleSwitch(e)} />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Switch (後台使用)"}
                    content={
                      <Grid item xs={12} md={12} lg={12} sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                        <CusSwitch color={"success"} label={"是否開放"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} label={"是否導覽列使用"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} label={"是否為組合商品"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} label={"重複商品掃描"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} label={"可合併使用其他優惠"} checked={checked} onChange={(e) => handleSwitch(e)} />
                        <CusSwitch color={"success"} label={"是否循環計算"} checked={checked} onChange={(e) => handleSwitch(e)} />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Check Box"}
                    spacing={2}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={12} lg={12}>
                          <CusCheckboxBasic
                            id={"primary"}
                            name={"primary"}
                            color={"primary"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            id={"secondary"}
                            name={"secondary"}
                            color={"secondary"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            id={"success"}
                            name={"success"}
                            color={"success"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            id={"info"}
                            name={"info"}
                            color={"info"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            id={"warning"}
                            name={"warning"}
                            color={"warning"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            id={"error"}
                            name={"error"}
                            color={"error"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            disabled={true}
                            id={"disabled"}
                            name={"disabled"}
                            color={"error"}
                            value={checkBoxState}
                            soft={false}
                            onChangeEvent={handleCheckBoxClick}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"primary"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"secondary"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"success"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"info"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"warning"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            name={"checkbox"}
                            color={"error"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                          <CusCheckboxBasic
                            disabled={true}
                            name={"checkbox"}
                            color={"error"}
                            value={"Y"}
                            soft={false}
                            onChangeEvent={fakeFunction}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Tabs"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <Tabs
                          value={tabsValue}
                          onChange={handleTabsChange}
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile>
                          <Tab
                            id={"tab-1"}
                            label={"tab-1"}
                            aria-controls={"tab-1"}
                          />
                          <Tab
                            id={"tab-2"}
                            label={"tab-2"}
                            aria-controls={"tab-2"}
                          />
                        </Tabs>
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Upload File"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusUploadImgFile
                          id={"UploadFile"}
                          color={"info"}
                          multiple={true}
                          onChangeEvent={""} />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Upload File Preview"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusUploadImgFilePreview
                          id={"Upload--file--preview"}
                          fileName={""}
                          url={""}
                          onChangeEvent={(e) => handleUpload(e)}
                          getSize={""} />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Text Field"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            name={"Text Field"}
                            label={"Text Field"}
                            // error={""}
                            value={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            disabled
                            name={"Text Field Disabled"}
                            label={"Text Field Disabled"}
                            // error={""}
                            value={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            name={"Text Field"}
                            label={"Text Field"}
                            // error={""}
                            value={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            disabled
                            name={"Text Field Disabled"}
                            label={"Text Field Disabled"}
                            // error={""}
                            value={"Text Field Disabled"}
                            onChangeEvent={""}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Text Field (multiline)"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            name={"Text Field"}
                            label={"Text Field"}
                            multiline={true}
                            maxRows={4}
                            // error={""}
                            value={"lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur"}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusInput
                            name={"Text Field"}
                            label={"Text Field"}
                            multiline={true}
                            maxRows={4}
                            // error={""}
                            disabled={true}
                            value={"lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur Quos blanditiis tenetur lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur"}
                            onChangeEvent={""}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Selectors"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusOutlinedSelect
                            name={"Selector"}
                            label={"Selector"}
                            // value={""}
                            // options={""}
                            optionKey={"value"}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusOutlinedSelect
                            disabled
                            name={"Selector Disabled"}
                            label={"Selector Disabled"}
                            // value={""}
                            // options={""}
                            optionKey={"value"}
                            onChangeEvent={""}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Date Picker"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusDatePicker
                            name={"Date-Picker"}
                            label={"Date-Picker"}
                            views={["year", "month", "day"]}
                            // error={""}
                            onChangeEvent={""}
                          />

                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusDatePicker
                            disabled
                            name={"Date-Picker Disabled"}
                            label={"Date-Picker Disabled"}
                            views={["year", "month", "day"]}
                            // error={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Date Time Picker"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusDateTimePicker
                            id={"Date-Time-Picker"}
                            name={"on_shelf_time"}
                            label={"Date-Time-Picker"}
                            value={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusDateTimePicker
                            disabled
                            id={"Date-Time-Picker Disabled"}
                            name={"Date-Time-Picker Disabled"}
                            label={"Date-Time-Picker Disabled"}
                            value={""}
                            onChangeEvent={""}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"Tooltip"}
                    content={
                      <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", alignItems: "center" }}>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                          <Tooltip
                            arrow
                            PopperProps={{
                              disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={toolTipOpen}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Click">
                            <Box>
                              <CusTextButton
                                color={"secondary"}
                                text={"Click"}
                                onClick={handleTooltipOpen}
                              />
                            </Box>
                          </Tooltip>
                        </ClickAwayListener>
                        <Tooltip
                          arrow
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title="Fade">
                          <Box>
                            <CusTextButton
                              color={"success"}
                              text={"Fade"}
                            />
                          </Box>
                        </Tooltip>
                        <Tooltip
                          arrow
                          TransitionComponent={Zoom}
                          title="Zoom">
                          <Box>
                            <CusTextButton
                              color={"warning"}
                              text={"Zoom"}
                            />
                          </Box>
                        </Tooltip>
                        <CusHtmlTooltip
                          title={"HTML"}
                          type={"button"}
                          startIcon={<Delete />}
                          placement={"bottom"}
                          color={"info"}
                          variant={"outlined"}
                          content={
                            <React.Fragment>
                              <Typography variant="h6" gutterBottom>
                                Title
                              </Typography>
                              <Typography gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur
                              </Typography>
                              <CusTextIconButton
                                color={"primary"}
                                variant="outlined"
                                text={"primary"}
                                startIcon={<Add />}
                              />
                              <CusIconButton
                                color='error'
                                icon={<Delete />}
                              />
                            </React.Fragment>
                          } />
                        <CusHtmlTooltip
                          title={"HTML"}
                          type={"icon"}
                          icon={<Delete color={"secondary"} />}
                          placement={"bottom"}
                          color={"info"}
                          variant={"outlined"}
                          content={
                            <React.Fragment>
                              <Typography variant="h6" gutterBottom>
                                Title
                              </Typography>
                              <Typography gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur
                              </Typography>
                              <CusTextIconButton
                                color={"primary"}
                                variant="outlined"
                                text={"primary"}
                                startIcon={<Add />}
                              />
                              <CusIconButton
                                color='error'
                                icon={<Delete />}
                              />
                            </React.Fragment>
                          } />
                      </Grid>
                    } />

                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"Table (樣式範例)"}
                    spacing={2}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusBasicTable
                            TableHead={[
                              {
                                name:
                                  <CusCheckboxBasic
                                    id={"primary"}
                                    name={"primary"}
                                    color={"primary"}
                                    value={checkBoxState}
                                    soft={false}
                                    onChangeEvent={(e) => handleCheckBoxClick(e)}
                                  />
                              },
                              { name: '欄位B' },
                              { name: '欄位C' },
                              { name: '欄位D' },
                              { name: '' },]}
                            TableBody={
                              <>
                                <TableRow hover onClick={handleClick}>
                                  <TableCell>
                                    <CusCheckboxBasic
                                      id={"primary"}
                                      name={"primary"}
                                      color={"primary"}
                                      value={checkBoxState}
                                      soft={false}
                                      onChangeEvent={handleCheckBoxClick}
                                    />
                                  </TableCell>
                                  <TableCell>內容B</TableCell>
                                  <TableCell>內容C</TableCell>
                                  <TableCell>內容D</TableCell>
                                  <TableCell style={{ textAlign: "right" }}>
                                    <CusIconButton
                                      color='secondary'
                                      icon={<Edit />}
                                    />
                                    <CusIconButton
                                      color='secondary'
                                      icon={<Delete />}
                                    />
                                  </TableCell>
                                </TableRow>
                              </>
                            } />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusBasicTable
                            TableHead={[
                              { name: '欄位A' },
                              { name: '欄位B' },
                              { name: '欄位C' },
                              { name: '欄位D' },
                              { name: '' },]}
                            TableBody={
                              <>
                                <TableRow hover onClick={handleClick}>
                                  <TableCell>內容A</TableCell>
                                  <TableCell>內容B</TableCell>
                                  <TableCell>內容C</TableCell>
                                  <TableCell>內容D</TableCell>
                                  <TableCell style={{ textAlign: "right" }}>
                                    <CusToggleButtonGroup
                                      name={"ToggleButton"}
                                      color={"primary"}
                                      value={""}
                                      buttonsArr={[{ name: <Check />, value: "A" }, { name: <Close />, value: "B" }, { name: <BrowserNotSupportedOutlined />, value: "C" }]}
                                      onChangeEvent={handleToggleBtnClick}
                                    />
                                  </TableCell>
                                </TableRow>
                              </>
                            } />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusBasicTable
                            TableHead={[
                              { name: '' },
                              { name: '欄位A' },
                              { name: '欄位B' },
                              { name: '欄位C' },
                              { name: '欄位D' },
                              { name: '' },]}
                            TableBody={
                              <>
                                <TableRow hover onClick={handleClick}>
                                  <TableCell>
                                    <CusIconButton
                                      color="secondary"
                                      onClick={(e) => handleClickCollapse(e)}
                                      icon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />} />
                                  </TableCell>
                                  <TableCell>內容A</TableCell>
                                  <TableCell>內容B</TableCell>
                                  <TableCell>內容C</TableCell>
                                  <TableCell>內容D</TableCell>
                                  <TableCell style={{ textAlign: "right" }}>
                                    <CusIconButton
                                      color='secondary'
                                      icon={<Edit />}
                                    />
                                    <CusIconButton
                                      color='secondary'
                                      icon={<Delete />}
                                    />
                                  </TableCell>
                                </TableRow>
                                <CusTableCollapse
                                  status={isOpen}
                                  content={
                                    <>
                                      <CusInfoTitle
                                        label={"純標題"}
                                        content={
                                          <CusCardTable
                                            TableHead={[
                                              { name: '欄位A' },
                                              { name: '欄位B' },
                                              { name: '欄位C' },
                                              { name: '欄位D' },
                                              { name: '欄位E' },
                                            ]}
                                            TableBody={
                                              <>
                                                <TableRow hover onClick={handleClick}>
                                                  <TableCell>內容A</TableCell>
                                                  <TableCell>內容B</TableCell>
                                                  <TableCell>內容C</TableCell>
                                                  <TableCell>內容D</TableCell>
                                                  <TableCell>內容E</TableCell>
                                                </TableRow>
                                                <TableRow hover onClick={handleClick}>
                                                  <TableCell>內容A</TableCell>
                                                  <TableCell>內容B</TableCell>
                                                  <TableCell>內容C</TableCell>
                                                  <TableCell>內容D</TableCell>
                                                  <TableCell>內容E</TableCell>
                                                </TableRow>
                                              </>
                                            }
                                          />
                                        } />
                                    </>
                                  }
                                />
                              </>
                            } />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusCardTable
                            TableHead={[
                              { name: '欄位A' },
                              { name: '欄位B' },
                              { name: '欄位C' },
                              { name: '欄位D' },
                              { name: '欄位D' },
                            ]}
                            TableBody={
                              <>
                                <TableRow hover onClick={handleClick}>
                                  <TableCell>內容A</TableCell>
                                  <TableCell>內容B</TableCell>
                                  <TableCell>內容C</TableCell>
                                  <TableCell>內容D</TableCell>
                                  <TableCell>內容E</TableCell>
                                </TableRow>
                                <TableRow hover onClick={handleClick}>
                                  <TableCell>內容A</TableCell>
                                  <TableCell>內容B</TableCell>
                                  <TableCell>內容C</TableCell>
                                  <TableCell>內容D</TableCell>
                                  <TableCell>內容E</TableCell>
                                </TableRow>
                              </>
                            }
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"Card (樣式範例)"}
                    spacing={2}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"primary"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"secondary"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"info"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"success"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"warning"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusListCard title={"商品名稱"} title2={"12345678901234567890"} color={"error"} src={"https://picsum.photos/id/433/100/100"} data={["規格1: 白色", "規格2: XXL", "安全庫存: 100", "剩餘庫存: 50",]} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusHeaderCard title={"卡片標題"} content={""} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusHeaderCard title={"卡片標題"} content={""} button={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusSmallCard label1={"主題編號"} content1={"12345678901234567890"} label2={"狀態名稱"} content2={"狀態名稱"} color={"success"} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CusBarCodeCard label={"#1000001 好好吃牛肉 [大包-300g] [單一規格]"} barCodeId={["asdqwe123asd"]} />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Outlined Alert (樣式範例)"}
                    spacing={2}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={12} lg={12}>
                          <CusAlert
                            severity="success"
                            title={"Alert 標題內容"}
                            text={"Alert 文字內容"}
                          />
                          <CusAlert
                            severity="info"
                            title={"Alert 標題內容"}
                            text={"Alert 文字內容"}
                          />
                          <CusAlert
                            severity="warning"
                            title={"Alert 標題內容"}
                            text={"Alert 文字內容"}
                          />
                          <CusAlert
                            severity="error"
                            title={"Alert 標題內容"}
                            text={"Alert 文字內容"}
                          />
                          <CusAlert
                            severity="success"
                            text={"#1000001 好好吃牛肉 [大包-300g] [單一規格]"}
                            actionBtn={
                              <CusIconButton
                                color='error'
                                icon={<Backspace />}
                                onClick={handleClick}
                              />
                            }
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"TimeLineAlert (樣式範例)"}
                    spacing={2}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={12} lg={12}>
                          <CusTimeLineAlert
                            data={[
                              { title: "Alert 標題內容1", text: "Alert 文字內容1" },
                              { title: "Alert 標題內容2", text: "Alert 文字內容2" },
                              { title: "Alert 標題內容3", text: "Alert 文字內容3" },
                              { title: "Alert 標題內容4", text: "Alert 文字內容4" },
                              { title: "Alert 標題內容5", text: "Alert 文字內容5" },
                            ]}
                          />
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Contained Chip (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <Box style={{ marginBottom: "10px" }}>
                          <CusChip label={"Primary"} color={"primary"} />
                          <CusChip label={"Secondary"} color={"secondary"} />
                          <CusChip label={"Success"} color={"success"} />
                          <CusChip label={"Info"} color={"info"} />
                          <CusChip label={"Warning"} color={"warning"} />
                          <CusChip label={"Error"} color={"error"} />
                        </Box>
                        <Box>
                          <CusChip label={"Primary"} color={"primary"} size={"small"} />
                          <CusChip label={"Secondary"} color={"secondary"} size={"small"} />
                          <CusChip label={"Success"} color={"success"} size={"small"} />
                          <CusChip label={"Info"} color={"info"} size={"small"} />
                          <CusChip label={"Warning"} color={"warning"} size={"small"} />
                          <CusChip label={"Error"} color={"error"} size={"small"} />
                        </Box>
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Outlined Chip (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <Box style={{ marginBottom: "10px" }}>
                          <CusChip label={"Primary"} color={"primary"} variant={"outlined"} />
                          <CusChip label={"Secondary"} color={"secondary"} variant={"outlined"} />
                          <CusChip label={"Success"} color={"success"} variant={"outlined"} />
                          <CusChip label={"Info"} color={"info"} variant={"outlined"} />
                          <CusChip label={"Warning"} color={"warning"} variant={"outlined"} />
                          <CusChip label={"Error"} color={"error"} variant={"outlined"} />
                        </Box>
                        <Box>
                          <CusChip label={"Primary"} color={"primary"} size={"small"} variant={"outlined"} />
                          <CusChip label={"Secondary"} color={"secondary"} size={"small"} variant={"outlined"} />
                          <CusChip label={"Success"} color={"success"} size={"small"} variant={"outlined"} />
                          <CusChip label={"Info"} color={"info"} size={"small"} variant={"outlined"} />
                          <CusChip label={"Warning"} color={"warning"} size={"small"} variant={"outlined"} />
                          <CusChip label={"Error"} color={"error"} size={"small"} variant={"outlined"} />
                        </Box>
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Info Title (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusInfoTitle label={"純標題"} />
                        <CusInfoTitle
                          label={"標題與說明"}
                          info={true}
                          infoContent={
                            <React.Fragment>
                              <h2>ToolTip 什麼都能塞</h2>
                              <CusIconButton
                                color='secondary'
                                icon={<Add />}
                              />
                              <CusTextIconButton
                                color={"default"}
                                text={"新增"}
                                startIcon={<Add />}
                              />
                            </React.Fragment>
                          } />
                        <CusInfoTitle label={"標題與編輯按鈕"} buttonType={"edit"} />
                        <CusInfoTitle
                          label={"標題說明與編輯按鈕"}
                          info={true}
                          infoContent={
                            <React.Fragment>
                              <h2>ToolTip 什麼都能塞</h2>
                              <CusIconButton
                                color='secondary'
                                icon={<Add />}
                              />
                              <CusTextIconButton
                                color={"default"}
                                text={"新增"}
                                startIcon={<Add />}
                              />
                            </React.Fragment>
                          }
                          buttonType={"edit"} />
                        <CusInfoTitle label={"標題與儲存按鈕"} buttonType={"save"} save={handleSave} />
                        <CusInfoTitle label={"標題與連結按鈕"} buttonType={"link"} link={handleLink} />
                        <CusInfoTitle
                          label={"標題與客製按鈕"}
                          buttonType={"button"}
                          buttonGroup={[
                            { name: "新增", variant: "contained", color: "info", icon: <Add />, onClick: handleClick },
                            { name: "刪除", variant: "contained", color: "error", icon: <Add />, onClick: handleClick, disabled: true },
                          ]}
                        />
                        <CusInfoTitle
                          label={"標題與客製按鈕"}
                          info={true}
                          infoContent={
                            <React.Fragment>
                              <h2>ToolTip 什麼都能塞</h2>
                              <CusIconButton
                                color='secondary'
                                icon={<Add />}
                              />
                              <CusTextIconButton
                                color={"default"}
                                text={"新增"}
                                startIcon={<Add />}
                              />
                            </React.Fragment>
                          }
                          buttonType={"button"}
                          buttonGroup={[
                            { name: "新增", variant: "contained", color: "info", icon: <Add />, onClick: handleClick },
                            { name: "刪除", variant: "contained", color: "error", icon: <Add />, onClick: handleClick, disabled: true },
                          ]}
                          content={
                            <Grid item xs={12}>
                              <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", height: "100px" }}>
                                <span>任意組件</span>
                                <span>(示範用, 別真的拿來用)</span>
                              </Box>
                            </Grid>
                          }
                        />
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"Info Content (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusInfoTitle
                          label={"純標題"}
                          buttonType={"edit"}
                          status={edit}
                          edit={handleEdit}
                          save={handleSave}
                          content={
                            <Grid container spacing={2}>
                              <CusInfoContent
                                xs={12} md={6} lg={6}
                                label={"Text Field"}
                                value={"input內容"}
                                edit={edit}
                                input={
                                  <CusInput
                                    name={"Text Field"}
                                    label={"Text Field"}
                                    value={"input內容"}
                                    onChangeEvent={""}
                                  />
                                }
                              />
                              <CusInfoContent
                                xs={12} md={6} lg={6}
                                label={"Selector"}
                                value={"one"}
                                edit={edit}
                                input={
                                  <CusOutlinedSelect
                                    name={"Selector"}
                                    label={"Selector"}
                                    value={{ key: 1, name: "one" }}
                                    optionKey={"key"}
                                    options={[{ key: 1, name: "one" }, { key: 2, name: "two" },]}
                                    onChangeEvent={""}
                                  />
                                }
                              />
                              <CusInfoContent
                                xs={12} md={6} lg={6}
                                label={"Date picker"}
                                value={"2024/01/01"}
                                edit={edit}
                                input={
                                  <CusDatePicker
                                    name={"Date picker"}
                                    label={"Date picker"}
                                    views={["year", "month", "day"]}
                                    value={"20240101"}
                                    onChangeEvent={""}
                                  />
                                }
                              />
                              <CusInfoContent
                                xs={12} md={6} lg={6}
                                label={"Date time picker"}
                                value={"2024/01/01 23:12"}
                                edit={edit}
                                input={
                                  <CusDateTimePicker
                                    id={"date time picker"}
                                    name={"date-time-picker"}
                                    label={"date-time-picker"}
                                    value={"202401012312"}
                                    onChangeEvent={""}
                                  />
                                }
                              />
                            </Grid>
                          } />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"List (樣式範例)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusListButton name={"按鈕"} />
                        <CusListButton name={"第一欄"} primary={"第二欄"} secondary={"第三欄"} avatar={false} type={"button"} />
                        <List>
                          <CusListItem imgType={"text"} primary={"純文字"} secondary={"次要內容"} />
                          <CusListItem imgType={"icon"} icon={<Check />} primary={"圖標文字"} secondary={"次要內容"} />
                          <CusListItem imgType={"avatar"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"圖片文字"} secondary={"次要內容"} />
                          <CusListItem imgType={"avatar"} editType={"edit"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"編輯刪除"} secondary={"次要內容"} />
                          <CusListItem imgType={"avatar"} editType={"add"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"新增"} secondary={"次要內容"} />
                          <CusListItem imgType={"avatar"} editType={"content"} editContent={"也可放文字"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"文字置右"} secondary={"次要內容"} />
                          <CusListItemCollapse
                            editType={"collapse"}
                            primary={"按鈕清單"}
                            secondary={"次要內容"}
                            action={
                              <Box>
                                <CusTextButton
                                  color={"success"}
                                  text={"按鈕"}
                                  onClick={handleClick} />
                                <CusTextButton
                                  variant={"outlined"}
                                  color={"error"}
                                  text={"按鈕"}
                                  onClick={handleClick} />
                              </Box>
                            }
                            collapseContent={
                              <CusListItem imgType={"avatar"} editType={"add"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"新增"} secondary={"次要內容"} />
                            } />
                        </List>
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CusInfoTitle
                    label={"List (後台使用)"}
                    content={
                      <Grid item xs={12} md={12} lg={12}>
                        <CusListButton
                          name={"排序: 0"}
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ marginRight: "4px" }}>開放:</Box>
                              <CheckCircleOutline color={"success"} />
                            </Box>
                          }
                          secondary={"所有商品"}
                          avatar={false}
                          type={"button"} />
                        <CusListItemCollapse
                          editType={"collapse"}
                          primary={"按鈕清單"}
                          secondary={"次要內容"}
                          action={
                            <Box>
                              <CusTextButton
                                color={"success"}
                                text={"組合"}
                                onClick={handleClick} />
                              <CusTextButton
                                variant={"outlined"}
                                color={"error"}
                                text={"拆解"}
                                onClick={handleClick} />
                            </Box>
                          }
                          collapseContent={
                            <CusListItem imgType={"avatar"} primary={"商品名稱"} secondary={"商品編號 / 規格 / 規格"} editType={"content"} editContent={"庫存: 1個"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} />
                          } />
                        <CusListItem imgType={"avatar"} editType={"add"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"商品名稱"} secondary={"商品編號"} />
                        <CusListItem imgType={"avatar"} editType={"edit"} alt={"img"} src={"https://picsum.photos/id/433/100/100"} primary={"商品名稱"} secondary={"商品編號 / 規格 / 規格 / 數量: 1個"} />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
        </Grid>
      </TabPanel>
    </React.Fragment >
  )
};

const TabAnimation = (props) => {
  const { value, index } = props

  useEffect(() => {
    gsap.from(".box", { opacity: 0, duration: 1, y: -10 });
  }, []);
  return (
    <React.Fragment>
      <TabPanel value={value} index={index}>
        <Grid className="box" container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <CusCard spacing={2} content={
              <React.Fragment>
                <Grid item xs={12} md={12} lg={12}>
                  <CusInfoTitle
                    label={"Card Background"}
                    content={
                      <React.Fragment>
                        <Grid item xs={12} md={12} lg={12}>
                          {/* 在此放內容 */}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </React.Fragment>
            } />
          </Grid>
        </Grid>
      </TabPanel>
    </React.Fragment>
  )
}

const ApplePayTest = (props) => {
  const { value, index } = props

  return (
    <TabPanel value={value} index={index}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <p>Your browser doesn’t support Apple Pay on the web.
          To try this demo, open this page in Safari.</p>
        <ApplePay />
      </Box>
    </TabPanel>
  )
}
export default SystemStyle;