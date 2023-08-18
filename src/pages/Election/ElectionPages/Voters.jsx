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
    const voterEmails = formData.voterEmails;
    const emailsValid = formData.emailsValid

    useEffect(() => {
        if (voterEmails.length === 0) {
            dispatch(addVoterRow())
        }
    }, [])

    const handleSave = () => {

    }

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setEmailErrors(false)
        dispatch(setEmailValid())
        axios.patch(`http://localhost:5000/election/${formData._id}`, formData)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    dispatch(setEmailValid())
                }
            })
    }

    const handleNext = () => {
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

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Add Voters</h1>
            <div>
                <button className='bg-gray-200 px-3 py-1 rounded-md' onClick={() => dispatch(addVoterRow())}>Add Row</button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='overflow-y-auto max-h-80'>
                        <table className='w-full'>
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
                                                    {...register(`voterEmail${row.id}`, {
                                                        required: true,
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    autocomplete="off"
                                                    type="text"
                                                    className={errors[`voterEmail${row.id}`] ? 'bg-red-300 w-full px-2' : 'bg-gray-200 w-full'}
                                                    defaultValue={row.email}
                                                    onChange={e => dispatch(updateVoterEmail({ id: row.id, email: e.target.value }))}
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
                    <div className='text-center'>
                        {
                            emailErrors && <p className='text-red-400'>Please solve the invalid email addresses.</p>
                        }
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-4 py-1 bg-green-400 rounded-md mt-3 text-white' type='submit'>validate</button>
                    </div>
                </form>
                <div className='pt-5 flex justify-between'>
                    <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                    <button onClick={handleSave} type='button' className='bg-gray-400 px-4 rounded-md text-white'>Save</button>
                    <button onClick={handleNext} type='button' className='button-next'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Voters;