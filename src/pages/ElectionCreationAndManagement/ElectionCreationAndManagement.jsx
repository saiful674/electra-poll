import React from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import UserName from '../../components/Deshboard/UserName/UserName';

const ElectionCreationAndManagement = () => {
    return (
   <>
     <UserName></UserName>
        <div className="create-bg3">
          <div className='bg-slate-600 bg-opacity-60 text-center overflow-hidden h-[50vh]  flex flex-col items-center justify-center p-2 md:p-24 '>
         <h2 className='text-slate-100  uppercase font-bold text-2xl  sm:text-2xl md:text-5xl mb-4'> Create Your Election</h2>
         <p className=' text-slate-200 md:text-xl mb-4'> Empower Your Voice Online! Shape the Future with Our User-Friendly  <br /> Voting Platform. Make Your Vote Count.We are always ready to give a pure election</p>
          <Link to='/election'><BsPlusSquare className='text-6xl  md:text-7xl text-white'/></Link>  
          </div>   
        </div>
        <div className='my-container mt-10 mb-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  '>
          <div className='sm:w-96 md:w-96 h-[280px]  border  rounded-2xl shadow p-6'>
       <h1 className='text-xl font-semibold'>My Election</h1>
          </div>
          </div>
        </div>
   </>
    );
};

export default ElectionCreationAndManagement;
