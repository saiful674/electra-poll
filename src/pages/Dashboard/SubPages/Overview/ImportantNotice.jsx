import React from 'react';
import MarqueeTitle from './MarqueeTitle';
import { AiFillNotification } from 'react-icons/ai';

const ImportantNotice = () => {
   

    return (
        <div className='bg-red-200 mb-6 p-4 rounded shadow  overflow-x-hidden ' >
        <div className='flex items-center'>
                <div>
          <div className='flex items-center'>
          <AiFillNotification className='text-2xl text-red-600 mr-2' />
                    <h2 className='text-xl font-semibold mb-2 md:mb-0'>Important ImportantNotices or Updates</h2>
                   
          </div>


           <p className='text-md mb-2 md:mb-0'>
                        Stay informed about important security updates on our website.
                    </p>
               <div className='pt-2'>
              <MarqueeTitle></MarqueeTitle>
               </div>
                </div>
            </div>
        </div>
    );
};

export default ImportantNotice;
