import React from 'react';

const ButtonPrimary = ({ children }) => {
    return (
        <div className="rounded relative inline-flex group items-center justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-500 to-green-400 border-green-600 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-hover:w-full group-hover:h-11 opacity-10"></span>
            <span className="relative font-bold">{children}</span>
        </div>

    );
};

export default ButtonPrimary;