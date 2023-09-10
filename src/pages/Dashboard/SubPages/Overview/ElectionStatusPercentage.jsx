import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import getElection from '../../../../Hooks/getElection';

const ElectionStatusPercentage = () => {
  const [elections] = getElection();
  const [statusData, setStatusData] = useState([]);
  console.log(statusData)

  useEffect(() => {
    // Calculate the percentage of data based on "status"
    const statusCounts = {
      completed: 0,
      published: 0,
      pending: 0,
      ongoing: 0,
    };

    elections.forEach((election) => {
      statusCounts[election.status]++;
    });

    const totalElections = elections.length;

    const statusPercentage = Object.keys(statusCounts).map((status) => ({
      name: status,
      value: parseFloat(((statusCounts[status] / totalElections) * 100).toFixed(2)), // Parse as float
    }));

    setStatusData(statusPercentage);
  }, [elections]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='bg-white p-8 mt-8 rounded shadow text-slate-700'>
      <h2 className='text-3xl font-semibold mb-4 uppercase'>Election Status Percentage</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElectionStatusPercentage;
