import React, { useState } from "react";

const FinalSet = ({ keyword, subkeyword, title, setCategory }) => {
    const [category, setCategoryState] = useState("");

    const handleSetCategory = (e) => {
        const value = e.target.value;
        setCategoryState(value);
        setCategory(value);
    }

    return (
        <div className="bg-[#F5F8F8] p-4 flex flex-col gap-5 sm:w-[382px] w-full rounded-lg">
            <div className="flex flex-col gap-3 w-full">
                <p className="text-[14px]">キーワード</p>
                <div className="w-full bg-white sm:w-[350px] min-h-[50px] p-[12px] text-base border-2 rounded-lg">
                    {keyword}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-[14px]">サブキーワード</p>
                <div className="w-full bg-white sm:w-[350px] min-h-[50px] p-[12px] text-base border-2 rounded-lg">
                    {subkeyword}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-[14px]">記事タイトル</p>
                <div className="w-full bg-white sm:w-[350px] min-h-[50px] p-[12px] text-base border-2 rounded-lg">
                    {title}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-[14px]">カテゴリ</p>
                <input
                    value={category}
                    onChange={handleSetCategory}
                    type="text"
                    className="w-full sm:w-[350px] h-[50px] p-[12px] text-base border-2 rounded-lg"
                    placeholder="カテゴリーを入力してください"
                />
            </div>
        </div>
    )
}

export default FinalSet;