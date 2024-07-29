import React from 'react';

const ContainerDiv = ({ children }) => {
    return (
        <div
            className="
                max-w-[calc(100% - 270px)]
                mx-auto
                mt-8
                lg:px-10
                md:px-5
                px-4
            "
        >
            {children}
        </div>
    );
};

export default ContainerDiv;
