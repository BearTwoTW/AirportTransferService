import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Dialog, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { WebIconButton3 } from '../WebSide/WebButton';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';


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
export const WebDialog3 = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  let closeBtn = (props.info.closeBtn === undefined ? props.closeBtn : props.info.closeBtn)

  // 是否自動關閉
  useEffect(() => {
    if (props.info.autoClose) {
      setTimeout(() => {
        setOpen(false);
      }, 1000)
    }
  }, [props.info.DialogContent])

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    // 選單收合
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    }
  }));

  const onClose_event = () => {
    let onClose = true;
    if (props.info.onClose === false) onClose = props.info.onClose;
    if (onClose) setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={props.info.maxWidth ? props.info.maxWidth : props.maxWidth}
        attribute={props.info.attribute}
        onClose={onClose_event}
        open={open}>
        {props.info.DialogTitle ?
          <DialogTitle id={"draggable-dialog-title"} sx={{ m: 0, p: 2, display: "flex" }}>
            <Box style={{ userSelect: 'none', flex: "1 1 0%" }} id="draggable-handle">
              {props.info.DialogTitle}
            </Box>
            {closeBtn ?
              <Box>
                <WebIconButton3
                  className="no-drag"
                  color={"secondary"}
                  aria-label="close"
                  onClick={() => setOpen(false)}
                  icon={<Close />} />
              </Box> : null}
          </DialogTitle> : null}

        <DialogContent dividers sx={{ padding: "0" }}>
          {props.info.DialogContent}
        </DialogContent>

        {props.info.DialogActions ?
          <DialogActions sx={{ justifyContent: "space-between" }}>
            {props.info.DialogActions}
          </DialogActions> : null}
      </Dialog>
    </React.Fragment >
  );
})

WebDialog3.defaultProps = {
  fullWidth: true,
  maxWidth: "xs",
  closeBtn: true
}

WebDialog3.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  closeBtn: PropTypes.bool,
};
