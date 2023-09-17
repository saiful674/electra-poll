import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-screen'>
            <div className='h-full my-container flex lg:flex-row flex-col items-center justify-center gap-10'>
                <div>
                    <ul className='flex py-3 gap-7 my-container text-xl text-green-500'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/services'>Services</Link>
                    </ul>
                    <div className='my-container flex items-center h-[100%] flex-col lg:flex-row justify-center'>
                        <div className='text-center lg:text-start'>
                            <div className='flex flex-col space-y-3 justify-center'>
                                <h1 className='text-4xl font-bold'>Page Not Found</h1>
                                <p className='text-lg'>Maybe there is something wrong with the webpage or you have entered a invalid route.</p>
                                <Link className="my-btn-sec" to='/'>Go back to Homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
<img src="./errorPage.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;