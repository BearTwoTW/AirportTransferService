import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TableCell, TableRow, Box, Typography } from '@mui/material';
import { HighlightOff, Add, Delete, Search, Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusInfoTitle } from '../../../../components/CusInfo';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusUploadImgFilePreview, CusImgFilePreview } from '../../../../components/CusFileUpload';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusVerticalLinearStepper1 } from '../../../../components/CusStepper';
import { NoResults } from '../../../../components/CusError';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusSwitch } from '../../../../components/CusSwitchTS';
import { useCheckLogInXPermission, tryCatchError } from '../../../../js/Function';
import { DDMenu, ATS_WebSetting, FilesAPI } from '../../../../js/APITS';
import { imageURL } from '../../../../js/Domain';
// html編輯器
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
// html編輯器的語系
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh'

export default function WebSetting() {
    // 導頁
    const navigate = useNavigate();
    const location = useLocation();

    // 權限
    const permission = useCheckLogInXPermission("UserLevelFirst", ["Add", "secondEdit", "Delete"]);

    // 網頁設定資料查詢
    const [pageSearch, setPageSearch] = useState({
        ws_id: "",
        title: "",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
        excel: "",
        page: 0,
        num_per_page: 0,
    });

    // 網站設定修改資料
    const [webData, setWebData] = useState([]);
    const [uploadFile, setUploadFile] = useState({});
    const [imageFiles, setImageFiles] = useState({});
    const [FileType, setFileType] = useState({
        LOGO: null,
        C: null,
        D: null,
        E: null,
        F: null,
    });

    // 注意事項設定
    const [F_upd, setF_upd] = useState({
        ws_id: "00005",
        title: "F",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 客服聯繫方式設定
    const [G_upd, setG_upd] = useState({
        ws_id: "00006",
        title: "G",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 預約送機 Popup 文字設定
    const [modalA, setModalA] = useState({
        ws_id: "00007",
        title: "modal_a",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 預約送機 Popup 文字設定
    const [modalB, setModalB] = useState({
        ws_id: "00008",
        title: "modal_b",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 夜間加成 文字設定
    const [night, setNight] = useState({
        ws_id: "00009",
        title: "night",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 加價 文字設定 & 是否可見
    const [extra, setExtra] = useState({
        ws_id: "00010",
        title: "extra",
        image: "",
        text1: "",
        text2: "",
        text3: "",
        html1: "",
        html2: "",
        html3: "",
    });

    // 加價服務 是否顯示於前台
    const [checked, setChecked] = useState("Y");

    // 查詢狀態 & 網站設定查詢結果
    const [isLoading, setIsLoading] = useState(true);

    // dialog
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});

    /**網站設定查詢 */
    const getWebSetting = () => {
        setIsLoading(true);
        ATS_WebSetting.ATS_WebSettingsSearch(pageSearch).then(res => {
            if (res.success) {
                console.log(res.data)
                setWebData(res.data);
                setF_upd(res.data.filter(item => item.ws_id === "00005")[0])
                setG_upd(res.data.filter(item => item.ws_id === "00006")[0])
                setModalA(res.data.filter(item => item.ws_id === "00007")[0])
                setModalB(res.data.filter(item => item.ws_id === "00008")[0])
                setNight(res.data.filter(item => item.ws_id === "00009")[0])
                setChecked(res.data.filter(item => item.ws_id === "00010")[0].text1)
            }
            setIsLoading(false);
        });
    };

    /**網站設定圖片查詢 */
    const getWebSettingImage = () => {
        FilesAPI.SearchFile({
            belong: "WebSetting"
        }).then(res => {
            if (res.success) {
                setImageFiles(res.data);
            } else {
                enqueueSnackbar("圖片查詢失敗", {
                    variant: "warning",
                    persist: true
                });
            }
        })
    };

    // 一進頁面就查詢
    useEffect(() => {
        getWebSetting();
        getWebSettingImage();
    }, [pageSearch]);

    /**
     * @description [事件]選擇圖片
     */
    const handleUpload = (e) => {
        const name = e.target.id;
        setUploadFile(e.target.files[0])
        setFileType(prevData => ({
            ...prevData,
            [name]: e.target.files[0].type
        }))
    };

    /**
     * @description [事件]上傳圖片
     */
    const upload_Confirm = async (e, type, id) => {
        e.stopPropagation();
        let delAction = false // 判斷是否已經刪除舊檔案的狀態
        if (uploadFile.name) { // 如果有選擇檔案
            if (imageFiles.length > 0 && imageFiles.some(ele => ele.type === type)) { // 如果有舊檔案, 這邊用 type 做判斷是因為有可能有多個檔案, 並且同一個類型的檔案只能有一個
                let obj = imageFiles.find(ele => ele.type === type) // 取得舊檔案
                let delRes = await FilesAPI.DeleteFile({ file_id: obj.file_id }) // 刪除舊檔案
                delAction = delRes.success // 判斷是否刪除成功, success 回傳的是一個 boolean
                if (!delRes.success) { // 如果刪除失敗就跳錯誤訊息
                    enqueueSnackbar(delRes.message, {
                        variant: "warning",
                        persist: true
                    });
                    return
                }
            } else delAction = true // 如果沒有舊檔案就直接設定為 true, 就直接走上傳流程
            if (delAction) { // 如果刪除成功就開始上傳
                let HttpFileCollection = new FormData(); // 建立一個 FormData
                HttpFileCollection.append(uploadFile.name, uploadFile); // 將檔案放進 FormData
                HttpFileCollection.append("UploadFile", JSON.stringify({ // 將檔案資訊放進 FormData
                    belong: "WebSetting", // 這邊是放置檔案的資料夾名稱
                    type: type, // 這邊是放置檔案的類型
                    id: id // 這邊是放置檔案的 id
                }));
                let uploadRes = await FilesAPI.UploadFile(HttpFileCollection) // 上傳檔案
                if (uploadRes.success) { // 如果上傳成功就更新畫面
                    ATS_WebSetting.ATS_WebSettingsUpdate({
                        ws_id: id,
                        title: type,
                        image: uploadRes.data[0].path
                    }).then(res => {
                        getWebSettingImage();
                    });
                    enqueueSnackbar(uploadRes.message, {
                        variant: "success",
                        persist: false
                    });
                } else {
                    enqueueSnackbar(uploadRes.message, {
                        variant: "warning",
                        persist: true
                    });
                }
            }
        } else { // 如果沒有選擇檔案就跳錯誤訊息
            enqueueSnackbar("請先選擇圖片", {
                variant: "warning",
                persist: true
            });
            return
        }
    }

    // /**[選單刪除]刪除圖片 */
    const delImage_Click = async (e, id, type, ws_id) => {
        let fileId = id
        if (fileId) {
            try {
                e.stopPropagation();
                const delRes = await FilesAPI.DeleteFile({ file_id: fileId })
                if (delRes.success) {
                    ATS_WebSetting.ATS_WebSettingsUpdate({
                        ws_id: ws_id,
                        title: type,
                        image: "",
                    }).then(res => {
                        getWebSettingImage();
                    });
                    enqueueSnackbar(delRes.message, {
                        variant: "success",
                    });
                }
            } catch (e) {
                tryCatchError(e)
                enqueueSnackbar("刪除圖片失敗", {
                    variant: "warning",
                    persist: true
                });
            }
        } else {
            enqueueSnackbar("取得圖片ID失敗", {
                variant: "warning",
                persist: true
            });
        }
    };

    /**
     * @description [事件]注意事項-input
     */
    const F_handleInput = useCallback((e) => {
        const { name, value } = e.target
        setF_upd(prevData => ({
            ...prevData,
            [name]: value
        }));
    })

    /**
     * @description [事件]加價文字說明-input
     */
    const extra_handleInput = useCallback((e) => {
        const { name, value } = e.target
        setExtra(prevData => ({
            ...prevData,
            [name]: value
        }));
    })

    /**
     * @description [事件]注意事項-儲存修改
     */
    const saveF_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(F_upd).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    /**
     * @description [事件]客服聯繫方式-儲存修改
     */
    const saveG_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(G_upd).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    /**
     * @description [事件]夜間加成-儲存修改
     */
    const saveNight_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(night).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    /**
     * @description [事件]客服聯繫方式-input
     */
    const G_handleInput = (e, editor, name) => {
        let val = editor.getData();
        setG_upd((prevData) => ({ ...prevData, [name]: val }))
    }

    /**
     * @description [事件]夜間加成
     */
    const night_HandleInput = (e, editor, name) => {
        let val = editor.getData();
        setNight((prevData) => ({ ...prevData, [name]: val }))
    }

    /**
     * @description [事件]預約送機Popup-input
     */
    const modalA_HandleInput = (e, editor, name) => {
        let val = editor.getData();
        setModalA((prevData) => ({ ...prevData, [name]: val }))
    }

    /**
     * @description [事件]預約送機Popup-儲存修改
     */
    const saveModalA_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(modalA).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    /**
     * @description [事件]預約接機Popup-input
     */
    const modalB_HandleInput = (e, editor, name) => {
        let val = editor.getData();
        setModalB((prevData) => ({ ...prevData, [name]: val }))
    }

    /**
     * @description [事件]預約送機Popup-儲存修改
     */
    const saveModalB_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(modalB).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    /**
     * @description 加價是否可見
     */
    const extraOnChecked = useCallback((e) => {
        setChecked(checked === "N" ? "Y" : "N");
        setExtra((prevData) => ({ ...prevData, text1: checked === "N" ? "Y" : "N" }))
    }, [checked])

    /**
     * @description 加價顯示 儲存修改
     */
    const saveExtra_handelClick = useCallback((e) => {
        ATS_WebSetting.ATS_WebSettingsUpdate(extra).then(res => {
            if (res.success) {
                enqueueSnackbar("修改成功", { variant: 'success' });
            } else {
                enqueueSnackbar("修改失敗", { variant: 'error' });
            }
        });
    })

    console.log(extra)

    // 提示框
    const { enqueueSnackbar } = useSnackbar();

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CusCard content={
                        <React.Fragment>
                            {!isLoading ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"LOGO設定"}
                                            content={
                                                <Grid item xs={12}>
                                                    <CusUploadImgFilePreview
                                                        id="LOGO"
                                                        type={"image"}
                                                        accept={".png,.jpg,.jpeg"} // 檔案類型
                                                        fileName={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "LOGO") ?
                                                                imageFiles.find(ele => ele.type === "LOGO").filename : null : null}
                                                        url={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "LOGO") ?
                                                                `${imageURL}${imageFiles.find(ele => ele.type === "LOGO").path}` : null : null}
                                                        onChangeEvent={(e) => handleUpload(e)}
                                                        uploadFunc={(e) => upload_Confirm(e, "LOGO", "00001")}
                                                        deleteFunc={(e) => delImage_Click(e,
                                                            imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "LOGO") ?
                                                                    imageFiles.find(ele => ele.type === "LOGO").file_id : null : null, "LOGO", "00001")}
                                                    />
                                                </Grid>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"廣告看板設定"}
                                            content={
                                                <Grid item xs={12}>
                                                    <CusUploadImgFilePreview
                                                        id="C"
                                                        type={"image"}
                                                        accept={".png,.jpg,.jpeg"} // 檔案類型
                                                        fileName={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "C") ?
                                                                imageFiles.find(ele => ele.type === "C").filename : null : null}
                                                        url={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "C") ?
                                                                `${imageURL}${imageFiles.find(ele => ele.type === "C").path}` : null : null}
                                                        onChangeEvent={(e) => handleUpload(e)}
                                                        uploadFunc={(e) => upload_Confirm(e, "C", "00002")}
                                                        deleteFunc={(e) => delImage_Click(e,
                                                            imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "C") ?
                                                                    imageFiles.find(ele => ele.type === "C").file_id : null : null, "C", "00002")}
                                                    />
                                                </Grid>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"橫幅圖設定"}
                                            content={
                                                <Grid item xs={12}>
                                                    <CusUploadImgFilePreview
                                                        id="D"
                                                        type={"image"}
                                                        accept={".png,.jpg,.jpeg"} // 檔案類型
                                                        fileName={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "D") ?
                                                                imageFiles.find(ele => ele.type === "D").filename : null : null}
                                                        url={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "D") ?
                                                                `${imageURL}${imageFiles.find(ele => ele.type === "D").path}` : null : null}
                                                        onChangeEvent={(e) => handleUpload(e)}
                                                        uploadFunc={(e) => upload_Confirm(e, "D", "00003")}
                                                        deleteFunc={(e) => delImage_Click(e,
                                                            imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "D") ?
                                                                    imageFiles.find(ele => ele.type === "D").file_id : null : null, "D", "00003")}
                                                    />
                                                </Grid>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"預約流程圖設定"}
                                            content={
                                                <Grid item xs={12}>
                                                    <CusUploadImgFilePreview
                                                        id="E"
                                                        type={"image"}
                                                        accept={".png,.jpg,.jpeg"} // 檔案類型
                                                        fileName={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "E") ?
                                                                imageFiles.find(ele => ele.type === "E").filename : null : null}
                                                        url={imageFiles.length > 0 ?
                                                            imageFiles.some(item => item.type === "E") ?
                                                                `${imageURL}${imageFiles.find(ele => ele.type === "E").path}` : null : null}
                                                        onChangeEvent={(e) => handleUpload(e)}
                                                        uploadFunc={(e) => upload_Confirm(e, "E", "00004")}
                                                        deleteFunc={(e) => delImage_Click(e,
                                                            imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "E") ?
                                                                    imageFiles.find(ele => ele.type === "E").file_id : null : null, "E", "00004")}
                                                    />
                                                </Grid>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"注意事項設定"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveF_handelClick(e)
                                                }]}
                                            content={
                                                <>
                                                    <Grid item xs={12}>
                                                        <CusUploadImgFilePreview
                                                            id="F"
                                                            type={"image"}
                                                            accept={".png,.jpg,.jpeg"} // 檔案類型
                                                            fileName={imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "F") ?
                                                                    imageFiles.find(ele => ele.type === "F").filename : null : null}
                                                            url={imageFiles.length > 0 ?
                                                                imageFiles.some(item => item.type === "F") ?
                                                                    `${imageURL}${imageFiles.find(ele => ele.type === "F").path}` : null : null}
                                                            onChangeEvent={(e) => handleUpload(e)}
                                                            uploadFunc={(e) => upload_Confirm(e, "F", "00005")}
                                                            deleteFunc={(e) => delImage_Click(e,
                                                                imageFiles.length > 0 ?
                                                                    imageFiles.some(item => item.type === "F") ?
                                                                        imageFiles.find(ele => ele.type === "F").file_id : null : null, "F", "00005")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CusInput
                                                            multiline={true}
                                                            rows={4}
                                                            id={"text1"}
                                                            label={"文字內容"}
                                                            size={"Normal"}
                                                            name={"text1"}
                                                            type={"text"}
                                                            value={F_upd.text1}
                                                            onChangeEvent={(e) => F_handleInput(e)}
                                                        />
                                                    </Grid>
                                                </>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"夜間加成設定"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveNight_handelClick(e)
                                                }]}
                                            content={
                                                <React.Fragment>
                                                    <Grid item xs={12}>
                                                        <Box style={{ minHeight: '350px' }}>
                                                            <CKEditor
                                                                editor={DecoupledEditor}
                                                                onReady={(editor) => {
                                                                    // 加入工具列
                                                                    editor.ui.view.editable.element.parentElement.insertBefore(
                                                                        editor.ui.view.toolbar.element,
                                                                        editor.ui.view.editable.element
                                                                    )
                                                                    editor.editing.view.change((writer) => {
                                                                        writer.setStyle({
                                                                            "background-color": "white",
                                                                            "min-height": '300px',
                                                                            "border": '1px solid #dddddd'
                                                                        }, editor.editing.view.document.getRoot())
                                                                    })
                                                                }}
                                                                // 內容
                                                                data={night ? night.html1 : ""}
                                                                // 事件
                                                                onChange={(e, editor) => night_HandleInput(e, editor, "html1")}
                                                                // 設定
                                                                config={{
                                                                    // 語系
                                                                    language: 'zh',
                                                                    // 工具列
                                                                    toolbar: {
                                                                        items: [
                                                                            'heading',
                                                                            '|',
                                                                            'fontFamily',
                                                                            'fontSize',
                                                                            'fontColor',
                                                                            'fontBackgroundColor',
                                                                            'bold',
                                                                            'italic',
                                                                            'underline',
                                                                            '|',
                                                                            'blockQuote',
                                                                            'alignment',
                                                                            'outdent',
                                                                            'indent',
                                                                            'numberedList',
                                                                            'bulletedList',
                                                                            '|',
                                                                            'undo',
                                                                            'redo',
                                                                        ],
                                                                    },
                                                                }} />
                                                        </Box>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"客服聯繫方式設定"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveG_handelClick(e)
                                                }]}
                                            content={
                                                <React.Fragment>
                                                    <Grid item xs={12}>
                                                        <Box style={{ minHeight: '350px' }}>
                                                            <CKEditor
                                                                editor={DecoupledEditor}
                                                                onReady={(editor) => {
                                                                    // 加入工具列
                                                                    editor.ui.view.editable.element.parentElement.insertBefore(
                                                                        editor.ui.view.toolbar.element,
                                                                        editor.ui.view.editable.element
                                                                    )
                                                                    editor.editing.view.change((writer) => {
                                                                        writer.setStyle({
                                                                            "background-color": "white",
                                                                            "min-height": '300px',
                                                                            "border": '1px solid #dddddd'
                                                                        }, editor.editing.view.document.getRoot())
                                                                    })
                                                                }}
                                                                // 內容
                                                                data={G_upd ? G_upd.html1 : ""}
                                                                // 事件
                                                                onChange={(e, editor) => G_handleInput(e, editor, "html1")}
                                                                // 設定
                                                                config={{
                                                                    // 語系
                                                                    language: 'zh',
                                                                    // 工具列
                                                                    toolbar: {
                                                                        items: [
                                                                            'heading',
                                                                            '|',
                                                                            'fontFamily',
                                                                            'fontSize',
                                                                            'fontColor',
                                                                            'fontBackgroundColor',
                                                                            'bold',
                                                                            'italic',
                                                                            'underline',
                                                                            '|',
                                                                            'blockQuote',
                                                                            'alignment',
                                                                            'outdent',
                                                                            'indent',
                                                                            'numberedList',
                                                                            'bulletedList',
                                                                            '|',
                                                                            'undo',
                                                                            'redo',
                                                                        ],
                                                                    },
                                                                }} />
                                                        </Box>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"預約送機 Popup 文字設定"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveModalA_handelClick(e)
                                                }]}
                                            content={
                                                <React.Fragment>
                                                    <Grid item xs={12}>
                                                        <Box style={{ minHeight: '350px' }}>
                                                            <CKEditor
                                                                editor={DecoupledEditor}
                                                                onReady={(editor) => {
                                                                    // 加入工具列
                                                                    editor.ui.view.editable.element.parentElement.insertBefore(
                                                                        editor.ui.view.toolbar.element,
                                                                        editor.ui.view.editable.element
                                                                    )
                                                                    editor.editing.view.change((writer) => {
                                                                        writer.setStyle({
                                                                            "background-color": "white",
                                                                            "min-height": '300px',
                                                                            "border": '1px solid #dddddd'
                                                                        }, editor.editing.view.document.getRoot())
                                                                    })
                                                                }}
                                                                // 內容
                                                                data={modalA ? modalA.html1 : ""}
                                                                // 事件
                                                                onChange={(e, editor) => modalA_HandleInput(e, editor, "html1")}
                                                                // 設定
                                                                config={{
                                                                    // 語系
                                                                    language: 'zh',
                                                                    // 工具列
                                                                    toolbar: {
                                                                        items: [
                                                                            'heading',
                                                                            '|',
                                                                            'fontFamily',
                                                                            'fontSize',
                                                                            'fontColor',
                                                                            'fontBackgroundColor',
                                                                            'bold',
                                                                            'italic',
                                                                            'underline',
                                                                            '|',
                                                                            'blockQuote',
                                                                            'alignment',
                                                                            'outdent',
                                                                            'indent',
                                                                            'numberedList',
                                                                            'bulletedList',
                                                                            '|',
                                                                            'undo',
                                                                            'redo',
                                                                        ],
                                                                    },
                                                                }} />
                                                        </Box>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"預約接機 Popup 文字設定"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveModalB_handelClick(e)
                                                }]}
                                            content={
                                                <React.Fragment>
                                                    <Grid item xs={12}>
                                                        <Box style={{ minHeight: '350px' }}>
                                                            <CKEditor
                                                                editor={DecoupledEditor}
                                                                onReady={(editor) => {
                                                                    // 加入工具列
                                                                    editor.ui.view.editable.element.parentElement.insertBefore(
                                                                        editor.ui.view.toolbar.element,
                                                                        editor.ui.view.editable.element
                                                                    )
                                                                    editor.editing.view.change((writer) => {
                                                                        writer.setStyle({
                                                                            "background-color": "white",
                                                                            "min-height": '300px',
                                                                            "border": '1px solid #dddddd'
                                                                        }, editor.editing.view.document.getRoot())
                                                                    })
                                                                }}
                                                                // 內容
                                                                data={modalB ? modalB.html1 : ""}
                                                                // 事件
                                                                onChange={(e, editor) => modalB_HandleInput(e, editor, "html1")}
                                                                // 設定
                                                                config={{
                                                                    // 語系
                                                                    language: 'zh',
                                                                    // 工具列
                                                                    toolbar: {
                                                                        items: [
                                                                            'heading',
                                                                            '|',
                                                                            'fontFamily',
                                                                            'fontSize',
                                                                            'fontColor',
                                                                            'fontBackgroundColor',
                                                                            'bold',
                                                                            'italic',
                                                                            'underline',
                                                                            '|',
                                                                            'blockQuote',
                                                                            'alignment',
                                                                            'outdent',
                                                                            'indent',
                                                                            'numberedList',
                                                                            'bulletedList',
                                                                            '|',
                                                                            'undo',
                                                                            'redo',
                                                                        ],
                                                                    },
                                                                }} />
                                                        </Box>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CusInfoTitle
                                            label={"加價服務"}
                                            buttonType={"button"}
                                            buttonGroup={
                                                [{
                                                    variant: "contained",
                                                    color: "info",
                                                    icon: <Save />,
                                                    name: "儲存",
                                                    onClick: (e) => saveExtra_handelClick(e)
                                                }]}
                                            content={
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <CusSwitch color={"success"} label={"是否於前台顯示"} checked={checked} onChange={(e) => extraOnChecked(e)} />
                                                    </Grid>
                                                    {checked === "N" ?
                                                        <Grid item xs={12}>
                                                            <CusInput
                                                                multiline={true}
                                                                rows={4}
                                                                id={"text2"}
                                                                label={"文字說明"}
                                                                placeholder={"請輸入加價服務關閉後的文字說明，文字將會顯示於網頁上。"}
                                                                size={"Normal"}
                                                                name={"text2"}
                                                                type={"text"}
                                                                value={extra.text2}
                                                                onChangeEvent={(e) => extra_handleInput(e)}
                                                            />
                                                        </Grid>
                                                        : null}
                                                </Grid>
                                            }
                                        />

                                    </Grid>
                                </Grid>
                                : <CircularLoading />}
                        </React.Fragment>}
                    />
                </Grid>
            </Grid>
            <CusDialog ref={useDialog} info={dialogData} />
        </React.Fragment>
    );
};

