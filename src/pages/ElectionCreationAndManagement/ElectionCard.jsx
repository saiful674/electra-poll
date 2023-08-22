import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';
import Swal from 'sweetalert2';
import { formatDateToInputValue } from '../../Hooks/convertDate';
import { useState } from 'react';
import { useEffect } from 'react';

const ElectionCard = ({ election, refetch }) => {

    const [timeLeft, setTimeLeft] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const { _id, title, status, startDate, autoDate, endDate, organization, voteType, voterEmails } = election;

    useEffect(() => {
        if (startDate && endDate) {
            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = new Date(endDate) - now;

                if (distance <= 0) {
                    clearInterval(intervalId);
                    setTimeLeft("Election Ended!");
                } else {
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                }
            };

            updateTimer();  // To initialize immediately
            const id = setInterval(updateTimer, 1000);
            setIntervalId(id);

            return () => clearInterval(id);  // Clear the interval when component unmounts
        }
    }, [startDate, endDate]);

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
        <div className='border flex justify-between flex-col cursor-pointer rounded-2xl shadow-md p-4 mb-4 '>
            <div className='space-y-2 text-xl text-gray-500'>
                {
                    title ? <Link to={`/election/${_id}`} className='text-xl font-semibold mb-2 block hover:underline hover:text-red-500  uppercase'>
                        {title}
                    </Link> : <Link to={`/election/${_id}`} className=' text-xl font-semibold mb-2 block hover:underline  hover:text-red-500  uppercase'>Please create your election title</Link>
                }
                <p >Organization: {organization}</p>
                <p >
                    Status: {status} | {voteType} Vote
                </p>
                <p>
                    Voting Ends in: <span className={new Date(endDate) - new Date() <= 3 ? 'text-red-400' : 'text-green-500'}>{timeLeft}</span>
                </p>
                <p >
                    Start: {startDate && formatDateToInputValue(startDate)}
                </p>
                <p >
                    End: {endDate && formatDateToInputValue(endDate)}
                </p>
                {voterEmails && (
                    <p>Voters: {voterEmails.length}</p>
                )}
            </div>
            <div onClick={handleElectionDelete} className='flex justify-end items-center gap-1 text-red-400'>
                <p className='text-xl'>Delete</p><FaTrash></FaTrash>
            </div>
        </div>
    );
};

export default ElectionCard;
