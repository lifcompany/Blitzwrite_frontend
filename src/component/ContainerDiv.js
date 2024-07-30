import React from 'react';

const ContainerDiv = ({ children }) => {
    return (
        <div
            className="
                max-w-[calc(100% - 270px)]
                mx-auto
                mt-8
                xl:px-14
                lg:px-10
                md:px-7
                px-5
                pb-10
            "
        >
            {children}
        </div>
    );
};

export default ContainerDiv;
