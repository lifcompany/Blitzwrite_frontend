import React from 'react';

const ContainerDiv = ({ children }) => {
    return (
        <div
            className="
                max-w-[calc(100% - 270px)]
                mx-auto
                mt-8
                xl:px-10
                md:px-5
                sm:px-2
                px-4
            "
        >
            {children}
        </div>
    );
};

export default ContainerDiv;
