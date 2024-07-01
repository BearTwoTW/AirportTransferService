import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Box } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusTextIconButton, CusTextButton } from '../../../../components/CusButton';
import { NoResults } from '../../../../components/CusError';
import { CircularLoading } from '../../../../components/CusProgress';
import { PermissionFunctionAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function SysPermissionFirst() {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  // 權限
  const permission = useCheckLogInXPermission("SysPermissionFirst", ["Add", "secondEdit"]);

  // 查詢
  const [pageSearch, setPageSearch] = useState({
    name: "",
    page: 1,
    num_per_page: 10,
    pfl_id: ""
  });

  // 系統功能綁定資料
  const [isLoading, setIsLoading] = useState(true);
  const [permissionFunctionList, setPermissionFunctionList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 提示訊息
  const { enqueueSnackbar } = useSnackbar();

  /**
   * 查詢系統功能綁定列表
   */
  const getPermissionFunctionList = () => {
    setIsLoading(true);
    PermissionFunctionAPI.PermissionFunctionSearch(pageSearch).then(res => {
      if (res.success) {
        setPermissionFunctionList(res.data);
        setPageCount(res.page);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPermissionFunctionList();
  }, []);

  /**
   * @description [事件]input
   */
  const search_HandleInput = (e) => {
    const { name, value } = e.target;
    setPageSearch(prevData => ({
      ...prevData,
      page: 1,
      [name]: value
    }));
  };

  /**
  * @description [新增]權限
   */
  const add_Click = () => {
    useDialog.current.handleOpen();
    setDialogData(({
      id: "add",
      DialogTitle: "新增系統功能綁定",
      DialogContent: <DialogsInner type={"add"} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]新增權限
   */
  const add_Confirm = () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current
    if (!addData.name || !addData.api_name) {
      setAddDataCheck({
        name: !addData.name ? true : false,
        api_name: !addData.api_name ? true : false
      });
    } else {
      setAddDataCheck(initAddDataCheck);
      PermissionFunctionAPI.PermissionFunctionCreate(addData).then(res => {
        if (res.success) {
          dialogClose();
          setPageSearch(prevData => ({ ...prevData }));
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

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
  const onRowsPerPageChange = (e) => {
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
  const handleChangePage = (e, nowPage) => {
    setPageSearch((prevData) => ({
      ...prevData,
      page: parseInt(nowPage),
    }));
  };

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    /**
     * @description [事件]SecondEdit入口
     */
    const navigate_HandleSecond = useCallback((pfl_id) => {
      if (permission.secondEdit) {
        navigate(`${location.pathname}/SysPermissionSecond`, {
          state: { pfl_id: pfl_id }
        });
        sessionStorage.params = JSON.stringify({ pfl_id: pfl_id })
      } else {
        enqueueSnackbar("此帳號無權限使用", {
          variant: "warning",
          persist: true
        });
      }
    }, [navigate, location.pathname]);

    return (
      permissionFunctionList.map((ele, seq) => (
        <TableRow hover key={ele.pfl_id}
          onClick={() => navigate_HandleSecond(ele.pfl_id)}>
          <TableCell>{parseInt(seq) + 1}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.api_name}</TableCell>
          <TableCell>{ele.join_limit}</TableCell>
        </TableRow>
      ))
    )
  })

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} md={6} lg={3}>
                <CusInput
                  id={"search--name"}
                  name={"name"}
                  label={"權限名稱"}
                  type={"text"}
                  value={pageSearch.name}
                  error={false}
                  onChangeEvent={(e) => search_HandleInput(e)}
                  required={false} />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                {permission.Add
                  ? <CusTextIconButton
                    color={"info"}
                    text={"查詢"}
                    startIcon={<Search />}
                    onClick={getPermissionFunctionList} />
                  : null}
              </Grid>
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
                      color={"primary"}
                      text={"新增系統功能綁定"}
                      startIcon={<Add />}
                      onClick={add_Click}
                    />
                    : null}
                </Box>
                {!isLoading
                  ? permissionFunctionList.length > 0
                    ? <React.Fragment>
                      <CusBasicTableTS
                        hasRowsPerPage={true}
                        rowsPerPage={pageSearch.num_per_page}
                        onPageChange={handleChangePage}
                        count={pageCount}
                        page={pageSearch.page}
                        onRowsPerPageChange={onRowsPerPageChange}
                        tableHead={[
                          { name: "排序" },
                          { name: "權限名稱" },
                          { name: "API名稱" },
                          { name: "綁定上限( 0則為不限 )" }]}
                        tableBody={<TableBodyContent
                        />}
                      />
                      <PaginationActionsTS
                        totalPage={pageCount}
                        page={pageSearch.page}
                        onPageChange={(e, nowPage) => handleChangePage(e, nowPage)}
                      />
                    </React.Fragment>
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

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  // 新增系統功能
  const [addData, setAddData] = useState({
    name: null,
    api_name: null
  });
  const initAddDataCheck = { name: false, api_name: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setAddData(prevData => ({
      ...prevData,
      [name]: val
    }))
  };

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    addData,
    initAddDataCheck,
    setAddDataCheck
  }));

  if (props.type === "add") {
    return (
      <React.Fragment>
        <CusInput
          id={"add--name"}
          name={"name"}
          label={"權限名稱"}
          type={"text"}
          required={true}
          error={addDataCheck.name}
          value={addData.name}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--api_name"}
          name={"api_name"}
          label={"API名稱"}
          type={"text"}
          required={true}
          error={addDataCheck.api_name}
          value={addData.api_name}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--join_limit"}
          name={"join_limit"}
          label={"綁定上限"}
          type={"number"}
          value={addData.join_limit}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </React.Fragment>
    )
  }
});