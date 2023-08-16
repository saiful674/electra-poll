import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const ImportantNotice = () => {
    return (
        <div className='bg-red-200 mb-6 p-4 rounded shadow'>
            <div className='flex items-center'>
                <AiOutlineExclamationCircle className='text-xl text-red-600 mr-2' />
                <div>
                    <h2 className='text-lg font-semibold'>Important ImportantNotices or Updates</h2>
                    <p className='text-sm'>Due to technical issues, voting for the Annual Sports Club Elections has been extended by 24 hours.</p>
                </div>
            </div>
        </div>
    );
};

export default ImportantNotice;
