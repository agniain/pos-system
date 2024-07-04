import React from 'react';

const LayoutHeader = ({ children }) => {
    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover filter opacity-25"
                    src="/images/header.jpg"
                    alt="Background"
                />
            </div>
            <div className="relative z-10 flex-1">
                {children}
            </div>
        </div>
    );
};

export default LayoutHeader;
