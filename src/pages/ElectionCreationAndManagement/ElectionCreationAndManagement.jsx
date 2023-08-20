import React, { useContext } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import UserName from '../../components/Deshboard/UserName/UserName';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';
import ElectionCard from './ElectionCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const ElectionCreationAndManagement = () => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const { data: elections = [], refetch, isLoading } = useQuery({
    queryKey: ['elections', user],
    queryFn: async () => {
      const res = await axios.get(`https://electra-poll-server.vercel.app/elections/${user?.email}`)
      return res.data
    }
  })


  const handleAddElection = () => {
    const electionData = {
      title: '',
      email: user?.email,
      autoDate: '',
      startDate: '',
      page: 0,
      endDate: '',
      questions: [{
        id: `xyz${Math.floor(10000 + Math.random() * 90000)}`,
        voterChoose: 'candidate',
        vacancy: 1,
        options: [{
          id: `xyz${Math.floor(100000 + Math.random() * 900000)}`,
          option: `option/candidate 1}`,
          votes: 0
        }],
        choosedOptions: 1
      }],
      emailsValid: false,
      notice: {
        emailNotice: true,
        useName: true
      },
      emailSubject: 'Vote Now:',
      emailInfo: '',
      voterEmails: [],
      status: 'pending'
    }
    if (user) {
      axios.post('https://electra-poll-server.vercel.app/add-election', electionData)
        .then(res => {
          const id = res.data.insertedId
          axios.get(`https://electra-poll-server.vercel.app/election/${id}`)
            .then(res => {
              console.log(res.data, id);
              navigate(`/election/${id}`)
            })
        })
    }
  }


  return (
    <>
      <UserName></UserName>
      <div className="create-bg3">
        <div className='bg-slate-600 bg-opacity-60 text-center h-[90vh] md:h-[50vh] flex flex-col items-center justify-center p-10 md:p-24 '>
          <h2 className='text-slate-100  uppercase font-bold text-2xl  sm:text-2xl md:text-5xl mb-4'> Create Your Election</h2>
          <p className=' text-slate-200 md:text-xl mb-4'> Empower Your Voice Online! Shape the Future with Our User-Friendly  <br /> Voting Platform. Make Your Vote Count.We are always ready to give a pure election</p>
          <button onClick={handleAddElection}><BsPlusSquare className='text-6xl  md:text-7xl text-white' /></button>
        </div>
      </div>
      <div className='my-container mt-10 mb-10'>
        {
          elections?.length !== 0 ? <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>

            {
              elections?.map(election => <ElectionCard key={election._id} refetch={refetch} election={election}></ElectionCard>)
            }

          </div> : <LoadingSpinner></LoadingSpinner>
        }
      </div>
    </>
  );
};

export default ElectionCreationAndManagement;