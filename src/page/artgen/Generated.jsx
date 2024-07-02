import React from "react";
import Header from "../../component/common/header";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "title", label: "タイトル", minWidth: 320 },
  { id: "amount", label: "文字数", minWidth: 100 },
  {
    id: "category",
    label: "カテゴリ",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "ステータス",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "keyword",
    label: "キーワード",
    minWidth: 150,
    align: "right",
  },
  {
    id: "ranking",
    label: "順位",
    minWidth: 130,
    align: "right",
  },
  {
    id: "date",
    label: "日付",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(title, amount, category, status, keyword, ranking, date) {
  return { title, amount, category, status, keyword, ranking, date };
}

const rows = [
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
  createData(
    "最新相場で高く売れる!車買取おすすめ業者ランキング 100",
    "3,211",
    "車買取の基礎知識",
    "下書き",
    "車買取",
    3,
    "2024/02/02 12:00:00"
  ),
];

const Generated = () => {
  const [auto, setAuto] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setAuto(event.target.checked);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>
        <div className=" pt-7 pb-7 mt-8 bg-gray-100 w-full">
          <FormControl component="fieldset" variant="standard">
            <h2 component="legend" className="text-[18px] font-bold ml-4">
              リライト設定
            </h2>
            <FormGroup>
              <FormControlLabel
                label="自動リライト機能"
                control={
                  <Switch checked={auto} onChange={handleChange} name="auto" />
                }
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </div>

        <Stack spacing={2}>
          <Pagination count={10} showFirstButton showLastButton />
        </Stack>

        <Paper sx={{ width: "100%", paddingTop: "1rem", marginTop:"2rem"}}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} sx={{paddingY: "2rem"}}>
                              {column.id === "status" ? (
                                <>
                                  <FiberManualRecordIcon
                                    sx={{ color: "#005ed7" }}
                                  />
                                  {value}
                                </>
                              ) : column.id === "ranking" ? (
                                <div className=" flex justify-end items-center gap-2">
                                  <span>3</span>
                                  <div className="bg-[#F5FCFB] py-2 px-4 rounded-full">
                                    <TrendingUpIcon sx={{ color: "#07B9A5" }} />
                                    <span className="ml-2 text-[#07B9A5]">
                                      5
                                    </span>
                                  </div>
                                </div>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Generated;
