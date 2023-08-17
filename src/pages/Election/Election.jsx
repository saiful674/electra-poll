import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Overview from './ElectionPages/Overview';
import Notice from './ElectionPages/Notice';
import Confirmation from './ElectionPages/Confirmation';
import { ScrollRestoration } from 'react-router-dom';
import Ballot from './ElectionPages/Ballot/Ballot';
import Voters from './ElectionPages/Voters';

const Election = () => {

    const pageNum = useSelector(state => state.pageNum.page)
    const formData = useSelector(s => s.formData)

    console.log(formData);

    return (
        <div className='py-20 my-container'>
            <div className='grid lg:grid-cols-5 mt-5 grid-cols-2 border-green-400 border rounded-md py-2 px-5 lg:text-xl font-bold'>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 0 ? `text-green-400` : ''}`}>Overview <FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 1 ? `text-green-400` : ''}`}>Ballot<FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 2 ? `text-green-400` : ''}`}>Notice<FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 3 ? `text-green-400` : ''}`}>Security<FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 4 ? `text-green-400` : ''}`}>Confirmation<FaLongArrowAltRight /></span>
            </div>
            <div className='mt-10 flex justify-center'>
                {pageNum === 0 && <Overview></Overview>}
                {pageNum === 1 && <Ballot></Ballot>}
                {pageNum === 2 && <Notice></Notice>}
                {pageNum === 3 && <Voters></Voters>}
                {pageNum === 4 && <Confirmation></Confirmation>}
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Election;