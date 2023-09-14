import React from 'react';
import getElection from '../../../../Hooks/getElection';
import { FaAngleRight } from 'react-icons/fa6';
import Marquee from 'react-fast-marquee';
import moment from 'moment'; 
const MarqueeTitle = () => {
    const [elections] = getElection();
    return (
 
        <Marquee pauseOnHover>
                 <div className='flex  '>
                        {elections.map((election) => (
                            <div className='text-sm' key={election?._id}>
                              
                                    <div className='flex items-center gap-2'>
                                        <p>
                                            The last time to vote in "{election?.title}" election is{' '}
                                            {moment(election?.endDate).format('MMMM Do YYYY, h:mm a')}
                                        </p>{' '}
                                        <FaAngleRight className='mr-2' />
                                    </div>
                            </div>
                        ))}
                  
        </div>
      </Marquee>

    );
};

export default MarqueeTitle;