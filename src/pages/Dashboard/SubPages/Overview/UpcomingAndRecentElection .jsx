import React, { useContext, useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Lottie from "lottie-react";
import noFoundData from "../../../../assets/faq-lottie/no-found-data.json";
const UpcomingAndRecentElection = () => {
  // /:email
  const { user } = useContext(AuthContext);
  const [elections, setElections] = useState([]);
  const [ongoingElection, setOngoingElection] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/election-by-published/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("election-by-published", data);
        setElections(data);
      });
  }, []);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/election-by-ongoing/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("election-by-ongoing", data);
        setOngoingElection(data);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 bg-gray-100 dark:bg-[#343434]">
        {/* Upcoming Elections */}
        <div className="flex-1 mb-6 bg-white dark:bg-slate-900 dark:text-gray-300 sm:mb-4 text-slate-700 p-8 ">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Upcoming Elections {elections.length}
          </h2>
          {elections.length > 0 ? (
            <Swiper
              slidesPerView={1}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              spaceBetween={0}
              modules={[Autoplay]}
              className="lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center"
            >
              {elections.map((election, index) => (
                <SwiperSlide key={index}>
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold">
                      Title: {election.title}
                    </h3>
                    <p className="">Voting type {election.voteType}</p>
                    <p className="">Voting start: {election.startDate}</p>
                    <p className="text-red-400">
                      Voting end: {election.endDate}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className=" flex justify-center items-center">
              <Lottie
                className="w-52 "
                animationData={noFoundData}
                loop={true}
              />
            </div>
          )}
        </div>
        {/* Current/Recent Elections */}
        <div className="flex-1 bg-white dark:bg-slate-900 dark:text-gray-300 sm:mb-4 text-slate-700 p-8 mb-4 ">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Current or Recent Elections {ongoingElection.length}
          </h2>
          {ongoingElection.length > 0 ? (
            <Swiper
              slidesPerView={1}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              spaceBetween={0}
              modules={[Autoplay]}
              className="lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center"
            >
              {ongoingElection.map((election, index) => (
                <SwiperSlide key={index}>
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold">
                      {" "}
                      {election.title}
                    </h3>
                    <p className="">Voting in {election.status}</p>

                    <p className="">Voting type {election.voteType}</p>

                    <div className="inline-flex items-center">
                      <BsPerson className="mr-1" />

                      <p>Candidate Number : {election.voterEmails.length}</p>
                    </div>
                    <p className="text-red-400">
                      Voting end: {election.endDate}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className=" flex justify-center items-center">
              <Lottie
                className="w-52 "
                animationData={noFoundData}
                loop={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingAndRecentElection;
