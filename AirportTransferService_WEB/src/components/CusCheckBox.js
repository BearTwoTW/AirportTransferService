import React from 'react';
import { FormHelperText, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CusThemeTS } from '../CustomThemeTS';
import PropTypes from 'prop-types';
import Variables from "../../src/scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

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

// 客製 CheckBox
const BpIcon = styled('span')(({ color }) => ({
  borderRadius: 5,
  width: 16,
  height: 16,
  margin: "2px",
  boxShadow: `2px 2px 3px ${Variables[status + "__BoxShadowDark"]}, -2px -2px 3px ${Variables[status + "__BoxShadowLight"]}`,
  backgroundColor: Variables[status + "__Default"],
  transition: "all .2s ease-in-out",
  "input:hover ~ &": {
    background: `linear-gradient(145deg, ${Variables[status + "__boxShadowHoverLight"]}, ${Variables[status + "__boxShadowHoverDark"]});`,
    boxShadow: `3px 3px 3px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 3px ${Variables[status + "__BoxShadowLight"]}`,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    border: `1px solid ${Variables[status + "__DisabledColor"]}`,
    backgroundColor: Variables[status + "__DisabledColor"],
  },
}));

// 客製 CheckBox Checked
const BpCheckedIcon = styled(BpIcon)(({ color }) => ({
  "&:before": {
    "input:disabled ~ &": {
      boxShadow: "none",
      border: `1px solid ${Variables[status + "__DisabledColor"]}`,
      backgroundColor: Variables[status + "__DisabledColor"],
      width: 15,
      height: 15,
    },
    backgroundColor:
      color === "primary" ? Variables[status + "__Primary"]
        : color === "secondary" ? Variables[status + "__Secondary"]
          : color === "success" ? Variables[status + "__BtnSuccess"]
            : color === "info" ? Variables[status + "__BtnInfo"]
              : color === "warning" ? Variables[status + "__BtnWarning"]
                : color === "error" ? Variables[status + "__BtnError"]
                  : Variables[status + "__Default"],
    display: "block",
    borderRadius: 5,
    width: 16,
    height: 16,
    boxShadow:
      color === "primary" ? "inset 2px 2px 3px #475b68, inset -2px -2px 3px #617b8c"
        : color === "secondary" ? "inset 2px 2px 3px #595e92, inset -2px -2px 3px #7980c6"
          : color === "success" ? "inset 2px 2px 3px #6ea970, inset -2px -2px 3px #94e598"
            : color === "info" ? "inset 2px 2px 3px #4469cb, inset -2px -2px 3px #5c8fff"
              : color === "warning" ? "inset 2px 2px 3px #d2911a, inset -2px -2px 3px #ffc524"
                : color === "error" ? "inset 2px 2px 3px #c36262, inset -2px -2px 3px #ff8484"
                  : "inset 2px 2px 3px #cdced1, inset -2px -2px 3px #ffffff",
    backgroundImage:
      color !== ""
        ? "url(\"data:image/svg+xml,%3Csvg fill='%23FFFFFF' viewBox='0 -8 72 72' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' stroke='%23FFFFFF'%3E%3Cg id='SVGRepo_bgCarrier' strokeWidth='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3Echeck%3C/title%3E%3Cpath d='M61.07 12.9 57 8.84a2.93 2.93 0 0 0-4.21 0L28.91 32.73 19.2 23A3 3 0 0 0 15 23l-4.06 4.07a2.93 2.93 0 0 0 0 4.21L26.81 47.16a2.84 2.84 0 0 0 2.1.89A2.87 2.87 0 0 0 31 47.16l30.05-30a2.93 2.93 0 0 0 0-4.21Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\")"
        : "url(\"data:image/svg+xml,%3Csvg fill='%23000000' viewBox='0 -8 72 72' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' strokeWidth='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3Echeck%3C/title%3E%3Cpath d='M61.07 12.9 57 8.84a2.93 2.93 0 0 0-4.21 0L28.91 32.73 19.2 23A3 3 0 0 0 15 23l-4.06 4.07a2.93 2.93 0 0 0 0 4.21L26.81 47.16a2.84 2.84 0 0 0 2.1.89A2.87 2.87 0 0 0 31 47.16l30.05-30a2.93 2.93 0 0 0 0-4.21Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\")",
    content: '""',
  },
}));

const CusCheckboxLabel = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.6rem",
          marginBottom: "0.6rem",
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
                icon={props.soft ? <BpIcon color={props.color} /> : undefined}
                checkedIcon={props.soft ? <BpCheckedIcon color={props.color} /> : undefined}
                checked={props.value === "Y" ? true : false}
                onChange={(e) => props.onChangeEvent(e)}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: props.fontSize },
                }} />
            } />
        </FormGroup>
        {props.error ? <FormHelperText>{props.helperText}</FormHelperText> : null}
      </div>
    </React.Fragment >
  );
}

CusCheckboxLabel.defaultProps = {
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

CusCheckboxLabel.prototype = {
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
const CusCheckboxIcon = (props) => {
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
            sx={{ '& .MuiSvgIcon-root': { fontSize: props.fontSize } }} />
        }
      />
    </FormGroup>
  );
}

CusCheckboxIcon.defaultProps = {
  icon: '',
  checkedIcon: '',
  disabled: false,
  color: "primary",
  style: {},
  value: '',
  fontSize: 21
};

CusCheckboxIcon.prototype = {
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

const CusCheckboxBasic = (props) => {

  const checkInputData = (e) => {
    e.target.name = props.name;
    props.onChangeEvent(e);
  }

  return (
    <Checkbox
      disableRipple
      id={props.id}
      color={props.color}
      disabled={props.disabled}
      icon={props.soft ? <BpIcon color={props.color} /> : undefined}
      checkedIcon={props.soft ? <BpCheckedIcon color={props.color} /> : undefined}
      checked={props.value === "Y" ? true : false}
      onChange={(e) => checkInputData(e)}
      sx={{ '& .MuiSvgIcon-root': { fontSize: props.fontSize } }}>
    </Checkbox>
  )
}
CusCheckboxBasic.defaultProps = {
  disabled: false,
  soft: false,
  value: '',
  id: '',
  checked: '',
  fontSize: 21,
  color: "primary"
};

CusCheckboxBasic.prototype = {
  disabled: PropTypes.bool,
  soft: PropTypes.bool,
  value: PropTypes.string,
  checked: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
};
export { CusCheckboxLabel, CusCheckboxIcon, CusCheckboxBasic }