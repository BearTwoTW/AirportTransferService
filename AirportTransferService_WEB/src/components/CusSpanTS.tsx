import { createTheme } from '@mui/material/styles';
import { CusThemeTS } from '../CustomThemeTS';

const theme = createTheme(undefined, CusThemeTS.defaultTheme);

/**
 * @author Yu
 * @date 2023/12/08
 * @description 客製化文字顏色props
 */

/**
 * @description 客製化文字顏色
 * @param {string | number} text 文字
 * @param {"primary" | "secondary" | "error" | "info" | "success" | "warning"} color 顏色
 */
export type CusSpanProps = {
    text: string | number,
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

/**
 * @description 客製化文字顏色
 * @param {CusSpanProps} props props
 * @returns 
 */
export const CusSpan = (props: CusSpanProps) => {
    const { text, color } = props;

    let colorCode: string = "";

    switch (color) {
        case "primary":
            colorCode = theme.palette.primary.main
            break;
        case "secondary":
            colorCode = theme.palette.secondary.main
            break;
        case "error":
            colorCode = theme.palette.error.main
            break;
        case "info":
            colorCode = theme.palette.info.main
            break;
        case "success":
            colorCode = theme.palette.success.main
            break;
        case "warning":
            colorCode = theme.palette.warning.main
            break;
        default:
            colorCode = theme.palette.primary.main
            break;
    }

    return (
        <span style={{ color: colorCode }}>{text}</span>
    );
};