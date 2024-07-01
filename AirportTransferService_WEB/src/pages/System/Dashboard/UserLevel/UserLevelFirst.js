import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TableCell, TableRow, Box, Typography } from '@mui/material';
import { HighlightOff, Add, Delete, Search } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusInput } from '../../../../components/CusInput';
import { CusOutlinedSelect } from '../../../../components/CusSelect';
import { CusDialog } from '../../../../components/CusDialog';
import { CusBasicTableTS, PaginationActionsTS } from '../../../../components/CusTableTS';
import { CusTextIconButton, CusIconButton, CusTextButton } from '../../../../components/CusButton';
import { CircularLoading } from '../../../../components/CusProgress';
import { CusVerticalLinearStepper1 } from '../../../../components/CusStepper';
import { NoResults } from '../../../../components/CusError';
import { CusSpan } from '../../../../components/CusSpanTS';
import { useCheckLogInXPermission } from '../../../../js/Function';
import { DDMenu, UserLevelAPI } from '../../../../js/APITS';

export default function UserLevelFirst() {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  // 權限
  const permission = useCheckLogInXPermission("UserLevelFirst", ["Add", "secondEdit", "Delete"]);

  // 頁面查詢
  const [pageSearch, setPageSearch] = useState({
    name: "",
    code: "",
    search: false,
    page: 1,
    num_per_page: 10,
    parent_id: ""
  });

  // 職務資料
  const [isLoading, setIsLoading] = useState(true);
  const [levelList, setLevelList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  // 提示框
  const { enqueueSnackbar } = useSnackbar();

  /**職務查詢 */
  const getLevelList = () => {
    setIsLoading(true);
    UserLevelAPI.UserLevelSearch(pageSearch).then(res => {
      if (res.success) {
        setLevelList(res.data);
        setPageCount(res.page);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getLevelList();
  }, [pageSearch.search, pageSearch.page, pageSearch.num_per_page]);

  /**[事件]input*/
  const search_HandleInput = useCallback((e) => {
    const { name, value } = e.target;
    setPageSearch(prevData => ({
      ...prevData,
      page: 1,
      [name]: value
    }));
  }, []);

  /**[新增]職責  */
  const add_Click = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      id: "add",
      maxWidth: "lg",
      DialogTitle: "新增職務",
      DialogContent: <DialogsInner type={"add"} ref={useDialogInner} add_Confirm={add_Confirm} />,
      DialogActions: (
        <React.Fragment>
          <CusTextButton autoFocus onClick={dialogClose} color="default" text="取消" />
        </React.Fragment>)
    }));
  }

  /**[確認]新增職責 */
  const add_Confirm = useCallback(() => {
    const { addData } = useDialogInner.current;

    UserLevelAPI.UserLevelCreate(addData).then(res => {
      if (res.success) {
        dialogClose();
        getLevelList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  }, []);

  /**[刪除]幣別 */
  const del_Click = useCallback(({ e, name, id }) => {
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
  }, [])

  /**[確認]刪除職務 */
  const del_Confirm = useCallback((e, _id) => {
    e.stopPropagation();
    UserLevelAPI.UserLevelDelete({ ul_id: _id }).then(res => {
      if (res.success) {
        dialogClose();
        getLevelList();
      }
      enqueueSnackbar(res.message, {
        variant: res.success ? "success" : "warning",
        persist: !res.success
      });
    });
  }, []);

  /**[關閉]Dialog*/
  const dialogClose = () => {
    useDialog.current.handleClose()
  };

  /** [事件]選擇分頁顯示行數 */
  const onRowsPerPageChange = async (e) => {
    setPageSearch((prevData) => ({
      ...prevData,
      page: 1,
      num_per_page: parseInt(e.target.value, 10)
    }));
  };

  /**[事件]選擇頁碼 */
  const handleChangePage = async (e, nowPage) => {
    setPageSearch((prevData) => ({
      ...prevData,
      page: parseInt(nowPage),
    }));
  };

  /** [清除]查查查查 */
  const cleanSearch_Click = () => {
    setPageSearch(prevData => ({
      ...prevData,
      name: "",
      code: "",
      page: 1,
      num_per_page: 10,
      parent_id: "",
      search: !prevData.search,
    }));
  };

  /**[內容]Table Row Body*/
  const TableBodyContent = React.memo(() => {

    /**[事件]SecondEdit入口 */
    const navigate_HandleSecond = useCallback((ul_id) => {
      if (permission.secondEdit) {
        navigate(`${location.pathname}/UserLevelSecond`, {
          state: { ul_id: ul_id }
        });
      }
    }, [navigate, location.pathname]);

    return (
      levelList.map((ele, inx) => (
        <TableRow hover key={ele.ul_id}
          onClick={() => navigate_HandleSecond(ele.ul_id)}>
          <TableCell>{parseInt(inx) + 1}</TableCell>
          <TableCell>{ele.code}</TableCell>
          <TableCell>{ele.department_name}</TableCell>
          <TableCell>{ele.position_name}</TableCell>
          <TableCell>{ele.name}</TableCell>
          <TableCell>{ele.ul_id}</TableCell>
          <TableCell>{ele.parent_id}</TableCell>
          <TableCell>
            {permission.Delete
              ? <CusIconButton
                onClick={(e) => del_Click({ e: e, name: ele.name, id: ele.ul_id })}
                color='primary'
                icon={<Delete />}
              />
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
                <CusInput
                  id={"search--code"}
                  name={"code"}
                  label={"職務代碼"}
                  type={"text"}
                  value={pageSearch.code}
                  onChangeEvent={(e) => search_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CusInput
                  id={"search--name"}
                  name={"name"}
                  label={"職務名稱"}
                  type={"text"}
                  value={pageSearch.name}
                  onChangeEvent={(e) => search_HandleInput(e)}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                <CusTextIconButton
                  color={"default"}
                  text={"清除"}
                  startIcon={<HighlightOff />}
                  onClick={() => cleanSearch_Click()} />
                <CusTextIconButton
                  color={"info"}
                  text={"查詢"}
                  startIcon={<Search />}
                  onClick={getLevelList}
                />
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
                      text={"新增職務"}
                      startIcon={<Add />}
                      onClick={add_Click}
                    />
                    : null}
                </Box>
                {!isLoading
                  ? levelList.length > 0
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
                          { name: "代碼" },
                          { name: "部門" },
                          { name: "據點" },
                          { name: "職務名稱" },
                          { name: "職務編號" },
                          { name: "母層職務" },
                          { name: "操作" }
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
  );
};

/**[內容]Dialog*/
const DialogsInner = forwardRef((props, ref) => {
  const { type, name, add_Confirm } = props;

  // Stepper steps
  const [activeStep, setActiveStep] = useState(0);

  // 新增職務
  const [addData, setAddData] = useState({
    code: null,
    name: null,
    parent_id: null
  });
  const initAddDataCheck = { code: false, name: false, parent_id: false };
  const [addDataCheck, setAddDataCheck] = useState(initAddDataCheck);

  // 下拉選單
  const [options, setOptions] = useState({
    levelOptions: [],
    comOptions: [],
    posOptions: [],
    deptOptions: [],
    titleOptions: []
  });

  const useStepContent = useRef([]);
  useStepContent.current = [0, 1].map(() => React.createRef());

  // 取得下拉選單
  const getOptions = useCallback(async () => {
    const resLevel = await UserLevelAPI.UserLevelSearchAll({ code: "" });
    const comArr = await DDMenu.selectorCode("COM");
    const posArr = await DDMenu.selectorCode("POS");
    const deptArr = await DDMenu.selectorCode("DEP");
    const titleArr = await DDMenu.selectorCode("JTT"); //職稱下拉選單，但ECC目前好像還沒有?先放著

    setOptions(prev => ({
      ...prev,
      levelOptions: resLevel.success ? resLevel.data : [],
      comOptions: comArr,
      posOptions: posArr,
      deptOptions: deptArr,
      titleOptions: titleArr
    }))
  }, []);

  useEffect(() => {
    getOptions();
  }, []);

  /**下一步*/
  const handleNext = ({ nextStep }) => {
    if (!addData.code || !addData.name || !addData.parent_id) {
      setAddDataCheck({
        code: !addData.code ? true : false,
        name: !addData.name ? true : false,
        parent_id: !addData.parent_id ? true : false,
      });
    } else {
      setAddDataCheck(initAddDataCheck);
      setActiveStep(nextStep);
    }
  };

  /**返回 */
  const handleBack = (prevStep) => {
    setActiveStep(prevStep);
  };

  /**切換內容 */
  const SwitchStepContent = () => {
    switch (activeStep) {
      case 0:
        return <AddContent
          handleNext={handleNext}
          index={0}
          addData={addData}
          addDataCheck={addDataCheck}
          options={options}
          add_HandleInput={add_HandleInput}
          add_HandleSelect={add_HandleSelect}
        />

      case 1:
        return <ConfirmContent
          handleBack={handleBack}
          add_Confirm={add_Confirm}
          index={1}
          addData={addData}
          options={options}
        />
    };
  };

  /**[事件]input */
  const add_HandleInput = useCallback((e) => {
    const { name, value } = e.target;

    setAddData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  /**[事件]select*/
  const add_HandleSelect = useCallback((e) => {
    const { name, key, value } = e.target;
    const val = value === null ? "" : value[key];

    setAddData(prevData => ({
      ...prevData,
      [name]: val
    }));
  }, []);

  //提供父層function使用
  useImperativeHandle(ref, () => ({
    addData
  }));

  if (type === "add") {
    return (
      <React.Fragment>
        <CusVerticalLinearStepper1
          nowStep={activeStep}
          content={SwitchStepContent(addData)}
          steps={[
            { label: "新增資訊" },
            { label: "確認資訊" },
          ]}
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

const AddContent = (props) => {
  const { addData, addDataCheck, options, add_HandleInput, add_HandleSelect, handleNext, index } = props;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--code"}
            name={"code"}
            label={"職務代碼"}
            type={"text"}
            required={true}
            error={addDataCheck.code}
            value={addData.code}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--name"}
            name={"name"}
            label={"職務名稱"}
            type={"text"}
            required={true}
            error={addDataCheck.name}
            value={addData.name}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--parent_id"}
            name={"parent_id"}
            label={"母層職務"}
            options={options.levelOptions}
            optionKey={"ul_id"}
            required={true}
            error={addDataCheck.parent_id}
            value={options.levelOptions.some(item => item.ul_id === addData.parent_id) ? options.levelOptions.find(item => item.ul_id === addData.parent_id) : null}
            onChangeEvent={(e) => { add_HandleSelect(e) }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--company_id"}
            name={"company_id"}
            label={"公司"}
            options={options.comOptions}
            optionKey={"sps_id"}
            value={options.comOptions.some(item => item.sps_id === addData.company_id) ? options.comOptions.find(item => item.sps_id === addData.company_id) : null}
            onChangeEvent={(e) => { add_HandleSelect(e) }}
          />
        </Grid> */}
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--department_id"}
            name={"department_id"}
            label={options.deptOptions.length > 0 ? "部門" : "查無部門"}
            disabled={options.deptOptions.length > 0 ? false : true}
            options={options.deptOptions}
            optionKey={"sps_id"}
            value={options.deptOptions.some(item => item.sps_id === addData.department_id) ? options.deptOptions.find(item => item.sps_id === addData.department_id) : null}
            onChangeEvent={(e) => { add_HandleSelect(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--position_id"}
            name={"position_id"}
            label={"據點"}
            options={options.posOptions}
            optionKey={"sps_id"}
            value={options.posOptions.some(item => item.sps_id === addData.position_id) ? options.posOptions.find(item => item.sps_id === addData.position_id) : null}
            onChangeEvent={(e) => { add_HandleSelect(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--title"}
            name={"title"}
            label={options.titleOptions.length > 0 ? "職稱" : "查無職稱"}
            disabled={options.titleOptions.length > 0 ? false : true}
            options={options.titleOptions}
            optionKey={"sps_id"}
            value={options.titleOptions.some(item => item.sps_id === addData.title) ? options.titleOptions.find(item => item.sps_id === addData.title) : null}
            onChangeEvent={(e) => { add_HandleSelect(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"edit--maximum"}
            name={"maximum"}
            label={"可編制人數上限"}
            type={"number"}
            value={addData.maximum}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--email"}
            name={"email"}
            label={"職務信箱"}
            type={"text"}
            value={addData.email}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--phone"}
            name={"phone"}
            label={"聯絡方式"}
            type={"text"}
            value={addData.phone}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CusInput
            id={"add--note"}
            name={"note"}
            label={"備註"}
            type={"text"}
            value={addData.note}
            onChangeEvent={(e) => { add_HandleInput(e) }}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          <CusTextButton
            variant='contained'
            sx={{ mt: 1, mr: 1 }}
            onClick={(e) =>
              handleNext({
                thisStep: index,
                nextStep: parseInt(index) + 1,
              })
            }
            text={"下一步"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const ConfirmContent = (props) => {
  const { addData, options, handleBack, index, add_Confirm } = props;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--code"}
            name={"code"}
            label={"職務代碼"}
            type={"text"}
            disabled={true}
            required={true}
            value={addData.code}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--name"}
            name={"name"}
            label={"職務名稱"}
            type={"text"}
            disabled={true}
            required={true}
            value={addData.name}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--parent_id"}
            name={"parent_id"}
            label={"母層職務"}
            disabled={true}
            options={options.levelOptions}
            optionKey={"ul_id"}
            required={true}
            value={options.levelOptions.some(item => item.ul_id === addData.parent_id) ? options.levelOptions.find(item => item.ul_id === addData.parent_id) : null}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--company_id"}
            name={"company_id"}
            label={"公司"}
            disabled={true}
            options={options.comOptions}
            optionKey={"sps_id"}
            value={options.comOptions.some(item => item.sps_id === addData.company_id) ? options.comOptions.find(item => item.sps_id === addData.company_id) : null}
          />
        </Grid> */}
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--position_id"}
            name={"position_id"}
            label={"據點"}
            disabled={true}
            options={options.posOptions}
            optionKey={"sps_id"}
            value={options.posOptions.some(item => item.sps_id === addData.position_id) ? options.posOptions.find(item => item.sps_id === addData.position_id) : null}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--department_id"}
            name={"department_id"}
            label={options.deptOptions.length > 0 ? "部門" : "查無部門"}
            disabled={true}
            options={options.deptOptions}
            optionKey={"sps_id"}
            value={options.deptOptions.some(item => item.sps_id === addData.department_id) ? options.deptOptions.find(item => item.sps_id === addData.department_id) : null}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusOutlinedSelect
            id={"add--title"}
            name={"title"}
            label={options.titleOptions.length > 0 ? "職稱" : "查無職稱"}
            disabled={true}
            options={options.titleOptions}
            optionKey={"sps_id"}
            value={options.titleOptions.some(item => item.sps_id === addData.title) ? options.titleOptions.find(item => item.sps_id === addData.title) : null}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"edit--maximum"}
            name={"maximum"}
            label={"可編制人數上限"}
            type={"number"}
            disabled={true}
            value={addData.maximum}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--email"}
            name={"email"}
            label={"職務信箱"}
            type={"text"}
            disabled={true}
            value={addData.email}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CusInput
            id={"add--phone"}
            name={"phone"}
            label={"聯絡方式"}
            type={"text"}
            disabled={true}
            value={addData.phone}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CusInput
            id={"add--note"}
            name={"note"}
            label={"備註"}
            type={"text"}
            disabled={true}
            value={addData.note}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          <CusTextButton
            sx={{ mt: 1, mr: 1 }}
            color={"default"}
            onClick={(e) => handleBack(parseInt(index) - 1)}
            text={"返回"}
          />
          <CusTextButton
            color={"primary"}
            variant='contained'
            sx={{ mt: 1, mr: 1 }}
            onClick={add_Confirm}
            text={"確認"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
};
