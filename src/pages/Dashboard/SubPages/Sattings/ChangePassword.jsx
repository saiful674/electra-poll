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
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth(); // Initialize Firebase auth
  
    const { user } = useContext(AuthContext); // Get the authenticated user from your AuthContext
  
    const handleChangePassword = () => {
      setError('');
      setSuccessMessage('');
  
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
              setError(`Password update failed: ${error.message}`);
            });
        })
        .catch((error) => {
          setError(`Authentication failed: ${error.message}`);
        });
    };
  
    return (
      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <div className='md:flex lg:flex  justify-start items-center gap-6 md:gap-10   lg:gap-20'>
  
        <img  src={password} alt="Password" className="w-40 h-auto md:w-52 lg:w-64" />
 
          <div className="divider md:divider-horizontal lg:divider-horizontal"></div>
          <div className='grid grid-rows-1 gap-4 w-full'>
         <div className=''>
         <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
          Old Password
               </label>
           <div className='relative'>
           <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out'
            type={oldPassword ? "text" : "password"}
              placeholder="Old Password"
            //   value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
             <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setOldPassword(!oldPassword)}
            >
              {oldPassword ?  <AiOutlineEye /> :<FaRegEyeSlash />}
            </span>
           </div>
         </div>
             <div>
             <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
               </label>
      <div className='relative'>
      <input
             className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out'
             type={newPassword ? "text" : "password"}
              placeholder="New Password"
            //   value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
             <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setNewPassword(!newPassword)}
            >
              {newPassword ?  <AiOutlineEye /> :<FaRegEyeSlash />}
            </span>
      </div>
             </div>
              <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
               Confirm New Password
               </label>
          <div className='relative '>
          <input
             className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out'
             type={confirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
            //   value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
             <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmPassword(!confirmPassword)}
            >
              {confirmPassword ?  <AiOutlineEye /> :<FaRegEyeSlash />}
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
  