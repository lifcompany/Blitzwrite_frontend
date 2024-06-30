import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
const Generated = () => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>
        <div>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.gilad}
                    onChange={handleChange}
                    name="gilad"
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.jason}
                    onChange={handleChange}
                    name="jason"
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.antoine}
                    onChange={handleChange}
                    name="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
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
                    下書き
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    車買取
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    -
                  </td>
                  <td className="px-3 py-6 border-b-2 border-solid border-gray-200">
                    2024/02/02 12:00:00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => navigate("/artgen/")}
            className="w-100 h-50 px-6 py-3 text-black   bg-white border border-black   rounded-sm mb-20"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generated;
