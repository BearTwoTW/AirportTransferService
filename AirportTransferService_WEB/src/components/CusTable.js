import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Grid,
  Box, Button, IconButton
} from '@mui/material';
import { LastPage, KeyboardArrowRight, KeyboardArrowLeft, FirstPage } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import { CusThemeTS } from '../CustomThemeTS';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const theme = createTheme(CusThemeTS.defaultTheme);
/**
 * @description 頁碼 組件
 * @param {number} rowsPerPage 每頁顯示筆數的值
 * @param {number} count 資料總筆數
 * @param {number} page 當前頁碼
 * @param {function} onPageChange 換頁事件
 */
const PaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange, pageRange } = props;
  // 總頁數
  let totalP = parseInt(count / rowsPerPage);
  // 左右延伸要幾頁
  let range = pageRange !== undefined ? pageRange : 2;
  // 左邊有頁數
  let leftItemcount = page - range < 1 ? 1 : page - range;
  // 右邊有頁數
  let rightItemcount = page + range > totalP ? totalP : page + range;

  async function handleFirstPageButtonClick(event) {
    onPageChange(event, 1);
    sessionStorage.setItem("nowPage", 1);
  };
  async function handleBackButtonClick(event, newPage) {
    onPageChange(event, page - 1);
    sessionStorage.setItem("nowPage", parseInt(page) - 1);
  };
  async function handleNextButtonClick(event) {
    onPageChange(event, page + 1);
    sessionStorage.setItem("nowPage", parseInt(page) + 1);
  };
  async function handleLastPageButtonClick(event) {
    onPageChange(event, Math.max(1, parseInt(count / rowsPerPage)));
    sessionStorage.setItem("nowPage", Math.max(1, parseInt(count / rowsPerPage)));
  };
  async function handleButtonClick(event) {
    event.preventDefault();
    let page = event.currentTarget.getAttribute("data-page");
    onPageChange(event, parseInt(page));
    sessionStorage.setItem("nowPage", parseInt(page));
  }
  async function handleMoreBackButtonClick(event) {
    event.preventDefault();
    let page = sessionStorage.getItem("nowPage");
    onPageChange(event, parseInt(page) - 3);
    sessionStorage.setItem("nowPage", parseInt(page) - 3);
  }
  async function handleMoreLastButtonClick(event) {
    event.preventDefault();
    let page = sessionStorage.getItem("nowPage");
    onPageChange(event, parseInt(page) + 3);
    sessionStorage.setItem("nowPage", parseInt(page) + 3);
  }
  // 頁碼按鈕
  let btn = [];
  for (let i = leftItemcount; i <= parseInt(rightItemcount); i++) {
    btn.push(<Button key={i} data-page={i} onClick={handleButtonClick}
      className={parseInt(page) === i ? "pageItem active Pagination__btn" : "pageItem Pagination__btn"}>{parseInt(i)}</Button>)
  }
  return (
    <Box py={3} display="flex" justifyContent="center" alignItems="center" className={"Pagination"}>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page">
        <FirstPage />
      </IconButton>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      {leftItemcount > 4 ? <Button className={"Pagination__btn"} onClick={handleMoreBackButtonClick}>...</Button> : ""}
      {btn.map((item, index) => { return item })}
      {totalP - rightItemcount > 4 ? <Button className={"Pagination__btn"} onClick={handleMoreLastButtonClick}>...</Button> : ""}
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={handleNextButtonClick}
        disabled={page >= parseInt(count / rowsPerPage)}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={handleLastPageButtonClick}
        disabled={page >= parseInt(count / rowsPerPage)}
        aria-label="last page">
        <LastPage />
      </IconButton>
    </Box>
  );
}

/**
 * PaginationActions
 * @description 型別判斷
 */
PaginationActions.propTypes = {
  rowsPerPage: PropTypes.number,
  count: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
}

