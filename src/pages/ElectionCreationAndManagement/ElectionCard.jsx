import React from 'react';
import { Link } from 'react-router-dom';

const ElectionCard = ({ election }) => {
    const { _id, title, status, startDate, endDate, organization, voteType, voterEmails } = election;

    return (
        <div className='sm:w-96 md:w-96 h-[280px] border rounded-2xl shadow-md p-8 mb-4 '>
            {
                title ? <Link to={`/election/${_id}`} className='text-xl font-semibold mb-2 block hover:underline hover:text-red-500  uppercase'>
                    {title}
                </Link> : <h3 className=' text-xl font-semibold mb-2 block hover:underline  hover:text-red-500  uppercase'>Please create your election title</h3>
            }
            <p className='text-xl text-gray-500 mb-2'>Organization: {organization}</p>
            <p className='text-xl text-gray-500'>
                Status: {status} | {voteType} Vote
            </p>
            <p className='text-xl text-gray-500'>
                Start: {startDate}
            </p>
            <p className='text-xl text-gray-500'>
                End: {endDate}
            </p>
            {voterEmails && (
                <p className='text-xl text-gray-500'>Voters: {voterEmails.length}</p>
            )}
        </div>
    );
};

export default ElectionCard;
