// Notification.js

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';



const Notifications = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user } = useContext(AuthContext);
    const {
        data: notifications = [],
        refetch,
        isLoading,
    } = useQuery(["notifications", user], async () => {
        const res = await axios.get(`http://localhost:5000/notifications/${user?.email}`);
        return res.data;
    });
    console.log(notifications)

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative inline-block">

            <button className="btn btn-ghost btn-circle" onClick={toggleDropdown}>
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 h-96 overflow-y-auto bg-white border rounded shadow-lg z-50 custom-scrollbar">
                    <div className="p-2">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <ul className='divide-y-2'>
                            {
                                notifications.length === 0 ? <li>You have no notifications</li>
                                    : notifications.map((notification, index) => (
                                        <li key={index} className="p-1 hover:bg-gray-200 duration-300">
                                            <Link to={notification.contentURL}>{notification.message}</Link>
                                        </li>
                                    ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;
