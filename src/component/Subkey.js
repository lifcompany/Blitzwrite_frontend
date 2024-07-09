import React from 'react';

const SubKey = ({ label, onClick, active }) => {
    return (
        <button
            onClick={onClick}
            className={`
                py-2 
                px-4 
                rounded-lg
                bg-blue-100
                text-gray-900
                ${active ? "bg-black/30" : ""}
            `}
        >
            {label}
        </button>
    );
};

export default SubKey;
