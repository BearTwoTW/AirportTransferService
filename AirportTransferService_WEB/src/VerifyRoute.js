import React, { useRef, lazy, useState, useEffect, Suspense, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider, IconButton } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Close } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { CusThemeTS } from './CustomThemeTS';

// import HomePage from "./pages/WebSide/Home";
// import AllMeetupsPage from "./pages/WebSide/Login";
// import NewMeetupsPage from "./pages/WebSide/Emphasize";
// import FavoritesPage from "./pages/WebSide/Favorites";

import { GetPermission } from './js/Function';
import { CheckLogIn, CustomCheckLogIn } from './js/Domain';
import { LinearLoading } from "./components/CusProgress";
// import { WedSideTemplatePages } from "./js/Api";
import { WedSideTemplatePages } from "./js/WebRoute";

// TODO: 之後組件化完成，這個判斷要拿掉
import { isTest } from "./js/DomainTS.ts";

const WebWrap = lazy(() => import('./WebWrap'));
const SystemLogin = lazy(() => import('./SystemLogin'));
const SystemWrap = lazy(() => import('./SystemWrap'));
const NotFoundPage = lazy(() => import('./NotFound'));
const theme = createTheme(CusThemeTS.defaultTheme);
const homepage = sessionStorage.home_page;

/**
 * Route驗證
 * custom/admin
 */
const VerifyRoute = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const notistackRef = useRef();
  const [resData, setResData] = useState({ routeData: [], groupData: [] });
  const [routes, setRoutes] = useState([]);
  const [WebSideRoutes, setWebSideRoutes] = useState([]);
  const [WebSideDY, setWebSideDY] = useState([]);

  /** 系統後台 巢狀 Routes */
  const NestedRoutes = () => {
    useEffect(() => {
      const calculatedRoutes = [];
      for (const item of resData.routeData) {
        for (const child of item.children) {
          const FirstPath = `${item.code}/${child.code}`;
          const FirstElement = lazy(() => import(`./pages/System/${homepage}/${FirstPath}`));
          calculatedRoutes.push(
            <React.Fragment key={`${item.code}-${child.code}`}>
              <Route
                key={child.page_id}
                path={FirstPath}
                element={<FirstElement />} />
              {child.children.length > 0 ? child.children.map((elem) => {
                if (elem.code.length > 0) {
                  const secondPath = `${FirstPath}/${elem.code}`;
                  const SecondElement = lazy(() => import(`./pages/System/${homepage}/${item.code}/${elem.code}`));
                  return (
                    <Route
                      key={`${item.code}-${child.code}-${elem.code}`}
                      path={secondPath}
                      element={<SecondElement />} />
                  );
                } else return null;
              }) : null}
            </React.Fragment>
          );
        }
      }
      setRoutes(calculatedRoutes);
    }, [resData, homepage]);
    return routes;
  };

  /** 官網版面-3 巢狀 Routes */
  const WebSideTemplateRoutes = () => {
    useEffect(() => {
      let TemplateArr = WedSideTemplatePages.TemplatePagesArr3;
      let routes = TemplateArr.map(item => {
        if (item.value === "Y") {
          const ItemElement = lazy(() => import(`./pages/WebSide/Template3/${item.pathName}`));
          return (
            <Route
              key={item.pathName}
              path={item.pathName}
              element={<ItemElement />}
            >
              {
                item.children.length > 0
                  ? item.children.map((child) => {
                    if (child.value === "Y") {
                      const ChildElement = lazy(() => import(`./pages/WebSide/Template3/${child.pathName}`));
                      return (
                        <Route
                          key={child.pathName}
                          path={child.pathName}
                          element={<ChildElement />}
                        />
                      )
                    }
                  })
                  : null
              }
            </Route>
          )
        }
      });

      setWebSideRoutes(routes);
    }, []);

    return WebSideRoutes;
  };

  /** 組件化嘗試版本 */
  const WebSideTemplateRoutesDY = () => {
    useEffect(() => {
      const tempArr = WedSideTemplatePages.Template;
      const pageRoutes = tempArr.map((item) => {
        if (item.value === "Y") {
          const ItemElement = lazy(() => import(`./pages/WebSide/Template/${item.path}/${item.page}`));
          return (
            <Route
              key={item.page}
              path={item.path}
              element={<ItemElement />}
            >
              {
                item.children.length > 0
                  ? item.children.map((child) => {
                    if (child.value === "Y") {
                      const ChildElement = lazy(() => import(`./pages/WebSide/Template/${child.page}`));
                      return (
                        <Route
                          key={child.page}
                          path={child.path}
                          element={<ChildElement />}
                        />
                      )
                    }
                  })
                  : null
              }
            </Route>
          );
        }
      });

      setWebSideDY(pageRoutes);
    }, []);

    return WebSideDY;
  };

  /** 後臺check檢查 */
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    if (currentPath.indexOf('system') !== -1) {
      CheckLogIn().then(res => {
        if (res.success) {
          sessionStorage.setItem("position_name", res.data.position_name);
          sessionStorage.setItem("Plant", res.data.Plant);

          GetPermission(res.data.path).then(r => {
            const authorityItem = r.filter((item) => item.name === homepage);
            const sideBarItem = authorityItem[0].children.filter((item) => item.name === 'sidebar');
            const groupMenuItem = authorityItem[0].children.filter((item) => item.name === 'nav');
            setResData((prevData) => ({
              ...prevData,
              routeData: sideBarItem[0].children,
              groupData: groupMenuItem[0].children
            }));
            if (currentPath.indexOf('login') !== -1) {
              navigate(`/System/Index/Home`);
            }
          })
        } else {
          navigate('/System/Login');
        }
      });
    }
  }, [homepage])

  /** 官網check檢查 */
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    if (currentPath.indexOf("system") === -1) {
      CustomCheckLogIn().then(res => {
        if (res.success) {
          localStorage.setItem("cus_token", res.data.token);
        }
      });
    }
  }, [location.pathname]);

  /**
   * 關閉 Snackbar
   */
  const handleClose = useCallback((key) => {
    notistackRef.current.closeSnackbar(key);
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          autoHideDuration={5000} //多久會消失，不給就會用預設的
          anchorOrigin={{
            vertical: 'bottom', // 垂直位置
            horizontal: 'right', // 水平位置
          }}
          action={(key) => ( // Snackbar 功能按鈕
            <IconButton
              onClick={() => handleClose(key)} >
              <Close style={{ color: "#fff" }} />
            </IconButton>
          )}>
          <Suspense fallback={<LinearLoading />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<WebWrap />}>
                {WebSideTemplateRoutes()}
              </Route>
              {isTest
                ? <Route path="/ddd" element={<WebWrap />}>
                  {WebSideTemplateRoutesDY()}
                </Route>
                : null}
              <Route path="/System/Login" element={<SystemLogin />} />
              <Route path="System" element={<SystemWrap routeData={resData.routeData} groupData={resData.groupData} />}>
                {NestedRoutes()}
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default VerifyRoute;

/** 換頁時跳到最上面 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};