import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { ContentCopy, Edit } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButton';
import { useSnackbar } from 'notistack';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");
/**
 * @description
 * @param {string} disabled
 * @param {string} label Chip 文字內容
 * @param {string} id 如果有編號類的內容放這裡
 * @param {string} color Chip 顏色
 * @param {string} variant ex : outlined || filled 邊框類型、深色滿版
 * @param {string} size 尺寸 ex : small || medium
 * @param {string} buttonType 右側是否要有按鈕, 目前只有複製與編輯兩種 ex : copy || edit
 * @param {string} onClick 按鈕觸發事件
 */

const CusChip = (props) => {
  const { disabled, id, label, status, variant, color, size, buttonType, copy, onClick } = props;
  const { enqueueSnackbar } = useSnackbar();
  let fontSize = size === "small" ? "12px" : "20px"

  /**
   * @description [事件]複製編號
   */
  const copy_Click = useCallback(({ e, id }) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      enqueueSnackbar("複製編號成功", {
        variant: "success",
        persist: false,
      });
    })
  }, [])

  return (
    <React.Fragment>
      <Chip
        sx={{
          margin: "0.6rem 0.5rem 0.6rem 0.5rem",
          fontSize: fontSize,
          fontWeight: "bold",
          ["&:active"]: {
            boxShadow: "none",
          }
        }}
        disabled={disabled}
        label={(id ? "#" + id : "")
          + (id ? label ? " | " + label : "" : label ? label : "")
          + (status ? " | " + status : "")}
        variant={variant}
        color={color}
        size={size}
        onClick={copy ? (e) => copy_Click({ e: e, id: id }) : null}
      />
      {buttonType === "edit" ?
        <CusIconButton
          color='secondary'
          icon={<Edit />}
          onClick={onClick}
        /> :
        null
      }
    </React.Fragment>
  )
}

CusChip.defaultProps = {
  disabled: false,
  id: "",
  label: "",
  status: "",
  variant: "",
  color: "primary",
  size: "small",
  buttonType: "",
};
CusChip.prototype = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  status: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  buttonType: PropTypes.string,
};

export {
  CusChip
};