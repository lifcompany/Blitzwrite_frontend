import React from 'react';
import Button from './Button';

const KwTable = () => {
    const keyword_data = [{
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
    }]
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-xs text-left w-[4%]">
                            <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
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
                                <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">{keyword.name}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-[14px]">{keyword.volume}</td>
                            {keyword.status ===true? (<td className="py-2">
                                <Button roundBtn label="生成済" stylecss={"rounded-full"}/>
                            </td>):(<td className="py-2">
                                <Button  outline label="未生成" stylecss={"rounded-full px-[24px] py-[8px] font-bold text-[14px]"} />
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default KwTable;
