import React, { useContext, useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line } from 'recharts';
import { AuthContext } from '../../../../Providers/AuthProvider';


const UserVotingHistory = () => {
    const { user } = useContext(AuthContext);
    const [elections, setElections] = useState([]);
    const [selectedChart, setSelectedChart] = useState('bar');

    useEffect(() => {
        fetch(`http://localhost:5000/election-by-completed/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('election-by-completed', data);
                setElections(data);
            });
    }, []);

    const renderChart = () => {
        if (selectedChart === 'bar') {
            return (
                <BarChart>
                    <XAxis dataKey='title' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='vote' fill='rgba(75, 192, 192, 0.5)' />
                </BarChart>
            );
        } else if (selectedChart === 'line') {
            return (
                <LineChart>
                    <XAxis dataKey='title' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='vote' stroke='rgba(75, 192, 192, 0.5)' />
                </LineChart>
            );
        }
        // Add more chart types as needed
    };

    return (
        <>
            <div className='bg-white p-8 mt-8 rounded shadow text-slate-700'>
                <h2 className='text-3xl font-semibold mb-4 uppercase'>User's Voting History</h2>
                <div className='mb-4'>
                    <label className='mr-2'>Select Chart Type:</label>
                    <select onChange={(e) => setSelectedChart(e.target.value)}>
                        <option value='bar'>Bar Chart</option>
                        <option value='line'>Line Chart</option>
                        {/* Add more chart types here */}
                    </select>
                </div>
                <ResponsiveContainer width='100%' height={300}>
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default UserVotingHistory;
