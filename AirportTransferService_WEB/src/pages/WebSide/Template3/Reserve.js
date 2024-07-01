import React, { useRef, useState, useContext, forwardRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Tabs, Tab, Typography, TextField, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import "moment/locale/zh-tw";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocationOnOutlined, LocationOn, CalendarMonth, PeopleAltOutlined, DirectionsCar, Add, EditNote } from '@mui/icons-material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Outlet, Link, NavLink, Navigate } from 'react-router-dom'
import { WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { CustomerAPI } from "../../../js/APITS";
import { WebDialog3 } from "../../../components/WebSide/WebDialog";
import { localStorageClear } from "../../../js/Function";
import { OfficeSiteContext } from '../../../store/OfficeSiteContext'

export default function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialType = query.get('type') || '0';

  // Tabs 狀態
  // 將 'type' 參數轉換為 tab 的 index
  const tabMapping = {
    'go': 0,
    'leave': 1,
  };
  const initialTab = tabMapping[initialType];
  const [value, setValue] = React.useState(initialTab);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);

  // checkbox 狀態
  const [checkboxState, setCheckboxState] = useState({
    placard: false,
    safety: false,
    sameDetail: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState({
      ...checkboxState,
      [name]: checked,
    });
  };

  // 日期選擇器語系設定
  moment.updateLocale("zh-tw", {
    weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
    week: { dow: 0 }
  });

  useEffect(() => {
    setValue(initialTab);
  }, [initialTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/Reserve?type=${Object.keys(tabMapping)[newValue]}`);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className="p-5">
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
  ]

  return (
    <React.Fragment>
      <Box className="container mx-auto">
        <Box className="mt-40 mb-40 border rounded-lg">
          <Box>
            <Tabs
              sx={{
                paddingTop: "20px",
                margin: "0 20px",
                borderBottom: "1px solid #e0e0e0",
              }}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              allowScrollButtonsMobile
              aria-label="scrollable force tabs">
              <Tab label={"預約送機/前往機場"} icon={<FlightTakeoffIcon />} aria-controls={`simple-tab-go`} />
              <Tab label={"預約接機/離開機場"} icon={<FlightLandIcon />} aria-controls={`simple-tab-leave`} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container className="space-y-2.5">
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <LocationOnOutlined color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">上車地點</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="city" label="城市" placeholder="請選擇城市" />}
                      />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="area" label="行政區" placeholder="請選擇行政區" />}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="road_name" label="路名" placeholder="請填寫路名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="road_section" label="路段" placeholder="請填寫路段" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="alleys_number" label="巷弄與門牌號碼" placeholder="請填寫巷弄與門牌號碼" variant="outlined" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <LocationOn color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">下車地點</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="location" label="目的地" placeholder="請選擇目的地" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <CalendarMonth color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="flight_number" label="航班號碼" placeholder="請填寫航班號碼" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label="乘車日期"
                          value={date}
                          format='YYYY/MM/DD'
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              required: true,
                            },
                          }}
                          renderInput={(params) => <TextField id="date" {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                          label="乘車時間"
                          value={time}
                          onChange={(newValue) => {
                            setTime(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              required: true,
                            },
                          }}
                          renderInput={(params) => <TextField id="time" {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <PeopleAltOutlined color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">人數及行李</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="people_count" label="人數" placeholder="請選擇人數" />}
                      />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="luggage_count" label="行李數" placeholder="請選擇行李數" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <DirectionsCar color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">車型</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="car_model" label="車型" placeholder="請選擇車型" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <Add color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">加價服務</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="placard" checked={checkboxState.placard} onChange={handleCheckboxChange} />}
                          label="接機舉牌 (+$200)"
                        />
                      </FormGroup>
                    </Grid>
                    {checkboxState.placard ?
                      <React.Fragment>
                        <Grid item lg={12} sm={12} xs={12}>
                          <TextField fullWidth id="placard_title" label="舉牌標題" placeholder="請填寫舉牌標題" variant="outlined" />
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                          <TextField fullWidth id="placard_content" label="舉牌內容" placeholder="請填寫舉牌內容" variant="outlined" multiline rows={4} />
                        </Grid>
                      </React.Fragment>
                      : null}
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="safety" checked={checkboxState.safety} onChange={handleCheckboxChange} />}
                          label="加購兒童安全座椅及增高墊 (+$200)"
                        />
                      </FormGroup>
                    </Grid>
                    {checkboxState.safety ?
                      <React.Fragment>
                        <Grid item lg={4} sm={4} xs={12}>
                          <Autocomplete
                            disablePortal
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} id="seat" label="兒童安全座椅0~4歲(+$200)" placeholder="請選擇服務" />}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <Autocomplete
                            disablePortal
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} id="mat" label="兒童增高墊4~12歲(+$200)" placeholder="請選擇服務" />}
                          />
                        </Grid>
                      </React.Fragment>
                      : null}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <EditNote color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">填寫基本資料</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_name" label="訂購人姓名" placeholder="請填寫訂購人姓名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_phone" label="訂購人電話" placeholder="請填寫訂購人電話" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_email" label="訂購人E-mail" placeholder="請填寫訂購人E-mail" variant="outlined" />
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="sameDetail" checked={checkboxState.sameDetail} onChange={handleCheckboxChange} />}
                          label="乘客同訂購人"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_name" label="乘客姓名" placeholder="請填寫乘客姓名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_phone" label="乘客電話" placeholder="請填寫乘客電話" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_email" label="乘客E-mail" placeholder="請填寫乘客E-mail" variant="outlined" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container className="space-y-2.5">
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <LocationOnOutlined color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">上車地點</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="city" label="上車地點" placeholder="請選擇上車地點" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <LocationOn color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">下車地點</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="city" label="城市" placeholder="請選擇城市" />}
                      />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="area" label="行政區" placeholder="請選擇行政區" />}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="road_name" label="路名" placeholder="請填寫路名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="road_section" label="路段" placeholder="請填寫路段" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="alleys_number" label="巷弄與門牌號碼" placeholder="請填寫巷弄與門牌號碼" variant="outlined" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <CalendarMonth color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">預約乘車日期及時間</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label="乘車日期"
                          value={date}
                          format='YYYY/MM/DD'
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              required: true,
                            },
                          }}
                          renderInput={(params) => <TextField id="date" {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="flight_number" label="航班號碼" placeholder="請填寫航班號碼" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                          label="航班抵達時間"
                          value={time}
                          onChange={(newValue) => {
                            setTime(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              required: true,
                            },
                          }}
                          renderInput={(params) => <TextField id="time" {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <PeopleAltOutlined color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">人數及行李</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="people_count" label="人數" placeholder="請選擇人數" />}
                      />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="luggage_count" label="行李數" placeholder="請選擇行李數" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <DirectionsCar color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">車型</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={top100Films}
                        renderInput={(params) => <TextField required {...params} id="car_model" label="車型" placeholder="請選擇車型" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <Add color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">加價服務</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="placard" checked={checkboxState.placard} onChange={handleCheckboxChange} />}
                          label="接機舉牌 (+$200)"
                        />
                      </FormGroup>
                    </Grid>
                    {checkboxState.placard ?
                      <React.Fragment>
                        <Grid item lg={12} sm={12} xs={12}>
                          <TextField fullWidth id="placard_title" label="舉牌標題" placeholder="請填寫舉牌標題" variant="outlined" />
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                          <TextField fullWidth id="placard_content" label="舉牌內容" placeholder="請填寫舉牌內容" variant="outlined" multiline rows={4} />
                        </Grid>
                      </React.Fragment>
                      : null}
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="safety" checked={checkboxState.safety} onChange={handleCheckboxChange} />}
                          label="加購兒童安全座椅及增高墊 (+$200)"
                        />
                      </FormGroup>
                    </Grid>
                    {checkboxState.safety ?
                      <React.Fragment>
                        <Grid item lg={4} sm={4} xs={12}>
                          <Autocomplete
                            disablePortal
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} id="seat" label="兒童安全座椅0~4歲(+$200)" placeholder="請選擇服務" />}
                          />
                        </Grid>
                        <Grid item lg={4} sm={4} xs={12}>
                          <Autocomplete
                            disablePortal
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} id="mat" label="兒童增高墊4~12歲(+$200)" placeholder="請選擇服務" />}
                          />
                        </Grid>
                      </React.Fragment>
                      : null}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="space-y-1">
                  <Box className="flex items-center border-b pb-2.5 gap-2">
                    <EditNote color={"secondary"} />
                    <Typography color="secondary" fontWeight="bold">填寫基本資料</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_name" label="訂購人姓名" placeholder="請填寫訂購人姓名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_phone" label="訂購人電話" placeholder="請填寫訂購人電話" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_email" label="訂購人E-mail" placeholder="請填寫訂購人E-mail" variant="outlined" />
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked name="sameDetail" checked={checkboxState.sameDetail} onChange={handleCheckboxChange} />}
                          label="乘客同訂購人"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_name" label="乘客姓名" placeholder="請填寫乘客姓名" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_phone" label="乘客電話" placeholder="請填寫乘客電話" variant="outlined" />
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                      <TextField required fullWidth id="order_email" label="乘客E-mail" placeholder="請填寫乘客E-mail" variant="outlined" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </React.Fragment>
  )
};