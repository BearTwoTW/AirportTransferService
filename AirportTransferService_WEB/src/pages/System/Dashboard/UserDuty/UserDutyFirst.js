import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Box } from '@mui/material';
import { Add, CheckCircleOutline, Search } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTable, PaginationActions } from '../../../../components/CusTable';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusTextIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { NoResults } from '../../../../components/CusError';
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';
import { UserDutyAPI } from '../../../../js/APITS';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function UserDutyFirst() {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  // 權限
  const permission = useCheckLogInXPermission("UserDutyFirst", ["Add", "secondEdit", "Delete"]);

  // 頁面查詢
  const [pageSearch, setPageSearch] = useState({
    name: "",
    code: "",
    page: 1,
    num_per_page: 10
  });

  // 職責資料
  const [isLoading, setIsLoading] = useState(true);
  const [dutyList, setDutyList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // indexedDB
  const [indexDB, setIndexDB] = useState(null);
  const [initDB, setInitDB] = useState(false);
  const initDBRef = useRef(initDB);
  initDBRef.current = initDB;

  // dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 提示框
  const { enqueueSnackbar } = useSnackbar();

  // 初始化indexedDB
  useEffect(() => {
    get_ECC_indexedDB_factory().then(async idb => {
      let search_set = (idb !== null
        ? await idb.search(
          "QueryCondition",
          [window.location.pathname, "Search", sessionStorage.user_id]
        ).then(res => {
          if (res.success && res.data !== null) return res.data.data;
          else return null;
        })
        : null)
      setIndexDB(idb);
      setPageSearch(prev => ({
        ...prev,
        ...search_set
      }));

      // 存在search_set就用indexedDB的搜尋條件，不然就用預設的搜尋條件
      getDutyList(search_set ?? pageSearch)
    });
    setInitDB(true);
  }, []);

  /**
   * 查詢職責列表
   */
  const getDutyList = async (searchPrams) => {
    setIsLoading(true);
    if (initDBRef.current) {
      try {
        UserDutyAPI.UserDutySearch(searchPrams).then(async res => {
          if (res.success) {
            if (indexDB !== null) {
              await indexDB.update("QueryCondition", {
                page: window.location.pathname,
                action: "Search",
                user_id: sessionStorage.user_id,
                data: {
                  ...searchPrams,
                  page: searchPrams.page
                }
              });
            }

            setDutyList(res.data);
            setPageCount(res.page);
          }
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        enqueueSnackbar("查詢失敗", {
          variant: "error",
          persist: true
        });
      }
    }
  };

  useEffect(() => {
    getDutyList(pageSearch);
  }, [pageSearch.page, pageSearch.num_per_page]);

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
   * @description [新增]職責
   */
  const add_Click = () => {
    useDialog.current.handleOpen();
    setDialogData(({
      id: "add",
      DialogTitle: "新增職責",
      DialogContent: <DialogsInner type={"add"} ref={useDialogInner} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={add_Confirm} color="primary" text="新增" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]新增職責
   */
  const add_Confirm = () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current;
    if (!addData.code || !addData.name) {
      setAddDataCheck({
        code: !addData.code ? true : false,
        name: !addData.name ? true : false
      });
    } else {
      setAddDataCheck(initAddDataCheck);

      UserDutyAPI.UserDutyCreate({
        is_calculate_salary: addData.is_calculate_salary,
        code: addData.code,
        name: addData.name
      }).then(res => {
        if (res.success) {
          dialogClose();
          getDutyList(pageSearch);
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
    useDialog.current.handleClose();
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
    /**
     * @description [事件]SecondEdit入口
     */
    const navigate_HandleSecond = useCallback((ud_id) => {
      if (permission.secondEdit) {
        navigate(`${location.pathname}/UserDutySecond`, {
          state: { ud_id: ud_id }
        });
      }
    }, [navigate, location.pathname]);

    return (
      dutyList.map((ele, inx) => (
        <TableRow hover key={ele.ud_id}
          onClick={() => navigate_HandleSecond(ele.ud_id)}>
          <TableCell>{parseInt(inx) + 1}</TableCell>
          <TableCell>{ele.code}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.ud_id}</TableCell>
          <TableCell>{ele.is_calculate_salary === "Y" ? <CheckCircleOutline style={{ color: "#23be4e" }} /> : ""}</TableCell>
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
                <CusInput
                  id={"search--code"}
                  name={"code"}
                  label={"職責代碼"}
                  type={"text"}
                  value={pageSearch.code}
                  onChangeEvent={(e) => search_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CusInput
                  id={"search--name"}
                  name={"name"}
                  label={"職責名稱"}
                  type={"text"}
                  value={pageSearch.name}
                  onChangeEvent={(e) => search_HandleInput(e)}
                />
              </Grid>
              {permission.Add
                ? <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                  <CusTextIconButton
                    color={"info"}
                    text={"查詢"}
                    startIcon={<Search />}
                    onClick={() => getDutyList(pageSearch)}
                  />
                </Grid>
                : null}
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
                      text={"新增職責"}
                      startIcon={<Add />}
                      onClick={add_Click}
                    />
                    : null}
                </Box>
                {!isLoading
                  ? dutyList.length > 0
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
                          { name: "職責代碼" },
                          { name: "職責名稱" },
                          { name: "職責編號" },
                          { name: "計薪" }
                        ]}
                        tableBody={<TableBodyContent />} />
                      <PaginationActionsTS
                        totalPage={pageCount}
                        page={pageSearch.page}
                        onPageChange={(e, nowPage) => handleChangePage(e, nowPage)}
                      />
                    </ React.Fragment>
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
}

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  // 新增職責
  const [addData, setAddData] = useState({
    code: null,
    name: null,
    is_calculate_salary: "N"
  });
  const initAddDataCheck = { code: false, name: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setAddData(prevData => ({
      ...prevData,
      [name]: type === "checkbox"
        ? checked
          ? "Y"
          : "N"
        : value
    }));
  }, []);

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    addData,
    initAddDataCheck,
    setAddDataCheck
  }));

  if (props.type === "add") {
    return (
      <React.Fragment>
        <CusCheckboxLabel
          id={"add--is_calculate_salary"}
          name={"is_calculate_salary"}
          label={"是否計薪"}
          type={"checkbox"}
          value={addData.is_calculate_salary}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--code"}
          name={"code"}
          label={"職責代碼"}
          type={"text"}
          required={true}
          error={addDataCheck.code}
          value={addData.code}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--name"}
          name={"name"}
          label={"職責名稱"}
          type={"text"}
          required={true}
          error={addDataCheck.name}
          value={addData.name}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
      </React.Fragment>
    )
  }
})