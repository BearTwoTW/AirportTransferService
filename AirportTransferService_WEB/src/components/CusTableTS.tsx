import React from "react";
import { Table, TableBody, TableFooter, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, Button, IconButton } from "@mui/material";
import { LastPage, KeyboardArrowRight, KeyboardArrowLeft, FirstPage } from "@mui/icons-material";
import Variables from "../scss/App.css";
import { createTheme } from '@mui/material/styles';
import { CusThemeTS } from '../CustomThemeTS';

const theme = createTheme(undefined, CusThemeTS.defaultTheme);

const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

/**
 * @description 頁碼組件props
 * @param {number} totalPage 總頁碼
 * @param {number} page 當前頁碼
 * @param {number} pageRange 頁碼範圍
 * @param {function} onPageChange 換頁事件
 */
type PaginationActionsTSProps = {
  totalPage: number;
  page: number;
  pageRange?: number;
  onPageChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nowPage: number) => void;
};

/**
 * @description 頁碼組件
 * @param props
 * @returns 
 */
export const PaginationActionsTS = (props: PaginationActionsTSProps) => {
  const { totalPage, page, pageRange, onPageChange } = props;

  // 總頁數
  let totalP = totalPage ? totalPage : 0;
  // 處理當前頁碼
  let nowPage = page ? page : 0;
  // 左右延伸要幾頁
  let range = pageRange ? pageRange : 2;
  // 左邊有頁數
  let leftItemCount = nowPage - range < 1 ? 1 : nowPage - range;
  // 右邊有頁數
  let rightItemCount = nowPage + range > totalP ? totalP : nowPage + range;

  /**
   * 點擊頁碼
   * @param e
   */
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickPage: number) => {
    onPageChange(e, clickPage);
    sessionStorage.setItem("nowPage", clickPage.toString());
  };

  // 產生頁碼按鈕
  let pageBtn = [];
  for (let i = leftItemCount; i <= rightItemCount; i++) {
    pageBtn.push(
      <Button
        key={i}
        data-page={i}
        onClick={(e) => handleButtonClick(e, i)}
        className={page === i ? "pageItem active Pagination__btn" : "pageItem Pagination__btn"}
      >{i}
      </Button>);
  };

  return (
    <Box py={3} display="flex" justifyContent="center" className={"Pagination"}>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={(e) => handleButtonClick(e, 1)}
        disabled={nowPage === 1}
        aria-label="first page">
        <FirstPage />
      </IconButton>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={(e) => handleButtonClick(e, nowPage - 1)}
        disabled={nowPage === 1}
        aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      {leftItemCount > 4
        ? <Button className={"Pagination__btn"} onClick={(e) => handleButtonClick(e, nowPage - 3)}>...</Button>
        : ""}
      {pageBtn.map(item => item)}
      {totalP - rightItemCount > 4
        ? <Button className={"Pagination__btn"} onClick={(e) => handleButtonClick(e, nowPage + 3)}>...</Button>
        : ""}
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={(e) => handleButtonClick(e, nowPage + 1)}
        disabled={nowPage >= totalP}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        sx={{ margin: "5px" }}
        color="secondary"
        onClick={(e) => handleButtonClick(e, totalP)}
        disabled={nowPage >= totalP}
        aria-label="last page">
        <LastPage />
      </IconButton>
    </Box>
  );
};

/**
 * @description table組件props
 * @param {boolean} hasRowsPerPage 是否有每頁筆數下拉選單
 * @param {number} rowsPerPage 每頁筆數
 * @param {function} onPageChange 換頁事件
 * @param {number} count 總頁數
 * @param {number} page 當前頁碼
 * @param {function} onRowsPerPageChange 每頁筆數改變事件
 * @param {boolean} stickyHeader 是否固定標頭
 * @param {any} stickyStyle 樣式
 * @param {string} styleType 樣式類型
 * @param {TableHeadColumn[]} tableHead 標頭
 * @param {string} tableHeadAlign 標頭對齊方式
 * @param {any} tableBody table內容
 */
type CusBasicTableTSProps = {
  hasRowsPerPage?: boolean;
  rowsPerPage?: number;
  onPageChange?: (e: React.MouseEvent<HTMLButtonElement> | null, nowPage: number) => void;
  count?: number;
  page?: number;
  onRowsPerPageChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  stickyHeader?: boolean;
  stickyStyle?: React.CSSProperties;
  styleType?: string;
  minWidth?: number
  tableHead: TableHeadColumn[];
  tableHeadAlign?: "left" | "center" | "right" | "justify" | "inherit";
  tableBody: any;
  // tableFooter: any;
};

