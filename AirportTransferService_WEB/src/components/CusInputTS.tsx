import React, { useRef, useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';
import Variables from "../../src/scss/App.css";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { HandleInputEvent } from "../js/Types";
// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

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
export type CusInputProps = {
  id?: string;
  name: string;
  label?: string;
  helperText?: string;
  min?: number;
  max?: number;
  onChangeEvent?: (e: HandleInputEvent) => void;
  // keyDownEvent?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?: string;
  value?: any;
  error?: boolean;
  disabled?: boolean;
  color?: BaseTextFieldProps["color"];
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  required?: boolean;
  size?: 'small' | 'medium';
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  sxStyle?: object;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  maxLength?: number;
  placeholder?: string;
};

export const CusInput = forwardRef((props: CusInputProps, ref: ForwardedRef<any>) => {
  const { id, name, label, helperText, min, max, onChangeEvent, autoFocus, className, value, error, disabled, color, multiline, rows, maxRows, required, size, type, variant, sxStyle, style, fullWidth, startAdornment, endAdornment, maxLength, placeholder } = props

  const inputRef = useRef<HTMLInputElement>(null);

  const checkInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      let num = 0;
      let targetValue = Number.parseInt(e.target.value)
      if (min !== undefined && max !== undefined) {
        if (min > targetValue) num = min;
        else if (max < targetValue) num = max;
        else num = targetValue
      } else if (min !== undefined) {
        if (min > targetValue) num = min;
        else num = targetValue
      } else if (max !== undefined) {
        if (max < targetValue) num = max;
        else num = targetValue
      } else num = targetValue
      e.target.value = num.toString();
    }

    if (onChangeEvent)
      onChangeEvent({
        target: {
          id: id,
          name: name,
          label: label,
          value: e.target.value,
          type: type,
        }
      });
  }

  // const getKeyDownEventRef = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   e.target.name = name;
  //   e.target.value = value;
  //   keyDownEvent(e)
  // }

  useImperativeHandle(ref, () => ({
    inputRef
  }));

  return (
    <TextField
      ref={inputRef}
      sx={{
        ...sxStyle,
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
        shrink: true
      }}
      id={id}
      autoFocus={autoFocus ?? false}
      className={className}
      label={label}
      value={value === 0 || value ? value : ""}
      error={error ?? false}
      disabled={disabled ?? false}
      helperText={error ? label + "必填" : helperText}
      color={color ?? "primary"}
      multiline={multiline ?? false}
      rows={rows}
      maxRows={maxRows}
      required={required ?? false}
      size={size ?? "small"}
      type={type ?? "text"}
      variant={variant ?? "outlined"}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChangeEvent !== undefined) {
          checkInputData(e)
        }
      }}
      style={style}
      fullWidth={fullWidth ?? true}
      margin={"dense"}
      // onKeyDown={(e) => {
      //   if (keyDownEvent !== undefined) {
      //     getKeyDownEventRef(e)
      //   }
      // }}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
        inputProps: {
          min: min,
          max: max,
          maxLength: maxLength,
        }
      }}
      placeholder={placeholder}>
    </TextField>
  )
});


// TODO：檔案匯入的東西搬去CusButtonTS
/**
 * @description 檔案匯入
 * @param {stirng} buttonName 按鈕名稱
 * @param {"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined} color 顏色
 * @param {File | null} file 檔案
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} addFile 新增檔案
 * @param {() => void} clearFile 清除檔案
 */
// export type CusFileImportProps = {
//     buttonName: string;
//     color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
//     file: File | null;
//     addFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     clearFile: () => void;
// }

/**
 * @description 檔案匯入
 * @param props
 */
// export const CusFileImport = (props: CusFileImportProps) => {
//     const {
//         buttonName,
//         color,
//         file,
//         addFile,
//         clearFile
//     } = props;

//     // 檔案匯入的input太醜，所以要隱藏input
//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });

//     return (
//         <React.Fragment>
//             <Button
//                 component="label"
//                 sx={{
//                     marginRight: { sm: "0.6rem", xs: "0rem" },
//                     marginTop: "0.6rem",
//                     marginBottom: "0.6rem"
//                 }}
//                 color={color}
//             >
//                 {buttonName}
//                 <VisuallyHiddenInput type="file"
//                     onChange={addFile}
//                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
//             </Button>
//             {file &&
//                 <React.Fragment>
//                     <span>{file.name}</span>
//                     <IconButton onClick={clearFile} sx={{ margin: "0rem" }} >
//                         <DeleteForever />
//                     </IconButton>
//                 </React.Fragment>}
//         </React.Fragment>
//     )
// };
