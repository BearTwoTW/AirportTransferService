import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, TableCell, TableRow, Divider, Button, Typography } from '@mui/material';
import { Add, Edit, Save, CheckCircleOutline, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { useCheckLogInXPermission } from '../../../../js/Function';
import { CusDialog } from '../../../../components/CusDialog';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusInput } from '../../../../components/CusInput';
import { NoResults } from '../../../../components/CusError';
import { SystemParamAPI, OptionList } from '../../../../js/APITS';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusSpan } from '../../../../components/CusSpanTS';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const CustomerCodeSecond = () => {
  // 權限
  const permission = useCheckLogInXPermission('CustomerCodeFirst', ['Add', 'Delete']);

  // 取得傳值
  const location = useLocation();
  const getParams = location.state;

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 大分類代碼資訊
  const [primaryDetail, setPrimaryDetail] = useState({
    dtlPrimary: {},
    updPrimary: { spp_id: getParams.spp_id }
  });
  const initPrimaryDetailCheck = { name: false };
  const [primaryDetailCheck, setPrimaryDetailCheck] = useState(initPrimaryDetailCheck);

  // 中分類代碼列表
  const [secondList, setSecondList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 取得大分類代碼資訊
   */
  const getPrimaryDetail = useCallback(() => {
    SystemParamAPI.PrimaryDetail({ spp_id: getParams.spp_id }).then(res => {
      if (res.success) {
        setPrimaryDetail(prev => ({
          ...prev,
          dtlPrimary: res.data,
        }));
      } else {
        enqueueSnackbar(res.message, {
          variant: 'warning',
          persist: true
        });
      }
    });
  }, []);

  /**
   * 取得中分類代碼列表
   */
  const getSecondList = useCallback(() => {
    SystemParamAPI.SecondList({ spp_id: getParams.spp_id }).then(res => {
      if (res.success) {
        setSecondList(res.data);
      } else {
        enqueueSnackbar(res.message, {
          variant: 'warning',
          persist: true
        });
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getPrimaryDetail();
    getSecondList();
  }, [getParams]);

  /**
   * 儲存編輯大分類代碼
   */
  const updatePrimaryCode = () => {
    if (primaryDetail.updPrimary.name === null) {
      setPrimaryDetailCheck({ name: primaryDetail.updPrimary.name === null ? true : false });
    } else {
      setPrimaryDetailCheck(initPrimaryDetailCheck);

      SystemParamAPI.UpdatePrimary(primaryDetail.updPrimary).then(res => {
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * 新增中分類代碼
   */
  const add_click = (e) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'add',
      DialogTitle: '新增代碼',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} spp_id={getParams.spp_id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  };

  /**
   * 確認新增中分類代碼
   */
  const add_confirm = () => {
    const { addSecond, initAddSecondCheck, setAddSecondCheck } = useDialogInner.current;

    if (!addSecond.name) {
      setAddSecondCheck({ name: !addSecond.name ? true : false });
    } else {
      setAddSecondCheck(initAddSecondCheck);

      SystemParamAPI.AddSecond(addSecond).then(res => {
        if (res.success) {
          dialogClose();
          getSecondList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * 編輯輸入框
   */
  const edit_handleInput = e => {
    const { name, value } = e.target
    const val = value === "" ? null : value;

    setPrimaryDetail(prev => ({
      ...prev,
      updPrimary: {
        ...prev.updPrimary,
        [name]: val
      }
    }));
  };

  /**
   * [Dialog] 編輯中分類代碼
   */
  const edit_click = ({ e, sps_id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    const getEditData = secondList.filter(item => item.sps_id === sps_id)[0];

    setDialogData(({
      id: 'edit',
      DialogTitle: '修改代碼',
      DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} spp_id={getParams.spp_id} sps_id={sps_id} getEditData={getEditData} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { edit_confirm() }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * [Dialog] 確認編輯中分類代碼
   */
  const edit_confirm = () => {
    const { editSecondData, initEditSecondCheck, setEditSecondCheck } = useDialogInner.current;

    if (editSecondData.updSecond.name === null || editSecondData.updSecond.visible === null || editSecondData.updSecond.sps_id === null) {
      setEditSecondCheck({
        name: editSecondData.updSecond.name === null ? true : false,
        visible: editSecondData.updSecond.visible === null ? true : false,
        sps_id: editSecondData.updSecond.sps_id === null ? true : false
      });
    } else {
      setEditSecondCheck(initEditSecondCheck);

      SystemParamAPI.UpdateSecond(editSecondData.updSecond).then(res => {
        if (res.success) {
          dialogClose();
          getSecondList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  };

  /**
   * [Dialog] 刪除
   */
  const del_click = ({ e, sps_id, name }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'del',
      DialogTitle: '刪除代碼',
      DialogContent: <DialogsInner type={'del'} ref={useDialogInner} sps_id={sps_id} name={name} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { del_confirm(sps_id) }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * [Dialog] 刪除確認
   */
  const del_confirm = (_sps_id) => {
    SystemParamAPI.DeleteSecond({
      spp_id: getParams.spp_id,
      sps_id: _sps_id
    }).then(res => {
      if (res.success) {
        dialogClose();
        getSecondList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? 'success' : 'error',
        persist: !res.success
      });
    });
  };

  /**
   * @description [關閉]Dialog
   */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose();
  }, []);

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    return (
      secondList.map((ele) => (
        <TableRow key={ele.sps_id}>
          <TableCell>{ele.sps_id}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.visible === 'Y' ? <CheckCircleOutline style={{ color: '#23be4e' }} /> : ''}</TableCell>
          <TableCell>{ele.remark}</TableCell>
          <TableCell>
            <CusIconButton
              onClick={e => {
                edit_click({ e, sps_id: ele.sps_id });
              }}
              color='primary'
              icon={<Edit />} />
            {permission.Delete
              ? <CusIconButton
                onClick={e => { del_click({ e, sps_id: ele.sps_id, name: ele.name }) }}
                color={'primary'}
                icon={<Delete />}
              />
              : null}

          </TableCell>
        </TableRow>
      ))
    )
  });

  let data = {
    ...primaryDetail.dtlPrimary,
    ...primaryDetail.updPrimary
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item lg={12} md={12} xs={12} style={{ marginBottom: '1rem' }}>代碼資訊</Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={'edit--code'}
                  name={'code'}
                  label={'代碼'}
                  type={'text'}
                  value={getParams.spp_id}
                  error={false}
                  onChangeEvent={e => { edit_handleInput(e) }}
                  required={false}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={'edit--name'}
                  name={'name'}
                  label={'名稱'}
                  type={'text'}
                  value={data.name}
                  error={primaryDetailCheck.name}
                  onChangeEvent={e => { edit_handleInput(e) }}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CusInput
                  id={'edit--remark'}
                  name={'remark'}
                  label={'備註'}
                  type={'text'}
                  required={false}
                  onChangeEvent={e => { edit_handleInput(e) }}
                  value={data.remark}
                />
              </Grid>
              <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                <CusTextIconButton
                  color={'primary'}
                  text={'儲存修改'}
                  startIcon={<Save />}
                  onClick={() => { updatePrimaryCode() }}
                />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              {permission.Add
                ? <React.Fragment>
                  <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                    <CusTextIconButton
                      color={'primary'}
                      text={'新增'}
                      startIcon={<Add />}
                      onClick={(e) => { add_click(e) }}
                    />
                  </Grid>
                </React.Fragment>
                : null}
              <Grid item xs={12}>
                {!isLoading
                  ? secondList.length > 0
                    ? <CusBasicTable
                      TableHead={[
                        { name: '項目代碼' },
                        { name: '項目名稱' },
                        { name: '顯示狀態' },
                        { name: '備註' },
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
    </React.Fragment>
  )
};
export default CustomerCodeSecond;

/**
 * [Dialog] 內容
 */
const DialogsInner = forwardRef((props, ref) => {
  const { type, spp_id, getEditData, sps_id, name } = props;
  // 新增中分類代碼
  const [addSecond, setAddSecond] = useState({ spp_id: spp_id });
  const initAddSecondCheck = { name: false };
  const [addSecondCheck, setAddSecondCheck] = useState(initAddSecondCheck);

  /**
   * 新增輸入框
   */
  const add_handleInput = useCallback(e => {
    const { name, value } = e.target
    const val = value === "" ? null : value;

    setAddSecond(prev => ({
      ...prev,
      [name]: val
    }));
  }, []);

  // 中分類代碼編輯
  const [editSecondData, setEditSecondData] = useState({
    dltSecond: getEditData,
    updSecond: {
      spp_id: spp_id,
      sps_id: sps_id
    }
  });
  const initEditSecondCheck = {
    visible: false,
    sps_id: false,
    name: false,
  };
  const [editSecondCheck, setEditSecondCheck] = useState(initEditSecondCheck);

  /**
   * 下拉選單，編輯中分類代碼
   */
  const edit_handleSelect = useCallback((e) => {
    const { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    setEditSecondData(prev => ({
      ...prev,
      updSecond: {
        ...prev.updSecond,
        [name]: val
      }
    }));
  }, []);

  /**
   * 輸入框，編輯中分類代碼
   */
  const edit_handleInput = useCallback((e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setEditSecondData(prev => ({
      ...prev,
      updSecond: {
        ...prev.updSecond,
        [name]: val
      }
    }));
  }, []);

  let secondData = {
    ...editSecondData.dltSecond,
    ...editSecondData.updSecond
  };

  useImperativeHandle(ref, () => ({
    addSecond,
    initAddSecondCheck,
    setAddSecondCheck,

    editSecondData,
    initEditSecondCheck,
    setEditSecondCheck
  }));
  if (type === "add") {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <CusInput
              id={'add--name'}
              name={'name'}
              label={'項目名稱'}
              type={'text'}
              required={true}
              error={addSecondCheck.name}
              onChangeEvent={e => { add_handleInput(e) }}
              value={addSecond.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CusInput
              id={'add--remark'}
              name={'remark'}
              label={'備註'}
              type={'text'}
              value={addSecond.remark}
              onChangeEvent={e => { add_handleInput(e) }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  } else if (type === 'edit') {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <CusOutlinedSelect
              id={'edit--visible'}
              name={'visible'}
              label={'是否顯示'}
              options={OptionList.visArr}
              optionKey={'value'}
              required={true}
              error={editSecondCheck.visible}
              onChangeEvent={e => edit_handleSelect(e)}
              value={OptionList.visArr.some(item => item.value === secondData.visible) ? OptionList.visArr.find(item => item.value === secondData.visible) : null}
            />
          </Grid>
          <Grid item xs={12}>
            <CusInput
              id={'edit--sps_id'}
              name={'sps_id'}
              label={'項目代碼'}
              type={'text'}
              disabled={true}
              required={true}
              error={editSecondCheck.sps_id}
              value={secondData.sps_id}
            />
          </Grid>
          <Grid item xs={12}>
            <CusInput
              id={'edit--name'}
              name={'name'}
              label={'項目名稱'}
              type={'text'}
              required={true}
              error={editSecondCheck.name}
              onChangeEvent={e => { edit_handleInput(e) }}
              value={secondData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <CusInput
              id={'edit--remark'}
              name={'remark'}
              label={'備註'}
              type={'text'}
              value={secondData.remark}
              onChangeEvent={e => { edit_handleInput(e) }}
              required={false}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  } else if (type === 'del') {
    return (
      <Typography component={'p'}>
        確定刪除 <CusSpan text={`${sps_id} - ${name}`} color="info" /> ?
      </Typography>
    )
  };
}, []);