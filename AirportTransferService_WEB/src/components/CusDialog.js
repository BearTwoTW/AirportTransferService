import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Variables from "../scss/App.css";
import PropTypes from 'prop-types';
import {
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButton';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Typography from '@mui/material/Typography';


const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

// Modal 拖曳
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-handle"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

/**
 * 純文字按鈕
 * @param {string}  size      大小 ，EX:xs、sm、md、lg、xl
 * @param {string}  attribute 屬性
 */
const CusDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  let closeBtn = (props.info.closeBtn === undefined ? props.closeBtn : props.info.closeBtn)

  //提供父層function使用
  useImperativeHandle(ref, () => ({

    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    }
  }));

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={props.info.maxWidth ? props.info.maxWidth : props.maxWidth}
        attribute={props.info.attribute}
        open={open}>
        <DialogTitle id={"draggable-dialog-title"} sx={{ m: 0, p: 2, display: "flex" }}>
          <Box style={{ fontWeight: "bolder", userSelect: 'none', flex: "1 1 0%" }} id="draggable-handle">
            {props.info.DialogTitle}
          </Box>
          {closeBtn ?
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CusIconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                icon={<Close />}
              />
            </Box>
            : null}
        </DialogTitle>
        <DialogContent dividers>
          {props.info.DialogContent}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          {props.info.DialogActions}
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
})

CusDialog.defaultProps = {
  fullWidth: true,
  maxWidth: "xs",
  closeBtn: true
}

CusDialog.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
};

export { CusDialog }
