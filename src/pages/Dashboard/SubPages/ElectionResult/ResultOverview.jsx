import React from 'react';
import { BsQuestionOctagonFill } from 'react-icons/bs';
import { GiVote } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';

const ResultOverview = ({ electionData }) => {
    console.log({len: electionData})
    return (
        <div className='mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
            <div className='h-36 bg-gradient-to-l from-blue-500 to-blue-700 rounded shadow p-4 flex justify-center items-center gap-6'>

                <GiVote className='text-6xl  text-slate-50'></GiVote>
                <div className='flex flex-col justify-center items-center '>
                    <h3 className='text-2xl text-slate-50 font-bold'>Perticipation</h3>
                    <p className='text-2xl text-slate-50 font-bold'>80%</p>
                </div>

            </div>
            <div className='h-36 bg-gradient-to-l from-purple-500 to-purple-700 rounded shadow p-4 flex justify-center items-center gap-6' >
                <HiUserGroup className='text-6xl  text-slate-50'></HiUserGroup>
                <div className='flex flex-col justify-center items-center '>
                    <h3 className='text-2xl text-slate-50 font-bold'>Total Voters</h3>
                    <p className='text-2xl text-slate-50 font-bold'>134</p>
                </div>
            </div>
            <div className='h-36 bg-gradient-to-l from-green-500 to-green-700 rounded shadow p-4 flex justify-center items-center gap-6'>
                <BsQuestionOctagonFill className='text-6xl  text-slate-50'></BsQuestionOctagonFill>
                <div className='flex flex-col justify-center items-center '>
                    <h3 className='text-2xl text-slate-50 font-bold'>Ballot Questions</h3>
                    <p className='text-2xl text-slate-50 font-bold'>{electionData?.questions ? electionData?.questions.length : 0}</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default ResultOverview;