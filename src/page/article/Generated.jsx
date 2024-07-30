import React, { useState } from "react";
import Header from "../../component/common/header";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Notification from "../../component/common/notification";
import './scrollcustom.css'

const columns = [
  { id: "title", label: "タイトル", minWidth: 320 },
  { id: "amount", label: "文字数", minWidth: 100 },
  {
    id: "category",
    label: "カテゴリ",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "ステータス",
    minWidth: 150,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "keyword",
    label: "キーワード",
    minWidth: 150,
    align: "left",
  },
  {
    id: "ranking",
    label: "順位",
    minWidth: 130,
    align: "left",
  },
  {
    id: "date",
    label: "日付",
    minWidth: 170,
    align: "left",
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

const Generated = (props) => {
  const [auto, setAuto] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const content = props.content ? props.content : "";
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
      <div className="relative flex flex-col flex-1 items-start px-5 md:px-12 lg:px-18 xl:px-20">
        <div className="flex justify-between items-center w-full mt-16">
          <h1 className="heading font text-[calc(8px+2vmin)] text-gray-900 font-semibold ">
            記事一覧
          </h1>
          <div className="pb-3 mt-5 ">
            <FormControl component="fieldset" variant="standard">
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
        </div>

        <div className="w-full pt-4 mt-8">
          <TableContainer sx={{ maxHeight: 550 }}>
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
                            <TableCell key={column.id} align={column.align} sx={{ paddingY: "1rem" }}>
                              {column.id === "status" ? (
                                <>
                                  <FiberManualRecordIcon
                                    sx={{ color: "#005ed7" }}
                                  />
                                  {value}
                                </>
                              ) : column.id === "ranking" ? (
                                <div className=" flex justify-start items-center gap-2">
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

          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </div>
      </div>
      <Notification content={content} />
    </div>
  );
};

export default Generated;
