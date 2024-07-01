import React from 'react';
import {
  Link,
  Typography,
  Breadcrumbs
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const CusBasicBreadcrumbs = (props) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/');
  let PathnamesSecond = null

  const PathnamesRoot = props.routeData.filter((ele) => {
    if (ele.code === pathnames[2].replace(/^./, pathnames[2][0].toUpperCase())) return ele
  })
  const PathnamesFirst = PathnamesRoot[0].children.filter((ele) => {
    if (ele.code === pathnames[3].replace(/^./, pathnames[3][0].toUpperCase())) return ele
  })

  if (pathnames[4]) {
    PathnamesSecond = PathnamesFirst[0].children.filter((ele) => {
      if (ele.code === pathnames[4].replace(/^./, pathnames[4][0].toUpperCase())) return ele
    })
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ pr: 1, pl: 1, display: 'flex', alignItems: "center" }}>
      <Typography color={Variables[status + "__DefaultContrastText"]}>{PathnamesRoot[0].name}</Typography>
      {PathnamesSecond ?
        <Link sx={{ color: Variables[status + "__Secondary"] }} underline="hover" color="inherit" href={"/System/" + PathnamesRoot[0].code + "/" + PathnamesFirst[0].code}>{PathnamesFirst[0].name}</Link>
        :
        <Typography color={Variables[status + "__DefaultContrastText"]}>{PathnamesFirst[0].name}</Typography>
      }
      {PathnamesSecond ? <Typography color={Variables[status + "__DefaultContrastText"]}>{PathnamesSecond[0].name}</Typography> : null}
    </Breadcrumbs>
  );
}

export { CusBasicBreadcrumbs }