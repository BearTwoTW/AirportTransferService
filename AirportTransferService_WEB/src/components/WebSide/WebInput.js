import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Box, Autocomplete, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AddSlender, MinusSlender } from '../../components/CusSvgLibrary';
import { WebIconButton3 } from './WebButton'
import PropTypes from 'prop-types';
import { inputLabelClasses } from "@mui/material/InputLabel";
import Variables from "../../scss/App.css";

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
export const WebInput3 = forwardRef((props, ref) => {
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
        paddingRight: { sm: "0.2rem", xs: "0rem" },
        marginTop: "0.6rem",
        marginBottom: "0.6rem",
        "& .MuiInputBase-root": {
          boxShadow: "unset",
          borderRadius: "unset"
        },
        "& fieldset": {
          borderColor: "#222E4E"
        },
        ...props.sxStyle,
      }}
      InputLabelProps={{
        sx: {
          color: "#546b7a",
          backgroundColor: "#F1F2F6",
          [`&.${inputLabelClasses.shrink}`]: {
            color: "#696fac"
          }
        }
      }}
      autoFocus={props.autoFocus}
      className={props.className}
      label={props.label}
      value={props.value === 0 || props.value ? props.value : ""}
      error={props.error}
      disabled={props.disabled}
      helperText={props.error
        ? props.helperText
          ? props.label + props.helperText
          : props.label + "必填"
        : null}
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

WebInput3.defaultProps = {
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

WebInput3.prototype = {
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

export const WebInputStandard3 = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    <React.Fragment>
      {/* 密碼欄位專用 */}
      {props.password ?
        <OutlinedInput
          autoComplete={props.type === "password" ? "off" : "on"}
          inputProps={{
            sx: {
              padding: "0.6rem 0.9rem",
            },
          }}
          autoFocus={props.autoFocus}
          className={props.className}
          label={props.label}
          value={props.value === 0 || props.value ? props.value : ""}
          error={props.error}
          disabled={props.disabled}
          helperText={props.error
            ? props.helperText
              ? props.label + props.helperText
              : props.label + "必填"
            : null}
          color={props.color}
          multiline={props.multiline}
          rows={props.rows}
          maxRows={props.maxRows}
          required={props.required}
          size={props.size}
          type={showPassword ? 'text' : 'password'}
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
          placeholder={props.placeholder}

          endAdornment={
            <InputAdornment>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        :
        <TextField
          ref={inputRef}
          sx={{
            paddingRight: { sm: "0.2rem", xs: "0rem" },
            marginTop: "0.6rem",
            marginBottom: "0.6rem",
            "& .MuiInputBase-root": {
              backgroundColor: "#ffffff",
              boxShadow: "unset",
              // border: props.standard ? "1px solid #E5E7EB" : "none"
            },
            "& .MuiInputBase-root > *": {
              textAlign: props.textAlign
            },
            "& fieldset": {
              // input 樣式
            },
            ...props.sxStyle,
          }}
          InputLabelProps={{
            sx: {
              color: "#546b7a",
              backgroundColor: "#F1F2F6",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#696fac",
              }
            }
          }}
          autoFocus={props.autoFocus}
          className={props.className}
          label={props.label}
          value={props.value === 0 || props.value ? props.value : ""}
          error={props.error}
          disabled={props.disabled}
          helperText={props.error
            ? props.helperText
              ? props.label + props.helperText
              : props.label + "必填"
            : null}
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
      }
    </React.Fragment>
  )
})