const CusBasicTable = (props) => {
  return (
    <React.Fragment>
      {props.hasRowsPerPage ?
        <TablePagination
          rowsPerPageOptions={[
            { value: 5, label: "5 筆" },
            { value: 10, label: "10 筆" },
            { value: 15, label: "15 筆" },
            { value: 20, label: "20 筆" },
            { value: 25, label: "25 筆" }
          ]}
          component="div"
          labelRowsPerPage={""}
          rowsPerPage={props.rowsPerPage}
          onPageChange={props.onPageChange}
          count={props.count}
          page={props.page}
          nextIconButtonProps={{ style: { display: "none" } }}
          backIconButtonProps={{ style: { display: "none" } }}
          onRowsPerPageChange={props.onRowsPerPageChange}
        /> : ""}
      <TableContainer component={Paper} sx={{
        ...props.stickyStyle,
        border: `1px solid #D9D9DC`,
        borderRadius: 0,
        boxShadow: "none",
        marginTop: "1rem",
        overflowX: "auto",
        maxWidth: "100"
      }}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="simple table" stickyHeader={props.stickyHeader}>
          <TableHead className={props.styleType}>
            <TableRow>
              {props.TableHead.map((ele, inx) => (
                <TableCell key={inx} className={props.styleType ? `${props.styleType}__color` : ""}>{ele.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.TableBody}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

CusBasicTable.defaultProps = {
  stickyStyle: {},
  stickyHeader: false,
  styleType: "",
};

CusBasicTable.prototype = {
  stickyHeader: PropTypes.bool,
  stickyStyle: PropTypes.object,
  styleType: PropTypes.string,
};

const TableHeadSX = {
  [`&.MuiTableHead-root`]: {
    borderRadius: "10px",
    backgroundColor: Variables[status + "__BtnSecondaryColor"],
  },
  [`&.MuiTableHead-root th:first-of-type`]: {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  [`&.MuiTableHead-root th:last-child`]: {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
}

const TableRowSX = {
  [`&.MuiTableBody-root .MuiTableRow-root`]: {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1), 2px 0px 4px rgba(0,0,0,0.1)",
  },
  [`&.MuiTableBody-root .MuiTableRow-root td:first-of-type`]: {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  [`&.MuiTableBody-root .MuiTableRow-root td:last-child`]: {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  [`&.MuiTableBody-root .MuiTableRow-root:hover`]: {
    backgroundColor: "#f5f5f5"
  }
}

const CusCardTable = (props) => {
  return (
    <React.Fragment>
      {props.hasRowsPerPage ?
        <TablePagination
          rowsPerPageOptions={[
            { value: 5, label: "5 筆" },
            { value: 10, label: "10 筆" },
            { value: 15, label: "15 筆" },
            { value: 20, label: "20 筆" },
            { value: 25, label: "25 筆" }
          ]}
          component="div"
          labelRowsPerPage={""}
          rowsPerPage={props.rowsPerPage}
          onPageChange={props.onPageChange}
          count={props.count}
          page={props.page}
          nextIconButtonProps={{ style: { display: "none" } }}
          backIconButtonProps={{ style: { display: "none" } }}
          onRowsPerPageChange={props.onRowsPerPageChange}
        /> : ""}
      <TableContainer component={Paper} sx={{
        ...props.stickyStyle,
        borderRadius: 0,
        boxShadow: "none",
        marginTop: "1rem",
        overflowX: "auto",
        maxWidth: "100",
      }}>
        <Table
          sx={{ backgroundColor: "white", minWidth: 700, borderCollapse: "separate", borderSpacing: "0 10px", padding: "4px" }}
          aria-label="simple table"
          stickyHeader={props.stickyHeader}>
          <TableHead sx={TableHeadSX}>
            <TableRow>
              {props.TableHead.map((ele, inx) => (
                <TableCell key={inx}>{ele.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={TableRowSX}>
            {props.TableBody}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment >
  );
}

export { PaginationActions, CusBasicTable, CusCardTable }