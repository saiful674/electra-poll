import React from 'react';
import { BsPerson } from 'react-icons/bs';
const UpcomingAndRecentElection = () => {
    const upcomingElections = [
        { name: "Annual School Board Elections", date: "September 20, 2023", description: "Vote for your preferred candidates to shape the future of our school district." },
      
    ];

    const currentElections = [
        { name: "City Council Elections", status: "Voting in Progress", remainingTime: "2 days", candidates: ["Candidate A", "Candidate B", "Candidate C"] },
       
    ];
    return (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 bg-gray-100'>
                {/* Upcoming Elections */}
                <div className='flex-1 mb-6 bg-white sm:mb-4 text-slate-700 p-8 '>
                    <h2 className='text-3xl font-semibold mb-4 uppercase'>Upcoming Elections</h2>
                    {upcomingElections.map((election, index) => (
                        <div key={index} className='mb-4'>
                            <h3 className='text-xl font-semibold'>{election.name}</h3>
                            <p >{election.date}</p>
                            <p >{election.description}</p>
                        </div>
                    ))}
                </div>

                {/* Current/Recent Elections */}
                <div className='flex-1 bg-white sm:mb-4 text-slate-700 p-8 mb-4 '>
                    <h2 className='text-3xl font-semibold mb-4 uppercase'>Current or Recent Elections</h2>
                    {currentElections.map((election, index) => (
                        <div key={index} className='mb-4'>
                            <h3 className='text-xl font-semibold'>{election.name}</h3>
                            <p className=''>{election.status}</p>
                            <p className=''>{election.remainingTime}</p>
                            <div className='flex items-center'>
                                <BsPerson className='mr-1' />
                                {election.candidates.map((candidate, idx) => (
                                    <p key={idx} className='text-sm'>{candidate}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default UpcomingAndRecentElection ;