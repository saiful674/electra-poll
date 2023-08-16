import React from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useContext } from 'react';

const UserName = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='bg-white mb-4 py-3 px-4 border-b-2 sm:flex md:flex items-center gap-4'>
            <div className="avatar">
  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={user?.photoURL} />
  </div>
</div>    
 <div>
 <h3 className='text-xl font-bold'>{user?.displayName}</h3>
   <p className='font-semibold'> Welcome to the dashboard</p>
 </div>
            </div>
    );
};

export default UserName;