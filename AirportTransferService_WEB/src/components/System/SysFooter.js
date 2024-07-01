import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { CusThemeTS } from '../../CustomThemeTS';

const theme = createTheme(CusThemeTS.defaultTheme);
/**
 * 版權宣告
 */
const Copyright = () => {
  const [version, setVersion] = useState('1.2.4');
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <Grid container sx={{
      position: 'absolute',
      bottom: 0,
      height: '30px',
      alignItems: "center",
      background: theme.footer.backgroundColor
    }}>
      <Grid item xs={8} md={8} sx={{
        pr: 1,
        pl: 1,
        justifyContent: "start",
        display: { xs: "none", md: "flex" },
      }}>
        <Typography sx={{ color: theme.palette.primary.dark }}>
          <span>{"Copyright © " + year + " "}</span>
          <a target="_blank" href="https://www.genesys-tech.com/" style={{ color: theme.palette.primary.dark }}>Genesys Technology Ltd.</a> All rights reserved.
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} sx={{
        pr: 1,
        pl: 1,
        justifyContent: { xs: "center", md: "end" },
        display: "flex",
      }}>
        <Typography sx={{ color: theme.palette.primary.dark }}>
          Made By
          <a target="_blank" href="https://www.genesys-tech.com/" style={{ color: theme.palette.primary.dark }}> Genesys Technology Ltd. </a>
          <span>ver {version}　</span>
        </Typography>
      </Grid>
    </Grid>
  )
}

export { Copyright };