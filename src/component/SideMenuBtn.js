import React from "react";

const SideMenuBtn = ({ label, onClick, icon, isActive }) => {
    return (
        <button onClick={onClick}
            className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg w-[260px] flex items-center gap-4 px-2 ml-4 capitalize
            ${isActive ? 'bg-white' : 'hover:bg-white active:bg-white'}`}
            type="button">
            {icon}
            <p className={`block antialiased font-sans text-[#1A1F36] text-[14px] leading-relaxed text-inherit capitalize
                ${isActive ? 'font-bold' : 'font-medium hover:font-bold'}`}>
                {label}
            </p>
        </button>
    );
};

export default SideMenuBtn;
