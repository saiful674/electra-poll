import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonial.css";

// import required modules
import Aos from "aos";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Testimonial = () => {

  useEffect(() => {
    Aos.init({
      duration: 800
    })
  }, [])

  const [testimonials, setTestimonials] = useState([
    {
      "id": 1,
      "user": {
        "name": "John Smith",
        "occupation": "Community Leader"
      },
      "content": "The online voting system has streamlined our community's election process. It's user-friendly and secure, ensuring that every vote is counted accurately. Our members appreciate the convenience it brings to the voting experience.",
      "rating": 4,
      "date": "2023-07-15"
    },
    {
      "id": 2,
      "user": {
        "name": "Sophia Williams",
        "occupation": "Student Council President"
      },
      "content": "As the student council president, I found the online voting system incredibly effective. It boosted participation among students and eliminated the hassle of traditional paper ballots. The system's security features also ensure a fair and tamper-proof election.",
      "rating": 5,
      "date": "2023-06-25"
    },
    {
      "id": 3,
      "user": {
        "name": "Michael Anderson",
        "occupation": "Business Owner"
      },
      "content": "Using this online voting system for our board elections was a game-changer. It saved us time, reduced administrative work, and provided real-time results. The system's reliability and accessibility make it an excellent choice for organizations of all sizes.",
      "rating": 4,
      "date": "2023-08-02"
    },
    {
      "id": 4,
      "user": {
        "name": "Linda Martinez",
        "occupation": "Voter"
      },
      "content": "I was initially skeptical about online voting, but this system won me over. It was intuitive to use, and I felt confident that my vote was secure. I appreciated being able to participate from the comfort of my home.",
      "rating": 5,
      "date": "2023-07-10"
    },
    {
      "id": 5,
      "user": {
        "name": "David Lee",
        "occupation": "Election Committee Member"
      },
      "content": "Our election committee had a fantastic experience with this online voting system. It offered comprehensive tools for managing candidate profiles, monitoring voter turnout, and generating reports. It truly simplified the entire election process.",
      "rating": 5,
      "date": "2023-07-29"
    },
    {
      "id": 6,
      "user": {
        "name": "Emma Rodriguez",
        "occupation": "Political Enthusiast"
      },
      "content": "I've followed many elections closely, and this online voting system impresses me with its accuracy and accessibility. It's a step towards a more inclusive democracy, making it easier for citizens to exercise their right to vote.",
      "rating": 4,
      "date": "2023-08-08"
    }
  ]
  );
  // useEffect(() => {
  //   fetch("/public/TestimonialData.json")
  //     .then((res) => res.json())
  //     .then((data) => setTestimonials(data));
  // }, []);

  
  return (
    <div className=" my-container my-20">
      <div className="my-5">
        <SectionTitle title={"Testimonial"} subTitle={""}></SectionTitle>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={3}

        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}

        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          // When screen width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
          // When screen width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // When screen width is < 768px
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            {" "}
            <TestimonialCard
              testimonial={testimonial}
            ></TestimonialCard>
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </div>
  );
};

export default Testimonial;
