// Notification.js

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';


const Notifications = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user } = useContext(AuthContext);
    const navigation = useNavigate()
    const {
        data: notifications = [],
        refetch,
        isLoading,
    } = useQuery(["notifications", user], async () => {
        const res = await axios.get(`https://electra-poll-server.vercel.app/notifications/${user?.email}`);
        return res.data;
    });
    const unreadNotification = notifications.filter(notification => notification.isRead === false)


    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleReadNotification = (notification) => {
        navigation(notification.contentURL)
        axios.patch(`https://electra-poll-server.vercel.app/notifications/${notification._id}`)
            .then(res => {
                if (res.data.acknowledged) {
                    refetch()
                }
            })
    }
    const handleRemoveNotification = (id) => {

        axios.delete(`https://electra-poll-server.vercel.app/notifications/${id}`)
            .then(res => {
                if (res.data.acknowledged) {
                    refetch()
                }
            })
    }
    const convertDate = date => {
        const givenDate = new Date(date);

        // Get the current UTC date and time
        const today = new Date();

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = givenDate - today;

        // Convert milliseconds to minutes
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);// This will return the absolute difference in minutes
        return Math.abs(Math.round(differenceInMinutes));  // This will return the absolute difference in minutes
    }


    return (
        <div className="">

            <button className="btn btn-ghost btn-circle" onClick={toggleDropdown}>
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className={`badge bg-green-500 indicator-item ${unreadNotification.length === 0 ? 'hidden' : ''}`}>{unreadNotification.length}</span>
                </div>
            </button>
            {isDropdownOpen && (
                <div className="absolute md:w-96 w-[95%] h-[70vh] right-1/2 translate-x-1/2 md:translate-x-0 md:right-5 object-cover  overflow-y-auto bg-white border rounded-lg shadow-lg z-50 custom-scrollbar">
                    <div className="p-4">
                        <div className='flex pb-3 justify-between items-center'>
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <span onClick={toggleDropdown} className='cursor-pointer'><AiOutlineCloseCircle className='text-error h-5 w-5 group-hover:text-white duration-300 active:scale-125 hover:scale-125' /> </span>
                        </div>
                        <ul className='divide-y-2 space-y-2'>
                            {
                                notifications.length === 0 ? <li>You have no notifications</li>
                                    : notifications.map((notification, index) => (
                                        <li key={index} className={`${notification.isRead ? 'text-gray-500' : 'font-semibold'} p-1 hover:bg-gray-200 duration-300 flex  items-center justify-between gap-4`}>
                                            <div>
                                                <Link onClick={() => handleReadNotification(notification)}>{notification.message.slice(0, 70)}...</Link>

                                                <p className='text-gray-400'>{convertDate(notification.timestamp) <= 60 ? Math.floor(convertDate(notification.timestamp)) + ' minutes ago' : convertDate(notification.timestamp) <= 48 * 60 ? Math.floor(convertDate(notification.timestamp) / 60) + ' hours ago' : Math.floor(convertDate(notification.timestamp) / 60 / 24) + ' days ago'}</p>

                                            </div>
                                            <button className='flex items-center gap-2' onClick={() => handleRemoveNotification(notification._id)}>
                                                {!notification.isRead && <div className='h-2 w-2 rounded-full bg-green-500'></div>}
                                                <BsTrashFill className='h-4 w-4 text-error' />
                                            </button>
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
