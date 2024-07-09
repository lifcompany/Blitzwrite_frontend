import React from 'react';
import { useNavigate } from 'react-router-dom';

const KwTable = () => {
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
 const navigate =useNavigate('');
    const handlePreview = (index) => {
        console.log("Clicked Preview Button for index:", index);
        navigate("/keyword/article-preview")
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-xs text-left w-[4%]">
                            <input type="checkbox" id="selectAll" className="size-5 rounded border-gray-300" />
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 w-[40%] font-bold text-gray-900 text-xs text-left">キーワード</th>
                        <th className="whitespace-nowrap px-4 py-2 w-[16%] font-bold text-gray-900 text-xs text-left">ボリューム</th>
                        <th className="whitespace-nowrap px-4 py-2 w-[40%] font-bold text-gray-900 text-xs text-left">ステータス</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {keyword_data.map((keyword, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">
                                <input type="checkbox" id={`checkbox-${index}`} className="size-5 rounded border-gray-300" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">{keyword.name}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">{keyword.volume}</td>
                            <td className="py-2">
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
        </div>
    );
};

export default KwTable;
