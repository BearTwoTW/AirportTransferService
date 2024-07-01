import React, { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, TableCell, TableRow, Divider } from '@mui/material';
import { Add, CheckCircleOutline } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusBasicTable } from '../../../../components/CusTable';
import { CusTextIconButton, CusTextButton } from '../../../../components/CusButton';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusDialog } from '../../../../components/CusDialog';
import { CusInput } from '../../../../components/CusInput';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { SystemParamAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';
import { NoResults } from '../../../../components/CusError';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const CodeFirst = () => {
  // 權限
  const permission = useCheckLogInXPermission('CodeFirst', ['secondEdit']);

  // 取得傳值
  const location = useLocation();
  const navigate = useNavigate();

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 大分類代碼列表
  const [primaryCodeList, setPrimaryCodeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 大分類代碼查詢
   */
  const getPrimaryCodeList = useCallback(() => {
    SystemParamAPI.PrimaryList().then(res => {
      if (res.success) {
        setPrimaryCodeList(res.data);
      } else {
        enqueueSnackbar(res.message, {
          variant: 'warning',
          persist: true
        });
      };
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getPrimaryCodeList();
  }, [])

  /**
   * [Dialog] 新增代碼
   */
  const add_click = (e) => {
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'add',
      DialogTitle: '新增大分類代碼',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { add_confirm() }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * [Dialog] 新增代碼確認
   */
  const add_confirm = () => {
    const { addPrimary, initCheckState, setAddFieldCheck } = useDialogInner.current;

    if (addPrimary.spp_id === null || addPrimary.name === null) {
      // 新增代碼state的判斷，決定欄位檢查state的true or false
      setAddFieldCheck({
        spp_id: addPrimary.spp_id === null ? true : false,
        name: addPrimary.name === null ? true : false
      });
    } else {
      // 成功，重置欄位檢查state
      setAddFieldCheck(initCheckState);

      SystemParamAPI.AddPrimary(addPrimary).then(res => {
        if (res.success) {
          getPrimaryCodeList();
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
   * @description [關閉]Dialog
   */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose();
  }, []);

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    /**
     * @description [事件]SecondEdit入口
     */
    const navigate_HandleSecond = useCallback((spp_id) => {
      if (permission.secondEdit) {
        navigate(`${location.pathname}/CodeSecond`, {
          state: { spp_id }
        });
      } else {
        enqueueSnackbar('此帳號無權限使用', {
          variant: 'warning',
          persist: true
        });
      }
    }, [navigate, location.pathname]);

    return (
      primaryCodeList.length > 0 ?
        primaryCodeList.map((ele, seq) => (
          <TableRow hover key={ele.spp_id}
            onClick={() => navigate_HandleSecond(ele.spp_id)}>
            <TableCell>{parseInt(seq) + 1}</TableCell>
            <TableCell>{ele.su === 'Y' ? <CheckCircleOutline style={{ color: '#23be4e' }} /> : ''}</TableCell>
            <TableCell>{ele.spp_id}</TableCell>
            <TableCell>{ele.name}</TableCell>
            <TableCell>{ele.remark}</TableCell>
          </TableRow>
        )) : null
    )
  })

  return (
    <React.Fragment>
      <CusCard content={
        <React.Fragment>
          <Grid item xs={12} display={'flex'} justifyContent={'end'}>
            <CusTextIconButton
              color={'primary'}
              text={'新增代碼'}
              startIcon={<Add />}
              onClick={() => { add_click() }} />
          </Grid>
          {!isLoading
            ? primaryCodeList.length > 0
              ? <Grid item xs={12}>
                <CusBasicTable
                  TableHead={[
                    { name: '排序' },
                    { name: '系統使用' },
                    { name: '代碼' },
                    { name: '名稱' },
                    { name: '備註' }]}
                  TableBody={<TableBodyContent />} />
              </Grid>
              : <NoResults />
            : <CircularLoading />}
        </React.Fragment>}
      />
      <CusDialog ref={useDialog} info={dialogData} />
    </React.Fragment>
  )
}
export default CodeFirst;

/**
 * [Dialog] 內容
 */
const DialogsInner = forwardRef((props, ref) => {
  // 新增代碼
  const [addPrimary, setAddPrimary] = useState({
    spp_id: null,
    name: null,
    su: 'N'
  });

  // 欄位檢查
  const initCheckState = {
    spp_id: false,
    name: false
  };
  const [addFieldCheck, setAddFieldCheck] = useState(initCheckState);

  /**
   * 輸入框
   */
  const add_handleInput = (e) => {
    const { name, value, checked, type } = e.target;
    const val = value === "" ? null : value;

    setAddPrimary(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
          ? 'Y'
          : 'N'
        : val
    }));
  };

  useImperativeHandle(ref, () => ({
    // 新增代碼參數
    addPrimary,
    // 欄位檢查
    initCheckState,
    setAddFieldCheck
  }));

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <CusCheckboxLabel
            id={"add--su"}
            name={'su'}
            label={"設置系統使用"}
            type={'checkbox'}
            onChangeEvent={e => add_handleInput(e)}
            value={addPrimary.su}
          />
        </Grid>
        <Grid item xs={12}>
          <CusInput
            id={'add--spp_id'}
            name={'spp_id'}
            label={'大分類代碼'}
            type={'text'}
            required={true}
            error={addFieldCheck.spp_id}
            onChangeEvent={e => { add_handleInput(e) }}
            value={addPrimary.spp_id}
          />
        </Grid>
        <Grid item xs={12}>
          <CusInput
            id={'add--name'}
            name={'name'}
            label={'名稱'}
            type={'text'}
            required={true}
            error={addFieldCheck.name}
            onChangeEvent={e => { add_handleInput(e) }}
            value={addPrimary.name}
          />
        </Grid>
        <Grid item xs={12}>
          <CusInput
            id={'add--remark'}
            name={'remark'}
            label={'備註'}
            type={'text'}
            onChangeEvent={e => { add_handleInput(e) }}
            value={addPrimary.remark}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}, []);