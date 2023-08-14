import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
import { next } from '../../../redux/slices/PageNumSlice';
import { addFirstPage } from '../../../redux/slices/FormDataSlice';

const Overview = () => {

    const pageNum = useSelector(s => s.pageNum.page)
    const formData = useSelector(s => s.formData)
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const title = data.title;
        dispatch(addFirstPage({ title }))
        dispatch(next())
    }

    return (
        <div className='lg:w-[70%] bg-gray-50 p-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("title", { required: true })}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
                    type="text"
                    placeholder="Photo URL"
                    defaultValue={formData.title}
                />
                <div className='pt-5 flex justify-end'>
                    <button type='submit' className='button-next'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default Overview;