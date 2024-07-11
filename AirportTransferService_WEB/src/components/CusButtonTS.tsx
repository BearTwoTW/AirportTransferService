import React, { useState } from 'react';
import { IconButton, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import Button, { ButtonOwnProps, ButtonProps } from '@mui/material/Button';
import { DeleteForever } from '@mui/icons-material';

// TODO：以下樣式寫法先參照CusButton.js
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

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
// IconButton 樣式
const iconButtonSX = {
    margin: "0.6rem 0.5rem 0.6rem 0.5rem",
    width: "29px",
    height: "29px",
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


/** 檔案匯入
 * @description 檔案匯入
 * @param buttonName 按鈕名稱
 * @param color      顏色
 * @param file       檔案
 * @param addFile    新增檔案
 * @param clearFile  清除檔案
 */
export type CusFileImportProps = {
    buttonName: string;
    variant: "outlined" | "contained"
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    file: File | null;
    addFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearFile: () => void;
}

/** 檔案匯入
 * @description 檔案匯入
 * @param props 
 */
export const CusFileImport = (props: CusFileImportProps) => {
    const { buttonName, variant, color, file, addFile, clearFile } = props;

    // 檔案匯入的input太醜，所以要隱藏input
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <React.Fragment>
            <Button
                component="label"
                sx={buttonSX}
                variant={variant}
                color={color}
            >
                {buttonName}
                <VisuallyHiddenInput type="file"
                    onChange={addFile}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </Button>
            {file &&
                <React.Fragment>
                    <span>{file.name}</span>
                    <IconButton onClick={clearFile} sx={{ margin: "0rem" }} >
                        <DeleteForever />
                    </IconButton>
                </React.Fragment>}
        </React.Fragment>
    )
};

/**
 * @description ToggleButton組件props
 * @param {string} name                           當前值
 * @param {string} value                          當前值
 * @param {CusToggleButtonTSButtons[]} buttonsArr 按鈕們
 * @param {function} onChangeEvent                改變事件
 */
export type CusToggleButtonTSProps = {
    name: string;
    value: string;
    buttonsArr: CusToggleButtonTSButtons[];
    onChangeEvent: (e: React.MouseEvent<HTMLElement>) => void;
};

/** ToggleButton
 * @description ToggleButton組件props => info
 * @param {string} name  按鈕名稱
 * @param {string} value 按鈕值
 */
export type CusToggleButtonTSButtons = {
    name: string;
    value: string;
};

/** ToggleButton
 * @description ToggleButton組件
 * @param props CusToggleButtonTSProps
 * @returns 
 */
export const CusToggleButtonTS = (props: CusToggleButtonTSProps) => {
    const { name, value, buttonsArr, onChangeEvent } = props;
    console.log('props value', value)
    const [alignment, setAlignment] = useState(value);

    const handleChange = (
        // e: React.MouseEvent<HTMLElement>,
        e: any,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);

        e.target.name = name;
        e.target.value = newAlignment;

        onChangeEvent(e);
    };

    return (
        <ToggleButtonGroup
            sx={{
                margin: "0.6rem 0.5rem 0.6rem 0.5rem"
            }}
            color="primary"
            value={alignment}
            exclusive={true}
            onChange={handleChange}
            aria-label="Platform"
            size="small"
        >
            {buttonsArr.map((bts, index) => (<ToggleButton key={index} value={bts.value}>{bts.name}</ToggleButton>))}
        </ToggleButtonGroup>
    );
};

/** Icon文字
 * @description Icon文字
 */
export type CusTextIconButtonProps = {
    className?: string,
    fullWidth?: boolean,
    disabled?: boolean,
    style?: React.CSSProperties,
    variant: ButtonOwnProps["variant"],
    color: ButtonOwnProps["color"],
    text?: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    size?: ButtonOwnProps["size"]
};

/** Icon文字
 * @description Icon文字
 */
export type CusTextIconButtonEvent = {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & CusTextIconButtonProps

/** Icon文字 按鈕
 * Icon文字 按鈕
 * @param className  class名稱
 * @param disabled   是否禁用
 * @param margin     間距
 * @param onClick    觸發事件
 * @param style      樣式
 * @param variant    輸入框樣式
 * @param icon       icon
 * @param color      顏色
 * @param text       文字
 * @param startIcon  文字
 */
export const CusTextIconButton = (props: CusTextIconButtonEvent) => {
    const { fullWidth, className, disabled, style, variant, color, text, size, startIcon, endIcon, onClick } = props

    return (
        <Button
            sx={buttonSX}
            fullWidth={fullWidth}
            className={className}
            disabled={disabled}
            style={style}
            variant={variant}
            color={color}
            onClick={onClick}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}>
            {text}
        </Button>
    )
}

/** 純 Icon 按鈕
 * @description 只有Icon
 */
export type CusIconButtonProps = {
    className?: string,
    disabled?: boolean,
    style?: React.CSSProperties,
    color: ButtonOwnProps["color"],
    icon: React.ReactNode,
    size?: ButtonOwnProps["size"]
}

/** 純 Icon 按鈕
 * @description 只有Icon
 */
export type CusIconButtonEvent = {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & CusIconButtonProps

/** 純 Icon 按鈕
 * @param className  class名稱
 * @param disabled   是否禁用
 * @param margin     間距
 * @param onClick    觸發事件
 * @param style      樣式
 * @param icon       icon
 * @param color      顏色
 * @param size       大小 ，small、large
 */
export const CusIconButton = (props: CusIconButtonEvent) => {
    const { className, disabled, style, color, size, onClick, icon } = props
    return (
        <IconButton
            sx={iconButtonSX}
            className={className}
            disabled={disabled}
            color={color ?? "primary"}
            size={size ?? "small"}
            onClick={onClick}>
            {icon}
        </IconButton>
    )
}
/** 純文字按鈕
 * @description 純文字按鈕
 */
export type CusTextButtonProps = {
    className?: string
    disabled?: boolean
    style?: React.CSSProperties
    color: ButtonOwnProps["color"]
    icon?: React.ReactNode
    size?: ButtonOwnProps["size"]
    fullWidth?: boolean
    variant?: ButtonOwnProps["variant"]
    text: string,
    html?: React.ReactNode
    autoFocus?: boolean
}

/** 純文字按鈕
 * @description 純文字按鈕
 */
export type CusTextButtonEvent = {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & CusTextButtonProps

/**
 * 純文字按鈕
 * @param {bool}    className  class名稱
 * @param {bool}    disabled   是否禁用
 * @param {func}    onClick    觸發事件
 * @param {object}  style      樣式
 * @param {object}  variant    輸入框樣式，EX:filled、outlined、standard
 * @param {string}  color      顏色
 * @param {string}  text       文字
 * @param {string}  size       大小 ，EX:small、medium、large
 */
export const CusTextButton = (props: CusTextButtonEvent) => {
    const { autoFocus, fullWidth, className, disabled, style, variant, color, onClick, size, text, html } = props
    return (
        <Button
            autoFocus={autoFocus ?? false}
            sx={buttonSX}
            fullWidth={fullWidth ?? false}
            className={className}
            disabled={disabled ?? false}
            style={style}
            variant={variant ?? "contained"}
            color={color ?? "primary"}
            onClick={onClick}
            size={size ?? "medium"}>
            {text}
            {html}
        </Button>
    )
}