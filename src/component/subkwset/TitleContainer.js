'use client'

import React, { useEffect, useState } from "react";
import GptTitle from "./GptTitle";
import TitleEdit from "./TitleEdit";

const TitleContainer = ({ suggestkeyword, titles, setTitle }) => {
    const [chatGptTitle, setChatGptTitle] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleTitleClick = (index) => {
        setEditingIndex(index);
        setInputValue(chatGptTitle[index]);
    }

    const handleInputChange = (value) => {
        setInputValue(value);
        setChatGptTitle((prevTitles) => {
            const newTitles = [...prevTitles];
            newTitles[editingIndex] = value;
            return newTitles;
        });
        setTitle(value)
    }

    useEffect(() => {
        setChatGptTitle(titles || []);
    }, [titles]);
    return (
        <div>
            <div className="bg-[#F5F8F8] p-6 rounded-lg">
                <div className="flex flex-col gap-4">
                    {chatGptTitle.map((keyword, index) => (
                        <div className="flex items-center">
                            <div className="min-w-[15%]">{suggestkeyword[index]}</div>
                            <GptTitle
                                key={index}
                                label={keyword}
                                onTitleClick={() => handleTitleClick(index)}
                            />
                        </div>

                    ))}
                </div>
            </div>
            {editingIndex !== null && (
                <TitleEdit inputValue={inputValue} setInputValue={handleInputChange} />
            )}
        </div>
    )
}

export default TitleContainer;
