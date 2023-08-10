import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("/public/TestimonialData.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  console.log(testimonials);
  return (
    <div className=" my-container my-20">
      <div className="my-12">
        <SectionTitle title={"Testimonial"} subTitle={""}></SectionTitle>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
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
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide>
            {" "}
            <TestimonialCard
              key={testimonial.id}
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
