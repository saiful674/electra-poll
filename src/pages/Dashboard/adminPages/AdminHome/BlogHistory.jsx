import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; 

const BlogHistory = ({ blogData }) => {
    if (!Array.isArray(blogData) || blogData.length === 0) {
        return <p>No blog data available.</p>;
      }
    const statusCounts = {
        primary: 0,
        popular: 0,
        recent: 0,
    };

    blogData.forEach(blog => {
        statusCounts[blog.status]++;
    });
    

    const barData = Object.entries(statusCounts).map(([status, count], index) => ({
        name: status,
        value: count,
        color: COLORS[index], 
    }));

    return (
        <div className='bg-white p-8 mt-8 rounded shadow text-slate-700 overflow-hidden'>
            <h2 className='text-3xl font-semibold mb-4 uppercase'>Blog History</h2>
            <div className='flex items-center justify-center'>
                <ResponsiveContainer width='80%' height={300}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='value' fill={COLORS[0]}>
                            {barData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BlogHistory;
