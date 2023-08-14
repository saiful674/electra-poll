import React from 'react';
import { useForm } from 'react-hook-form';
import { next, previous } from '../../../redux/slices/PageNumSlice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';

const Nominees = () => {

    const pageNum = useSelector(s => s.pageNum.page)

    const dispatch = useDispatch()

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        dispatch(next())
    }

    return (
        <div className='lg:w-[70%] bg-gray-50 p-10'>
            <h1>Nominees</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("photoURL", { required: true })}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
                    type="text"
                    placeholder="Photo URL"
                />
                <div className='pt-5 flex justify-between'>
                    <button type='button' className='button-pre' onClick={() => dispatch(previous())}>Back</button>
                    <button type='submit' className='button-next'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default Nominees;