import React from 'react';
import { HiUserGroup } from 'react-icons/hi2';
import { GiVote } from "react-icons/gi";
import { BsQuestionOctagonFill } from 'react-icons/bs';
const TotalElection = () => {
    return (
        <div className='mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
        <div className='h-40 bg-gradient-to-l from-blue-300 to-blue-500 rounded shadow p-4 flex justify-center items-center gap-6'>
            
            <GiVote className='text-6xl  text-slate-50'></GiVote>
            <div className='flex flex-col justify-center items-center '>
             <h3 className='text-3xl text-slate-50 font-bold'>Total Vote</h3>
             <p className='text-3xl text-slate-50 font-bold'>80</p>
            </div>
            
        </div>
        <div className='h-40 rounded shadow p-4 flex justify-center items-center gap-6' style={{ background: 'linear-gradient(to right, #f000b8, #f06cb8)' }}>
        <HiUserGroup className='text-6xl  text-slate-50'></HiUserGroup>
        <div className='flex flex-col justify-center items-center '>
             <h3 className='text-3xl text-slate-50 font-bold'>Total Voters</h3>
             <p className='text-3xl text-slate-50 font-bold'>20</p>
            </div>
        </div>
        <div className='h-40 bg-gradient-to-l from-green-300 to-green-500 rounded shadow p-4 flex justify-center items-center gap-6'>
        <BsQuestionOctagonFill className='text-6xl  text-slate-50'></BsQuestionOctagonFill>
        <div className='flex flex-col justify-center items-center '>
             <h3 className='text-3xl text-slate-50 font-bold'>Total Election</h3>
             <p className='text-3xl text-slate-50 font-bold'>03</p>
            </div>
        </div>
        <div></div>
      </div>
    );
};

export default TotalElection;