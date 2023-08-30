import bannerImg from "../../../assets/banner-2.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import './Banner.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import { useEffect } from "react";
import Aos from "aos";

const Banner = () => {

    useEffect(() => {
        Aos.init({
            duration: 800
        })
    }, [])

    return (
        <div className="bg-green-50 mb-10">
            <div className='my-container h-auto lg:h-[100vh] grid py-5 lg:py-0 gap-10 my-12 lg:my-0 lg:grid-cols-2 items-center'>
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={0}
                    modules={[Autoplay]}
                    className='lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center'
                >
                    <SwiperSlide className='space-y-3'>
                        <h1 className='text-4xl font-bold'>Your Vote, Your Voice, Our Commitment</h1>
                        <p>We are committed to providing a seamless and secure online voting experience. Empower your voice with us.</p>
                        <button>
                            <ButtonPrimary>Learn More</ButtonPrimary>
                        </button>
                    </SwiperSlide>
                    <SwiperSlide className="space-y-3">
                        <h1 className='text-4xl font-bold'>E-voting Made Easy</h1>
                        <p>Simplify your organization's voting process with our intuitive, secure, and reliable e-voting system. Easy voting is just a click away.</p>
                        <button>
                            <ButtonPrimary>Learn More</ButtonPrimary>
                        </button>
                    </SwiperSlide>
                    <SwiperSlide className='space-y-3'>
                        <h1 className='text-4xl font-bold'>Secure. Simple. Swift. Your Digital Ballot Box.</h1>
                        <p>We provide a reliable online voting platform that values your security, appreciates simplicity, and delivers swift results. Welcome to your digital ballot box.</p>
                        <button>
                            <ButtonPrimary>Learn More</ButtonPrimary>
                        </button>
                    </SwiperSlide>
                </Swiper>
                <div className='order-1 lg:order-2 banner-img'>
                    <img className='w-full lg:w-full h-full md:w-[75%] md:mx-auto' src={bannerImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
