import React, { useState } from 'react';
import { IoIosSave } from "react-icons/io";

const InputWindow = ({ isActive, onSave }) => {
    const [content, setContent] = useState('テキストテキストテキストテキストテキスト');

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSaveClick = () => {
        onSave(content);
    };

    return (
        <div className={`flex items-center ${isActive ? 'border-blue-500' : 'border-gray-300'}`}>
            <textarea
                value={content}
                onChange={handleContentChange}
                disabled={!isActive}
                className={`w-full h-[30px] p-1 ${isActive ? 'bg-white border-[1px]' : 'bg-gray-100'} ${isActive ? 'text-black' : 'text-black-500'}`}
            />
            {isActive && (
                <IoIosSave 
                    onClick={handleSaveClick}
                    size={25}
                    className="cursor-pointer ml-2"
                />
            )}
        </div>
    );
};

export default InputWindow;
