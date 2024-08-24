import React, { useState } from 'react';
import { NavLink } from "react-router-dom"
// mui
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Grid, Switch } from '@mui/material';
import { Menu as MenuIcon, AccountCircleRounded, SwapHoriz, OpenInNew } from '@mui/icons-material';
import { createTheme } from "@mui/material/styles";
import { CusThemeTS } from '../../CustomThemeTS';

import { get_ECC_indexedDB_factory } from '../../js/Function';
import { useSnackbar } from 'notistack';

const theme = createTheme(CusThemeTS.defaultTheme);

let colorMode = sessionStorage.getItem("themeStatus");
sessionStorage.setItem("themeStatus", colorMode)
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

/**
 * 使用者選單
 */
const UserMenu = (props) => {
    const UserName = sessionStorage.getItem("name");
    const PositionName = sessionStorage.getItem("position_name") ? sessionStorage.getItem("position_name") : "未綁定據點";
    const [anchorEl, setAnchorEl] = useState(null);
    const [colorState, setColorState] = useState(sessionStorage.getItem("themeStatus") === "LightON" ? true : false);

    // 提示框
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        props.onLogOut();
    }

    const handleChangeSystem = (code) => {
        sessionStorage.setItem("home_page", code)
        window.location.replace("/System/Index/Home")
    }

    const handleOpenWebSide = () => {
        let domain = window.location.origin;
        let url = domain + '/Index';
        window.open(url, '_blank')
    }


    const handleChangeColorMode = () => {
        let colorMode = sessionStorage.getItem("themeStatus")
        if (colorMode === "LightON") {
            sessionStorage.setItem("themeStatus", "LightOFF")
            setColorState(false)
            window.location.reload();
        } else {
            sessionStorage.setItem("themeStatus", "LightON")
            setColorState(true)
            window.location.reload();
        }
    }

    /**
     * @description 清除indexedDB
     */
    const clearIndexedDB = () => {
        get_ECC_indexedDB_factory().then(idb => {
            idb.clear("QueryCondition").then(res => {
                enqueueSnackbar(res.message, {
                    variant: res.success ? "success" : "error"
                });
                if (res.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            });
        });
    };

    const ItemList = () => {
        const home_page = sessionStorage.getItem("home_page")
        return props.groupData.map((ele, seq) => {
            if (home_page !== ele.code) {
                return (
                    <MenuItem key={seq} onClick={() => handleChangeSystem(ele.code)}>
                        <ListItemIcon>
                            <SwapHoriz fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>切換至{ele.name}</ListItemText>
                    </MenuItem>
                )
            } else return null
        })
    }

    return (
        <React.Fragment>
            <Button className={status === "LightON" ? "WebHeader__button WebHeader__userButton" : "WebHeader__button__dark WebHeader__userButton__dark"} startIcon={<AccountCircleRounded />} onClick={(e) => handleClick(e)}>
                <span>{/*{PositionName} - */}{UserName}</span>
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(e) => handleClose(e)} keepMounted
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                {ItemList()}
                {/* <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Switch
            checked={colorState}
            onChange={handleChangeColorMode}
            color="success" />
          <span>色彩模式：{colorState ? "Light" : "Dark"}</span>
        </Box> */}
                <Divider />
                <MenuItem onClick={() => handleOpenWebSide()}>
                    <ListItemIcon>
                        <OpenInNew fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>前往官網</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={clearIndexedDB}>清除暫存</MenuItem>
                {/* <MenuItem>帳號資訊</MenuItem> */}
                <MenuItem onClick={(e) => handleLogOut(e)}>登出</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

/**
 * 標頭工具列
 */
const SysNavigation = (props) => {
    const [isActive, setIsActive] = useState(false);

    const handleActiveClick = (name) => {
        sessionStorage.setItem("home_page", name)
        setIsActive(!isActive);
        window.location.replace("/System/Index/Home")
    }

    return (
        <React.Fragment>
            <AppBar className={"WebHeader"} open={props.open} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Grid container sx={{ p: 0 }} style={{ padding: 0, margin: 0 }}>
                    <Grid item xs={12}>
                        <Toolbar className={status === "LightON" ? "WebHeader__Toolbar" : "WebHeader__Toolbar__dark"} disableGutters>
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    className={status === "LightON" ? "WebHeader__button WebHeader__menuButton" : "WebHeader__button__dark WebHeader__menuButton__dark"}
                                    onClick={() => props.onSideBarOpen("left")}>
                                    <MenuIcon sx={{ fontSize: "1.7rem !important" }} />
                                </Button>
                            </Box>
                            <Typography variant="h5" className={"HeaderBar__logo"}
                                sx={{ color: theme.palette.default.contrastText, mr: "77.71px", ml: "20px" }}>
                                55688
                            </Typography>
                            <Box sx={{ paddingLeft: "10px", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {props.groupData.map((ele, inx) => (
                                    <NavLink key={inx} className={"main__link"} to={"/System/Index/Home"}
                                        selected={isActive} onClick={() => handleActiveClick(ele.code)}>
                                        <Button
                                            sx={{ marginRight: "1em" }}
                                            className={status === "LightON" ? "WebHeader__button" + (sessionStorage.getItem("home_page") === ele.code ? " active" : "") : "WebHeader__button__dark" + (sessionStorage.getItem("home_page") === ele.code ? " active" : "")}
                                        >
                                            <span>{ele.name}</span>
                                        </Button>
                                    </NavLink>
                                ))}
                            </Box>
                            <Box sx={{ paddingRight: "10px", flexGrow: 1, display: "flex", justifyContent: "right" }}>
                                <UserMenu onLogOut={props.onLogOut} groupData={props.groupData} />
                            </Box>
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </React.Fragment >
    )
}

export default SysNavigation;