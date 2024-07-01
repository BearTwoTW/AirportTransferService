import React, { useState, useCallback } from 'react';
import MD5 from 'crypto-js/md5';
// mui
import { Box, Grow, Grid, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { CusThemeTS } from './CustomThemeTS';
//Components
import { CusTextButton, CusTextIconButton } from '../src/components/CusButton';
import { CusInput } from '../src/components/CusInput';
import { CusCheckboxLabel } from '../src/components/CusCheckBox';
// api
import { DateTimeFormate } from '../src/js/Function';
import { UserControlAPI } from '../src/js/APITS';

import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';


const theme = createTheme(CusThemeTS.defaultTheme);
// TODO 判斷是否有資格進入系統登入頁，沒有資格就跳轉回網站，依據目前先用company_code
export default function SystemLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const [isGrow, setIsGrow] = useState({
    isLoggingIn: true,
    isPasswordForgotten: false
  });

  const [editData, setEditData] = useState({
    username: null,
    password: null,
    userEmail: null,
    rememberMe: "N"
  });

  const initDataCheck = { username: false, password: false, userEmail: false }
  const [editCheck, setEditCheck] = useState(initDataCheck)

  /**
   * input/checkbox Event
   */
  const edit_HandleInput = useCallback((e) => {
    const { name, value, checked, type } = e.target

    setEditData(prevData => ({
      ...prevData,
      [name]: type === "checkbox"
        ? checked
          ? "Y"
          : "N"
        : value
    }));
  })

  /**
   * 畫面轉換 Grow 啟動
   */
  const handleGrowClick = useCallback((e) => {
    e.preventDefault();
    const name = e.target.name
    setIsGrow(prevCheck => ({
      ...prevCheck,
      isLoggingIn: name === "LogIn" ? !prevCheck.isLoggingIn : prevCheck.isPasswordForgotten,
      isPasswordForgotten: name === "LogIn" ? !prevCheck.isPasswordForgotten : prevCheck.isLoggingIn
    }));
  }, []);

  /**
   * 登入
   */
  const handleLogIn = async () => {
    if (!editData.username || !editData.password) {
      setEditCheck({
        ...editCheck,
        username: !editData.username ? true : false,
        password: !editData.password ? true : false
      });
    } else {
      setEditCheck(initDataCheck);

      UserControlAPI.LogIn({
        username: editData.username,
        password: MD5(editData.password).toString(),
        device_type: 'WEB',
        device_code: localStorage.device_code ? localStorage.device_code :
          DateTimeFormate.DateTimeToString({ date: null, Mode: "yyyyMMddHHmmss", joinDate: "", joinTime: "", space: "" })
      }).then(res => {
        if (res.success) {
          sessionStorage.company_code = res.data.company_code;
          sessionStorage.home_page = res.data.home_page;
          sessionStorage.name = res.data.name;
          sessionStorage.token = res.data.token;
          sessionStorage.user_id = res.data.user_id;
          sessionStorage.sidebarOpen = "Y";
          sessionStorage.themeStatus = "LightON";
          localStorage.JsBarcodeArr = [];
          window.location.replace("/System/Index/Home")
        } else {
          console.error(res)
          enqueueSnackbar(res.message, {
            variant: "warning",
            persist: true
          });
        }
      });
    }
  };

  const handleSendPwd = () => {
    if (!editData.username || !editData.userEmail) {
      setEditCheck({
        ...editCheck,
        username: !editData.username ? true : false,
        userEmail: !editData.userEmail ? true : false
      });
    } else {
      setEditCheck(initDataCheck);
      // alert('施工中，還沒串');
      console.log('not yet');
    }
  }

  /**
   * 進入官網
   */
  const handleOfficialWebsite = useCallback(() => {
    window.open("https://www.genesys-tech.com/")
  });

  /**
   * 登入畫面
   */
  const LogInFrom = (
    <Grid item xs={12} md={12} lg={12} justifyContent="center" alignItems="center"
      sx={{
        display: {
          height: "100%",
          width: "100%",
          xs: isGrow.isLoggingIn ? "flex" : "none",
          md: isGrow.isLoggingIn ? "flex" : "none",
          lg: isGrow.isLoggingIn ? "flex" : "none"
        }
      }}>
      <Grid container sx={{ padding: { xs: '1.5rem', md: '2.5rem' } }}>
        <Grid item xs={12}><h1>登入帳戶</h1></Grid>
        <Grid item xs={12}>
          <CusInput
            id={"add--username"}
            label={"使用者帳號"}
            size={"Normal"}
            name={"username"}
            type={"text"}
            required={true}
            error={editCheck.username}
            value={editData.username}
            onChangeEvent={(e) => edit_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <CusInput
            id={"add--password"}
            label={"使用者密碼"}
            size={"Normal"}
            name={"password"}
            type={"password"}
            required={true}
            error={editCheck.password}
            value={editData.password}
            onChangeEvent={(e) => edit_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12} className={"alignMiddle"}>
          <CusCheckboxLabel
            label={"記住我的登入狀態"}
            name={"rememberMe"}
            type={"checkbox"}
            color={"primary"}
            value={editData.rememberMe}
            onChangeEvent={(e) => edit_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <CusTextIconButton
            style={{ width: "100%", margin: "0" }}
            color={"primary"}
            text={"登入"}
            size={"large"}
            startIcon={<LoginIcon />}
            onClick={(e) => handleLogIn(e)} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <Typography component="a" href={""} name={"LogIn"} sx={{ margin: '1rem 0', cursor: 'pointer', color: "#343434", textDecoration: "none" }} onClick={(e) => handleGrowClick(e)}>
            忘記密碼 ?
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  /**
   * 忘記密碼畫面
   */
  const PasswordForgottenFrom = (
    <Grid item xs={12} md={12} lg={12} justifyContent="center" alignItems="center"
      sx={{
        display: {
          height: "100%",
          width: "100%",
          xs: isGrow.isPasswordForgotten ? "flex" : "none",
          md: isGrow.isPasswordForgotten ? "flex" : "none",
          lg: isGrow.isPasswordForgotten ? "flex" : "none"
        }
      }}>
      <Grid container sx={{ padding: { xs: '1.5rem', md: '2.5rem' } }}>
        <Grid item xs={12}><h1>忘記密碼</h1></Grid>
        <Grid item xs={12}>
          <CusInput
            color={"secondary"}
            label={"使用者帳號"}
            size={"Normal"}
            name={"username"}
            type={"text"}
            required={true}
            error={editCheck.username}
            value={editData.username}
            onChangeEvent={(e) => edit_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <CusInput
            color={"secondary"}
            label={"使用者信箱"}
            size={"Normal"}
            name={"userEmail"}
            type={"text"}
            required={true}
            error={editCheck.userEmail}
            value={editData.userEmail}
            onChangeEvent={(e) => edit_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <CusTextIconButton
            color={"secondary"}
            text={"寄送密碼"}
            size={"large"}
            startIcon={<EmailIcon />}
            onClick={(e) => handleSendPwd(e)}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <Typography component="a" href={""} name={"PasswordForgotten"} sx={{ margin: '1rem 0', cursor: 'pointer', color: "#343434", textDecoration: "none" }} onClick={(e) => handleGrowClick(e)}>
            再次登入
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  /**
   * 登入畫面=>聯絡我
   */
  const DarkLayout = (
    <Grid item xs={12} md={12} lg={12} justifyContent="center" alignItems="center"
      sx={{
        height: "100%",
        display: {
          xs: 'none',
          md: 'none',
          lg: isGrow.isLoggingIn ? "flex" : "none"
        }
      }}>
      <Box sx={{ textAlign: "center" }}>
        <h1 style={{ color: "black" }}>聯絡我們</h1>
        <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>有任何疑問嗎？歡迎與我們聯繫</p>
        <CusTextButton
          fullWidth={false}
          color={"default"}
          text={"進入官網"}
          size={"large"}
          onClick={handleOfficialWebsite} />
      </Box>
    </Grid>
  );

  /**
   * 忘記密碼畫面=>聯絡我
   */
  const LightLayout = (
    <Grid item xs={12} md={12} lg={12} justifyContent="center" alignItems="center"
      sx={{
        height: "100%",
        display: {
          xs: 'none',
          md: 'none',
          lg: isGrow.isPasswordForgotten ? "flex" : "none"
        }
      }}>
      <Box sx={{ textAlign: "center" }}>
        <h1 style={{ color: "#343434" }}>聯絡我們</h1>
        <p style={{ color: "rgba(52, 52, 52, 0.6)" }}>有任何疑問嗎？歡迎與我們聯繫</p>
        <CusTextButton
          fullWidth={false}
          color={"default"}
          text={"進入官網"}
          size={"large"}
          onClick={handleOfficialWebsite} />
      </Box>
    </Grid>
  );

  return (
    <React.Fragment>
      <Box className={"middle"}
        sx={{
          height: "100vh",
          width: "100vw",
          position: "relative"
        }}>
        <Box style={{
          position: "absolute",
          top: "0",
          left: "0",
          height: "100vh",
          width: "100vw",
          backgroundColor: theme.palette.default.main
          // backgroundColor: "#f5f5f5"
          //width: "50vw",
        }} />
        <Box className={"middle"}
          sx={{
            height: "80vh",
            width: {
              xs: "70vw",
              md: "70vw",
              lg: "35vw",
            },
            overflow: 'hidden',
            backgroundColor: "white",
            borderRadius: {
              xs: "50px",
              md: "50px",
              lg: isGrow.isPasswordForgotten ? "50px" : "50px 0px 0px 50px",
            },
            zIndex: 1,
          }} >
          <Grid container sx={{ p: 0, height: "80vh", width: "70vw" }} >
            <Grow timeout={800} in={isGrow.isLoggingIn}>
              {LogInFrom}
            </Grow>
            <Grow timeout={800} in={isGrow.isPasswordForgotten}>
              {PasswordForgottenFrom}
            </Grow>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "80vh",
            width: "35vw",
            overflow: 'hidden',
            backgroundColor: "white",
            borderLeft: "1px solid #f5f5f5",
            borderRadius: "0 50px 50px 0",
            zIndex: 1,
            display: {
              xs: "none",
              md: "none",
              lg: isGrow.isPasswordForgotten ? "none" : "flex"
            }
          }}>
          <Grid container sx={{ p: 0, height: "80vh", width: "70vw" }}>
            <Grow timeout={800} in={isGrow.isLoggingIn}>
              {DarkLayout}
            </Grow >
            <Grow timeout={800} in={isGrow.isPasswordForgotten}>
              {LightLayout}
            </Grow >
          </Grid>
        </Box>
      </Box>
    </React.Fragment >
  );
};