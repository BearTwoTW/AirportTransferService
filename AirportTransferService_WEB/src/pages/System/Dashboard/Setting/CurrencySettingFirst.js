import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Grid, TableCell, TableRow, Divider, Button, Typography } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusInput } from '../../../../components/CusInput';
import { NoResults } from '../../../../components/CusError';
import { CusDialog } from '../../../../components/CusDialog';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CurrencyAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function CurrencySettingFirst() {
  // 權限
  const permission = useCheckLogInXPermission('CurrencySettingFirst', ['Add', 'Edit', 'Delete']);

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 查詢
  const [pageSearch, setPageSearch] = useState({
    currency: '',
    count: 0,
    nowPage: 0,
    rowsPerPage: 10
  });

  // 幣別列表
  const [currencyList, setCurrencyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @description [查詢]幣別
   */
  const getCurrencyList = () => {
    setIsLoading(true);
    CurrencyAPI.CurrencySearch({
      ...pageSearch
    }).then(res => {
      if (res.success) {
        setCurrencyList(res.data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  /**
   * @description [新增]幣別
   */
  const add_Click = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'add',
      DialogTitle: '新增貨幣',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { add_Confirm() }} color="primary" text="新增" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]新增幣別
   */
  const add_Confirm = () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current;

    if (!addData.currency || addData.exchange_rate === null) {
      setAddDataCheck({
        currency: !addData.currency ? true : false,
        exchange_rate: addData.exchange_rate === null ? true : false,
      });
    } else {
      setAddDataCheck(initAddDataCheck);

      CurrencyAPI.CurrencyCreate(addData).then(res => {
        if (res.success) {
          dialogClose();
          getCurrencyList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'warning',
          persist: !res.success
        });
      });
    }
  };

  /**
 * @description [修改]幣別
 */
  const edit_Click = ({ e, id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    const getEditData = currencyList.filter(item => item.currency_id === id)[0];

    setDialogData(({
      id: 'edit',
      DialogTitle: '修改',
      DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} currency_id={id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]修改幣別
   */
  const edit_Confirm = () => {
    const { editData, initEditDataCheck, setEditDataCheck } = useDialogInner.current;

    if (editData.updCurrency.currency === null || editData.updCurrency.exchange_rate === null) {
      setEditDataCheck({
        currency: editData.updCurrency.currency === null ? true : false,
        exchange_rate: editData.updCurrency.exchange_rate === null ? true : false,
      });
    } else {
      setEditDataCheck(initEditDataCheck);

      CurrencyAPI.CurrencyUpdate(editData.updCurrency).then(res => {
        if (res.success) {
          dialogClose();
          getCurrencyList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'warning',
          persist: !res.success
        });
      });
    }
  };

  /**
 * @description [刪除]幣別
 */
  const del_Click = ({ e, name, id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    setDialogData(({
      id: 'del',
      DialogTitle: '刪除',
      DialogContent: <DialogsInner type={'del'} ref={useDialogInner} name={name} id={id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { del_Confirm(e, id) }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]刪除幣別
   */
  const del_Confirm = (e, _id) => {
    e.stopPropagation();

    CurrencyAPI.CurrencyDelete({
      currency_id: _id
    }).then(res => {
      if (res.success) {
        dialogClose();
        getCurrencyList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? 'success' : 'warning',
        persist: !res.success
      });
    });
  };

  /**
   * @description [關閉]Dialog
   */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose()
  }, [])

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    return (
      currencyList.map((ele, seq) => (
        <TableRow hover key={ele.currency_id}>
          <TableCell>{parseInt(seq) + 1}</TableCell>
          <TableCell>{ele.currency}</TableCell>
          <TableCell>{ele.exchange_rate}</TableCell>
          <TableCell>
            {permission.Edit
              ? <CusIconButton
                onClick={(e) => edit_Click({ e: e, id: ele.currency_id })}
                color='primary'
                icon={<Edit />} />
              : null}
            {permission.Delete
              ? <CusIconButton
                onClick={(e) => del_Click({ e: e, name: ele.currency, id: ele.currency_id })}
                color='primary'
                icon={<Delete />} />
              : null}
          </TableCell>
        </TableRow>
      ))
    )
  })

  return (
    <React.Fragment>
      <CusCard content={
        <React.Fragment>
          <Grid item xs={12} display={'flex'} justifyContent={'end'}>
            {permission.Add
              ? <CusTextIconButton
                color={'primary'}
                text={'新增貨幣'}
                startIcon={<Add />}
                onClick={add_Click} />
              : null}
          </Grid>
          <Grid item xs={12}>
            {!isLoading
              ? currencyList.length > 0
                ? <React.Fragment>
                  <CusBasicTableTS
                    tableHead={[
                      { name: '排序' },
                      { name: '幣別' },
                      { name: '匯率' },
                      { name: '操作' }]}
                    tableBody={<TableBodyContent />}
                  />
                </React.Fragment>
                : <NoResults />
              : <CircularLoading />}
          </Grid>
        </React.Fragment>}
      />
      <CusDialog ref={useDialog} info={dialogData} />
    </React.Fragment >
  );
};

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  const { type, name, getEditData, currency_id } = props

  // 新增幣別匯率
  const [addData, setAddData] = useState({ currency: null, exchange_rate: null });
  const initAddDataCheck = { currency: false, exchange_rate: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  // 編輯幣別匯率
  const [editData, setEditData] = useState({
    dtlCurrency: getEditData,
    updCurrency: {
      currency_id: currency_id
    }
  });
  const initEditDataCheck = { currency: false, exchange_rate: false };
  const [editDataCheck, setEditDataCheck] = useState(initEditDataCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = useCallback((e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setAddData(prevData => ({
      ...prevData,
      [name]: val
    }));
  }, []);

  /**
   * @description [事件]input
   */
  const edit_HandleInput = useCallback((e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setEditData(prevData => ({
      ...prevData,
      updCurrency: {
        ...prevData.updCurrency,
        [name]: val
      }
    }));
  }, []);

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    addData,
    initAddDataCheck,
    setAddDataCheck,

    editData,
    initEditDataCheck,
    setEditDataCheck
  }));

  if (type === 'add') {
    return (
      <React.Fragment>
        <CusInput
          id={'add--currency'}
          name={'currency'}
          label={'幣別'}
          type={'text'}
          required={true}
          error={addDataCheck.currency}
          value={addData.currency}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={'add--exchange_rate'}
          name={'exchange_rate'}
          label={'匯率'}
          type={'number'}
          required={true}
          error={addDataCheck.exchange_rate}
          value={addData.exchange_rate}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </React.Fragment>
    )
  } else if (type === 'edit') {
    let data = {
      ...editData.dtlCurrency,
      ...editData.updCurrency
    }

    return (
      <React.Fragment>
        <CusInput
          id={'edit--currency'}
          name={'currency'}
          label={'幣別'}
          type={'text'}
          required={true}
          error={editDataCheck.currency}
          value={data.currency}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusInput
          id={'edit--exchange_rate'}
          name={'exchange_rate'}
          label={'匯率'}
          type={'number'}
          required={true}
          error={editDataCheck.exchange_rate}
          value={data.exchange_rate}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
      </React.Fragment>
    )
  } else if (type === 'del') {
    return (
      <Typography component={'p'}>
        確定刪除 <CusSpan text={name} color="info" /> ?
      </Typography>
    )
  }
})