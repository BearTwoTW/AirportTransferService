import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * 純文字按鈕
 * @param {bool}    className  class名稱
 * @param {bool}    disabled   是否禁用
 * @param {string}  margin     間距
 * @param {func}    onClick    觸發事件
 * @param {object}  style      樣式
 * @param {object}  variant    輸入框樣式，EX:filled、outlined、standard
 * @param {string}  color      顏色
 * @param {string}  text       文字
 * @param {string}  size       大小 ，EX:small、medium、large
 */
export const WebTextButton3 = (props) => {
  return (
    <Button
      sx={props.sx}
      fullWidth={props.fullWidth}
      className={props.className}
      disabled={props.disabled}
      margin={props.margin}
      style={props.style}
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
      size={props.size}>
      {props.text}
      {props.html}
    </Button>
  )
}

WebTextButton3.defaultProps = {
  fullWidth: false,
  className: '',
  disabled: false,
  margin: 'normal',
  style: {},
  variant: 'contained',
  color: "primary",
  text: '',
  size: 'medium'
};

WebTextButton3.prototype = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};

/**
 * 純 Icon 按鈕
 * @param {bool}    className  class名稱
 * @param {bool}    disabled   是否禁用
 * @param {string}  margin     間距
 * @param {func}    onClick    觸發事件
 * @param {object}  style      樣式
 * @param {array}   icon       icon
 * @param {string}  color      顏色
 * @param {string}  size       大小 ，small、large
 */
export const WebIconButton3 = (props) => {
  return (
    <IconButton
      sx={props.sx}
      aria-label={props.ariaLabel}
      className={props.className}
      disabled={props.disabled}
      color={props.color}
      size={props.size}
      onClick={props.onClick}>
      {props.icon}
    </IconButton>
  )
}

WebIconButton3.defaultProps = {
  className: '',
  disabled: false,
  color: "primary",
  size: 'small',
  icon: '',
};

WebIconButton3.prototype = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.element,
};

/**
 * Icon文字 按鈕
 * @param {bool}    className  class名稱
 * @param {bool}    disabled   是否禁用
 * @param {string}  margin     間距
 * @param {func}    onClick    觸發事件
 * @param {object}  style      樣式
 * @param {object}  variant    輸入框樣式，filled、outlined、standard
 * @param {array}   icon       icon
 * @param {string}  color      顏色
 * @param {string}  text       文字
 * @param {string}  startIcon       文字
 */
export const WebTextIconButton3 = (props) => {
  return (
    <Button
      sx={props.sx}
      fullWidth={props.fullWidth}
      className={props.className}
      disabled={props.disabled}
      margin={props.margin}
      style={props.style}
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
      size={props.size}
      startIcon={props.startIcon}
      endIcon={props.endIcon}>
      {props.text}
    </Button>
  )
}

WebTextIconButton3.defaultProps = {
  fullWidth: false,
  className: '',
  disabled: false,
  margin: 'normal',
  style: {},
  variant: 'contained',
  color: "primary",
  text: '',
  size: 'medium',
  startIcon: '',
  endIcon: '',
};

WebTextIconButton3.prototype = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
};
