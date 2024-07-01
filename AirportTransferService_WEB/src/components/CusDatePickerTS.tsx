import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, renderTimeViewClock, DateTimeValidationError, DateTimePickerProps } from '@mui/x-date-pickers';
import Variables from "../scss/App.css";
import moment, { Moment } from 'moment';
import "moment/locale/zh-tw";
import { HandleInputEvent } from "../js/Types";

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

export interface CusDateTimePickerProps {
  value: any;
  format?: string;
  className?: string;
  views?: Array<'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds'>;
  openTo?: 'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds';
  label: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disablePast?: boolean;
  disableFuture?: boolean;
  displayWeekNumber?: boolean;
  maxDate?: Moment | string;
  minDate?: Moment | string;
  id?: string;
  name: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small";
  onChangeEvent: (e: HandleInputEvent) => void;
}

export const CusDateTimePicker = (props: CusDateTimePickerProps) => {
  const { id, className, label, value, error, format, maxDate, minDate, views, openTo, disabled, disablePast, disableFuture, displayWeekNumber, helperText, color, required, size, name, fullWidth, onChangeEvent } = props
  const [val, setVal] = useState<any>(null);

  useEffect(() => {
    if (format && value) {
      setVal(moment(value, format.replace(/\//g, "").replace(/:/g, "").replace(/\s/g, "")))
    }
  }, [format, value]);

  const checkInputData = (e: Moment) => {
    if (!e) return;
    setVal(e);

    const event: HandleInputEvent = {
      target: {
        name: name,
        value: e ? moment(e).format("YYYY-MM-DDTHH:mm:ss") : null,
        id: id,
        label: label
      }
    };

    onChangeEvent(event);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        className={className ?? 'CusDatePicker'}
        sx={{
          paddingRight: { sm: "0.5rem", xs: "0rem" },
          margin: "0.5rem 0",
          label: {
            color: Variables[status + "__DefaultContrastText"],
          },
          input: {
            color: Variables[status + "__DefaultContrastText"]
          },
        }}
        views={views ?? ["year", "month", "day", "hours", "minutes"]}
        openTo={openTo ?? "day"}
        label={label}
        value={val}
        format={format ?? "YYYY/MM/DD HH:mm"}
        disabled={disabled ?? false}
        disablePast={disablePast ?? false}
        disableFuture={disableFuture ?? false}
        displayWeekNumber={displayWeekNumber ?? false}
        maxDate={minDate ? moment(maxDate) : ""}
        minDate={minDate ? moment(minDate) : ""}
        onChange={(e) => checkInputData(e)}
        slotProps={
          {
            openPickerButton: {
              sx: {
                color: Variables[status + "__DefaultContrastText"],
              }
            },
            textField: {
              id: id,
              size: size ?? "small",
              fullWidth: fullWidth ?? true,
              required: required ?? false,
              helperText: helperText,
              error: error ?? false,
              color: color ?? "secondary",
            },
            actionBar: {
              actions: ["clear"]
            }
          }
        }
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
    </LocalizationProvider>
  );
}
