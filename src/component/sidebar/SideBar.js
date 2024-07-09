import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import SideBtn from '../SideBtn';
import LogImage from '../../assets/symbol.png';


const SideBar = () => {
    return (
        <aside className="bg-[#F7FAFC] -translate-x-80 fixed inset-0 z-50 h-full w-[270px] transition-transform duration-300 xl:translate-x-0">
            <div className="relative h-20 flex justify-center items-center pt-16 pb-5">
                <Link to="/home" className="text-2xl mb-5 font-bold">
                    <img src={LogImage} className="h-12" alt="Logo" />
                </Link>

            </div>
            <div className="m-4">
                <ul className="flex flex-col mb-4">
                    <li className="mx-3.5 mb-4">
                        <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">キーワード</p>
                    </li>
                    <li>
                        <Link to="/keyword">
                            <SideBtn label="キーワード生成" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/keyword/savedkeywords">
                            <SideBtn label="保存キーワード" />
                        </Link>
                    </li>
                </ul>
                <ul className="flex flex-col mb-4">
                    <li className="mx-3.5 mb-4">
                        <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">記事</p>
                    </li>
                    <li>
                        <Link to="/keyword/title-generation">
                            <SideBtn label="記事生成" />
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <SideBtn label="保存した記事" />
                        </a>
                    </li>
                </ul>
                <ul className="flex flex-col">
                    <li className="mx-3.5 mb-4">
                        <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">設定</p>
                    </li>
                    <li>
                        <a href="#">
                            <SideBtn label="API連携" />
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;
