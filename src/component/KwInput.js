import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";
import { addKeyword, getAllKeywords, clearKeywords } from '../component/indexDB/idb';

const KwInput = ({ setSuggestions, setMainKeyword }) => {
    const [inputValue, setInputValue] = useState("");
    const [fakeButtons, setFakeButtons] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [showList, setShowList] = useState(false);
    const [options, setOption] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSuggestKeyword = (event) => {
        event.preventDefault();
        const keywords = inputValue.split(",").filter(Boolean);
        const buttons = keywords.map((keyword) => {
            const fakeButtons = [];
            axios.post(`${apiUrl}/api/generate/keyword-suggest/`, { keyword: keyword })
                .then(async (response) => {
                    console.log(response.data);

                    setSuggestions(response.data.suggestions);
                    setMainKeyword(keyword);

                    await clearKeywords();
                    // Store main keyword and suggestions in IndexedDB
                    await addKeyword({
                        mainKeyword: keyword,
                        suggestions: response.data.suggestions,
                    });

                })
                .catch((error) => {
                    console.error("Backend Error:", error);
                    setError(error.response.data.error);
                });
            return fakeButtons;
        }).flat();

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

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setInputValue(item);
        setShowList(false);
    };
    const handleCloseButton = () => {
        setInputValue("");
        setShowList(false);
    };


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowList(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchStoredKeywords = async () => {
            const allKeywords = await getAllKeywords();
            setInputValue(allKeywords[0].mainKeyword)
            setSuggestions(allKeywords[0].suggestions)
        };

        fetchStoredKeywords();

        const handleUnload = async () => {
            await clearKeywords();
        };
        window.addEventListener('unload', handleUnload);
    
        return () => {
            window.removeEventListener('unload', handleUnload);
        };

    }, []);

    return (
        <form className="w-full flex flex-col gap-5">
            <div id="relative json-example-with-tab-filter-in-dropdown-tab-preview-markup" className="bg-gray-100 p-3 dark:bg-neutral-300 dark:border-neutral-700">
                <textarea
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="p-6 block w-full h-[100px] border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-100"
                    placeholder="Input keyword." />
                {showList && (
                    <ul ref={dropdownRef} className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[50%] z-10" >
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
            <div className="flex justify-end">
                <Button onClick={handleSuggestKeyword} label="類似キーワードを算出する" common />
            </div>
        </form>
    )
}

export default KwInput;
