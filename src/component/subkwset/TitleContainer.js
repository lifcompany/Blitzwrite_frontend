'use client'

import React, { useState } from "react";
import GptTitle from "./GptTitle";
import TitleEdit from "./TitleEdit";

const TitleContainer = () => {
    const [chatGptTitle, setChatGptTitle] = useState([
        "1．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "2．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "3．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "4．タイトル案タイトル案タイトル案タイトル案タイトル案",
    ]);
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
    }

    return (
        <div>
            <div className="bg-[#F5F8F8] p-6 rounded-lg">
                <div className="flex flex-col gap-4">
                    {chatGptTitle.map((keyword, index) => (
                        <GptTitle
                            key={index}
                            label={keyword}
                            onTitleClick={() => handleTitleClick(index)}
                        />
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
