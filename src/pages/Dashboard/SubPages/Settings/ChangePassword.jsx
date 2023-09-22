import React, { useContext, useState } from 'react';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth'; // Add this import
import { AuthContext } from '../../../../Providers/AuthProvider';
import ButtonPrimary from '../../../../components/ButtonPrimary/ButtonPrimary';
import { toast } from 'react-hot-toast';
import password from '../../../../assets/changePass/changePassword.jpg'
import { AiOutlineEye } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = getAuth(); // Initialize Firebase auth

  const { user } = useContext(AuthContext); // Get the authenticated user from your AuthContext

  const handleChangePassword = () => {
    setError('');
    setSuccessMessage('');
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all input fields.');
      return;
    }
    if (oldPassword.length < 5 && !newPassword.length < 5) {
      setError('please add password minimum length 6');
      return;
    }
    if (oldPassword.length >= 20 && !newPassword.length >= 20) {
      setError('please use password maximum length 20');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    const credentials = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credentials)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setSuccessMessage('Password updated successfully.');
            toast.success('Password updated successfully.')
          })
          .catch((error) => {
            if (error.message.includes('password is invalid')) {
              setError('Current password is incorrect. Please double-check.');
            } else {
              setError('An error occurred while updating the password.');
            }
          });
      })
      .catch((error) => {

        setError('Authentication failed. Please re-enter your password.');

      });
  };

  return (
    <div className="mt-8">
      <div className="p-6 bg-white dark:bg-[#343434] dark:text-white rounded-lg shadow-md dark:shadow-slate-500">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <div className='md:flex lg:flex  justify-start items-center gap-6 md:gap-10   lg:gap-20'>

          <img src={password} alt="Password" className="w-40 h-auto md:w-52 lg:w-64" />

          <div className="divider md:divider-horizontal lg:divider-horizontal"></div>
          <div className='grid grid-rows-1 gap-4 w-full'>
            <div className=''>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                Old Password
              </label>
              <div className="relative">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <AiOutlineEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <AiOutlineEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <button onClick={handleChangePassword}><ButtonPrimary>Change Password</ButtonPrimary></button>

          </div>
        </div>
      </div> </div>
  );
};

export default ChangePassword;
