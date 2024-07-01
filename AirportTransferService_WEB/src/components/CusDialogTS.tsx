import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { DialogActions, DialogContent, DialogTitle, Dialog, Paper, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButtonTS';
import Draggable from 'react-draggable';

/** Dialog組件props
 * @description Dialog組件props
 * @param {boolean} closeBtn 開關
 * @param {boolean} fullWidth 是否全屏
 * @param {CusDialogInfo} info Dialog內容
 * @param {string} id id
 * @param {string} title 標題
 * @param {any} content 內容
 * @param {any} action 按鈕
 * @param {string} maxWidth 寬度
 */
export type CusDialogProps = {
    info: {
        id?: string;
        maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
        DialogTitle?: string;
        DialogContent?: React.ReactNode | null;
        DialogActions?: React.ReactNode | null;
        closeBtn?: boolean;
        fullWidth?: boolean;
        open?: boolean;
        type?: string;
    }
};

interface PaperComponentProps {
    [key: string]: any;
}

/** Modal 拖曳
 * @description Modal 拖曳
 */
const PaperComponent: React.FC<PaperComponentProps> = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};

/** Dialog組件
 * @description Dialog組件
 * @param props 
 * @returns 
 */
export const CusDialog = forwardRef((props: CusDialogProps, ref) => {
    const { info } = props;
    const [modalOpen, setModalOpen] = useState<boolean>(info.open ?? false);
    let closeBtn = info.closeBtn ?? true

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setModalOpen(true);
        },
        handleClose() {
            setModalOpen(false);
        }
    }));

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                PaperComponent={PaperComponent}
                aria-labelledby={"draggable-dialog-title"}
                maxWidth={info.maxWidth ?? "xs"}
                open={modalOpen}>
                <DialogTitle id={info.id} sx={{ m: 0, p: 2 }}>
                    {info.DialogTitle}
                    {closeBtn ?
                        <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CusIconButton
                                color={'primary'}
                                aria-label="close"
                                onClick={() => setModalOpen(false)}
                                icon={<Close />} />
                        </Box>
                        : null}
                </DialogTitle>
                <DialogContent dividers>{info.DialogContent}</DialogContent>
                <DialogActions sx={{ justifyContent: "space-between" }}>{info.DialogActions}</DialogActions>
            </Dialog>
        </React.Fragment>
    );
})