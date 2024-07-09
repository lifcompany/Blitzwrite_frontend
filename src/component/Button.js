import { style } from '@mui/system';
import React from 'react';

const Button = ({ label, common, roundBtn, outline, signInOutBtn, stylecss }) => {
    return (
        <button
            className={`
                    py-[12px]
                    px-[18px]
                    text-[14px]
                    leading-[14px]
                    h-fit
                    font-bold
                    ${stylecss ? stylecss : 'rounded-md'}
                    ${common ? 'text-white' : ''}
                    ${outline ? '  bg-white text-center text-gray-900 hover:bg-[#5469D4]/80 active:bg-[#5469D4] hover:text-white border-[1px] border-gray-400' : 'bg-[#28315f] max-w-fit'}
                    ${signInOutBtn ? 'hover:bg-[#5469D4]/60 active:bg-[#5469D4]/80 bg-[#5469D4] text-center' : 'bg-[#5469D4] max-w-fit'}
                    ${roundBtn ? 'bg-white bg-[#3BAAE2]/0 hover:bg-[#3BAAE2]/10 active:bg-[#3BAAE2]/20 border-[1px] border-[#3BAAE2] px-[24px] py-[8px] text-[#3DAAE2] font-bold text-[14px]' : 'bg-[#5469D4] hover:bg-[#5469D4]/80 active:bg-[#5469D4]/50'}
                `}
        >
            {label}
        </button>
    );
};

export default Button;
