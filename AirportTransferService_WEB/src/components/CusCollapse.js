import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, TableCell, TableRow, } from '@mui/material';
import { Collapse } from '@mui/material';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");
/**
 * @description
 * @param {string} in 開關狀態
 * @param {string} timeout 過渡動畫時間
 * @param {string} id 如果有編號類的內容放這裡
 * @param {string} color Chip 顏色
 * @param {string} variant ex : outlined || filled 邊框類型、深色滿版
 * @param {string} size 尺寸 ex : small || medium
 * @param {string} buttonType 右側是否要有按鈕, 目前只有複製與編輯兩種 ex : copy || edit
 * @param {string} onClick 按鈕觸發事件
 */

const tableCollapse = {
  [`&.MuiCollapse-root`]: {
    // boxSizing: "content-box",
    boxShadow: `inset 3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
  }
}

const CusTableCollapse = (props) => {
  const { status, content, onClick } = props;
  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={6}>
        <Collapse sx={tableCollapse} in={status} timeout={"auto"} unmountOnExit>
          <Box sx={{ padding: "10px 20px" }}>
            {content}
          </Box>
        </Collapse >
      </TableCell>
    </TableRow>
  )
}

CusTableCollapse.defaultProps = {
  disabled: false,

};
CusTableCollapse.prototype = {
  disabled: PropTypes.bool,
};

export {
  CusTableCollapse
};