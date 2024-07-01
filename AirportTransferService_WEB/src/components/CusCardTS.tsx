import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Add, OpenInNew, Check } from '@mui/icons-material';
import { Button, Grid, Box, Card, CardHeader, CardContent, IconButton, Typography, Chip } from '@mui/material';
import { CusIconButton, CusTextButton } from '../components/CusButton';
import { CusChip } from '../components/CusChip';
import { CusJsBarcode } from '../components/CusBarcode';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

/**
 * @description
 * @param {string} content  卡片內容
 */
export type CusCardProps = {
  style?: React.CSSProperties;
  spacing?: number;
  content: React.ReactNode;
}

export const CusCard = (props: CusCardProps) => {
  const { spacing, content } = props;
  return (
    <React.Fragment>
      <Card style={props.style} sx={{ padding: "20px", backgroundColor: "#FFFFFF", boxShadow: "none", animation: "fade .5s ease-in-out forwards" }}>
        <Grid container spacing={spacing}>
          {content}
        </Grid>
      </Card >
    </React.Fragment >
  )
}