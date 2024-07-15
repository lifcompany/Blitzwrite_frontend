import React from 'react';
import { MdManageHistory } from "react-icons/md";


const History = () => {
    return (
        <button
            aria-expanded="false"
            aria-haspopup="menu"
            id=":r2:"
            className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
        >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <MdManageHistory className="h-5 w-5 text-blue-gray-500" />
            </span>

        </button>
    );
};

export default History;
