import * as React from 'react';
import Variables from "../scss/App.css";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { HelpOutline } from '@mui/icons-material';
import { Box, Tooltip, tooltipClasses } from '@mui/material';
import { CusTextIconButton, CusIconButton } from '../components/CusButton';


const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")
/**
 * HTML Tooltip
 * @param {string}  title      標題  
 * @param {node}    content    HTML內容
 * @param {string}  type       樣式類型 ex: button || icon
 * @param {string}  icon       icon 圖標
 * @param {string}  placement  內容位置
 */

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 800,
        padding: "10px",
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: Variables[status + "__Default"],
        fontSize: theme.typography.pxToRem(12),
        borderRadius: "10px",
        boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    },
}));

const CusHtmlTooltip = (props) => {
    const { type, icon } = props;
    return (
        <HtmlTooltip
            title={props.content}
            placement={props.placement}
        >
            <Box>
                {type === "button" ?
                    <CusTextIconButton
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
                        endIcon={props.endIcon}
                        text={props.title}
                    /> :
                    <Box>
                        {icon}
                    </Box>
                }
            </Box>
        </HtmlTooltip>
    )
};

CusHtmlTooltip.defaultProps = {
    title: "",
    content: "",
    placement: "bottom",
};

CusHtmlTooltip.prototype = {
    title: PropTypes.string,
    content: PropTypes.node,
    placement: PropTypes.string,
};

export { CusHtmlTooltip }