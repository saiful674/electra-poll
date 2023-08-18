import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVoterRow, removeVoterEmail, updateVoterEmail } from '../../../redux/slices/FormDataSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const Voters = () => {
    const dispatch = useDispatch();
    const [emailErrors, setEmailErrors] = useState(false)
    const voterEmails = useSelector(state => state.formData.voterEmails);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

    }

    const handleEmailChange = (index, newEmail) => {
        dispatch(updateVoterEmail({ index, email: newEmail }));
    };

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Add Voters</h1>
            <div>
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
                                                    {...register(`voterEmail${index}`, {
                                                        required: true,
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    type="text"
                                                    className={errors[`voterEmail${index}`] ? 'bg-red-300 w-full' : 'bg-gray-200 w-full'}
                                                    value={row.email}
                                                    onChange={e => handleEmailChange(index, e.target.value)}
                                                />
                                            </div>
                                            <button type='button'>
                                                <FaTrash onClick={() => dispatch(removeVoterEmail(row.id))} className='inline'></FaTrash>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='text-center'>
                        {
                            errors && <p>Please solve the invalid email addresses.</p>
                        }
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-4 py-1 bg-green-400 rounded-md mt-3 text-white' type='submit'>validate</button>
                    </div>
                </form>
                <button onClick={() => dispatch(addVoterRow())}>Add Row</button>
            </div>
        </div>
    );
};

export default Voters;