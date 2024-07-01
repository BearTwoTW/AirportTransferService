import React, { Suspense } from 'react';
import { LinearLoading } from "./components/CusProgress";
import { WebSwipeableSideBar3 } from "./components/WebSide/WebSiderBar";
import './scss/WebSide/output.css';
import './scss/WebSide/input.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CusThemeTS } from './CustomThemeTS';
import { OfficeSiteContextProvider } from './store/OfficeSiteContext';

const theme = createTheme(CusThemeTS.webTheme);

const WebWrap = () => {

  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LinearLoading />}>
            <OfficeSiteContextProvider>
              <WebSwipeableSideBar3 />
            </OfficeSiteContextProvider>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default WebWrap;
