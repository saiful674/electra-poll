import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { previous } from '../../../redux/slices/PageNumSlice';

const Ballot = () => {

    const pageNum = useSelector(s => s.pageNum.page)
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

    }
    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Create Ballot</h1>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>

                <div className='pt-5 flex justify-between'>
                    <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                    <button type='submit' className='button-next'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default Ballot;