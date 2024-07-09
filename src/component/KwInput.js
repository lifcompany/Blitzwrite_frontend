import React from 'react';
import Button from './Button';

const KwInput = () => {
    return (
        <form className="w-full flex flex-col gap-5">
            <div id="json-example-with-tab-filter-in-dropdown-tab-preview-markup" className="bg-gray-100 p-6 dark:bg-neutral-300 dark:border-neutral-700">
                <div className="relative flex items-center justify-between">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                        <svg className="flex-shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                    <input className="py-3 ps-10 pe-4 block w-4/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-100" type="text" placeholder="Input keyword." />
                </div>
                {/* <div className="flex flex-wrap gap-3">
                    {subKeywords.map((keyword, index) => (
                        <SubKey
                            key={index}
                            onClick={() => toggleActive(index)}
                            active={selectedIndices.includes(index)}
                            label={keyword}
                        />
                    ))}
                </div> */}
            </div>
            <div className="flex justify-end">
                <Button label="類似キーワードを算出する" common />
            </div>
        </form>
    )
}

export default KwInput;
