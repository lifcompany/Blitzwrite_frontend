import React, { useState } from 'react';
import axios from "axios";
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const KwInput = ({ setSuggestions }) => {
    const [inputValue, setInputValue] = useState("");
    const [fakeButtons, setFakeButtons] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [showList, setShowList] = useState(false);
    const [options, setOption] = useState([]);
    const [error, setError] = useState("");


    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSuggestKeyword = (event) => {
        event.preventDefault();
        const keywords = inputValue.split(",").filter(Boolean);
        const buttons = keywords
            .map((keyword) => {
                const fakeButtons = [];
                axios
                    .post(`${apiUrl}/api/generate/keyword-suggest/`, { keyword: keyword })
                    .then((response) => {
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


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSuggestKeyword(event);
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
                            client: "chrome",
                        },
                    }
                );
                setOption(response.data[1])
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <form className="w-full flex flex-col gap-5">
            <div id="json-example-with-tab-filter-in-dropdown-tab-preview-markup" className="bg-gray-100 p-6 dark:bg-neutral-300 dark:border-neutral-700">
                <textarea value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} className="p-6 block w-full h-[100px] border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-100" placeholder="Input keyword." />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSuggestKeyword} label="類似キーワードを算出する" common />
            </div>
        </form>
    )
}

export default KwInput;
