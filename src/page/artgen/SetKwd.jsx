import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "../../component/common/header";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SetKwd = () => {
  const [keyword, setKeyword] = useState("");
  const [fakeButtons, setFakeButtons] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [showClearIcon, setShowClearIcon] = useState("none");

  useEffect(() => {
    console.log("GenRouter component mounted or updated");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const keywords = keyword.split(",").filter(Boolean);
      const buttons = keywords
        .map((keyword) => {
          const fakeButtons = [];
          for (let i = 1; i <= 5; i++) {
            fakeButtons.push(`${keyword}${i}`);
          }

          console.log(fakeButtons);
          return fakeButtons;
        })
        .flat();
      setFakeButtons(buttons);
      setSelectedResults([]);
    }
  };
  const handleChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setShowClearIcon(newKeyword === "" ? "none" : "flex");
  };
  const handleClick = () => {
    console.log("clicked the clear icon...");
    setShowClearIcon("none");
  };

  const handleResultClick = (result) => {
    setSelectedResults((prevSelectedResults) => {
      if (prevSelectedResults.includes(result)) {
        return prevSelectedResults.filter((r) => r !== result);
      } else {
        return [...prevSelectedResults, result];
      }
    });
  };
  const runProcess = (result) => {
    if (selectedResults.length > 2) {
      navigate("/artgen/progress");
    } else {
      window.alert("Please select the keywords");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 justify-between items-start px-40">
        <div>
          <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            記事の作成
          </h1>
          <div
            id="app"
            className="py-2 font text-[calc(2vmin)] text-[#014361] rounded-md mt-10 mb-8"
          >
            <FormControl sx={{ width: "30ch" }}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="キーワードを検索してください"
                value={keyword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ display: showClearIcon }}
                      onClick={handleClick}
                    >
                      <CloseIcon style={{ cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {fakeButtons.length > 0 ? (
              <h2 className=" text-[#232E2F] mt-12 font-semibold">
                キーワード候補：
              </h2>
            ) : (
              ""
            )}
            <div className="flex mt-4 flex-wrap">
              {fakeButtons.map((button, index) => (
                <button
                  key={index}
                  className={`p-2 pl-3 pr-3 border rounded-2xl mr-3 mb-2 ${
                    selectedResults.includes(button)
                      ? "bg-[#232E2F] text-white"
                      : "bg-gray-100 text-[#232E2F]"
                  } hover:bg-[#232E2F] hover:text-white`}
                  onClick={() => handleResultClick(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className=" flex justify-between  items-center w-full bg-gray-200 text-[#232E2F] font-semibold p-5">
          {selectedResults.length > 2 ? (
            <div>検索ボリュームが十分です。記事の生成をしましょう</div>
          ) : (
            <div>検索ボリュームが不十分です。</div>
          )}
          <button
            className={` text-white font-semibold border py-3 px-4  rounded-2xl  ${
              selectedResults.length > 2 ? "bg-[#232E2F]" : "bg-[#A7ABAC]"
            } hover:bg-[#232E2F] hover:text-white`}
            onClick={runProcess}
          >
            記事を生成する
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SetKwd;
