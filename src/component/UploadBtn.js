import React from 'react';
import { HiOutlineUpload } from 'react-icons/hi';

const UploadBtn = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-3 text-14px cursor-pointer hover:scale-[105%]">
            <HiOutlineUpload className="text-[#5469D4] font-bold" size={18} />
            <p className="text-[#5469D4] font-bold">アップロード</p>
        </div>
    );
};

export default UploadBtn;
