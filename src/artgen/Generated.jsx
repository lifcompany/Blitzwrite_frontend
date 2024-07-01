import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Generated = () => {
  const [auto, setAuto] = React.useState(false);

  const navigate = useNavigate();

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
        <div className="w-full mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-[#F6F7F7]">タイトル</th>
                <th className="p-3 bg-[#F6F7F7]">文字数</th>
                <th className="p-3 bg-[#F6F7F7]">カテゴリ</th>
                <th className="p-3 bg-[#F6F7F7]">ステータス</th>
                <th className="p-3 bg-[#F6F7F7]">キーワード</th>
                <th className="p-3 bg-[#F6F7F7]">順位</th>
                <th className="p-3 bg-[#F6F7F7]">日付</th>
              </tr>
            </thead>
            <tbody>
              {/* Render fake articles here */}
              {Array.from({ length: 100 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-3 py-6 border-b-2  border-solid border-gray-200">
                    最新相場で高く売れる!車買取おすすめ業者ランキング{" "}
                    {index + 1}
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    3,211
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    車買取の基礎知識
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    <FiberManualRecordIcon sx={{ color: "#005ed7" }} />
                    下書き
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    車買取
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    <div className=" flex justify-center items-center gap-2">
                      <span>3</span>
                      <div className="bg-[#F5FCFB] py-2 px-4 rounded-full">
                        <TrendingUpIcon sx={{ color: "#07B9A5" }} />
                        <span className=" text-[#07B9A5]">5</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    2024/02/02 12:00:00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Generated;
