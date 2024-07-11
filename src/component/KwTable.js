import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KwTable = ({ suggestions }) => {
    const [keywordData, setKeywordData] = useState(suggestions || []);
    const [sortOrder, setSortOrder] = useState({ keyword: 'asc', volume: 'asc' });

    useEffect(() => {
        setKeywordData(suggestions || []);
    }, [suggestions]);

    const navigate = useNavigate('');
    const handlePreview = (index) => {
        console.log("Clicked Preview Button for index:", index);
        navigate("/keyword/article-preview")
    };


    const sortData = (field) => {
        const sortedData = [...keywordData];
        const order = sortOrder[field] === 'asc' ? 'desc' : 'asc';

        sortedData.sort((a, b) => {
            if (field === 'keyword') {
                return order === 'asc'
                    ? a.keyword.localeCompare(b.keyword)
                    : b.keyword.localeCompare(a.keyword);
            } else if (field === 'volume') {
                return order === 'asc'
                    ? a.avg_monthly_searches - b.avg_monthly_searches
                    : b.avg_monthly_searches - a.avg_monthly_searches;
            }
            return 0;
        });

        setKeywordData(sortedData);
        setSortOrder({ ...sortOrder, [field]: order });
    };


    return (
        <form className="w-full flex flex-col gap-5">
            <div className="overflow-x-auto rounded-xl">
                {keywordData.length === 0 ? (
                    <div className=" bg-white rounded-xl p-10 text-xl text-center text-gray-500">推奨されるキーワードデータはない。</div>
                ) : (
                    <table className="min-w-full">
                        <thead className="bg-white text-left p-2">
                            <tr>
                                <th className="whitespace-nowrap px-8 py-3 font-bold text-gray-900 text-xs text-left w-[4%]">
                                    <input type="checkbox" id="selectAll" className="size-4 rounded border-gray-300" />
                                </th>
                                {/* <th className="whitespace-nowrap px-8 py-3 w-[40%] font-bold text-gray-900 text-xs text-left">Keyword</th> */}
                                <th className="whitespace-nowrap px-8 py-3 w-[40%] font-bold text-gray-900 text-lg text-left cursor-pointer"
                                    onClick={() => sortData('keyword')}
                                >
                                    Keyword
                                </th>
                                <th
                                    className="whitespace-nowrap px-8 py-3 w-[16%] font-bold text-gray-900 text-lg text-left cursor-pointer"
                                    onClick={() => sortData('volume')}
                                >
                                    Volume
                                </th>
                                <th className="whitespace-nowrap px-8 py-3 w-[40%] font-bold text-gray-900 text-lg text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-gray-100">
                            {keywordData.map((keyword, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[14px]">
                                        <input type="checkbox" id={`checkbox-${index}`} className="size-4 rounded border-gray-300" />
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[16px]">{keyword.keyword}</td>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[16px]">{keyword.avg_monthly_searches}</td>
                                    <td className="px-8 py-1">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </form>
    );
};

export default KwTable;
