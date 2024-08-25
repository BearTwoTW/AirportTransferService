import React, { useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField, Stack } from '@mui/material';
import Variables from "../scss/App.css";
import PropTypes from 'prop-types';
import moment from "moment";
import "moment/locale/zh-tw";

moment.updateLocale("zh-tw", {
  weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
  week: { dow: 0 }
});

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

/**
 * 客製 DateTimePicker
 * @param {bool}   className         class名稱
 * @param {bool}   error             錯誤驗證判斷
 * @param {bool}   disabled          是否禁用
 * @param {bool}   fullWidth         是否滿版
 * @param {string} helperText        錯誤驗證訊息
 * @param {string} label             大標題
 * @param {string} format            格式
 * @param {number} maxTime           最大值
 * @param {number} minTime           最小值
 * @param {string} openTo            開啟時顯示哪個Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>
 * @param {string} margin            間距
 * @param {func}   onChange          觸發事件
 * @param {bool}   required          是否必填
 * @param {object} views             Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>
 * @param {array}  value             值
 * @param {string} color             輸入框顏色
 * @param {string} size              輸入框大小，EX:small,Normal
 * @param {bool}   disablePast       禁用此時此刻以前的時間
 * @param {bool}   disableFuture     禁用此時此刻以後的時間
 * @param {bool}   displayWeekNumber 是否顯示week
 */
const CusTimePicker = (props) => {
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    // 確保傳遞給 moment 的格式是正確的
    setValue(props.value ? moment(props.value, props.format.replace(/\//g, "").replace(/:/g, "").replace(/\s/g, "")) : null);
  }, [props.value, props.format]);

  const checkInputData = (e) => {
    const momentValue = e.moment; // Moment.js 物件
    setValue(momentValue); // 確保 value 是 Moment.js 物件
    e.target.name = props.name;
    e.target.label = props.label;
    e.target.value = momentValue ? moment(momentValue).format("HH:mm") : null; // 確保正確格式
    props.onChangeEvent(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        className={props.className}
        sx={{
          paddingRight: { sm: "0.5rem", xs: "0rem" },
          margin: "0.5rem 0",
          label: {
            color: props.labelColor || 'inherit', // 確保使用正確的顏色屬性
          },
          input: {
            color: props.inputColor || 'inherit', // 確保使用正確的顏色屬性
          },
        }}
        maxTime={props.maxTime ? moment(props.maxTime) : undefined} // 確保 maxTime 是 Moment.js 物件或 undefined
        minTime={props.minTime ? moment(props.minTime) : undefined} // 確保 minTime 是 Moment.js 物件或 undefined
        views={props.views}
        openTo={props.openTo}
        fullWidth={true}
        label={props.label}
        value={value} // 確保 value 是 Moment.js 物件或 null
        format={props.format}
        disabled={props.disabled}
        color={props.color}
        disablePast={props.disablePast}
        disableFuture={props.disableFuture}
        displayWeekNumber={props.displayWeekNumber}
        onChange={(e) => checkInputData({
          moment: e,
          target: {
            "id": props.id,
            "name": props.name,
            "value": value,
            "label": props.label,
            "key": (props.optionKey === undefined ? "" : props.optionKey),
          }
        })}
        slotProps={{
          openPickerButton: {
            sx: {
              color: props.buttonColor || 'inherit', // 確保使用正確的顏色屬性
            }
          },
          textField: {
            id: props.id,
            size: props.size,
            fullWidth: true,
            required: props.required,
            helperText: props.helperText,
            error: props.error,
            color: "secondary",
          },
          actionBar: {
            actions: ["clear"]
          }
        }}
      />
    </LocalizationProvider>
  );
};

CusTimePicker.defaultProps = {
  className: 'CusTimePicker',
  label: '',
  format: "HH:mm",
  maxTime: '',
  minTime: '',
  views: ["hours", "minutes"],
  openTo: "hours",
  disabled: false,
  disablePast: false,
  disableFuture: false,
  displayWeekNumber: false,
  color: "primary",
  required: false,
  size: 'small',
  helperText: '',
  error: false
};

CusTimePicker.prototype = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  format: PropTypes.string,
  maxTime: PropTypes.string,
  minTime: PropTypes.string,
  views: PropTypes.object,
  openTo: PropTypes.string,
  disabled: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  displayWeekNumber: PropTypes.bool,
  helperText: PropTypes.string,
  color: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.string,
};

export { CusTimePicker };