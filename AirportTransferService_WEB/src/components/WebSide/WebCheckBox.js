import React from 'react';
import { FormHelperText, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * 單選
 * @param {string} helperText 錯誤驗證訊息
 * @param {bool}   required   是否必填
 * @param {bool}   disabled   是否停用
 * @param {string} label      大標題
 * @param {func}   onChange   觸發事件
 * @param {object} color      顏色
 * @param {object} style      樣式
 * @param {object} size       大小
 * @param {array}  value      值
 */

export const WebCheckboxLabel3 = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          ...props.style
        }}>
        <FormGroup
          className={props.required ? "starRequired" : ""}>
          <FormControlLabel
            label={props.required ? props.label + " " : props.label}
            disabled={props.disabled}
            control={
              <Checkbox
                id={props.id}
                name={props.name}
                color={props.color}
                // icon={props.soft ? <BpIcon color={props.color} /> : undefined}
                // checkedIcon={props.soft ? <BpCheckedIcon color={props.color} /> : undefined}
                checked={props.value === "Y" ? true : false}
                onChange={(e) => props.onChangeEvent(e)}
              />
            } />
        </FormGroup>
        {props.error ? <FormHelperText>{props.helperText}</FormHelperText> : null}
      </div>
    </React.Fragment >
  );
}

WebCheckboxLabel3.defaultProps = {
  soft: false,
  helperText: '',
  required: false,
  disabled: false,
  error: false,
  color: "primary",
  style: {},
  value: "",
  id: '',
  fontSize: 21
};

WebCheckboxLabel3.prototype = {
  soft: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string,
  id: PropTypes.string,
};

/**
 * Icon 單選
 * @param {bool}     disabled    是否停用
 * @param {func}     onChange    觸發事件
 * @param {object}   color       顏色
 * @param {object}   style       樣式
 * @param {object}   size        大小
 * @param {array}    value       值
 * @param {element}  icon        未選的樣式，ex:<FavoriteBorder />
 * @param {element}  checkedIcon 已選的樣式，ex:<Favorite />
 */
export const WebCheckboxIcon3 = (props) => {
  return (
    <FormGroup>
      <FormControlLabel
        disabled={props.disabled}
        control={
          <Checkbox
            name={props.name}
            style={props.style}
            color={props.color}
            checked={props.value === "Y" ? true : false}
            icon={props.icon}
            checkedIcon={props.checkedIcon}
            onChange={(e) => props.onChangeEvent(e)}
          />
        }
      />
    </FormGroup>
  );
}

WebCheckboxIcon3.defaultProps = {
  icon: '',
  checkedIcon: '',
  disabled: false,
  color: "primary",
  style: {},
  value: '',
  fontSize: 21
};

WebCheckboxIcon3.prototype = {
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  checkedIcon: PropTypes.element,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string,
};


/**
 * 基本單選
 * @param {bool} disabled    是否停用
 */

export const WebCheckboxBasic3 = (props) => {

  const checkInputData = (e) => {
    e.target.name = props.name;
    props.onChangeEvent(e);
  }

  return (
    <Checkbox
      id={props.id}
      color={props.color}
      disabled={props.disabled}
      checked={props.value === "Y" ? true : false}
      onChange={(e) => checkInputData(e)}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: props.fontSize },
        [`&.active, :active`]: {
          transition: "unset",
          transform: "unset",
          fontWeight: "unset",
          boxShadow: "unset",
        },
      }}>
    </Checkbox>
  )
}
WebCheckboxBasic3.defaultProps = {
  disabled: false,
  soft: false,
  value: '',
  id: '',
  checked: '',
  fontSize: 21,
  color: "primary"
};

WebCheckboxBasic3.prototype = {
  disabled: PropTypes.bool,
  soft: PropTypes.bool,
  value: PropTypes.string,
  checked: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
};