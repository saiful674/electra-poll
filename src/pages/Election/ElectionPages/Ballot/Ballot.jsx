import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { next, previous } from '../../../../redux/slices/FormDataSlice';
import { addQuestion } from '../../../../redux/slices/FormDataSlice';
import Questions from './Questions';
import axios from 'axios';

const Ballot = () => {

    const formData = useSelector(s => s.formData)
    const questions = formData.questions

    const [isdisabled, setDisabled] = useState(false)
    const ballotData = useSelector(s => s.ballot)
    const ballots = ballotData.ballots
    const status = formData.status

    const dispatch = useDispatch()

    console.log(ballots);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    console.log(errors);
    const onSubmit = data => {
        setDisabled(true)
        if (status === 'pending') {
            axios.patch(`https://electra-poll-server.vercel.app/election/${formData._id}`, formData)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        setDisabled(false)
                        dispatch(next());
                    }
                })
        }
        else {
            dispatch(next())
        }
    }

    const questionSubmit = data => {
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Create Ballot</h1>
            <div className='bg-red-100 border-l-4 mb-5 flex items-center text-lg p-3 border-red-600'>
                <p>Add one or Multiple questions. These questions can have multiple answers. Voters will chose one or multiple answers. Be sure to properly customize each question. You can always come back and edit them later.</p>
            </div>

            {/* --------add questions or options------- */}
            <div className="flex justify-between mb-3">
                <h2 className='text-xl font-semibold'>Total Questions ({questions.length})</h2>
                <button disabled={status !== 'pending'} type='button' onClick={() => dispatch(addQuestion())} className='button-next disabled:opacity-40'>Add quertion or position</button>
            </div>

            {/* ---ballot data based on questions--- */}
            <div className='space-y-10'>
                {
                    questions.map(question => <Questions
                        key={question.id}
                        question={question}
                        questionSubmit={questionSubmit}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                    ></Questions>)
                }
            </div>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div className='pt-5 flex justify-between'>
                    <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                    <button disabled={isdisabled} type='submit' className='button-next'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default Ballot;