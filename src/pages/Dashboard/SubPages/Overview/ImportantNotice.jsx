import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const ImportantNotice = () => {
   

    return (
        <div className='bg-red-200 mb-6 p-4 rounded shadow ' >
        <div className='flex items-center'>
                <div>
          <div className='flex items-center'>
          <AiOutlineExclamationCircle className='text-2xl text-red-600 mr-2' />
                    <h2 className='text-lg font-semibold mb-2 md:mb-0'>Important ImportantNotices or Updates</h2>
                   
          </div>


           <p className='text-sm mb-2 md:mb-0'>
                        Stay informed about important security updates on our website.
                    </p>
               <div>
              
               </div>
                </div>
            </div>
        </div>
    );
};

export default ImportantNotice;
