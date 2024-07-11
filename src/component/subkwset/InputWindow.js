import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { IoIosSave } from "react-icons/io";

const InputWindow = ({ isActive, onSave, headcontent }) => {
    const [content, setContent] = useState(headcontent);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSave = () => {
        onSave(content);
    };

    if (isActive) {
        return (
            <div className={`flex items-center border-blue-500`}>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="w-full h-fit max-w-full py-2 px-4 bg-white border-[1px] text-black"
                />
                <IoIosSave
                    onClick={handleSave}
                    size={25}
                    className="cursor-pointer ml-2"
                />
            </div>
        );
    } else {
        return (
            <div className="flex items-center max-w-full py-2 px-4 border-gray-300 bg-gray-100 text-black-500">
                <p>
                    {content}
                </p>
            </div>
        );
    }
};

export default InputWindow;


