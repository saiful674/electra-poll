import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Overview from './ElectionPages/Overview';
import Nominees from './ElectionPages/Nominees';
import Notice from './ElectionPages/Notice';
import Security from './ElectionPages/Security';
import Confirmation from './ElectionPages/Confirmation';

const Election = () => {

    const pageNum = useSelector(state => state.pageNum.page)
    const formData = useSelector(s => s.formData)

    console.log(formData);

    return (
        <div className='py-20 my-container'>
            <div className='grid lg:grid-cols-5 grid-cols-2 border-green-400 border rounded-md py-2 px-5 lg:text-xl font-bold'>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 0 ? `text-green-400` : ''}`}>Overview <FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 1 ? `text-green-400` : ''}`}>Nominees <FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 2 ? `text-green-400` : ''}`}>Notice<FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 3 ? `text-green-400` : ''}`}>Security<FaLongArrowAltRight /></span>
                <span className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 4 ? `text-green-400` : ''}`}>Confirmation<FaLongArrowAltRight /></span>
            </div>
            <div className='mt-10 flex justify-center'>
                {pageNum === 0 && <Overview></Overview>}
                {pageNum === 1 && <Nominees></Nominees>}
                {pageNum === 2 && <Notice></Notice>}
                {pageNum === 3 && <Security></Security>}
                {pageNum === 4 && <Confirmation></Confirmation>}
            </div>
        </div>
    );
};

export default Election;