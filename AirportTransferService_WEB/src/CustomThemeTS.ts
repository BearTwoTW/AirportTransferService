import { dark } from "@mui/material/styles/createPalette";
import Variables from "../src/scss/App.css";

sessionStorage.setItem("company_code", "ATS");
const status = sessionStorage.getItem("themeStatus") ? sessionStorage.getItem("themeStatus") : "LightON";
/**
 * 切換主題
 * @param {string} status ["LightON", "LightOFF", "ECC","Utility"]
 * @description [Primary,Secondary,Error,Warning,Info,Success]，這些Default values一定要有[light,main,dark]
 * @param {object} Variables 裡面包含 "_variables.scss" 的參數
 * @param {object} Utility 開頭為通用參數，其餘為主題專用參數
 */

/**
 * @author Yu
 * @date 2023/12/1
 * @description
 * 1. 因為defaultTheme裡面的palette的default跟soft，不是原本palette中存在的，是額外新增宣告的
 * 2. ts內要另外宣告一個interface，去繼承上述客製的樣式
 * 3. 不然外部使用時，會吃不到defaultTheme裡面的default跟soft
 */
declare module "@mui/material/styles" {
    /**
     * @description 客製化主題
     * @param {string} light 主題淺色
     * @param {string} dark 主題深色
     * @param {string} lightHover 主題淺色hover
     * @param {string} darkHover 主題深色hover
     */
    export interface CusTheme {
        light: string;
        dark: string;
        lightHover: string;
        darkHover: string;
    }

    /**
     * @description soft
     * @param {CusTheme} soft 感覺浮起來的樣式
     */
    export interface CusSoft {
        soft: CusTheme;
    }

    /**
     * @description default
     * @param {CusTheme} default 預設樣式
     */
    export interface CusDefault {
        default: CusTheme;
    }

    // 以下要去繼承上述客製的樣式
    interface Palette extends CusSoft { }
    interface PaletteOptions extends CusSoft { }

    interface Palette extends CusDefault { }
    interface PaletteOptions extends CusDefault { }
}

/**
 * @description 客製化主題設定
 */
