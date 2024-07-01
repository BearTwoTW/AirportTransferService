import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Avatar, IconButton, Typography, Collapse } from '@mui/material';
import { Add, Edit, Delete, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme } from '@mui/material/styles';
import { CusThemeTS } from '../CustomThemeTS';
import Variables from "../../src/scss/App.css";
const theme = createTheme(CusThemeTS.defaultTheme);
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")


const ListItemButtonSX = {
  [`&.MuiListItemButton-root`]: {
    padding: "5px 10px",
    borderRadius: "50px",
  },
  [`&:hover`]: {
    transition: "box-shadow .5s",
    borderRadius: "50px",
  },
  [`&.Mui-selected`]: {
    [`&:focus`]: {
      background: "none"
    },
    color: Variables[status + "__Secondary"],
    backgroundColor: Variables[status + "__Default"],
  },
}


const CusListButton = (props) => {
  return (
    <List dense={true}>
      <ListItem style={{ padding: '0px' }} className={'active'}>
        <ListItemButton
          sx={ListItemButtonSX}
          selected={props.selected}
          onClick={() => props.onClick()}>
          {props.avatar
            ? <ListItemIcon>
              <Avatar sx={{ bgcolor: props.checked ? theme.palette.success.main : '' }}>
                {props.label}
              </Avatar>
            </ListItemIcon>
            : null}
          <ListItemText>
            {props.name}
          </ListItemText>
          <ListItemText>
            {props.primary}
          </ListItemText>
          <ListItemText>
            {props.secondary}
          </ListItemText>
          {props.type !== "button" ?
            <ListItemIcon sx={{ justifyContent: 'right' }}>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            : null
          }
        </ListItemButton>
        {props.type === "button" ?
          <CusIconButton
            color={"secondary"}
            icon={<Delete />}
          />
          : null}
      </ListItem>
    </List>
  );
};

CusListButton.defaultProps = {
  name: '',
  avatar: true,
};

CusListButton.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.bool,
  onClick: PropTypes.func
};

/**
 * @description
 * @param {string} disabled 是否鎖定
 * @param {string} key      
 * @param {string} primary      主要內容
 * @param {string} secondary    次要內容
 * @param {string} imgType      icon 圖標 | avatar 圖片 | text 文字
 * @param {string} editType     edit 編輯與刪除 | add 新增按鈕 | content 自訂組件(通常拿來放文字)
 * @param {string} editContent  editType 為 content 時, 放你想放的組件或文字
 * @param {string} icon         圖標
 * @param {string} alt          圖片替代文字
 * @param {string} src          圖片路徑來源
 */
const CusListItem = (props) => {
  const { disabled, primary, secondary, imgType, editType, editContent, icon, alt, src, editClick, delClick, addClick } = props;

  return (
    <>
      <ListItem
        sx={{ padding: "10px 0" }}
        // key={key}
        // disabled={disabled}
        divider={true}>
        {imgType === "avatar" ?
          <ListItemAvatar>
            <Avatar
              sx={{ borderRadius: "10px" }}
              alt={alt}
              src={src}
            />
          </ListItemAvatar> :
          imgType === "icon" ?
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: "10px" }}>
                {icon}
              </Avatar>
            </ListItemAvatar> : null
        }
        <ListItemText
          primary={<Typography noWrap={false} style={{ wordBreak: 'break-all' }}>{primary}</Typography>}
          secondary={<Typography variant="caption" noWrap={false} style={{ wordBreak: 'break-all' }}>{secondary}</Typography>}
        />
        {editType === "edit" ?
          <Box display={"flex"} flexWrap={"nowrap"}>
            <CusIconButton
              color={"secondary"}
              icon={<Edit />}
              onClick={editClick}
              disabled={disabled}
            />
            <CusIconButton
              color={"secondary"}
              icon={<Delete />}
              onClick={delClick}
              disabled={disabled}
            />
          </Box>
          : editType === "add" ?
            <CusIconButton
              color={"secondary"}
              icon={<Add />}
              onClick={addClick}
              disabled={disabled}
            />
            : editType === "content" ?
              editContent
              : null}
      </ListItem >
    </>
  )
}

/**
 * @description
 * @param {string} disabled 是否鎖定
 * @param {string} key      
 * @param {string} primary      主要內容
 * @param {string} secondary    次要內容
 * @param {string} action       按鈕區
 * @param {string} collapseContent    摺疊內容
 */

const CusListItemCollapse = (props) => {
  const { disabled, key, primary, secondary, action, collapseContent } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem
        sx={{ padding: "10px 0" }}
        key={key}
        disabled={disabled}
        divider={false}>
        <ListItemText
          primary={<Typography noWrap={false} style={{ wordBreak: 'break-all' }}>{primary}</Typography>}
          secondary={<Typography variant="caption" noWrap={false} style={{ wordBreak: 'break-all' }}>{secondary}</Typography>}
        />
        {action}
        {open ?
          <CusIconButton
            color={"secondary"}
            icon={<KeyboardArrowUp />}
            onClick={handleClick}
          /> :
          <CusIconButton
            color={"secondary"}
            icon={<KeyboardArrowDown />}
            onClick={handleClick}
          />}
      </ListItem >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ padding: "0 10px" }}>
          {collapseContent}
        </Box>
      </Collapse >
    </>
  )
}

CusListItemCollapse.defaultProps = {
  disabled: false,
};
CusListItemCollapse.prototype = {
  disabled: PropTypes.bool,
};

export { CusListButton, CusListItem, CusListItemCollapse };

/**
 * 產生一個List
 * 裡面List是按照傳進來的值去產生
 * 
 * 先刻一個超陽春版本
 */