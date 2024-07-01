import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Add } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, IconButton, Typography, Collapse } from '@mui/material';
import { CusIconButton } from '../components/CusButton';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

/**
 * @description
 * @param {string} disabled
 */

const CusListItem = (props) => {
  const { key, primary, secondary, mode, icon, alt, src } = props;
  return (
    <>
      <ListItem
        key={key}
        secondaryAction={
          <>
            <CusIconButton
              icon={<Add />}
            />
            <CusIconButton
              icon={<Add />}
            />
          </>
        }>
        {mode === "avatar" ?
          <ListItemAvatar>
            <Avatar
              sx={{ borderRadius: "10px" }}
              alt={alt}
              src={src}
            />
          </ListItemAvatar> :
          mode === "icon" ?
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: "10px" }}>
                {icon}
              </Avatar>
            </ListItemAvatar> : null
        }
        <ListItemText
          primary={primary}
          secondary={secondary}
        />
      </ListItem>
    </>
  )
}

CusListItem.defaultProps = {
  disabled: false,
};
CusListItem.prototype = {
  disabled: PropTypes.bool,
};

export {
  CusListItem
};