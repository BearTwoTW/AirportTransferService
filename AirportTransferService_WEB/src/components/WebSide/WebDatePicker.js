import React, { useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

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
 * 客製 DatePicker
 * @param {bool}   className         class名稱
 * @param {bool}   error             錯誤驗證判斷
 * @param {bool}   disabled          是否禁用
 * @param {bool}   fullWidth         是否滿版
 * @param {string} helperText        錯誤驗證訊息
 * @param {string} label             大標題
 * @param {string} format            格式
 * @param {number} minDate           最小值
 * @param {number} minDateTime       最小值
 * @param {number} minDate           最大值
 * @param {number} minDateTime       最大值
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
const WebDatePicker = (props) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(props.value ? moment(props.value, props.format.replace(/\//g, "")) : null)
  }, [props.value]);

  const checkInputData = (e) => {
    setValue(e.moment);
    e.target.name = props.name;
    e.target.label = props.label;
    e.target.value = e.moment ? moment(e.moment).format(props.format.replace(/\//g, "-")) + "T00:00:00" : null;
    props.onChangeEvent(e);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        className={props.className}
        views={props.views}
        openTo={props.openTo}
        fullWidth={true}
        label={props.label}
        value={value}
        format={props.format}
        disabled={props.disabled}
        color={props.color}
        disablePast={props.disablePast}
        disableFuture={props.disableFuture}
        displayWeekNumber={props.displayWeekNumber}
        maxDate={props.maxDate}
        minDate={props.minDate}
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
        slotProps={
          {
            // openPickerButton: {
            //     sx: {
            //     }
            // },
            textField: {
              id: props.id,
              sx: {
                marginTop: "0.6rem",
                marginBottom: "0.6rem",
                [`& .MuiInputBase-root`]: {
                  [`& .MuiInputBase-input`]: {
                    padding: "9px 14px"
                  },
                },
                [`& fieldset`]: {
                  // input 樣式
                },
                ...props.sxStyle,
              }
            },
            actionBar: {
              actions: ["clear"]
            }
          }
        }
      />
    </LocalizationProvider>
  );
}

WebDatePicker.defaultProps = {
  className: 'WebDatePicker',
  label: '',
  format: "YYYY/MM/DD",
  views: ["year", "month", "day"],
  openTo: "day",
  maxDate: null,
  minDate: null,
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

WebDatePicker.prototype = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  format: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
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

// /**
//  * 客製 DateTimePicker
//  * @param {bool}   className         class名稱
//  * @param {bool}   error             錯誤驗證判斷
//  * @param {bool}   disabled          是否禁用
//  * @param {bool}   fullWidth         是否滿版
//  * @param {string} helperText        錯誤驗證訊息
//  * @param {string} label             大標題
//  * @param {string} format            格式
//  * @param {number} minDate           最小值
//  * @param {number} minDateTime       最小值
//  * @param {number} minDate           最大值
//  * @param {number} minDateTime       最大值
//  * @param {string} openTo            開啟時顯示哪個Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>
//  * @param {string} margin            間距
//  * @param {func}   onChange          觸發事件
//  * @param {bool}   required          是否必填
//  * @param {object} views             Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>
//  * @param {array}  value             值
//  * @param {string} color             輸入框顏色
//  * @param {string} size              輸入框大小，EX:small,Normal
//  * @param {bool}   disablePast       禁用此時此刻以前的時間
//  * @param {bool}   disableFuture     禁用此時此刻以後的時間
//  * @param {bool}   displayWeekNumber 是否顯示week
//  */
// const CusDateTimePicker = (props) => {
//     const [value, setValue] = React.useState(null);

//     useEffect(() => {
//         setValue(props.value ? moment(props.value, props.format.replace(/\//g, "").replace(/:/g, "").replace(/\s/g, "")) : null)
//     }, [props.value]);

//     const checkInputData = (e) => {
//         setValue(e.moment);
//         e.target.name = props.name;
//         e.target.label = props.label;
//         e.target.value = e.moment ? moment(e.moment).format("YYYY-MM-DDTHH:mm:ss") : null;
//         props.onChangeEvent(e);
//     }

//     return (
//         <LocalizationProvider dateAdapter={AdapterMoment}>
//             <DateTimePicker
//                 className={props.className}
//                 sx={{
//                     paddingRight: { sm: "0.5rem", xs: "0rem" },
//                     margin: "0.5rem 0",
//                     width: "100%",
//                     "& fieldset": { border: 'none' },
//                     label: { color: "#546b7a", backgroundColor: "#F1F2F6" }
//                 }}
//                 views={props.views}
//                 openTo={props.openTo}
//                 fullWidth={true}
//                 label={props.label}
//                 value={value}
//                 format={props.format}
//                 disabled={props.disabled}
//                 color={props.color}
//                 disablePast={props.disablePast}
//                 disableFuture={props.disableFuture}
//                 displayWeekNumber={props.displayWeekNumber}
//                 maxDate={props.maxDate}
//                 minDate={props.minDate}
//                 onChange={(e) => checkInputData({
//                     moment: e,
//                     target: {
//                         "id": props.id,
//                         "name": props.name,
//                         "value": value,
//                         "label": props.label,
//                         "key": (props.optionKey === undefined ? "" : props.optionKey),
//                     }
//                 })}
//                 slotProps={
//                     {
//                         openPickerButton: {
//                             sx: {
//                                 backgroundColor: Variables[status + "__Default"],
//                                 boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
//                                 borderRadius: "8px",
//                                 [`&:hover`]: {
//                                     background: `linear-gradient(145deg, ${Variables[status + "__BoxShadowHoverLight"]}, ${Variables[status + "__BoxShadowHoverDark"]})`,
//                                     boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
//                                 },
//                                 [`&.active, :active`]: {
//                                     borderRadius: "10px",
//                                     boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
//                                 },
//                                 [`&.Mui-disabled`]: {
//                                     boxShadow: "none"
//                                 }
//                             }
//                         },
//                         textField: {
//                             id: props.id,
//                             size: props.size,
//                             fullWidth: true,
//                             required: props.required,
//                             helperText: props.helperText,
//                             error: props.error,
//                             color: "secondary",
//                         },
//                         actionBar: {
//                             actions: ["clear"]
//                         }
//                     }
//                 }
//                 viewRenderers={{
//                     hours: renderTimeViewClock,
//                     minutes: renderTimeViewClock,
//                     seconds: renderTimeViewClock,
//                 }}
//             />
//         </LocalizationProvider>
//     );
// }

// CusDateTimePicker.defaultProps = {
//     className: 'CusDatePicker',
//     label: '',
//     format: "YYYY/MM/DD HH:mm",
//     views: ["year", "month", "day", "hours", "minutes"],
//     openTo: "day",
//     maxDate: null,
//     minDate: null,
//     disabled: false,
//     disablePast: false,
//     disableFuture: false,
//     displayWeekNumber: false,
//     color: "primary",
//     required: false,
//     size: 'small',
//     helperText: '',
//     error: false
// };

// CusDateTimePicker.prototype = {
//     className: PropTypes.string,
//     label: PropTypes.string,
//     value: PropTypes.string,
//     error: PropTypes.bool,
//     format: PropTypes.string,
//     maxDate: PropTypes.string,
//     minDate: PropTypes.string,
//     views: PropTypes.object,
//     openTo: PropTypes.string,
//     disabled: PropTypes.bool,
//     disablePast: PropTypes.bool,
//     disableFuture: PropTypes.bool,
//     displayWeekNumber: PropTypes.bool,
//     helperText: PropTypes.string,
//     color: PropTypes.string,
//     required: PropTypes.bool,
//     size: PropTypes.string,
// };

export { WebDatePicker };