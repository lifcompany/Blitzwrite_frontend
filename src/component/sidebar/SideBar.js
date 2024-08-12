import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CiPen } from "react-icons/ci";
import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { VscListUnordered } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa";
import UserAvatar from "./UserAvatar";
import Credit from "./Credit";
import SideMenuBtn from "../SideMenuBtn";
import { RiMenuUnfold3Line } from "react-icons/ri";

const SideBar = () => {

    const navigate = useNavigate('');
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        if (location.pathname === '/keyword') setActiveButton('keyword');
        else if (location.pathname === '/keyword/savedkeywords') setActiveButton('savedkeywords');
        else if (location.pathname === '/keyword/article-configuration') setActiveButton('article-configuration');
        else if (location.pathname === '/keyword/article-preview') setActiveButton('article-preview');
        else if (location.pathname === '/setting-api') setActiveButton('setting-api');
        else setActiveButton('');
    }, [location.pathname]);

    const handleNavigation = (path, buttonId) => {
        navigate(path);
        setActiveButton(buttonId);
    };

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    const [premiumStatus, setPremiumStatus] = useState(null);
    const [email, setEmail] = useState("example@example.com");

    const handleUpgrade = () => {
        navigate("/setting-payment");
    }

    useEffect(() => {
        const checkPremium = () => {
            axios.post(
                `${apiUrl}/api/authentication/check-premium/`,
                {},
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then(response => {
                    setPremiumStatus(response.data.status);
                })
                .catch(error => {
                    if (error?.response?.data && error?.response?.status === 500) {
                        setPremiumStatus(error?.response?.data?.status);
                    } else {
                        setPremiumStatus('is not premium');
                    }
                });
        };
        const getUserEmail = async () => {
            await axios.get(
                `${apiUrl}/api/authentication/get-useremail/`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then(response => {
                    setEmail(response.data.email)
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        };

        getUserEmail();
        checkPremium();
    }, [apiUrl, token]);

    return (
        <aside className={`flex top-0 left-0 flex-col justify-between fixed z-10 h-full w-[300px] transition-transform duration-300 translate-x-0 sm:bg-transparent"}`}>
            <div className="hidden lg:block mt-32">
                <div className="m-4">
                    <ul className="flex flex-col mb-4">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">キーワード</p>
                        </li>
                        <li>
                            <Link to="/keyword">
                                <SideMenuBtn
                                    icon={<CiPen size={24} />}
                                    onClick={() => handleNavigation('/keyword', 'keyword')}
                                    label="キーワード生成"
                                    isActive={activeButton === 'keyword'}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/keyword/savedkeywords">
                                <SideMenuBtn icon={<AiOutlineSave size={24} />}
                                    onClick={() => handleNavigation('/keyword/savedkeywords', 'savedkeywords')}
                                    label="保存キーワード"
                                    isActive={activeButton === 'savedkeywords'}

                                />
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col mb-4">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">記事</p>
                        </li>
                        <li>
                            <Link to="/keyword/article-configuration">
                                <SideMenuBtn icon={<HiOutlineCommandLine size={24} />}
                                    onClick={() => handleNavigation('/keyword/article-configuration', 'article-configuration')}
                                    label="記事生成"
                                    isActive={activeButton === 'article-configuration'}

                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/keyword/article-preview">
                                <SideMenuBtn icon={<VscListUnordered size={24} />}
                                    onClick={() => handleNavigation('/keyword/article-preview', 'article-preview')}
                                    label="保存した記事"
                                    isActive={activeButton === 'article-preview'}

                                />
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">設定</p>
                        </li>
                        <li>
                            <Link to="/setting-api">
                                <SideMenuBtn icon={<CiSettings size={24} />}
                                    onClick={() => handleNavigation('/setting-api', 'setting-api')}
                                    label="API連携"
                                    isActive={activeButton === 'setting-api'}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="flex flex-col pl-8 gap-4 mb-6">
                    {premiumStatus === "is not premium" ? (
                        <div className="p-4 bg-white rounded-[12px] flex flex-col gap-6">
                            <p className="text-base font-bold">スタータープラン</p>
                            <Credit />
                            <button
                                onClick={handleUpgrade}
                                type="button"
                                className="w-full font-bold flex justify-center gap-1 items-center py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#628CF8] hover:bg-[#9cb6f8] active:bg-[#628CF8] focus:outline-none"
                            >
                                <p>アップグレード</p>
                                <FaCrown size={20} color="yellow" />
                            </button>
                        </div>
                    ) : (<></>)}
                    <div className="flex items-center gap-4">
                        <div className=" relative">
                            <UserAvatar />
                            {premiumStatus === "is premium" ? (
                                <div className=" absolute top-0 right-[-5px]">
                                    <FaCrown size={20} color="#ff9b00" />
                                </div>) :
                                (<></>)
                            }
                        </div>

                        <div className="flex flex-col items-center justify-between">
                            <p className="text-base">NAMENAMENAME</p>
                            <p className="text-[14px]">{email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block lg:hidden fixed top-10 left-5 ">
                <RiMenuUnfold3Line />
            </div>

        </aside>
    );
};

export default SideBar;
