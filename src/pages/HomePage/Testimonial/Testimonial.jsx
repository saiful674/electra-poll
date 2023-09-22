import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import Aos from "aos";
import "./Testimonial.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const Testimonial = () => {
  const {t}=useTranslation(["home","common"])

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  const { data: reviewsData = [] } = useQuery({
    queryKey: ["user-review"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/user-review`);
      return res.data;
    },
  });

  return (
    <div className="my-20 dark:mb-0 dark:bg-[#282828] dark:text-white">
      <div className="my-container py-10">
        <div className="my-5">
        <SectionTitle
        title={`${t("home:Testomonial")}`}
        subTitle={``}
      ></SectionTitle>        </div>

        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
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
              slidesPerView: 2,
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
          {reviewsData?.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <TestimonialCard testimonial={testimonial}></TestimonialCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
