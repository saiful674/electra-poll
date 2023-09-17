import React, { useContext, useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from 'swiper/modules';
const UpcomingAndRecentElection = () => {

    // /:email
    const { user } = useContext(AuthContext)
    const [elections, setElections] = useState([])
    useEffect(() => {
        fetch(`https://electra-poll-server.vercel.app/election-by-published/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('election-by-published', data)
                setElections(data)
            })
    }, [])

    const currentElections = [
        { name: "City Council Elections", status: "Voting in Progress", remainingTime: "2 days", candidates: ["Candidate A", "Candidate B", "Candidate C"] },

    ];
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 bg-gray-100'>
                {/* Upcoming Elections */}
                <div className='flex-1 mb-6 bg-white sm:mb-4 text-slate-700 p-8 '>
                    <h2 className='text-3xl font-semibold mb-4 uppercase'>Upcoming Elections</h2>
                    <Swiper
                        slidesPerView={1}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={0}
                        modules={[Autoplay]}
                        className='lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center'
                    >

                        {elections.map((election, index) => (
                            <SwiperSlide key={index} >
                                <div className='mb-4'>

                                    <h3 className='text-2xl font-semibold'>Title: {election.title}</h3>

                                    <p className=''>start: {election.startDate}</p>
                                    <p className='text-red-400'> end: {election.endDate}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Current/Recent Elections */}
                <div className='flex-1 bg-white sm:mb-4 text-slate-700 p-8 mb-4 '>
                    <h2 className='text-3xl font-semibold mb-4 uppercase'>Current or Recent Elections</h2>
                    {currentElections.map((election, index) => (
                        <div key={index} className='mb-4'>
                            <h3 className='text-xl font-semibold'>{election.name}</h3>
                            <p className=''>{election.status}</p>
                            <p className=''>{election.remainingTime}</p>
                            <div className='flex items-center'>
                                <BsPerson className='mr-1' />
                                {election.candidates.map((candidate, idx) => (
                                    <p key={idx} className='text-sm'>{candidate}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div></>
    );
};

export default UpcomingAndRecentElection;