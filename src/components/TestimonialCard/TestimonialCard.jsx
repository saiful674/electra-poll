import React from 'react';

const TestimonialCard = ({testimonial}) => {
    return (
        <div className='text-center bg-slate-200 rounded-lg p-5 shadow-md'>
        <h3 className='text-xl font-semibold mb-2'>{testimonial.user.name}</h3>
        <p className='text-gray-600'>{testimonial.user.occupation}</p>
        <p className='mt-4 text-lg'>{testimonial.content}</p>
        <div className='mt-4'>
            <span className='text-yellow-500 font-semibold'>Ratings: </span>
            <span className='text-yellow-600'>{testimonial.rating}</span>
        </div>
        <p className='mt-2 text-gray-500'>Date: {testimonial.date}</p>
    </div>
    );
};

export default TestimonialCard;