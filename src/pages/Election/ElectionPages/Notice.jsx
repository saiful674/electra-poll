import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { next, previous } from '../../../redux/slices/FormDataSlice';
import { useForm } from 'react-hook-form';
import { setEmailInfo, setEmailNotice, setEmailSubject, setUseName } from '../../../redux/slices/FormDataSlice';
import axios from 'axios';

const Notice = () => {

    const dispatch = useDispatch()
    const formData = useSelector(s => s.formData)
    const noticeData = formData.notice

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.patch(`https://electra-poll-server.vercel.app/election/${formData._id}`, formData)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    dispatch(next());
                }
            })
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>How the voter will be noticed</h1>

            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>

                {/* ----email notice---- */}
                <div className='bg-gray-200 p-3 text-lg space-y-3'>
                    <label className='flex gap-4'>
                        <input
                            type="checkbox"
                            checked={noticeData.emailNotice}
                            className={`transform scale-150`}
                            onChange={() => dispatch(setEmailNotice())}
                        />
                        <p>Email Notice</p>
                    </label>
                    {noticeData.emailNotice && <label className='flex ps-6 gap-4'>
                        <input
                            type="checkbox"
                            checked={noticeData.useName}
                            className={`transform scale-150`}
                            onChange={() => dispatch(setUseName())}
                        />
                        <p>Use Organization name as Email sender</p>
                    </label>}
                </div>

                {/* ---------email templete--------- */}
                {noticeData.emailNotice && <>
                    <div className='bg-gray-200 p-3'>
                        <h1 className='text-xl font-bold pb-3'>Email Templete</h1>
                        <lebel className="flex gap-3 items-center text-lg bg-white p-2 mb-1">
                            <p>Subject:</p>
                            <input onChange={(e) => dispatch(setEmailSubject(e.target.value))} defaultValue={formData.emailSubject || 'Vote Now: {company name} {election title}'} className='w-full p-1' type="text" />
                        </lebel>
                        <div className='bg-white p-3 mb-1'>
                            <p>You are cordially invited to cast your vote in the upcoming {formData?.organization} - {formData.title} election.</p>
                            <br />
                            <p>We are employing a sophisticated online voting system to ensure accuracy and transparency. You have been allocated a unique voting key, granting you one-time access to this process. Please treat this key with confidentiality and avoid sharing or forwarding this communication.
                            </p>
                            <br />
                            <p>Should you have any queries or wish to share feedback regarding the election, or if you prefer not to receive subsequent voting notifications, please contact Mr. Mahmud Khan at <a className='text-green-400 underline' href={formData?.adminEmail}>{formData?.adminEmail}</a></p>
                        </div>
                        <textarea defaultValue={formData?.emailInfo} onChange={(e) => dispatch(setEmailInfo(e.target.value))} placeholder='add any other information here' className='h-30 p-3 w-full'></textarea>
                        <p className='bg-white p-3'>Thank you for your participation.</p>
                    </div>
                </>}

                <div className='pt-5 flex justify-between'>
                    <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                    <button type='submit' className='bg-gray-400 px-4 rounded-md text-white'>Save</button>
                    <button type='submit' className='button-next'>Next</button>

                </div>
            </form>
        </div>
    );
};

export default Notice;