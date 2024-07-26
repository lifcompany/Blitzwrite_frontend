import React, { useCallback, useState } from 'react';
import Button from './Button';
import { IoFilter } from 'react-icons/io5';
import { FaEllipsisVertical } from 'react-icons/fa6';
import Filter from './modals/Filter';

const SavedKw = () => {
    const [filterShow, setFilterShow] = useState(false);
    const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
    const [statusFilter, setStatusFilter] = useState(null);

    const keyword_data = [
        {
            "name": "Name1",
            "volume": 12314,
            "status": true,
        },
        {
            "name": "Family",
            "volume": 12314,
            "status": true,
        },
        {
            "name": "Friend",
            "volume": 12314,
            "status": false,
        },
        {
            "name": "New car",
            "volume": 12314,
            "status": false,
        },
        {
            "name": "Luxury",
            "volume": 12314,
            "status": false,
        },
        {
            "name": "E-power",
            "volume": 12314,
            "status": false,
        }
    ];

    const toggleShow = useCallback(() => {
        setFilterShow((filterShow) => !filterShow);
    }, []);

    const toggleStatusDropdown = () => {
        setStatusDropdownVisible(!statusDropdownVisible);
    }
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setStatusDropdownVisible(false);
    }

    // const filteredKeywords = keyword_data.filter(keyword => {
    //     if (statusFilter) {
    //         return keyword.status === statusFilter && keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    //     }
    //     return keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    // });

    return (
        <>
            {filterShow && <Filter onShow={filterShow} />}
            <div className="overflow-x-auto relative rounded-xl">
                <table className="min-w-full">
                    <thead className="bg-white text-left p-2">
                        <tr>
                            <th className="px-8 py-3 font-bold text-gray-900 text-xs text-left w-[4%]">
                                <input type="checkbox" id="SelectAll" className=" align-middle size-4 rounded border-gray-300" />
                            </th>
                            <th className="whitespace-nowrap px-8 py-2">
                                <div className="flex flex-row gap-3">
                                    <p className="font-bold text-gray-900 text-xs">キーワード</p>
                                    <IoFilter onClick={toggleShow} className="cursor-pointer" />

                                </div>
                            </th>
                            <th className="whitespace-nowrap px-8 py-2">
                                <div className="flex flex-row gap-3">
                                    <p className="font-bold text-gray-900 text-xs">ボリューム</p>
                                    <IoFilter />
                                </div>
                            </th>
                            <th className="whitespace-nowrap px-8 py-2 text-left">
                                <div className="relative flex flex-row gap-3">
                                    <p className="font-bold text-gray-900 text-xs">記事生成ステータス</p>
                                    <IoFilter onClick={toggleStatusDropdown} className="cursor-pointer" />
                                    {statusDropdownVisible && (
                                        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg">
                                            <p onClick={() => handleStatusFilter('Created')} className="px-6 py-1 cursor-pointer text-gray-900 hover:bg-gray-200">生成済</p>
                                            <p onClick={() => handleStatusFilter('NotStarted')} className="px-6 py-1 cursor-pointer text-gray-900 hover:bg-gray-200">未作成</p>
                                            <p onClick={() => handleStatusFilter(null)} className="px-6 py-1 cursor-pointer hover:bg-gray-200">全て</p>
                                        </div>
                                    )}
                                </div>
                            </th>
                            <th className="whitespace-nowrap py-2 font-bold text-gray-900 text-xs text-left"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-gray-100">
                        {keyword_data.map((keyword, index) => {
                            return (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-8 py-2 font-medium text-gray-900 text-[14px]">
                                        <input type="checkbox" id="SelectAll" className="align-middle size-4 rounded border-gray-300" />
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-2 font-medium text-gray-900 text-[14px]">{keyword.name}</td>
                                    <td className="whitespace-nowrap px-8 py-2 font-medium text-gray-900 text-[14px]">{keyword.volume}</td>
                                    <td className="whitespace-nowrap px-8 py-2">
                                        {keyword.status ? (
                                            <button
                                                // onClick={() => handlePreview(index)}
                                                className="h-fit px-[24px] py-[8px] leading-[14px] rounded-full bg-white bg-[#3BAAE2]/0 hover:bg-[#3BAAE2]/10 active:bg-[#3BAAE2]/20 border-[1px] border-[#3BAAE2] text-[#3DAAE2] font-bold text-[14px]"
                                            >
                                                生成済
                                            </button>
                                        ) : (
                                            <button
                                                // onClick={() => handlePreview(index)}
                                                className="h-fit leading-[14px] bg-white text-center text-gray-900 hover:bg-[#5469D4]/80 active:bg-[#5469D4] hover:text-white border-[1px] border-gray-400 rounded-full px-[24px] py-[8px] font-bold text-[14px]"
                                            >
                                                未生成
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-2 ml-8">
                                        <div className="flex justify-around items-center">
                                            <Button common label="記事生成" />
                                            <FaEllipsisVertical size={20} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SavedKw;