export const CusThemeTS = (() => {
    const labelFontSize = "1.3rem";
    // 前台顏色(需跟 tailwind.config.js 內的顏色相同)
    const primary = "#F0BF1B"
    const secondary = "#192F64"
    const success = ""
    const info = "#000000"
    const secInfo = "#AAAAAA"
    const headerInfo = "#000000"
    const footerInfo = "#000000"
    const warning = ""
    const error = "#EF444A"

    /**
     * webTheme // 前台樣式
     */
    const webTheme = {
        palette: {
            primary: {
                light: primary,
                main: primary,
            },
            secondary: {
                light: secondary,
                main: secondary,
            },
            // success: {

            // },
            info: {
                light: info,
                main: info,
            },
            secInfo: {
                light: secInfo,
                main: secInfo,
            },
            error: {
                light: error,
                main: error,
            },
            headerInfo: {
                light: headerInfo,
                main: headerInfo,
            },
            footerInfo: {
                light: footerInfo,
                main: footerInfo,
            },
            // warning: {

            // },
            // danger: {

            // }
        },
        typography: {
            fontFamily: ["noto sans tc", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"'].join(","),
        },
        components: {
            // Paper
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "0",
                        background: "#fff",
                    },
                },
            },
            // Button
            MuiButton: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        transition: "transform .2s ease",
                        borderRadius: "6px",
                        [`&:hover`]: {
                            boxShadow: "none",
                        },
                        [`&.active, :active`]: {
                            boxShadow: "none",
                            transform: "scale(.98)",
                        },
                        [`&.MuiButton-containedPrimary`]: {
                            backgroundColor: primary,
                            // color: info,
                        },
                        [`&.MuiButton-containedSecondary`]: {
                            backgroundColor: secondary,
                            // color: info,
                        },
                        [`&.MuiButton-outlinedPrimary`]: {
                            // borderColor: "#ede2cf",
                            // color: "#ede2cf",
                            // [`&:hover`]: {
                            //     backgroundColor: "unset",
                            // },
                        },
                        [`&.MuiButton-outlinedSecondary`]: {
                            // borderColor: "#eeeeee",
                            // color: "#eeeeee",
                            // [`&:hover`]: {
                            //     backgroundColor: "unset",
                            // },
                        },
                    },
                },
            },
            // IconButton
            MuiIconButton: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        [`&:hover`]: {
                            boxShadow: "none",
                            opacity: "0.7"
                        },
                        [`&.active, :active`]: {
                            boxShadow: "none",
                            transform: "scale(.90)",
                        },
                    },
                },
            },
            // Input
            MuiInput: {
                styleOverrides: {
                    root: {
                        [`&.Mui-focused fieldset`]: {
                            // borderColor: "black",
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        padding: "9px 14px", // 設置您想要的 padding 值
                    },
                },
            },
            // Checkbox
            MuiCheckbox: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        [`&.MuiCheckbox-colorPrimary`]: {
                            [`&.Mui-checked`]: {
                                color: primary,
                            },
                        },
                        [`&.MuiCheckbox-colorSecondary`]: {
                            [`&.Mui-checked`]: {
                                color: secondary,
                            },
                        },
                    },
                },
            },
            // Tab
            MuiTab: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        [`&.MuiTab-root`]: {
                            // color: "#E0BE36",
                        },
                        [`&.MuiTab-labelIcon`]: {
                            // padding: "0",
                        },
                        [`&.Mui-selected`]: {
                            // color: "#000000",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .3s ease",
                            transform: "scale(.9)",
                            boxShadow: "none",
                        },
                    },
                },
            },
            // Tabs
            MuiTabs: {
                styleOverrides: {
                    root: {
                        [`& .MuiTabs-root`]: {
                            padding: "0",
                        },
                    },
                },
            },
            // Drawer
            MuiDrawer: {
                styleOverrides: {
                    root: {
                        flexShrink: 0,
                        zIndex: { xs: "998" },
                        [`&.left`]: {
                            [`& .MuiDrawer-paper`]: {
                                position: "relative",
                                width: "350px",
                                borderRadius: "0",
                                backgroundColor: "#fff",
                                color: Variables[status + "__DrawerColor"],
                                boxSizing: "border-box",
                                border: "none",
                            },
                        },
                        [`&.top`]: {
                            width: "300px",
                            left: "unset",
                            top: "96px",
                            [`& .MuiDrawer-paper`]: {
                                position: "relative",
                                width: "300px",
                                borderRadius: "0",
                                backgroundColor: "#fff",
                                color: Variables[status + "__DrawerColor"],
                                boxSizing: "border-box",
                                border: "none",
                            },
                        },
                    },
                },
            },
            // DatePicker
            MuiPickersCalendarHeader: {
                styleOverrides: {
                    switchViewButton: {
                        [`&:hover`]: {
                            boxShadow: "none",
                        },
                    },
                },
            },
            MuiPickersYear: {
                // 年份樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    yearButton: {
                        [`&:hover`]: {
                            transition: "all .3s ease",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: primary,
                            },
                            [`&:hover`]: {
                                background: primary,
                            },
                            color: headerInfo,
                            backgroundColor: primary,
                            fontWeight: "bold",
                        },
                    },
                },
            },
            MuiPickersMonth: {
                // 月份樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    monthButton: {
                        [`&:hover`]: {
                            transition: "all .3s ease",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: primary,
                            },
                            [`&:hover`]: {
                                background: primary,
                            },
                            color: headerInfo,
                            backgroundColor: primary,
                            fontWeight: "bold",
                        },
                    },
                },
            },
            MuiPickersDay: {
                // 日期樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        [`&.MuiPickersDay-today`]: {
                            background: "none",
                        },
                        [`&:hover`]: {
                            transition: "all .3s ease",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: primary,
                            },
                            [`&:hover`]: {
                                background: primary,
                            },
                            color: headerInfo,
                            backgroundColor: primary,
                            fontWeight: "bold",
                        },
                    },
                },
            },
        },
    };

    /**
     * defaultTheme // 後台樣式
     */
    const defaultTheme = {
        palette: {
            default: {
                light: Variables[status + "__DefaultLight"],
                main: Variables[status + "__Default"],
                dark: Variables[status + "__DefaultDark"],
                contrastText: Variables[status + "__DefaultContrastText"],
            },
            primary: {
                light: Variables[status + "__PrimaryLight"],
                main: Variables[status + "__Primary"],
                dark: Variables[status + "__PrimaryDark"],
                contrastText: Variables[status + "__PrimaryContrastText"],
            },
            secondary: {
                light: Variables[status + "__SecondaryLight"],
                main: Variables[status + "__Secondary"],
                dark: Variables[status + "__SecondaryDark"],
                contrastText: Variables[status + "__SecondaryContrastText"],
            },
            success: {
                light: Variables[status + "__BtnSuccessLight"],
                main: Variables[status + "__BtnSuccess"],
                dark: Variables[status + "__BtnSuccessDark"],
                contrastText: Variables[status + "__BtnSuccessContrastText"],
            },
            info: {
                light: Variables[status + "__BtnInfoLight"],
                main: Variables[status + "__BtnInfo"],
                dark: Variables[status + "__BtnInfoDark"],
                contrastText: Variables[status + "__BtnInfoContrastText"],
            },
            warning: {
                light: Variables[status + "__BtnWarningLight"],
                main: Variables[status + "__BtnWarning"],
                dark: Variables[status + "__BtnWarningDark"],
                contrastText: Variables[status + "__BtnWarningContrastText"],
            },
            error: {
                light: Variables[status + "__BtnErrorLight"],
                main: Variables[status + "__BtnError"],
                dark: Variables[status + "__BtnErrorDark"],
                contrastText: Variables[status + "__BtnErrorContrastText"],
            },
            soft: {
                light: Variables[status + "__BoxShadowLight"],
                dark: Variables[status + "__BoxShadowDark"],
                lightHover: Variables[status + "__boxShadowHoverLight"],
                darkHover: Variables[status + "__boxShadowHoverDark"],
            },
        },
        shape: {
            borderRadius: parseInt(Variables[status + "__borderRadius"]),
            UtilityBorderRadius: parseInt(Variables["Utility__borderRadius"]),
        },
        footer: {
            backgroundColor: Variables[status + "__FooterBackgroundColor"],
            height: parseInt(Variables[status + "__FooterHeight"]),
        },
        navBar: {
            height: parseInt(Variables["Utility__LogoHeight"]),
        },
        sidebar: {
            textColor: Variables[status + "__SidebarTextColor"],
        },
        dialog: {
            textColor: Variables[status + "__DialogWarningText"],
        },
        outlet: {
            backgroundColor: Variables[status + "__MainOutletBackgroundColor"],
            secBackgroundColor: Variables[status + "__MainSecOutletBackgroundColor"],
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        color: Variables[status + "__DefaultContrastText"],
                        backgroundColor: Variables[status + "__Default"],
                    },
                    input: {
                        color: Variables[status + "__DefaultContrastText"],
                    },
                },
            },
            // Progress
            MuiLinearProgress: {
                styleOverrides: {
                    root: {},
                },
            },
            // // ButtonBase
            MuiButtonBase: {
                defaultProps: {
                    // disableRipple: true, // 取消點擊波紋效果
                },
            },
            // Button
            MuiButton: {
                defaultProps: {
                    // disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        // Button本體於CusButton.js內調整
                        // Pagination btn
                        [`&.Pagination__btn`]: {
                            boxShadow: "none",
                        },
                        // navBar btn
                        [`&.MuiButton-text`]: {
                            color: Variables[status + "__DefaultContrastText"],
                            backgroundColor: "#FFFFFF",
                            [`&Primary`]: {
                                [`&.WebHeader__button`]: {
                                    [`&:hover`]: {
                                    },
                                    [`&.active, :active`]: {
                                        backgroundColor: "rgba(0,0,0,0.05)",
                                        [`span`]: {
                                            marginTop: "1px",
                                            color: Variables[status + "__Secondary"],
                                        },
                                        fontWeight: "bold",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // IconButton
            MuiIconButton: {
                defaultProps: {
                    // disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        // Button本體於CusButton.js內調整
                    },
                },
            },
            // MuiButtonGroup
            MuiButtonGroup: {
                defaultProps: {
                    // disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        borderRadius: "15px",
                    },
                },
            },
            // Toggle Button
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                    },
                },
            },
            MuiToggleButton: {
                defaultProps: {
                    // disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        [`&.Mui-selected`]: {
                            color: Variables[status + "__Secondary"],
                        },
                    },
                },
            },
            // ListItemButton
            MuiListItemButton: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
            },
            // Switch
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: "40px",
                        height: "24px",
                        padding: "0",
                        margin: "4px",
                        borderRadius: "50px",
                        [`& .MuiSwitch-switchBase`]: {
                            padding: "0",
                            margin: "2px",
                            transitionDuration: "300ms",
                            [`&.Mui-checked`]: {
                                transform: "translateX(16px)",
                                color: "#fff",
                                [`& + .MuiSwitch-track`]: {
                                    opacity: "1",
                                    border: "0",
                                },
                                [`&.Mui-disabled + .MuiSwitch-track`]: {
                                    opacity: "0.5",
                                },
                            },
                            [`&.Mui-focusVisible .MuiSwitch-thumb`]: {
                                color: "#33cf4d",
                                border: "6px solid #fff",
                            },
                            [`&.Mui-disabled + .MuiSwitch-track`]: {
                                backgroundColor: Variables[status + "__DisabledColor"],
                            },
                        },
                        [`& .MuiSwitch-thumb`]: {
                            boxSizing: "border-box",
                            width: "20px",
                            height: "20px",
                        },
                        [`& .MuiSwitch-track`]: {
                            borderRadius: "15px",
                            backgroundColor: "#D4D5D8",
                            opacity: ".5",
                        },
                    },
                },
            },
            // Checkbox
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        [`&.Mui-disabled`]: {
                            color: Variables[status + "__DisabledColor"],
                        },
                        [`&.MuiCheckbox-colorPrimary`]: {
                            [`&.Mui-checked`]: {
                                color: Variables[status + "__Primary"],
                            },
                        },
                    },
                },
            },
            // Tab
            MuiTab: {
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        [`:hover`]: {
                            color: Variables[status + "__Secondary"],
                        },
                        [`&.MuiTab-root`]: {
                            zIndex: "1",
                        },
                        [`&.MuiTab-labelIcon`]: {
                            padding: "0",
                        },
                        [`&.Mui-selected`]: {
                            color: Variables[status + "__Secondary"],
                        },
                    },
                },
            },
            // Tabs
            MuiTabs: {
                styleOverrides: {
                    root: {
                        margin: "0 0 1.5rem 0",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        [`& .MuiTabs-root`]: {
                            padding: "0",
                        },
                        [`& .MuiTabs-indicator`]: {
                            position: 'absolute',
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "70%",
                            borderRadius: "10px",
                            backgroundColor: "rgba(0,0,0,0.05)",
                        },
                        [`& .MuiTabs-scrollButtons.Mui-disabled`]: {
                            opacity: "0.3",
                        }
                    },
                },
            },
            // Table
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: Variables[status + "__TableHeadBackgroundColor"],
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        [`&.MuiTableContainer-root`]: {
                            backgroundColor: Variables[status + "__Default"],
                            borderRadius: "10px",
                        },
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        [`&.MuiTableRow-root`]: {
                            border: "none",
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        // borderBottom: `10px solid ${Variables[status + "__Default"]}`,
                        padding: "10px",
                        [`&.MuiTableCell-head`]: {
                            color: Variables[status + "__TableHeadColor"],
                            whiteSpace: "nowrap",
                            [`& .MuiCheckbox-root.MuiCheckbox-color`]: {
                                [`&Primary`]: {
                                    color: "#fff",
                                    [`&.Mui-checked`]: {
                                        color: "#fff",
                                    },
                                },
                                [`&Secondary`]: {
                                    color: "#fff",
                                    [`&.Mui-checked`]: {
                                        color: "#fff",
                                    },
                                },
                            },
                            [`& .MuiCheckbox-root`]: {
                                padding: "0px 5px",
                            },
                        },
                        [`& .MuiCheckbox-root`]: {
                            padding: "0px 5px",
                        },
                        [`& .MuiAutocomplete-root`]: {
                            margin: "0px",
                            [`& .MuiFormControl-root`]: {
                                margin: "0px",
                            },
                        },
                    },
                },
            },
            MuiTablePagination: {
                styleOverrides: {
                    root: {
                        [`& .MuiToolbar-root .MuiInputBase-colorPrimary`]: {
                            margin: "0",
                        },
                        [`& .MuiTablePagination-displayedRows`]: {
                            display: "none",
                        },
                    },
                },
            },
            // MuiTooltip
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        borderRadius: "3px",
                    },
                },
            },
            // Stepper
            MuiStepIcon: {
                styleOverrides: {
                    root: {
                        [`&.MuiStepIcon-root`]: {
                            borderRadius: "20px",
                        },
                        [`&.Mui-active`]: {
                            borderRadius: "20px",
                        },
                        [`&.Mui-completed`]: {
                            color: Variables[status + "__Secondary"],
                        },
                    },
                },
            },
            // Input
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        [`&.MuiInputBase-root`]: {
                            backgroundColor: "#FFFFFF",
                            borderRadius: "10px",
                        },
                        [`&.MuiOutlinedInput-root.Mui-disabled`]: {
                            [`& fieldset`]: {
                                border: `1px solid ${Variables[status + "__DisabledColor"]}`,
                            },
                        },
                    },
                    input: {
                        [`&.MuiOutlinedInput-input.Mui-disabled`]: {
                            // WebkitTextFillColor: "rgba(0, 0, 0, 0.12)",
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        [`& > fieldset > legend`]: {
                            fontSize: `calc(0.75 * ${labelFontSize})`,
                        },
                    },
                },
            },
            // Drawer
            MuiDrawer: {
                styleOverrides: {
                    root: {
                        flexShrink: 0,
                        zIndex: { xs: "998" },
                        [`&.SystemDrawer`]: {
                            width: "200px",
                            [`& .MuiDrawer-paper`]: {
                                position: "relative",
                                width: "200px",
                                borderRadius: "0",
                                backgroundColor: "#f5f6fa",
                                color: Variables[status + "__DrawerColor"],
                                boxSizing: "border-box",
                                border: "none",
                            },
                        },
                        [`&.WebDrawer3`]: {
                            [`&.left`]: {
                                width: "350px",
                                [`& .MuiDrawer-paper`]: {
                                    position: "relative",
                                    width: "350px",
                                    borderRadius: "0",
                                    backgroundColor: "#FFFFFF",
                                    color: Variables[status + "__DrawerColor"],
                                    boxSizing: "border-box",
                                    border: "none",
                                },
                            },
                            [`&.top`]: {
                                width: "250px",
                                [`& .MuiDrawer-paper`]: {
                                    position: "relative",
                                    width: "250px",
                                    borderRadius: "0",
                                    backgroundColor: "#FFFFFF",
                                    color: Variables[status + "__DrawerColor"],
                                    boxSizing: "border-box",
                                    border: "none",
                                },
                            },
                        },
                    },
                },
            },
            // Paper
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        color: Variables[status + "__Primary"],
                    },
                },
            },
            // Card
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        backgroundColor: Variables[status + "__Default"],
                        color: Variables[status + "__Primary"],
                    },
                },
            },
            // Breadcrumbs
            MuiBreadcrumbs: {
                styleOverrides: {
                    root: {
                        color: Variables[status + "__DefaultContrastText"],
                        background: Variables[status + "__BreadcrumbsBackground"],
                        height: parseInt(Variables[status + "__BreadcrumbsHeight"]),
                    },
                },
            },
            // Divider
            MuiDivider: {
                styleOverrides: {
                    root: {
                        display: "block",
                        width: "100%",
                    },
                },
            },
            // FormLabel
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        [`&.MuiInputLabel-root span`]: {
                            color: Variables[status + "__DefaultContrastText"],
                        },
                        [`&.MuiInputLabel-root.MuiInputLabel-shrink`]: {
                            fontSize: labelFontSize,
                        },
                        [`&.MuiInputLabel-root.Mui-disabled`]: {
                            color: Variables[status + "__DefaultContrastText"],
                        },
                    },
                },
            },
            // Alert
            MuiAlert: {
                styleOverrides: {
                    root: {
                        [`&.MuiAlert-standard`]: {
                            [`&Default`]: {
                                color: Variables[status + "__DefaultContrastText"],
                                backgroundColor: Variables[status + "__DefaultLight"],
                                [`& .MuiAlert-icon`]: {
                                    color: Variables[status + "__DefaultContrastText"],
                                },
                            },
                        },
                    },
                },
            },
            // Chip
            MuiChip: {
                styleOverrides: {
                    root: {
                        [`&.MuiChip-filled`]: {
                            [`&Error`]: {
                                color: Variables[status + "__ErrorContrastText"],
                                backgroundColor: Variables[status + "__BtnError"],
                            },
                            [`&Success`]: {
                                color: Variables[status + "__BtnSuccessContrastText"],
                                backgroundColor: Variables[status + "__BtnSuccess"],
                            },
                        },
                        [`&.MuiChip-outlined`]: {
                            [`&Default`]: {
                                backgroundColor: Variables[status + "__DefaultDarkTransparent"],
                            },
                            [`&Primary`]: {
                                backgroundColor: Variables[status + "__PrimaryDarkTransparent"],
                            },
                            [`&Secondary`]: {
                                backgroundColor: Variables[status + "__SecondaryDarkTransparent"],
                            },
                            [`&Warning`]: {
                                backgroundColor: Variables[status + "__WarningDarkTransparent"],
                            },
                            [`&Info`]: {
                                backgroundColor: Variables[status + "__infoDarkTransparent"],
                            },
                            [`&Error`]: {
                                color: Variables[status + "__BtnError"],
                                border: "1px solid " + Variables[status + "__BtnError"],
                                backgroundColor: Variables[status + "__BtnErrorDarkTransparent"],
                            },
                            [`&Success`]: {
                                color: Variables[status + "__BtnSuccess"],
                                border: "1px solid " + Variables[status + "__BtnSuccess"],
                                backgroundColor: Variables[status + "__BtnSuccessDarkTransparent"],
                            },
                        },
                    },
                },
            },
            // DatePicker
            MuiPickersCalendarHeader: {
                styleOverrides: {
                    label: {
                        color: Variables[status + "__DefaultContrastText"],
                    },
                    switchViewButton: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&:hover`]: {
                            boxShadow: "none",
                        },
                    },
                },
            },
            MuiPickersYear: {
                // 年份樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    yearButton: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&:hover`]: {
                            transition: "all .3s ease",
                            background: "none",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: "none",
                            },
                            [`&:hover`]: {
                                background: "none",
                            },
                            color: Variables[status + "__Secondary"],
                            backgroundColor: Variables[status + "__Default"],
                            fontWeight: "bold",
                        },
                    },
                },
            },
            MuiPickersMonth: {
                // 月份樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    monthButton: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&:hover`]: {
                            transition: "all .3s ease",
                            background: "none",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: "none",
                            },
                            [`&:hover`]: {
                                background: "none",
                            },
                            color: Variables[status + "__Secondary"],
                            backgroundColor: Variables[status + "__Default"],
                            fontWeight: "bold",
                        },
                    },
                },
            },
            MuiPickersDay: {
                // 日期樣式
                defaultProps: {
                    disableRipple: true, // 取消點擊波紋效果
                },
                styleOverrides: {
                    root: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&.MuiPickersDay-today`]: {
                            background: "none",
                            border: `1px solid ${Variables[status + "__Primary"]}`,
                        },
                        [`&:hover`]: {
                            transition: "all .3s ease",
                            background: "none",
                        },
                        [`&.active, :active`]: {
                            transition: "transform .1s ease",
                            transform: "scale(.95)",
                            fontWeight: "bold",
                        },
                        [`&.Mui-selected`]: {
                            [`&:focus`]: {
                                background: "none",
                            },
                            [`&:hover`]: {
                                background: "none",
                            },
                            color: Variables[status + "__Secondary"],
                            backgroundColor: Variables[status + "__Default"],
                            fontWeight: "bold",
                        },
                    },
                },
            },
            MuiDateTimePicker: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                    },
                },
            },
            MuiDateTimePickerToolbar: {
                styleOverrides: {
                    root: {
                        [`&.MuiPickersToolbar-root *`]: {
                            boxShadow: "none",
                        },
                    },
                },
            },
            MuiDateTimePickerTabs: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        [`&.MuiDateTimePickerTabs-root *`]: {
                            boxShadow: "none",
                        },
                    },
                },
            },
            MuiClock: {
                styleOverrides: {
                    root: {
                        [`&.MuiClock-root > *`]: {
                            backgroundColor: Variables[status + "__Default"],
                        },
                        [`&.MuiClockPointer-root`]: {
                            backgroundColor: "red",
                        },
                    },
                },
            },
        },
    };
    return { defaultTheme, webTheme };
})();
