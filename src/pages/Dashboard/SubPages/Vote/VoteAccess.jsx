import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useElectionTimer from '../../../../Hooks/useElectionTimer';
import { formatDateToInputValue } from '../../../../Hooks/convertDate';
import Vote from './Vote';

const VoteAccess = () => {
    const [queries] = useSearchParams()
    const email = queries.get('email');
    const id = queries.get('id')
    const [isVoter, setIsVoter] = useState(sessionStorage.getItem('isVoter') === 'true' ? true : false || false)


    // ====checks if query email is in the voterEmails list===
    const { data: voterCheck, isLoading } = useQuery({
        queryKey: ['voterCheck', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/election-voterCheck?email=${email}&&id=${id}`)
            return res.data
        }
    })

    console.log(voterCheck);

    // ====fetch election if isVoter true===
    const { data: election = {}, refetch: refetchElection } = useQuery({
        queryKey: ['election', isVoter],
        enabled: isVoter || !voterCheck?.voter?.voted,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/election/${id}`)
            return res.data
        }
    })

    const { title, startDate, endDate, timeZone } = election


    // ========election start timer======
    const { timeLeft, timeDifference } = useElectionTimer(election.startDate)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { accessKey, password } = data
        axios.patch(`http://localhost:5000/election-access-password`, { accessKey, password: Math.floor(password), id, email })
            .then(res => {
                if (res.data.error !== true) {
                    refetchElection()
                    sessionStorage.setItem('isVoter', true)
                    sessionStorage.setItem('electionId', res.data._id)
                    setIsVoter(true)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `${res.data.message}`
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    if (!isVoter) {
        return (
            <div className='min-h-[80vh] pt-20 my-container justify-center flex items-center'>
                {!isLoading && voterCheck.error && <p className='text-red-500 text-center'>Election does't exist or administrator has removed the election</p>}
                {voterCheck?.isVoter && !isVoter && <div className='w-full flex flex-col items-center'>
                    <div className='pb-10 text-center'>
                        <p>We have send you the access key and password in this <span className='text-green-400'>{email}</span> email.</p>
                        <p className='pt-4'>For detailed information please contact the administrator at
                            <a
                                className="text-green-400 underline ps-2"
                                href={`mailto:${voterCheck?.adminEmail}`}
                            >
                                {voterCheck?.adminEmail}
                            </a>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-[40%]'>

                        {/* =========access key========== */}
                        <div className="form-control">
                            <label className="label">
                                <span className="text-lg font-semibold">
                                    Access Key <span className="text-red-400">&#9998;</span>
                                </span>
                            </label>
                            <input
                                {...register("accessKey", { required: true })}
                                placeholder="Access key"
                                type="text"
                                className="my-input focus:outline-green-400"
                            />
                            {errors.accessKey && errors.password.type === 'required' && <p className='text-red-500'>Access key is required</p>}
                        </div>

                        {/* ========password========= */}
                        <div className="form-control">
                            <label className="label">
                                <span className="text-lg font-semibold">
                                    Password<span className="text-red-400">&#9998;</span>
                                </span>
                            </label>
                            <input
                                {...register("password", { required: true })}
                                placeholder="Password"
                                type="text"
                                className="my-input focus:outline-green-400"
                            />
                            {errors.password && errors.password.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        </div>
                        <div className='flex justify-center mt-4'>
                            <button type='submit' className='button-next'>Submit</button>
                        </div>
                    </form></div>}
            </div>
        );
    }

    else if (voterCheck?.voter?.voted === true) {
        return (
            <div className='min-h-[70vh] flex justify-center items-center flex-col gap-3'>
                <p className='text-3xl text-green-500'>you already voted</p>
                <button className='button-next'>see result</button>
            </div>
        )
    }

    else {
        return (
            <div className='min-h-[70vh] mt-24 my-container'>
                <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
                    <h1 className='text-3xl'>Election: {title}</h1>
                    <p className='text-xl'>Start Date: {startDate && formatDateToInputValue(startDate, timeZone)}</p>
                    <p className='text-xl pb-10'>End Date: {endDate && formatDateToInputValue(endDate, timeZone)}</p>
                    {election && election.status === 'completed' && <div className='w-full flex flex-col items-center'>
                        <h1 className='text-red-500 text-3xl'>Election ended</h1>
                        {election.voterResultAccess === 'after' && <button className='button-next'>See Result</button>}
                    </div>}

                    {election && election.status === 'published' && <div>
                        <p className='text-2xl'>Election Starts in: <span className={timeDifference <= 3 ? 'text-red-500' : 'text-green-500'}>
                            {timeLeft}
                        </span>
                        </p>
                    </div>}

                    {election && election.status === 'ongoing' && <div>
                        <Vote email={email} election={election}></Vote>
                    </div>}
                </div>

            </div>
        )
    }
};

export default VoteAccess;