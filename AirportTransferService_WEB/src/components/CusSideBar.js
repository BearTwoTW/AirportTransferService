import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom"
//mui
import { Box, Drawer, List, Divider, ListItemButton, ListItemIcon, ListItemText, Collapse, CssBaseline, Toolbar, Backdrop, Typography, Grid } from '@mui/material';
import { Inbox, Mail, ExpandLess, ExpandMore, ElevenMpOutlined } from '@mui/icons-material';
import { createTheme } from "@mui/material/styles";
import { CusThemeTS } from '../CustomThemeTS';
//component
import SysNavigation from '../components/System/SysNavigation';
import { Copyright } from '../components/System/SysFooter';
import { CusBasicBreadcrumbs } from '../components/CusBreadcrumbs';
//api
import { UserControlAPI } from '../js/APITS';

//Test
import ErrorBoundary from '../ErrorBoundary';

import { get_ECC_indexedDB_factory } from '../../src/js/Function';

//color
import Variables from "../../src/scss/App.css";
const theme = createTheme(CusThemeTS.defaultTheme);
const drawerWidth = parseInt(theme.components.MuiDrawer.styleOverrides.root[`&.SystemDrawer`].width);
const navBarHeight = theme.navBar.height.toString() + "px";
const minusOutletHeight = (theme.navBar.height + theme.footer.height).toString() + "px";

const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

/**
 * System 用 Sidebar
 * @param 
 * @desc 低於Nav一層，會擠壓main
 */
