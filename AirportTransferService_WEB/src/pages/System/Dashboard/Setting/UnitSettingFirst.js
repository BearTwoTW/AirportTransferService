import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Grid, TableCell, TableRow, Divider, Box } from '@mui/material';
import { Add, CheckCircleOutline, Edit, Search } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusInput } from '../../../../components/CusInput';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { NoResults } from '../../../../components/CusError';
import { CusDialog } from '../../../../components/CusDialog';
import { CommodityAPI } from '../../../../js/Api';
import { OptionList } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function UnitSettingFirst() {
  // 權限
  const permission = useCheckLogInXPermission('UnitSettingFirst', ['Add', 'Edit', 'Delete']);

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 單位查詢
  const [pageSearch, setPageSearch] = useState({
    unit_name: "",
    visible: "",
    page: 1,
    num_per_page: 10
  });

  // 單位列表
  const [unitList, setUnitList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  /**
   * @description [查詢]單位
   */
  const getUnitList = () => {
    setIsLoading(true);
    CommodityAPI.UnitSearch(pageSearch).then(res => {
      if (res.success) {
        setUnitList(res.data);
        setPageCount(res.page);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUnitList();
  }, []);

  /**
   * @description [事件]input
   */
  const search_HandleInput = (e) => {
    const { name, value } = e.target

    setPageSearch(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  /**
   * @description [事件]select
   */
  const search_HandleSelect = (e) => {
    const { name, key, value } = e.target;
    const val = value === null ? "" : value[key];

    setPageSearch(prevData => ({
      ...prevData,
      [name]: val
    }));
  };

  /**
   * @description [新增]單位
   */
  const add_Click = () => {
    useDialog.current.handleOpen();
    setDialogData(({
      id: 'add',
      DialogTitle: '新增單位',
      DialogContent: <DialogsInner type={'add'} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]新增單位
   */
  const add_Confirm = () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current

    if (!addData.unit_name) {
      setAddDataCheck({
        unit_name: !addData.unit_name ? true : false
      });
    } else {
      setAddDataCheck(initAddDataCheck);

      CommodityAPI.UnitCreate({
        unit_name: addData.unit_name
      }).then(res => {
        if (res.success) {
          dialogClose();
          getUnitList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'warning',
          persist: !res.success
        });
      });
    }
  };

  /**
 * @description [修改]單位
 */
  const edit_Click = ({ e, unit_id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();

    const getEditData = unitList.filter(ele => ele.unit_id === unit_id)[0];

    setDialogData(({
      id: 'edit',
      DialogTitle: '修改單位',
      DialogContent: <DialogsInner type={'edit'} ref={useDialogInner} unit_id={unit_id} getEditData={getEditData} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => { edit_Confirm() }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]修改單位
   */
  const edit_Confirm = useCallback(async () => {
    const { editData, initEditDataCheck, setEditDataCheck } = useDialogInner.current;

    if (editData.updUnit.unit_name === null) {
      setEditDataCheck({ unit_name: editData.updUnit.unit_name === null ? true : false });
    } else {
      setEditDataCheck(initEditDataCheck);

      CommodityAPI.UnitUpdate(editData.updUnit).then(res => {
        if (res.success) {
          dialogClose();
          getUnitList();
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? 'success' : 'error',
          persist: !res.success
        });
      });
    }
  }, [])

  /**
   * @description [關閉]Dialog
   */
  const dialogClose = () => {
    useDialog.current.handleClose()
  };

  /**
   * @description [事件]選擇分頁顯示行數
   * @param {*} e 
   */
  const onRowsPerPageChange = async (e) => {
    setPageSearch((prevData) => ({
      ...prevData,
      page: 1,
      num_per_page: parseInt(e.target.value, 10)
    }));
  };

  /**
   * @description [事件]選擇頁碼
   * @param {*} e 
   */
  const handleChangePage = async (e, nowPage) => {
    setPageSearch((prevData) => ({
      ...prevData,
      page: parseInt(nowPage),
    }));
  };

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    return (
      unitList.map((ele, seq) => (
        <TableRow hover key={ele.unit_id}>
          <TableCell>{parseInt(seq) + 1}</TableCell>
          <TableCell>{ele.visible === 'Y' ? <CheckCircleOutline style={{ color: '#23be4e' }} /> : ''}</TableCell>
          <TableCell>{ele.unit_name}</TableCell>
          <TableCell>
            {permission.Edit
              ? <CusIconButton
                onClick={(e) => edit_Click({ e: e, unit_id: ele.unit_id })}
                color='primary'
                icon={<Edit />} />
              : null}
          </TableCell>
        </TableRow>
      ))
    )
  });

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} md={6} lg={3}>
                <CusOutlinedSelect
                  id={'search--visible'}
                  name={'visible'}
                  label={'開放狀態'}
                  options={OptionList.VisibleArr}
                  optionKey={'value'}
                  value={OptionList.VisibleArr.some(item => item.value === pageSearch.visible) ? OptionList.VisibleArr.find(item => item.value === pageSearch.visible) : null}
                  onChangeEvent={e => search_HandleSelect(e)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CusInput
                  id={'search--unit_name'}
                  name={'unit_name'}
                  label={'單位名稱'}
                  type={'text'}
                  value={pageSearch.unit_name}
                  error={false}
                  onChangeEvent={(e) => search_HandleInput(e)}
                  required={false}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"info"}
                  text={"查詢"}
                  startIcon={<Search />}
                  onClick={getUnitList}
                />
              </Grid >
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12}>
                <Box display={"flex"} justifyContent={"flex-end"}>
                  {permission.Add
                    ? <CusTextIconButton
                      color={'primary'}
                      text={'新增單位'}
                      startIcon={<Add />}
                      onClick={add_Click} />
                    : null}
                </Box>
                {!isLoading
                  ? unitList.length > 0
                    ? <React.Fragment>
                      <CusBasicTableTS
                        // hasRowsPerPage={true}
                        // rowsPerPage={pageSearch.num_per_page}
                        // onPageChange={handleChangePage}
                        // count={pageCount}
                        // page={pageSearch.page}
                        // onRowsPerPageChange={onRowsPerPageChange}
                        tableHead={[
                          { name: '排序' },
                          { name: '開放' },
                          { name: '單位名稱' },
                          { name: '操作' }]}
                        tableBody={<TableBodyContent />}
                      />
                      {/* <PaginationActionsTS
                    totalPage={pageCount}
                    page={pageSearch.page}
                    onPageChange={(e, nowPage) => handleChangePage(e, nowPage)}
                  /> */}
                    </React.Fragment>
                    : <NoResults />
                  : <CircularLoading />}
              </Grid>
            </React.Fragment>}
          />
        </Grid>
      </Grid>
      <CusDialog ref={useDialog} info={dialogData} />
    </React.Fragment >
  )
};

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  const { getEditData, type, unit_id } = props;

  // 新增單位
  const [addData, setAddData] = useState({ unit_name: null });
  const initAddDataCheck = { unit_name: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  // 編輯單位
  const [editData, setEditData] = useState({
    dtlUnit: getEditData,
    updUnit: {
      unit_id: unit_id
    }
  });
  const initEditDataCheck = { unit_name: false };
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
  }, [])

  /**
   * @description [事件]input
   */
  const edit_HandleInput = useCallback((e) => {
    const { name, value, checked, type } = e.target;
    const val = value === "" ? null : value;

    setEditData(prev => ({
      ...prev,
      updUnit: {
        ...prev.updUnit,
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
    addData,
    initAddDataCheck,
    setAddDataCheck,

    editData,
    initEditDataCheck,
    setEditDataCheck,
  }));

  if (type === 'add') {
    return (
      <React.Fragment>
        <CusInput
          id={'add--unit_name'}
          name={'unit_name'}
          label={'單位名稱'}
          type={'text'}
          disabled={false}
          required={true}
          error={addDataCheck.unit_name}
          value={addData.unit_name}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </React.Fragment>
    )
  } else if (type === 'edit') {
    let data = {
      ...editData.dtlUnit,
      ...editData.updUnit
    }

    return (
      <React.Fragment>
        <CusCheckboxLabel
          id={'edit--visible'}
          name={'visible'}
          label={'是否開放'}
          type={'checkbox'}
          value={data.visible}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
        <CusInput
          id={'edit--unit_name'}
          name={'unit_name'}
          label={'單位名稱'}
          type={'text'}
          required={true}
          error={editDataCheck.unit_name}
          value={data.unit_name}
          onChangeEvent={(e) => edit_HandleInput(e)}
        />
      </React.Fragment>
    )
  }
})