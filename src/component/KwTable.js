import React, { useEffect, useState } from 'react';

const KwTable = ({ suggestions, setSelectedKeywords }) => {
    const [keywordData, setKeywordData] = useState(suggestions || []);
    const [sortOrder, setSortOrder] = useState({ keyword: 'asc', volume: 'asc' });
    const [selectedResults, setSelectedResults] = useState([]);

    useEffect(() => {
        setKeywordData(suggestions || []);
        setSelectedResults([]);
    }, [suggestions]);

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    const handleCheckboxChange = (keywordSet) => {
        setSelectedResults((prevSelectedResults) => {
            const isSelected = prevSelectedResults.some(item => item.keyword === keywordSet.keyword);
            let updatedSelectedResults;

            if (isSelected) {
                updatedSelectedResults = prevSelectedResults.filter(item => item.keyword !== keywordSet.keyword);
            } else {
                updatedSelectedResults = [...prevSelectedResults, keywordSet];
            }

            setSelectedKeywords(updatedSelectedResults);
            return updatedSelectedResults;
        });
    };

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            setSelectedResults(keywordData);
            setSelectedKeywords(keywordData);
        } else {
            setSelectedResults([]);
            setSelectedKeywords([]);
        }
    };

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleFormSubmit}>
            <div className="overflow-x-auto rounded-xl">
                {keywordData.length === 0 ? (
                    <div className=" bg-white rounded-xl p-10 text-xl text-center text-gray-500">推奨されるキーワードデータはない。</div>
                ) : (
                    <table className="min-w-full">
                        <thead className="bg-white text-left p-2">
                            <tr>
                                <th className="whitespace-nowrap px-8 py-3 font-bold text-gray-900 text-xs text-left w-[4%]">
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        className="size-4 rounded border-gray-300"
                                        onChange={handleSelectAllChange}
                                        checked={selectedResults.length === keywordData.length}
                                    />
                                </th>
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
                            {keywordData.map((keywordSet, index) => (
                                <tr key={index} onClick={() => handleCheckboxChange(keywordSet)}>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[14px]">
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            className="size-4 rounded border-gray-300"
                                            checked={selectedResults.some(item => item.keyword === keywordSet.keyword)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleCheckboxChange(keywordSet);
                                            }}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[16px]">{keywordSet.keyword}</td>
                                    <td className="whitespace-nowrap px-8 py-1 font-medium text-gray-900 text-[16px]">{keywordSet.avg_monthly_searches}</td>
                                    <td className="px-8 py-1">
                                        {selectedResults.some(item => item.keyword === keywordSet.keyword) ? (
                                            <button className="h-fit px-[24px] py-[8px] leading-[14px] rounded-full bg-white bg-[#3BAAE2]/0 hover:bg-[#3BAAE2]/10 active:bg-[#3BAAE2]/20 border-[1px] border-[#3BAAE2] text-[#3DAAE2] font-bold text-[14px]">
                                                選択済
                                            </button>
                                        ) : (
                                            <button className="h-fit leading-[14px] bg-white text-center text-gray-900 hover:bg-[#5469D4]/80 active:bg-[#5469D4] hover:text-white border-[1px] border-gray-400 rounded-full px-[24px] py-[8px] font-bold text-[14px]">
                                                未選択
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
