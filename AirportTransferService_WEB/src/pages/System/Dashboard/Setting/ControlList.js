import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Button, Typography } from '@mui/material';
import { Add, CheckCircleOutline, Save, Delete, Edit } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTable } from '../../../../components/CusTable';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { NoResults } from '../../../../components/CusError';
import { PageAPI } from '../../../../js/APITS';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const ControlList = () => {
  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // Dialog
  const [dialogData, setDialogData] = useState({});
  const useDialog = useRef();
  const useDialogInner = useRef();

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 頁面資訊
  const [pageDetail, setPagepDetail] = useState({
    dtlPage: {
      pg_id: getParams.pg_id,
      page_id: getParams.page_id
    },
    updPage: {
      pg_id: getParams.pg_id,
      page_id: getParams.page_id
    }

  });
  const initPageDetailCheck = { code: false, name: false };
  const [pageDetailCheck, setPageDetailCheck] = useState(initPageDetailCheck);

  // 頁面按鈕
  const [pageControlList, setPageControlList] = useState([]);
  const [isPageControlListLoading, setIsPageControlListLoading] = useState(false);

  /**
   * 取得頁面資訊
   */
  const getPageDetail = () => {
    PageAPI.PagesEdit({
      page_id: getParams.page_id
    }).then(res => {
      if (res.success) {
        setPagepDetail(prev => ({
          ...prev,
          dtlPage: res.data,
        }));
      } else {
        enqueueSnackbar(res.message, {
          variant: "warning",
          persist: true
        });
      }
    });
  };

  /**
   * 取得頁面按鈕列表
   */
  const getPageControlList = () => {
    setIsPageControlListLoading(true);
    PageAPI.PageControlList({
      page_id: getParams.page_id
    }).then(res => {
      if (res.success) {
        setPageControlList(res.data);
      } else {
        enqueueSnackbar(res.message, {
          variant: "warning",
          persist: true
        });
      }
      setIsPageControlListLoading(false);
    });
  };

  useEffect(() => {
    getPageDetail();
    getPageControlList();
  }, [getParams]);

  /**
   * @description [事件]input
   */
  const edit_HandleInput = (e) => {
    const { name, value, checked, type } = e.target
    const val = value === "" ? null : value;
    setPagepDetail(prev => ({
      ...prev,
      updPage: {
        ...prev.updPage,
        [name]: type === 'checkbox'
          ? checked
            ? 'Y'
            : 'N'
          : val
      }
    }));
  };

  /**
   * @description [確認]儲存頁面資訊
   */
  const edit_Confirm = useCallback(() => {
    if (pageDetail.updPage.code === null || pageDetail.updPage.name === null) {
      setPageDetailCheck({
        code: pageDetail.updPage.code === null ? true : false,
        name: pageDetail.updPage.name === null ? true : false
      });
    } else {
      setPageDetailCheck(initPageDetailCheck);

      PageAPI.UpdatePages(pageDetail.updPage).then(res => {
        if (res.success) {
          getPageDetail();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  });

  /**
   * 新增按鈕
   */
  const add_Click = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      id: "add",
      DialogTitle: "新增按鈕",
      DialogContent: <DialogsInner type={"add"} ref={useDialogInner} page_id={getParams.page_id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]新增按鈕控制項
   */
  const add_Confirm = () => {
    const { addPageControl, initAddPageControlCheck, setAddPageControlCheck } = useDialogInner.current;
    if (!addPageControl.ctrl_code || !addPageControl.name) {
      setAddPageControlCheck({
        ctrl_code: !addPageControl.ctrl_code ? true : false,
        name: !addPageControl.name ? true : false
      });
    } else {
      setAddPageControlCheck(initAddPageControlCheck);

      PageAPI.AddPageControl(addPageControl).then(res => {
        if (res.success) {
          getPageControlList();
          dialogClose();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [編輯]按鈕控制項
   */
  const edit_ControlClick = ({ e, id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    const getEditData = pageControlList.filter(ele => ele.pc_id === id)[0];

    setDialogData(({
      id: "edit",
      DialogTitle: "編輯",
      DialogContent: <DialogsInner type={"edit"} ref={useDialogInner} getEditData={getEditData} page_id={getParams.page_id} pc_id={id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={edit_ControlConfirm} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]編輯按鈕控制項
   */
  const edit_ControlConfirm = (e) => {
    const { editData, initEditPageControlCheck, setEditPageControlCheck } = useDialogInner.current;

    if (editData.updPageControl.ctrl_code === null || editData.updPageControl.name === null) {
      setEditPageControlCheck({
        ctrl_code: editData.updPageControl.ctrl_code === null ? true : false,
        name: editData.updPageControl.name === null ? true : false
      });
    } else {
      setEditPageControlCheck(initEditPageControlCheck);

      PageAPI.UpdatePageControl(editData.updPageControl).then(res => {
        if (res.success) {
          dialogClose();
          getPageControlList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [刪除]按鈕控制項
   */
  const del_Click = ({ e, id, name }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();
    setDialogData(({
      id: "del",
      DialogTitle: "刪除按鈕",
      DialogContent: <DialogsInner type={"del"} ref={useDialogInner} name={name} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => del_Confirm(id)} color="primary" text="確認" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]刪除按鈕控制項
   */
  const del_Confirm = (_id) => {
    PageAPI.DeletePageControl({
      pc_id: _id
    }).then(res => {
      if (res.success) {
        dialogClose();
        getPageControlList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  };

  /**
   * @description [關閉]Dialog
   */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose()
  }, []);

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    return (
      pageControlList.map((ele) => (
        <TableRow hover key={ele.pc_id}>
          <TableCell>{ele.su === "Y" ? <CheckCircleOutline style={{ color: "#23be4e" }} /> : ""}</TableCell>
          <TableCell>{ele.ctrl_code}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.code}</TableCell>
          <TableCell>
            <CusIconButton
              onClick={(e) => edit_ControlClick({ e: e, id: ele.pc_id })}
              color="primary"
              icon={<Edit />} />
            <CusIconButton
              onClick={(e) => del_Click({ e: e, name: ele.name, id: ele.pc_id })}
              color="primary"
              icon={<Delete />} />
          </TableCell>
        </TableRow>
      ))
    )
  });

  let data = {
    ...pageDetail.dtlPage,
    ...pageDetail.updPage
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>頁面資訊</Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"info--code"}
                  name={"code"}
                  label={"頁面代號"}
                  type={"text"}
                  required={true}
                  error={pageDetailCheck.code}
                  value={data.code}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"info--name"}
                  name={"name"}
                  label={"頁面名稱"}
                  type={"text"}
                  required={true}
                  error={pageDetailCheck.name}
                  value={data.name}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"info--seq"}
                  name={"seq"}
                  label={"排序"}
                  type={"number"}
                  value={data.seq}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <CusInput
                  id={"info--icon"}
                  name={"icon"}
                  label={"圖標"}
                  type={"text"}
                  value={data.icon}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3} className={"alignMiddle"}>
                <CusCheckboxLabel
                  id={"info--su"}
                  name={'su'}
                  label={"設置系統使用"}
                  type={"checkbox"}
                  value={data.su}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"儲存修改"}
                  startIcon={<Save />}
                  onClick={edit_Confirm} />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"primary"}
                  text={"新增按鈕"}
                  startIcon={<Add />}
                  onClick={add_Click} />
              </Grid>
              {!isPageControlListLoading
                ? pageControlList.length > 0
                  ? <Grid item xs={12}>
                    <CusBasicTable
                      TableHead={[
                        { name: "系統使用" },
                        { name: "按鈕代號" },
                        { name: "按鈕名稱" },
                        { name: "頁面代碼" },
                        { name: "操作" }]}
                      TableBody={<TableBodyContent />}
                    />
                  </Grid>
                  : <NoResults />
                : <CircularLoading />}
            </React.Fragment>}
          />
        </Grid>
      </Grid>
      <CusDialog ref={useDialog} info={dialogData} />
    </React.Fragment>
  )
};

export default ControlList;

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  let { page_id, pc_id, getEditData, name, type } = props;

  // 新增按鈕控制項
  const [addPageControl, setAddPageControl] = useState({
    page_id: page_id,
    su: "N",
    ctrl_code: null,
    name: null
  });
  const initAddPageControlCheck = { ctrl_code: false, name: false }
  const [addPageControlCheck, setAddPageControlCheck] = useState(initAddPageControlCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = (e) => {
    const { name, value, checked, type } = e.target
    const val = value === "" ? null : value;

    setAddPageControl(prevData => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? checked
          ? 'Y'
          : 'N'
        : val
    }));
  };

  const [editData, setEditData] = useState({
    dtlPageControl: getEditData,
    updPageControl: {
      page_id: page_id,
      pc_id: pc_id
    }
  });
  const initEditPageControlCheck = { ctrl_code: false, name: false }
  const [editPageControlCheck, setEditPageControlCheck] = useState(initEditPageControlCheck);

  /**
   * @description [事件]input
   */
  const edit_HandleInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = value === "" ? null : value;

    setEditData(prev => ({
      ...prev,
      updPageControl: {
        ...prev.updPageControl,
        [name]: type === 'checkbox'
          ? checked
            ? 'Y'
            : 'N'
          : val
      }
    }));
  }, []);

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    addPageControl,
    initAddPageControlCheck,
    setAddPageControlCheck,

    editData,
    initEditPageControlCheck,
    setEditPageControlCheck
  }));

  if (type === "add") {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={3} lg={3}>
          <CusInput
            id={"add--ctrl_code"}
            name={"ctrl_code"}
            label={"按鈕代號"}
            type={"text"}
            required={true}
            error={addPageControlCheck.ctrl_code}
            value={addPageControl.ctrl_code}
            onChangeEvent={(e) => add_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <CusInput
            id={"add--name"}
            name={"name"}
            label={"按鈕名稱"}
            type={"text"}
            required={true}
            value={addPageControl.name}
            error={addPageControlCheck.name}
            onChangeEvent={(e) => add_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <CusInput
            id={"add--code"}
            name={"code"}
            label={"頁面代碼"}
            type={"text"}
            value={addPageControl.code}
            onChangeEvent={(e) => add_HandleInput(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3} lg={3} className={"alignMiddle"}>
          <CusCheckboxLabel
            id={"add--su"}
            name={'su'}
            label={"設置系統使用"}
            type={"text"}
            value={addPageControl.su}
            onChangeEvent={(e) => add_HandleInput(e)}
          />
        </Grid>
      </React.Fragment>
    )

  } else if (type === "edit") {
    let data = {
      ...editData.dtlPageControl,
      ...editData.updPageControl
    };

    return (
      <React.Fragment>
        <CusInput
          id={"edit--ctrl_code"}
          name={"ctrl_code"}
          label={"按鈕代碼"}
          type={"text"}
          required={true}
          error={editPageControlCheck.ctrl_code}
          value={data.ctrl_code}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusInput
          id={"edit--name"}
          name={"name"}
          label={"按鈕名稱"}
          type={"text"}
          required={true}
          error={editPageControlCheck.name}
          value={data.name}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusInput
          id={"edit--code"}
          name={"code"}
          label={"頁面代碼"}
          type={"text"}
          value={data.code}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusCheckboxLabel
          id={"edit--su"}
          name={"su"}
          label={"設置系統使用"}
          type={"checkbox"}
          value={data.su}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
      </React.Fragment>
    )
  } else if (type === "del") {
    return (
      <Typography component={"p"}>
        確定刪除 <CusSpan text={name} color="info" /> ?
      </Typography>
    )
  }
});