WebInputStandard3.defaultProps = {
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
  standard: true,
  textAlign: '',
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

WebInputStandard3.prototype = {
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

/** 可以打字搜尋的select */
export const WebInputSelect3 = (props) => {
  /** 選擇選項時的事件 */
  const handleOptionClick = (option) => {
    props.onSelected(option);
  };

  return (
    <Autocomplete
      className={props.className}
      id={props.id}
      size={props.size}
      color={props.color}
      value={props.value}
      style={props.style}
      disabled={props.disabled}
      readOnly={props.readOnly}
      options={props.options || []}
      filterOptions={(x) => x}
      openOnFocus={true}
      autoComplete={true}
      includeInputInList={true}
      freeSolo
      isOptionEqualToValue={(option, value) => option.value === value.value}
      // onChange={(e, value) => {
      //   if (props.onChangeEvent !== undefined) {
      //     props.onChangeEvent({
      //       "target": {
      //         "id": props.id,
      //         "name": props.name,
      //         "value": value,
      //         "label": props.label,
      //         "type": props.type,
      //         "key": (props.optionKey === undefined ? "" : props.optionKey),
      //       }
      //     })
      //   }
      // }}
      onInputChange={(e, newInputValue) => {
        if (props.onInputChangeEvent !== undefined) {
          props.onInputChangeEvent({
            "target": {
              "id": props.id,
              "name": props.searchKey,
              "value": newInputValue,
            }
          })
        }
      }}
      noOptionsText={props.noOptionsText}
      getOptionLabel={(option) => option.name || ""}
      renderInput={(params) =>
      (<TextField {...params}
        className='bg-white'
        sx={{
          borderRadius: "0.35rem",
          marginTop: "0.6rem",
          marginBottom: "0.6rem",
          input: {
            color: Variables[status + "__DefaultContrastText"]
          },
        }}
        InputLabelProps={{
          sx: {
            color: Variables[status + "__DefaultContrastText"],
            backgroundColor: Variables[status + "__Default"],
            [`&.${inputLabelClasses.shrink}`]: {
              color: Variables[status + "__Secondary"],
            },
          }
        }}
        autoComplete={"off"}
        value={props.value}
        label={props.label}
        error={props.error}
        helperText={props.error ? props.label + '必填' : null}
        required={props.required}
        placeholder={props.placeholder}
      />)
      }
      renderOption={(props, option) => {
        return (
          <li {...props} onClick={() => handleOptionClick(option)}>{option.name}</li>
        );
      }}
    />
    // <Autocomplete
    //   id="free-solo-2-demo"
    //   disableClearable
    //   options={props.options || []}
    //   value={props.value}
    //   label={props.label}
    //   error={props.error}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       label="Search input"
    //       InputProps={{
    //         ...params.InputProps,
    //         type: 'search',
    //       }}
    //     />
    //   )}
    // />
  );
};

WebInputSelect3.defaultProps = {
  className: '',
  noOptionsText: '查無資料',
  fullWidth: true,
  id: '',
  className: '',
  size: 'small',
  color: "primary",
  style: {},
  error: false,
  helperText: '',
  disabled: false,
  readOnly: false,
  options: [],
  label: '',
};

WebInputSelect3.prototype = {
  className: PropTypes.string,
  noOptionsText: PropTypes.string,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  option: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export const WebInputCounter = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    <React.Fragment>
      <Box display="flex" alignItems="center" className="hover:border-info"
        sx={{ border: "1px solid #C4C4C4", borderRadius: "4px", padding: "0.47rem", margin: "0.6rem 0 0.6rem 0" }}>
        <WebIconButton3
          sx={{ margin: "0", padding: "0" }}
          size={"small"}
          color={"info"}
          variant="contained"
          icon={<MinusSlender className={"w-6"} />}
          onClick={props.minusClick}
          disabled={props.minusDisabled} />
        <TextField
          ref={inputRef}
          sx={{
            padding: "0",
            margin: "0",
            "& .MuiInputBase-root": {
              backgroundColor: "#ffffff",
              boxShadow: "unset",
            },
            "& .MuiInputBase-root > *": {
              textAlign: props.textAlign,
              border: "none",
              padding: "0",
              margin: "0"
            },
            "& fieldset": {
              // input 樣式
            },
            ...props.sxStyle,
          }}
          InputLabelProps={{
            sx: {
              color: "#546b7a",
              backgroundColor: "#F1F2F6",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#696fac",
              }
            }
          }}
          autoFocus={props.autoFocus}
          className={props.className}
          label={props.label}
          value={props.value === 0 || props.value ? props.value : ""}
          error={props.error}
          disabled={props.disabled}
          helperText={props.error
            ? props.helperText
              ? props.label + props.helperText
              : props.label + "必填"
            : null}
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
        <WebIconButton3
          sx={{ margin: "0", padding: "0" }}
          size={"small"}
          color={"info"}
          variant="contained"
          icon={<AddSlender className={"w-6"} />}
          onClick={props.plusClick}
          disabled={props.plusDisabled} />
      </Box>
    </React.Fragment>
  )
})

WebInputCounter.defaultProps = {
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
  standard: true,
  textAlign: '',
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

WebInputCounter.prototype = {
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