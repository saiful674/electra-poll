import React from 'react';
import getElection from '../../../../Hooks/getElection';
import { FaAngleRight } from 'react-icons/fa6';
const MarqueeTitle = () => {
    const [elections] = getElection();
    return (
               <div className='flex  '>
                        {elections.map((election) => (
                            <div className='text-sm' key={election?._id}>
                              
                                    <div className='flex items-center gap-2'>
                                        <p>
                                            The last time to vote in {election?.title} election is{' '}
                                            {election?.endDate}
                                        </p>{' '}
                                        <FaAngleRight className='mr-2' />
                                    </div>
                            </div>
                        ))}
                  
        </div>
    );
};

export default MarqueeTitle;