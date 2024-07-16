import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CiPen } from "react-icons/ci";
import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { VscListUnordered } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa";
import Avatar from "./Avatar";
import Progress from "./Progress";
import SideBtn from "../SideBtn";
import LogoImage from '../../assets/symbol.png';



const SideBar = () => {

    const navigate = useNavigate('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    const [premiumStatus, setPremiumStatus] = useState(null);
    const [email, setEmail] = useState("example@example.com");

    const handlekwgenerate = () => {
        navigate("/kwgenerate");
    };

    const handlesavedkw = () => {
        navigate("/savedkw");
    };

    const handlearticleconfig = () => {
        navigate("/keyword/article-configuration");
    };
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
        <aside className={`flex top-0 left-0 flex-col justify-between fixed z-50 h-full w-[300px] transition-transform duration-300 translate-x-0 sm:bg-transparent"}`}>
            <div className="hidden xl:block">
                <div className="relative h-20 flex justify-center items-center pt-16 pb-5">
                    <Link to="/home" className="text-2xl mb-5 font-bold">
                        <img src={LogoImage} className="h-12" alt="Logo" />
                    </Link>

                </div>
                <div className="m-4">
                    <ul className="flex flex-col mb-4">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">キーワード</p>
                        </li>
                        <li>
                            <Link to="/keyword">
                                <SideBtn icon={<CiPen size={24} />} onClick={handlekwgenerate} label="キーワード生成" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/keyword/savedkeywords">
                                <SideBtn icon={<AiOutlineSave size={24} />} onClick={handlesavedkw} label="保存キーワード" />
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col mb-4">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">記事</p>
                        </li>
                        <li>
                            <Link to="/keyword/article-configuration">
                                <SideBtn icon={<HiOutlineCommandLine size={24} />} onClick={handlearticleconfig} label="記事生成" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/keyword/article-preview">
                                <SideBtn icon={<VscListUnordered size={24} />} onClick={() => { }} label="保存した記事" />
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col">
                        <li className="mx-3.5 mb-4">
                            <p className="block antialiased font-sans text-[16px] leading-normal text-[#1A1F36] font-black uppercase opacity-75">設定</p>
                        </li>
                        <li>
                            <a href="#">
                                <SideBtn icon={<CiSettings size={24} />} onClick={() => { }} label="API連携" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="hidden xl:block">
                <div className="flex flex-col pl-8 gap-4 mb-6">
                    {premiumStatus === "is not premium" ? (
                        <div className="p-4 bg-white rounded-[12px] flex flex-col gap-6">
                            <p className="text-base font-bold">スタータープラン</p>
                            <Progress />
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
                            <Avatar />
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

        </aside>
    );
};

export default SideBar;
