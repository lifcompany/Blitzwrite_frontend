import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa"
import InputWindow from "./InputWindow";

const Config = () => {

    const [isActive, setIsActive] = useState(false);
    const handleActivate = () => {
        setIsActive(true);
    };
    const handleSave = (content) => {
        console.log('Saving content:', content);
        setIsActive(false);
        // Here you would typically send the content to your backend
    };
    return (
        <tr className="cursor-pointer">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                <form className="max-w-sm mx-auto">
                    <select id="countries" className="bg-gray-50 text-gray-900 text-sm block w-[50px] cursor-pointer">
                        <option selected>h1</option>
                        <option value="US">h2</option>
                        <option value="CA">h3</option>
                        <option value="FR">h4</option>
                        <option value="DE">h5</option>
                        <option value="DE">h6</option>
                    </select>
                </form>
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                <InputWindow
                    isActive={isActive}
                    onSave={handleSave}
                />
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                <FaPencilAlt onClick={handleActivate} className="cursor-pointer" />
            </td>
        </tr>
    )
}

export default Config;