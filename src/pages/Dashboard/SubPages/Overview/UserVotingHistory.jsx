import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserVotingHistory = () => {
    // Placeholder data for user's voting history
    const userVotingHistory = [
        { election: 'Election 1', vote: 10 },
        { election: 'Election 2', vote: 5 },
        { election: 'Election 3', vote: 12 },
    ];
    
    return (
        <>
           
           <div className='bg-white p-8 mt-8 rounded shadow'>
                <h2 className='text-3xl font-semibold mb-4 uppercase'>User's Voting History</h2>
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={userVotingHistory}>
                        <XAxis dataKey='election' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='vote' fill='rgba(75, 192, 192, 0.5)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default UserVotingHistory;

