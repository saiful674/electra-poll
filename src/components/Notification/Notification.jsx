// Notification.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Listen for new vlog notifications
        socket.on('newVlogNotification', (data) => {
            setNotifications([...notifications, data]);
        });

        // Listen for election times set notifications
        socket.on('electionTimesSetNotification', (data) => {
            setNotifications([...notifications, data]);
        });

        // Listen for vote cast notifications
        socket.on('voteCastNotification', (data) => {
            setNotifications([...notifications, data]);
        });

        // Clean up listeners when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [notifications]);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={toggleDropdown}
                className="relative focus:outline-none"
            >
                {/* Notification icon (you can use your own icon here) */}
                <i className="fas fa-bell text-xl"></i>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg">
                    <div className="p-2">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <ul>
                            {notifications.map((notification, index) => (
                                <li key={index} className="py-1">
                                    {notification.message}
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
