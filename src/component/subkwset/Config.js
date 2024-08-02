import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import InputWindow from "./InputWindow";
import SelectTag from "./SelectTag";

const Config = ({ dragHandleProps, content }) => {
    const [isActive, setIsActive] = useState(false);

    const handleActivate = () => {
        setIsActive(true);
    };

    const handleSave = (content) => {
        console.log('Saving content:', content);
        setIsActive(false);
    };

    return (
        <tr className="cursor-pointer" {...dragHandleProps}>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                <SelectTag />
            </td>
            <td className="w-full px-4 py-2 font-medium text-gray-900 text-[14px]">
                <InputWindow
                    isActive={isActive}
                    onSave={handleSave}
                    headcontent = {content}
                />
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                <FaPencilAlt onClick={handleActivate} className="cursor-pointer" />
            </td>
        </tr>
    );
}

export default Config;
