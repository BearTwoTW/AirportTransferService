import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Divider, TableCell, TableRow, Box, Typography } from '@mui/material';
import { Add, CheckCircleOutline, Delete, Search } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CusSpan } from '../../../../components/CusSpanTS';
import { CusCheckboxLabel } from '../../../../components/CusCheckBox';
import { DDMenu, PageAPI } from '../../../../js/APITS'
import { useCheckLogInXPermission, get_ECC_indexedDB_factory } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const GroupPagesFirst = () => {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  // dialog
  const [dialogData, setDialogData] = useState({});
  const useDialog = useRef();
  const useDialogInner = useRef();

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  // 頁面查詢
  const [isLoading, setIsLoading] = useState(true);
  const [pageSearch, setPageSearch] = useState({ system_name: "", menus_name: "" });
  const [pageGroupList, setPageGroupList] = useState([]);

  // 下拉選單
  const [options, setOptions] = useState({ SYSArr: [], MNLArr: [] });

  // 權限
  const permission = useCheckLogInXPermission("GroupPagesFirst", ["GroupAdd", "GroupEdit", "Delete"]);

  // TODO：indexedDB的部分應該有機會可以在優化
  // indexedDB
  const [indexDB, setIndexDB] = useState(null);
  const [initDB, setInitDB] = useState(false);
  const initDBRef = useRef(initDB);
  initDBRef.current = initDB;

  /**
   * @description [查詢]DDJson
   */
  useEffect(() => {
    // 初始化下拉選單
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

    // 初始化indexedDB
    get_ECC_indexedDB_factory().then(async idb => {
      let search_set = (idb !== null
        ? await idb.search(
          "QueryCondition",
          [window.location.pathname, "Search", sessionStorage.user_id]
        ).then(res => {
          if (res.success && res.data !== null) return res.data.data
          else return null;
        })
        : null);
      setIndexDB(idb);
      setPageSearch(prev => ({
        ...prev,
        ...search_set
      }));

      // 存在search_set就用indexedDB的搜尋條件，不然就用預設的搜尋條件
      getPageGroupList(search_set ?? pageSearch);
    });
    setInitDB(true);
  }, []);

  /**
   * 查詢頁面群組
   */
  const getPageGroupList = (searchParams) => {
    setIsLoading(true);
    if (initDBRef.current) {
      try {
        PageAPI.PageGroupList(searchParams).then(async res => {
          if (indexDB !== null) {
            await indexDB.update("QueryCondition", {
              page: window.location.pathname,
              action: "Search",
              user_id: sessionStorage.user_id,
              data: { ...searchParams }
            });
          }
          let arr = [];
          // TODO：要問一下這段判斷是為了什麼
          if (res.success && (searchParams.system_name || searchParams.menus_name)) {
            arr = res.data.reduce((arr, ele) => {
              if ((!searchParams.system_name || ele.system_name === searchParams.system_name) &&
                (!searchParams.menus_name || ele.menus_name === searchParams.menus_name)) arr.push(ele);
              return arr;
            }, []);
          } else arr = res.data
          setPageGroupList(arr);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        enqueueSnackbar("查詢失敗", {
          variant: "error",
          persist: true
        });
      }
    }
  };

  /**
   * @description [事件]Select
   */
  const search_HandleSelect = (e) => {
    const { name, key, value } = e.target
    const val = value === null ? "" : value[key];

    setPageSearch((prevSearch) => ({ ...prevSearch, [name]: val }));
  };

  /**
   * @description [新增]頁面群組
   */
  const add_Click = ({ e, options }) => {
    useDialog.current.handleOpen();
    setDialogData(({
      id: "add",
      DialogTitle: "新增群組",
      DialogContent: <DialogsInner type={"add"} ref={useDialogInner} options={options} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={() => add_Confirm()} color="primary" text="新增" />
        </React.Fragment>)
    }));
  }

  /**
   * @description [確認]新增頁面群組
   */
  const add_Confirm = () => {
    const { addData, initAddDataCheck, setAddDataCheck } = useDialogInner.current;

    if (!addData.system || !addData.menus || !addData.code || !addData.name) {
      setAddDataCheck({
        system: !addData.system ? true : false,
        menus: !addData.menus ? true : false,
        code: !addData.code ? true : false,
        name: !addData.name ? true : false
      });
    } else {
      setAddDataCheck(initAddDataCheck);

      PageAPI.AddPageGroup({
        su: addData.su,
        seq: addData.seq,
        system: addData.system,
        menus: addData.menus,
        code: addData.code,
        icon: addData.icon,
        name: addData.name
      }).then(res => {
        if (res.success) {
          dialogClose();
          getPageGroupList(pageSearch);
        }
        enqueueSnackbar(res.message, {
          variant: res.success ? "success" : "warning",
          persist: !res.success
        });
      });
    }
  };

  /**
   * @description [刪除]頁面群組
   */
  const del_Click = ({ e, name, id }) => {
    e.stopPropagation();
    useDialog.current.handleOpen();
    setDialogData(({
      id: "del",
      DialogTitle: "刪除群組",
      DialogContent: <DialogsInner type={"del"} ref={useDialogInner} name={name} id={id} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
          <CusTextButton autoFocus onClick={e => { del_Confirm(e, id) }} color="primary" text="確認" />
        </React.Fragment>)
    }));
  };

  /**
   * @description [確認]刪除頁面群組
   */
  const del_Confirm = (e, _id) => {
    e.stopPropagation();

    PageAPI.DeletePageGroup({ pg_id: _id }).then(res => {
      if (res.success) {
        dialogClose();
        getPageGroupList(pageSearch);
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
  })

  /**
   * @description [內容]Table Row Body
   */
  const TableBodyContent = React.memo(() => {
    /**
     * @description [事件]SecondEdit入口
     */
    const navigate_HandleSecond = useCallback((pg_id) => {
      if (permission.GroupEdit) {
        navigate(`${location.pathname}/GroupPagesSecond`, {
          state: { pg_id }
        });
      } else {
        enqueueSnackbar("此帳號無權限使用", {
          variant: "warning",
          persist: true
        });
      }
    }, [navigate, location.pathname]);

    return (
      pageGroupList.length > 0
        ? pageGroupList.map((ele) => (
          <TableRow hover key={ele.pg_id}
            onClick={() => navigate_HandleSecond(ele.pg_id)}>
            <TableCell>{ele.su === "Y" ? <CheckCircleOutline style={{ color: "#23be4e" }} /> : ""}</TableCell>
            <TableCell>{ele.system_name}</TableCell>
            <TableCell>{ele.menus_name}</TableCell>
            <TableCell>{ele.code}</TableCell>
            <TableCell>{ele.name}</TableCell>
            <TableCell>{ele.seq}</TableCell>
            <TableCell>
              {permission.Delete
                ? <CusIconButton
                  onClick={(e) => del_Click({ e: e, name: ele.name, id: ele.pg_id })}
                  color="primary"
                  icon={<Delete />}
                />
                : null}
            </TableCell>
          </TableRow>
        ))
        : null
    )
  })

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12} md={6} lg={3}>
                <CusOutlinedSelect
                  id={"search--system_name"}
                  name={"system_name"}
                  label={"系統"}
                  options={options.SYSArr}
                  optionKey={"name"}
                  value={options.SYSArr.some(item => item.name === pageSearch.system_name) ? options.SYSArr.find(item => item.name === pageSearch.system_name) : null}
                  onChangeEvent={(e) => search_HandleSelect(e)} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CusOutlinedSelect
                  id={"search--menus_name"}
                  name={"menus_name"}
                  label={"選單"}
                  options={options.MNLArr}
                  optionKey={"name"}
                  value={options.MNLArr.some(item => item.name === pageSearch.menus_name) ? options.MNLArr.find(item => item.name === pageSearch.menus_name) : null}
                  onChangeEvent={(e) => search_HandleSelect(e)} />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"info"}
                  text={"查詢"}
                  startIcon={<Search />}
                  onClick={() => getPageGroupList(pageSearch)}
                />
              </Grid>
            </React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <CusCard content={
            <React.Fragment>
              <Grid item xs={12}>
                <Box display={"flex"} justifyContent={"end"}>
                  {permission.GroupAdd
                    ? <CusTextIconButton
                      color={"primary"}
                      text={"新增群組"}
                      startIcon={<Add />}
                      onClick={(e) => add_Click({ e: e, options: options })}
                    />
                    : null}
                </Box>
                {!isLoading
                  ? <React.Fragment>
                    <CusBasicTableTS
                      tableHead={[
                        { name: "系統使用" },
                        { name: "系統" },
                        { name: "選單" },
                        { name: "群組代號" },
                        { name: "群組名稱" },
                        { name: "排序" },
                        { name: "" }]}
                      tableBody={<TableBodyContent />}
                    />
                  </React.Fragment>
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

export default GroupPagesFirst;

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
  let { options, type, name } = props
  const [addData, setAddData] = useState({
    su: "N",
    system: null,
    menus: null,
    code: null,
    name: null
  });
  const initAddDataCheck = {
    system: false,
    menus: false,
    code: false,
    name: false
  };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  /**
   * @description [事件]input
   */
  const add_HandleInput = (e) => {
    const { name, value, checked, type } = e.target;
    const val = value === "" ? null : value;
    setAddData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? checked
          ? 'Y'
          : 'N'
        : val
    }));
  };

  /**
   * @description [事件]Select
   */
  const add_HandleSelect = (e) => {
    const { name, key, value } = e.target;
    const val = value === null ? null : value[key];

    setAddData(prevData => ({
      ...prevData,
      [name]: val
    }));
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
        <CusCheckboxLabel
          id={"add--su"}
          name={"su"}
          label={"設置系統使用"}
          type={"checkbox"}
          value={addData.su}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--seq"}
          name={"seq"}
          label={"序號"}
          type={"number"}
          value={addData.seq}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusOutlinedSelect
          id={"add--system"}
          name={"system"}
          label={"系統代號"}
          required={true}
          options={options.SYSArr}
          error={addDataCheck.system}
          optionKey={"sps_id"}
          value={options.SYSArr.some(ele => ele.sps_id === addData.system) ? options.SYSArr.find(ele => ele.sps_id === addData.system) : null}
          onChangeEvent={(e) => add_HandleSelect(e)}
        />
        <CusOutlinedSelect
          id={"add--menus"}
          name={"menus"}
          label={"選單代號"}
          required={true}
          error={addDataCheck.menus}
          options={options.MNLArr}
          optionKey={"sps_id"}
          value={options.MNLArr.some(ele => ele.sps_id === addData.menus) ? options.MNLArr.find(ele => ele.sps_id === addData.menus) : null}
          onChangeEvent={(e) => add_HandleSelect(e)}
        />
        <CusInput
          id={"add--code"}
          name={"code"}
          label={"代碼"}
          type={"text"}
          required={true}
          error={addDataCheck.code}
          value={addData.code}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--icon"}
          name={"icon"}
          label={"圖標"}
          type={"text"}
          value={addData.icon}
          onChangeEvent={(e) => add_HandleInput(e)}
        />
        <CusInput
          id={"add--name"}
          name={"name"}
          label={"名稱"}
          type={"text"}
          required={true}
          error={addDataCheck.name}
          value={addData.name}
          onChangeEvent={(e) => add_HandleInput(e)}
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
})