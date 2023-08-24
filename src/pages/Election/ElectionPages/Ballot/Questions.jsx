import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addChoosedOptions, addOption, addQuestionTitle, addVacancy, addVoterChoose, deleteOption, updateOption } from '../../../../redux/slices/FormDataSlice';
import { FaTrash } from 'react-icons/fa';

const Questions = ({ question, questionSubmit, handleSubmit, register, errors }) => {

    const formData = useSelector(s => s.formData)
    const status = formData.status;
    const dispatch = useDispatch()
    const id = question.id

    return (
        <div className='flex justify-center items-center border-4 border-green-400'>
            <form onSubmit={handleSubmit(questionSubmit)} className='bg-gray-200 w-full p-5 space-y-6'>

                {/* handle errors */}
                {
                    errors && <div className='bg-red-100 border-l-4 mb-2 flex items-center text-lg p-3 border-red-600'>
                        <ul className='list-decimal ps-6'>
                            {errors[`questionTitle${id}`] && <li>Please add question or position.</li>}
                        </ul>
                    </div>
                }


                {/* -------question------- */}
                <div className="form-control bg-white p-2">
                    <label className="label">
                        <span className="text-lg font-semibold">Question or Position<span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <input disabled={status !== 'pending'} {...register(`questionTitle${id}`, { required: status === 'pending' })} onChange={(e) => dispatch(addQuestionTitle({ id, questionTitle: e.target.value }))} placeholder="Question or Position" type='text'
                        defaultValue={question?.questionTitle} className="my-input focus:outline-green-400" />
                </div>


                {/* -------vacancy------- */}
                <div className="form-control flex-row items-center gap-10 bg-white p-2">
                    <label className="label">
                        <span className="text-lg font-semibold">Vacancy<span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <input disabled={status !== 'pending'} onChange={(e) => dispatch(addVacancy({ id, vacancy: Math.floor(e.target.value) }))} placeholder="question or option" type='number'
                        defaultValue={question?.vacancy} className=" appearance-none border rounded w-16 text-center py-2 px-3 text-gray-700 leading-tight focus:outline-green-400" />
                </div>


                {/* -------voters choose------- */}
                <div className="form-control flex-row items-center gap-10 bg-white p-2">
                    <label className="label">
                        <span className="text-lg font-semibold">Voters Choose<span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <div className='flex items-center gap-3'>
                        <label className='block cursor-pointer'>
                            <input
                                type="radio"
                                disabled={status !== 'pending'}
                                defaultValue="candidate"
                                className='transform scale-150 me-3'
                                checked={question?.voterChoose === 'candidate'}
                                onChange={(e) => dispatch(addVoterChoose({ id, voterChoose: e.target.value }))}
                            />
                            candidate
                        </label>
                        <label>
                            <input
                                disabled={status !== 'pending'}
                                type="radio"
                                defaultValue="option"
                                className='transform scale-150 me-3'
                                checked={question?.voterChoose === 'option'}
                                onChange={(e) => dispatch(addVoterChoose({ id, voterChoose: e.target.value }))}
                            />
                            option
                        </label>
                    </div>
                </div>


                {/* set candidates or options */}
                <div className="form-control bg-white p-2">
                    <label disabled={status !== 'pending'} className="">
                        <span className="text-lg font-semibold">set candidates or options<span className='text-red-400'>&#9998;</span></span>
                        <div className='bg-red-100 border-l-4 mb-2 flex items-center text-lg p-3 border-red-600'>
                            <p className="text-md block">Voters will choose from these options</p>
                        </div>
                    </label>
                    <div>
                        <p className='text-lg pb-1'>Options ({question?.options.length})</p>
                        <div className='flex flex-col gap-2'>
                            {
                                question.options?.map((o, i) => <div className='flex w-full items-center gap-3' key={i}>
                                    <p>{i + 1}.</p>
                                    <input disabled={status !== 'pending'} onChange={(e) => dispatch(updateOption({ id: question.id, option: e.target.value, optionId: o.id }))} defaultValue={o.option} className='my-input' type='text'></input>
                                    <button onClick={() => dispatch(deleteOption({ id: question.id, optionId: o.id }))} type='button'><FaTrash className='text-red-500'></FaTrash></button>
                                </div>)
                            }
                        </div>
                        <button disabled={status !== 'pending'} type='button' className='bg-gray-200 mt-3 px-3 py-1 mb-2' onClick={() => dispatch(addOption({ id: question.id }))}>Add Option +</button>
                    </div>
                    <div className='flex items-center text-lg mt-3 gap-2'>
                        <p>Voters can choose</p>
                        <input disabled={status !== 'pending'} onChange={(e) => dispatch(addChoosedOptions({ id, choosedOptions: Math.floor(e.target.value) }))} defaultValue={question?.choosedOptions} type="number" className='appearance-none border rounded w-16 text-center py-2 px-3 text-gray-700 leading-tight focus:outline-green-400' />
                        <p>options</p>
                    </div>
                </div>
                <button disabled={status !== 'pending'} type='submit'>save</button>
            </form>
        </div>
    );
};

export default Questions;