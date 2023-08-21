import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import ButtonPrimary from '../../../../components/ButtonPrimary/ButtonPrimary';

const ChangePassword = () => {
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
                <h2 className="text-2xl  font-semibold mb-4">Change Password</h2>
                <div className="">
                    {/* Profile Picture */}
                {/* Profile Picture */}
          <div className="divider md:divider-horizontal lg:divider-horizontal"></div>
                    {/* Rest of the Information */}
                  
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
      

    );
};

export default ChangePassword;
