import * as React from 'react';
import Variables from "../scss/App.css";
import { styled } from '@mui/material/styles';
import { Box, tooltipClasses } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { CusTextIconButton, CusTextIconButtonProps } from './CusButtonTS';

const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

export interface HtmlTooltipProps extends TooltipProps {
  className?: string;
  status?: string;
}

/**
 * HTML Tooltip
 * @param {string}  title      標題  
 * @param {node}    content    HTML內容
 * @param {string}  type       樣式類型 ex: button || icon
 * @param {string}  icon       icon 圖標
 * @param {string}  placement  內容位置
 */

export const HtmlTooltip = styled(({ className, status, ...props }: HtmlTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    padding: "10px",
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: Variables[status + "__Default"],
    fontSize: theme.typography.pxToRem(12),
    borderRadius: "10px",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },
}));

export type CusHtmlTooltipProps = {
  title: string,
  type: "button" | "icon",
  content: React.ReactNode,
  icon: React.ReactNode,
  placement?: TooltipProps['placement'],
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & CusTextIconButtonProps

export const CusHtmlTooltip = (props: CusHtmlTooltipProps) => {
  const { placement, content, type, icon, fullWidth, className, disabled, style, variant, color, title, size, startIcon, endIcon, onClick } = props;
  return (
    <HtmlTooltip
      title={content}
      placement={placement}>
      <Box>
        {type === "button" ?
          <CusTextIconButton
            fullWidth={fullWidth}
            className={className}
            disabled={disabled}
            style={style}
            variant={variant}
            color={color}
            onClick={onClick}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            text={title} />
          : <Box>{icon}</Box>}
      </Box>
    </HtmlTooltip>
  )
};