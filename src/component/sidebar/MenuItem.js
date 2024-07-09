import React from 'react';

const MenuItem = ({ onClick, label }) => {
    return (
        <div
            onClick={onClick}
            className="
                px-4
                py-2
                hover:bg-black/10
                transition
                font-semibold
            "
        >
            {label}
        </div>
    );
};

export default MenuItem;
