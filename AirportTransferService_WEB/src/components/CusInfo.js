import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Collapse, Fade, Menu, MenuItem } from '@mui/material';
import { ContentCopy, Edit, Save, EditOff, HelpOutline, MoreHoriz, OpenInNew } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButton';
import { CusHtmlTooltip } from '../components/CusTooltip';
import { CusInput } from '../components/CusInput';
import { CusOutlinedSelect } from '../components/CusSelect';
import { CusDatePicker, CusDateTimePicker } from '../components/CusDatePicker';
import { CusTextIconButton } from '../components/CusButton';
import Typography from '@mui/material/Typography';

import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

/**
 * @description
 * @param {string} label 標題文字內容
 * @param {string} buttonType 右側是否要有按鈕 ex : edit || save
 * @param {string} onClick 按鈕觸發事件
 */

const CusInfoTitle = forwardRef((props, ref) => {
  const { label, variant, color, info, infoContent, content, spacing, status, edit, save, link, buttonType, buttonGroup } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
  //提供父層function使用
  useImperativeHandle(ref, () => ({
    handleClose() {
      setOpen(false);
    }
  }));

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Typography
        sx={{
          color: "#546b7a",
          fontWeight: "bold",
          borderBottom: `1px solid #cdced1`
        }}
        variant={variant}
        gutterBottom
      >
        <Box style={{ minHeight: "50px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: "#546b7a", margin: "6px" }}></Box>
            <Box style={{ marginRight: "4px" }}>{label}</Box>
            {info ?
              <CusHtmlTooltip
                type={"icon"}
                icon={<HelpOutline color={color} />}
                content={infoContent} />
              : null}
          </Box>
          {buttonType === "edit" ?
            <Box style={{ display: "flex" }}>
              <Box style={{ animation: `${status ? "slideInRight" : "slideOutRight"} 0.4s forwards` }}>
                <CusIconButton
                  color='secondary'
                  icon={<Save />}
                  onClick={save}
                />
              </Box>
              <CusIconButton
                color='secondary'
                icon={status ? <EditOff /> : <Edit />}
                onClick={edit}
              />
            </Box> :
            buttonType === "save" ?
              <CusIconButton
                color='secondary'
                icon={<Save />}
                onClick={save}
              /> :
              buttonType === "link" ?
                <CusIconButton
                  color='secondary'
                  icon={<OpenInNew />}
                  onClick={link}
                /> :
                buttonType === "button" ?
                  window.innerWidth < 1200 ?
                    <React.Fragment>
                      <CusIconButton
                        color='secondary'
                        icon={<MoreHoriz />}
                        onClick={handleClick}
                      />
                      <Menu
                        anchorEl={open}
                        open={open}
                        onClose={handleClose}
                      >
                        {buttonGroup.map((ele, inx) => (
                          <MenuItem disabled={ele.disabled} key={inx} onClick={ele.onClick}>{ele.name}</MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                    :
                    <Box>
                      {buttonGroup.map((ele, inx) => (
                        <CusTextIconButton
                          key={inx}
                          variant={ele.variant}
                          color={ele.color}
                          text={ele.name}
                          startIcon={ele.icon}
                          onClick={ele.onClick}
                          disabled={ele.disabled}
                        />
                      ))}
                    </Box>
                  :
                  null}
        </Box>
      </Typography>
      <Grid container spacing={spacing} style={{ animation: "fade 0.5s", marginTop: "20px" }}>
        {content}
      </Grid>
    </Box >
  )
})

CusInfoTitle.defaultProps = {
  variant: "h5",
  info: false,
  color: "secondary",
  content: "",
};
CusInfoTitle.prototype = {
  variant: PropTypes.string,
  info: PropTypes.bool,
  color: PropTypes.string,
  content: PropTypes.string
};

const CusInfoContent = (props) => {
  const { xs, md, lg, label, value, edit, input } = props;
  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Typography
        sx={{ color: "black", fontWeight: "bold" }}
        variant={"h6"}
        gutterBottom
      >
        {label}
      </Typography>
      <Box>
        <Collapse timeout={400} in={edit}>
          <Fade timeout={300} in={edit}>
            <Box>{input}</Box>
          </Fade>
        </Collapse >
        <Collapse timeout={400} in={!edit}>
          <Fade timeout={300} in={!edit}>
            <Typography
              variant={"body1"}
              gutterBottom
            >
              {value}
            </Typography>
          </Fade>
        </Collapse>
      </Box>
    </Grid >
  )
}

CusInfoContent.defaultProps = {
  label: [],
  data: [],
  edit: false,
  editType: "",
  sm: 12,
  md: 12,
  lg: 12,
};
CusInfoContent.prototype = {
  label: PropTypes.array,
  data: PropTypes.array,
  edit: PropTypes.bool,
  editType: PropTypes.string,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export {
  CusInfoTitle,
  CusInfoContent
};