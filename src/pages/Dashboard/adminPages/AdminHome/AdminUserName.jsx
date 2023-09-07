import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';

const AdminUserName = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='bg-gray-100 mb-4 py-3 px-4 border-b-2 sm:flex flex items-center gap-4'>
      <div className="avatar">
        <div className="w-12 rounded-full ring ring-teal-600 ring-offset-base-100 ring-offset-2">
          <img src={user?.photoURL} />
        </div>
      </div>
      <div>
        <h3 className='text-xl font-bold'>{user?.displayName}</h3>
        <p className='font-semibold'> Welcome to the admin dashboard</p>
      </div>
    </div>
  );
};

export default AdminUserName;