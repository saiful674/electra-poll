import React from 'react';
import { Link } from 'react-router-dom';
import './PageBanner.css'

const PageBanner = ({ title, pageRoute }) => {
    return (
        <div className="contact-bg lg:mt-16 mt-12">
            <div className="bg-slate-600 bg-opacity-50 text-center h-[30vh] md:h-[50vh] flex flex-col items-center justify-center p-10 md:p-24 gap-4">
                <h3 className="text-white uppercase font-bold  sm:text-2xl md:text-5xl">{title}</h3>
                <div className='flex gap-5 text-xl font-semibold text-white'>
                    <Link to='/'>Home</Link> <p>/</p> <Link className="capitalize" >{pageRoute}</Link>
                </div>
            </div>
        </div>
    );
};

export default PageBanner;