/**
 * @description table組件 => 標頭型別
 */
type TableHeadColumn = {
  name: string;
};

/**
 * table組件
 * @param props
 * @returns 
 */
export const CusBasicTableTS = (props: CusBasicTableTSProps) => {
  const {
    hasRowsPerPage,
    rowsPerPage,
    onPageChange,
    count,
    page,
    onRowsPerPageChange,
    stickyHeader,
    stickyStyle,
    styleType,
    tableHead,
    tableHeadAlign,
    tableBody,
    minWidth
    // tableFooter
  } = props;

  return (
    <React.Fragment>
      {hasRowsPerPage
        ? <TablePagination
          rowsPerPageOptions={[
            { value: 5, label: "5 筆" },
            { value: 10, label: "10 筆" },
            { value: 15, label: "15 筆" },
            { value: 20, label: "20 筆" },
            { value: 25, label: "25 筆" }
          ]}
          component="div"
          labelRowsPerPage={""}
          rowsPerPage={rowsPerPage ?? 0}
          onPageChange={(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, nowPage: number) => {
            if (onPageChange) {
              onPageChange(e, nowPage);
            }
          }}
          count={count ?? 0}
          page={page ? page <= 0 ? (page - 1) : 0 : 0}
          nextIconButtonProps={{ style: { display: "none" } }}
          backIconButtonProps={{ style: { display: "none" } }}
          onRowsPerPageChange={onRowsPerPageChange} />
        : null}
      <TableContainer component={Paper} sx={{
        ...stickyStyle,
        border: `1px solid #D9D9DC`,
        borderRadius: 0,
        boxShadow: "none",
        marginTop: "1rem",
        overflowX: "auto",
        maxWidth: "100"
      }}>
        <Table
          sx={{ minWidth: minWidth ?? 700 }}
          aria-label="simple table"
          stickyHeader={stickyHeader}>
          <TableHead className={styleType}>
            <TableRow>
              {tableHead.map((ele, inx) => (
                <TableCell
                  key={inx}
                  className={
                    styleType
                      ? `${styleType}__color`
                      : ""
                  }
                  align={tableHeadAlign}
                >{ele.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

const TableHeadSX = {
  [`&.MuiTableHead-root`]: {
    borderRadius: "10px",
    backgroundColor: Variables[status + "__BtnInfo"],
  },
  [`&.MuiTableHead-root th:first-child`]: {
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
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
  },
  [`&.MuiTableBody-root .MuiTableRow-root td:first-child`]: {
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


type CusCardTableTSProps = {
  hasRowsPerPage?: boolean;
  rowsPerPage?: number;
  onPageChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
  count?: number;
  page?: number;
  onRowsPerPageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tableHead: TableHeadColumn[];
  tableBody: React.ReactNode;
  stickyHeader?: boolean;
  stickyStyle?: React.CSSProperties;
}

export const CusCardTable = (props: CusCardTableTSProps) => {
  const {
    hasRowsPerPage,
    rowsPerPage,
    onPageChange,
    count,
    page,
    onRowsPerPageChange,
    stickyHeader,
    stickyStyle,
    tableHead,
    tableBody
  } = props;

  return (
    <React.Fragment>
      {hasRowsPerPage ?
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
          rowsPerPage={rowsPerPage ?? 0}
          onPageChange={(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, nowPage: number) => {
            if (onPageChange) {
              onPageChange(e, nowPage);
            }
          }}
          count={count ?? 0}
          page={page ?? 0}
          nextIconButtonProps={{ style: { display: "none" } }}
          backIconButtonProps={{ style: { display: "none" } }}
          onRowsPerPageChange={onRowsPerPageChange} />
        : null}
      <TableContainer component={Paper} sx={{
        ...stickyStyle,
        borderRadius: 0,
        boxShadow: "none",
        marginTop: "1rem",
        overflowX: "auto",
        maxWidth: "100",
      }}>
        <Table
          sx={{ minWidth: 700, borderCollapse: "separate", borderSpacing: "0 10px", padding: "2px" }}
          aria-label="simple table"
          stickyHeader={stickyHeader}>
          <TableHead sx={TableHeadSX}>
            <TableRow>
              {tableHead.map((ele, inx) => (
                <TableCell key={inx}>{ele.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={TableRowSX}>
            {tableBody}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment >
  );
}