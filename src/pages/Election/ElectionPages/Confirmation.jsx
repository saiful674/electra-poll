import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previous } from '../../../redux/slices/FormDataSlice';
import Swal from 'sweetalert2';
import axios from 'axios';

const Confirmation = () => {

    const dispatch = useDispatch()
    const formData = useSelector(s => s.formData)
    const { title, autoDate, startDate, endDate, questions } = formData

    const handeConfirmation = () => {
        Swal.fire({
            title: 'Have you checked all the information?',
            text: "You won't be able to update a ballot after publishing!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Publish it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/election/${formData._id}`, { status: 'published' })
                    .then(res => {
                        console.log(res.data);
                        if (res.data) {
                            Swal.fire(
                                'congratulation!',
                                'Your Vote has been published.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Confirm and Puplish vote</h1>
            <div className='text-xl space-y-2'>
                <p><span className='font-semibold'>Election Title:</span> {title}</p>
                {autoDate && <p><span className='font-semibold'>Election time: </span>After pulishing election will end in {autoDate} minutes.</p>}
                {startDate && <p><span className='font-semibold'>Election Starting time: </span>Voting will start on {startDate}</p>}
                {endDate && <p><span className='font-semibold'>Election Starting time: </span>Voting will end on {endDate}</p>}
                <div>
                    <span className='font-semibold'>Ballot(s):</span>
                    {questions.map(q => <div key={q.id} className='bg-gray-200 rounded-md w-full space-y-2 p-4'>
                        <h2>{q.questionTitle}</h2>
                        <p>Please choose {q.choosedOptions} {q.voterChoose} for below option.</p>
                        {
                            q.options.map((o, i) => <div key={o}>
                                <p className='py-2 px-3 bg-white'>{i + 1}.{o}</p>
                            </div>)
                        }
                    </div>)}
                </div>
            </div>
            <div className='pt-5 flex justify-between'>
                <button onClick={() => dispatch(previous())} type='button' className='button-pre'>Back</button>
                <button type='button' className='bg-gray-400 px-4 rounded-md text-white'>Save</button>
                <button onClick={handeConfirmation} type='button' className='button-next'>Publish</button>
            </div>
        </div>
    );
};

export default Confirmation;