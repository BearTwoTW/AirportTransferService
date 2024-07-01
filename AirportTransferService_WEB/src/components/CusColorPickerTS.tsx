import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { HexColorPicker } from 'react-colorful'

/** 顏色選擇器傳入參數
 * @param label 標籤
 * @param name 名稱
 * @param value 色值
 * @param error 是否錯誤
 * @param disabled 是否禁用
 * @param onChangeEvent 輸入事件
 * @param colorChange 顏色選擇器事件
 */
// TODO: 想一下e.target.value的型態，應該要改成什麼
export type CusColorPickerProps = {
  label: string;
  name: string;
  value: string;
  error?: boolean;
  disabled?: boolean;
  onChangeEvent: (e: any) => void;
  colorChange: (e: any) => void;
}

/** 顏色選擇器
 * @param props 顏色選擇器傳入參數
 * @returns 
 */
export const CusColorPicker = (props: CusColorPickerProps) => {
  const { label, name, value, error, disabled, onChangeEvent, colorChange } = props;

  // 色值
  const [colorValue, setColorValue] = useState(value);

  // 顯示/隱藏色彩選擇器
  const [showColorPicker, setShowColorPicker] = useState(false);

  /** 顏色輸入事件
   * @param e event
   */
  const handleInputChange = (e: any) => {
    setColorValue(e.target.value);

    e.target.name = name;
    onChangeEvent(e);
  };

  /** 顏色選擇器事件
   * @param e event
   */
  const handleColorChange = (newColor: string) => {
    setColorValue(newColor);
    colorChange(newColor);
  };

  return (
    <React.Fragment>
      <TextField
        sx={{
          paddingRight: { sm: "0.6rem", xs: "0rem" },
          marginTop: "0.6rem",
          marginBottom: "0.6rem"
        }}
        // 先寫死 ---v
        size="small"
        color="primary"
        variant="outlined"
        margin="dense"
        fullWidth={true}
        // 先寫死 ---^
        label={label}
        value={colorValue}
        error={error ? error : false}
        disabled={disabled ? disabled : false}
        helperText={error ? label + "必填" : null}
        InputProps={{
          endAdornment: (
            <ClickAwayListener onClickAway={() => setShowColorPicker(false)}>
              <Tooltip
                // 雖然文件寫說可以使用sx，但實際上好像沒辦法直接override，必須要寫像下面componentsProps的樣子，先這樣寫吧
                // 參考：https://github.com/mui/material-ui/issues/28679
                componentsProps={{ tooltip: { sx: { borderRadius: 3, padding: "10px" }, } }}
                title={(<HexColorPicker color={colorValue} onChange={(newColor) => { handleColorChange(newColor) }} />)}
                arrow
                open={showColorPicker}>
                <button
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: colorValue,
                    width: "20px",
                    height: "20px",
                    borderRadius: "3px"
                  }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
              </Tooltip>
            </ClickAwayListener>
          )
        }}
        onChange={(e) => handleInputChange(e)}
      />
    </React.Fragment>
  );
};

/** 色票參數
 * @param value 色值
 * @param style 樣式
 */
export type CusPantoneProps = {
  value: string;
  style?: { [key: string]: string };
}

/** 色票
 * @param props 色票參數
 * @returns 
 */
export const Pantone = (props: CusPantoneProps) => {
  const { value, style } = props
  return (
    <span style={{
      backgroundColor: value,
      width: "20px",
      height: "20px",
      display: "inline-block",
      verticalAlign: "middle",
      border: "1px solid #ccc",
      borderRadius: "3px",
      marginRight: "15px",
      ...style
    }} />
  )
}