import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';
import Swal from 'sweetalert2';

const ElectionCard = ({ election, refetch }) => {
    const { _id, title, status, startDate, autoDate, endDate, organization, voteType, voterEmails } = election;

    const handleElectionDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/remove-election/${_id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your election has been deleted',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className='border flex justify-between flex-col cursor-pointer rounded-2xl shadow-md p-5 mb-4 '>
            <div>
                {
                    title ? <Link to={`/election/${_id}`} className='text-xl font-semibold mb-2 block hover:underline hover:text-red-500  uppercase'>
                        {title}
                    </Link> : <Link to={`/election/${_id}`} className=' text-xl font-semibold mb-2 block hover:underline  hover:text-red-500  uppercase'>Please create your election title</Link>
                }
                <p className='text-xl text-gray-500 mb-2'>Organization: {organization}</p>
                <p >
                    Status: {status} | {voteType} Vote
                </p>
                <p className='text-xl text-gray-500'>
                    Voting Ends in: {autoDate} minutes
                </p>
                <p className='text-xl text-gray-500'>
                    Start: {startDate}
                </p>
                <p className='text-xl text-gray-500'>
                    End: {endDate}
                </p>
                {voterEmails && (
                    <p className='text-xl text-gray-500'>Voters: {voterEmails.length}</p>
                )}
            </div>
            <div onClick={handleElectionDelete} className='flex justify-end items-center gap-1 text-red-400'>
                <p className='text-xl'>Delete</p><FaTrash></FaTrash>
            </div>
        </div>
    );
};

export default ElectionCard;
