import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../component/common/header";
import Error from "../../component/common/error";
import Notification from "../../component/common/notification";



const SetKwd = () => {
  const [fakeButtons, setFakeButtons] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [options, setOption] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const keywords = inputValue.split(",").filter(Boolean);
      const buttons = keywords
        .map((keyword) => {
          const fakeButtons = [];
          // for (let i = 1; i <= 5; i++) {
          //   fakeButtons.push(`${keyword}${i}`);
          // }
          axios
          .post(`${apiUrl}/api/generate/keyword-suggest/`, { keyword: keyword })
          .then((response) => {
            // const data = response.data;
            console.log(response.data);

            setSuggestions(response.data.suggestions)

          })
          .catch((error) => {
            console.error("Backend Error:", error);
            setError(error.response.data.error);
          });
          return fakeButtons;
        })
        .flat();
      setFakeButtons(buttons);
      setSelectedResults([]);
      setShowList(false);
    }
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
      navigate("/artgen/progress", { state: { selectedResults } });
    } else {
      window.alert("Please select the keywords");
    }
  };

  const handleChange = async (e) => {
    setInputValue(e.target.value);
    setShowList(e.target.value !== "");
    const inputValue = e.target.value;

    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `${apiUrl}/api/generate/auto-suggest`,
          {
            params: {
              q: inputValue,
              client: "chrome", // or 'chrome', 'toolbar', 'youtube', etc.
            },
          }
        );
        setOption(response.data[1])
        // setSuggestions(response.data[1]);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setInputValue(item);
    setShowList(false);
  };

  const handleCloseButton = () => {
    setInputValue("");
    setShowList(false);
  };

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
            <div style={{ position: "relative", width: "30ch" }}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="キーワードを検索してください"
                value={inputValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{
                        cursor: "pointer",
                        visibility: inputValue ? "visible" : "hidden",
                      }}
                    >
                      <CloseIcon
                        onClick={handleCloseButton}
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {showList && (
                <ul
                  className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full z-10"
                  style={{ top: "100%", left: 0 }}
                >
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-1 px-3 text-gray-800 hover:bg-gray-200"
                      onClick={() => handleSelectItem(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {fakeButtons.length > 0 ? (
              <h2 className=" text-[#232E2F] mt-12 font-semibold">
                キーワード候補：
              </h2>
            ) : (
              ""
            )}
            <div className="flex mt-4 flex-wrap">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={`p-2 pl-3 pr-3 border rounded-2xl mr-3 mb-2 ${
                    selectedResults.includes(suggestion.keyword)
                      ? "bg-[#232E2F] text-white"
                      : "bg-gray-100 text-[#232E2F]"
                  } hover:bg-[#232E2F] hover:text-white`}
                  onClick={() => handleResultClick(suggestion.keyword)}
                >
                  {suggestion.keyword}
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
      <Error content={error} />
      {/* <Notification content={content} /> */}
    </div>
  );
};

export default SetKwd;
