import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import ButtonPrimary from '../../../../components/ButtonPrimary/ButtonPrimary';
const Sating = () => {
    const { user, PasswordUpdate } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = () => {
        if (newPassword.length < 6 || newPassword.length > 20) {
            setError('Password must be between 6 and 20 characters long.');
            setSuccessMessage('');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match.");
            setSuccessMessage('');
            return;
        }
        PasswordUpdate(user, newPassword)
            .then(() => {
                setNewPassword('');
                setConfirmPassword('');
                setSuccessMessage('Password changed successfully.');
                setError(null);
            }).catch((error) => {
                setError(error.message);
                setSuccessMessage('');
            });
    };
    return (
        <div className=" ">
            <div className=" p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl  font-semibold mb-4">Profile Information</h2>
                <div className=" md:flex lg:flex  justify-start items-center gap-6 md:gap-10   lg:gap-20">
                    {/* Profile Picture */}
                    <div className="mr-4 flex flex-col justify-center items-center  gap-6">
                        <div className="avatar">
                            <div className="w-20 md:w-28 lg:w-52 rounded-full ring ring-teal-700 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="Profile" />
                            </div>
                        </div>

                        <button ><ButtonPrimary>Change</ButtonPrimary></button>
                    </div>
                    <div className="divider md:divider-horizontal lg:divider-horizontal"></div>
                    {/* Rest of the Information */}
                    <div className='w-full'>
                        {/* Display Name */}
                        <div className="mb-4">
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                Display Name
                            </label>
                            <input
                                id="displayName"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                value={user?.displayName}
                                readOnly
                            />
                        </div>
                        {/* user email */}
                        <div className="mb-4">
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                type="email"
                                value={user?.email}
                                readOnly
                            />
                        </div>
                        {/* Change Password */}
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                        <button className='block w-full' onClick={handlePasswordChange}>
                            <ButtonPrimary> Change Password</ButtonPrimary>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sating;
