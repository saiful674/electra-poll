import React from 'react';
import Lottie from "lottie-react";
import call from '../../assets/contact/call.json'
import { BsHeadset } from 'react-icons/bs';
// import './ContactHotline.css'; // Import your component's CSS file

const ContactHotline = () => {
    return (
        <div className="main-container mt-4">
            <section className=" contact-bg2   overflow-hidden">
                <div className=" w-full h-full bg-slate-600 bg-opacity-60 text-center ">
                <div className=" flex flex-col z-10 items-center justify-center h-full ">
                   <p className='text-slate-300 md:text-xl md:font-bold mb-2 mt-4'>24/7 Hotline: Your Lifeline to Assistance</p>
                         <h3 className='text-xl font-semibold md:text-3xl md:font-extrabold text-slate-200 mb-4'>Responsive Support Team Ready to Serve Your Needs, <br /> Day and Night</h3>
                         <Lottie className='text-white call' animationData={call} loop={true} />
                        <div className='flex items-center gap-4 text-slate-200 text-xl mt-4 font-bold'> <BsHeadset></BsHeadset>
                         <p>164 648-8757</p></div>
                        <p className='text-xl font-semibold text-slate-300 mb-4'> Call us For Any Questions</p>
                </div>
                </div>
            </section>
         
        </div>
    );
};

export default ContactHotline;
