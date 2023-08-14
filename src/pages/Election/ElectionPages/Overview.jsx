import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
import { next } from '../../../redux/slices/PageNumSlice';
import { addFirstPage } from '../../../redux/slices/FormDataSlice';
import { useState } from 'react';

const Overview = () => {

    const pageNum = useSelector(s => s.pageNum.page)
    const formData = useSelector(s => s.formData)
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState('option1');

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const title = data.title;
        dispatch(addFirstPage({ title }))
        dispatch(next())
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Vote Details</h1>
            <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                {/* -------title------- */}
                <div className="form-control">
                    <label className="label">
                        <span className="text-lg font-semibold">Election Title <span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <input {...register("title", { required: true })} placeholder="Photo URL" type='text'
                        defaultValue={formData.title} className="my-input focus:outline-green-400" />
                </div>

                {/* -------election date------- */}
                <div className="form-control">
                    <label className="pb-1">
                        <span className="text-lg font-semibold">select election date and time <span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <div>
                        <label className='block mb-4'>
                            <input
                                type="radio"
                                value="option1"
                                className='transform scale-150 me-3'
                                checked={selectedOption === 'option1'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            start immidiately and end after <input disabled={selectedOption === 'option2'} {...register('autoEnd', { required: true })} className='border h-10 px-2 ms-4' type='time'></input>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="option2"
                                className='transform scale-150 me-3 mb-3'
                                checked={selectedOption === 'option2'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            manually select starting and ending time
                        </label>
                    </div>
                    {
                        selectedOption === 'option2' && <>
                            <label className="pb-1">
                                <span className="text-md font-semibold">starting time</span>
                            </label>
                            <input disabled={selectedOption === 'option1'} {...register("startDate", { required: true })} placeholder="Photo URL" type='datetime-local' defaultValue={formData.startDate} className="my-input ms-5 focus:outline-green-400" />

                            <label className="pb-1">
                                <span className="text-md font-semibold">ending time</span>
                            </label>
                            <input disabled={selectedOption === 'option1'} {...register("endDate", { required: true })} placeholder="Photo URL" type='datetime-local' defaultValue={formData.startDate} className="my-input ms-5 focus:outline-green-400" />
                        </>
                    }
                </div>

                <div className='pt-5 flex justify-end'>
                    <button type='submit' className='button-next'>Next</button>
                </div>
            </form >
        </div >
    );
};

export default Overview;