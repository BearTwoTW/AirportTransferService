import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { inputLabelClasses } from "@mui/material/InputLabel";
import Variables from "../../src/scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");
/**
 * 客製輸入框
 * @param {bool}   className        class名稱
 * @param {bool}   error            錯誤驗證判斷
 * @param {bool}   disabled         是否禁用
 * @param {bool}   fullWidth        是否滿版
 * @param {string} helperText       錯誤驗證訊息
 * @param {string} label            大標題
 * @param {number} max              最大值
 * @param {number} maxLength        字元最大長度
 * @param {number} min              最小值
 * @param {string} margin           間距
 * @param {string} multiline        是否多行顯示
 * @param {func}   onChange         觸發事件
 * @param {bool}   required         是否必填
 * @param {bool}   startAdornment   輸入框前綴詞
 * @param {bool}   endAdornment     輸入框後綴詞
 * @param {object} style            樣式
 * @param {object} type             類型
 * @param {object} variant          輸入框樣式，EX:filled,outlined,standard
 * @param {array}  value            值
 * @param {string} color            輸入框顏色
 * @param {string} size             輸入框大小，EX:small,Normal
 */
const CusInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  /**
   * 檢查類別是否為數字，最大最小值輸入限制
   * @param {*} e 
   */
  const checkInputData = (e) => {
    e.target.name = props.name;
    e.target.label = props.label;
    if (e.target.type === "number") {
      let num = "";
      if (props.min !== undefined && props.max !== undefined) {
        if (Number.parseInt(props.min) > Number.parseInt(e.target.value)) num = props.min;
        else if (Number.parseInt(props.max) < Number.parseInt(e.target.value)) num = props.max;
        else num = e.target.value;
      } else if (props.min !== undefined) {
        if (Number.parseInt(props.min) > Number.parseInt(e.target.value)) num = props.min;
        else num = e.target.value;
      } else if (props.max !== undefined) {
        if (Number.parseInt(props.max) < Number.parseInt(e.target.value)) num = props.max;
        else num = e.target.value;
      } else num = e.target.value;
      e.target.value = num;
    }
    props.onChangeEvent(e);
  }

  const getKeyDownEventRef = (e) => {
    e.target.name = props.name;
    e.target.label = props.label;
    e.target.value = props.value;
    props.keyDownEvent(e)
  }

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    inputRef
  }));

  return (
    <TextField
      ref={inputRef}
      sx={{
        ...props.sxStyle,
        paddingRight: { sm: "0.6rem", xs: "0rem" },
        marginTop: "0.6rem",
        marginBottom: "0.6rem",
        input: {
          color: Variables[status + "__DefaultContrastText"],
        },
      }}
      InputLabelProps={{
        sx: {
          color: Variables[status + "__DefaultContrastText"],
          [`&.${inputLabelClasses.shrink}`]: {
            color: Variables[status + "__Secondary"],
          },
        },
        shrink: props.shrink,
      }}
      autoFocus={props.autoFocus}
      className={props.className}
      label={props.label}
      value={props.value === 0 || props.value ? props.value : ""}
      error={props.error}
      disabled={props.disabled}
      helperText={props.helperText ? props.helperText : props.error ? props.label + "必填" : props.helperText}
      color={props.color}
      multiline={props.multiline}
      rows={props.rows}
      maxRows={props.maxRows}
      required={props.required}
      size={props.size}
      type={props.type}
      variant={props.variant}
      onChange={(e) => {
        if (props.onChangeEvent !== undefined) {
          checkInputData(e)
        }
      }}
      style={props.style}
      fullWidth={props.fullWidth}
      margin={"dense"}
      onKeyDown={(e) => {
        if (props.keyDownEvent !== undefined) {
          getKeyDownEventRef(e)
        }
      }}
      InputProps={{
        startAdornment: props.startAdornment,
        endAdornment: props.endAdornment,
        inputProps: {
          min: props.min,
          max: props.max,
          maxLength: props.maxLength,
        }
      }}
      placeholder={props.placeholder}>
    </TextField>
  )
})

CusInput.defaultProps = {
  className: '',
  label: '',
  value: '',
  error: false,
  autoFocus: false,
  disabled: false,
  helperText: '',
  color: "primary",
  multiline: false,
  required: false,
  fullWidth: true,
  type: 'text',
  variant: 'outlined',
  style: {},
  startAdornment: null,
  endAdornment: null,
  size: 'small',
  max: '',
  maxLength: '',
  min: 0,
  placeholder: '',
  rows: 0,
  maxRows: 0,
};

CusInput.prototype = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  color: PropTypes.string,
  multiline: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  startAdornment: PropTypes.object,
  endAdornment: PropTypes.object,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
};

export { CusInput };