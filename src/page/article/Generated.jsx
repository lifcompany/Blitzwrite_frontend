import React, { useEffect, useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Notification from "../../component/common/notification";
import Header from "../../component/common/header";
import './scrollcustom.css'
import { useSelector } from "react-redux";

const columns = [
  { id: "title", label: "タイトル", minWidth: 320 },
  { id: "amount", label: "文字数", minWidth: 100 },
  { id: "category", label: "カテゴリ", minWidth: 170, align: "left", format: (value) => value.toLocaleString("en-US") },
  { id: "wp_status", label: "ステータス", minWidth: 150, align: "left", format: (value) => value.toLocaleString("en-US") },
  { id: "keywords", label: "キーワード", minWidth: 150, align: "left" },
  { id: "ranking", label: "順位", minWidth: 200, align: "left" },
  { id: "created_at", label: "日付", minWidth: 170, align: "left", format: (value) => value.toFixed(2) },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Generated = (props) => {
  const [articles, setArticles] = useState([])
  const [auto, setAuto] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const selectedSiteUrl = useSelector((state) => state.site.siteUrl);

  const content = props.content ? props.content : "";
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log(selectedSiteUrl);
    axios.get(`${apiUrl}/api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        site_url: selectedSiteUrl,
      },
    }).then(response => {
      setArticles(response.data)
    }).catch(error => {
      console.log(error.response.data);
    })
  }, [selectedSiteUrl]);

  // useEffect(() => {
  //   console.log(selectedSiteUrl);
  //   axios.get(`${apiUrl}/api/generate/fetch-clicks/`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     params: {
  //       site_url: selectedSiteUrl,
  //     },
  //   }).then(response => {
  //     console.log(response.data);
  //   }).catch(error => {
  //     console.log(error.response.data);
  //   })
  // }, [selectedSiteUrl]);


  const handleChange = (event) => {
    setAuto(event.target.checked);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(articles.length / rowsPerPage);

  const paginatedArticles = articles.slice(
    (page - 1) * rowsPerPage, // Start index
    page * rowsPerPage // End index
  );

  const getTrendingIcon = (currentClicks, previousClicks) => {
    if (currentClicks > previousClicks) {
      return <TrendingUpIcon sx={{ color: "#07B9A5" }} />;
    } else if (currentClicks < previousClicks) {
      return <TrendingDownIcon sx={{ color: "#FF5722" }} />;
    } else {
      return <FiberManualRecordIcon sx={{ color: "#9E9E9E" }} />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-5 md:px-12 lg:px-18 xl:px-20">
        <div className="flex justify-between items-center w-full mt-16">
          <h1 className="heading font text-[calc(8px+2vmin)] text-gray-900 font-semibold ">
            記事一覧
          </h1>
          <div className="pb-3 mt-5 font-noto">
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  label="自動リライト機能"
                  control={
                    <Switch checked={auto} onChange={handleChange} name="auto" />
                  }
                  labelPlacement="start"
                  className=" font-noto"
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>

        <div className="w-full mt-4">
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="font-noto"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {articles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                {paginatedArticles
                  .map((article) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={article.id}
                      >
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          {article.title}
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          {article.amount}
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          {article.category}
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          <FiberManualRecordIcon
                            sx={{ color: article.wp_status === "draft" ? "gray" : "blue" }}
                          />
                          {article.wp_status === "draft" ? "下書き" : "公開済み"}
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          {article.keywords}
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          <div className=" flex justify-start items-center gap-2">
                            <span>{article.current_clicks}</span>
                            <div className="bg-[#F5FCFB] py-2 px-4 rounded-full">
                              {getTrendingIcon(article.current_clicks, article.last_month_clicks)}
                              <span className="ml-2 text-[#07B9A5]">
                                {article.last_month_clicks}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell sx={{ paddingY: "1rem" }} className="font-noto">
                          {formatDate(article.created_at)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} className=" mt-8">
            <Pagination
              count={pageCount} 
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            />
          </Stack>
        </div>
      </div>
      <Notification content={content} />
    </div>
  );
};

export default Generated;
