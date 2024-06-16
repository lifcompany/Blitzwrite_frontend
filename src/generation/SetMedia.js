import React, { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "../component/header";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SetMedia = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [keyword, setKeyword] = useState("");

  const handleChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setShowClearIcon(newKeyword === "" ? "none" : "flex");
    console.log(newKeyword); 
    console.log(keyword); 
  };

  const handleClick = () => {
    console.log("clicked the clear icon...");
    setKeyword(""); 
    setShowClearIcon("none"); 
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleKeyDown = async (event) => {
    const inputkeyword = {
     keyword: event.target.value,
    };
    console.log("1111", keyword);
    if (event.key === "Enter") {
      event.preventDefault();
      // try {
      //   const response = await fetch(`${apiUrl}/api/generate/set_keyword/`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ inputkeyword }),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      //   const data = await response.json();
      //   console.log("Success:", data);
      // } catch (error) {
      //   console.error("Error:", error);
      // }


      axios
      .post(`${apiUrl}/api/generate/set_keyword/`,  inputkeyword)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>

        <div id="app" className="px-4 py-2 font text-[calc(2vmin)] text-[#014361] p-3 rounded-md mt-10 mb-8">
          <FormControl sx={{ width: "30ch" }}>
            <TextField
              // size="small"
              variant="outlined"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
                    placeholder="支払い情報がありません" 
                    onClick={handleClick}
                  >
                    <CloseIcon style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SetMedia;
