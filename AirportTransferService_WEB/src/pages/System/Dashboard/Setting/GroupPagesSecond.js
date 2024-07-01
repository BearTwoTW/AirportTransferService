import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Button, Typography } from '@mui/material';
import { Add, CheckCircleOutline, Save, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTable } from '../../../../components/CusTable';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { NoResults } from '../../../../components/CusError';
import { DDMenu, PageAPI } from '../../../../js/APITS';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const GroupPagesSecond = () => {
  // 導頁
  const navigate = useNavigate();

  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // 下拉選單
  const [options, setOptions] = useState({ SYSArr: [], MNLArr: [] });

  // Dialog
  const [dialogData, setDialogData] = useState({});
  const useDialog = useRef();
  const useDialogInner = useRef();

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 群組資訊
  const [groupDetail, setGroupDetail] = useState({
    dtlGroupDetail: {
      pg_id: getParams.pg_id
    },
    updGroupDetail: {
      pg_id: getParams.pg_id
    }
  });
  const initGroupDetailCheck = {
    code: false,
    name: false,
    system: false,
    menus: false,
  };
  const [groupDetailCheck, setGroupDetailCheck] = useState(initGroupDetailCheck);

  // 頁面列表
  const [pageList, setPageList] = useState([]);
  const [isPageListLoading, setIsPageListLoading] = useState(false);

  /**
   * 取得群組資訊
   */
  const getGroupDetail = () => {
    PageAPI.PageGroupEdit({
      pg_id: getParams.pg_id
    }).then(res => {
      if (res.success) {
        setGroupDetail(prev => ({
          ...prev,
          dtlGroupDetail: res.data,
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
   * 取得頁面列表
   */
  const getPagesList = () => {
    setIsPageListLoading(true);

    PageAPI.PagesList({
      pg_id: getParams.pg_id
    }).then(res => {
      if (res.success) {
        setPageList(res.data);
      } else {
        enqueueSnackbar(res.message, {
          variant: "warning",
          persist: true
        });
      }

      setIsPageListLoading(false);
    });
  };

  useEffect(() => {
    /**
     * [查詢]DDJson
     */
    async function awaitJsonList() {
      const sysArr = await DDMenu.selectorCode('SYS');
      const mnlArr = await DDMenu.selectorCode('MNL');

      setOptions(prevData => ({
        ...prevData,
        SYSArr: sysArr,
        MNLArr: mnlArr
      }));
    };

    awaitJsonList();
    getGroupDetail();
    getPagesList();
  }, [getParams]);

  const add_click = (e) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'add',
      DialogTitle: '新增頁面',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} pg_id={getParams.pg_id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]新增項目代碼
   */
  const add_confirm = () => {
    const { addCode, initAddCodeCheck, setAddCodeCheck } = useDialogInner.current;

    if (!addCode.code || !addCode.name) {
      setAddCodeCheck({
        code: !addCode.code ? true : false,
        name: !addCode.name ? true : false,
      });
    } else {
      setAddCodeCheck(initAddCodeCheck);

      PageAPI.AddPages(addCode).then(res => {
        if (res.success) {
          dialogClose();
          getPagesList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * [事件]Input
   */
  const edit_HandleInput = (e) => {
    const { name, value, checked, type } = e.target;
    const val = value === "" ? null : value;

    setGroupDetail(prev => ({
      ...prev,
      updGroupDetail: {
        ...prev.updGroupDetail,
        [name]: type === 'checkbox'
          ? checked
            ? 'Y'
            : 'N'
          : val
      }
    }));
  };


  /**
   * [事件]Select
   */
  const edit_HandleSelect = (e) => {
    const { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    setGroupDetail(prev => ({
      ...prev,
      updGroupDetail: {
        ...prev.updGroupDetail,
        [name]: val
      }
    }));
  };

  /**
   * @description [確認]編輯群組資訊
   */
  const edit_Confirm = () => {
    if (groupDetail.updGroupDetail.code === null || groupDetail.updGroupDetail.name === null || groupDetail.updGroupDetail.system === null || groupDetail.updGroupDetail.menus === null) {
      setGroupDetailCheck({
        code: groupDetail.updGroupDetail.code === null ? true : false,
        name: groupDetail.updGroupDetail.name === null ? true : false,
        system: groupDetail.updGroupDetail.system === null ? true : false,
        menus: groupDetail.updGroupDetail.menus === null ? true : false,
      });
    } else {
      setGroupDetailCheck(initGroupDetailCheck);

      PageAPI.UpdatePageGroup(groupDetail.updGroupDetail).then(res => {
        if (res.success) {
          getGroupDetail();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [刪除]頁面
   */
  const del_Click = ({ e, id, name }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();
    setDialogData(({
      id: "del",
      DialogTitle: "刪除頁面",
      DialogContent: <DialogsInner type={"del"} ref={useDialogInner} name={name} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => del_Confirm(id)} color="primary" text="確認" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]刪除頁面 
   */
  const del_Confirm = (_id) => {
    PageAPI.DeletePages({
      page_id: _id
    }).then(res => {
      if (res.success) {
        dialogClose();
        getPagesList();
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
    /**
     * @description [事件]進入編輯頁面
     */
    const navigate_HandleSecond = useCallback((page_id) => {
      navigate(`/System/Setting/GroupPagesFirst/ControlList`, {
        state: {
          page_id: page_id,
          pg_id: getParams.pg_id
        }
      });
    }, [navigate, location.pathname]);

    return (
      pageList.map((ele) => (
        <TableRow hover key={ele.page_id}
          onClick={() => navigate_HandleSecond(ele.page_id)}>
          <TableCell>{ele.su === "Y" ? <CheckCircleOutline style={{ color: "#23be4e" }} /> : ""}</TableCell>
          <TableCell>{ele.code}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.seq}</TableCell>
          <TableCell>
            <CusIconButton
              onClick={(e) => del_Click({ e: e, id: ele.page_id, name: ele.name })}
              color="primary"
              icon={<Delete />} />
          </TableCell>
        </TableRow>
      ))
    )
  });

  let data = {
    ...groupDetail.dtlGroupDetail,
    ...groupDetail.updGroupDetail
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "1rem" }}>群組資訊</Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--code"}
                  name={"code"}
                  label={"群組代號"}
                  type={"text"}
                  required={true}
                  error={groupDetailCheck.code}
                  value={data.code}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--name"}
                  name={"name"}
                  label={"群組名稱"}
                  type={"text"}
                  error={groupDetailCheck.name}
                  required={true}
                  value={data.name}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusOutlinedSelect
                  id={"info--system"}
                  name={"system"}
                  label={"系統"}
                  options={options.SYSArr}
                  optionKey={"sps_id"}
                  required={true}
                  error={groupDetailCheck.system}
                  value={options.SYSArr.some(item => item.sps_id === data.system) ? options.SYSArr.find(item => item.sps_id === data.system) : null}
                  onChangeEvent={(e) => edit_HandleSelect(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusOutlinedSelect
                  id={"info--menus"}
                  name={"menus"}
                  label={"選單"}
                  options={options.MNLArr}
                  optionKey={"sps_id"}
                  required={true}
                  error={groupDetailCheck.menus}
                  value={options.MNLArr.some(item => item.sps_id === data.menus) ? options.MNLArr.find(item => item.sps_id === data.menus) : null}
                  onChangeEvent={(e) => edit_HandleSelect(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--seq"}
                  name={"seq"}
                  label={"排序"}
                  type={"number"}
                  value={data.seq}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <CusInput
                  id={"info--icon"}
                  name={"icon"}
                  label={"圖標"}
                  type={"text"}
                  value={data.icon}
                  onChangeEvent={(e) => edit_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
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
                  onClick={() => edit_Confirm()} />
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
                  text={"新增頁面"}
                  startIcon={<Add />}
                  onClick={(e) => { add_click(e) }} />
              </Grid>
              <Grid item xs={12}>
                {!isPageListLoading
                  ? pageList.length > 0
                    ? <CusBasicTable
                      TableHead={[
                        { name: '系統使用' },
                        { name: '頁面代號' },
                        { name: '頁面名稱' },
                        { name: '排序' },
                        { name: '操作' }]}
                      TableBody={<TableBodyContent />}
                    />
                    : <NoResults />
                  : <CircularLoading />}
              </Grid>
            </React.Fragment>}
          />
        </Grid>
      </Grid>
      <CusDialog ref={useDialog} info={dialogData} />
    </React.Fragment >
  );
};

export default GroupPagesSecond;

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  let { type, name, pg_id } = props

  // 新增項目代碼
  const [addCode, setAddCode] = useState({
    pg_id: pg_id,
    su: "N",
    code: null,
    name: null
  });
  const initAddCodeCheck = { code: false, name: false };
  const [addCodeCheck, setAddCodeCheck] = useState(initAddCodeCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = (e) => {
    const { name, value, checked, type } = e.target;
    const val = value === "" ? null : value;

    setAddCode(prevData => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? checked
          ? 'Y'
          : 'N'
        : val
    }));
  };

  useImperativeHandle(ref, () => ({
    addCode,
    initAddCodeCheck,
    setAddCodeCheck
  }));

  if (type === "add") {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <CusCheckboxLabel
              id={"add--su"}
              name={'su'}
              label={"設置系統使用"}
              type={"checkbox"}
              value={addCode.su}
              onChangeEvent={(e) => add_HandleInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CusInput
              id={"add--code"}
              name={"code"}
              label={"頁面代號"}
              type={"text"}
              required={true}
              error={addCodeCheck.code}
              value={addCode.code}
              onChangeEvent={(e) => add_HandleInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CusInput
              id={"add--name"}
              name={"name"}
              label={"頁面名稱"}
              type={"text"}
              required={true}
              error={addCodeCheck.name}
              value={addCode.name}
              onChangeEvent={(e) => add_HandleInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CusInput
              id={"add--seq"}
              name={"seq"}
              label={"排序"}
              type={"number"}
              value={addCode.seq}
              onChangeEvent={(e) => add_HandleInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CusInput
              id={"add--icon"}
              name={"icon"}
              label={"圖標"}
              type={"text"}
              value={addCode.icon}
              onChangeEvent={(e) => add_HandleInput(e)}
            />
          </Grid>
        </Grid>
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