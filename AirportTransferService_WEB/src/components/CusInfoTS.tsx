import React from 'react';
import { HelpOutline } from '@mui/icons-material';
import { Edit, Save } from '@mui/icons-material';
import { CusIconButton } from './CusButtonTS';
import { CusHtmlTooltip, CusHtmlTooltipProps } from './CusTooltipTS';
import { Box } from '@mui/material';
import Typography, { TypographyOwnProps } from '@mui/material/Typography';

export type CusInfoTitleProps = {
  label: string,
  variant?: TypographyOwnProps["variant"],
  info?: boolean,
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  infoContent?: React.ReactNode,
  content?: React.ReactNode,
  status?: boolean,
  edit?: (e: React.MouseEvent<HTMLElement>) => void,
  save?: (e: React.MouseEvent<HTMLElement>) => void,
  buttonType?: "edit" | "save" | "button",
  buttonGroup?: React.ReactNode,
}

/**
 * @description
 * @param {string} label 標題文字內容
 * @param {string} buttonType 右側是否要有按鈕 ex : edit || save
 * @param {string} onClick 按鈕觸發事件
 */

export const CusInfoTitle = (props: CusInfoTitleProps) => {
  const { label, variant, color, info, infoContent, content, status, edit, save, buttonType, buttonGroup } = props;
  return (
    <Box>
      <Typography
        sx={{
          color: "#546b7a",
          fontWeight: "bold",
          borderBottom: `1px solid #cdced1`
        }}
        variant={variant}
        gutterBottom
      >
        <Box style={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box style={{ display: "flex" }}>
            <Box style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: "#546b7a", margin: "6px" }}></Box>
            <Box style={{ marginRight: "4px" }}>{label}</Box>
            {info ?
              <CusHtmlTooltip
                title={label}
                type={"icon"}
                icon={<HelpOutline color={color} />}
                content={infoContent}
                variant={'text'}
                color={"primary"}
                size={'small'} />
              : null}
          </Box>
          {buttonType === "edit" ?
            <Box style={{ display: "flex" }}>
              {status ?
                <Box style={{ animation: "slideInRight 0.5s" }}>
                  <CusIconButton
                    color='secondary'
                    icon={<Save />}
                    onClick={save} />
                </Box>
                : null}
              <CusIconButton
                color='secondary'
                icon={<Edit />}
                onClick={edit} />
            </Box>
            : buttonType === "save" ?
              <CusIconButton
                color='secondary'
                icon={<Save />}
                onClick={save} />
              : buttonType === "button" ?
                <Box>{buttonGroup}</Box> :
                null}
        </Box>
      </Typography>
      <Box style={{ animation: "fade 0.5s" }}>
        {content}
      </Box>
    </Box >
  )
}

CusInfoTitle.defaultProps = {
  variant: "h5",
  info: false,
  color: "secondary",
  content: "",
};

// export const CusInfoContent = (props) => {
//   const { sm, md, lg, label, value, edit, input } = props;
//   return (
//     <Grid item sm={sm} md={md} lg={lg}>
//       <Typography
//         sx={{ color: "black", fontWeight: "bold" }}
//         variant={"h6"}
//         gutterBottom
//       >
//         {label}
//       </Typography>
//       <Box>
//         {edit
//           ? <Box style={{ animation: "fade 0.5s" }}>{input}</Box>
//           : <Typography
//             variant={"body1"}
//             gutterBottom
//           >
//             {value}
//           </Typography>}
//       </Box>
//     </Grid>
//   )
// }

// CusInfoContent.defaultProps = {
//   label: [],
//   data: [],
//   edit: false,
//   editType: "",
//   sm: 12,
//   md: 12,
//   lg: 12,
// };
// CusInfoContent.prototype = {
//   label: PropTypes.array,
//   data: PropTypes.array,
//   edit: PropTypes.bool,
//   editType: PropTypes.string,
//   sm: PropTypes.number,
//   md: PropTypes.number,
//   lg: PropTypes.number,
// };
