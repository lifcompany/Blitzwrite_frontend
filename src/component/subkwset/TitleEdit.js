import React from "react";

const TitleEdit = ({ inputValue, setInputValue }) => {
    return (
        <>
            <p className="text-[14px] mt-4 mb-2 font-medium">今回作成する記事タイトルを入力してください</p>
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full sm:w-[650px] h-[50px] p-[12px] text-base border-2 rounded-lg" 
            />
        </>
    )
}

export default TitleEdit;
