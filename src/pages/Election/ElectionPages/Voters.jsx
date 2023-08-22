import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVoterRow, removeVoterEmail, setEmailValid, updateVoterEmail } from '../../../redux/slices/FormDataSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { next, previous } from '../../../redux/slices/FormDataSlice';
import axios from 'axios';

const Voters = () => {
    const dispatch = useDispatch();
    const [emailErrors, setEmailErrors] = useState(false)
    const formData = useSelector(state => state.formData);
    const { voterEmails, emailsValid, ballotAccess, status } = formData


    useEffect(() => {
        if (voterEmails.length === 0) {
            dispatch(addVoterRow())
        }
    }, [])

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setEmailErrors(false)
        const voterAccessKey = data.accessKey;
        const voterAccessPassword = data.password;

        if (status === 'pending') {
            axios.patch(`http://localhost:5000/election/${formData._id}`, { ...formData, voterAccessKey, voterAccessPassword })
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                    }
                })
        }
        dispatch(setEmailValid(true))
    }

    const handleNext = () => {
        console.log(emailsValid);
        if (emailsValid && voterEmails.length >= 1) {
            dispatch(next())
        }
        else {
            setEmailErrors('please validate emails first and add atleast one voter')
        }
    }

    const handleRemove = (id) => {
        dispatch(removeVoterEmail(id));
        reset();
    };

    const handleUpdateEmail = (id, email) => {
        dispatch(updateVoterEmail({ id, email }))
        dispatch(setEmailValid(false))
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Add Voters</h1>
            {(Object.keys(errors).length !== 0) &&
                <div className='bg-red-100 border-l-4 h-20 flex items-center text-lg border-red-600'>
                    <ul className='list-decimal ps-6'>
                        {errors.accessKey && <li>Access key required for voter to access ballot</li>}
                        {errors.password && <li>Password required for voter to access ballot</li>}
                    </ul>
                </div>
            }
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {
                            ballotAccess === 'medium' && <div className='mb-10'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-semibold">Voter Access Key<span className='text-red-400'>&#9998;</span></span>
                                    </label>
                                    <input disabled={status !== 'pending'} {...register("accessKey", { required: status === 'pending' })} placeholder="add access key for voters" type='text'
                                        defaultValue={formData.voterAccessKey || ''} className="my-input focus:outline-green-400" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-semibold">Voter Password<span className='text-red-400'>&#9998;</span></span>
                                    </label>
                                    <input disabled={status !== 'pending'} {...register("password", { required: status === 'pending' })} placeholder="add password for voters" type='text'
                                        defaultValue={formData.voterAccessPassword || ''} className="my-input focus:outline-green-400" />
                                </div>
                            </div>
                        }
                        <button disabled={status !== 'pending'} type='button' className='bg-gray-200 px-3 py-1 rounded-md' onClick={() => dispatch(addVoterRow())}>Add Row</button>
                        <div className='overflow-y-auto max-h-96'>
                            <table className='w-full mt-4'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voterEmails.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{index + 1}</td>
                                            <td className='w-full flex gap-1 my-1'>
                                                <div className='w-full'>
                                                    <input
                                                        disabled={status !== 'pending'}
                                                        {...register(`voterEmail${row.id}`, {
                                                            required: true,
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                message: "Invalid email address"
                                                            }
                                                        })}
                                                        autoComplete="off"
                                                        type="text"
                                                        className={errors[`voterEmail${row.id}`] ? 'bg-red-300 w-full px-2' : 'bg-gray-200 w-full'}
                                                        defaultValue={row.email}
                                                        onChange={e => handleUpdateEmail(row.id, e.target.value)}
                                                    />
                                                </div>
                                                <button type='button'>
                                                    <FaTrash onClick={() => handleRemove(row.id)} className='inline'></FaTrash>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='text-center'>
                        {
                            emailErrors && <p className='text-red-400'>Please solve the invalid email addresses.</p>
                        }
                    </div>
                    <div className='flex justify-center'>
                        <button disabled={status !== 'pending'} className='px-4 py-1 bg-green-400 rounded-md mt-3 text-white' type='submit'>validate</button>
                    </div>
                </form>
                <div className='pt-5 flex justify-between'>
                    <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                    <button onClick={handleNext} type='button' className='button-next'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Voters;