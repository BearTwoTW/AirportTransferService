import React from 'react';
import { Button, IconButton, ToggleButtonGroup, ToggleButton, ButtonGroup, buttonClasses } from '@mui/material';
import PropTypes from 'prop-types';

import { createTheme } from "@mui/material/styles";
import { CusThemeTS } from '../CustomThemeTS';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

// const theme = createTheme(CusThemeTS.defaultTheme);

// Button 樣式
const buttonSX = {
  margin: "0.6rem 0.5rem 0.6rem 0.5rem",
  borderRadius: "10px",
  // button contained
  [`&.MuiButton-contained`]: {
    // Default
    [`&.MuiButton-containedDefault`]: {
      color: Variables[status + "__DefaultContrastText"],
    },
    // Primary
    [`&.MuiButton-containedPrimary`]: {
      color: Variables[status + "__PrimaryContrastText"],
      [`&:hover`]: {

      },
    },
    // Secondary
    [`&.MuiButton-containedSecondary`]: {
      color: Variables[status + "__SecondaryContrastText"],
      [`&:hover`]: {

      },
    },
    // Success
    [`&.MuiButton-containedSuccess`]: {
      color: Variables[status + "__SuccessContrastText"],
      [`&:hover`]: {

      },
    },
    // Info
    [`&.MuiButton-containedInfo`]: {
      color: Variables[status + "__InfoContrastText"],
      [`&:hover`]: {

      },
    },
    // Warning
    [`&.MuiButton-containedWarning`]: {
      color: Variables[status + "__WarningContrastText"],
      [`&:hover`]: {

      },
    },
    // Error
    [`&.MuiButton-containedError`]: {
      color: Variables[status + "__ErrorContrastText"],
      [`&:hover`]: {

      },
    },
    // button disabled
    [`&:disabled`]: {
      color: Variables[status + "__DisabledTextColor"],
    },
  },
  // button outlined
  [`&.MuiButton-outlined`]: {
    // Primary
    [`&.MuiButton-outlinedPrimary`]: {
      color: Variables[status + "__Primary"],
      border: `1px solid ${Variables[status + "__Primary"]}`,
    },
    // Secondary
    [`&.MuiButton-outlinedSecondary`]: {
      color: Variables[status + "__Secondary"],
      border: `1px solid ${Variables[status + "__Secondary"]}`,
    },
    // Success
    [`&.MuiButton-outlinedSuccess`]: {
      color: Variables[status + "__BtnSuccess"],
      border: `1px solid ${Variables[status + "__BtnSuccess"]}`,
    },
    // Info
    [`&.MuiButton-outlinedInfo`]: {
      color: Variables[status + "__BtnInfo"],
      border: `1px solid ${Variables[status + "__BtnInfo"]}`,
    },
    // Warning
    [`&.MuiButton-outlinedWarning`]: {
      color: Variables[status + "__BtnWarning"],
      border: `1px solid ${Variables[status + "__BtnWarning"]}`,
    },
    // Error
    [`&.MuiButton-outlinedError`]: {
      color: Variables[status + "__BtnError"],
      border: `1px solid ${Variables[status + "__BtnError"]}`,
    },
    // button disabled
    [`&:disabled`]: {
      color: Variables[status + "__DisabledTextColor"],
      border: `1px solid ${Variables[status + "__DisabledColor"]}`,
    },
  }
}
// IconButton 樣式
const iconButtonSX = {
  margin: "0.6rem 0.5rem 0.6rem 0.5rem",
  [`&:hover`]: {
  },
  [`&.active, :active`]: {
    fontWeight: "bold",
  },
  [`&.MuiIconButton-colorPrimary`]: {
    color: Variables[status + "__Primary"],
  },
  [`&.MuiIconButton-colorSecondary`]: {
    color: Variables[status + "__BtnSecondary"]
  },
  [`&.MuiIconButton-colorSuccess`]: {
    color: Variables[status + "__BtnSuccess"]
  },
  [`&.MuiIconButton-colorInfo`]: {
    color: Variables[status + "__BtnInfo"]
  },
  [`&.MuiIconButton-colorWarning`]: {
    color: Variables[status + "__BtnWarning"]
  },
  [`&.MuiIconButton-colorError`]: {
    color: Variables[status + "__BtnError"]
  },
  [`&.Mui-disabled`]: {
    color: "#D4D5D8",
  },
}
// ButtonGroup 樣式
const buttonGroupSX = {
  borderRadius: "10px",
  // button contained
  [`&.MuiButton-contained`]: {
    // Default
    [`&.MuiButton-containedDefault`]: {
      color: Variables[status + "__DefaultContrastText"],
    },
    // Primary
    [`&.MuiButton-containedPrimary`]: {
      color: Variables[status + "__PrimaryContrastText"],
    },
    // Secondary
    [`&.MuiButton-containedSecondary`]: {
      color: Variables[status + "__SecondaryContrastText"],
    },
    // Success
    [`&.MuiButton-containedSuccess`]: {
      color: Variables[status + "__SuccessContrastText"],
    },
    // Info
    [`&.MuiButton-containedInfo`]: {
      color: Variables[status + "__InfoContrastText"],
    },
    // Warning
    [`&.MuiButton-containedWarning`]: {
      color: Variables[status + "__WarningContrastText"],
    },
    // Error
    [`&.MuiButton-containedError`]: {
      color: Variables[status + "__ErrorContrastText"],
    },
    // button disabled
    [`&:disabled`]: {
      color: Variables[status + "__DisabledTextColor"],
    },
  },
  // button outlined
  [`&.MuiButton-outlined`]: {
    // Primary
    [`&.MuiButton-outlinedPrimary`]: {
      color: Variables[status + "__Primary"],
    },
    // Secondary
    [`&.MuiButton-outlinedSecondary`]: {
      color: Variables[status + "__Secondary"],
    },
    // Success
    [`&.MuiButton-outlinedSuccess`]: {
      color: Variables[status + "__BtnSuccess"],
    },
    // Info
    [`&.MuiButton-outlinedInfo`]: {
      color: Variables[status + "__BtnInfo"],
    },
    // Warning
    [`&.MuiButton-outlinedWarning`]: {
      color: Variables[status + "__BtnWarning"],
    },
    // Error
    [`&.MuiButton-outlinedError`]: {
      color: Variables[status + "__BtnError"],
    },
    // button disabled
    [`&:disabled`]: {
      color: Variables[status + "__DisabledTextColor"],
    },
  }
}

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
const CusTextButton = (props) => {

  return (
    <Button
      sx={buttonSX}
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

CusTextButton.defaultProps = {
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

CusTextButton.prototype = {
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
const CusIconButton = (props) => {
  return (
    <IconButton
      sx={iconButtonSX}
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

CusIconButton.defaultProps = {
  className: '',
  disabled: false,
  color: "primary",
  size: 'small',
  icon: '',
};

CusIconButton.prototype = {
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
const CusTextIconButton = (props) => {
  return (
    <Button
      sx={buttonSX}
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

CusTextIconButton.defaultProps = {
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

CusTextIconButton.prototype = {
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
const CusToggleButtonGroup = (props) => {
  const [alignment, setAlignment] = React.useState(props.value);

  const handleChange = (e, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      e.target.value = newAlignment
      e.target.name = props.name
      props.onChangeEvent(e)
    }
  };

  return (
    <ToggleButtonGroup
      sx={{
        margin: "0.6rem 0.5rem 0.6rem 0.5rem"
      }}
      disabled={props.disabled}
      color={props.color}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      size="small">
      {props.buttonsArr.map((ele, seq) => (<ToggleButton key={seq} value={ele.value}>{ele.name}</ToggleButton>))}
    </ToggleButtonGroup>
  )
}

const CusButtonGroup = (props) => {
  const [alignment, setAlignment] = React.useState(props.value);

  const handleChange = (e, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      e.target.value = newAlignment
      e.target.name = props.name
      props.onChangeEvent(e)
    }
  };

  return (
    <ButtonGroup
      sx={{
        margin: "0.6rem 0.5rem 0.6rem 0.5rem"
      }}
      disabled={props.disabled}
      color={props.color}
      value={alignment}
      onChange={handleChange}
      size={props.size}>
      {props.buttonsArr.map((ele, seq) => (
        <Button
          sx={buttonGroupSX}
          variant={props.variant}
          color={props.color}
          key={seq}
          value={ele.value}>
          {ele.name}
        </Button>
      ))
      }
    </ButtonGroup >
  )
}

export {
  buttonSX,
  iconButtonSX,
  CusTextButton,
  CusIconButton,
  CusTextIconButton,
  CusToggleButtonGroup,
  CusButtonGroup
};