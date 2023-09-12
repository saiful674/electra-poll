import React, { useContext, useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
  } from 'recharts';
  
import { AuthContext } from '../../../../Providers/AuthProvider';


const UserVotingHistory = () => {
    const { user } = useContext(AuthContext);
    const [elections, setElections] = useState([]);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_URL}/election-by-completed/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter((election) =>
            election.voterEmails.some((voter) => voter.voted)
          );
          setElections(filteredData);
        });
    }, []);
    return (
        <>
            <div className='bg-white p-8 mt-8 rounded shadow text-slate-700'>
                <h2 className='text-3xl font-semibold mb-4 uppercase'>User's Voting History</h2>
                <ResponsiveContainer width="100%" height={400}>
        <BarChart data={elections}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="voterEmails.length" fill="#8884d8" name="Votes Received" />
        </BarChart>
      </ResponsiveContainer>
            </div>
        </>
    );
};

export default UserVotingHistory;
