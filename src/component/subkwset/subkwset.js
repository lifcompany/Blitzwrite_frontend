import React from 'react';

const SubKwSetting = ({ label }) => {
    return (
        <div className="flex flex-row gap-1">
            <input type="checkbox" />
            <p className="text-base w-120px">{label}</p>
        </div>
    );
};

export default SubKwSetting;