export const CusPersistentSideBar = (props) => {
  const defaultAnchor = "left"
  const location = useLocation();
  const [PagesOpenIndex, setPagesOpenIndex] = useState(-1);
  const [state, setState] = useState({ left: (sessionStorage.sidebarOpen === "Y" ? true : false) });
  const [isLocation, setIsLocation] = useState(location.pathname.split("/")[3])

  // Collapse 更新他自己的open state
  const handleCollapseClick = (index, data) => {
    if (data) {
      if (data.length > 0) setIsLocation(data[0].code);
      else alert("查無頁面");
    }
    setPagesOpenIndex(PagesOpenIndex === index ? -1 : index);

  };

  // 登出
  const handleLogOut = () => {
    UserControlAPI.LogOut({}).then((res) => {
      // 登出後清掉indexedDB
      get_ECC_indexedDB_factory().then(idb => {
        idb.deleteIndexedDB("ATS");
      });

      sessionStorage.clear();
      window.location.replace("/System/Login")
    });
  }

  const handleSidebarOpen = (anchor, bool = false) => {
    setState(prev => {
      sessionStorage.sidebarOpen = bool ? "Y" : prev[anchor] ? "N" : "Y"
      return ({ ...prev, [anchor]: (bool ? bool : !prev[anchor]) })
    })
  }

  const handleSidebarClose = (anchor, bool = false) => {
    setState(prev => {
      sessionStorage.sidebarOpen = bool ? "Y" : prev[anchor] ? "N" : "Y"
      return ({ ...prev, [anchor]: (bool ? bool : !prev[anchor]) })
    })
  }

  const listItemButtonSX = {
    color: Variables[status + "__DefaultContrastText"],
    paddingTop: '12px',
    paddingBottom: '12px',
    borderRadius: "15px",
    [`&:hover`]: {
      transition: "box-shadow .5s",
    },
    [`&.Mui-selected`]: {
      color: Variables[status + "__Secondary"],
    },
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SysNavigation open={state[defaultAnchor]}
          onSideBarOpen={(anchor) => handleSidebarOpen(anchor)}
          onLogOut={(e) => handleLogOut(e)}
          groupData={props.groupData} />
        <Drawer
          className={"SystemDrawer"}
          transitionDuration={{ enter: 500, exit: 300 }}
          variant="persistent"
          anchor={defaultAnchor}
          open={state[defaultAnchor]}>
          <Toolbar sx={{ height: navBarHeight }} />
          {/* <PagesListItem anchor={defaultAnchor} /> */}
          <Box sx={{
            width: drawerWidth,
            height: '90vh', // 根據需要調整高度
            overflow: 'scroll', // 保留捲動功能
            overflow: 'auto',
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-corner': {
              background: 'transparent',
            },
            '& .scroll-content': {
              paddingRight: '30px', // 防止內容被捲動條覆蓋
              boxSizing: 'content-box',
            },
          }}
            role="presentation" onClick={() => handleSidebarOpen(defaultAnchor, true)}>
            <Box id="sidebar" sx={{ overflow: "auto" }}>
              {props.routeData.map((item, index) => {
                if (item.children.length > 1) {
                  let isOpenCollapse = item.children.some((ele) => ele.code === isLocation)
                  return (
                    <List sx={{ margin: ".8em 1em", padding: 0, }} key={item.pg_id}>
                      <ListItemButton sx={listItemButtonSX} onClick={() => handleCollapseClick(item.pg_id)}>
                        <ListItemText primary={item.name} />
                        {item.children.length > 1 ?
                          isOpenCollapse ?
                            <ExpandLess /> : PagesOpenIndex === item.pg_id ?
                              <ExpandLess /> : <ExpandMore /> : null}
                      </ListItemButton>
                      <Collapse in={isOpenCollapse ? true : PagesOpenIndex === item.pg_id} timeout="auto" unmountOnExit>
                        {item.children.map((child, seq) => {
                          // if (child.children.length === 0) return null;
                          return (
                            <List sx={{ margin: ".8em 1em", padding: 0, }} key={child.page_id} component="div" disablePadding>
                              <Link className={"main__link"}
                                to={`${item.code}/${child.code}`}
                                style={{ color: theme.sidebar.textColor }}>
                                <ListItemButton sx={listItemButtonSX}
                                  selected={child.code === isLocation ? true : false}
                                  onClick={() => setIsLocation(child.code)}>
                                  <ListItemText primary={child.name} />
                                </ListItemButton>
                              </Link>
                            </List>
                          )
                        })}
                      </Collapse>
                    </List>
                  )
                } else {
                  return (
                    <List sx={{ margin: ".8em 1em", padding: 0 }} key={item.pg_id}>
                      <Link className={"main__link"}
                        to={item.children.length > 0 ? `${item.code}/${item.children[0].code}` : null}
                        style={{ color: theme.sidebar.textColor }} >
                        <ListItemButton
                          sx={listItemButtonSX}
                          onClick={() => handleCollapseClick(index, item.children)}
                          selected={item.children.length > 0 ? item.children[0].code === isLocation ? true : false : false}>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </Link>
                    </List>
                  )
                }
              })}
            </Box>
          </Box>
        </Drawer>
        <Box className={"main__container"} component="main"
          open={state[defaultAnchor]}
          sx={{
            width: "calc(100vw - " + drawerWidth + "px)",
            flexGrow: 1,
            marginLeft: {
              xs: `-${drawerWidth}px`,
              sm: state[defaultAnchor] ? "0px" : `-${drawerWidth}px`
            },
            transition: "all .45s ease",
          }}>
          <Backdrop
            sx={{
              display: { sm: "none" },
              color: '#fff',
              zIndex: "10"
            }}
            open={state[defaultAnchor]}
            onClick={() => handleSidebarClose(defaultAnchor, false)}>
          </Backdrop>
          <CusBasicBreadcrumbs routeData={props.routeData} />
          <Box className={"main__outlet"}
            sx={{
              backgroundColor: theme.outlet.backgroundColor,
              height: "calc(100vh - " + minusOutletHeight + ")"
            }}>
            <Box sx={{
              backgroundColor: theme.outlet.secBackgroundColor,
              padding: "1rem"
            }}>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </Box>
          </Box>
          <Copyright />
        </Box>
      </Box>
    </React.Fragment >
  )
}
