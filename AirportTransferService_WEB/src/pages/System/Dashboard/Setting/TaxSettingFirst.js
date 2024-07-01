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
import { TaxAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function TaxSettingFirst() {
  // 權限
  const permission = useCheckLogInXPermission('TaxSettingFirst', ['Add', 'Edit', 'Delete']);

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 查詢
  const [pageSearch, setPageSearch] = useState({
    tax_type: '',
    count: 0,
    nowPage: 0,
    rowsPerPage: 10
  });

  // 稅別列表
  const [taxList, setTaxList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @description [查詢]稅別
   */
  const getTaxList = () => {
    setIsLoading(true);
    TaxAPI.TaxSearch({
      ...pageSearch
    }).then(res => {
      if (res.success) {
        setTaxList(res.data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getTaxList();
  }, []);

  /**
   * @description [新增]稅別
   */
  const add_Click = () => {
    useDialog.current.handleOpen();
    setDialogData(({
      id: 'add',
      DialogTitle: '新增稅別',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]新增稅別
   */
  const add_Confirm = async () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current;

    if (!addData.tax_type || addData.tax_rate === null) {
      setAddDataCheck({
        tax_type: !addData.tax_type ? true : false,
        tax_rate: addData.tax_rate === null ? true : false,
      });
    } else {
      setAddDataCheck(initAddDataCheck);

      TaxAPI.TaxCreate(addData).then(res => {
        if (res.success) {
          dialogClose();
          getTaxList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'warning',
          persist: !res.success
        });
      });
    }
  };

  /**
 * @description [修改]稅別
 */
  const edit_Click = ({ e, id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    const getEditData = taxList.filter(item => item.tax_id === id)[0];

    setDialogData(({
      id: 'edit',
      DialogTitle: '修改',
      DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} getEditData={getEditData} tax_id={id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={edit_Confirm} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]修改幣別
   */
  const edit_Confirm = () => {
    const { editData, initEditDataCheck, setEditDataCheck } = useDialogInner.current;

    if (editData.updTax.tax_type === null || editData.updTax.tax_rate === null) {
      setEditDataCheck({
        tax_type: editData.updTax.tax_type === null ? true : false,
        tax_rate: editData.updTax.tax_rate === null ? true : false,
      });
    } else {
      setEditDataCheck(initEditDataCheck);

      TaxAPI.TaxUpdate(editData.updTax).then(res => {
        if (res.success) {
          dialogClose();
          getTaxList();
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
          <CusTextButton autoFocus onClick={(e) => del_Confirm(e, id)} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]刪除幣別
   */
  const del_Confirm = useCallback((e, _id) => {
    e.stopPropagation();

    TaxAPI.TaxDelete({
      tax_id: _id
    }).then(res => {
      if (res.success) {
        dialogClose();
        getTaxList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? 'success' : 'warning',
        persist: !res.success
      });
    });
  }, []);

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
      taxList.map((ele, seq) => (
        <TableRow hover key={ele.tax_id}>
          <TableCell>{parseInt(seq) + 1}</TableCell>
          <TableCell>{ele.tax_type}</TableCell>
          <TableCell>{ele.tax_rate}</TableCell>
          <TableCell>
            {permission.Edit
              ? <CusIconButton
                onClick={(e) => edit_Click({ e: e, id: ele.tax_id })}
                color='primary'
                icon={<Edit />} />
              : null}
            {permission.Delete
              ? <CusIconButton
                onClick={(e) => del_Click({ e: e, name: ele.tax_type, id: ele.tax_id })}
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
                text={'新增稅別'}
                startIcon={<Add />}
                onClick={add_Click} />
              : null}
          </Grid>
          <Grid item xs={12}>
            {!isLoading
              ? taxList.length > 0
                ? <React.Fragment>
                  <CusBasicTableTS
                    tableHead={[
                      { name: '排序' },
                      { name: '稅別' },
                      { name: '稅率(%)' },
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
    </React.Fragment>
  )
};

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  const { type, name, getEditData, tax_id } = props

  // 新增稅別
  const [addData, setAddData] = useState({ tax_type: null, tax_rate: null });
  const initAddDataCheck = { tax_type: false, tax_rate: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  // 編輯稅別
  const [editData, setEditData] = useState({
    dtlTax: getEditData,
    updTax: {
      tax_id: tax_id
    }
  });
  const initEditDataCheck = { tax_type: false, tax_rate: false };
  const [editDataCheck, setEditDataCheck] = useState(initEditDataCheck);


  /**
   * @description [事件]input
   */
  const add_HandleInput = useCallback((e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setAddData(prev => ({
      ...prev,
      [name]: val
    }))
  }, []);

  /**
   * @description [事件]input
   */
  const edit_HandleInput = useCallback((e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setEditData(prev => ({
      ...prev,
      updTax: {
        ...prev.updTax,
        [name]: val
      }
    }))
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
          id={'add--tax_type'}
          name={'tax_type'}
          label={'稅別'}
          type={'text'}
          required={true}
          error={addDataCheck.tax_type}
          value={addData.tax_type}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={'add--tax_rate'}
          name={'tax_rate'}
          label={'稅率(%)'}
          type={'number'}
          required={true}
          error={addDataCheck.tax_rate}
          value={addData.tax_rate}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </React.Fragment>
    )
  } else if (type === 'edit') {
    let data = {
      ...editData.dtlTax,
      ...editData.updTax
    }
    return (
      <React.Fragment>
        <CusInput
          id={'edit--tax_type'}
          name={'tax_type'}
          label={'稅別'}
          type={'text'}
          required={true}
          error={editDataCheck.tax_type}
          value={data.tax_type}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusInput
          id={'edit--tax_rate'}
          name={'tax_rate'}
          label={'稅率(%)'}
          type={"number"}
          required={true}
          error={editDataCheck.tax_rate}
          value={data.tax_rate}
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