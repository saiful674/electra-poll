import bannerImg from "../../../assets/banner-2.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import LazyImage from "../../../components/LazyImage/LazyImage";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const {t}=useTranslation(["home","common"])

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="bg-green-50 mb-10 dark:bg-slate-900 dark:text-white">
      <div className="my-container h-auto lg:h-[100vh] grid py-5 lg:py-0 gap-10 my-12 lg:my-0 lg:grid-cols-2 items-center">
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={0}
          modules={[Autoplay]}
          className="lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center"
        >
          <SwiperSlide className="space-y-3">
            <h1 className="text-4xl font-bold">
              {t("home:banner-tittle1")}
            </h1>
            <p>
            {t("home:banner-descrption1")}

            </p>
            <Link to="/about" className="block">
              <ButtonPrimary>{t("common:learnMore")}</ButtonPrimary>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="space-y-3">
          <h1 className="text-4xl font-bold">
              {t("home:banner-tittle2")}
            </h1>            <p>
            {t("home:banner-descrption2")}

            </p>
            <Link to="/about" className="block">
              <ButtonPrimary>{t("common:learnMore")}</ButtonPrimary>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="space-y-3">
          <h1 className="text-4xl font-bold">
              {t("home:banner-tittle3")}
            </h1>
            <p>
            {t("home:banner-descrption3")}

            </p>
            <Link to="/about" className="block">
              <ButtonPrimary>{t("common:learnMore")}</ButtonPrimary>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className="order-1 lg:order-2 banner-img">
          {/* <LazyImage
            src={bannerImg}
            blurHash={"LHI~xc4-00T]00#FM2pH00$,}wOT"}
            height={400}
            width={600}
          ></LazyImage> */}
          <img
            className="w-full lg:w-full h-full md:w-[75%] md:mx-auto"
            src={bannerImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
