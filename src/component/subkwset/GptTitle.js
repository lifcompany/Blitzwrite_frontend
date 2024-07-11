import React from "react";

const GptTitle = ({ label, onTitleClick }) => {
  return (
    <div 
      onClick={() => onTitleClick(label)} 
      className="text-base cursor-pointer py-2 px-3 hover:w-fit hover:bg-gray-200 active:bg-gray-300 hover:rounded-lg"
    >
      {label}
    </div>
  );
};

export default GptTitle;
