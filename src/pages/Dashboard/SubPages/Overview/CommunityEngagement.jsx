import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CommunityEngagement = () => {
    const ongoingElectionData = [
        {
            name: 'Election A',
            voterTurnout: 63, // Percentage
        },
        {
            name: 'Election B',
            voterTurnout: 48, // Percentage
        },
        {
            name: 'Election C',
            voterTurnout: 68, // Percentage
        },
        // Add more election data objects...
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Custom colors for pie chart

    return (
        <div className='bg-white p-8 mt-8 rounded shadow text-slate-700'>
            <h2 className='text-3xl font-semibold mb-4 uppercase'>Community Engagement</h2>
            <div className='flex items-center justify-center'>
                <ResponsiveContainer width='80%' height={300}>
                    <PieChart>
                        <Pie
                            data={ongoingElectionData}
                            dataKey='voterTurnout' // Specify the key used for the value
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius={100}
                            fill='#8884d8'
                        >
                            {ongoingElectionData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className='flex justify-center mt-4'>
                {ongoingElectionData.map((entry, index) => (
                    <div key={index} className='text-center mx-4'>
                        <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className='w-4 h-4 mx-auto rounded-full'></div>
                        <p className='mt-1'>{entry.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityEngagement;
