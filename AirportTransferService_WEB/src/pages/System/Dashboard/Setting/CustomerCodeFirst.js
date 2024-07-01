import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CusCard } from '../../../../components/CusCard';
import { CusBasicTable } from '../../../../components/CusTable';
import { CircularLoading } from '../../../../components/CusProgress';
import { NoResults } from '../../../../components/CusError';
import { SystemParamAPI } from '../../../../js/APITS';
import { useCheckLogInXPermission } from '../../../../js/Function';

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export default function CustomerCodeFirst() {
  // 導頁
  const navigate = useNavigate();
  const location = useLocation();

  // 權限
  const permission = useCheckLogInXPermission("CustomerCodeFirst", ["secondEdit"]);

  // 客製代碼大分類代碼列表
  const [primaryList, setPrimaryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 通知視窗
  const { enqueueSnackbar } = useSnackbar();

  /**
   * 查詢客製系統代碼
   */
  const getPrimaryList = () => {
    SystemParamAPI.PrimaryList().then(res => {
      if (res.success) {
        setPrimaryList(res.data.filter(ele => ele.su === "N"));
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPrimaryList();
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
        navigate(`${location.pathname}/CustomerCodeSecond`, {
          state: { spp_id }
        });
      } else {
        enqueueSnackbar("此帳號無權限使用", {
          variant: "warning",
          persist: true
        });
      }
    }, [navigate, location.pathname]);

    return (
      primaryList.length > 0
        ? primaryList.map((ele, seq) => (
          <TableRow hover key={ele.spp_id}
            onClick={() => navigate_HandleSecond(ele.spp_id)}>
            <TableCell>{parseInt(seq) + 1}</TableCell>
            <TableCell>{ele.spp_id}</TableCell>
            <TableCell>{ele.name}</TableCell>
            <TableCell>{ele.remark}</TableCell>
          </TableRow>
        ))
        : null
    )
  });

  return (
    <React.Fragment>
      <CusCard content={
        <React.Fragment>
          {!isLoading
            ? primaryList.length > 0
              ? <Grid item xs={12}>
                <CusBasicTable
                  TableHead={[
                    { name: "排序" },
                    { name: "代碼" },
                    { name: "名稱" },
                    { name: "備註" }]}
                  TableBody={<TableBodyContent />} />
              </Grid>
              : <NoResults />
            : <CircularLoading />}
        </React.Fragment>}
      />
    </React.Fragment >
  );
};