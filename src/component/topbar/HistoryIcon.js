import React from 'react';
import { MdManageHistory } from "react-icons/md";


const HistoryIcon = () => {
    return (
        <button
            aria-expanded="false"
            aria-haspopup="menu"
            id=":r2:"
            className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
        >
            <MdManageHistory className="h-5 w-5 text-blue-gray-500" />
        </button>
    );
};

export default HistoryIcon;
